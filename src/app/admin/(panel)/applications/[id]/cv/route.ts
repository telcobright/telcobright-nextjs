import path from 'node:path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/server/auth';
import { getApplication } from '@/server/careers';
import { CONTENT_TYPES } from '@/server/media';
import { CV_DIR, readUpload } from '@/server/store';

/**
 * Downloads one CV.
 *
 * CVs are personal data, so they are never served as static files: this
 * handler checks the session first, reads the file from outside the public
 * directory, and sends it as an attachment under the applicant's own filename.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentUser())) return new NextResponse('Not found', { status: 404 });

  const { id } = await params;
  const application = await getApplication(id);
  if (!application) return new NextResponse('Not found', { status: 404 });

  try {
    const bytes = await readUpload(CV_DIR, application.cvFile);
    const type = CONTENT_TYPES[path.extname(application.cvFile).toLowerCase()] ?? 'application/octet-stream';
    // The filename is quoted and stripped of quotes/newlines: it comes from
    // the applicant, and a header is not a place to trust input.
    const filename = application.cvOriginalName.replace(/["\r\n]/g, '') || 'cv';

    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': type,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return new NextResponse('The file for this application is missing.', { status: 404 });
  }
}
