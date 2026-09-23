import Link from 'next/link';
import { listApplications, listJobs } from '@/server/careers';
import { Empty, PageHeading, Panel } from '@/components/admin/ui';

/** Everyone who has applied, newest first, optionally filtered to one job. */
export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string; status?: string }>;
}) {
  const { job: jobFilter, status: statusFilter } = await searchParams;
  const [all, jobs] = await Promise.all([listApplications(), listJobs()]);

  const applications = all.filter(
    (a) => (!jobFilter || a.jobId === jobFilter) && (!statusFilter || a.status === statusFilter)
  );
  const filteredJob = jobs.find((j) => j.id === jobFilter);

  return (
    <>
      <PageHeading
        title="Applications"
        description={
          filteredJob ? `Applications for ${filteredJob.title}.` : 'Every application, newest first.'
        }
        action={
          jobFilter || statusFilter ? (
            <Link href="/admin/applications" className="adm-btn-ghost">
              Clear filter
            </Link>
          ) : undefined
        }
      />

      <Panel title={`${applications.length} ${applications.length === 1 ? 'application' : 'applications'}`}>
        <div className="mb-5 flex flex-wrap gap-2">
          {(['new', 'reviewing', 'shortlisted', 'rejected', 'hired'] as const).map((status) => (
            <Link
              key={status}
              href={`/admin/applications?status=${status}`}
              className={statusFilter === status ? 'adm-btn-primary' : 'adm-btn-ghost'}
            >
              {status} ({all.filter((a) => a.status === status).length})
            </Link>
          ))}
        </div>

        {applications.length === 0 ? (
          <Empty>Nothing here yet. Applications arrive from the careers page.</Empty>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Role</th>
                <th>Received</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <span className="block font-medium text-ink-900">{application.name}</span>
                    <span className="text-[12px] text-ink-400">{application.email}</span>
                  </td>
                  <td>{application.jobTitle}</td>
                  <td className="whitespace-nowrap">{formatWhen(application.createdAt)}</td>
                  <td>
                    <span className="adm-chip">{application.status}</span>
                  </td>
                  <td className="text-right">
                    <Link href={`/admin/applications/${application.id}`} className="adm-btn-ghost">
                      Open
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

function formatWhen(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const dynamic = 'force-dynamic';
