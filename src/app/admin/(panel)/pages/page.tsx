import Link from 'next/link';
import { getPages } from '@/server/content';
import { Field, PageHeading, Panel, TextArea } from '@/components/admin/ui';
import { createPageAction } from './actions';

/** The product pages, and a form to add another. */
export default async function PagesListPage() {
  const pages = await getPages();

  return (
    <>
      <PageHeading
        title="Product pages"
        description="The migrated product and solution pages. Editing one changes what the site serves at /solutions/…"
      />

      <Panel title={`${pages.length} pages`}>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Address</th>
              <th>Blocks</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.slug}>
                <td className="font-medium text-ink-900">{page.title}</td>
                <td className="font-mono text-[12px] text-ink-500">/solutions/{page.slug}</td>
                <td>{page.blocks.length}</td>
                <td>
                  {page.draft ? (
                    <span className="adm-chip">Draft</span>
                  ) : (
                    <span className="adm-chip border-grad-to/30 text-ink-700">Live</span>
                  )}
                </td>
                <td className="text-right">
                  <Link href={`/admin/pages/${page.slug}`} className="adm-btn-ghost">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <form action={createPageAction}>
        <Panel title="Add a page" description="New pages start as drafts, so nothing appears on the site until you publish.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title" name="title" required />
            <Field label="Address" name="slug" hint="Optional. Taken from the title when empty." />
          </div>
          <div className="mt-5">
            <TextArea label="Summary" name="summary" rows={2} hint="Shown on the product cards and in search results." />
          </div>
          <div className="mt-6">
            <button type="submit" className="adm-btn-primary">
              Create page
            </button>
          </div>
        </Panel>
      </form>
    </>
  );
}

export const dynamic = 'force-dynamic';
