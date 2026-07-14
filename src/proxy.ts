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

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyTarget = LEGACY_REDIRECTS[pathname.replace(/\/$/, '') || '/'];
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Tout sauf /admin (Payload), /api, fichiers statiques et internals Next.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
