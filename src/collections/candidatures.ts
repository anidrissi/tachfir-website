import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrEditor, never } from '@/access';
import { EXPERTISE_SENIORITIES } from '@/collections/expertises';

/** Étapes de suivi interne d'une candidature (ATS léger). */
export const CANDIDATURE_STATUSES = [
  { value: 'nouveau', label: { fr: 'Nouveau', ar: 'جديد', en: 'New' } },
  { value: 'qualifie', label: { fr: 'Qualifié', ar: 'مؤهّل', en: 'Qualified' } },
  { value: 'entretien', label: { fr: 'Entretien', ar: 'مقابلة', en: 'Interview' } },
  { value: 'place', label: { fr: 'Placé', ar: 'تم توظيفه', en: 'Placed' } },
] as const;

/**
 * Vivier de talents (mini-ATS) — créé par le formulaire /talents.
 * JAMAIS public : `read` réservé au staff (admin/editor). La création passe
 * par la Local API (route /api/talents, overrideAccess) — pas via REST public.
 * Le CV est stocké dans la collection privée `cv-uploads`.
 */
export const Candidatures: CollectionConfig = {
  slug: 'candidatures',
  labels: {
    singular: { fr: 'Candidature', ar: 'ترشيح', en: 'Application' },
    plural: { fr: 'Vivier de talents', ar: 'مخزون الكفاءات', en: 'Talent pool' },
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'expertise', 'seniority', 'status', 'createdAt'],
    group: { fr: 'Recrutement', ar: 'التوظيف', en: 'Recruitment' },
  },
  access: {
    read: isAdminOrEditor,
    create: never,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: { fr: 'Nom complet', ar: 'الاسم الكامل', en: 'Full name' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: { fr: 'Email', ar: 'البريد الإلكتروني', en: 'Email' },
        },
        {
          name: 'phone',
          type: 'text',
          label: { fr: 'Téléphone', ar: 'الهاتف', en: 'Phone' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'expertise',
          type: 'relationship',
          relationTo: 'expertises',
          label: { fr: 'Expertise', ar: 'الخبرة', en: 'Expertise' },
        },
        {
          name: 'expertiseOther',
          type: 'text',
          label: { fr: 'Autre expertise', ar: 'خبرة أخرى', en: 'Other expertise' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'seniority',
          type: 'select',
          options: [...EXPERTISE_SENIORITIES],
          label: { fr: 'Séniorité', ar: 'المستوى', en: 'Seniority' },
        },
        {
          name: 'availability',
          type: 'text',
          label: { fr: 'Disponibilité', ar: 'التوفّر', en: 'Availability' },
        },
      ],
    },
    {
      name: 'remote',
      type: 'text',
      label: { fr: 'Remote / mobilité', ar: 'العمل عن بُعد / التنقل', en: 'Remote / mobility' },
    },
    {
      name: 'linkedin',
      type: 'text',
      label: { fr: 'LinkedIn', ar: 'لينكد إن', en: 'LinkedIn' },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'cv-uploads',
      label: { fr: 'CV (privé)', ar: 'السيرة الذاتية (خاص)', en: 'CV (private)' },
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: { fr: 'Consentement donné', ar: 'تم منح الموافقة', en: 'Consent given' },
    },
    // Suivi interne (barre latérale)
    {
      name: 'status',
      type: 'select',
      defaultValue: 'nouveau',
      options: [...CANDIDATURE_STATUSES],
      label: { fr: 'Statut', ar: 'الحالة', en: 'Status' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: { fr: 'Notes internes', ar: 'ملاحظات داخلية', en: 'Internal notes' },
      admin: { position: 'sidebar' },
    },
  ],
};
