'use server';

import { redirect } from 'next/navigation';
import { requireUser } from '@/server/auth';
import { deleteApplication, setApplicationNotes, setApplicationStatus } from '@/server/careers';
import { str, text } from '@/server/form';
import type { ApplicationStatus } from '@/server/types';

const STATUSES: ApplicationStatus[] = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

export async function setStatusAction(id: string, formData: FormData): Promise<void> {
  await requireUser();
  const status = str(formData, 'status') as ApplicationStatus;
  if (!STATUSES.includes(status)) throw new Error('Unknown status.');
  await setApplicationStatus(id, status);
}

export async function saveNotesAction(id: string, formData: FormData): Promise<void> {
  await requireUser();
  await setApplicationNotes(id, text(formData, 'notes'));
}

/** Removes the record and the CV with it — the file must not outlive it. */
export async function deleteApplicationAction(id: string): Promise<void> {
  await requireUser();
  await deleteApplication(id);
  redirect('/admin/applications');
}
