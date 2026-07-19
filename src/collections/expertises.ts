import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { seoFields, slugField } from '@/fields/slug';
import { expertisesRevalidate } from '@/hooks/revalidate';

/** Séniorités disponibles (partagées avec le vivier `candidatures`). */
export const EXPERTISE_SENIORITIES = [
  { value: 'junior', label: { fr: 'Junior', ar: 'مبتدئ', en: 'Junior' } },
  { value: 'confirme', label: { fr: 'Confirmé', ar: 'متمرّس', en: 'Mid-level' } },
  { value: 'senior', label: { fr: 'Senior', ar: 'خبير', en: 'Senior' } },
] as const;

/** Modalités d'engagement d'un profil. */
export const EXPERTISE_MODALITIES = [
  {
    value: 'regie',
    label: {
      fr: 'Régie / staff augmentation',
      ar: 'الاستقدام وتعزيز الفريق',
      en: 'Staff augmentation',
    },
  },
  { value: 'forfait', label: { fr: 'Forfait', ar: 'عقد مقطوع', en: 'Fixed-price' } },
  {
    value: 'placement',
    label: { fr: 'Placement / recrutement', ar: 'التوظيف والاستقطاب', en: 'Placement' },
  },
] as const;

/**
 * Expertises — landing pages SEO par technologie, pilotées par le CMS.
 * L'équipe peut ajouter une nouvelle expertise (Data, SAP, .NET…) sans code.
 */
export const Expertises: CollectionConfig = {
  slug: 'expertises',
  labels: {
    singular: { fr: 'Expertise', ar: 'خبرة', en: 'Expertise' },
    plural: { fr: 'Expertises', ar: 'الخبرات', en: 'Expertise' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', '_status'],
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
    afterChange: [expertisesRevalidate.afterChange],
    afterDelete: [expertisesRevalidate.afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Nom de l’expertise', ar: 'اسم الخبرة', en: 'Expertise name' },
      admin: {
        description: {
          fr: 'Ex. « Java / Spring », « ServiceNow ».',
          ar: 'مثال: «Java / Spring»، «ServiceNow».',
          en: 'e.g. “Java / Spring”, “ServiceNow”.',
        },
      },
    },
    slugField(),
    {
      name: 'tagline',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 300,
      label: { fr: 'Accroche', ar: 'العبارة الجذابة', en: 'Tagline' },
      admin: {
        description: {
          fr: 'Résumé affiché dans les listes et utilisé comme description SEO par défaut.',
          ar: 'ملخص يظهر في القوائم ويُستخدم وصفاً افتراضياً للسيو.',
          en: 'Shown in lists and used as default SEO description.',
        },
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Description', ar: 'الوصف', en: 'Description' },
    },
    {
      name: 'technologies',
      type: 'array',
      label: { fr: 'Technologies associées', ar: 'التقنيات المرتبطة', en: 'Related technologies' },
      labels: {
        singular: { fr: 'Technologie', ar: 'تقنية', en: 'Technology' },
        plural: { fr: 'Technologies', ar: 'التقنيات', en: 'Technologies' },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: { fr: 'Nom', ar: 'الاسم', en: 'Name' },
        },
      ],
    },
    {
      name: 'seniorities',
      type: 'select',
      hasMany: true,
      options: [...EXPERTISE_SENIORITIES],
      label: { fr: 'Séniorités disponibles', ar: 'المستويات المتاحة', en: 'Available seniorities' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'modalities',
      type: 'select',
      hasMany: true,
      options: [...EXPERTISE_MODALITIES],
      label: { fr: 'Modalités', ar: 'صيغ التعاقد', en: 'Engagement modes' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre d’affichage', ar: 'ترتيب العرض', en: 'Display order' },
      admin: { position: 'sidebar' },
    },
    seoFields(),
  ],
};
