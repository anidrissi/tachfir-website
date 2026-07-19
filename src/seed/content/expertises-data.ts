import { EXPERTISE_SLUGS } from '@/config/editorial';
import { doc, p, b } from '../lexical';

/**
 * 5 expertises seedées (Phase 1 : structure + accroches réelles).
 * La description détaillée (300-500 mots/locale, angle marché francophonie/Golfe)
 * est marquée [EN_ATTENTE] et sera rédigée en Phase 2. Voir TODO-CLIENT.md.
 */

type LocaleFields = {
  title: string;
  slug: string;
  tagline: string;
  /** intro réelle (1 phrase) précédant le marqueur [EN_ATTENTE] */
  intro: string;
  seo: { metaTitle: string; metaDescription: string };
};

export type ExpertiseSeed = {
  key: keyof typeof EXPERTISE_SLUGS;
  order: number;
  technologies: string[];
  seniorities: Array<'junior' | 'confirme' | 'senior'>;
  modalities: Array<'regie' | 'forfait' | 'placement'>;
  ar: LocaleFields;
  fr: LocaleFields;
  en: LocaleFields;
};

const PENDING = {
  fr: '[EN_ATTENTE — description détaillée de l’expertise (profils, séniorités, cas d’usage, angle francophonie/Golfe) à rédiger].',
  ar: '[في الانتظار — وصف مفصّل للخبرة (الملفات، المستويات، حالات الاستخدام، زاوية الفرنكوفونية/الخليج) قيد التحرير].',
  en: '[PENDING — detailed expertise description (profiles, seniorities, use cases, francophonie/Gulf angle) to be written].',
};

