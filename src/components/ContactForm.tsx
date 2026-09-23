'use client';

import { useState } from 'react';
import { site } from '@content/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink shadow-soft transition-[border-color,box-shadow] duration-300 placeholder:text-ink-300 hover:border-ink-300 focus:border-grad-to focus:outline-none focus:ring-4 focus:ring-grad-to/10';

const labelClass = 'mb-1.5 block font-display text-[13px] font-medium text-ink-900';

/**
 * Replaces the MetForm widget from the WordPress site.
 *
 * It posts to /api/contact, which currently just validates and logs. Wire that
 * route up to your mail provider (Resend, SES, SMTP…) — see MIGRATION.md.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card p-10 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-display text-lg font-bold text-ink-900">Thanks — your message is on its way.</p>
        <p className="mt-2 text-sm text-ink-500">
          The team typically replies in a few hours. If it is urgent, call{' '}
          <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-brand">
            {site.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" name="company" autoComplete="organization" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          How can we help?
        </label>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </div>

      {/* Honeypot — real people never fill this in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error ? (
        <p role="alert" className="text-sm font-medium text-brand">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-gradient w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send a message'}
      </button>
      <p className="text-xs text-ink-400">*The team typically replies in a few hours.</p>
    </form>
  );
}
