import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArrowRight } from '@/components/ui';
import { listOpenJobs } from '@/server/careers';
import { getSite } from '@/server/content';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: 'Careers',
    description: `Open roles at ${site.name} — telecom engineering, software development and operations in Dhaka.`,
    alternates: { canonical: '/careers' },
  };
}

/** Open roles. Posts are created and closed from /admin/jobs. */
export default async function CareersPage() {
  const [jobs, site] = await Promise.all([listOpenJobs(), getSite()]);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build telecom software with us"
        subtitle={`Open roles at ${site.name}. We hire for depth, and we answer every application.`}
        breadcrumb="Careers"
      />

      <section className="section bg-surface">
        <div className="container-page">
          {jobs.length === 0 ? (
            <div className="card mx-auto max-w-2xl p-10 text-center">
              <p className="font-display text-[20px] font-bold text-ink-900">No open roles right now</p>
              <p className="lede mx-auto mt-3 max-w-md">
                Nothing is posted at the moment. Send a CV to{' '}
                <a href={`mailto:${site.contact.email}`} className="font-medium text-grad-to hover:underline">
                  {site.contact.email}
                </a>{' '}
                and we will keep it on file for when something opens.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="h-section">
                  <span className="text-gradient">{jobs.length}</span>{' '}
                  {jobs.length === 1 ? 'open role' : 'open roles'}
                </h2>
                <p className="text-[15px] text-ink-400">Apply with your CV — it takes a minute.</p>
              </div>

              <ul className="mt-10 space-y-4" data-reveal-children>
                {jobs.map((job) => (
                  <li key={job.id}>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="card card-hover group flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-[19px] font-bold tracking-[-.3px] text-ink-900 sm:text-[22px]">
                          {job.title}
                        </h3>
                        {job.summary && (
                          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">{job.summary}</p>
                        )}
                        <ul className="mt-4 flex flex-wrap items-center gap-2">
                          {[job.department, job.location, job.type].filter(Boolean).map((chip) => (
                            <li
                              key={chip}
                              className="rounded-full border border-ink-200/80 bg-surface-subtle px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500"
                            >
                              {chip}
                            </li>
                          ))}
                          {job.deadline && (
                            <li className="rounded-full border border-grad-to/30 bg-brand-gradient-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-700">
                              Apply by {formatDate(job.deadline)}
                            </li>
                          )}
                        </ul>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-3 font-display text-[14px] font-medium text-ink-900">
                        View role
                        <ArrowRight className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
