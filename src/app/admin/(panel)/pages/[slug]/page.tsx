import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Block } from '@content/types';
import { getPage } from '@/server/content';
import { BackLink, Check, Field, PageHeading, Panel, SaveButton, TextArea } from '@/components/admin/ui';
import {
  addBlockAction,
  deletePageAction,
  moveBlockAction,
  removeBlockAction,
  savePageAction,
} from '../actions';

/**
 * The page editor: the page's own details, then its body as a list of blocks.
 *
 * Move, remove and add all save the form first, so an edit typed just before
 * pressing one of them is not lost.
 */
export default async function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const save = savePageAction.bind(null, slug);

  return (
    <>
      <BackLink href="/admin/pages">All pages</BackLink>

      <PageHeading
        title={page.title}
        description={`Served at /solutions/${page.slug}`}
        action={
          <div className="flex gap-2">
            <Link href={`/solutions/${page.slug}`} target="_blank" className="adm-btn-ghost">
              View ↗
            </Link>
            <form action={deletePageAction.bind(null, slug)}>
              <button type="submit" className="adm-btn-danger">
                Delete page
              </button>
            </form>
          </div>
        }
      />

      <form action={save}>
        <Panel title="Page details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" name="title" defaultValue={page.title} required />
            <Field label="Subtitle" name="subtitle" defaultValue={page.subtitle ?? ''} hint="The line under the title in the page header." />
          </div>
          <div className="mt-5">
            <TextArea
              label="Summary"
              name="summary"
              defaultValue={page.summary}
              rows={2}
              hint="Used on the product cards and as the search-engine description."
            />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Legacy address"
              name="legacyPath"
              defaultValue={page.legacyPath}
              hint="The old WordPress path. Kept so the redirects stay in step."
            />
            <div className="flex flex-col justify-end gap-3">
              <Check label="Feature in the navigation dropdown" name="featured" defaultChecked={page.featured} />
              <Check label="Draft — hide from the site" name="draft" defaultChecked={page.draft} />
            </div>
          </div>
        </Panel>

        <Panel title="Page body" description={`${page.blocks.length} blocks, in the order they appear on the page.`}>
          <div className="space-y-4">
            {page.blocks.map((block, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <input type="hidden" name={`block.${i}.type`} value={block.t} />

                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="adm-chip">{blockLabel(block)}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      formAction={moveBlockAction.bind(null, slug, i, -1)}
                      className="adm-btn-ghost px-2.5 py-1.5"
                      aria-label="Move up"
                      disabled={i === 0}
                    >
                      ↑
                    </button>
                    <button
                      formAction={moveBlockAction.bind(null, slug, i, 1)}
                      className="adm-btn-ghost px-2.5 py-1.5"
                      aria-label="Move down"
                      disabled={i === page.blocks.length - 1}
                    >
                      ↓
                    </button>
                    <button formAction={removeBlockAction.bind(null, slug, i)} className="adm-btn-danger px-2.5 py-1.5">
                      Remove
                    </button>
                  </div>
                </div>

                <BlockFields block={block} index={i} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-ink-200/70 pt-5">
            <span className="self-center pr-1 text-[13px] text-ink-400">Add:</span>
            {(
              [
                ['p', 'Paragraph'],
                ['h', 'Heading'],
                ['ul', 'List'],
                ['img', 'Image'],
                ['cta', 'Button'],
                ['table', 'Table'],
              ] as const
            ).map(([type, label]) => (
              <button key={type} formAction={addBlockAction.bind(null, slug, type)} className="adm-btn-ghost">
                {label}
              </button>
            ))}
          </div>

          <SaveButton label="Save page" />
        </Panel>
      </form>
    </>
  );
}

function blockLabel(block: Block): string {
  switch (block.t) {
    case 'h':
      return `Heading ${block.level}`;
    case 'p':
      return 'Paragraph';
    case 'ul':
      return block.ordered ? 'Numbered list' : 'List';
    case 'img':
      return block.row ? `Image (${block.row} row)` : 'Image';
    case 'cta':
      return 'Button';
    case 'table':
      return `Table (${block.rows.length} rows)`;
  }
}

function BlockFields({ block, index }: { block: Block; index: number }) {
  const n = (field: string) => `block.${index}.${field}`;

  if (block.t === 'h') {
    return (
      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <div>
          <label htmlFor={n('level')} className="adm-label">
            Level
          </label>
          <select id={n('level')} name={n('level')} defaultValue={String(block.level)} className="adm-input">
            {[2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                H{level}
              </option>
            ))}
          </select>
        </div>
        <Field label="Text" name={n('html')} defaultValue={block.html} />
      </div>
    );
  }

  if (block.t === 'p') {
    return (
      <TextArea
        label="Text"
        name={n('html')}
        defaultValue={block.html}
        rows={4}
        hint="Inline HTML is allowed: <strong>, <em>, <a href=…>, <br>."
      />
    );
  }

  if (block.t === 'ul') {
    return (
      <>
        <TextArea label="Items" name={n('items')} defaultValue={block.items.join('\n')} rows={5} hint="One per line." />
        <div className="mt-3">
          <Check label="Numbered" name={n('ordered')} defaultChecked={block.ordered} />
        </div>
      </>
    );
  }

  if (block.t === 'img') {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Image" name={n('src')} defaultValue={block.src} hint="Path under the media library." />
        <Field label="Description" name={n('alt')} defaultValue={block.alt} hint="Leave empty for decorative images." />
        <div>
          <label htmlFor={n('row')} className="adm-label">
            Side by side
          </label>
          <select id={n('row')} name={n('row')} defaultValue={block.row ?? ''} className="adm-input">
            <option value="">No — full width</option>
            <option value="column">Yes, at its own size</option>
            <option value="carousel">Yes, as a logo strip</option>
          </select>
          <p className="adm-hint">Consecutive images of the same kind share a row.</p>
        </div>
      </div>
    );
  }

  if (block.t === 'cta') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Label" name={n('label')} defaultValue={block.label} />
        <Field label="Link" name={n('href')} defaultValue={block.href} />
      </div>
    );
  }

  return (
    <TextArea
      label="Table data"
      name={n('json')}
      defaultValue={JSON.stringify(block.rows, null, 2)}
      rows={12}
      hint="Rows of cells, as JSON. Each row is { head, cells: [{ html, rowSpan?, colSpan? }] }. Invalid JSON is ignored rather than losing the table."
    />
  );
}

export const dynamic = 'force-dynamic';
