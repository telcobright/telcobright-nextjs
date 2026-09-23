'use client';

import { useActionState } from 'react';
import { uploadImageAction, type MediaState } from '@/app/admin/(panel)/media/actions';

/** Upload box with the stored path echoed back, ready to paste into a field. */
export function MediaUpload() {
  const [state, formAction, pending] = useActionState<MediaState, FormData>(uploadImageAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="file" className="adm-label">
          Image file
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
          required
          className="adm-input file:mr-3 file:rounded-md file:border-0 file:bg-surface-subtle file:px-3 file:py-1.5 file:font-display file:text-[13px] file:text-ink-900"
        />
        <p className="adm-hint">PNG, JPG, GIF, WEBP or SVG, up to 8 MB.</p>
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg border border-brand/30 bg-brand-50 px-3.5 py-2.5 text-[13px] text-brand-700">
          {state.error}
        </p>
      )}

      {state.ok && state.path && (
        <p className="rounded-lg border border-grad-to/30 bg-brand-gradient-soft px-3.5 py-2.5 text-[13px] text-ink-900">
          Uploaded. Use this path in any image field:{' '}
          <code className="font-mono text-[12px]">{state.path}</code>
        </p>
      )}

      <button type="submit" disabled={pending} className="adm-btn-primary disabled:opacity-60">
        {pending ? 'Uploading…' : 'Upload image'}
      </button>
    </form>
  );
}
