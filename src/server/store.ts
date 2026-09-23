import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

/**
 * The store.
 *
 * Everything the admin can change lives as JSON under `data/`, one document
 * per thing: `site.json`, `home.json`, `pages/<slug>.json`, `jobs.json`,
 * `applications.json`, `users.json`. Uploads sit beside them in
 * `data/uploads/`.
 *
 * Why files rather than a database: this site has nine pages, a handful of job
 * posts and one editor. A JSON document per collection is the whole schema,
 * a backup is a folder copy, and there is no service to run or keep patched.
 * Everything that touches disk goes through this module, so moving to
 * Postgres later means rewriting this file and nothing else.
 *
 * Writes are atomic — write a temp file, then rename over the target, which is
 * atomic on both NTFS and POSIX — and serialised per document, so two saves
 * landing together cannot interleave into a half-written file.
 */

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), 'data');

export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
export const CV_DIR = path.join(UPLOAD_DIR, 'cv');

/** One promise chain per document: saves queue instead of racing. */
const queues = new Map<string, Promise<unknown>>();

function docPath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Reads a document, or returns `fallback` when it has never been saved.
 *
 * A malformed file is treated as missing rather than crashing the page: a
 * broken save should not take the public site down. It is left on disk with a
 * `.corrupt` suffix so it can be looked at.
 */
export async function readDoc<T>(name: string, fallback: T): Promise<T> {
  const file = docPath(name);
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') return fallback;
    if (err instanceof SyntaxError) {
      await fs.rename(file, `${file}.corrupt-${Date.now()}`).catch(() => {});
      console.error(`[store] ${name}.json was not valid JSON; kept as .corrupt and using the default`);
      return fallback;
    }
    throw err;
  }
}

/** Writes a document atomically, queued behind any write already in flight. */
export async function writeDoc<T>(name: string, value: T): Promise<T> {
  const run = async () => {
    const file = docPath(name);
    await ensureDir(path.dirname(file));
    const tmp = `${file}.${randomUUID()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(value, null, 2), 'utf8');
    await fs.rename(tmp, file);
    return value;
  };

  const queued = (queues.get(name) ?? Promise.resolve()).then(run, run);
  queues.set(
    name,
    queued.catch(() => {})
  );
  return queued as Promise<T>;
}

/**
 * Read–modify–write under the same queue, so a mutation cannot be built on a
 * snapshot another save has already replaced.
 */
export async function updateDoc<T>(name: string, fallback: T, mutate: (current: T) => T | Promise<T>): Promise<T> {
  const run = async () => {
    const current = await readDoc<T>(name, fallback);
    const next = await mutate(current);
    const file = docPath(name);
    await ensureDir(path.dirname(file));
    const tmp = `${file}.${randomUUID()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(next, null, 2), 'utf8');
    await fs.rename(tmp, file);
    return next;
  };

  const queued = (queues.get(name) ?? Promise.resolve()).then(run, run);
  queues.set(
    name,
    queued.catch(() => {})
  );
  return queued as Promise<T>;
}

/** Deletes a document. Missing is not an error. */
export async function deleteDoc(name: string): Promise<void> {
  await fs.rm(docPath(name), { force: true });
}

/** The slugs of every document in a folder under `data/`, without `.json`. */
export async function listDocs(folder: string): Promise<string[]> {
  try {
    const names = await fs.readdir(path.join(DATA_DIR, folder));
    return names.filter((n) => n.endsWith('.json')).map((n) => n.slice(0, -'.json'.length));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

/* -------------------------------------------------------------- uploads --- */

export async function saveUpload(dir: string, filename: string, data: Buffer): Promise<void> {
  await ensureDir(dir);
  const target = path.join(dir, filename);
  const tmp = `${target}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, target);
}

export async function readUpload(dir: string, filename: string): Promise<Buffer> {
  // Resolve and confirm the result is still inside `dir`, so a crafted name
  // ("../../data/users.json") cannot read its way out of the upload folder.
  const target = path.resolve(dir, filename);
  if (target !== path.join(path.resolve(dir), path.basename(filename))) {
    throw new Error('Invalid upload path');
  }
  return fs.readFile(target);
}

export async function deleteUpload(dir: string, filename: string): Promise<void> {
  const target = path.resolve(dir, filename);
  if (target !== path.join(path.resolve(dir), path.basename(filename))) return;
  await fs.rm(target, { force: true });
}

export async function listUploads(dir: string): Promise<{ name: string; size: number; modified: number }[]> {
  try {
    const names = await fs.readdir(dir);
    const rows = await Promise.all(
      names
        .filter((n) => !n.endsWith('.tmp'))
        .map(async (name) => {
          const stat = await fs.stat(path.join(dir, name));
          return { name, size: stat.size, modified: stat.mtimeMs };
        })
    );
    return rows.sort((a, b) => b.modified - a.modified);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

export { DATA_DIR };
