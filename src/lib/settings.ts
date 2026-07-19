import { company } from '@/config/company';
import type { Locale } from '@/i18n/routing';
import { getPayloadClient } from '@/lib/payload';

/**
 * Paramètres du site (NAP, réseaux, bandeaux).
 * Source de vérité : global `settings` du CMS Payload,
 * avec repli sur src/config/company.ts pour toute valeur absente.
 */
export type SiteSettings = {
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  linkedin: string;
  ice: string;
  rc: string;
  deliveryZones: string;
  /** Bandeau de réassurance près des CTA — null → texte par défaut des messages */
  responseBanner: string | null;
  /** Bandeau outsourcing (« Shortlist sous 72 h ») — null → texte par défaut */
  shortlistBanner: string | null;
};

const fallback: SiteSettings = {
  address: company.address.street,
  city: company.address.city,
  phone: company.phone,
  whatsapp: company.whatsapp,
  email: company.email,
  linkedin: company.linkedin,
  ice: company.ice,
  rc: company.rc,
  deliveryZones: company.deliveryZones,
  responseBanner: null,
  shortlistBanner: null,
};

export async function getSettings(locale: Locale): Promise<SiteSettings> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: 'settings', locale, fallbackLocale: 'ar' });
    return {
      address: doc?.address || fallback.address,
      city: doc?.city || fallback.city,
      phone: doc?.phone || fallback.phone,
      whatsapp: doc?.whatsapp || fallback.whatsapp,
      email: doc?.email || fallback.email,
      linkedin: doc?.linkedin || fallback.linkedin,
      ice: doc?.ice || fallback.ice,
      rc: doc?.rc || fallback.rc,
      deliveryZones: doc?.deliveryZones || fallback.deliveryZones,
      responseBanner: doc?.responseBanner || null,
      shortlistBanner: doc?.shortlistBanner || null,
    };
  } catch (err) {
    // Base indisponible (premier build, CI sans seed…) : placeholders visibles.
    console.warn('settings: repli sur company.ts —', (err as Error).message);
    return fallback;
  }
}
