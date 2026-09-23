'use client';

import { useActionState, useRef, useState } from 'react';
import { applyAction, type ApplyState } from '@/app/(site)/careers/actions';

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-sm text-ink shadow-soft transition-[border-color,box-shadow] duration-300 placeholder:text-ink-300 hover:border-ink-300 focus:border-grad-to focus:outline-none focus:ring-4 focus:ring-grad-to/10';
const labelClass = 'mb-1.5 block font-display text-[13px] font-medium text-ink-900';

/**
 * The application form.
 *
 * It posts to a Server Action, so it submits without JavaScript too — the
 * pending state and the inline error are the enhancement, not the mechanism.
 */
export function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, formAction, pending] = useActionState<ApplyState, FormData>(applyAction, {
    status: 'idle',
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (state.status === 'ok') {
    return (
      <div className="card p-8 text-center sm:p-10">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="font-display text-lg font-bold text-ink-900">Application received</p>
        <p className="mt-2 text-sm text-ink-500">
          Thanks — your application for <strong className="text-ink-900">{jobTitle}</strong> is in.
          We read every one, and we will be in touch if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card space-y-4 p-6 sm:p-8">
      <input type="hidden" name="jobId" value={jobId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="apply-name" className={labelClass}>
            Full name
          </label>
          <input id="apply-name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="apply-email" className={labelClass}>
            Email
          </label>
          <input
            id="apply-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="apply-phone" className={labelClass}>
          Phone <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <input id="apply-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="apply-cv" className={labelClass}>
          CV — PDF, DOC or DOCX, up to 5 MB
        </label>
        <input
          ref={fileRef}
          id="apply-cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          className="sr-only"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center gap-3 rounded-xl border border-dashed border-ink-200 bg-surface-subtle px-4 py-4 text-left text-sm text-ink-500 transition-colors hover:border-grad-to/50 hover:text-ink-900"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface shadow-soft"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="min-w-0 flex-1 truncate">
            {fileName ?? 'Choose a file'}
          </span>
          <span className="shrink-0 font-display text-[13px] font-medium text-grad-to">Browse</span>
        </button>
      </div>

      <div>
        <label htmlFor="apply-cover" className={labelClass}>
          Anything you would like us to know <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <textarea id="apply-cover" name="coverLetter" rows={5} className={inputClass} />
      </div>

      {/* Honeypot — real people never fill this in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-sm font-medium text-brand">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-gradient w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto">
        {pending ? 'Sending…' : 'Submit application'}
      </button>

      <p className="text-xs text-ink-400">
        Your CV is stored for this application and read by the hiring team only.
      </p>
    </form>
  );
}
