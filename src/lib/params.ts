/**
 * Décode un segment dynamique d'URL (slugs arabes percent-encodés).
 * Robuste aux valeurs déjà décodées par le routeur.
 */
export function decodeSlug(value: string): string {
  if (!value.includes('%')) return value;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
