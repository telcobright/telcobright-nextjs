import type { Metadata } from 'next';
import { getSite } from '@/server/content';
import { GradientHeading } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';

/**
 * telcobright.com has no contact page — its "Request For Appointment" and
 * "Send a Message" buttons open a mailto: instead, and the header and footer
 * here do the same. This page is kept as a working alternative for anyone who
 * would rather fill in a form; nothing on the site links to it.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: 'Contact',
    description: `Talk to the ${site.shortName} team — ${site.contact.email}, ${site.contact.phone}.`,
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage() {
  const site = await getSite();

  return (
    <>
      <PageHero title="Contact" breadcrumb="Contact" />

      <section className="section bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <GradientHeading
              parts={[
                { text: 'Got questions? Talk to our ', accent: false },
                { text: 'experts', accent: true },
              ]}
            />
            <span aria-hidden="true" className="mt-7 block h-0.5 w-20 rounded-full bg-brand-gradient" />
            <p className="lede mt-6 max-w-md">The team typically replies in a few hours.</p>

            <dl className="mt-10 space-y-5 text-[15px]">
              <div className="card card-hover p-5">
                <dt className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-400">
                  Office
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-900">{site.contact.address}</dd>
              </div>
              <div className="card card-hover p-5">
                <dt className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-400">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={`tel:${site.contact.phoneHref}`} className="-my-2 inline-block py-2 font-medium text-grad-to hover:underline">
                    {site.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="card card-hover p-5">
                <dt className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-400">
                  Email
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.contact.email}`} className="-my-2 inline-block py-2 font-medium text-grad-to hover:underline">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
