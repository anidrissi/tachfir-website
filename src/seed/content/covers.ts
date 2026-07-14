import type { Payload } from 'payload';
import sharp from 'sharp';

/**
 * Couvertures d'articles générées : fond de marque + matrice de
 * chiffrement + pictogramme thématique. SVG rasterisé en WebP via sharp.
 */

const BITS = Array.from('TACHFIR').flatMap((ch) =>
  ch.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number),
);

function cipherDots(x: number, y: number, cell = 26): string {
  return BITS.map((bit, i) => {
    const cx = x + (i % 14) * cell;
    const cy = y + Math.floor(i / 14) * cell;
    return bit
      ? `<rect x="${cx - 4}" y="${cy - 4}" width="8" height="8" rx="2" fill="#2fc4ad" opacity="0.55"/>`
      : `<circle cx="${cx}" cy="${cy}" r="2.4" fill="#3d6d96" opacity="0.5"/>`;
  }).join('');
}

/** Pictogrammes thématiques (formes simples, sans texte). */
const GLYPHS: Record<string, string> = {
  // Document + coche (marchés publics / bon de commande)
  procurement: `
    <g transform="translate(500,170)">
      <rect x="0" y="0" width="200" height="260" rx="18" fill="#0e5fa8"/>
      <rect x="30" y="46" width="140" height="14" rx="7" fill="#9fc5e8" opacity="0.9"/>
      <rect x="30" y="86" width="140" height="14" rx="7" fill="#9fc5e8" opacity="0.7"/>
      <rect x="30" y="126" width="90" height="14" rx="7" fill="#9fc5e8" opacity="0.5"/>
      <circle cx="150" cy="205" r="52" fill="#2fc4ad"/>
      <path d="M126 205 l16 16 l34 -36" stroke="#04101e" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`,
  // Flèches MA ↔ FR (nearshore)
  nearshore: `
    <g transform="translate(470,200)">
      <circle cx="60" cy="100" r="58" fill="#0e5fa8"/>
      <circle cx="260" cy="100" r="58" fill="#2fc4ad"/>
      <path d="M120 82 h96 l-20 -22" stroke="#f4f7fa" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M200 118 h-96 l20 22" stroke="#f4f7fa" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`,
  // Badge / certification
  certification: `
    <g transform="translate(510,160)">
      <circle cx="90" cy="120" r="90" fill="#0e5fa8"/>
      <circle cx="90" cy="120" r="62" fill="#0b2540" stroke="#2fc4ad" stroke-width="8"/>
      <path d="M62 120 l20 20 l40 -44" stroke="#2fc4ad" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M55 200 l-18 70 l53 -30 l53 30 l-18 -70" fill="#e9930f"/>
    </g>`,
};

function coverSvg(glyph: keyof typeof GLYPHS): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b2540"/>
      <stop offset="1" stop-color="#050f1c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  ${cipherDots(80, 80)}
  ${cipherDots(760, 520, 22)}
  <g transform="translate(80,540)">
    <rect x="0" y="0" width="34" height="34" rx="8" fill="#f4f7fa"/>
    <rect x="44" y="0" width="34" height="34" rx="8" fill="#f4f7fa"/>
    <rect x="0" y="44" width="34" height="34" rx="8" fill="#f4f7fa"/>
    <rect x="49" y="49" width="28" height="28" rx="7" fill="#2fc4ad" transform="rotate(45 63 63)"/>
  </g>
  ${GLYPHS[glyph]}
</svg>`;
}

export type CoverKey = 'procurement' | 'nearshore' | 'certification';

/**
 * Crée (ou retrouve) une couverture dans la collection media.
 * Alt localisé obligatoire — fourni dans les 3 langues.
 */
export async function ensureCover(
  payload: Payload,
  key: CoverKey,
  alts: { ar: string; fr: string; en: string },
): Promise<number> {
  const filename = `cover-${key}.webp`;

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.totalDocs > 0) {
    return existing.docs[0].id;
  }

  const webp = await sharp(Buffer.from(coverSvg(key))).webp({ quality: 88 }).toBuffer();

  const context = { disableRevalidate: true };
  const created = await payload.create({
    collection: 'media',
    locale: 'ar',
    context,
    data: { alt: alts.ar },
    file: {
      data: webp,
      name: filename,
      mimetype: 'image/webp',
      size: webp.length,
    },
  });
  await payload.update({
    collection: 'media',
    id: created.id,
    locale: 'fr',
    context,
    data: { alt: alts.fr },
  });
  await payload.update({
    collection: 'media',
    id: created.id,
    locale: 'en',
    context,
    data: { alt: alts.en },
  });

  return created.id;
}
