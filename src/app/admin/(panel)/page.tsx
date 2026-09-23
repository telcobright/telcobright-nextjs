import Link from 'next/link';
import { getCurrentUser } from '@/server/auth';
import { listApplications, listJobs, listOpenJobs } from '@/server/careers';
import { getPages } from '@/server/content';
import { listMedia } from '@/server/media';
import { PageHeading, Panel, Empty } from '@/components/admin/ui';

/** Where the editor lands: what is on the site, and what has come in. */
export default async function AdminDashboard() {
  const [user, pages, jobs, openJobs, applications, mediaFiles] = await Promise.all([
    getCurrentUser(),
    getPages(),
    listJobs(),
    listOpenJobs(),
    listApplications(),
    listMedia(),
  ]);

  const newApplications = applications.filter((a) => a.status === 'new');
  const recent = applications.slice(0, 5);

  const stats = [
    { label: 'Product pages', value: pages.length, href: '/admin/pages' },
    { label: 'Open jobs', value: openJobs.length, href: '/admin/jobs' },
    { label: 'New applications', value: newApplications.length, href: '/admin/applications?status=new' },
    { label: 'Uploaded images', value: mediaFiles.length, href: '/admin/media' },
  ];

  return (
    <>
      <PageHeading
        title={`Hello, ${user?.name.split(' ')[0] ?? 'there'}`}
        description="Everything on the website is editable from here, and changes go live as soon as you save."
        action={
          <Link href="/" target="_blank" className="adm-btn-ghost">
            View website ↗
          </Link>
        }
      />

      <ul className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link href={stat.href} className="adm-card block transition-colors hover:border-ink-300">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">{stat.label}</p>
              <p className="mt-2 font-display text-[28px] font-bold tracking-[-1px] text-ink-900">{stat.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Latest applications" description="Newest first.">
          {recent.length === 0 ? (
            <Empty>No applications yet.</Empty>
          ) : (
            <ul className="divide-y divide-ink-200/70">
              {recent.map((application) => (
                <li key={application.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="block truncate font-medium text-ink-900 hover:text-grad-to"
                    >
                      {application.name}
                    </Link>
                    <span className="text-[12px] text-ink-400">{application.jobTitle}</span>
                  </div>
                  <span className="adm-chip shrink-0">{application.status}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Where things are" description="The parts of the site you are most likely to change.">
          <ul className="space-y-2 text-[14px]">
            {[
              ['Home page sections', '/admin/home'],
              ['Header, footer and contact details', '/admin/site'],
              ['Product and solution pages', '/admin/pages'],
              ['Job posts', '/admin/jobs'],
              ['Images', '/admin/media'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-ink-700 transition-colors hover:bg-surface-subtle hover:text-ink-900"
                >
                  {label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          {jobs.length === 0 && (
            <p className="mt-4 rounded-lg border border-ink-200 bg-surface-subtle px-3.5 py-3 text-[13px] text-ink-500">
              The careers page is live but has no posts yet.{' '}
              <Link href="/admin/jobs/new" className="font-medium text-grad-to hover:underline">
                Post a job
              </Link>
              .
            </p>
          )}
        </Panel>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic';
