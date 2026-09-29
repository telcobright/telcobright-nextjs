import { site } from '@content/site';

/**
 * The apply panel, for the static build.
 *
 * A file upload needs somewhere to upload *to*, and a static host has no such
 * thing. So this collects nothing: it hands the applicant a pre-addressed
 * email with the role already in the subject line, which is the honest version
 * of "apply here" when there is no server.
 *
 * Set NEXT_PUBLIC_APPLY_FORM_URL (a Google Form, Typeform, Formspree page…)
 * and it becomes the primary action instead, with the email kept as a
 * fallback. Nothing else on the site changes.
 *
 * Same name and props as the real ApplyForm, so the careers page is identical
 * in both builds — scripts/build-static.mjs swaps the file, not the markup.
 */
export function ApplyForm({ jobTitle }: { jobId: string; jobTitle: string }) {
  const formUrl = process.env.NEXT_PUBLIC_APPLY_FORM_URL;
  const subject = encodeURIComponent(`Application: ${jobTitle}`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to apply for ${jobTitle}.\n\nMy CV is attached.\n\n`
  );
  const mailto = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="card p-6 sm:p-8">
      <p className="text-[15px] leading-relaxed text-ink-500">
        Send us your CV and we will take it from there. Every application is read, and we reply
        either way.
      </p>

      {formUrl ? (
        <>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" className="btn-gradient mt-6 w-full sm:w-auto">
            Apply for this role
          </a>
          <p className="mt-4 text-[13px] text-ink-400">
            Prefer email?{' '}
            <a href={mailto} className="font-medium text-grad-to hover:underline">
              {site.contact.email}
            </a>
          </p>
        </>
      ) : (
        <>
          <a href={mailto} className="btn-gradient mt-6 w-full sm:w-auto">
            Apply by email
          </a>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-400">
            Opens your mail app with the role in the subject line — attach your CV as a PDF or Word
            document. Or write to{' '}
            <a href={`mailto:${site.contact.email}`} className="font-medium text-grad-to hover:underline">
              {site.contact.email}
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
