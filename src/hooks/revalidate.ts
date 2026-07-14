import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { localizedPaths } from '@/lib/localized-path';

/**
 * Revalidation à la demande (SSG) déclenchée par les hooks Payload.
 * - ignorée pendant le seed (`context.disableRevalidate`)
 * - tolérante : hors contexte Next (CLI), l'appel est simplement ignoré
 */
async function revalidate(paths: string[], tags: string[] = [], templates: string[] = []) {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    for (const p of paths) revalidatePath(p);
    // Routes dynamiques entières (toutes locales/slugs) — nécessaire car le
    // hook ne connaît que le slug de la locale de la requête.
    for (const t of templates) {
      revalidatePath(t, 'page');
      revalidatePath(`/(frontend)${t}`, 'page');
    }
    // Next 16 : expiration immédiate du tag (profil { expire: 0 })
    for (const t of tags) revalidateTag(t, { expire: 0 });
  } catch {
    // Exécution hors serveur Next (payload run / seed) : rien à revalider.
  }
}

/** Chemins internes + externes d'une route pour toutes les locales. */
function allLocalePaths(pathname: AppPathname, params?: Record<string, string>): string[] {
  const out = new Set<string>();
  for (const locale of routing.locales) {
    const { internal, external } = localizedPaths(pathname, locale as Locale, params);
    out.add(internal);
    out.add(external);
  }
  return [...out];
}

type SlugByLocale = Partial<Record<Locale, string>>;

/** Extrait les slugs localisés d'un doc (le champ slug étant localisé, `locale: all` le renvoie en objet). */
function slugsOf(doc: Record<string, unknown>): SlugByLocale {
  const slug = doc?.slug;
  if (typeof slug === 'string') return { ar: slug, fr: slug, en: slug };
  return (slug ?? {}) as SlugByLocale;
}

function detailPaths(base: '/blog/[slug]' | '/formations/[slug]', slugs: SlugByLocale): string[] {
  const out = new Set<string>();
  for (const locale of routing.locales) {
    const slug = slugs[locale as Locale];
    if (!slug) continue;
    const { internal, external } = localizedPaths(base, locale as Locale, { slug });
    out.add(internal);
    out.add(external);
  }
  return [...out];
}

function makeCollectionHooks(kind: 'posts' | 'formations') {
  const listRoute: AppPathname = kind === 'posts' ? '/blog' : '/formations';
  const detailRoute = (kind === 'posts' ? '/blog/[slug]' : '/formations/[slug]') as
    | '/blog/[slug]'
    | '/formations/[slug]';

  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req, context }) => {
    if (context?.disableRevalidate) return doc;
    const paths = [
      ...allLocalePaths('/'),
      ...allLocalePaths(listRoute),
      ...detailPaths(detailRoute, slugsOf(doc as Record<string, unknown>)),
      ...detailPaths(detailRoute, slugsOf((previousDoc ?? {}) as Record<string, unknown>)),
    ];
    req.payload.logger.info(`revalidate ${kind}: ${paths.length} chemins`);
    await revalidate(paths, ['sitemap'], [`/[locale]${detailRoute}`]);
    return doc;
  };

  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req, context }) => {
    if (context?.disableRevalidate) return doc;
    const paths = [
      ...allLocalePaths('/'),
      ...allLocalePaths(listRoute),
      ...detailPaths(detailRoute, slugsOf(doc as Record<string, unknown>)),
    ];
    req.payload.logger.info(`revalidate ${kind} (delete): ${paths.length} chemins`);
    await revalidate(paths, ['sitemap'], [`/[locale]${detailRoute}`]);
    return doc;
  };

  return { afterChange, afterDelete };
}

export const postsRevalidate = makeCollectionHooks('posts');
export const formationsRevalidate = makeCollectionHooks('formations');

/** Témoignages & clients : accueil + page références. */
export const homeAndReferencesRevalidate: {
  afterChange: CollectionAfterChangeHook;
  afterDelete: CollectionAfterDeleteHook;
} = {
  afterChange: async ({ doc, context }) => {
    if (context?.disableRevalidate) return doc;
    await revalidate([...allLocalePaths('/'), ...allLocalePaths('/references')]);
    return doc;
  },
  afterDelete: async ({ doc, context }) => {
    if (context?.disableRevalidate) return doc;
    await revalidate([...allLocalePaths('/'), ...allLocalePaths('/references')]);
    return doc;
  },
};

/** Global settings : footer/contact/JSON-LD partout → revalidation des layouts locales. */
export const settingsRevalidate: GlobalAfterChangeHook = async ({ doc, context }) => {
  if (context?.disableRevalidate) return doc;
  try {
    const { revalidatePath } = await import('next/cache');
    for (const locale of routing.locales) {
      revalidatePath(`/${locale}`, 'layout');
    }
  } catch {
    // hors contexte Next
  }
  return doc;
};
