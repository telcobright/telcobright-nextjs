import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { getSite } from '@/server/content';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Built from the store, so the admin controls the site's own metadata too. */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: site.url,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: '/' },
    robots: { index: true, follow: true },
  };
}

/**
 * The document shell: fonts, the stylesheet, and nothing else.
 *
 * Site chrome lives in `(site)/layout.tsx` so that `/admin` can have its own,
 * rather than the public header and footer wrapping the editor.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      {/*
        Extensions write their own attributes onto <body> before React
        hydrates — Grammarly adds data-gr-ext-installed, password managers do
        the same — which React reports as a hydration mismatch. This silences
        that for this element's own attributes only; a mismatch anywhere inside
        the tree is still reported.
      */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
