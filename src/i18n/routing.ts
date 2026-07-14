import { defineRouting } from 'next-intl/routing';

/**
 * Locales : arabe (défaut, racine `/`), français (`/fr`), anglais (`/en`).
 * Pathnames localisés : FR/EN en latin, AR en écriture arabe (recommandation SEO).
 * Les clés internes (= structure de dossiers sous app/(frontend)/[locale]) sont en français.
 */
export const routing = defineRouting({
  locales: ['ar', 'fr', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/services': {
      ar: '/خدمات',
      fr: '/services',
      en: '/services',
    },
    '/services/developpement-web-mobile': {
      ar: '/خدمات/تطوير-المواقع-والتطبيقات',
      fr: '/services/developpement-web-mobile',
      en: '/services/web-mobile-development',
    },
    '/services/cybersecurite': {
      ar: '/خدمات/الأمن-السيبراني',
      fr: '/services/cybersecurite',
      en: '/services/cybersecurity',
    },
    '/services/conseil-it-nearshore': {
      ar: '/خدمات/استشارات-معلوماتية-وتعهيد',
      fr: '/services/conseil-it-nearshore',
      en: '/services/it-consulting-nearshore',
    },
    '/services/fourniture-informatique': {
      ar: '/خدمات/توريد-المعدات-المعلوماتية',
      fr: '/services/fourniture-informatique',
      en: '/services/it-hardware-supply',
    },
    '/formations': {
      ar: '/تكوينات',
      fr: '/formations',
      en: '/training',
    },
    '/formations/[slug]': {
      ar: '/تكوينات/[slug]',
      fr: '/formations/[slug]',
      en: '/training/[slug]',
    },
    '/references': {
      ar: '/مراجعنا',
      fr: '/references',
      en: '/references',
    },
    '/certifications': {
      ar: '/الشهادات',
      fr: '/certifications',
      en: '/certifications',
    },
    '/blog': {
      ar: '/مدونة',
      fr: '/blog',
      en: '/blog',
    },
    '/blog/[slug]': {
      ar: '/مدونة/[slug]',
      fr: '/blog/[slug]',
      en: '/blog/[slug]',
    },
    '/devis': {
      ar: '/طلب-عرض-أثمان',
      fr: '/devis',
      en: '/quote',
    },
    '/contact': {
      ar: '/اتصل-بنا',
      fr: '/contact',
      en: '/contact',
    },
    '/a-propos': {
      ar: '/من-نحن',
      fr: '/a-propos',
      en: '/about',
    },
    '/mentions-legales': {
      ar: '/إشعار-قانوني',
      fr: '/mentions-legales',
      en: '/legal-notice',
    },
    '/politique-confidentialite': {
      ar: '/سياسة-الخصوصية',
      fr: '/politique-confidentialite',
      en: '/privacy-policy',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
/** Routes sans segment dynamique (utilisables en href direct). */
export type StaticAppPathname = Exclude<AppPathname, '/formations/[slug]' | '/blog/[slug]'>;
