import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email';
import { clientKey, isRateLimited } from '@/lib/rate-limit';
import { contactSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, 'contact'))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot rempli → OK silencieux
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const text = [
    `Nouveau message de contact — tachfir.com`,
    ``,
    `Nom       : ${d.name}`,
    `Email     : ${d.email}`,
    `Téléphone : ${d.phone || '—'}`,
    ``,
    `Message :`,
    d.message,
    ``,
    `— Consentement Loi 09-08 donné par l'expéditeur.`,
  ].join('\n');

  const sent = await sendMail({
    subject: `[Contact] ${d.name}`,
    text,
    replyTo: d.email,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
