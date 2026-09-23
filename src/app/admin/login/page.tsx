import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/admin/AuthForm';
import { loginAction } from '@/app/admin/actions';
import { getCurrentUser, hasAnyUser } from '@/server/auth';
import { getSite } from '@/server/content';
import { media } from '@/lib/media';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Nothing to sign in to yet: the first run creates the account instead.
  if (!(await hasAnyUser())) redirect('/admin/setup');
  if (await getCurrentUser()) redirect('/admin');

  const { next } = await searchParams;
  const site = await getSite();

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center justify-center rounded-xl bg-surface-dark px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media(site.logos.header)} alt={site.name} width={141} height={44} className="h-7 w-auto" />
          </span>
          <h1 className="mt-6 font-display text-[22px] font-bold tracking-[-.4px] text-ink-900">Sign in</h1>
          <p className="mt-1.5 text-[14px] text-ink-500">Manage the website content.</p>
        </div>

        <div className="adm-card">
          <AuthForm action={loginAction} submitLabel="Sign in" mode="login" next={next} />
        </div>

        <p className="mt-6 text-center text-[13px] text-ink-400">
          <Link href="/" className="hover:text-ink-900">
            Back to the website
          </Link>
        </p>
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
