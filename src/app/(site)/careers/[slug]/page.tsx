import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApplyForm } from '@/components/ApplyForm';
import { PageHero } from '@/components/PageHero';
import { getJobBySlug, listOpenJobs } from '@/server/careers';
import { getSite } from '@/server/content';
import type { Job } from '@/server/types';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listOpenJobs()).map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return {
    title: `${job.title} — Careers`,
    description: job.summary || `Apply for ${job.title} at Telcobright.`,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const [job, site] = await Promise.all([getJobBySlug(slug), getSite()]);
  if (!job) notFound();

  const closed = job.status !== 'open' || (!!job.deadline && job.deadline < new Date().toISOString().slice(0, 10));

  return (
    <>
      <PageHero
        eyebrow={[job.department, job.type].filter(Boolean).join(' · ') || 'Careers'}
        title={job.title}
        subtitle={job.summary}
        breadcrumb="Careers"
      />

      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <article className="min-w-0">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Fact label="Location" value={job.location} />
              <Fact label="Type" value={job.type} />
              <Fact label="Department" value={job.department} />
              <Fact label="Closes" value={job.deadline ? formatDate(job.deadline) : 'Open until filled'} />
            </dl>

            {job.salary && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-grad-to/30 bg-brand-gradient-soft px-4 py-2 font-display text-[14px] font-medium text-ink-900">
                {job.salary}
              </p>
            )}

            <div className="page-body mt-10">
              <Prose text={job.description} />

              {job.requirements.length > 0 && (
                <>
                  <h2>What we are looking for</h2>
                  <ul>
                    {job.requirements.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits.length > 0 && (
                <>
                  <h2>What we offer</h2>
                  <ul>
                    {job.benefits.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <p className="mt-10 text-[15px] text-ink-500">
              Questions about the role? Email{' '}
              <a href={`mailto:${site.contact.email}`} className="font-medium text-grad-to hover:underline">
                {site.contact.email}
              </a>
              .
            </p>
          </article>

          <aside className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            {closed ? (
              <div className="card p-8 text-center">
                <p className="font-display text-[17px] font-bold text-ink-900">Applications are closed</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  This role is no longer taking applications.
                </p>
                <Link href="/careers" className="btn-outline mt-6">
                  See open roles
                </Link>
              </div>
            ) : (
              <>
                <h2 className="mb-5 font-display text-[20px] font-bold tracking-[-.4px] text-ink-900">
                  Apply for this role
                </h2>
                <ApplyForm jobId={job.id} jobTitle={job.title} />
              </>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="card p-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">{label}</dt>
      <dd className="mt-1.5 font-display text-[15px] font-medium text-ink-900">{value}</dd>
    </div>
  );
}

/**
 * Job descriptions are written as plain text in the admin, so blank lines are
 * the only structure — rendering them as paragraphs keeps the editor simple
 * and the output safe (nothing here is interpreted as HTML).
 */
function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.split('\n').map((line, j, all) => (
            <span key={j}>
              {line}
              {j < all.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Also applies to a job that was posted after the last build. */
export const dynamicParams = true;
