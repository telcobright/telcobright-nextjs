'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { media } from '@/lib/media';
import { cn } from '@/lib/cn';

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
};

/**
 * The client review carousel.
 *
 * It renders nothing while `items` is empty, which is the state the site ships
 * in — there are no real quotes yet, and none were invented. Fill
 * `testimonials.items` in content/home.ts and the section appears.
 *
 * Scrolling is native (scroll-snap on a horizontally scrollable list), so it
 * works with a trackpad, a touch swipe, the arrow buttons and the keyboard
 * without a carousel library.
 */
export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, clientWidth, scrollWidth } = track;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);

    const cards = Array.from(track.children) as HTMLElement[];
    const centre = scrollLeft + clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, items.length]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="w-[min(100%,26rem)] shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <figure className="card card-hover flex h-full flex-col p-8">
              <Quote />
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink-500">
                {item.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-ink-200/70 pt-6">
                {item.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={media(item.image)}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white ring-offset-2 ring-offset-ink-100"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-bold text-ink-900">{item.name}</p>
                  {(item.role || item.company) && (
                    <p className="text-[13px] text-ink-400">
                      {[item.role, item.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <Arrow
            direction="prev"
            disabled={atStart}
            onClick={() => scrollToCard(Math.max(0, active - 1))}
          />

          <ul className="flex items-center gap-2">
            {items.map((item, i) => (
              <li key={`${item.name}-dot-${i}`}>
                <button
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === active ? 'w-6 bg-brand-gradient' : 'w-2 bg-ink-200 hover:bg-ink-300'
                  )}
                />
              </li>
            ))}
          </ul>

          <Arrow
            direction="next"
            disabled={atEnd}
            onClick={() => scrollToCard(Math.min(items.length - 1, active + 1))}
          />
        </div>
      )}
    </div>
  );
}

function Arrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous review' : 'Next review'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-900 transition-colors hover:border-ink-900 disabled:pointer-events-none disabled:opacity-35"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Quote() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true">
      <path
        d="M12.4 0v8.6c0 6-3.2 12-9.9 15.4l-2-3.6C4.3 18.2 6.5 15.6 7 12.6H2.5V0h9.9zm15.6 0v8.6c0 6-3.2 12-9.9 15.4l-2-3.6c3.8-2.2 6-4.8 6.5-7.8h-4.5V0H28z"
        fill="url(#quote-gradient)"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="quote-gradient" x1="0" y1="24" x2="30" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA580C" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
