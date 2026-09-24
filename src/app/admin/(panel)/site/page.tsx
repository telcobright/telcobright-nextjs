import { getSite } from '@/server/content';
import { Field, PageHeading, Panel, SaveButton, TextArea } from '@/components/admin/ui';
import {
  addFooterColumnAction,
  addNavItemAction,
  removeFooterColumnAction,
  removeNavItemAction,
  saveSiteAction,
} from './actions';

/**
 * Site settings: everything that appears on every page — the name and
 * metadata, contact details, social links, the header menu and the footer.
 */
export default async function SiteSettingsPage() {
  const site = await getSite();

  return (
    <>
      <PageHeading
        title="Site settings"
        description="The name, contact details, navigation and footer. These appear on every page, so saving here refreshes the whole site."
      />

      <form action={saveSiteAction}>
        <Panel title="Identity" description="Used in the page title, the metadata and the footer.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Site name" name="name" defaultValue={site.name} required />
            <Field label="Short name" name="shortName" defaultValue={site.shortName} />
            <Field label="Tagline" name="tagline" defaultValue={site.tagline} />
            <Field
              label="Site URL"
              name="url"
              defaultValue={site.url}
              hint="No trailing slash. Used for canonical links and the sitemap."
            />
            <Field label="Locale" name="locale" defaultValue={site.locale} hint="For example en_US." />
            <Field label="Copyright line" name="copyright" defaultValue={site.copyright} />
          </div>
          <div className="mt-5">
            <TextArea
              label="Meta description"
              name="description"
              defaultValue={site.description}
              rows={3}
              hint="Shown by search engines under the page title."
            />
          </div>
        </Panel>

        <Panel title="Contact" description="Shown in the footer, on the contact page and behind the mail icon.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" name="email" defaultValue={site.contact.email} type="email" />
            <Field label="Mail link" name="mailto" defaultValue={site.contact.mailto} hint="The full mailto: URL, subject line included." />
            <Field label="Phone" name="phone" defaultValue={site.contact.phone} />
            <Field label="Phone link" name="phoneHref" defaultValue={site.contact.phoneHref} hint="Digits only, with the country code." />
          </div>
          <div className="mt-5">
            <TextArea label="Address" name="address" defaultValue={site.contact.address} rows={2} />
          </div>
        </Panel>

        <Panel title="Social" description="Leave a field empty to hide that icon.">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Facebook" name="facebook" defaultValue={site.social.facebook ?? ''} />
            <Field label="LinkedIn" name="linkedin" defaultValue={site.social.linkedin ?? ''} />
            <Field label="Medium" name="medium" defaultValue={site.social.medium ?? ''} />
          </div>
        </Panel>

        <Panel title="Logos" description="Paths under the media library, for example 2024/01/Frame-4.png.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Header logo" name="logoHeader" defaultValue={site.logos.header} />
            <Field label="Footer logo" name="logoFooter" defaultValue={site.logos.footer} />
          </div>
        </Panel>

        <Panel
          title="Header menu"
          description="Top-level items, in order. A dropdown is one link per line in the sub-items box, written as Label | /href."
        >
          <div className="space-y-4">
            {site.headerNav.map((item, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Label" name={`nav.${i}.label`} defaultValue={item.label} />
                  <Field label="Link" name={`nav.${i}.href`} defaultValue={item.href} />
                </div>
                <div className="mt-4">
                  <TextArea
                    label="Dropdown items"
                    name={`nav.${i}.children`}
                    rows={4}
                    defaultValue={(item.children ?? []).map((c) => `${c.label} | ${c.href}`).join('\n')}
                    placeholder="SMS Gateway | /solutions/sms-gateway"
                    hint="One per line, Label | /href. Leave empty for a plain link."
                  />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeNavItemAction.bind(null, i)} className="adm-btn-danger">
                    Remove item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button formAction={addNavItemAction} className="adm-btn-ghost">
              Add menu item
            </button>
          </div>
        </Panel>

        <Panel title="Footer columns" description="Each column is a heading and a list of links.">
          <div className="grid gap-4 lg:grid-cols-2">
            {site.footerNav.map((col, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <Field label="Column heading" name={`footer.${i}.title`} defaultValue={col.title} />
                <div className="mt-4">
                  <TextArea
                    label="Links"
                    name={`footer.${i}.links`}
                    rows={5}
                    defaultValue={col.links.map((l) => `${l.label} | ${l.href}`).join('\n')}
                    hint="One per line, Label | /href."
                  />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeFooterColumnAction.bind(null, i)} className="adm-btn-danger">
                    Remove column
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button formAction={addFooterColumnAction} className="adm-btn-ghost">
              Add column
            </button>
          </div>
        </Panel>

        <Panel title="Footer panel" description="The band at the top of the footer, above the columns.">
          <Field label="Heading" name="newsletterTitle" defaultValue={site.newsletter.title} />
          <div className="mt-5">
            <TextArea label="Body" name="newsletterBody" defaultValue={site.newsletter.body} rows={3} />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Button label"
              name="newsletterCtaLabel"
              defaultValue={site.newsletter.cta?.label ?? ''}
              hint="Leave empty to show no button."
            />
            <Field label="Button link" name="newsletterCtaHref" defaultValue={site.newsletter.cta?.href ?? ''} />
          </div>
        </Panel>

        <SaveButton />
      </form>
    </>
  );
}

/** The editor always reflects what is saved right now. */
export const dynamic = 'force-dynamic';
