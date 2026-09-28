'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * A tile that lights up under the cursor.
 *
 * The only thing JavaScript does here is write the pointer position into two
 * custom properties; the gradient, the fade and the fallback all live in
 * `.spotlight` in globals.css. Nothing is measured on render, nothing is
 * stored in state, and no work happens at all on a touch device — the hover
 * media query keeps the layer at zero opacity there.
 *
 * Content inside needs to sit above the light: wrap it in `relative z-[2]`,
 * because the layer is an absolutely positioned pseudo-element and would
 * otherwise paint over plain in-flow text.
 */
export function Spotlight({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={cn('spotlight', className)} {...rest}>
      {children}
    </div>
  );
}
