'use client';

import { useActionState } from 'react';
import type { AuthState } from '@/app/admin/actions';

/**
 * The sign-in and first-run forms. One component, because they differ only in
 * their fields and their button — and both need the same inline error.
 */
export function AuthForm({
  action,
  submitLabel,
  mode,
  next,
}: {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  submitLabel: string;
  mode: 'login' | 'setup';
  next?: string;
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      {mode === 'setup' && (
        <div>
          <label htmlFor="name" className="adm-label">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className="adm-input" />
        </div>
      )}

      <div>
        <label htmlFor="email" className="adm-label">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="username" className="adm-input" />
      </div>

      <div>
        <label htmlFor="password" className="adm-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete={mode === 'setup' ? 'new-password' : 'current-password'}
          className="adm-input"
        />
        {mode === 'setup' && <p className="adm-hint">At least 10 characters.</p>}
      </div>

      {mode === 'setup' && (
        <div>
          <label htmlFor="confirm" className="adm-label">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            className="adm-input"
          />
        </div>
      )}

      {state.error && (
        <p role="alert" className="rounded-lg border border-brand/30 bg-brand-50 px-3.5 py-2.5 text-[13px] text-brand-700">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="adm-btn-primary w-full disabled:opacity-60">
        {pending ? 'Working…' : submitLabel}
      </button>
    </form>
  );
}
