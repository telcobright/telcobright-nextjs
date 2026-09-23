import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/admin/AuthForm';
import { setupAction } from '@/app/admin/actions';
import { hasAnyUser } from '@/server/auth';

/**
 * First run.
 *
 * Reachable only while no account exists — once one does, this redirects to
 * sign-in, so it cannot be used to add a second administrator from outside.
 */
export default async function SetupPage() {
  if (await hasAnyUser()) redirect('/admin/login');

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="adm-chip">First run</p>
          <h1 className="mt-5 font-display text-[22px] font-bold tracking-[-.4px] text-ink-900">
            Create the administrator
          </h1>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
            This page works once. After the account exists it redirects to sign-in.
          </p>
        </div>

        <div className="adm-card">
          <AuthForm action={setupAction} submitLabel="Create account" mode="setup" />
        </div>
      </div>
    </div>
  );
}

/**
 * Never prerendered: whether this page redirects depends on whether an account
 * exists, which is state at request time, not at build time. Without this it
 * is baked at build — when there are no accounts — and keeps sending people to
 * the first-run page forever.
 */
export const dynamic = 'force-dynamic';
