import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Redirections 301 depuis les URLs de l'ancien site (sans préfixe de locale).
 * L'ancien site était en français : on redirige vers les URLs FR.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/contact': '/fr/contact',
  '/services': '/fr/services',
  '/blog': '/fr/blog',
  '/a-propos': '/fr/a-propos',
  '/about': '/en/about',
  '/formations': '/fr/formations',
  '/references': '/fr/references',
  '/certifications': '/fr/certifications',
  '/mentions-legales': '/fr/mentions-legales',
  '/devis': '/fr/devis',
};

/**
 * Renommages internes v1 → v2 : l'ancien pôle « Conseil IT & nearshore »
 * est devenu « Outsourcing & Talents IT » (les 3 locales). Clés décodées
 * (les chemins arabes sont percent-encodés dans l'URL entrante).
 */
const RENAMED_REDIRECTS: Record<string, string> = {
  '/خدمات/استشارات-معلوماتية-وتعهيد': '/خدمات/التعهيد-والكفاءات',
  '/fr/services/conseil-it-nearshore': '/fr/services/outsourcing-talents-it',
  '/en/services/it-consulting-nearshore': '/en/services/it-outsourcing-talent',
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clean = pathname.replace(/\/$/, '') || '/';

  const legacyTarget = LEGACY_REDIRECTS[clean];
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 301);
  }

  let decoded = clean;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    // chemin mal encodé : on garde la valeur brute
  }
  const renamedTarget = RENAMED_REDIRECTS[decoded];
  if (renamedTarget) {
    const url = request.nextUrl.clone();
    url.pathname = renamedTarget;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Tout sauf /admin (Payload), /api, fichiers statiques et internals Next.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
