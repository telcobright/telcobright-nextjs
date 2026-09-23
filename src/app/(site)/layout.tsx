import { BackToTop } from '@/components/BackToTop';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSite } from '@/server/content';

/**
 * The public site: header, content, footer.
 *
 * Header and footer take their nav, contact details and logos from the store,
 * so everything in them is editable from /admin/site.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-brand-gradient focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-medium focus:text-white focus:shadow-glow"
      >
        Skip to content
      </a>
      <Header site={site} />
      <main id="main">{children}</main>
      <Footer site={site} />
      <BackToTop />
    </>
  );
}
