import { Field, TextArea } from '@/components/admin/ui';
import type { Job } from '@/server/types';

/** The fields of a job post — shared by "post a job" and "edit". */
export function JobFields({ job }: { job?: Job }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Job title" name="title" defaultValue={job?.title} required />
        <Field label="Department" name="department" defaultValue={job?.department} placeholder="Engineering" />
        <Field label="Location" name="location" defaultValue={job?.location} placeholder="Dhaka, or remote" />
        <Field label="Type" name="type" defaultValue={job?.type} placeholder="Full time" />
        <Field label="Salary" name="salary" defaultValue={job?.salary} hint="Optional. Shown exactly as written." />
        <Field
          label="Closing date"
          name="deadline"
          type="date"
          defaultValue={job?.deadline}
          hint="Optional. After this date the post stops taking applications."
        />
      </div>

      <div className="mt-5">
        <TextArea
          label="Summary"
          name="summary"
          rows={2}
          defaultValue={job?.summary}
          hint="One or two lines, shown on the careers list."
        />
      </div>

      <div className="mt-5">
        <TextArea
          label="Description"
          name="description"
          rows={10}
          defaultValue={job?.description}
          hint="Plain text. A blank line starts a new paragraph."
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <TextArea
          label="What we are looking for"
          name="requirements"
          rows={7}
          defaultValue={job?.requirements.join('\n')}
          hint="One per line."
        />
        <TextArea
          label="What we offer"
          name="benefits"
          rows={7}
          defaultValue={job?.benefits.join('\n')}
          hint="One per line."
        />
      </div>

      <div className="mt-5 max-w-xs">
        <label htmlFor="status" className="adm-label">
          Status
        </label>
        <select id="status" name="status" defaultValue={job?.status ?? 'open'} className="adm-input">
          <option value="open">Open — accepting applications</option>
          <option value="closed">Closed — hidden from the careers page</option>
        </select>
      </div>
    </>
  );
}
