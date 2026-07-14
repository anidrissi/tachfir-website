import { company } from '@/config/company';
import type { Locale } from '@/i18n/routing';

/**
 * Paramètres du site (NAP, réseaux, bandeaux).
 * Source de vérité : global `settings` du CMS Payload (branché à l'étape CMS),
 * avec repli sur src/config/company.ts tant que le CMS n'est pas renseigné.
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
  /** Bandeau de réassurance près des CTA (ex. « Réponse sous 24-48 h ») — null → texte par défaut des messages */
  responseBanner: string | null;
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
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getSettings(_locale: Locale): Promise<SiteSettings> {
  // Le branchement CMS (global `settings`) est ajouté avec l'intégration Payload.
  return fallback;
}
