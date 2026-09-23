'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/server/auth';
import { deleteMedia, MediaError, uploadImage } from '@/server/media';

export type MediaState = { error?: string; ok?: string; path?: string };

export async function uploadImageAction(_prev: MediaState, formData: FormData): Promise<MediaState> {
  await requireUser();
  const file = formData.get('file');
  if (!(file instanceof File)) return { error: 'Choose a file to upload.' };

  try {
    const stored = await uploadImage(file);
    revalidatePath('/admin/media');
    return { ok: 'Uploaded.', path: stored };
  } catch (err) {
    if (err instanceof MediaError) return { error: err.message };
    console.error('[media] upload failed', err);
    return { error: 'Could not store that file.' };
  }
}

export async function deleteImageAction(name: string): Promise<void> {
  await requireUser();
  await deleteMedia(name);
  revalidatePath('/admin/media');
}
