/**
 * All imagery still lives in the legacy WordPress uploads folder.
 *
 * `npm run fetch:media` copies it into /public/media, preserving the
 * yyyy/mm/name.ext shape. Once that has run, set NEXT_PUBLIC_MEDIA_SOURCE=local
 * (or just delete the env var — local is the default) and nothing else changes.
 */
const LEGACY_BASE = 'https://telcobright.com/wp-content/uploads';

/**
 * GitHub Pages serves a project repo under /<repo>, so every absolute path
 * needs that prefix. `next/link` and `next/image` apply `basePath` themselves;
 * a plain <img src="/media/…"> does not, and nearly every image on this site
 * is a plain <img>. Routing them all through here is what makes one build
 * config enough.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function media(path: string): string {
  const clean = path.replace(/^\/+/, '');
  // Anything the admin uploaded lives in data/uploads/media and is served by a
  // route handler, so it stays local even when the legacy host is in use — it
  // never existed on WordPress. (In a static export those files are copied
  // into the output instead; see scripts/build-static.mjs.)
  if (clean.startsWith('uploads/')) return `${BASE}/media/${clean}`;
  return process.env.NEXT_PUBLIC_MEDIA_SOURCE === 'legacy'
    ? `${LEGACY_BASE}/${clean}`
    : `${BASE}/media/${clean}`;
}
