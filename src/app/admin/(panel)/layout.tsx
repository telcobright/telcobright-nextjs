import Link from 'next/link';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/admin/actions';
import { getCurrentUser } from '@/server/auth';
import { listApplications } from '@/server/careers';

/**
 * The signed-in shell.
 *
 * Every page under it is rendered only after `getCurrentUser()` succeeds, and
 * each action re-checks independently — the redirect here is for people, not
 * for security.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  const newApplications = (await listApplications()).filter((a) => a.status === 'new').length;

  const nav = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/site', label: 'Site settings' },
    { href: '/admin/home', label: 'Home page' },
    { href: '/admin/pages', label: 'Product pages' },
    { href: '/admin/jobs', label: 'Jobs' },
    { href: '/admin/applications', label: 'Applications', badge: newApplications },
    { href: '/admin/media', label: 'Media' },
    { href: '/admin/account', label: 'Account' },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-5 py-8 lg:flex-row lg:gap-10 lg:px-8">
      <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0">
        <div className="flex h-full flex-col rounded-2xl border border-ink-200/80 bg-surface p-4 shadow-soft">
          <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">
            Telcobright admin
          </p>

          <nav className="mt-2 flex flex-wrap gap-1 lg:flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 font-display text-[13.5px] text-ink-700 transition-colors hover:bg-surface-subtle hover:text-ink-900"
              >
                {item.label}
                {item.badge ? (
                  <span className="rounded-full bg-brand-gradient px-2 py-0.5 font-mono text-[10px] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="mt-auto hidden border-t border-ink-200/70 pt-4 lg:block">
            <p className="px-3 text-[13px] font-medium text-ink-900">{user.name}</p>
            <p className="truncate px-3 text-[12px] text-ink-400">{user.email}</p>
            <div className="mt-3 flex flex-col gap-1">
              <Link
                href="/"
                target="_blank"
                className="rounded-lg px-3 py-2 text-[13px] text-ink-500 transition-colors hover:bg-surface-subtle hover:text-ink-900"
              >
                View website ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-ink-500 transition-colors hover:bg-surface-subtle hover:text-ink-900"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 pb-16">{children}</main>
    </div>
  );
}
