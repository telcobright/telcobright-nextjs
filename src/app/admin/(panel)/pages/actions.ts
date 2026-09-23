'use server';

import { redirect } from 'next/navigation';
import type { Block } from '@content/types';
import { requireUser } from '@/server/auth';
import { deletePage, getPage, getPages, restorePage, savePage } from '@/server/content';
import { bool, rows, str, text } from '@/server/form';
import type { PageContent } from '@/server/types';

/**
 * Product pages.
 *
 * A page body is the same flat block list the migration produced, so editing
 * one is editing blocks: each keeps its type and its own fields, and the order
 * is the order on the page. Tables are the one exception — they are edited as
 * JSON, because a cell grid with merged cells has no honest small form, and
 * the ones on this site came across from WordPress rather than being written.
 */

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'page'
  );
}

function headingId(text: string, taken: Set<string>): string {
  const base = slugify(text);
  let id = base;
  let n = 2;
  while (taken.has(id)) id = `${base}-${n++}`;
  taken.add(id);
  return id;
}

/** Rebuilds the block list from the posted fields. */
function readBlocks(formData: FormData, previous: Block[]): Block[] {
  const taken = new Set<string>();

  return rows(formData, 'block')
    .map((row, index): Block | null => {
      const type = row.type;

      if (type === 'h') {
        const html = row.html ?? '';
        if (!html.trim()) return null;
        const level = Math.min(6, Math.max(2, Number(row.level) || 2)) as 2 | 3 | 4 | 5 | 6;
        const plain = html.replace(/<[^>]+>/g, '').trim();
        return { t: 'h', level, html, text: plain, id: headingId(plain, taken) };
      }

      if (type === 'p') {
        const html = row.html ?? '';
        return html.trim() ? { t: 'p', html } : null;
      }

      if (type === 'ul') {
        const items = (row.items ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
        if (!items.length) return null;
        return row.ordered === 'on' ? { t: 'ul', ordered: true, items } : { t: 'ul', items };
      }

      if (type === 'img') {
        const src = row.src ?? '';
        if (!src.trim()) return null;
        const rowKind = row.row === 'carousel' || row.row === 'column' ? row.row : undefined;
        return { t: 'img', src, alt: row.alt ?? '', ...(rowKind ? { row: rowKind } : {}) };
      }

      if (type === 'cta') {
        const label = row.label ?? '';
        return label.trim() ? { t: 'cta', label, href: row.href ?? '#' } : null;
      }

      if (type === 'table') {
        try {
          const parsed = JSON.parse(row.json ?? '[]');
          if (Array.isArray(parsed)) return { t: 'table', rows: parsed };
        } catch {
          // Unparseable JSON keeps whatever the table was, rather than
          // throwing the table away because of a missing comma.
        }
        const fallback = previous[index];
        return fallback && fallback.t === 'table' ? fallback : null;
      }

      return null;
    })
    .filter((b): b is Block => b !== null);
}

async function withPage(slug: string, patch: (page: PageContent) => PageContent): Promise<void> {
  await requireUser();
  const page = await getPage(slug);
  if (!page) throw new Error('That page does not exist.');
  await savePage(patch(page));
}

export async function savePageAction(slug: string, formData: FormData): Promise<void> {
  await withPage(slug, (page) => ({
    ...page,
    title: str(formData, 'title', page.title),
    subtitle: str(formData, 'subtitle') || undefined,
    summary: text(formData, 'summary'),
    legacyPath: str(formData, 'legacyPath', page.legacyPath),
    featured: bool(formData, 'featured'),
    draft: bool(formData, 'draft'),
    blocks: readBlocks(formData, page.blocks),
  }));
}

export async function addBlockAction(slug: string, type: Block['t'], formData: FormData): Promise<void> {
  await savePageAction(slug, formData);
  await withPage(slug, (page) => {
    const empty: Record<Block['t'], Block> = {
      h: { t: 'h', level: 2, html: 'New heading', text: 'New heading', id: `new-heading-${Date.now()}` },
      p: { t: 'p', html: 'New paragraph.' },
      ul: { t: 'ul', items: ['First item'] },
      img: { t: 'img', src: '', alt: '' },
      cta: { t: 'cta', label: 'Get in touch', href: '/contact' },
      table: { t: 'table', rows: [{ head: true, cells: [{ html: 'Column' }] }] },
    };
    return { ...page, blocks: [...page.blocks, empty[type]] };
  });
}

export async function removeBlockAction(slug: string, index: number, formData: FormData): Promise<void> {
  await savePageAction(slug, formData);
  await withPage(slug, (page) => ({ ...page, blocks: page.blocks.filter((_, i) => i !== index) }));
}

export async function moveBlockAction(
  slug: string,
  index: number,
  direction: -1 | 1,
  formData: FormData
): Promise<void> {
  await savePageAction(slug, formData);
  await withPage(slug, (page) => {
    const blocks = [...page.blocks];
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return page;
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    return { ...page, blocks };
  });
}

/* ----------------------------------------------------------- page CRUD --- */

export async function createPageAction(formData: FormData): Promise<void> {
  await requireUser();
  const title = str(formData, 'title');
  if (!title) throw new Error('Give the page a title.');

  const existing = (await getPages()).map((p) => p.slug);
  let slug = str(formData, 'slug') || slugify(title);
  let n = 2;
  while (existing.includes(slug)) slug = `${slugify(title)}-${n++}`;

  await savePage({
    slug,
    title,
    summary: text(formData, 'summary'),
    legacyPath: `/${slug}/`,
    draft: true,
    blocks: [{ t: 'p', html: 'Write the first paragraph here.' }],
  });

  redirect(`/admin/pages/${slug}`);
}

export async function deletePageAction(slug: string): Promise<void> {
  await requireUser();
  await deletePage(slug);
  redirect('/admin/pages');
}

export async function restorePageAction(slug: string): Promise<void> {
  await requireUser();
  await restorePage(slug);
}
