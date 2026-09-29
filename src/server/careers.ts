import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { CV_DIR, deleteUpload, readDoc, saveUpload, updateDoc } from '@/server/store';
import type { Application, ApplicationStatus, Job } from '@/server/types';

/** Jobs and the applications against them. */

export const CV_MAX_BYTES = 5 * 1024 * 1024;

/** What a CV may be. Checked by extension *and* by the file's own signature. */
const CV_TYPES: Record<string, { ext: string; magic: number[][] }> = {
  'application/pdf': { ext: '.pdf', magic: [[0x25, 0x50, 0x44, 0x46]] }, // %PDF
  'application/msword': { ext: '.doc', magic: [[0xd0, 0xcf, 0x11, 0xe0]] }, // OLE2
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    ext: '.docx',
    magic: [[0x50, 0x4b, 0x03, 0x04]], // zip
  },
};

export function jobSlug(title: string, existing: string[] = []): string {
  const base =
    title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'job';

  let slug = base;
  let n = 2;
  while (existing.includes(slug)) slug = `${base}-${n++}`;
  return slug;
}

/* ---------------------------------------------------------------- jobs --- */

export async function listJobs(): Promise<Job[]> {
  const jobs = await readDoc<Job[]>('jobs', []);
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** What the careers page shows: open posts whose deadline has not passed. */
export async function listOpenJobs(): Promise<Job[]> {
  const today = new Date().toISOString().slice(0, 10);
  return (await listJobs()).filter((j) => j.status === 'open' && (!j.deadline || j.deadline >= today));
}

export async function getJob(id: string): Promise<Job | null> {
  return (await listJobs()).find((j) => j.id === id) ?? null;
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return (await listJobs()).find((j) => j.slug === slug) ?? null;
}

export async function createJob(input: Omit<Job, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  const now = new Date().toISOString();
  const existing = (await listJobs()).map((j) => j.slug);
  const job: Job = {
    ...input,
    id: randomUUID(),
    slug: jobSlug(input.title, existing),
    createdAt: now,
    updatedAt: now,
  };
  await updateDoc<Job[]>('jobs', [], (jobs) => [...jobs, job]);
  revalidateCareers(job.slug);
  return job;
}

export async function updateJob(id: string, patch: Partial<Job>): Promise<void> {
  let slug = '';
  await updateDoc<Job[]>('jobs', [], (jobs) =>
    jobs.map((job) => {
      if (job.id !== id) return job;
      const next = { ...job, ...patch, id: job.id, slug: job.slug, updatedAt: new Date().toISOString() };
      slug = next.slug;
      return next;
    })
  );
  revalidateCareers(slug);
}

export async function deleteJob(id: string): Promise<void> {
  const job = await getJob(id);
  await updateDoc<Job[]>('jobs', [], (jobs) => jobs.filter((j) => j.id !== id));
  revalidateCareers(job?.slug);
}

/* -------------------------------------------------------- applications --- */

export async function listApplications(): Promise<Application[]> {
  const rows = await readDoc<Application[]>('applications', []);
  return [...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getApplication(id: string): Promise<Application | null> {
  return (await listApplications()).find((a) => a.id === id) ?? null;
}

export class ApplicationError extends Error {}

/**
 * Takes an application, with the CV.
 *
 * The file is checked three ways before it is written: the declared type, the
 * size, and the first bytes of the file itself — a .pdf that is not a PDF does
 * not get stored. The stored name is generated, never the name the browser
 * sent, so nothing user-controlled reaches the filesystem.
 */
export async function submitApplication(input: {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cv: File;
}): Promise<Application> {
  const job = await getJob(input.jobId);
  if (!job) throw new ApplicationError('That job post is no longer available.');
  if (job.status !== 'open') throw new ApplicationError('Applications for this role are closed.');

  const { cv } = input;
  if (!cv || cv.size === 0) throw new ApplicationError('Please attach your CV.');
  if (cv.size > CV_MAX_BYTES) throw new ApplicationError('Your CV must be 5 MB or smaller.');

  const declared = CV_TYPES[cv.type];
  const ext = path.extname(cv.name).toLowerCase();
  const byExt = Object.values(CV_TYPES).find((t) => t.ext === ext);
  const type = declared ?? byExt;
  if (!type) throw new ApplicationError('Please upload your CV as a PDF, DOC or DOCX file.');

  const bytes = Buffer.from(await cv.arrayBuffer());
  const signatureOk = type.magic.some((magic) => magic.every((byte, i) => bytes[i] === byte));
  if (!signatureOk) throw new ApplicationError('That file does not look like a PDF or Word document.');

  const id = randomUUID();
  const cvFile = `${id}${type.ext}`;
  await saveUpload(CV_DIR, cvFile, bytes);

  const application: Application = {
    id,
    jobId: job.id,
    jobTitle: job.title,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    coverLetter: input.coverLetter.trim(),
    cvFile,
    cvOriginalName: path.basename(cv.name).slice(0, 120),
    cvSize: bytes.length,
    status: 'new',
    notes: '',
    createdAt: new Date().toISOString(),
  };

  await updateDoc<Application[]>('applications', [], (rows) => [...rows, application]);
  return application;
}

export async function setApplicationStatus(id: string, status: ApplicationStatus): Promise<void> {
  await updateDoc<Application[]>('applications', [], (rows) =>
    rows.map((a) => (a.id === id ? { ...a, status } : a))
  );
}

export async function setApplicationNotes(id: string, notes: string): Promise<void> {
  await updateDoc<Application[]>('applications', [], (rows) =>
    rows.map((a) => (a.id === id ? { ...a, notes } : a))
  );
}

/** Removes the application and its CV — the file must not outlive the record. */
export async function deleteApplication(id: string): Promise<void> {
  const application = await getApplication(id);
  if (application) await deleteUpload(CV_DIR, application.cvFile);
  await updateDoc<Application[]>('applications', [], (rows) => rows.filter((a) => a.id !== id));
}

function revalidateCareers(slug?: string) {
  revalidatePath('/careers');
  if (slug) revalidatePath(`/careers/${slug}`);
  // The sitemap lists open posts, so it goes stale the moment one changes.
  revalidatePath('/sitemap.xml');
}
