import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { company } from '@/config/company';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { localizedPaths } from '@/lib/localized-path';

/**
 * Métadonnées d'une page statique : title (pattern « %s | Tachfir »),
 * description orientée clic, canonical et hreflang complets
 * (ar / fr / en / x-default → ar).
 */
export async function pageMetadata(
  locale: Locale,
  metaKey: string,
  pathname: AppPathname,
  params?: Record<string, string>,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t(`${metaKey}.title`),
    description: t(`${metaKey}.description`),
    pathname,
    params,
  });
}

/** Variante bas niveau (contenus CMS : titres/descriptions dynamiques). */
export function buildMetadata({
  locale,
  title,
  description,
  pathname,
  params,
  paramsByLocale,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: AppPathname;
  /** params identiques pour toutes les locales (routes statiques) */
  params?: Record<string, string>;
  /** params par locale (slugs CMS localisés) — prime sur `params` */
  paramsByLocale?: Partial<Record<Locale, Record<string, string>>>;
  image?: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const p = paramsByLocale ? paramsByLocale[l as Locale] : params;
    // Locale absente (contenu non traduit) : pas d'alternate pour cette langue
    if (paramsByLocale && !p) continue;
    languages[l] = company.siteUrl + localizedPaths(pathname, l as Locale, p).external;
  }
  if (languages['ar']) languages['x-default'] = languages['ar'];

  const canonicalParams = paramsByLocale ? paramsByLocale[locale] : params;
  const canonical =
    company.siteUrl + localizedPaths(pathname, locale, canonicalParams).external;

  const ogLocale = locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_FR' : 'en_US';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Tachfir',
      locale: ogLocale,
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
