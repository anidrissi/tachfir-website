import { routing, type AppPathname, type Locale } from '@/i18n/routing';

/**
 * Construit les chemins d'une route pour une locale, sans dépendre de
 * next-intl/navigation (utilisable dans les hooks Payload, le sitemap, le seed).
 *
 * - `external` : URL publique (pathnames localisés, locale par défaut sans préfixe)
 * - `internal` : chemin du système de routes Next (/{locale}/segments-internes)
 */
export function localizedPaths(
  pathname: AppPathname,
  locale: Locale,
  params?: Record<string, string>,
): { external: string; internal: string } {
  const entry = routing.pathnames[pathname];
  const template = typeof entry === 'string' ? entry : entry[locale];

  const fill = (tpl: string) =>
    tpl.replace(/\[(\w+)\]/g, (_, key: string) => params?.[key] ?? `[${key}]`);

  const localizedTemplate = fill(template);
  const internalTemplate = fill(pathname);

  const external =
    locale === routing.defaultLocale
      ? localizedTemplate
      : `/${locale}${localizedTemplate === '/' ? '' : localizedTemplate}`;

  const internal = `/${locale}${internalTemplate === '/' ? '' : internalTemplate}`;

  return { external, internal };
}

/** URL publique absolue (pour hreflang, sitemap, JSON-LD). */
export function absoluteUrl(
  siteUrl: string,
  pathname: AppPathname,
  locale: Locale,
  params?: Record<string, string>,
): string {
  return siteUrl + localizedPaths(pathname, locale, params).external;
}
