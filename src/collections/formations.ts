import type { CollectionConfig } from 'payload';
import { isAdminOrEditor, publishedOrLoggedIn } from '@/access';
import { seoFields, slugField } from '@/fields/slug';
import { formationsRevalidate } from '@/hooks/revalidate';

export const FORMATION_CATEGORIES = [
  { value: 'developpement', label: { fr: 'Développement', ar: 'التطوير', en: 'Development' } },
  { value: 'cloud', label: { fr: 'Cloud', ar: 'الحوسبة السحابية', en: 'Cloud' } },
  { value: 'devops', label: { fr: 'DevOps', ar: 'ديف أوبس', en: 'DevOps' } },
  {
    value: 'cybersecurite',
    label: { fr: 'Cybersécurité', ar: 'الأمن السيبراني', en: 'Cybersecurity' },
  },
  { value: 'agile', label: { fr: 'Agile', ar: 'أجايل', en: 'Agile' } },
  { value: 'bureautique', label: { fr: 'Bureautique', ar: 'المكتبيات', en: 'Office tools' } },
] as const;

export const FORMATION_MODALITIES = [
  { value: 'presentiel', label: { fr: 'Présentiel', ar: 'حضوري', en: 'On-site' } },
  { value: 'distanciel', label: { fr: 'Distanciel', ar: 'عن بُعد', en: 'Remote' } },
  {
    value: 'intra',
    label: { fr: 'Intra-entreprise', ar: 'داخل المؤسسة', en: 'In-company' },
  },
] as const;

/** Formations IT certifiantes — catalogue piloté par le CMS. */
export const Formations: CollectionConfig = {
  slug: 'formations',
  labels: {
    singular: { fr: 'Formation', ar: 'تكوين', en: 'Training course' },
    plural: { fr: 'Formations', ar: 'التكوينات', en: 'Training courses' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', '_status'],
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
    afterChange: [formationsRevalidate.afterChange],
    afterDelete: [formationsRevalidate.afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Intitulé', ar: 'عنوان التكوين', en: 'Title' },
    },
    slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [...FORMATION_CATEGORIES],
      label: { fr: 'Catégorie', ar: 'الفئة', en: 'Category' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 300,
      label: { fr: 'Résumé', ar: 'ملخص', en: 'Summary' },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Durée', ar: 'المدة', en: 'Duration' },
      admin: {
        position: 'sidebar',
        description: { fr: 'Ex. « 5 jours (35 h) »', ar: 'مثال: «5 أيام (35 ساعة)»', en: 'e.g. “5 days (35 h)”' },
      },
    },
    {
      name: 'modalities',
      type: 'select',
      hasMany: true,
      required: true,
      options: [...FORMATION_MODALITIES],
      label: { fr: 'Modalités', ar: 'صيغ التكوين', en: 'Delivery modes' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'objectives',
      type: 'array',
      localized: true,
      required: true,
      minRows: 3,
      label: { fr: 'Objectifs pédagogiques', ar: 'الأهداف البيداغوجية', en: 'Learning objectives' },
      labels: {
        singular: { fr: 'Objectif', ar: 'هدف', en: 'Objective' },
        plural: { fr: 'Objectifs', ar: 'أهداف', en: 'Objectives' },
      },
      fields: [{ name: 'text', type: 'text', required: true, label: { fr: 'Objectif', ar: 'الهدف', en: 'Objective' } }],
    },
    {
      name: 'program',
      type: 'array',
      localized: true,
      required: true,
      minRows: 2,
      label: { fr: 'Programme (modules)', ar: 'البرنامج (وحدات)', en: 'Program (modules)' },
      labels: {
        singular: { fr: 'Module', ar: 'وحدة', en: 'Module' },
        plural: { fr: 'Modules', ar: 'وحدات', en: 'Modules' },
      },
      fields: [
        { name: 'title', type: 'text', required: true, label: { fr: 'Titre du module', ar: 'عنوان الوحدة', en: 'Module title' } },
        {
          name: 'items',
          type: 'textarea',
          required: true,
          label: { fr: 'Points (un par ligne)', ar: 'النقاط (سطر لكل نقطة)', en: 'Items (one per line)' },
        },
      ],
    },
    {
      name: 'audience',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Public visé', ar: 'الفئة المستهدفة', en: 'Target audience' },
    },
    {
      name: 'prerequisites',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Prérequis', ar: 'المتطلبات المسبقة', en: 'Prerequisites' },
    },
    seoFields(),
  ],
};