export const expertisesSeed: ExpertiseSeed[] = [
  {
    key: 'java',
    order: 1,
    technologies: ['Java', 'Spring Boot', 'Spring', 'Hibernate', 'Microservices', 'REST'],
    seniorities: ['junior', 'confirme', 'senior'],
    modalities: ['regie', 'forfait', 'placement'],
    fr: {
      title: 'Java / Spring',
      slug: EXPERTISE_SLUGS.java.fr,
      tagline:
        'Développeurs et architectes Java / Spring Boot certifiés pour vos applications critiques — en régie, au forfait ou en placement.',
      intro:
        'Nos consultants Java / Spring conçoivent et font évoluer des applications d’entreprise robustes, sécurisées et maintenables.',
      seo: {
        metaTitle: 'Consultant & développeur Java / Spring Boot',
        metaDescription:
          'Recrutez des développeurs et architectes Java / Spring Boot certifiés : régie, forfait ou placement — Maroc, France, Golfe.',
      },
    },
    ar: {
      title: 'Java / Spring',
      slug: EXPERTISE_SLUGS.java.ar,
      tagline:
        'مطورون ومهندسون معتمدون في Java / Spring Boot لتطبيقاتكم الحساسة — بصيغة الاستقدام أو العقد المقطوع أو التوظيف.',
      intro:
        'يصمّم استشاريونا في Java / Spring تطبيقات مؤسسية متينة وآمنة وقابلة للصيانة ويطوّرونها.',
      seo: {
        metaTitle: 'مطور واستشاري Java / Spring Boot',
        metaDescription:
          'استقطاب مطوري ومهندسي Java / Spring Boot المعتمدين: استقدام أو عقد مقطوع أو توظيف، بالمغرب ولفرنسا وبلجيكا وكندا والخليج.',
      },
    },
    en: {
      title: 'Java / Spring',
      slug: EXPERTISE_SLUGS.java.en,
      tagline:
        'Certified Java / Spring Boot developers and architects for your critical applications — staff augmentation, fixed-price or placement.',
      intro:
        'Our Java / Spring consultants design and evolve robust, secure and maintainable enterprise applications.',
      seo: {
        metaTitle: 'Java / Spring Boot consultant & developer',
        metaDescription:
          'Hire certified Java / Spring Boot developers and architects: staff augmentation, fixed-price or placement — Morocco, France, Gulf.',
      },
    },
  },
  {
    key: 'angular',
    order: 2,
    technologies: ['Angular', 'React', 'TypeScript', 'RxJS', 'Next.js', 'UX/UI'],
    seniorities: ['junior', 'confirme', 'senior'],
    modalities: ['regie', 'forfait', 'placement'],
    fr: {
      title: 'Angular / React',
      slug: EXPERTISE_SLUGS.angular.fr,
      tagline:
        'Développeurs front-end Angular et React pour des interfaces modernes, performantes et accessibles.',
      intro:
        'Nos développeurs front-end construisent des interfaces rapides, accessibles et alignées sur votre design system.',
      seo: {
        metaTitle: 'Développeur Angular / React',
        metaDescription:
          'Recrutez des développeurs front-end Angular et React certifiés : régie, forfait ou placement — Maroc, France, Golfe.',
      },
    },
    ar: {
      title: 'Angular / React',
      slug: EXPERTISE_SLUGS.angular.ar,
      tagline:
        'مطورو واجهات أمامية بـ Angular وReact لواجهات عصرية وسريعة وسهلة الوصول.',
      intro:
        'يبني مطورو الواجهات لدينا واجهات سريعة وسهلة الوصول ومتوافقة مع نظام التصميم الخاص بكم.',
      seo: {
        metaTitle: 'مطور Angular / React',
        metaDescription:
          'استقطاب مطوري الواجهات الأمامية Angular وReact المعتمدين: استقدام أو عقد مقطوع أو توظيف، بالمغرب ولفرنسا وبلجيكا وكندا والخليج.',
      },
    },
    en: {
      title: 'Angular / React',
      slug: EXPERTISE_SLUGS.angular.en,
      tagline:
        'Angular and React front-end developers for modern, fast and accessible interfaces.',
      intro:
        'Our front-end developers build fast, accessible interfaces aligned with your design system.',
      seo: {
        metaTitle: 'Angular / React developer',
        metaDescription:
          'Hire certified Angular and React front-end developers: staff augmentation, fixed-price or placement — Morocco, France, Gulf.',
      },
    },
  },
  {
    key: 'servicenow',
    order: 3,
    technologies: ['ServiceNow', 'ITSM', 'ITOM', 'Flow Designer', 'Integration Hub'],
    seniorities: ['confirme', 'senior'],
    modalities: ['regie', 'forfait', 'placement'],
    fr: {
      title: 'ServiceNow',
      slug: EXPERTISE_SLUGS.servicenow.fr,
      tagline:
        'Consultants et développeurs ServiceNow pour vos workflows ITSM, ITOM et vos automatisations.',
      intro:
        'Nos consultants ServiceNow configurent, développent et intègrent la plateforme au plus près de vos processus.',
      seo: {
        metaTitle: 'Consultant & développeur ServiceNow',
        metaDescription:
          'Recrutez des consultants et développeurs ServiceNow (ITSM, ITOM) : régie, forfait ou placement — Maroc, France, Golfe.',
      },
    },
    ar: {
      title: 'ServiceNow',
      slug: EXPERTISE_SLUGS.servicenow.ar,
      tagline:
        'استشاريون ومطورون في ServiceNow لسير عمل ITSM وITOM وأتمتة عملياتكم.',
      intro:
        'يقوم استشاريو ServiceNow لدينا بإعداد المنصة وتطويرها ودمجها بما يناسب عملياتكم.',
      seo: {
        metaTitle: 'استشاري ومطور ServiceNow',
        metaDescription:
          'استقطاب استشاريي ومطوري ServiceNow (ITSM، ITOM): استقدام أو عقد مقطوع أو توظيف، بالمغرب ولفرنسا وبلجيكا وكندا والخليج.',
      },
    },
    en: {
      title: 'ServiceNow',
      slug: EXPERTISE_SLUGS.servicenow.en,
      tagline:
        'ServiceNow consultants and developers for your ITSM, ITOM workflows and automations.',
      intro:
        'Our ServiceNow consultants configure, develop and integrate the platform to fit your processes.',
      seo: {
        metaTitle: 'ServiceNow consultant & developer',
        metaDescription:
          'Hire ServiceNow consultants and developers (ITSM, ITOM): staff augmentation, fixed-price or placement — Morocco, France, Gulf.',
      },
    },
  },
  {
    key: 'pentest',
    order: 4,
    technologies: ['Pentest', 'OWASP', 'Red Team', 'CyberOps', 'Audit', 'SOC'],
    seniorities: ['confirme', 'senior'],
    modalities: ['regie', 'forfait'],
    fr: {
      title: 'Pentest / Test d’intrusion',
      slug: EXPERTISE_SLUGS.pentest.fr,
      tagline:
        'Pentesters certifiés pour vos tests d’intrusion, audits de sécurité et campagnes de remédiation.',
      intro:
        'Nos experts sécurité mènent des tests d’intrusion outillés et livrent des rapports actionnables avec retest.',
      seo: {
        metaTitle: 'Expert pentest / test d’intrusion',
        metaDescription:
          'Recrutez des pentesters certifiés (OWASP, CyberOps) : audits, tests d’intrusion et remédiation, en régie ou au forfait — Maroc, France, Golfe.',
      },
    },
    ar: {
      title: 'اختبار الاختراق',
      slug: EXPERTISE_SLUGS.pentest.ar,
      tagline:
        'خبراء معتمدون في اختبار الاختراق لتدقيقاتكم الأمنية وحملات المعالجة.',
      intro:
        'يجري خبراء الأمن لدينا اختبارات اختراق مدعومة بالأدوات ويقدمون تقارير قابلة للتنفيذ مع إعادة اختبار.',
      seo: {
        metaTitle: 'خبير اختبار الاختراق',
        metaDescription:
          'استقطاب خبراء اختبار الاختراق المعتمدين (OWASP، CyberOps): تدقيق واختبار ومعالجة، بصيغة الاستقدام أو العقد المقطوع — المغرب وفرنسا والخليج.',
      },
    },
    en: {
      title: 'Penetration Testing',
      slug: EXPERTISE_SLUGS.pentest.en,
      tagline:
        'Certified penetration testers for your security audits, intrusion tests and remediation campaigns.',
      intro:
        'Our security experts run tooled penetration tests and deliver actionable reports with retest.',
      seo: {
        metaTitle: 'Penetration testing expert',
        metaDescription:
          'Hire certified penetration testers (OWASP, CyberOps): audits, intrusion tests and remediation, staff augmentation or fixed-price — Morocco, France, Gulf.',
      },
    },
  },
  {
    key: 'devops',
    order: 5,
    technologies: ['DevOps', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'OCI', 'CI/CD'],
    seniorities: ['confirme', 'senior'],
    modalities: ['regie', 'forfait', 'placement'],
    fr: {
      title: 'DevOps & Cloud',
      slug: EXPERTISE_SLUGS.devops.fr,
      tagline:
        'Ingénieurs DevOps & Cloud (AWS, Azure, OCI, Kubernetes, Terraform) pour industrialiser vos déploiements.',
      intro:
        'Nos ingénieurs DevOps automatisent vos pipelines, sécurisent vos plateformes et fiabilisent vos mises en production.',
      seo: {
        metaTitle: 'Ingénieur DevOps & Cloud',
        metaDescription:
          'Recrutez des ingénieurs DevOps & Cloud certifiés (Kubernetes, Terraform, AWS, Azure, OCI) : régie, forfait ou placement — Maroc, France, Golfe.',
      },
    },
    ar: {
      title: 'DevOps والسحابة',
      slug: EXPERTISE_SLUGS.devops.ar,
      tagline:
        'مهندسو DevOps والسحابة (AWS، Azure، OCI، Kubernetes، Terraform) لأتمتة عمليات النشر.',
      intro:
        'يقوم مهندسو DevOps لدينا بأتمتة مساراتكم وتأمين منصّاتكم وضمان موثوقية الإطلاق للإنتاج.',
      seo: {
        metaTitle: 'مهندس DevOps والسحابة',
        metaDescription:
          'استقطاب مهندسي DevOps والسحابة المعتمدين (Kubernetes، Terraform، AWS، Azure، OCI): استقدام أو عقد مقطوع أو توظيف — المغرب وفرنسا والخليج.',
      },
    },
    en: {
      title: 'DevOps & Cloud',
      slug: EXPERTISE_SLUGS.devops.en,
      tagline:
        'DevOps & Cloud engineers (AWS, Azure, OCI, Kubernetes, Terraform) to industrialize your deployments.',
      intro:
        'Our DevOps engineers automate your pipelines, secure your platforms and make releases reliable.',
      seo: {
        metaTitle: 'DevOps & Cloud engineer',
        metaDescription:
          'Hire certified DevOps & Cloud engineers (Kubernetes, Terraform, AWS, Azure, OCI): staff augmentation, fixed-price or placement — Morocco, France, Gulf.',
      },
    },
  },
];

/** Document Lexical de la description (Phase 1 : intro réelle + marqueur [EN_ATTENTE]). */
export function expertiseDescription(locale: 'ar' | 'fr' | 'en', intro: string) {
  return doc(p(b(intro)), p(PENDING[locale]));
}
