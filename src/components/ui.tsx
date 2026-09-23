import { cn } from '@/lib/cn';

/**
 * A heading where some words carry the orange→indigo brand gradient, which is
 * how every section title on telcobright.com is set.
 */
export function GradientHeading({
  parts,
  as: Tag = 'h2',
  className,
  id,
}: {
  parts: readonly { text: string; accent: boolean }[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn('h-section', className)}>
      {parts.map((part, i) =>
        part.accent ? (
          <span key={i} className="text-gradient">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>;
}

/** The centred eyebrow + heading pair used by the lower home-page sections. */
export function SectionHeader({
  eyebrow,
  parts,
  id,
  className,
}: {
  eyebrow: string;
  parts: readonly { text: string; accent: boolean }[];
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn('text-center', className)} id={id} data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <GradientHeading parts={parts} className="mt-3" />
      {/* Closes the pair, and gives the centred stack something to sit on. */}
      <span aria-hidden="true" className="mx-auto mt-6 block h-0.5 w-16 rounded-full bg-brand-gradient" />
    </div>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
