'use client';

import { useEffect, useState } from 'react';
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
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // One read per frame at most: `scroll` fires far more often than the page
    // can paint, and this only ever crosses one threshold.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setShown(window.scrollY > 700);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function toTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      inert={!shown}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'group fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full',
        'bg-brand-gradient text-white shadow-card transition-all duration-300 ease-out-expo',
        'hover:-translate-y-1 hover:shadow-glow focus-visible:-translate-y-1 sm:bottom-8 sm:right-8',
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
