import { JobFields } from '@/components/admin/JobFields';
import { BackLink, PageHeading, Panel } from '@/components/admin/ui';
import { createJobAction } from '../actions';

export default function NewJobPage() {
  return (
    <>
      <BackLink href="/admin/jobs">All jobs</BackLink>
      <PageHeading title="Post a job" description="It appears on the careers page as soon as you save it as open." />

      <form action={createJobAction}>
        <Panel title="The role">
          <JobFields />
          <div className="mt-6 border-t border-ink-200/70 pt-5">
            <button type="submit" className="adm-btn-primary">
              Publish job
            </button>
          </div>
        </Panel>
      </form>
    </>
  );
}
