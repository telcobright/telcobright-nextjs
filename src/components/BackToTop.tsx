'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Back to top.
 *
 * The solution pages run to several screens, so the way back up should not be
 * a scroll of its own. It appears once you are far enough down that the header
 * is long gone, and stays out of the way until then.
 *
 * It stays mounted and fades, rather than mounting on a threshold: a button
 * that pops into existence under the cursor is easy to click by accident. When
 * hidden it is `inert`, so it is out of the tab order and off the
 * accessibility tree — invisible to everyone, not just to the eye.
 *
 * It also refuses to sit on top of the footer. While the footer is only partly
 * up the screen it steps above it; once the footer has taken most of the
 * viewport there is no room left to step into, so it bows out — by then the
 * end of the page is on screen anyway, and a button climbing into the header
 * to avoid the contact details would look stranger than no button at all.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // One read per frame at most: `scroll` fires far more often than the page
    // can paint, and this only ever crosses one threshold.
    let frame = 0;

    const measure = () => {
      frame = 0;

      // How much of the viewport the footer occupies is how far the button
      // would have to rise to clear it. `--lift` loses to the base offset in a
      // CSS max(), so away from the footer it costs nothing.
      const footer = document.querySelector('footer');
      const top = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const overlap = Math.max(0, window.innerHeight - top);
      const wanted = overlap ? overlap + 24 : 0;

      // Past this the button would be floating in the middle of the screen or
      // under the header, so it stands down instead.
      const ceiling = window.innerHeight * 0.45;

      ref.current?.style.setProperty('--lift', `${Math.round(Math.min(wanted, ceiling))}px`);
      setShown(window.scrollY > 700 && wanted <= ceiling);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function toTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toTop}
      inert={!shown}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'group fixed right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full sm:right-8',
        'bottom-[max(1.25rem,var(--lift,0px))] sm:bottom-[max(2rem,var(--lift,0px))]',
        'bg-brand-gradient text-white shadow-card transition-all duration-300 ease-out-expo',
        'hover:-translate-y-1 hover:shadow-glow focus-visible:-translate-y-1',
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
      style={{
        // Clear the home indicator on a phone, where the button sits low.
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
