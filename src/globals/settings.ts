import type { GlobalConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';
import { settingsRevalidate } from '@/hooks/revalidate';

/**
 * Réglages du site (NAP, réseaux, bandeaux) — consommés par le footer,
 * la page contact et le JSON-LD Organization/ProfessionalService.
 */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: { fr: 'Réglages du site', ar: 'إعدادات الموقع', en: 'Site settings' },
  admin: {
    group: { fr: 'Administration', ar: 'الإدارة', en: 'Administration' },
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [settingsRevalidate],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'address',
          type: 'text',
          localized: true,
          label: { fr: 'Adresse', ar: 'العنوان', en: 'Address' },
        },
        {
          name: 'city',
          type: 'text',
          localized: true,
          label: { fr: 'Ville', ar: 'المدينة', en: 'City' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: { fr: 'Téléphone', ar: 'الهاتف', en: 'Phone' },
          admin: { description: { fr: 'Format international : +212…', ar: 'بصيغة دولية: …+212', en: 'International format: +212…' } },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: { fr: 'WhatsApp', ar: 'واتساب', en: 'WhatsApp' },
          admin: {
            description: {
              fr: 'Numéro international sans espaces (ex. +2126XXXXXXXX). Active le bouton flottant.',
              ar: 'رقم دولي بدون فراغات (مثال: +2126XXXXXXXX). يُفعّل الزر العائم.',
              en: 'International number without spaces (e.g. +2126XXXXXXXX). Enables the floating button.',
            },
          },
        },
        {
          name: 'email',
          type: 'email',
          label: { fr: 'Email de contact', ar: 'البريد الإلكتروني', en: 'Contact email' },
        },
      ],
    },
    {
      name: 'linkedin',
      type: 'text',
      label: { fr: 'URL LinkedIn', ar: 'رابط لينكد إن', en: 'LinkedIn URL' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ice',
          type: 'text',
          label: { fr: 'ICE', ar: 'التعريف الموحد للمقاولة (ICE)', en: 'ICE' },
        },
        {
          name: 'rc',
          type: 'text',
          label: { fr: 'RC', ar: 'السجل التجاري (RC)', en: 'RC' },
        },
      ],
    },
    {
      name: 'deliveryZones',
      type: 'text',
      localized: true,
      label: { fr: 'Zones de livraison', ar: 'مناطق التوصيل', en: 'Delivery zones' },
    },
    {
      name: 'responseBanner',
      type: 'text',
      localized: true,
      label: {
        fr: 'Bandeau de réassurance (CTA)',
        ar: 'شريط الطمأنة (قرب أزرار الطلب)',
        en: 'Reassurance banner (CTA)',
      },
      admin: {
        description: {
          fr: 'Ex. « Réponse sous 24-48 h » — affiché près des boutons devis/contact.',
          ar: 'مثال: «نرد خلال 24-48 ساعة» — يظهر قرب أزرار الطلب.',
          en: 'e.g. “Reply within 24–48 h” — shown near quote/contact CTAs.',
        },
      },
    },
  ],
};
