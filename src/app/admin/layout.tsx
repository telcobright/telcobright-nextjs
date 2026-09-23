import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  // The editor must never be indexed, whatever robots.txt says.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface-subtle">{children}</div>;
}
