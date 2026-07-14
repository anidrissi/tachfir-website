import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import { JsonLd } from '@/components/seo/json-ld';
import { company } from '@/config/company';
import { Link, getPathname } from '@/i18n/navigation';
import type { AppPathname, Locale } from '@/i18n/routing';

export type Crumb = {
  label: string;
  /** Route interne (pathnames next-intl). Omise pour l'élément courant. */
  href?: AppPathname | { pathname: AppPathname; params: Record<string, string> };
};

/**
 * Fil d'Ariane visible (RTL-aware) + schema.org BreadcrumbList.
 * L'élément « Accueil » est ajouté automatiquement.
 */
export async function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: Locale }) {
  const t = await getTranslations('nav');
  const tc = await getTranslations('common');

  const all: Crumb[] = [{ label: t('home'), href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href
        ? {
            item:
              company.siteUrl +
              getPathname({
                locale,
                // @ts-expect-error — union pathname/objet acceptée par next-intl
                href: item.href,
              }),
          }
        : {}),
    })),
  };

  return (
    <nav aria-label={tc('breadcrumbAria')} className="py-3 text-sm">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <Fragment key={i}>
              {i > 0 ? (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="h-3.5 w-3.5 rtl:hidden" />
                  <ChevronLeft className="hidden h-3.5 w-3.5 rtl:block" />
                </li>
              ) : null}
              <li className="max-w-56 truncate">
                {item.href && !isLast ? (
                  <Link
                    // @ts-expect-error — union pathname/objet acceptée par next-intl
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className="text-foreground">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
