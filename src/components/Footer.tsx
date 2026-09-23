import Link from 'next/link';
import { media } from '@/lib/media';
import type { SiteContent } from '@/server/types';

/**
 * The live footer: a dark band carrying the newsletter panel, four columns
 * (three link lists plus Contact), the social row and the copyright line.
 *
 * The link labels and their destinations are reproduced as they are on
 * telcobright.com — every entry in the three link columns points at "#" there,
 * because those pages were never built.
 */
export function Footer({ site }: { site: SiteContent }) {
  const { footerNav, newsletter } = site;

  return (
    <footer data-surface="dark" className="relative overflow-hidden bg-surface-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${media('2024/01/footer-jetBlack.jpg')})` }}
      />
      {/* Closes the last light section against the dark band. */}
      <span aria-hidden="true" className="rule-gradient absolute inset-x-0 top-0" />
      <span aria-hidden="true" className="glow -left-32 top-10 h-[420px] w-[420px] bg-grad-to opacity-[0.14]" />

      <div className="container-page relative py-16 lg:py-20">
        {/* Newsletter panel */}
        <div
          className="relative overflow-hidden rounded-4xl px-8 py-12 ring-1 ring-white/10 sm:px-12 lg:py-14"
          style={{
            backgroundImage: `linear-gradient(117deg, rgba(225,7,19,0) 52%, rgb(34,0,0) 100%), url(${media('2024/06/tb_bg.png')})`,
            backgroundColor: '#5A0A0E',
          }}
        >
          <h2 className="max-w-2xl font-display text-[26px] font-bold leading-tight tracking-[-1px] text-white sm:text-[32px]">
            {newsletter.title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">{newsletter.body}</p>
        </div>

        {/* Columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 [&>*]:min-w-0 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" aria-label={site.name} className="inline-block transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media(site.logos.footer)}
                alt={site.name}
                width={141}
                height={44}
                className="h-9 w-auto"
              />
            </Link>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.08em] text-white">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[15px] text-white/55 transition-all duration-300 ease-out-expo hover:translate-x-1 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.08em] text-white">Contact</h3>
            <address className="mt-5 not-italic text-[15px] leading-relaxed text-white/55">
              {site.contact.address}
            </address>
            <dl className="mt-6 space-y-2 text-[14px]">
              <div className="flex gap-3">
                <dt className="w-11 shrink-0 text-white/40">Tel :</dt>
                <dd className="min-w-0 break-words">
                  <a href={`tel:${site.contact.phoneHref}`} className="text-white/55 transition-colors hover:text-white">
                    {site.contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-11 shrink-0 text-white/40">Email:</dt>
                <dd className="min-w-0 break-words">
                  <a href={`mailto:${site.contact.email}`} className="text-white/55 transition-colors hover:text-white">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[15px] text-white/55">Follow us</span>
            <Social href={site.social.facebook} label="Facebook" d={FACEBOOK} />
            <Social href={site.social.linkedin} label="LinkedIn" d={LINKEDIN} />
            <Social href={site.social.medium} label="Medium" d={MEDIUM} />
          </div>
          <p className="text-[14px] text-white/45">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

const FACEBOOK =
  'M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.6v-7h-2.3v-2.7h2.3V9.4c0-2.3 1.4-3.6 3.5-3.6 1 0 1.8.08 2.1.11v2.4h-1.4c-1.1 0-1.3.53-1.3 1.3v1.7h2.7l-.35 2.7h-2.35v7H20a1 1 0 001-1V4a1 1 0 00-1-1z';
const LINKEDIN =
  'M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.2 8.4h3.5V21H3.2V8.4zm5.7 0h3.35v1.72h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.2 4.18 5.07V21h-3.5v-6.2c0-1.48-.03-3.38-2.13-3.38-2.13 0-2.46 1.6-2.46 3.27V21H8.9V8.4z';
const MEDIUM =
  'M4.3 7.4c.02-.2-.06-.4-.2-.53L2.6 5.06V4.8h4.6l3.56 7.8 3.13-7.8h4.4v.26l-1.28 1.23a.37.37 0 00-.14.36v9.1c-.02.13.04.27.14.36l1.25 1.23v.26h-6.3v-.26l1.3-1.26c.12-.13.12-.17.12-.37V8.35l-3.6 9.16h-.5L4.1 8.35v6.14c-.04.26.05.53.24.72l1.68 2.05v.26H1.3v-.26l1.68-2.05c.18-.19.27-.46.22-.72V7.4z';

function Social({ href, label, d }: { href: string | null; label: string; d: string }) {
  const chip =
    'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 ease-out-expo';

  const icon = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );

  // The old footer rendered the Medium icon with no link behind it. Keep that
  // shape rather than inventing a destination.
  if (!href) {
    return (
      <span className={`${chip} text-white/30`} title={label} aria-label={label} role="img">
        {icon}
      </span>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`${chip} text-white/65 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white`}
    >
      {icon}
    </a>
  );
}
