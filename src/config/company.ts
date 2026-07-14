/**
 * Données entreprise centralisées.
 * Les valeurs `[EN_ATTENTE…]` sont des placeholders VISIBLES à remplacer
 * par les vraies données (voir TODO-CLIENT.md). Le global `settings` du CMS
 * prime sur ces valeurs pour le footer/contact/JSON-LD une fois renseigné.
 */
export const company = {
  name: 'Tachfir',
  legalName: 'Tachfir',
  tagline: 'Building Trust through Secure Tech',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tachfir.com',
  domain: 'www.tachfir.com',

  // NAP — Name, Address, Phone (placeholders visibles)
  address: {
    street: '[EN_ATTENTE — adresse complète]',
    city: '[EN_ATTENTE — ville, ex. Marrakech]',
    postalCode: '[EN_ATTENTE]',
    country: 'MA',
  },
  phone: '[EN_ATTENTE — téléphone +212…]',
  whatsapp: '[EN_ATTENTE — numéro WhatsApp +212…]', // format international sans espaces pour wa.me
  email: 'contact@tachfir.com',

  // Identifiants légaux (facturation marchés publics)
  ice: '[EN_ATTENTE — ICE]',
  rc: '[EN_ATTENTE — RC]',

  deliveryZones: '[EN_ATTENTE — zones de livraison, ex. tout le Maroc]',

  linkedin: 'https://www.linkedin.com/company/tachfir/',

  stats: {
    clients: 20,
    projects: 34,
    experts: 30,
  },

  clients: ['Intelcia', 'Proxiad', 'Alten', 'SFR', 'Fuzyo'],

  certifications: [
    'Professional Scrum Master (PSM)',
    'Certified SAFe® 5',
    'Oracle Certified Professional Java',
    'Oracle Certified Expert Java EE',
    'CCNA Switching / Routing / Wireless',
    'Cisco CyberOps Associate',
    'CKAD — Certified Kubernetes Application Developer',
    'HashiCorp Terraform Associate (003)',
    'Oracle Cloud Infrastructure Certified',
    'OCI AI Certified',
    'OCI Generative AI Certified',
  ],
} as const;

/** true si la valeur est encore un placeholder `[EN_ATTENTE…]` */
export function isPending(value: string): boolean {
  return value.startsWith('[');
}

/** Lien WhatsApp (wa.me) — null tant que le numéro n'est pas renseigné. */
export function whatsappHref(number: string, text?: string): string | null {
  if (isPending(number)) return null;
  const digits = number.replace(/[^\d]/g, '');
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${digits}${query}`;
}
