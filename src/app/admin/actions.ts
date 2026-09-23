'use server';

import { redirect } from 'next/navigation';
import {
  changePassword,
  createUser,
  deleteUser,
  endSession,
  hasAnyUser,
  listUsers,
  requireUser,
  startSession,
  verifyPassword,
} from '@/server/auth';

export type AuthState = { error?: string };

/** First run: creates the one account, only while there are none. */
export async function setupAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (await hasAnyUser()) return { error: 'An account already exists. Sign in instead.' };

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!name) return { error: 'Please give your name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Please give a valid email address.' };
  if (password.length < 10) return { error: 'Use a password of at least 10 characters.' };
  if (password !== confirm) return { error: 'The two passwords do not match.' };

  const user = await createUser(email, name, password);
  await startSession(user.id);
  redirect('/admin');
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/admin');

  const user = (await listUsers()).find((u) => u.email === email);
  // Same message either way, and the hash is still verified against a dummy
  // when the account does not exist, so the response time does not say which.
  const ok = user
    ? await verifyPassword(password, user.password)
    : await verifyPassword(password, 'ff'.repeat(16) + ':' + 'ff'.repeat(64));

  if (!user || !ok) return { error: 'That email and password do not match an account.' };

  await startSession(user.id);
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect('/admin/login');
}

/* -------------------------------------------------------------- account --- */

export type AccountState = { error?: string; ok?: string };

export async function changePasswordAction(_prev: AccountState, formData: FormData): Promise<AccountState> {
  const user = await requireUser();
  const current = String(formData.get('current') ?? '');
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!(await verifyPassword(current, user.password))) return { error: 'Your current password is not right.' };
  if (password.length < 10) return { error: 'Use a password of at least 10 characters.' };
  if (password !== confirm) return { error: 'The two new passwords do not match.' };

  await changePassword(user.id, password);
  return { ok: 'Password changed.' };
}

export async function addUserAction(_prev: AccountState, formData: FormData): Promise<AccountState> {
  await requireUser();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!name) return { error: 'Please give a name.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Please give a valid email address.' };
  if (password.length < 10) return { error: 'Use a password of at least 10 characters.' };

  try {
    await createUser(email, name, password);
    return { ok: `${name} can now sign in.` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not add that account.' };
  }
}

export async function removeUserAction(userId: string): Promise<void> {
  const me = await requireUser();
  if (me.id === userId) throw new Error('You cannot remove your own account while signed in.');
  await deleteUser(userId);
}
