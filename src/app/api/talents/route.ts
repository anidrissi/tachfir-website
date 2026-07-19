import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/email';
import { getPayloadClient } from '@/lib/payload';
import { clientKey, isRateLimited } from '@/lib/rate-limit';
import { FILE_MAX_BYTES, isAllowedCvType, talentSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

const SENIORITY_LABELS: Record<string, string> = {
  junior: 'Junior',
  confirme: 'Confirmé',
  senior: 'Senior',
};

/**
 * Dépôt de CV (/talents) → crée une entrée `candidatures` + un CV privé
 * (`cv-uploads`) via la Local API (overrideAccess), puis notifie le staff.
 * Le CV n'est PAS joint à l'email : il reste dans l'admin (accès restreint).
 */
export async function POST(request: Request) {
  if (isRateLimited(clientKey(request, 'talent'))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const raw = {
    fullName: form.get('fullName'),
    email: form.get('email'),
    phone: form.get('phone'),
    expertise: form.get('expertise'),
    expertiseOther: (form.get('expertiseOther') as string | null) ?? '',
    seniority: form.get('seniority'),
    availability: (form.get('availability') as string | null) ?? '',
    remote: (form.get('remote') as string | null) ?? '',
    linkedin: (form.get('linkedin') as string | null) ?? '',
    consent: form.get('consent') === 'true',
    website: (form.get('website') as string | null) ?? '',
  };

  const parsed = talentSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot rempli → réponse OK sans rien enregistrer (piège à robots)
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // CV obligatoire (PDF ≤ 10 Mo)
  const file = form.get('cv');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: 'cv_required' }, { status: 400 });
  }
  if (file.size > FILE_MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'file_too_large' }, { status: 400 });
  }
  if (!isAllowedCvType(file.type)) {
    return NextResponse.json({ ok: false, error: 'file_type' }, { status: 400 });
  }

  const d = parsed.data;
  const safeName = (file.name || 'cv.pdf').replace(/[^\w.؀-ۿ-]+/g, '_').slice(0, 120);

  try {
    const payload = await getPayloadClient();
    const buffer = Buffer.from(await file.arrayBuffer());

    const cvDoc = await payload.create({
      collection: 'cv-uploads',
      overrideAccess: true,
      data: {},
      file: { data: buffer, mimetype: file.type, name: safeName, size: file.size },
    });

    const isOther = d.expertise === 'other';
    const expertiseId = !isOther ? Number(d.expertise) : undefined;

    await payload.create({
      collection: 'candidatures',
      overrideAccess: true,
      context: { disableRevalidate: true },
      data: {
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        ...(expertiseId && Number.isFinite(expertiseId) ? { expertise: expertiseId } : {}),
        ...(isOther || !Number.isFinite(expertiseId)
          ? { expertiseOther: d.expertiseOther || '(non précisée)' }
          : {}),
        seniority: d.seniority,
        availability: d.availability || undefined,
        remote: d.remote || undefined,
        linkedin: d.linkedin || undefined,
        consent: true,
        status: 'nouveau',
        cv: cvDoc.id,
      },
    });
  } catch (err) {
    console.error('Création candidature en échec :', err);
    return NextResponse.json({ ok: false, error: 'save_failed' }, { status: 502 });
  }

  const text = [
    `Nouvelle candidature au vivier — tachfir.com`,
    ``,
    `Nom         : ${d.fullName}`,
    `Email       : ${d.email}`,
    `Téléphone   : ${d.phone}`,
    `Expertise   : ${d.expertise === 'other' ? d.expertiseOther || '(autre)' : `#${d.expertise}`}`,
    `Séniorité   : ${SENIORITY_LABELS[d.seniority] ?? d.seniority}`,
    `Disponibilité : ${d.availability || '—'}`,
    `Remote/mobilité : ${d.remote || '—'}`,
    `LinkedIn    : ${d.linkedin || '—'}`,
    `CV          : ${safeName} (consultable dans l'admin → Vivier de talents)`,
    ``,
    `— Consentement donné par le candidat.`,
  ].join('\n');

  // La notification est un « plus » : un échec d'envoi ne doit pas invalider
  // l'enregistrement déjà réussi de la candidature.
  await sendMail({
    subject: `[Talent] ${d.fullName} — ${SENIORITY_LABELS[d.seniority] ?? d.seniority}`,
    text,
    replyTo: d.email,
  });

  return NextResponse.json({ ok: true });
}
