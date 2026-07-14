import { Cairo, IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from 'next/font/google';

/** Corps latin */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Titres latin — caractère tech/sécurité (chargé à l'usage, swap) */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false,
});

/**
 * Corps arabe — harmonisé avec Inter (hauteurs d'x proches).
 * preload désactivé : les polices arabes (jeux de glyphes lourds) ne
 * doivent pas concurrencer le rendu initial des pages latines ;
 * `display: swap` les substitue dès réception sur les pages AR.
 */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
});

/** Titres arabe (chargé à l'usage, swap) */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  preload: false,
});

export const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  plexArabic.variable,
  cairo.variable,
].join(' ');
