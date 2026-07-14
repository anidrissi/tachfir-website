import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { seoFields, slugField } from '@/fields/slug';
import { postsRevalidate } from '@/hooks/revalidate';

export const POST_CATEGORIES = [
  {
    value: 'marches-publics',
    label: { fr: 'Marchés publics', ar: 'الصفقات العمومية', en: 'Public procurement' },
  },
  { value: 'nearshore', label: { fr: 'Nearshore', ar: 'التعهيد القريب', en: 'Nearshore' } },
  { value: 'formation', label: { fr: 'Formation', ar: 'التكوين', en: 'Training' } },
  {
    value: 'cybersecurite',
    label: { fr: 'Cybersécurité', ar: 'الأمن السيبراني', en: 'Cybersecurity' },
  },
  { value: 'guides', label: { fr: 'Guides', ar: 'أدلة عملية', en: 'Guides' } },
  { value: 'actualites', label: { fr: 'Actualités', ar: 'مستجدات', en: 'News' } },
] as const;

/** Articles de blog — entièrement localisés (ar/fr/en), brouillon/publié. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { fr: 'Article', ar: 'مقال', en: 'Post' },
    plural: { fr: 'Articles (blog)', ar: 'مقالات المدونة', en: 'Posts (blog)' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'publishedAt'],
    group: { fr: 'Contenus', ar: 'المحتويات', en: 'Content' },
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [postsRevalidate.afterChange],
    afterDelete: [postsRevalidate.afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', ar: 'العنوان', en: 'Title' },
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 300,
      label: { fr: 'Extrait', ar: 'مقتطف', en: 'Excerpt' },
      admin: {
        description: {
          fr: 'Affiché dans les listes et utilisé comme description SEO par défaut.',
          ar: 'يظهر في القوائم ويُستخدم وصفاً افتراضياً لمحركات البحث.',
          en: 'Shown in lists and used as default SEO description.',
        },
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image de couverture', ar: 'صورة الغلاف', en: 'Cover image' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'guides',
      options: [...POST_CATEGORIES],
      label: { fr: 'Catégorie', ar: 'الفئة', en: 'Category' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Tachfir',
      label: { fr: 'Auteur', ar: 'الكاتب', en: 'Author' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: { fr: 'Date de publication', ar: 'تاريخ النشر', en: 'Published at' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData?._status === 'published' && !value) return new Date();
            return value;
          },
        ],
      },
    },
    seoFields(),
  ],
};
