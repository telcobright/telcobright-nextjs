import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { site } from '@content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      {/*
        Extensions write their own attributes onto <body> before React
        hydrates — Grammarly adds data-gr-ext-installed, password managers do
        the same — which React reports as a hydration mismatch. This silences
        that for this element's own attributes only; a mismatch anywhere inside
        the tree is still reported.
      */}
      <body suppressHydrationWarning>
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
