import Link from 'next/link';
import { listApplications, listJobs } from '@/server/careers';
import { Empty, PageHeading, Panel } from '@/components/admin/ui';

export default async function JobsPage() {
  const [jobs, applications] = await Promise.all([listJobs(), listApplications()]);
  const countFor = (jobId: string) => applications.filter((a) => a.jobId === jobId).length;

  return (
    <>
      <PageHeading
        title="Jobs"
        description="Posts on the careers page. Closing a post hides it and stops new applications; the ones already in stay."
        action={
          <Link href="/admin/jobs/new" className="adm-btn-primary">
            Post a job
          </Link>
        }
      />

      <Panel title={`${jobs.length} ${jobs.length === 1 ? 'post' : 'posts'}`}>
        {jobs.length === 0 ? (
          <Empty>No job posts yet. Post one and it appears on /careers straight away.</Empty>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Closes</th>
                <th>Applications</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="font-medium text-ink-900">{job.title}</td>
                  <td>{job.location || '—'}</td>
                  <td>{job.deadline || 'Open until filled'}</td>
                  <td>{countFor(job.id)}</td>
                  <td>
                    <span className={job.status === 'open' ? 'adm-chip border-grad-to/30 text-ink-700' : 'adm-chip'}>
                      {job.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link href={`/admin/jobs/${job.id}`} className="adm-btn-ghost">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}

export const dynamic = 'force-dynamic';
