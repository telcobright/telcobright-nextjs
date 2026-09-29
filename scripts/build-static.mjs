#!/usr/bin/env node
/**
 * Build the site as static files, for GitHub Pages.
 *
 * The site as it stands needs a server: an admin behind a session cookie,
 * Server Actions, CV uploads, a media route and eleven real 301s. A static
 * host has none of that, and `output: 'export'` refuses to build while any of
 * it is in the tree. So this takes the server half *out*, exports, and puts it
 * back — the repository is unchanged when the script finishes, whether it
 * succeeded or not.
 *
 * What the static build gives up, and what it does instead:
 *
 *   /admin              gone. Run it locally (`npm run dev`), edit, then
 *                       commit data/ — the next deploy carries the changes.
 *   apply with a CV     an email with the role in the subject, or a form
 *                       service if NEXT_PUBLIC_APPLY_FORM_URL is set.
 *   contact form        email and phone.
 *   11 legacy 301s      meta-refresh stubs with a canonical link. Search
 *                       engines treat those as redirects; they are not as
 *                       good as the real thing, and they cost a round trip.
 *   uploaded images     copied out of data/uploads into the output.
 *
 * Usage:  npm run build:static
 */
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects } from '../content/redirects.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STASH = path.join(ROOT, '.static-build-stash');
const OUT = path.join(ROOT, 'out');

/** Everything that cannot exist in a static export, moved aside for the build. */
const MOVE = [
  'src/app/admin', // the editor: sessions, Server Actions, force-dynamic
  'src/app/api', // the contact endpoint
  'src/app/media', // serves uploads at runtime
  'src/proxy.ts', // guards /admin
  'src/app/(site)/careers/actions.ts', // the application Server Action
  'src/components/admin', // its forms import those actions by path
];

/** Files replaced for the build, then restored byte for byte. */
const SWAP = [
  ['src/components/ApplyForm.tsx', 'src/components/static/ApplyForm.static.tsx'],
  ['src/components/ContactForm.tsx', 'src/components/static/ContactForm.static.tsx'],
];

/** Small edits that only make sense in a static build. */
const EDIT = [
  {
    file: 'src/app/(site)/careers/[slug]/page.tsx',
    from: 'export const dynamicParams = true;',
    // Export refuses to build with dynamicParams on: there is no server to
    // render a job posted after the build, so only what exists now is emitted.
    to: 'export const dynamicParams = false;',
  },
];

const log = (msg) => console.log(`[static] ${msg}`);

/**
 * Where the site will be served from.
 *
 * GitHub Pages puts a project repo under /<repo>, a <user>.github.io repo and
 * a custom domain at the root. Getting this wrong breaks every stylesheet and
 * every image, so it is worked out from the repository rather than typed:
 *
 *   NEXT_PUBLIC_BASE_PATH   if set, wins (use '' for a custom domain)
 *   public/CNAME            a custom domain, so the root
 *   GITHUB_REPOSITORY       in Actions
 *   the git remote          locally
 *
 * Git Bash on Windows rewrites a lone `/name` argument into a Windows path, so
 * a value that arrives looking like `C:/Program Files/…` is repaired here
 * rather than failing the build twenty seconds later.
 */
async function detectBasePath() {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH;
  if (fromEnv !== undefined) return normalisePath(fromEnv);

  if (await exists(path.join(ROOT, 'public', 'CNAME'))) {
    log('public/CNAME found — building for a custom domain at the root');
    return '';
  }

  let repo = process.env.GITHUB_REPOSITORY;
  if (!repo) {
    try {
      repo = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: ROOT })
        .toString()
        .trim();
    } catch {
      return '';
    }
  }

  const name = repo.replace(/\.git$/, '').split('/').pop() ?? '';
  if (!name || name.endsWith('.github.io')) return '';
  return `/${name}`;
}

function normalisePath(value) {
  let v = value.trim();
  if (!v) return '';
  // Git Bash turned `/telcobright-nextjs` into `C:/Program Files/…/name`.
  if (/^[A-Za-z]:/.test(v)) {
    const repaired = `/${v.split('/').pop()}`;
    log(`base path looked mangled by the shell; using ${repaired}`);
    return repaired;
  }
  if (!v.startsWith('/')) v = `/${v}`;
  return v.replace(/\/$/, '');
}

/**
 * Open job posts, read the way the site reads them.
 *
 * With no posts there is nothing for /careers/[slug] to generate, and an
 * export refuses to build a dynamic route with an empty list. That is the
 * right complaint: with no jobs there should be no job pages. The careers
 * index still builds and shows its empty state.
 */
