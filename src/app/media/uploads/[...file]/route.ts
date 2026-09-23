import path from 'node:path';
import { NextResponse } from 'next/server';
import { CONTENT_TYPES, MEDIA_DIR } from '@/server/media';
import { readUpload } from '@/server/store';

/**
 * Serves images uploaded from the admin.
 *
 * Everything migrated from WordPress is a static file under `public/media`, so
 * it never reaches this handler — Next serves those directly. Only
 * `/media/uploads/…` lands here, because `public/` is read once at boot and a
 * file written after that would otherwise 404 until a restart.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string[] }> }) {
  const { file } = await params;
  // One path segment, always: the store rejects anything that resolves outside
  // the upload folder, and a nested path here would only be a way to try.
  const name = file.join('/');
  if (file.length !== 1 || name.includes('..')) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const bytes = await readUpload(MEDIA_DIR, name);
    const type = CONTENT_TYPES[path.extname(name).toLowerCase()] ?? 'application/octet-stream';
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': type,
        // The name carries a random suffix, so a given URL is immutable.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
