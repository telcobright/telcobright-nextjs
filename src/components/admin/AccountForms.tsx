'use client';

import { useActionState } from 'react';
import { addUserAction, changePasswordAction, type AccountState } from '@/app/admin/actions';

function Message({ state }: { state: AccountState }) {
  if (state.error) {
    return (
      <p role="alert" className="rounded-lg border border-brand/30 bg-brand-50 px-3.5 py-2.5 text-[13px] text-brand-700">
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p className="rounded-lg border border-grad-to/30 bg-brand-gradient-soft px-3.5 py-2.5 text-[13px] text-ink-900">
        {state.ok}
      </p>
    );
  }
  return null;
}

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(changePasswordAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="current" className="adm-label">
          Current password
        </label>
        <input id="current" name="current" type="password" required autoComplete="current-password" className="adm-input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="adm-label">
            New password
          </label>
          <input id="password" name="password" type="password" required autoComplete="new-password" className="adm-input" />
        </div>
        <div>
          <label htmlFor="confirm" className="adm-label">
            Confirm new password
          </label>
          <input id="confirm" name="confirm" type="password" required autoComplete="new-password" className="adm-input" />
        </div>
      </div>
      <Message state={state} />
      <button type="submit" disabled={pending} className="adm-btn-primary disabled:opacity-60">
        {pending ? 'Saving…' : 'Change password'}
      </button>
    </form>
  );
}

export function AddUserForm() {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(addUserAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="new-name" className="adm-label">
            Name
          </label>
          <input id="new-name" name="name" required className="adm-input" />
        </div>
        <div>
          <label htmlFor="new-email" className="adm-label">
            Email
          </label>
          <input id="new-email" name="email" type="email" required className="adm-input" />
        </div>
      </div>
      <div>
        <label htmlFor="new-password" className="adm-label">
          Temporary password
        </label>
        <input id="new-password" name="password" type="password" required autoComplete="new-password" className="adm-input" />
        <p className="adm-hint">
          At least 10 characters. Ask them to change it from this page once they are in.
        </p>
      </div>
      <Message state={state} />
      <button type="submit" disabled={pending} className="adm-btn-primary disabled:opacity-60">
        {pending ? 'Adding…' : 'Add account'}
      </button>
    </form>
  );
}
