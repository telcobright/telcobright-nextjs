import type { Block } from '@content/types';

/**
 * The editable shape of everything on the site.
 *
 * These mirror the bundled content in `content/*.ts`, with two differences:
 * they are mutable (the bundled objects are `as const`), and every field an
 * editor is allowed to change is present and optional-free, so a form can be
 * generated from the type without guessing. The bundled content is the
 * fallback; once a section is saved from the admin it lives in `data/`.
 */

export interface LinkRef {
  label: string;
  href: string;
}

/** A heading where some words carry the brand gradient. */
export interface TitlePart {
  text: string;
  accent: boolean;
}

export interface NavItem extends LinkRef {
  children?: LinkRef[];
}

export interface SiteContent {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  contact: {
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    mailto: string;
  };
  social: {
    facebook: string | null;
    linkedin: string | null;
    medium: string | null;
  };
  logos: { header: string; footer: string };
  copyright: string;
  headerNav: NavItem[];
  footerNav: { title: string; links: LinkRef[] }[];
  newsletter: { title: string; body: string };
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    cta: LinkRef;
    background: string;
  };
  heroCard: {
    image: string;
    imageAlt: string;
    greeting: string;
    greetingIcon: string;
    title: string;
    cta: LinkRef;
    note: string;
  };
  clients: { title: string; logos: { image: string; alt: string }[] };
  introduction: { titleParts: TitlePart[]; body: string; cta: LinkRef };
  products: { title: string; body: string; href: string }[];
  additional: {
    eyebrow: string;
    titleParts: TitlePart[];
    image: string;
    imageAlt: string;
    services: { icon: string; title: string; body: string }[];
  };
  highlights: {
    titleParts: TitlePart[];
    body: string;
    cta: LinkRef;
    image: string;
    imageAlt: string;
    reverse: boolean;
  }[];
  testimonials: { eyebrow: string; titleParts: TitlePart[]; items: Testimonial[] };
  gallery: {
    eyebrow: string;
    titleParts: TitlePart[];
    images: { image: string; alt: string; wide?: boolean }[];
  };
  faq: { eyebrow: string; titleParts: TitlePart[]; items: { q: string; a: string }[] };
}

/** A product/solution page. Same model the migration produced. */
export interface PageContent {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  legacyPath: string;
  featured?: boolean;
  /** Hidden pages stay out of the nav, the index and the sitemap. */
  draft?: boolean;
  blocks: Block[];
}

/* ------------------------------------------------------------- careers --- */

export type JobStatus = 'open' | 'closed';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  /** "Full time", "Contract", "Internship" — free text, shown as a chip. */
  type: string;
  /** Optional salary line; blank hides it. */
  salary: string;
  /** ISO date (YYYY-MM-DD). Blank means no deadline. */
  deadline: string;
  /** One-paragraph summary for the listing. */
  summary: string;
  /** The body of the post. Plain text; blank lines separate paragraphs. */
  description: string;
  /** One requirement per line. */
  requirements: string[];
  /** One benefit per line. */
  benefits: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  /** Filename inside the CV upload directory. */
  cvFile: string;
  /** The name the applicant's own file had, for the download. */
  cvOriginalName: string;
  cvSize: number;
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
}

/* ---------------------------------------------------------------- auth --- */

export interface User {
  id: string;
  email: string;
  name: string;
  /** scrypt, stored as `salt:hash` in hex. Never the password itself. */
  password: string;
  createdAt: string;
}
