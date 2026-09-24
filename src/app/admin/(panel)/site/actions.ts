'use server';

import { requireUser } from '@/server/auth';
import { getSite, saveSite } from '@/server/content';
import { rows, str, text } from '@/server/form';
import type { LinkRef, NavItem } from '@/server/types';

/**
 * Nav links are edited as `Label | /href`, one per line — the fastest way to
 * reorder a menu, and it survives a copy-paste into a text editor.
 */
function parseLinks(raw: string[]): LinkRef[] {
  return raw
    .map((line) => {
      const [label, href] = line.split('|');
      return { label: (label ?? '').trim(), href: (href ?? '#').trim() || '#' };
    })
    .filter((l) => l.label);
}

export async function saveSiteAction(formData: FormData): Promise<void> {
  await requireUser();
  const current = await getSite();

  const headerNav: NavItem[] = rows(formData, 'nav').map((row) => ({
    label: row.label ?? '',
    href: row.href || '#',
    ...(row.children?.trim()
      ? { children: parseLinks(row.children.split('\n').map((l) => l.trim()).filter(Boolean)) }
      : {}),
  }));

  const footerNav = rows(formData, 'footer').map((row) => ({
    title: row.title ?? '',
    links: parseLinks((row.links ?? '').split('\n').map((l) => l.trim()).filter(Boolean)),
  }));

  await saveSite({
    ...current,
    name: str(formData, 'name', current.name),
    shortName: str(formData, 'shortName', current.shortName),
    tagline: str(formData, 'tagline'),
    description: text(formData, 'description'),
    url: str(formData, 'url', current.url).replace(/\/$/, ''),
    locale: str(formData, 'locale', current.locale),
    contact: {
      address: text(formData, 'address'),
      phone: str(formData, 'phone'),
      phoneHref: str(formData, 'phoneHref'),
      email: str(formData, 'email'),
      mailto: str(formData, 'mailto'),
    },
    social: {
      facebook: str(formData, 'facebook') || null,
      linkedin: str(formData, 'linkedin') || null,
      medium: str(formData, 'medium') || null,
    },
    logos: {
      header: str(formData, 'logoHeader', current.logos.header),
      footer: str(formData, 'logoFooter', current.logos.footer),
    },
    copyright: str(formData, 'copyright'),
    newsletter: {
      title: str(formData, 'newsletterTitle'),
      body: text(formData, 'newsletterBody'),
      cta: {
        label: str(formData, 'newsletterCtaLabel'),
        href: str(formData, 'newsletterCtaHref') || '/contact',
      },
    },
    headerNav: headerNav.filter((item) => item.label),
    footerNav: footerNav.filter((col) => col.title),
  });
}

/** Adds an empty row so the next render has somewhere to type. */
export async function addNavItemAction(formData: FormData): Promise<void> {
  await requireUser();
  await saveSiteAction(formData);
  const current = await getSite();
  await saveSite({ ...current, headerNav: [...current.headerNav, { label: 'New item', href: '#' }] });
}

export async function addFooterColumnAction(formData: FormData): Promise<void> {
  await requireUser();
  await saveSiteAction(formData);
  const current = await getSite();
  await saveSite({ ...current, footerNav: [...current.footerNav, { title: 'New column', links: [] }] });
}

export async function removeNavItemAction(index: number): Promise<void> {
  await requireUser();
  const current = await getSite();
  await saveSite({ ...current, headerNav: current.headerNav.filter((_, i) => i !== index) });
}

export async function removeFooterColumnAction(index: number): Promise<void> {
  await requireUser();
  const current = await getSite();
  await saveSite({ ...current, footerNav: current.footerNav.filter((_, i) => i !== index) });
}
