import { revalidatePath } from 'next/cache';
import * as bundledHome from '@content/home';
import { site as bundledSite, headerNav, footerNav, newsletter } from '@content/site';
import { solutions as bundledPages } from '@content/solutions';
import { deleteDoc, listDocs, readDoc, writeDoc } from '@/server/store';
import type { HomeContent, PageContent, SiteContent } from '@/server/types';

/**
 * Site content, read by every page.
 *
 * Nothing here needs seeding. A document that has never been saved falls back
 * to the migrated content in `content/*.ts`, so a fresh checkout renders the
 * real site immediately and the admin edits from that starting point. The
 * first save writes `data/<doc>.json`, and from then on the file wins.
 *
 * That also means `npm run migrate:generate` can be re-run at any time without
 * trampling edits: it rewrites the bundled defaults, not the saved content.
 */

/** The bundled content is `as const`; editing needs a mutable copy. */
const clone = <T>(value: T): T => structuredClone(value) as T;

function defaultSite(): SiteContent {
  return clone({
    ...bundledSite,
    social: { ...bundledSite.social },
    headerNav: headerNav.map((item) => ({
      label: item.label,
      href: item.href,
      ...('children' in item ? { children: item.children.map((c) => ({ ...c })) } : {}),
    })),
    footerNav: footerNav.map((col) => ({
      title: col.title,
      links: col.links.map((l) => ({ ...l })),
    })),
    newsletter: { ...newsletter },
  }) as SiteContent;
}

function defaultHome(): HomeContent {
  return clone({
    hero: bundledHome.hero,
    heroCard: bundledHome.heroCard,
    clients: bundledHome.clients,
    introduction: bundledHome.introduction,
    products: bundledHome.products,
    additional: bundledHome.additional,
    highlights: bundledHome.highlights,
    testimonials: bundledHome.testimonials,
    gallery: bundledHome.gallery,
    faq: bundledHome.faq,
  }) as HomeContent;
}

export async function getSite(): Promise<SiteContent> {
  return readDoc<SiteContent>('site', defaultSite());
}

export async function saveSite(site: SiteContent): Promise<void> {
  await writeDoc('site', site);
  revalidateEverything();
}

export async function getHome(): Promise<HomeContent> {
  return readDoc<HomeContent>('home', defaultHome());
}

export async function saveHome(home: HomeContent): Promise<void> {
  await writeDoc('home', home);
  revalidatePath('/');
}

/* --------------------------------------------------------------- pages --- */

function defaultPage(slug: string): PageContent | null {
  const page = bundledPages.find((p) => p.slug === slug);
  return page ? (clone(page) as PageContent) : null;
}

/**
 * Every page, saved ones taking precedence over the bundled ones, in the
 * bundled order first and then anything the admin has added.
 */
export async function getPages(): Promise<PageContent[]> {
  const savedSlugs = await listDocs('pages');
  const saved = new Map<string, PageContent>();
  for (const slug of savedSlugs) {
    const page = await readDoc<PageContent | null>(`pages/${slug}`, null);
    if (page) saved.set(page.slug, page);
  }

  const deleted = await readDoc<string[]>('pages-deleted', []);
  const order: PageContent[] = [];
  for (const bundled of bundledPages) {
    if (deleted.includes(bundled.slug)) continue;
    order.push(saved.get(bundled.slug) ?? (clone(bundled) as PageContent));
    saved.delete(bundled.slug);
  }
  return [...order, ...saved.values()];
}

/** Pages the public site shows: everything that is not a draft. */
export async function getPublishedPages(): Promise<PageContent[]> {
  return (await getPages()).filter((p) => !p.draft);
}

export async function getPage(slug: string): Promise<PageContent | null> {
  const deleted = await readDoc<string[]>('pages-deleted', []);
  if (deleted.includes(slug)) return null;
  return readDoc<PageContent | null>(`pages/${slug}`, defaultPage(slug));
}

export async function savePage(page: PageContent): Promise<void> {
  await writeDoc(`pages/${page.slug}`, page);
  revalidateEverything();
}

/**
 * Deletes a page. A bundled page cannot be removed from disk, so its slug goes
 * on a tombstone list instead — otherwise it would reappear from the fallback.
 */
export async function deletePage(slug: string): Promise<void> {
  await deleteDoc(`pages/${slug}`);
  if (bundledPages.some((p) => p.slug === slug)) {
    const deleted = await readDoc<string[]>('pages-deleted', []);
    if (!deleted.includes(slug)) await writeDoc('pages-deleted', [...deleted, slug]);
  }
  revalidateEverything();
}

/** Puts a deleted bundled page back. */
export async function restorePage(slug: string): Promise<void> {
  const deleted = await readDoc<string[]>('pages-deleted', []);
  await writeDoc('pages-deleted', deleted.filter((s) => s !== slug));
  revalidateEverything();
}

/**
 * Nav, footer and the product dropdown appear on every page, so a change to
 * any of them has to refresh the whole tree rather than one route.
 */
export function revalidateEverything() {
  revalidatePath('/', 'layout');
}
