/**
 * Slugifie un texte en préservant l'écriture arabe (slugs AR en arabe).
 * - Latin : minuscules + suppression des diacritiques (é → e).
 * - Arabe : tashkil retiré, lettres à hamza (أ إ آ ؤ ئ) préservées
 *   (décomposition NFD puis recomposition NFC après nettoyage).
 */
export function slugify(input: string): string {
  return (
    input
      .trim()
      .normalize('NFD')
      // diacritiques latins (U+0300–U+036F)
      .replace(/[̀-ͯ]/g, '')
      // tashkil arabe uniquement (fatha, damma, kasra, sukun, chadda, tanwin…)
      .replace(/[ً-ْ]/g, '')
      // recompose les lettres arabes à hamza décomposées par NFD
      .normalize('NFC')
      .toLowerCase()
      // tout ce qui n'est pas lettre/chiffre (toutes écritures) → tiret
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')
  );
}
