import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Aurora } from '@/components/Aurora';
import { Faq } from '@/components/Faq';
import { Gallery as GalleryGrid, type GalleryPhoto } from '@/components/Gallery';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Spotlight } from '@/components/Spotlight';
import { Testimonials as TestimonialCarousel } from '@/components/Testimonials';
import { ArrowRight, Eyebrow, GradientHeading, SectionHeader } from '@/components/ui';
import { getHome, getSite } from '@/server/content';
import { imageSize } from '@/server/image-size';
import type { HomeContent } from '@/server/types';
import { media } from '@/lib/media';
import { cn } from '@/lib/cn';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    alternates: { canonical: '/' },
  };
}

/**
 * Every section reads from the store, so all of it is editable from
 * /admin/home. The section components take their slice as a prop rather than
 * reaching for module scope, which keeps them pure and previewable.
 */
export default async function HomePage() {
  const home = await getHome();

  return (
    <>
      <Hero hero={home.hero} heroCard={home.heroCard} />
      <Clients clients={home.clients} />
      <Products introduction={home.introduction} products={home.products} />
      <Additional additional={home.additional} />
      <Highlights highlights={home.highlights} />
      <Testimonials testimonials={home.testimonials} />
      <Gallery gallery={home.gallery} />
      <FaqSection faq={home.faq} />
    </>
  );
}

/* ---------------------------------------------------------------- hero --- */

function Hero({ hero, heroCard }: { hero: HomeContent['hero']; heroCard: HomeContent['heroCard'] }) {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden bg-surface-darker bg-cover bg-[position:100%_100%] bg-no-repeat"
      style={{ backgroundImage: `url(${media(hero.background)})` }}
    >
      {/*
        Aurora over the photograph, then a scrim that darkens the left third.
        The photograph is busy; without the scrim the white type sat on
        whatever happened to be under it.
      */}
      <Aurora intensity="bold" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.74)_0%,rgba(0,0,0,.38)_42%,rgba(0,0,0,0)_78%)]"
      />

      <div className="container-page relative pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,550px)]">
          <div>
            <p className="eyebrow eyebrow-light rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
              {hero.eyebrow}
            </p>

            <h1 className="h-hero mt-7">
              {hero.titleLead}
              <br />
              <span className="text-gradient">{hero.titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl font-display text-[16px] leading-[1.75] text-white/75 lg:text-[18px]">
              {hero.body}
            </p>

            <a href={hero.cta.href} className="btn-gradient mt-9">
              {hero.cta.label}
            </a>
          </div>

          {/*
            The appointment card. Glass rather than the old opaque panel: the
            hero photograph and the aurora carry on behind it, which is what
            ties the two halves of the band together.
          */}
          <Spotlight className="edge-lit group rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-lift backdrop-blur-xl transition-transform duration-500 ease-out-expo hover:-translate-y-1">
            <div className="relative z-[2]">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media(heroCard.image)}
                  alt={heroCard.imageAlt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex items-center gap-2 pt-7">
                <span className="font-display text-[15px] font-bold text-white">{heroCard.greeting}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(heroCard.greetingIcon)} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
              </div>

              <h2 className="mt-2 font-display text-[22px] font-bold capitalize leading-[1.2] tracking-[-.5px] text-white sm:text-[26px]">
                {heroCard.title}
              </h2>

              <a href={heroCard.cta.href} className="btn-light mt-6 px-5 py-3 text-[12px] uppercase tracking-[.5px]">
                {heroCard.cta.label}
              </a>

              <p className="mt-5 text-[13px] text-white/55">{heroCard.note}</p>
            </div>
          </Spotlight>
        </div>
      </div>

      <span aria-hidden="true" className="rule-gradient absolute inset-x-0 bottom-0" />
    </section>
  );
}

/* ------------------------------------------------------------- clients --- */