async function openJobs() {
  const file = path.join(process.env.DATA_DIR || path.join(ROOT, 'data'), 'jobs.json');
  try {
    const jobs = JSON.parse(await fs.readFile(file, 'utf8'));
    const today = new Date().toISOString().slice(0, 10);
    return jobs.filter((j) => j.status === 'open' && (!j.deadline || j.deadline >= today));
  } catch {
    return [];
  }
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/** Move the server half into the stash, keeping its relative layout. */
async function stash() {
  await fs.mkdir(STASH, { recursive: true });

  for (const rel of MOVE) {
    const src = path.join(ROOT, rel);
    if (!(await exists(src))) continue;
    const dest = path.join(STASH, 'moved', rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.rename(src, dest);
    log(`set aside ${rel}`);
  }

  for (const [target, replacement] of SWAP) {
    const src = path.join(ROOT, target);
    if (!(await exists(src))) continue;
    const dest = path.join(STASH, 'swapped', target);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    await fs.copyFile(path.join(ROOT, replacement), src);
    log(`swapped ${path.basename(target)} for the static version`);
  }

  for (const { file, from, to } of EDIT) {
    const src = path.join(ROOT, file);
    // The file may have been set aside a moment ago — the job route is left
    // out entirely when there are no posts.
    if (!(await exists(src))) continue;
    const before = await fs.readFile(src, 'utf8');
    if (!before.includes(from)) continue;
    const dest = path.join(STASH, 'edited', file);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, before);
    await fs.writeFile(src, before.replace(from, to));
    log(`edited ${path.basename(file)}`);
  }
}

/** Put everything back. Runs even when the build throws. */
async function restore() {
  if (!(await exists(STASH))) return;

  for (const rel of MOVE) {
    const from = path.join(STASH, 'moved', rel);
    if (!(await exists(from))) continue;
    const to = path.join(ROOT, rel);
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.rm(to, { recursive: true, force: true });
    await fs.rename(from, to);
  }

  for (const [target] of SWAP) {
    const from = path.join(STASH, 'swapped', target);
    if (!(await exists(from))) continue;
    await fs.copyFile(from, path.join(ROOT, target));
  }

  for (const { file } of EDIT) {
    const from = path.join(STASH, 'edited', file);
    if (!(await exists(from))) continue;
    await fs.copyFile(from, path.join(ROOT, file));
  }

  await fs.rm(STASH, { recursive: true, force: true });
  log('tree restored');
}

/**
 * A meta-refresh page for each legacy URL.
 *
 * Not a 301 — a static host cannot send one. The canonical link is what tells
 * a crawler where the page really lives; the refresh is what moves a person.
 */
async function writeRedirectStubs(basePath) {
  let written = 0;

  for (const { source, destination } of redirects) {
    const target = `${basePath}${destination}/`;
    const dir = path.join(OUT, source.replace(/^\//, ''));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      path.join(dir, 'index.html'),
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Moved</title>
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${target}" />
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`
    );
    written++;
  }

  log(`${written} redirect stubs written`);
}

/** Uploads live outside public/, so the export does not pick them up. */
async function copyUploads() {
  const from = path.join(process.env.DATA_DIR || path.join(ROOT, 'data'), 'uploads', 'media');
  if (!(await exists(from))) return;

  const to = path.join(OUT, 'media', 'uploads');
  await fs.mkdir(to, { recursive: true });
  const files = await fs.readdir(from);
  for (const name of files) {
    if (name.endsWith('.tmp')) continue;
    await fs.copyFile(path.join(from, name), path.join(to, name));
  }
  if (files.length) log(`${files.length} uploaded image(s) copied into the output`);
}

async function main() {
  // A previous run that was killed mid-build would have left the stash behind.
  if (await exists(STASH)) {
    log('a previous run left files aside — restoring them first');
    await restore();
  }

  const basePath = await detectBasePath();
  log(basePath ? `base path: ${basePath}` : 'base path: none (custom domain or user site)');

  const jobs = await openJobs();
  if (jobs.length === 0) {
    MOVE.push('src/app/(site)/careers/[slug]');
    log('no open job posts — the job-page route is left out of this build');
  } else {
    log(`${jobs.length} open job post(s) will be generated`);
  }

  try {
    await stash();

    // The generated route types from the last dev/build still name the routes
    // that are now set aside, and tsc checks them. They are regenerated by the
    // build, so the stale copy only ever gets in the way.
    await fs.rm(path.join(ROOT, '.next'), { recursive: true, force: true });

    log('building…');
    execFileSync('npx', ['next', 'build'], {
      cwd: ROOT,
      stdio: 'inherit',
      env: { ...process.env, STATIC_EXPORT: '1', NEXT_PUBLIC_BASE_PATH: basePath },
      shell: process.platform === 'win32',
    });
  } finally {
    await restore();
  }

  await writeRedirectStubs(basePath);
  await copyUploads();

  // Without this, Pages runs the output through Jekyll, which drops _next/.
  await fs.writeFile(path.join(OUT, '.nojekyll'), '');

  log(`done — ${path.relative(ROOT, OUT)}/ is ready to publish`);
}

main().catch(async (err) => {
  await restore();
  console.error(err.message);
  process.exit(1);
});
