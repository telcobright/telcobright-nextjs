import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getSite } from '@/server/content';

/**
 * Unmatched URLs land outside the (site) group, so this page brings the header
 * and footer with it rather than rendering bare.
 */
export default async function NotFound() {
  const site = await getSite();

  return (
    <>
      <Header site={site} />
      <main id="main">
      <PageHero eyebrow="404" title="We couldn’t find that page" />

      <section className="section bg-white">
        <div className="container-page max-w-xl">
          <p className="lede">
            The link may be out of date. Try the product index, or email us and we&rsquo;ll point
            you the right way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/solutions" className="btn-gradient">
              Browse products
            </Link>
            <a href="mailto:info@telcobright.com" className="btn-outline">
              Send a Message
            </a>
          </div>
        </div>
      </section>
      </main>
      <Footer site={site} />
    </>
  );
}
