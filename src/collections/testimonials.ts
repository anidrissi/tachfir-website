import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { homeAndReferencesRevalidate } from '@/hooks/revalidate';

/** Témoignages clients (accueil + page références). */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: { fr: 'Témoignage', ar: 'شهادة عميل', en: 'Testimonial' },
    plural: { fr: 'Témoignages', ar: 'شهادات العملاء', en: 'Testimonials' },
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'visible', 'order'],
    group: { fr: 'Contenus', ar: 'المحتويات', en: 'Content' },
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [homeAndReferencesRevalidate.afterChange],
    afterDelete: [homeAndReferencesRevalidate.afterDelete],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: { fr: 'Auteur', ar: 'الاسم', en: 'Author' },
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      label: { fr: 'Fonction', ar: 'المنصب', en: 'Role' },
    },
    {
      name: 'company',
      type: 'text',
      label: { fr: 'Société', ar: 'الشركة', en: 'Company' },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Citation', ar: 'الشهادة', en: 'Quote' },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      label: { fr: 'Visible sur le site', ar: 'ظاهر في الموقع', en: 'Visible on site' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre', ar: 'الترتيب', en: 'Order' },
      admin: { position: 'sidebar' },
    },
  ],
};
