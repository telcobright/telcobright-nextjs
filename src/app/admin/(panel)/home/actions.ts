'use server';

import { requireUser } from '@/server/auth';
import { getHome, saveHome } from '@/server/content';
import { parseTitleParts, rows, str, text } from '@/server/form';
import type { HomeContent } from '@/server/types';

/**
 * Home page sections.
 *
 * Each section on the editor is its own form and its own action, so saving the
 * FAQ cannot overwrite the hero with a stale copy of it. Every action does a
 * read-modify-write against the current document for the same reason.
 */
async function patchHome(patch: (home: HomeContent) => HomeContent): Promise<void> {
  await requireUser();
  const home = await getHome();
  await saveHome(patch(home));
}

export async function saveHeroAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    hero: {
      ...home.hero,
      eyebrow: str(formData, 'eyebrow'),
      titleLead: str(formData, 'titleLead'),
      titleAccent: str(formData, 'titleAccent'),
      body: text(formData, 'body'),
      background: str(formData, 'background'),
      cta: { label: str(formData, 'ctaLabel'), href: str(formData, 'ctaHref') },
    },
    heroCard: {
      ...home.heroCard,
      image: str(formData, 'cardImage'),
      imageAlt: str(formData, 'cardImageAlt'),
      greeting: str(formData, 'cardGreeting'),
      greetingIcon: str(formData, 'cardGreetingIcon'),
      title: str(formData, 'cardTitle'),
      note: str(formData, 'cardNote'),
      cta: { label: str(formData, 'cardCtaLabel'), href: str(formData, 'cardCtaHref') },
    },
  }));
}

export async function saveIntroAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    introduction: {
      titleParts: parseTitleParts(str(formData, 'title')),
      body: text(formData, 'body'),
      cta: { label: str(formData, 'ctaLabel'), href: str(formData, 'ctaHref') },
    },
    products: rows(formData, 'product')
      .map((row) => ({ title: row.title ?? '', body: row.body ?? '', href: row.href ?? '' }))
      .filter((p) => p.title),
  }));
}

export async function addProductAction(formData: FormData): Promise<void> {
  await saveIntroAction(formData);
  await patchHome((home) => ({
    ...home,
    products: [...home.products, { title: 'New product', body: '', href: '/solutions/' }],
  }));
}

export async function removeProductAction(index: number): Promise<void> {
  await patchHome((home) => ({ ...home, products: home.products.filter((_, i) => i !== index) }));
}

export async function saveAdditionalAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    additional: {
      eyebrow: str(formData, 'eyebrow'),
      titleParts: parseTitleParts(str(formData, 'title')),
      image: str(formData, 'image'),
      imageAlt: str(formData, 'imageAlt'),
      services: rows(formData, 'service')
        .map((row) => ({ icon: row.icon ?? '', title: row.title ?? '', body: row.body ?? '' }))
        .filter((s) => s.title),
    },
  }));
}

export async function addServiceAction(formData: FormData): Promise<void> {
  await saveAdditionalAction(formData);
  await patchHome((home) => ({
    ...home,
    additional: {
      ...home.additional,
      services: [...home.additional.services, { icon: '', title: 'New service', body: '' }],
    },
  }));
}

export async function removeServiceAction(index: number): Promise<void> {
  await patchHome((home) => ({
    ...home,
    additional: { ...home.additional, services: home.additional.services.filter((_, i) => i !== index) },
  }));
}

export async function saveHighlightsAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    highlights: rows(formData, 'highlight')
      .map((row) => ({
        titleParts: parseTitleParts(row.title ?? ''),
        body: row.body ?? '',
        cta: { label: row.ctaLabel ?? '', href: row.ctaHref ?? '' },
        image: row.image ?? '',
        imageAlt: row.imageAlt ?? '',
        reverse: row.reverse === 'on',
      }))
      .filter((h) => h.titleParts.some((p) => p.text.trim())),
  }));
}

