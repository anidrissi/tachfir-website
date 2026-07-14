/**
 * Slugifie un texte en préservant l'écriture arabe (slugs AR en arabe).
 * Latin : minuscules + suppression des diacritiques. Arabe : conservé tel quel,
 * ponctuation/espaces remplacés par des tirets.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .normalize('NFKD')
    // retire les diacritiques latins (é → e) sans toucher aux lettres arabes
    .replace(/[̀-ͯ]/g, '')
    // retire les diacritiques arabes (tashkil)
    .replace(/[ً-ْٰ]/g, '')
    .toLowerCase()
    // tout ce qui n'est pas lettre/chiffre (toutes écritures) → tiret
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}
