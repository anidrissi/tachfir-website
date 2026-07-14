import type { TextField } from 'payload';
import { slugify } from '@/lib/slugify';

/**
 * Champ slug localisé : généré automatiquement depuis le titre de la locale
 * en cours d'édition s'il est laissé vide, nettoyé sinon.
 */
export function slugField(): TextField {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    localized: true,
    unique: true,
    index: true,
    label: { fr: 'Slug (URL)', ar: 'المعرف في الرابط', en: 'Slug (URL)' },
    admin: {
      position: 'sidebar',
      description: {
        fr: 'Laisser vide pour générer depuis le titre. En arabe, le slug reste en écriture arabe (recommandé SEO).',
        ar: 'اتركه فارغاً ليُنشأ من العنوان. بالعربية يبقى المعرف بالحرف العربي (أفضل للسيو).',
        en: 'Leave empty to generate from the title. Arabic slugs stay in Arabic script (SEO).',
      },
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const source =
            typeof value === 'string' && value.trim().length > 0
              ? value
              : ((data?.title as string | undefined) ?? '');
          const slug = slugify(source);
          return slug.length > 0 ? slug : undefined;
        },
      ],
    },
  };
}

/** Groupe SEO localisé (title/description) réutilisé par posts & formations. */
export function seoFields() {
  return {
    name: 'seo',
    type: 'group' as const,
    label: { fr: 'SEO', ar: 'تحسين محركات البحث (SEO)', en: 'SEO' },
    fields: [
      {
        name: 'metaTitle',
        type: 'text' as const,
        localized: true,
        maxLength: 60,
        label: { fr: 'Titre SEO (≤ 60 car.)', ar: 'عنوان SEO (≤ 60 حرفاً)', en: 'SEO title (≤ 60 chars)' },
        admin: {
          description: {
            fr: 'Vide = titre du contenu. Modèle final : « … | Tachfir »',
            ar: 'فارغ = عنوان المحتوى. الصيغة النهائية: «… | Tachfir»',
            en: 'Empty = content title. Final pattern: “… | Tachfir”',
          },
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea' as const,
        localized: true,
        maxLength: 155,
        label: {
          fr: 'Description SEO (≤ 155 car.)',
          ar: 'وصف SEO (≤ 155 حرفاً)',
          en: 'SEO description (≤ 155 chars)',
        },
        admin: {
          description: {
            fr: 'Vide = extrait/résumé du contenu.',
            ar: 'فارغ = مقتطف المحتوى.',
            en: 'Empty = content excerpt/summary.',
          },
        },
      },
    ],
  };
}
