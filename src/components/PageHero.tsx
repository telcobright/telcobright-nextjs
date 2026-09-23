import Link from 'next/link';
import { Aurora } from '@/components/Aurora';
import { media } from '@/lib/media';

/**
 * The band every inner page opens with.
 *
 * The old site used one flat warm grey (#4A4344) here. This keeps that grey as
 * the top of a gradient and lets it fall into the near-black the header, the
 * product tiles and the footer already use, with the same tb_bg texture over
 * it — so an inner page reads as part of the same site as the home page rather
 * than as a panel borrowed from somewhere else.
 */
export function PageHero({
  title,
  eyebrow,
  subtitle,
  breadcrumb,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Trailing crumb only — "Home /" is always prepended. */
  breadcrumb?: string;
}) {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden bg-surface-dark"
      style={{ backgroundImage: 'linear-gradient(160deg, #3A3334 0%, #1A1314 55%, #0B0708 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage: `url(${media('2024/06/tb_bg.png')})`, backgroundPosition: '100% 0%' }}
      />
      <Aurora intensity="soft" />

      <div className="container-page relative pb-16 pt-32 lg:pb-20 lg:pt-36">
        {breadcrumb && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-display text-[13px] text-white/55">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/25">
                /
              </li>
              <li aria-current="page" className="text-white/90">
                {breadcrumb}
              </li>
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow eyebrow-light mb-3">{eyebrow}</p>}

        <h1 className={`h-page ${breadcrumb ? 'mt-6' : ''}`}>{title}</h1>

        {subtitle && (
          <p className="mt-5 flex max-w-3xl items-start gap-3 font-display text-[15px] leading-relaxed text-white/80">
            <span aria-hidden="true" className="mt-1 block h-5 w-[3px] shrink-0 rounded-full bg-brand-gradient" />
            {subtitle}
          </p>
        )}
      </div>

      <span aria-hidden="true" className="rule-gradient absolute inset-x-0 bottom-0" />
    </section>
  );
}
