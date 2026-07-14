import type { MetadataRoute } from 'next';
import { company } from '@/config/company';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { localizedPaths } from '@/lib/localized-path';
import { getPayloadClient } from '@/lib/payload';

/**
 * Sitemap multilingue : routes statiques + contenus publiés du CMS
 * (posts, formations) avec alternates hreflang par entrée.
 */

const STATIC_ROUTES: AppPathname[] = [
  '/',
  '/services',
  '/services/developpement-web-mobile',
  '/services/cybersecurite',
  '/services/conseil-it-nearshore',
  '/services/fourniture-informatique',
  '/formations',
  '/references',
  '/certifications',
  '/blog',
  '/devis',
  '/contact',
  '/a-propos',
  '/mentions-legales',
  '/politique-confidentialite',
];

type Entry = MetadataRoute.Sitemap[number];

function url(pathname: AppPathname, locale: Locale, params?: Record<string, string>): string {
  return company.siteUrl + localizedPaths(pathname, locale, params).external;
}

function staticEntries(): Entry[] {
  const entries: Entry[] = [];
  for (const route of STATIC_ROUTES) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, url(route, l as Locale)]),
    );
    for (const locale of routing.locales) {
      entries.push({
        url: url(route, locale as Locale),
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }
  return entries;
}

type CmsDoc = {
  slug?: Partial<Record<Locale, string>>;
  updatedAt: string;
};

async function cmsEntries(): Promise<Entry[]> {
  try {
    const payload = await getPayloadClient();
    const entries: Entry[] = [];

    const sources: Array<{ collection: 'posts' | 'formations'; route: AppPathname }> = [
      { collection: 'posts', route: '/blog/[slug]' },
      { collection: 'formations', route: '/formations/[slug]' },
    ];

    for (const { collection, route } of sources) {
      const res = await payload.find({
        collection,
        where: { _status: { equals: 'published' } },
        draft: false,
        locale: 'all',
        depth: 0,
        limit: 500,
        select: { slug: true, updatedAt: true },
      });

      for (const doc of res.docs as unknown as CmsDoc[]) {
        const slugs = doc.slug ?? {};
        const available = routing.locales.filter((l) => slugs[l as Locale]);
        if (available.length === 0) continue;

        const languages = Object.fromEntries(
          available.map((l) => [
            l,
            url(route, l as Locale, { slug: slugs[l as Locale] as string }),
          ]),
        );

        for (const locale of available) {
          entries.push({
            url: url(route, locale as Locale, { slug: slugs[locale as Locale] as string }),
            lastModified: doc.updatedAt,
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: { languages },
          });
        }
      }
    }
    return entries;
  } catch (err) {
    console.warn('sitemap : contenus CMS indisponibles —', (err as Error).message);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [statics, cms] = await Promise.all([staticEntries(), cmsEntries()]);
  return [...statics, ...cms];
}
