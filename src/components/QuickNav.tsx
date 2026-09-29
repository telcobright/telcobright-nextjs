'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * The "Quick Navigation" sidebar the solution pages carry.
 *
 * On the live site this widget never finishes loading — it renders a spinner
 * and nothing else. Here it does what it was meant to do: list the page's
 * headings and highlight the one you are reading.
 *
 * Below lg it sits above the article rather than beside it, so it starts
 * folded: a phone reader sees the content first and opens the list on demand.
 */
export function QuickNav({ items }: { items: { id: string; text: string; level: number }[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Quick Navigation" className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="quick-nav-list"
        className={cn(
          'flex w-full items-center gap-2.5 border-ink-200/70 bg-surface-subtle px-5 py-4 text-left font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-900 lg:pointer-events-none lg:border-b',
          open && 'border-b'
        )}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
        Quick Navigation
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn('ml-auto transition-transform duration-300 lg:hidden', open && 'rotate-180')}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/*
        The rail is one continuous hairline; the active item paints its own
        segment of it in the brand gradient, so the marker reads as a position
        on the page rather than as a selected list row.
      */}
      <ul
        id="quick-nav-list"
        className={cn('max-h-[min(70vh,40rem)] overflow-y-auto py-2 pr-1 lg:block', open ? 'block' : 'hidden')}
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'relative block border-l-2 py-2 pr-3 text-[13px] leading-snug transition-colors duration-300',
                  item.level >= 4 ? 'pl-9' : item.level === 3 ? 'pl-7' : 'pl-5',
                  isActive
                    ? 'border-transparent font-semibold text-ink-900'
                    : 'border-ink-200/70 text-ink-500 hover:border-ink-300 hover:text-ink-900'
                )}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-0.5 inset-y-0 w-0.5 rounded-full bg-brand-gradient"
                  />
                )}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
