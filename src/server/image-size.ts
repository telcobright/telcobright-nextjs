import { promises as fs } from 'node:fs';
import path from 'node:path';
import { MEDIA_DIR } from '@/server/media';

/**
 * The intrinsic size of a local image.
 *
 * Read from the file's own header — a few dozen bytes, never the whole image —
 * so a gallery can lay a photograph out at its own shape without anyone having
 * to type dimensions into a form. Results are memoised: these files do not
 * change under a running server, and an upload gets a new name.
 */

export type ImageSize = { width: number; height: number };

const cache = new Map<string, ImageSize | null>();

function parse(buffer: Buffer): ImageSize | null {
  // PNG: IHDR is always first, at a fixed offset.
  if (buffer.length > 24 && buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // GIF: logical screen descriptor, little-endian.
  if (buffer.length > 10 && buffer.subarray(0, 3).toString('latin1') === 'GIF') {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  // WEBP (VP8X / VP8 / VP8L). Only the lossy and extended forms are common
  // here; anything else falls through and the caller copes without a size.
  if (buffer.length > 30 && buffer.subarray(0, 4).toString('latin1') === 'RIFF') {
    const format = buffer.subarray(12, 16).toString('latin1');
    if (format === 'VP8X') {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (format === 'VP8 ') {
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
  }

  // JPEG: walk the segments to the start-of-frame, which carries the size.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 2;
    while (i < buffer.length - 9) {
      if (buffer[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buffer[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: buffer.readUInt16BE(i + 7), height: buffer.readUInt16BE(i + 5) };
      }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      i += 2 + buffer.readUInt16BE(i + 2);
    }
  }

  return null;
}

/** `path` is a media path: `2024/06/photo.png`, or `uploads/photo-ab12.png`. */
export async function imageSize(mediaPath: string): Promise<ImageSize | null> {
  const clean = mediaPath.replace(/^\/+/, '');
  if (cache.has(clean)) return cache.get(clean)!;

  const file = clean.startsWith('uploads/')
    ? path.join(MEDIA_DIR, path.basename(clean))
    : path.join(process.cwd(), 'public', 'media', clean);

  let size: ImageSize | null = null;
  try {
    const handle = await fs.open(file, 'r');
    try {
      // Enough for every header above; JPEG's start-of-frame can sit behind a
      // large EXIF block, so this is generous rather than minimal.
      const buffer = Buffer.alloc(65536);
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
      size = parse(buffer.subarray(0, bytesRead));
    } finally {
      await handle.close();
    }
  } catch {
    size = null;
  }

  cache.set(clean, size);
  return size;
}
