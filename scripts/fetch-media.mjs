#!/usr/bin/env node
/**
 * Pull every image the site references into ./public/media.
 *
 *   npm run fetch:media          # fill in what's missing
 *   npm run fetch:media -- --force   # re-download everything
 *
 * Files land at public/media/<yyyy>/<mm>/<name.ext> — the same shape the
 * content files reference, so nothing else needs changing.
 *
 * Three sources, tried in order for each file:
 *
 *   1. telcobright.com/wp-content/uploads/…
 *   2. the staging mirror (see MIRROR_ORIGIN)
 *   3. the mirror via images.weserv.nl
 *
 * Steps 2 and 3 exist because the whole 2023/03 upload folder — all 48 Billing
 * Solutions screenshots and all 32 SMS Gateway architecture diagrams — is gone
 * from telcobright.com and 404s there. The files survive on the staging host,
 * which blocks some networks outright; the image proxy fetches them from an IP
 * that is not blocked. See MIGRATION.md, "Recovered images".
 *
 * Note: the legacy WordPress install was compromised. This script only touches
 * image files and never executes anything it downloads, but do give the folder
 * a look before committing it.
 */

import { mkdir, writeFile, access, readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'media');
const ORIGIN = process.env.LEGACY_ORIGIN ?? 'https://telcobright.com';
const MIRROR_ORIGIN = process.env.MIRROR_ORIGIN ?? 'https://testing.brandprotektor.com';
const UPLOADS = `${ORIGIN}/wp-content/uploads/`;
const FORCE = process.argv.includes('--force');

/** Referenced by site chrome rather than by page content. */
const EXTRA = [
  '2024/06/Telcobright-Logo.png',
  '2024/01/Frame-4.png',
  '2024/01/footer-jetBlack.jpg',
  '2024/06/telcobright-siteicon.png',
  '2024/06/tb_bg.png',
  '2024/06/tb_bg-2.png',
];

/**
 * Already broken on telcobright.com and recoverable from nowhere: the page
 * pointed at "assets/img/sms_files/Image_024.jpg", a relative path left over
 * from the Word document the SMS Gateway page was built from. The content
 * generator renders that slot as a labelled placeholder instead.
 */
const KNOWN_LOST = new Set(['2023/03/Image_024.jpg']);

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'ico']);

const exists = async (p) => access(p).then(() => true, () => false);

/** Every /media/... path mentioned anywhere under ./content. */
async function referencedByContent() {
  const found = new Set();

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        const text = await readFile(full, 'utf8');
        for (const m of text.matchAll(/\/media\/([0-9]{4}\/[0-9]{2}\/[A-Za-z0-9._%-]+)/g)) found.add(m[1]);
        // content/home.ts stores bare paths ("2024/06/icon1.svg").
        for (const m of text.matchAll(/'([0-9]{4}\/[0-9]{2}\/[A-Za-z0-9._%-]+\.[a-z]{3,4})'/g)) found.add(m[1]);
      }
    }
  }

  await walk(join(ROOT, 'content'));
  await walk(join(ROOT, 'src'));
  return found;
}

async function listMediaLibrary() {
  const paths = new Set();

  for (let page = 1; page <= 20; page += 1) {
    const url = `${ORIGIN}/wp-json/wp/v2/media?per_page=100&page=${page}&_fields=source_url`;
    const res = await fetch(url).catch(() => null);
    if (!res || res.status === 400) break;
    if (!res.ok) break;

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) break;

    for (const item of items) {
      const src = String(item.source_url ?? '');
      if (src.startsWith(UPLOADS)) paths.add(src.slice(UPLOADS.length));
    }

    if (page >= Number(res.headers.get('x-wp-totalpages') ?? 1)) break;
  }

  return paths;
}

/** Source URLs to try, in order, for one upload-relative path. */
const sourcesFor = (relPath) => [
  `${ORIGIN}/wp-content/uploads/${relPath}`,
  `${MIRROR_ORIGIN}/wp-content/uploads/${relPath}`,
  `https://images.weserv.nl/?url=${MIRROR_ORIGIN.replace(/^https?:\/\//, '')}/wp-content/uploads/${relPath}&n=-1`,
];

async function download(relPath) {
  const target = join(OUT_DIR, relPath);
  if (!FORCE && (await exists(target))) return { status: 'skipped' };

  for (const url of sourcesFor(relPath)) {
    const res = await fetch(url, {
      headers: { 'user-agent': 'telcobright-site-migration', accept: 'image/*,*/*' },
    }).catch(() => null);
    if (!res?.ok) continue;

    const buffer = Buffer.from(await res.arrayBuffer());
    // The proxy answers a miss with a small JSON error body, not an image.
    if (buffer.length < 1000 || buffer.subarray(0, 1).toString() === '{') continue;

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, buffer);
    return { status: 'saved', kb: Math.round(buffer.length / 1024), url };
  }

  return { status: 'failed' };
}

async function main() {
  console.log(`Fetching media for ${ORIGIN} …\n`);

  const paths = new Set([...EXTRA, ...(await referencedByContent()), ...(await listMediaLibrary())]);
  const wanted = [...paths]
    .filter((p) => ALLOWED_EXT.has(p.split('.').pop()?.toLowerCase() ?? ''))
    .filter((p) => !KNOWN_LOST.has(p))
    .sort();

  console.log(`${wanted.length} files to consider.\n`);

  let saved = 0;
  let skipped = 0;
  const failed = [];

  for (const relPath of wanted) {
    const result = await download(relPath);
    if (result.status === 'skipped') skipped += 1;
    else if (result.status === 'failed') {
      failed.push(relPath);
      console.warn(`  ✗ ${relPath}`);
    } else {
      saved += 1;
      const via = result.url.includes('weserv') ? ' (via proxy)' : result.url.includes(MIRROR_ORIGIN) ? ' (mirror)' : '';
      console.log(`  ✓ ${relPath} — ${result.kb} KB${via}`);
    }
  }

  console.log(`\nDone. ${saved} saved, ${skipped} already present, ${failed.length} failed.`);
  if (KNOWN_LOST.size) {
    console.log(`Skipped as unrecoverable: ${[...KNOWN_LOST].join(', ')}`);
  }
  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