function Clients({ clients }: { clients: HomeContent['clients'] }) {
  return (
    <section aria-labelledby="clients-title" className="section-tight border-b border-ink-200/70 bg-surface">
      <div className="container-page">
        <div className="flex items-center gap-5">
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-ink-200 sm:block" />
          <h2
            id="clients-title"
            className="text-center font-display text-[15px] font-medium tracking-[.2px] text-ink-400 sm:text-[16px]"
          >
            {clients.title}
          </h2>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-ink-200 sm:block" />
        </div>
      </div>

      {/* Full-bleed: the strip runs edge to edge, not inside the container. */}
      <div className="mt-10">
        <LogoMarquee logos={clients.logos} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ products --- */

function Products({
  introduction,
  products,
}: {
  introduction: HomeContent['introduction'];
  products: HomeContent['products'];
}) {
  return (
    <section id="products" className="bg-surface pb-[clamp(4rem,2.75rem+4vw,7rem)] pt-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start lg:pt-4">
            <GradientHeading parts={introduction.titleParts} />
            <span aria-hidden="true" className="mt-7 block h-0.5 w-20 rounded-full bg-brand-gradient" />
            <p className="lede mt-6 max-w-md">{introduction.body}</p>
            <Link href={introduction.cta.href} className="btn-outline mt-8">
              {introduction.cta.label}
            </Link>
          </div>

          <ul className="space-y-5" data-reveal-children>
            {products.map((product, i) => (
              <li key={product.href}>
                <Spotlight
                  data-surface="dark"
                  className="card-dark edge-lit group h-full"
                  style={{
                    backgroundImage: `url(${media('2024/06/tb_bg.png')})`,
                    backgroundPosition: i % 2 === 0 ? '0% 0%' : '100% 100%',
                  }}
                >
                  <article className="relative z-[2] p-8 sm:p-10">
                    <h3 className="font-display text-[20px] font-medium tracking-[-.5px] sm:text-[24px]">
                      <span className="text-gradient">{product.title}</span>
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/65">{product.body}</p>
                    <Link href={product.href} className="link-arrow mt-6 hover:text-white">
                      Know More
                      <ArrowRight />
                    </Link>
                  </article>
                </Spotlight>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- additional --- */

function Additional({ additional }: { additional: HomeContent['additional'] }) {
  return (
    <section id="additional-solutions" className="section relative scroll-mt-0 bg-surface-muted">
      {/* The live section is cut on a diagonal at the top and bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-24 bg-surface"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-24 bg-surface"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 100%)' }}
      />

      <div className="container-page relative">
        <div className="text-center" data-reveal>
          <Eyebrow>{additional.eyebrow}</Eyebrow>
          <GradientHeading parts={additional.titleParts} className="mt-3" />
        </div>

        {/*
          Bento: the product shot is a tile of its own, two wide and two tall,
          and the six services fill in around it. One grid, unequal weights —
          rather than a picture with a list of identical cards bolted beneath.
        */}
        <ul className="bento mt-12" data-reveal-children>
          <li className="span-2-tall card flex items-center justify-center overflow-hidden p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media(additional.image)}
              alt={additional.imageAlt}
              className="h-auto w-full object-contain"
            />
          </li>

          {additional.services.map((service, i) => (
            <li
              key={service.title}
              className={cn(
                'card card-hover group flex flex-col gap-4 p-6',
                /* Four tiles sit beside the picture; whatever is left over
                   widens to fill the last row rather than leaving a hole. */
                i >= 4 && 'lg:col-span-2'
              )}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink-200/70 bg-surface-subtle shadow-soft transition-colors duration-500 group-hover:border-grad-to/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(service.icon)} alt="" width={26} height={26} className="h-[26px] w-[26px]" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[17px] font-bold leading-tight text-ink-900">{service.title}</h3>
                <p className="mt-2 font-display text-[14px] leading-[22px] text-ink-600">{service.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- highlights --- */

function Highlights({ highlights }: { highlights: HomeContent['highlights'] }) {
  return (
    <section className="section bg-surface">
      <div className="container-page space-y-6 lg:space-y-8">
        {highlights.map((item) => (
          <article
            key={item.image}
            data-reveal
            className="group overflow-hidden rounded-4xl ring-1 ring-ink-900/[0.06]"
            /* The pastel wash has a dark counterpart; both live on the token. */
            style={{ backgroundImage: 'var(--highlight-card)' }}
          >
            <div
              className={cn(
                'grid items-center gap-8 lg:grid-cols-2',
                item.reverse && 'lg:[&>*:first-child]:order-2'
              )}
            >
              <div className="px-8 py-12 sm:px-12 lg:py-16">
                <GradientHeading parts={item.titleParts} className="!text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)]" />
                <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-ink-700">{item.body}</p>
                <a href={item.cta.href} className="btn-dark mt-8">
                  {item.cta.label}
                </a>
              </div>
              <div className={cn('px-8 pb-10 lg:px-0 lg:pb-0', item.reverse && 'lg:pl-10')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media(item.image)}
                  alt={item.imageAlt}
                  className="h-auto w-full object-contain transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------- testimonials --- */

/**
 * Hidden entirely until there are real quotes to show. The old site rendered
 * this heading over an empty widget; an empty section with a heading is worse
 * than no section, so it is left out until `testimonials.items` is filled.
 */
function Testimonials({ testimonials }: { testimonials: HomeContent['testimonials'] }) {
  if (testimonials.items.length === 0) return null;

  return (
    <section id="testimonials" className="section bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow={testimonials.eyebrow} parts={testimonials.titleParts} />
        <TestimonialCarousel items={testimonials.items} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- gallery --- */

async function Gallery({ gallery }: { gallery: HomeContent['gallery'] }) {
  if (gallery.images.length === 0) return null;

  /*
    Each photograph is measured here, on the server, so the grid can lay it out
    at its own shape instead of cropping it into a uniform box — and so
    next/image knows the aspect ratio and the page does not shift as they load.
  */
  const photos: GalleryPhoto[] = await Promise.all(
    gallery.images.map(async (img) => {
      const size = await imageSize(img.image);
      return { image: img.image, alt: img.alt, width: size?.width ?? null, height: size?.height ?? null };
    })
  );

  return (
    <section id="gallery" className="section scroll-mt-24 bg-surface-muted">
      <div className="container-page">
        <SectionHeader eyebrow={gallery.eyebrow} parts={gallery.titleParts} />
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- faq --- */

function FaqSection({ faq }: { faq: HomeContent['faq'] }) {
  return (
    <section id="faq" className="section scroll-mt-24 bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow={faq.eyebrow} parts={faq.titleParts} />
        <Faq items={faq.items} />
      </div>
    </section>
  );
}
