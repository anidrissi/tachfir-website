import { Cairo, IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from 'next/font/google';

/** Corps latin */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Titres latin — caractère tech/sécurité */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/** Corps arabe — harmonisé avec Inter (hauteurs d'x proches) */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

/** Titres arabe */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  plexArabic.variable,
  cairo.variable,
].join(' ');
