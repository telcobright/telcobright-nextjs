'use server';

import { redirect } from 'next/navigation';
import { requireUser } from '@/server/auth';
import { createJob, deleteJob, updateJob } from '@/server/careers';
import { lines, str, text } from '@/server/form';
import type { JobStatus } from '@/server/types';

function readJob(formData: FormData) {
  const status = str(formData, 'status') === 'closed' ? 'closed' : 'open';
  return {
    title: str(formData, 'title'),
    department: str(formData, 'department'),
    location: str(formData, 'location'),
    type: str(formData, 'type'),
    salary: str(formData, 'salary'),
    deadline: str(formData, 'deadline'),
    summary: text(formData, 'summary'),
    description: text(formData, 'description'),
    requirements: lines(formData, 'requirements'),
    benefits: lines(formData, 'benefits'),
    status: status as JobStatus,
  };
}

export async function createJobAction(formData: FormData): Promise<void> {
  await requireUser();
  const input = readJob(formData);
  if (!input.title) throw new Error('Give the job a title.');
  const job = await createJob(input);
  redirect(`/admin/jobs/${job.id}`);
}

export async function updateJobAction(id: string, formData: FormData): Promise<void> {
  await requireUser();
  await updateJob(id, readJob(formData));
}

/** Closing a post keeps it and its applications; deleting removes the post. */
export async function setJobStatusAction(id: string, status: JobStatus): Promise<void> {
  await requireUser();
  await updateJob(id, { status });
}

export async function deleteJobAction(id: string): Promise<void> {
  await requireUser();
  await deleteJob(id);
  redirect('/admin/jobs');
}
