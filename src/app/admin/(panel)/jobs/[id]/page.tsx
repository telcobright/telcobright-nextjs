import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob, listApplications } from '@/server/careers';
import { JobFields } from '@/components/admin/JobFields';
import { BackLink, PageHeading, Panel, SaveButton } from '@/components/admin/ui';
import { deleteJobAction, updateJobAction } from '../actions';

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const applications = (await listApplications()).filter((a) => a.jobId === job.id);

  return (
    <>
      <BackLink href="/admin/jobs">All jobs</BackLink>

      <PageHeading
        title={job.title}
        description={`/careers/${job.slug}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link href={`/careers/${job.slug}`} target="_blank" className="adm-btn-ghost">
              View ↗
            </Link>
            <Link href={`/admin/applications?job=${job.id}`} className="adm-btn-ghost">
              {applications.length} {applications.length === 1 ? 'application' : 'applications'}
            </Link>
            <form action={deleteJobAction.bind(null, job.id)}>
              <button type="submit" className="adm-btn-danger">
                Delete
              </button>
            </form>
          </div>
        }
      />

      <form action={updateJobAction.bind(null, job.id)}>
        <Panel title="The role">
          <JobFields job={job} />
          <SaveButton label="Save job" />
        </Panel>
      </form>
    </>
  );
}

export const dynamic = 'force-dynamic';
