import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedPages } from '@/server/content';
import { ArrowRight, GradientHeading } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Spotlight } from '@/components/Spotlight';
import { media } from '@/lib/media';

/**
 * An index of every product page.
 *
 * telcobright.com has no page at this URL — the products are reached from the
 * header dropdown and the home-page cards. This index exists so the sitemap and
 * the 404 page have somewhere to point; nothing on the site links to it.
 */
export const metadata: Metadata = {
  title: 'Products & Solutions',
  description:
    'Our company offers a range of innovative products and solutions to meet your business needs.',
  alternates: { canonical: '/solutions' },
};

export default async function SolutionsIndexPage() {
  const solutions = await getPublishedPages();

  return (
    <>
      <PageHero title="Products & Solutions" breadcrumb="Products & Solutions" />

      <section className="section bg-surface">
        <div className="container-page">
          <GradientHeading
            parts={[
              { text: 'Product', accent: true },
              { text: ' and ', accent: false },
              { text: 'solutions', accent: true },
              { text: ' we provide', accent: false },
            ]}
          />
          <span aria-hidden="true" className="mt-7 block h-0.5 w-20 rounded-full bg-brand-gradient" />

          <ul className="mt-12 grid gap-5 lg:grid-cols-2" data-reveal-children>
            {solutions.map((s, i) => (
              <li key={s.slug}>
                <Spotlight
                  data-surface="dark"
                  className="card-dark edge-lit group h-full"
                  style={{
                    backgroundImage: `url(${media('2024/06/tb_bg.png')})`,
                    backgroundPosition: i % 2 === 0 ? '0% 0%' : '100% 100%',
                  }}
                >
                  <article className="relative z-[2] p-8 sm:p-10">
                    <h2 className="font-display text-[20px] font-medium tracking-[-.5px] sm:text-[24px]">
                      <span className="text-gradient">{s.title}</span>
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/65">{s.summary}</p>
                    <Link href={`/solutions/${s.slug}`} className="link-arrow mt-6 hover:text-white">
                      Know More
                      <ArrowRight />
                    </Link>
                  </article>
                </Spotlight>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
