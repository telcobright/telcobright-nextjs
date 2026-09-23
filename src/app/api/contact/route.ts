import { NextResponse } from 'next/server';

/**
 * Stand-in for the MetForm handler the WordPress site used.
 *
 * It validates and rejects obvious spam. To actually deliver the message,
 * plug in your provider where noted below — e.g. Resend:
 *
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ from, to: 'info@telcobright.com', subject, text });
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: only bots fill this in.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name, email and message.' },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'That email address looks wrong.' }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: 'That message is too long.' }, { status: 400 });
  }

  // TODO: send the email here.
  console.info('[contact] new enquiry', { name, email, company: body.company, phone: body.phone });

  return NextResponse.json({ ok: true });
}
