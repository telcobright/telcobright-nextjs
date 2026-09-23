import Link from 'next/link';

/** Small building blocks shared by the editor screens. */

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-[-.6px] text-ink-900">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="adm-card mb-6">
      <div className="mb-5">
        <h2 className="adm-section-title">{title}</h2>
        {description && <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  hint,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="adm-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="adm-input"
      />
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  hint,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="adm-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="adm-input"
      />
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );
}

export function Check({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 text-[14px] text-ink-900">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 rounded border-ink-300 text-grad-to focus:ring-grad-to/30"
      />
      <span>
        {label}
        {hint && <span className="block text-[12px] text-ink-400">{hint}</span>}
      </span>
    </label>
  );
}

export function SaveButton({ label = 'Save changes' }: { label?: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 border-t border-ink-200/70 pt-5">
      <button type="submit" className="adm-btn-primary">
        {label}
      </button>
      <span className="text-[12px] text-ink-400">Changes go live immediately.</span>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-ink-200 bg-surface-subtle px-5 py-8 text-center text-[14px] text-ink-400">
      {children}
    </p>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="mb-6 inline-flex items-center gap-2 text-[13px] text-ink-500 hover:text-ink-900">
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  );
}

/** The gradient-word convention, explained once and reused. */
export const GRADIENT_HINT =
  'Wrap words in [square brackets] to give them the orange→indigo gradient.';
