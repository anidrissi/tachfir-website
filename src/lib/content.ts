import type { Where } from 'payload';
import type { Locale } from '@/i18n/routing';
import { getPayloadClient } from '@/lib/payload';
import type { Client, Formation, Post, Testimonial } from '@/payload-types';

/**
 * Requêtes de contenu (Local API) — sûres : en cas de base indisponible
 * (premier build, CI sans seed), elles renvoient des listes vides plutôt
 * que de casser le rendu statique.
 */

const PUBLISHED: Where = { _status: { equals: 'published' } };

async function safe<T>(fn: () => Promise<T>, fallbackValue: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`contenu ${label} indisponible :`, (err as Error).message);
    return fallbackValue;
  }
}

export function getClients(): Promise<Client[]> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'clients',
        sort: 'order',
        limit: 20,
        depth: 1,
      });
      return res.docs;
    },
    [],
    'clients',
  );
}

export function getTestimonials(locale: Locale, limit = 10): Promise<Testimonial[]> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'testimonials',
        where: { visible: { equals: true } },
        sort: 'order',
        locale,
        fallbackLocale: 'ar',
        limit,
      });
      return res.docs;
    },
    [],
    'témoignages',
  );
}

export function getFormations(locale: Locale, limit = 50): Promise<Formation[]> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'formations',
        where: PUBLISHED,
        draft: false,
        sort: 'createdAt',
        locale,
        fallbackLocale: 'ar',
        limit,
      });
      return res.docs;
    },
    [],
    'formations',
  );
}

export function getPosts(locale: Locale, limit = 50): Promise<Post[]> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'posts',
        where: PUBLISHED,
        draft: false,
        sort: '-publishedAt',
        locale,
        fallbackLocale: 'ar',
        limit,
        depth: 1,
      });
      return res.docs;
    },
    [],
    'articles',
  );
}

export function getFormationBySlug(locale: Locale, slug: string): Promise<Formation | null> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'formations',
        where: { and: [PUBLISHED, { slug: { equals: slug } }] },
        draft: false,
        locale,
        fallbackLocale: 'ar',
        limit: 1,
      });
      return res.docs[0] ?? null;
    },
    null,
    `formation ${slug}`,
  );
}

export function getPostBySlug(locale: Locale, slug: string): Promise<Post | null> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: 'posts',
        where: { and: [PUBLISHED, { slug: { equals: slug } }] },
        draft: false,
        locale,
        fallbackLocale: 'ar',
        limit: 1,
        depth: 1,
      });
      return res.docs[0] ?? null;
    },
    null,
    `article ${slug}`,
  );
}

/** Slugs localisés d'un document (pour hreflang + sélecteur de langue). */
export function getLocalizedSlugs(
  collection: 'posts' | 'formations',
  id: number | string,
): Promise<Partial<Record<Locale, string>>> {
  return safe(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findByID({
        collection,
        id,
        locale: 'all',
        depth: 0,
      });
      const slugs = (doc as { slug?: Partial<Record<Locale, string>> }).slug ?? {};
      return slugs;
    },
    {},
    `slugs ${collection}#${id}`,
  );
}
