'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerNav, site } from '@content/site';
import { media } from '@/lib/media';
import { cn } from '@/lib/cn';

/**
 * The live header: white wordmark on a dark bar, centred nav, with
 * "Our Product & Solutions" opening a dropdown of the five product pages.
 *
 * It is fixed rather than absolute, and transparent only while the page is at
 * the top — once you scroll it becomes a frosted bar, so the nav stays legible
 * over the white sections instead of disappearing into them.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes whichever layer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      data-surface="dark"
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out-expo',
        scrolled || open
          ? 'glass-bar border-b border-white/10 shadow-header'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="container-page">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={site.name} className="shrink-0 transition-opacity hover:opacity-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media(site.logos.header)}
              alt={site.name}
              width={141}
              height={44}
              className="h-9 w-auto"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {headerNav.map((item) => {
              const children = 'children' in item ? item.children : undefined;
              if (!children) {
                return (
                  <Link key={item.label} href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className="nav-link"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      className={cn(
                        'transition-transform duration-300 ease-out-expo group-hover:rotate-180',
                        openMenu === item.label && 'rotate-180'
                      )}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3',
                      'invisible translate-y-1 opacity-0 transition-all duration-200 ease-out-expo',
                      'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
                      'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100',
                      openMenu === item.label && 'visible translate-y-0 opacity-100'
                    )}
                  >
                    <ul className="overflow-hidden rounded-2xl border border-white/10 bg-[#141011]/95 p-2 shadow-lift backdrop-blur-xl">
                      {children.map((child) => {
                        const active = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'group/item flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 font-display text-[13px] transition-colors duration-200',
                                active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                              )}
                            >
                              {child.label}
                              <svg
                                width="14"
                                height="10"
                                viewBox="0 0 20 12"
                                fill="none"
                                aria-hidden="true"
                                className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-out-expo group-hover/item:translate-x-0 group-hover/item:opacity-70"
                              >
                                <path
                                  d="M0 6h18M13 1l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
            <SocialIcon href={site.social.facebook} label="Facebook" d={FACEBOOK} />
            <SocialIcon href={site.social.linkedin} label="LinkedIn" d={LINKEDIN} />
            <SocialIcon href={site.contact.mailto} label="Email us" d={MAIL} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="animate-panel-in lg:hidden">
          <div className="container-page pb-6">
            <ul className="space-y-1 rounded-2xl border border-white/10 bg-[#141011]/95 p-3 shadow-lift backdrop-blur-xl">
              {headerNav.map((item) => {
                const children = 'children' in item ? item.children : undefined;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3 font-display text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                    {children && (
                      <ul className="mb-1 ml-4 border-l border-white/10 pl-3">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2.5 font-display text-[13px] text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center gap-2 px-1">
              <SocialIcon href={site.social.facebook} label="Facebook" d={FACEBOOK} />
              <SocialIcon href={site.social.linkedin} label="LinkedIn" d={LINKEDIN} />
              <SocialIcon href={site.contact.mailto} label="Email us" d={MAIL} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const FACEBOOK =
  'M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.4-.8.9-.8H14z';
const LINKEDIN =
  'M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.2 8.4h3.5V21H3.2V8.4zm5.7 0h3.35v1.72h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.2 4.18 5.07V21h-3.5v-6.2c0-1.48-.03-3.38-2.13-3.38-2.13 0-2.46 1.6-2.46 3.27V21H8.9V8.4z';
const MAIL = 'M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11zm2.2.5l6.8 5 6.8-5H5.2z';

function SocialIcon({ href, label, d }: { href: string | null; label: string; d: string }) {
  if (!href) return null;
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/65 transition-colors duration-300 hover:bg-white/10 hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}
