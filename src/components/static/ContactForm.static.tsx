import { site } from '@content/site';

/**
 * The contact panel, for the static build.
 *
 * The real form posts to /api/contact, which does not exist without a server.
 * Rather than render inputs that quietly go nowhere — the worst possible
 * outcome for someone trying to reach you — this offers the two channels that
 * do work from a static page.
 *
 * Same name and props as the real ContactForm; scripts/build-static.mjs swaps
 * the file.
 */
export function ContactForm() {
  const subject = encodeURIComponent('Enquiry from telcobright.com');
  const mailto = `mailto:${site.contact.email}?subject=${subject}`;

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="font-display text-[19px] font-bold tracking-[-.3px] text-ink-900">
        Talk to us
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
        Tell us what you are building and we will come back with how we would approach it. The team
        typically replies in a few hours.
      </p>

      <a href={mailto} className="btn-gradient mt-6 w-full sm:w-auto">
        Send an email
      </a>

      <dl className="mt-8 space-y-4 border-t border-ink-200/70 pt-6 text-[15px]">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">Email</dt>
          <dd className="mt-1.5">
            <a href={`mailto:${site.contact.email}`} className="font-medium text-grad-to hover:underline">
              {site.contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">Phone</dt>
          <dd className="mt-1.5">
            <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-grad-to hover:underline">
              {site.contact.phone}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
