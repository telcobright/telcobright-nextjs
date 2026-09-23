'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * The "Quick Navigation" sidebar the solution pages carry.
 *
 * On the live site this widget never finishes loading — it renders a spinner
 * and nothing else. Here it does what it was meant to do: list the page's
 * headings and highlight the one you are reading.
 */
export function QuickNav({ items }: { items: { id: string; text: string; level: number }[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

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
      <p className="flex items-center gap-2.5 border-b border-ink-200/70 bg-surface-subtle px-5 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-900">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
        Quick Navigation
      </p>

      {/*
        The rail is one continuous hairline; the active item paints its own
        segment of it in the brand gradient, so the marker reads as a position
        on the page rather than as a selected list row.
      */}
      <ul className="max-h-[min(70vh,40rem)] overflow-y-auto py-2 pr-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
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
