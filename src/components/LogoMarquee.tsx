import { media } from '@/lib/media';

type Logo = { image: string; alt: string };

/**
 * The client logo strip.
 *
 * The marks come in wildly different proportions — BTRC's is a tall roundel,
 * Bangla Telecom's a wide lockup — so each sits in a fixed-height box and is
 * contained rather than scaled to a common width. They ride a seamless marquee:
 * the list is rendered twice and the track slides exactly half its width, so
 * the loop has no visible seam.
 *
 * With `prefers-reduced-motion` the track stops and wraps into a centred grid
 * instead (see `.logo-marquee` in globals.css), and the duplicate copy is
 * hidden from both the layout and the accessibility tree.
 */
export function LogoMarquee({ logos }: { logos: readonly Logo[] }) {
  if (logos.length === 0) return null;

  return (
    <div className="logo-marquee group relative py-4">
      {/* Feathered edges, so logos fade out rather than being chopped off. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28"
      />

      <div className="logo-marquee__track">
        <LogoRow logos={logos} />
        <LogoRow logos={logos} aria-hidden duplicate />
      </div>
    </div>
  );
}

function LogoRow({
  logos,
  duplicate = false,
  ...rest
}: {
  logos: readonly Logo[];
  duplicate?: boolean;
  'aria-hidden'?: boolean;
}) {
  return (
    <ul className="logo-marquee__row" {...rest}>
      {logos.map((logo) => (
        <li key={logo.image} className="shrink-0">
          {/*
            Full colour, not the usual grayscale treatment. These are real
            marks — the BTRC seal is red, Agni's is a colour arc — and draining
            them makes a genuine client list look like filler. A chip gives the
            row structure so mixed colours still read as one strip.
          */}
          <span className="flex h-[88px] w-[176px] items-center justify-center rounded-2xl border border-ink-200/70 bg-white px-5 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink-200 hover:shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media(logo.image)}
              alt={duplicate ? '' : logo.alt}
              title={duplicate ? undefined : logo.alt}
              loading="lazy"
              decoding="async"
              className="max-h-14 w-auto max-w-full object-contain"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
