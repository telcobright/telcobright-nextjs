import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="We couldn’t find that page" />

      <section className="section bg-surface">
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
    </>
  );
}
