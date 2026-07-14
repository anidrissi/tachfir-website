import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { homeAndReferencesRevalidate } from '@/hooks/revalidate';

/** Logos clients (bandeau accueil + page références). */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: { fr: 'Client (logo)', ar: 'عميل (شعار)', en: 'Client (logo)' },
    plural: { fr: 'Clients (logos)', ar: 'العملاء (شعارات)', en: 'Clients (logos)' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom', ar: 'الاسم', en: 'Name' },
    },
    {
      name: 'logoLight',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Logo (thème clair)', ar: 'الشعار (المظهر الفاتح)', en: 'Logo (light theme)' },
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Logo (thème sombre)', ar: 'الشعار (المظهر الداكن)', en: 'Logo (dark theme)' },
    },
    {
      name: 'url',
      type: 'text',
      label: { fr: 'Site web', ar: 'الموقع الإلكتروني', en: 'Website' },
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
