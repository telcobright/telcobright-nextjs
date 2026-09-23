'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * The FAQ accordion. The live page opens the first question by default and
 * closes the others; only one is open at a time.
 *
 * The panel animates on `grid-template-rows` rather than being toggled with
 * `hidden`, so it opens and closes at its natural height with no measuring in
 * JavaScript. A closed panel carries `inert`, which keeps it out of the tab
 * order and off the accessibility tree while it stays in the DOM.
 */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              'card overflow-hidden',
              isOpen ? 'border-ink-200 shadow-card' : 'hover:border-ink-200 hover:shadow-card'
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center gap-4 px-5 py-5 text-left font-display text-[15px] font-bold text-ink-900 sm:px-6"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-[12px] font-semibold transition-colors duration-300',
                    isOpen ? 'bg-brand-gradient text-white' : 'bg-surface-subtle text-ink-400'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="flex-1">{item.q}</span>

                {/* A plus that rotates into a minus. */}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink-900" />
                  {/* The upright stroke swings down onto the flat one: plus → minus. */}
                  <span
                    className={cn(
                      'absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-ink-900 transition-transform duration-300 ease-out-expo',
                      isOpen ? 'rotate-90' : 'rotate-0'
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out-expo',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  inert={!isOpen}
                  className="px-5 pb-5 pl-16 text-[14px] leading-relaxed text-ink-500 sm:px-6 sm:pl-[4.5rem]"
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
