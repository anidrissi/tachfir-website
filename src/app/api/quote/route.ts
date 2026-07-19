import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email';
import { clientKey, isRateLimited } from '@/lib/rate-limit';
import { FILE_MAX_BYTES, isAllowedFileType, quoteSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

const LABELS: Record<string, string> = {
  developpement: 'Développement web / mobile',
  cybersecurite: 'Cybersécurité',
  outsourcing: 'Outsourcing & Talents IT',
  formation: 'Formation',
  fourniture: 'Fourniture de matériel & surveillance',
  lt50k: '< 50 000 MAD',
  '50to150k': '50 000 – 150 000 MAD',
  '150to500k': '150 000 – 500 000 MAD',
  gt500k: '> 500 000 MAD',
  nd: 'À définir',
  urgent: 'Urgent (< 1 mois)',
  '1to3': '1 à 3 mois',
  '3to6': '3 à 6 mois',
  flexible: 'Flexible',
  public: 'Public / administration',
  prive: 'Privé',
};

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, 'quote'))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const raw = {
    type: form.get('type'),
    company: form.get('company'),
    sector: form.get('sector'),
    ice: form.get('ice') ?? '',
    name: form.get('name'),
    role: form.get('role'),
    email: form.get('email'),
    phone: form.get('phone'),
    description: form.get('description'),
    budget: form.get('budget'),
    deadline: form.get('deadline'),
    consent: form.get('consent') === 'true',
    website: (form.get('website') as string | null) ?? '',
  };

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot rempli → on répond OK sans rien envoyer (piège à robots)
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // Pièce jointe (BC, CPS, cahier des charges) — optionnelle
  const file = form.get('file');
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > FILE_MAX_BYTES) {
      return NextResponse.json({ ok: false, error: 'file_too_large' }, { status: 400 });
    }
    if (!isAllowedFileType(file.type)) {
      return NextResponse.json({ ok: false, error: 'file_type' }, { status: 400 });
    }
    const safeName = (file.name || 'piece-jointe')
      .replace(/[^\w.؀-ۿ-]+/g, '_')
      .slice(0, 120);
    attachment = { filename: safeName, content: Buffer.from(await file.arrayBuffer()) };
  }

  const d = parsed.data;
  const text = [
    `Nouvelle demande de devis / bon de commande — tachfir.com`,
    ``,
    `Type de demande : ${LABELS[d.type] ?? d.type}`,
    `Raison sociale  : ${d.company}`,
    `Secteur         : ${LABELS[d.sector] ?? d.sector}`,
    `ICE             : ${d.ice || '—'}`,
    `Contact         : ${d.name} (${d.role})`,
    `Email           : ${d.email}`,
    `Téléphone       : ${d.phone}`,
    `Budget estimé   : ${LABELS[d.budget] ?? d.budget}`,
    `Délai souhaité  : ${LABELS[d.deadline] ?? d.deadline}`,
    `Pièce jointe    : ${attachment ? attachment.filename : 'aucune'}`,
    ``,
    `Description du besoin :`,
    d.description,
    ``,
    `— Consentement Loi 09-08 donné par l'expéditeur.`,
  ].join('\n');

  const sent = await sendMail({
    subject: `[Devis] ${LABELS[d.type] ?? d.type} — ${d.company}`,
    text,
    replyTo: d.email,
    attachment,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
