import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { site } from '@content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { themeScript } from '@/lib/theme';
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

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning on <html> because the theme script below writes
      data-theme onto it before React sees the document, and on <body> because
      extensions write their own attributes there — Grammarly adds
      data-gr-ext-installed, password managers do the same. It covers each
      element's own attributes only; a mismatch anywhere inside the tree is
      still reported.
    */
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/*
          Blocking, and first: it puts the saved theme on <html> before the
          first paint, so there is no flash of the wrong background. See
          src/lib/theme.ts.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-brand-gradient focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-medium focus:text-white focus:shadow-glow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