export async function addHighlightAction(formData: FormData): Promise<void> {
  await saveHighlightsAction(formData);
  await patchHome((home) => ({
    ...home,
    highlights: [
      ...home.highlights,
      {
        titleParts: parseTitleParts('New [feature]'),
        body: '',
        cta: { label: 'Start a project', href: '#' },
        image: '',
        imageAlt: '',
        reverse: home.highlights.length % 2 === 1,
      },
    ],
  }));
}

export async function removeHighlightAction(index: number): Promise<void> {
  await patchHome((home) => ({ ...home, highlights: home.highlights.filter((_, i) => i !== index) }));
}

export async function saveClientsAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    clients: {
      title: str(formData, 'title'),
      logos: rows(formData, 'logo')
        .map((row) => ({ image: row.image ?? '', alt: row.alt ?? '' }))
        .filter((l) => l.image),
    },
  }));
}

export async function addClientAction(formData: FormData): Promise<void> {
  await saveClientsAction(formData);
  await patchHome((home) => ({
    ...home,
    clients: { ...home.clients, logos: [...home.clients.logos, { image: '', alt: '' }] },
  }));
}

export async function removeClientAction(index: number): Promise<void> {
  await patchHome((home) => ({
    ...home,
    clients: { ...home.clients, logos: home.clients.logos.filter((_, i) => i !== index) },
  }));
}

export async function saveGalleryAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    gallery: {
      eyebrow: str(formData, 'eyebrow'),
      titleParts: parseTitleParts(str(formData, 'title')),
      images: rows(formData, 'image')
        .map((row) => ({ image: row.src ?? '', alt: row.alt ?? '', wide: row.wide === 'on' }))
        .filter((i) => i.image),
    },
  }));
}

export async function addGalleryImageAction(formData: FormData): Promise<void> {
  await saveGalleryAction(formData);
  await patchHome((home) => ({
    ...home,
    gallery: { ...home.gallery, images: [...home.gallery.images, { image: '', alt: '' }] },
  }));
}

export async function removeGalleryImageAction(index: number): Promise<void> {
  await patchHome((home) => ({
    ...home,
    gallery: { ...home.gallery, images: home.gallery.images.filter((_, i) => i !== index) },
  }));
}

export async function saveTestimonialsAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    testimonials: {
      eyebrow: str(formData, 'eyebrow'),
      titleParts: parseTitleParts(str(formData, 'title')),
      items: rows(formData, 'item')
        .map((row) => ({
          quote: row.quote ?? '',
          name: row.name ?? '',
          role: row.role || undefined,
          company: row.company || undefined,
          image: row.image || undefined,
        }))
        .filter((t) => t.quote && t.name),
    },
  }));
}

export async function addTestimonialAction(formData: FormData): Promise<void> {
  await saveTestimonialsAction(formData);
  await patchHome((home) => ({
    ...home,
    testimonials: {
      ...home.testimonials,
      items: [...home.testimonials.items, { quote: '', name: '' }],
    },
  }));
}

export async function removeTestimonialAction(index: number): Promise<void> {
  await patchHome((home) => ({
    ...home,
    testimonials: { ...home.testimonials, items: home.testimonials.items.filter((_, i) => i !== index) },
  }));
}

export async function saveFaqAction(formData: FormData): Promise<void> {
  await patchHome((home) => ({
    ...home,
    faq: {
      eyebrow: str(formData, 'eyebrow'),
      titleParts: parseTitleParts(str(formData, 'title')),
      items: rows(formData, 'item')
        .map((row) => ({ q: row.q ?? '', a: row.a ?? '' }))
        .filter((i) => i.q),
    },
  }));
}

export async function addFaqAction(formData: FormData): Promise<void> {
  await saveFaqAction(formData);
  await patchHome((home) => ({ ...home, faq: { ...home.faq, items: [...home.faq.items, { q: '', a: '' }] } }));
}

export async function removeFaqAction(index: number): Promise<void> {
  await patchHome((home) => ({ ...home, faq: { ...home.faq, items: home.faq.items.filter((_, i) => i !== index) } }));
}
