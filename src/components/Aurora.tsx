import { cn } from '@/lib/cn';

/**
 * The ambient light behind every dark band.
 *
 * Two large blobs in the brand stops, blurred to the point of being pure
 * colour, on long offset orbits so the light never repeats at an interval the
 * eye can catch — and a film-grain layer over the top, which gives the flat
 * areas tooth and, more usefully, dithers the wide gradients so they do not
 * band on an 8-bit display.
 *
 * It costs one element and no image request. `prefers-reduced-motion` freezes
 * the orbits (see the global rule in globals.css); the colour stays.
 */
export function Aurora({
  className,
  intensity = 'default',
}: {
  className?: string;
  /** `soft` for bands behind body copy, `bold` for the home hero. */
  intensity?: 'soft' | 'default' | 'bold';
}) {
  const opacity = { soft: 'opacity-40', default: 'opacity-60', bold: 'opacity-90' }[intensity];

  return (
    <div aria-hidden="true" className={cn('aurora grain', opacity, className)}>
      <span className="aurora__blob animate-aurora-a -left-[15%] -top-[45%] h-[70vw] w-[70vw] bg-grad-from/25 sm:h-[46vw] sm:w-[46vw]" />
      <span className="aurora__blob animate-aurora-b -bottom-[55%] right-[-10%] h-[70vw] w-[70vw] bg-grad-to/25 sm:h-[50vw] sm:w-[50vw]" />
    </div>
  );
}
