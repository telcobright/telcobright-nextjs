'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { media } from '@/lib/media';

export type GalleryPhoto = {
  image: string;
  alt: string;
  /** Intrinsic size, measured on the server. Null when it could not be read. */
  width: number | null;
  height: number | null;
};

/**
 * The office gallery.
 *
 * Laid out in columns rather than a grid of equal boxes, so every photograph
 * keeps its own shape and nothing is cropped — the portrait shots used to lose
 * half their height to a landscape tile. Tiles are sized to the source files,
 * which top out around 450px wide for most of these, so they are shown large
 * enough to read but not blown up past what the picture actually holds.
 *
 * Clicking one opens it full size, which is the real answer to "I want to see
 * the photograph": the page stays a page, and the picture gets the screen.
 */
export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((current) => (current === null ? null : (current + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };

    // The page behind must not scroll while the viewer is up.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  const active = open === null ? null : photos[open];

  return (
    <>
      {/*
        Two columns on anything but the widest screens: three made every tile
        about 370px, which is smaller than the old layout gave the landscape
        shots. Two puts them near 575px — comfortably the biggest these
        pictures have ever been on the page, and still close enough to the
        source files (most are 454px wide) not to look soft.
      */}
      <ul className="mt-12 gap-4 [column-count:1] sm:[column-count:2] sm:gap-5 2xl:[column-count:3]" data-reveal-children>
        {photos.map((photo, i) => (
          <li key={photo.image} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 ring-1 ring-ink-900/5 transition-shadow duration-500 ease-out-expo hover:shadow-lift"
            >
              <Image
                src={media(photo.image)}
                alt={photo.alt}
                width={photo.width ?? 800}
                height={photo.height ?? 600}
                sizes="(min-width: 1536px) 31vw, (min-width: 640px) 46vw, 92vw"
                className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />

              {/* Always on, not hover-only: half the visitors are on a phone. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
              />
              <span className="pointer-events-none absolute inset-x-5 bottom-4 text-left font-display text-[14px] font-medium leading-snug text-white">
                {photo.alt}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-3.5 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <Arrow direction="prev" onClick={() => step(-1)} />
              <Arrow direction="next" onClick={() => step(1)} />
            </>
          )}

          <figure onClick={(event) => event.stopPropagation()} className="max-h-full max-w-5xl">
            {/* Plain img: this is the full picture at its own size, and the
                point of the viewer is to serve exactly that. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media(active.image)}
              alt={active.alt}
              className="mx-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center font-display text-[14px] text-white/80">
              {active.alt}
              {photos.length > 1 && (
                <span className="ml-2 font-mono text-[12px] text-white/40">
                  {(open ?? 0) + 1}/{photos.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function Arrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={direction === 'prev' ? 'Previous photograph' : 'Next photograph'}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 ${
        direction === 'prev' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}
