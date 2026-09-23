'use server';

import { ApplicationError, submitApplication } from '@/server/careers';

export type ApplyState = { status: 'idle' | 'ok' | 'error'; message?: string };

/**
 * Takes one application from the public form.
 *
 * Open to the world by design, so it validates everything itself and trusts
 * nothing from the client: the job has to exist and be open, the file has to
 * be a real PDF or Word document within the size limit, and the stored
 * filename is generated rather than taken from the upload.
 */
export async function applyAction(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  // Honeypot. A real applicant never sees this field; a bot fills everything
  // in. Answer as though it worked, so the bot has nothing to learn.
  if ((formData.get('website') as string)?.trim()) return { status: 'ok' };

  const jobId = String(formData.get('jobId') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const coverLetter = String(formData.get('coverLetter') ?? '').trim();
  const cv = formData.get('cv');

  if (!name) return { status: 'error', message: 'Please give your name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: 'error', message: 'Please give an email address we can reply to.' };
  }
  if (!(cv instanceof File)) return { status: 'error', message: 'Please attach your CV.' };

  try {
    await submitApplication({ jobId, name, email, phone, coverLetter, cv });
    return { status: 'ok' };
  } catch (err) {
    if (err instanceof ApplicationError) return { status: 'error', message: err.message };
    console.error('[careers] application failed', err);
    return { status: 'error', message: 'Something went wrong. Please try again, or email us your CV.' };
  }
}
