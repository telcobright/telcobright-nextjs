import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApplication } from '@/server/careers';
import { BackLink, PageHeading, Panel, TextArea } from '@/components/admin/ui';
import { deleteApplicationAction, saveNotesAction, setStatusAction } from '../actions';

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplication(id);
  if (!application) notFound();

  return (
    <>
      <BackLink href="/admin/applications">All applications</BackLink>

      <PageHeading
        title={application.name}
        description={`Applied for ${application.jobTitle} on ${new Date(application.createdAt).toLocaleString('en-GB')}`}
        action={
          <div className="flex flex-wrap gap-2">
            <a href={`/admin/applications/${application.id}/cv`} className="adm-btn-primary">
              Download CV
            </a>
            <form action={deleteApplicationAction.bind(null, application.id)}>
              <button type="submit" className="adm-btn-danger">
                Delete
              </button>
            </form>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <Panel title="Details">
            <dl className="grid gap-5 sm:grid-cols-2">
              <Row label="Email">
                <a href={`mailto:${application.email}`} className="text-grad-to hover:underline">
                  {application.email}
                </a>
              </Row>
              <Row label="Phone">
                {application.phone ? (
                  <a href={`tel:${application.phone}`} className="text-grad-to hover:underline">
                    {application.phone}
                  </a>
                ) : (
                  '—'
                )}
              </Row>
              <Row label="CV">
                {application.cvOriginalName} · {Math.round(application.cvSize / 1024)} KB
              </Row>
              <Row label="Role">
                <Link href={`/admin/applications?job=${application.jobId}`} className="text-grad-to hover:underline">
                  {application.jobTitle}
                </Link>
              </Row>
            </dl>

            {application.coverLetter && (
              <div className="mt-6 border-t border-ink-200/70 pt-5">
                <p className="adm-label">What they wrote</p>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink-700">
                  {application.coverLetter}
                </p>
              </div>
            )}
          </Panel>

          <form action={saveNotesAction.bind(null, application.id)}>
            <Panel title="Internal notes" description="Only visible here.">
              <TextArea label="Notes" name="notes" rows={5} defaultValue={application.notes} />
              <div className="mt-5">
                <button type="submit" className="adm-btn-primary">
                  Save notes
                </button>
              </div>
            </Panel>
          </form>
        </div>

        <div>
          <form action={setStatusAction.bind(null, application.id)}>
            <Panel title="Status">
              <div className="space-y-2">
                {(['new', 'reviewing', 'shortlisted', 'rejected', 'hired'] as const).map((status) => (
                  <label key={status} className="flex items-center gap-3 text-[14px] text-ink-900">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      defaultChecked={application.status === status}
                      className="h-4 w-4 border-ink-300 text-grad-to focus:ring-grad-to/30"
                    />
                    {status}
                  </label>
                ))}
              </div>
              <div className="mt-5">
                <button type="submit" className="adm-btn-primary w-full">
                  Update status
                </button>
              </div>
            </Panel>
          </form>
        </div>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">{label}</dt>
      <dd className="mt-1.5 text-[14px] text-ink-900">{children}</dd>
    </div>
  );
}

export const dynamic = 'force-dynamic';
