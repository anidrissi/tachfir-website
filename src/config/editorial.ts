import type { Locale } from '@/i18n/routing';

/**
 * Slugs éditoriaux stables (formations & articles seedés).
 * Utilisés par le seed ET par le maillage interne (pages services → formation
 * liée + article lié). Une seule source de vérité pour éviter les 404.
 */
export type LocalizedSlug = Record<Locale, string>;

export const FORMATION_SLUGS = {
  fullstack: {
    fr: 'developpement-web-full-stack-react-spring-boot',
    ar: 'تطوير-الويب-المتكامل-رياكت-سبرينغ-بوت',
    en: 'full-stack-web-development-react-spring-boot',
  },
  cyberops: {
    fr: 'cybersecurite-operationnelle',
    ar: 'الأمن-السيبراني-التشغيلي',
    en: 'operational-cybersecurity',
  },
  cloud: {
    fr: 'cloud-aws-azure-oci',
    ar: 'الحوسبة-السحابية-aws-azure-oci',
    en: 'cloud-aws-azure-oci',
  },
  devops: {
    fr: 'devops-kubernetes-terraform',
    ar: 'ديف-أوبس-كوبرنيتيس-تيرافورم',
    en: 'devops-kubernetes-terraform',
  },
  agile: {
    fr: 'gestion-de-projet-agile-scrum-safe',
    ar: 'إدارة-المشاريع-أجايل-سكروم-سيف',
    en: 'agile-project-management-scrum-safe',
  },
  bureautique: {
    fr: 'bureautique-et-digitalisation',
    ar: 'المكتبيات-والرقمنة',
    en: 'office-tools-and-digitalization',
  },
} as const satisfies Record<string, LocalizedSlug>;

export const POST_SLUGS = {
  marchesPublics: {
    fr: 'marches-publics-reussir-commande-materiel-informatique-maroc',
    ar: 'سند-الطلب-للمعدات-المعلوماتية-دليل-الإدارات-المغربية',
    en: 'public-procurement-it-hardware-purchase-morocco',
  },
  nearshore: {
    fr: 'nearshore-maroc-pourquoi-entreprises-francaises-externalisent',
    ar: 'التعهيد-القريب-في-المغرب-لماذا-تختاره-الشركات-الفرنسية',
    en: 'nearshore-morocco-why-french-companies-outsource-development',
  },
  certifications: {
    fr: 'certifications-it-les-plus-demandees-au-maroc',
    ar: 'أهم-الشهادات-المعلوماتية-المطلوبة-في-المغرب',
    en: 'most-in-demand-it-certifications-in-morocco',
  },
} as const satisfies Record<string, LocalizedSlug>;
