/**
 * All imagery still lives in the legacy WordPress uploads folder.
 *
 * `npm run fetch:media` copies it into /public/media, preserving the
 * yyyy/mm/name.ext shape. Once that has run, set NEXT_PUBLIC_MEDIA_SOURCE=local
 * (or just delete the env var — local is the default) and nothing else changes.
 */
const LEGACY_BASE = 'https://telcobright.com/wp-content/uploads';

export function media(path: string): string {
  const clean = path.replace(/^\/+/, '');
  // Anything the admin uploaded lives in data/uploads/media and is served by a
  // route handler, so it stays local even when the legacy host is in use — it
  // never existed on WordPress.
  if (clean.startsWith('uploads/')) return `/media/${clean}`;
  return process.env.NEXT_PUBLIC_MEDIA_SOURCE === 'legacy'
    ? `${LEGACY_BASE}/${clean}`
    : `/media/${clean}`;
}
