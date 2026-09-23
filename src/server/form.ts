import type { TitlePart } from '@/server/types';

/**
 * Reading forms.
 *
 * The admin posts plain HTML forms, so everything arrives as strings. These
 * helpers do the boring half of every action: trim, coerce, and turn the two
 * conventions the editor uses — indexed field names for lists, and square
 * brackets for gradient words — back into the shapes the content model wants.
 */

export function str(form: FormData, name: string, fallback = ''): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : fallback;
}

/** Multi-line values keep their line breaks; only the ends are trimmed. */
export function text(form: FormData, name: string, fallback = ''): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : fallback;
}

export function bool(form: FormData, name: string): boolean {
  return form.get(name) === 'on' || form.get(name) === 'true';
}

/** A textarea where every non-empty line is one item. */
export function lines(form: FormData, name: string): string[] {
  return text(form, name)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Rows of a repeatable list, posted as `prefix.0.field`, `prefix.1.field`…
 *
 * Indices are read from the keys rather than counted, so a row removed in the
 * middle leaves a gap without shifting everything after it into the wrong
 * place. The result is ordered by index and gap-free.
 */
export function rows(form: FormData, prefix: string): Record<string, string>[] {
  const byIndex = new Map<number, Record<string, string>>();

  for (const [key, value] of form.entries()) {
    if (!key.startsWith(`${prefix}.`)) continue;
    const rest = key.slice(prefix.length + 1);
    const dot = rest.indexOf('.');
    if (dot === -1) continue;

    const index = Number(rest.slice(0, dot));
    if (!Number.isInteger(index)) continue;

    const field = rest.slice(dot + 1);
    const row = byIndex.get(index) ?? {};
    row[field] = typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : '';
    byIndex.set(index, row);
  }

  return [...byIndex.entries()].sort((a, b) => a[0] - b[0]).map(([, row]) => row);
}

/* ------------------------------------------------------- gradient words --- */

/**
 * Headings mix plain and gradient words: `Additional [Product] and [solutions]`.
 *
 * Square brackets are the whole syntax — one visible convention the editor can
 * learn in a second, instead of a row of fields per word.
 */
export function parseTitleParts(value: string): TitlePart[] {
  const parts: TitlePart[] = [];
  const pattern = /\[([^\]]*)\]/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > last) parts.push({ text: value.slice(last, match.index), accent: false });
    if (match[1]) parts.push({ text: match[1], accent: true });
    last = match.index + match[0].length;
  }
  if (last < value.length) parts.push({ text: value.slice(last), accent: false });

  return parts.length ? parts : [{ text: value, accent: false }];
}

export function formatTitleParts(parts: TitlePart[]): string {
  return parts.map((p) => (p.accent ? `[${p.text}]` : p.text)).join('');
}
