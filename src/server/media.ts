import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { deleteUpload, listUploads, saveUpload, UPLOAD_DIR } from '@/server/store';

/**
 * The media library.
 *
 * Images the admin uploads go to `data/uploads/media` and are served by the
 * route handler at `/media/uploads/[...file]`, not from `public/`. Next reads
 * `public/` when the server boots, so a file written there after start is a
 * 404 until the next restart — which is exactly the kind of "it worked on my
 * machine, then it didn't" that an upload feature must not have.
 */

export const MEDIA_DIR = path.join(UPLOAD_DIR, 'media');
export const IMAGE_MAX_BYTES = 8 * 1024 * 1024;

const IMAGE_TYPES: Record<string, { ext: string; magic: number[][] }> = {
  'image/png': { ext: '.png', magic: [[0x89, 0x50, 0x4e, 0x47]] },
  'image/jpeg': { ext: '.jpg', magic: [[0xff, 0xd8, 0xff]] },
  'image/gif': { ext: '.gif', magic: [[0x47, 0x49, 0x46, 0x38]] },
  'image/webp': { ext: '.webp', magic: [[0x52, 0x49, 0x46, 0x46]] },
  'image/svg+xml': { ext: '.svg', magic: [] },
};

export class MediaError extends Error {}

/** A filename that is safe to write and still recognisable in the library. */
function safeName(original: string, ext: string): string {
  const base =
    path
      .basename(original, path.extname(original))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'image';
  return `${base}-${randomUUID().slice(0, 8)}${ext}`;
}

/** Stores an image and returns the path to use in content (`uploads/…`). */
export async function uploadImage(file: File): Promise<string> {
  if (!file || file.size === 0) throw new MediaError('Choose a file to upload.');
  if (file.size > IMAGE_MAX_BYTES) throw new MediaError('Images must be 8 MB or smaller.');

  const type = IMAGE_TYPES[file.type];
  if (!type) throw new MediaError('Upload a PNG, JPG, GIF, WEBP or SVG image.');

  const bytes = Buffer.from(await file.arrayBuffer());
  if (type.magic.length) {
    const ok = type.magic.some((magic) => magic.every((byte, i) => bytes[i] === byte));
    if (!ok) throw new MediaError('That file is not the image type it claims to be.');
  } else {
    // SVG is text, so there is no signature to check. An SVG can carry script,
    // and these are served from our own origin, so anything active is stripped.
    const svg = bytes.toString('utf8');
    if (!/<svg[\s>]/i.test(svg)) throw new MediaError('That file is not an SVG.');
    if (/<script|onload=|onerror=|javascript:/i.test(svg)) {
      throw new MediaError('That SVG contains script, which is not allowed.');
    }
  }

  const name = safeName(file.name, type.ext);
  await saveUpload(MEDIA_DIR, name, bytes);
  return `uploads/${name}`;
}

export async function listMedia() {
  const files = await listUploads(MEDIA_DIR);
  return files.map((f) => ({ ...f, path: `uploads/${f.name}` }));
}

export async function deleteMedia(name: string): Promise<void> {
  await deleteUpload(MEDIA_DIR, name);
}

export const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
