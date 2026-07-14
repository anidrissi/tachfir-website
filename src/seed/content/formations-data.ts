import { FORMATION_SLUGS } from '@/config/editorial';

/**
 * 6 formations complètes ×3 langues, alignées sur les certifications
 * réelles de l'équipe. Durées et programmes : [À VALIDER] par le client
 * (voir TODO-CLIENT.md).
 */

type LocaleFields = {
  title: string;
  slug: string;
  summary: string;
  duration: string;
  objectives: string[];
  program: Array<{ title: string; items: string }>;
  audience: string;
  prerequisites: string;
  seo: { metaTitle: string; metaDescription: string };
};

export type FormationSeed = {
  key: keyof typeof FORMATION_SLUGS;
  category: 'developpement' | 'cloud' | 'devops' | 'cybersecurite' | 'agile' | 'bureautique';
  modalities: Array<'presentiel' | 'distanciel' | 'intra'>;
  ar: LocaleFields;
  fr: LocaleFields;
  en: LocaleFields;
};

export const formationsSeed: FormationSeed[] = [
  {
    key: 'fullstack',
    category: 'developpement',
    modalities: ['presentiel', 'distanciel', 'intra'],
    fr: {
      title: 'Développement web full-stack React & Spring Boot',
      slug: FORMATION_SLUGS.fullstack.fr,
      summary:
        'Construire une application web complète et sécurisée : front React, API Spring Boot, base de données, tests et déploiement — la stack que nos équipes livrent en production.',
      duration: '10 jours (70 h)',
      objectives: [
        'Développer une interface moderne avec React et TypeScript',
        'Concevoir une API REST robuste avec Spring Boot',
        'Modéliser et interroger une base de données relationnelle',
        'Sécuriser l’application de bout en bout (authentification, OWASP)',
        'Tester, packager et déployer l’application',
      ],
      program: [
        {
          title: 'Fondations front-end',
          items: 'JavaScript moderne et TypeScript\nComposants, props et état React\nHooks, routage et formulaires',
        },
        {
          title: 'API avec Spring Boot',
          items: 'Structure d’un projet Spring Boot\nContrôleurs REST, services, validation\nPersistance JPA et base relationnelle',
        },
        {
          title: 'Intégration front-back',
          items: 'Consommation d’API et gestion des erreurs\nAuthentification JWT\nGestion des rôles et autorisations',
        },
        {
          title: 'Qualité et sécurité',
          items: 'Tests unitaires et d’intégration\nBonnes pratiques OWASP\nRevues de code et outillage',
        },
        {
          title: 'Livraison',
          items: 'Build et conteneurisation\nDéploiement et variables d’environnement\nProjet fil rouge : mise en production',
        },
      ],
      audience: 'Développeurs junior à intermédiaire, reconversions techniques, équipes internes à monter en compétence sur la stack React/Java.',
      prerequisites: 'Bases de programmation (variables, fonctions, boucles) et notions de web (HTML/CSS). Une première expérience d’un langage orienté objet est un plus.',
      seo: {
        metaTitle: 'Formation full-stack React & Spring Boot',
        metaDescription:
          'Formation intensive full-stack au Maroc : React, TypeScript, Spring Boot, sécurité OWASP et déploiement. Par des développeurs certifiés Oracle Java.',
      },
    },
    ar: {
      title: 'تطوير الويب المتكامل: React و Spring Boot',
      slug: FORMATION_SLUGS.fullstack.ar,
      summary:
        'بناء تطبيق ويب كامل وآمن: واجهة React، وواجهة برمجية Spring Boot، وقاعدة بيانات، واختبارات ونشر — نفس المنظومة التي تسلمها فرقنا للإنتاج.',
      duration: '10 أيام (70 ساعة)',
      objectives: [
        'تطوير واجهة عصرية بـ React و TypeScript',
        'تصميم واجهة برمجية REST متينة بـ Spring Boot',
        'نمذجة قاعدة بيانات علائقية والاستعلام عليها',
        'تأمين التطبيق من طرف إلى طرف (المصادقة، OWASP)',
        'اختبار التطبيق وتجهيزه ونشره',
      ],
      program: [
        {
          title: 'أساسيات الواجهات',
          items: 'جافاسكريبت الحديثة و TypeScript\nمكونات React والخصائص والحالة\nالخطافات والتوجيه والاستمارات',
        },
        {
          title: 'الواجهة البرمجية بـ Spring Boot',
          items: 'بنية مشروع Spring Boot\nمتحكمات REST والخدمات والتحقق\nالإتاحة عبر JPA وقاعدة علائقية',
        },
        {
          title: 'الربط بين الواجهة والخلفية',
          items: 'استهلاك الواجهات البرمجية ومعالجة الأخطاء\nالمصادقة بـ JWT\nتدبير الأدوار والصلاحيات',
        },
        {
          title: 'الجودة والأمن',
          items: 'اختبارات الوحدات والتكامل\nممارسات OWASP الجيدة\nمراجعات الشيفرة والأدوات',
        },
        {
          title: 'التسليم',
          items: 'البناء والحاويات\nالنشر ومتغيرات البيئة\nمشروع تطبيقي: الوضع في الإنتاج',
        },
      ],
      audience: 'مطورون مبتدئون إلى متوسطين، ومعاد توجيههم تقنياً، وفرق داخلية تريد التمكن من منظومة React/Java.',
      prerequisites: 'أساسيات البرمجة (المتغيرات، الدوال، الحلقات) ومبادئ الويب (HTML/CSS). تجربة أولى بلغة كائنية التوجه ميزة إضافية.',
      seo: {
        metaTitle: 'تكوين التطوير المتكامل React و Spring Boot',
        metaDescription:
          'تكوين مكثف في التطوير المتكامل بالمغرب: React و TypeScript و Spring Boot وأمن OWASP والنشر. يؤطره مطورون معتمدون من Oracle.',
      },
    },
    en: {
      title: 'Full-stack web development: React & Spring Boot',
      slug: FORMATION_SLUGS.fullstack.en,
      summary:
        'Build a complete, secure web application: React front end, Spring Boot API, database, tests and deployment — the same stack our teams ship to production.',
      duration: '10 days (70 h)',
      objectives: [
        'Build a modern interface with React and TypeScript',
        'Design a robust REST API with Spring Boot',
        'Model and query a relational database',
        'Secure the application end to end (authentication, OWASP)',
        'Test, package and deploy the application',
      ],
      program: [
        {
          title: 'Front-end foundations',
          items: 'Modern JavaScript and TypeScript\nReact components, props and state\nHooks, routing and forms',
        },
        {
          title: 'APIs with Spring Boot',
          items: 'Structure of a Spring Boot project\nREST controllers, services, validation\nJPA persistence and relational database',
        },
        {
          title: 'Front-back integration',
          items: 'Consuming APIs and error handling\nJWT authentication\nRoles and authorization',
        },
        {
          title: 'Quality and security',
          items: 'Unit and integration testing\nOWASP good practices\nCode reviews and tooling',
        },
        {
          title: 'Delivery',
          items: 'Build and containerization\nDeployment and environment variables\nCapstone project: going to production',
        },
      ],
      audience: 'Junior to intermediate developers, career changers, internal teams upskilling on the React/Java stack.',
      prerequisites: 'Programming basics (variables, functions, loops) and web notions (HTML/CSS). First experience with an object-oriented language is a plus.',
      seo: {
        metaTitle: 'Full-stack React & Spring Boot training',
        metaDescription:
          'Intensive full-stack training in Morocco: React, TypeScript, Spring Boot, OWASP security and deployment. By Oracle-certified developers.',
      },
    },
  },

  {
    key: 'cyberops',
    category: 'cybersecurite',
    modalities: ['presentiel', 'intra'],
    fr: {
      title: 'Cybersécurité opérationnelle : surveiller, détecter, répondre',
      slug: FORMATION_SLUGS.cyberops.fr,
      summary:
        'Les fondamentaux d’un analyste SOC dans l’esprit Cisco CyberOps : comprendre les attaques, surveiller un SI, détecter les intrusions et conduire la réponse à incident.',
      duration: '5 jours (35 h)',
      objectives: [
        'Comprendre les principales techniques d’attaque et leurs traces',
        'Mettre en place une surveillance efficace (journaux, alertes)',
        'Qualifier un incident de sécurité et prioriser la réponse',
        'Conduire les premiers gestes de réponse à incident',
        'Préparer les bases de la certification Cisco CyberOps Associate',
      ],
      program: [
        {
          title: 'Panorama de la menace',
          items: 'Acteurs, motivations et chaînes d’attaque\nVecteurs courants : phishing, rançongiciels, web\nAnatomie d’une compromission',
        },
        {
          title: 'Surveillance du SI',
          items: 'Sources de journaux et centralisation\nIndicateurs de compromission\nOutils de supervision de sécurité',
        },
        {
          title: 'Détection d’intrusion',
          items: 'Analyse de trafic réseau\nDétection sur les postes et serveurs\nRéduction des faux positifs',
        },
        {
          title: 'Réponse à incident',
          items: 'Qualification et priorisation\nConfinement, éradication, rétablissement\nCommunication et retour d’expérience',
        },
        {
          title: 'Mise en pratique',
          items: 'Scénarios d’incident guidés\nExercice de bout en bout en équipe\nPlan de progression vers la certification',
        },
      ],
      audience: 'Administrateurs systèmes/réseaux, techniciens support évoluant vers la sécurité, futurs analystes SOC, DSI de PME.',
      prerequisites: 'Bonnes bases réseaux (TCP/IP) et systèmes (Windows/Linux). Aucune expérience sécurité préalable exigée.',
      seo: {
        metaTitle: 'Formation cybersécurité opérationnelle (SOC)',
        metaDescription:
          'Devenez opérationnel en détection et réponse à incident : surveillance, analyse, confinement. Formation au Maroc par des consultants certifiés Cisco.',
      },
    },
    ar: {
      title: 'الأمن السيبراني التشغيلي: المراقبة والرصد والاستجابة',
      slug: FORMATION_SLUGS.cyberops.ar,
      summary:
        'أساسيات محلل مركز عمليات الأمن (SOC) على نهج Cisco CyberOps: فهم الهجمات، مراقبة النظام المعلوماتي، رصد التسللات وقيادة الاستجابة للحوادث.',
      duration: '5 أيام (35 ساعة)',
      objectives: [
        'فهم أهم تقنيات الهجوم وآثارها',
        'إرساء مراقبة فعالة (السجلات، التنبيهات)',
        'توصيف الحادث الأمني وترتيب أولويات الاستجابة',
        'تنفيذ الإجراءات الأولى للاستجابة للحوادث',
        'التهيؤ لأساسيات شهادة Cisco CyberOps Associate',
      ],
      program: [
        {
          title: 'مشهد التهديدات',
          items: 'الفاعلون والدوافع وسلاسل الهجوم\nالمنافذ الشائعة: التصيد، برمجيات الفدية، الويب\nتشريح اختراق نموذجي',
        },
        {
          title: 'مراقبة النظام المعلوماتي',
          items: 'مصادر السجلات وتجميعها\nمؤشرات الاختراق\nأدوات الإشراف الأمني',
        },
        {
          title: 'رصد التسللات',
          items: 'تحليل حركة الشبكة\nالرصد على المحطات والخوادم\nتقليص الإنذارات الكاذبة',
        },
        {
          title: 'الاستجابة للحوادث',
          items: 'التوصيف وترتيب الأولويات\nالاحتواء والاستئصال والاسترجاع\nالتواصل واستخلاص الدروس',
        },
        {
          title: 'تطبيق عملي',
          items: 'سيناريوهات حوادث موجهة\nتمرين جماعي من البداية للنهاية\nخطة التقدم نحو الشهادة',
        },
      ],
      audience: 'مديرو الأنظمة والشبكات، تقنيو الدعم المتجهون نحو الأمن، محللو SOC المستقبليون، ومسؤولو المعلوميات في المقاولات.',
      prerequisites: 'أساسيات جيدة في الشبكات (TCP/IP) والأنظمة (Windows/Linux). لا تُشترط تجربة أمنية سابقة.',
      seo: {
        metaTitle: 'تكوين الأمن السيبراني التشغيلي (SOC)',
        metaDescription:
          'كونوا جاهزين لرصد الحوادث والاستجابة لها: المراقبة والتحليل والاحتواء. تكوين بالمغرب يؤطره مستشارون معتمدون من Cisco.',
      },
    },
    en: {
      title: 'Operational cybersecurity: monitor, detect, respond',
      slug: FORMATION_SLUGS.cyberops.en,
      summary:
        'The fundamentals of a SOC analyst in the Cisco CyberOps spirit: understanding attacks, monitoring an IT estate, detecting intrusions and driving incident response.',
      duration: '5 days (35 h)',
      objectives: [
        'Understand the main attack techniques and their traces',
        'Set up effective monitoring (logs, alerts)',
        'Qualify a security incident and prioritize the response',
        'Carry out first incident-response actions',
        'Prepare the foundations of the Cisco CyberOps Associate certification',
      ],
      program: [
        {
          title: 'Threat landscape',
          items: 'Actors, motivations and attack chains\nCommon vectors: phishing, ransomware, web\nAnatomy of a compromise',
        },
        {
          title: 'Monitoring the estate',
          items: 'Log sources and centralization\nIndicators of compromise\nSecurity monitoring tools',
        },
        {
          title: 'Intrusion detection',
          items: 'Network traffic analysis\nEndpoint and server detection\nReducing false positives',
        },
        {
          title: 'Incident response',
          items: 'Qualification and prioritization\nContainment, eradication, recovery\nCommunication and lessons learned',
        },
        {
          title: 'Hands-on practice',
          items: 'Guided incident scenarios\nEnd-to-end team exercise\nProgression plan towards certification',
        },
      ],
      audience: 'System/network administrators, support technicians moving into security, future SOC analysts, SME IT managers.',
      prerequisites: 'Solid networking (TCP/IP) and systems (Windows/Linux) basics. No prior security experience required.',
      seo: {
        metaTitle: 'Operational cybersecurity (SOC) training',
        metaDescription:
          'Become operational in detection and incident response: monitoring, analysis, containment. Training in Morocco by Cisco-certified consultants.',
      },
    },
  },

  {
    key: 'cloud',
    category: 'cloud',
    modalities: ['presentiel', 'distanciel', 'intra'],
    fr: {
      title: 'Cloud AWS, Azure & OCI : concevoir et opérer',
      slug: FORMATION_SLUGS.cloud.fr,
      summary:
        'Comprendre les trois grands clouds, choisir les bons services et opérer des architectures sécurisées et maîtrisées en coûts — avec des ateliers sur les trois plateformes.',
      duration: '5 jours (35 h)',
      objectives: [
        'Comparer les modèles et services AWS, Azure et OCI',
        'Concevoir une architecture cloud sécurisée et résiliente',
        'Maîtriser identité, réseau et stockage dans le cloud',
        'Contrôler et optimiser les coûts',
        'Préparer les certifications fondamentales des trois fournisseurs',
      ],
      program: [
        {
          title: 'Fondamentaux du cloud',
          items: 'Modèles IaaS/PaaS/SaaS et responsabilité partagée\nRégions, zones et haute disponibilité\nPanorama AWS / Azure / OCI',
        },
        {
          title: 'Identité et sécurité',
          items: 'IAM : utilisateurs, rôles, politiques\nChiffrement au repos et en transit\nBonnes pratiques de durcissement',
        },
        {
          title: 'Réseau et calcul',
          items: 'Réseaux virtuels et segmentation\nMachines virtuelles et conteneurs\nÉquilibrage de charge et autoscaling',
        },
        {
          title: 'Données et stockage',
          items: 'Stockage objet, bloc et fichiers\nBases managées\nSauvegarde et reprise d’activité',
        },
        {
          title: 'Coûts et exploitation',
          items: 'Modèles de facturation et budgets\nSupervision et alertes\nAtelier : déployer la même app sur 2 clouds',
        },
      ],
      audience: 'Administrateurs systèmes, développeurs, architectes juniors, DSI souhaitant objectiver leurs choix cloud.',
      prerequisites: 'Bases d’administration système et de réseau. Aucune expérience cloud préalable exigée.',
      seo: {
        metaTitle: 'Formation cloud AWS, Azure & OCI',
        metaDescription:
          'Formation cloud multi-fournisseurs au Maroc : architecture, sécurité, coûts. Ateliers pratiques AWS, Azure et OCI par des consultants certifiés.',
      },
    },
    ar: {
      title: 'الحوسبة السحابية AWS و Azure و OCI: التصميم والتشغيل',
      slug: FORMATION_SLUGS.cloud.ar,
      summary:
        'فهم السحابات الثلاث الكبرى، واختيار الخدمات المناسبة، وتشغيل بنيات آمنة ومحكومة التكلفة — مع ورشات تطبيقية على المنصات الثلاث.',
      duration: '5 أيام (35 ساعة)',
      objectives: [
        'مقارنة نماذج وخدمات AWS و Azure و OCI',
        'تصميم بنية سحابية آمنة ومرنة',
        'التمكن من الهوية والشبكة والتخزين في السحابة',
        'ضبط التكاليف وترشيدها',
        'التهيؤ للشهادات الأساسية لدى المزودين الثلاثة',
      ],
      program: [
        {
          title: 'أساسيات السحابة',
          items: 'نماذج IaaS/PaaS/SaaS والمسؤولية المشتركة\nالمناطق والنطاقات والتوفر العالي\nجولة في AWS / Azure / OCI',
        },
        {
          title: 'الهوية والأمن',
          items: 'إدارة الهوية: المستخدمون والأدوار والسياسات\nالتشفير أثناء التخزين والنقل\nممارسات التحصين الجيدة',
        },
        {
          title: 'الشبكة والحوسبة',
          items: 'الشبكات الافتراضية والتقسيم\nالآلات الافتراضية والحاويات\nموازنة الحمل والتوسع التلقائي',
        },
        {
          title: 'البيانات والتخزين',
          items: 'تخزين الكائنات والكتل والملفات\nقواعد البيانات المدارة\nالنسخ الاحتياطي واستمرارية النشاط',
        },
        {
          title: 'التكاليف والتشغيل',
          items: 'نماذج الفوترة والميزانيات\nالمراقبة والتنبيهات\nورشة: نشر التطبيق نفسه على سحابتين',
        },
      ],
      audience: 'مديرو الأنظمة، المطورون، المهندسون المعماريون المبتدئون، ومسؤولو المعلوميات الراغبون في تأصيل اختياراتهم السحابية.',
      prerequisites: 'أساسيات إدارة الأنظمة والشبكات. لا تُشترط تجربة سحابية سابقة.',
      seo: {
        metaTitle: 'تكوين الحوسبة السحابية AWS و Azure و OCI',
        metaDescription:
          'تكوين سحابي متعدد المزودين بالمغرب: البنية والأمن والتكاليف. ورشات تطبيقية على AWS و Azure و OCI يؤطرها مستشارون معتمدون.',
      },
    },
    en: {
      title: 'AWS, Azure & OCI cloud: design and operate',
      slug: FORMATION_SLUGS.cloud.en,
      summary:
        'Understand the three major clouds, choose the right services and operate secure, cost-controlled architectures — with hands-on labs on all three platforms.',
      duration: '5 days (35 h)',
      objectives: [
        'Compare AWS, Azure and OCI models and services',
        'Design a secure, resilient cloud architecture',
        'Master identity, networking and storage in the cloud',
        'Control and optimize costs',
        'Prepare the foundational certifications of all three providers',
      ],
      program: [
        {
          title: 'Cloud fundamentals',
          items: 'IaaS/PaaS/SaaS models and shared responsibility\nRegions, zones and high availability\nAWS / Azure / OCI overview',
        },
        {
          title: 'Identity and security',
          items: 'IAM: users, roles, policies\nEncryption at rest and in transit\nHardening good practices',
        },
        {
          title: 'Networking and compute',
          items: 'Virtual networks and segmentation\nVirtual machines and containers\nLoad balancing and autoscaling',
        },
        {
          title: 'Data and storage',
          items: 'Object, block and file storage\nManaged databases\nBackup and disaster recovery',
        },
        {
          title: 'Costs and operations',
          items: 'Billing models and budgets\nMonitoring and alerts\nLab: deploy the same app on two clouds',
        },
      ],
      audience: 'System administrators, developers, junior architects, IT managers wanting to ground their cloud choices.',
      prerequisites: 'System and network administration basics. No prior cloud experience required.',
      seo: {
        metaTitle: 'AWS, Azure & OCI cloud training',
        metaDescription:
          'Multi-provider cloud training in Morocco: architecture, security, costs. Hands-on AWS, Azure and OCI labs by certified consultants.',
      },
    },
  },

  {
    key: 'devops',
    category: 'devops',
    modalities: ['presentiel', 'distanciel', 'intra'],
    fr: {
      title: 'DevOps : Kubernetes & Terraform en pratique',
      slug: FORMATION_SLUGS.devops.fr,
      summary:
        'Conteneuriser, orchestrer et automatiser : Kubernetes et Terraform par la pratique, dans l’esprit des certifications CKAD et Terraform Associate que détiennent nos formateurs.',
      duration: '5 jours (35 h)',
      objectives: [
        'Conteneuriser une application et gérer ses images',
        'Déployer et exposer des applications sur Kubernetes',
        'Décrire l’infrastructure en code avec Terraform',
        'Mettre en place un pipeline CI/CD complet',
        'Préparer les certifications CKAD et Terraform Associate (003)',
      ],
      program: [
        {
          title: 'Conteneurs',
          items: 'Images, registres et bonnes pratiques\nRéseaux et volumes\nDébogage de conteneurs',
        },
        {
          title: 'Kubernetes — cœur',
          items: 'Pods, deployments, services\nConfigMaps et secrets\nProbes, ressources et autoscaling',
        },
        {
          title: 'Kubernetes — exploitation',
          items: 'Ingress et exposition\nJournaux et supervision\nStratégies de mise à jour',
        },
        {
          title: 'Terraform',
          items: 'Providers, ressources, état\nModules et composition\nWorkspaces et bonnes pratiques d’équipe',
        },
        {
          title: 'Chaîne CI/CD',
          items: 'Pipeline build-test-deploy\nIntégration Kubernetes + Terraform\nProjet fil rouge de bout en bout',
        },
      ],
      audience: 'Développeurs, administrateurs systèmes, ingénieurs plateformes, équipes ops en transition DevOps.',
      prerequisites: 'À l’aise avec la ligne de commande Linux et les concepts de base du déploiement applicatif.',
      seo: {
        metaTitle: 'Formation DevOps Kubernetes & Terraform',
        metaDescription:
          'Kubernetes et Terraform par la pratique au Maroc : conteneurs, orchestration, infrastructure-as-code, CI/CD. Préparation CKAD et Terraform Associate.',
      },
    },
    ar: {
      title: 'ديف أوبس: Kubernetes و Terraform بالممارسة',
      slug: FORMATION_SLUGS.devops.ar,
      summary:
        'الحاويات والتنسيق والأتمتة: Kubernetes و Terraform بالتطبيق العملي، على نهج شهادتي CKAD و Terraform Associate اللتين يحملهما مؤطرونا.',
      duration: '5 أيام (35 ساعة)',
      objectives: [
        'وضع تطبيق في حاويات وإدارة صوره',
        'نشر التطبيقات وإتاحتها على Kubernetes',
        'وصف البنية التحتية بشيفرة عبر Terraform',
        'إرساء سلسلة CI/CD كاملة',
        'التهيؤ لشهادتي CKAD و Terraform Associate (003)',
      ],
      program: [
        {
          title: 'الحاويات',
          items: 'الصور والمستودعات والممارسات الجيدة\nالشبكات والأحجام\nتصحيح أعطاب الحاويات',
        },
        {
          title: 'Kubernetes — الأساس',
          items: 'Pods و Deployments و Services\nConfigMaps والأسرار\nالمجسات والموارد والتوسع التلقائي',
        },
        {
          title: 'Kubernetes — التشغيل',
          items: 'Ingress والإتاحة الخارجية\nالسجلات والمراقبة\nاستراتيجيات التحديث',
        },
        {
          title: 'Terraform',
          items: 'المزودون والموارد والحالة\nالوحدات والتركيب\nمساحات العمل وممارسات الفريق',
        },
        {
          title: 'سلسلة CI/CD',
          items: 'أنبوب بناء-اختبار-نشر\nدمج Kubernetes و Terraform\nمشروع تطبيقي متكامل',
        },
      ],
      audience: 'المطورون، مديرو الأنظمة، مهندسو المنصات، وفرق التشغيل المتحولة نحو ديف أوبس.',
      prerequisites: 'ارتياح في سطر أوامر لينكس ومفاهيم النشر الأساسية.',
      seo: {
        metaTitle: 'تكوين ديف أوبس Kubernetes و Terraform',
        metaDescription:
          'Kubernetes و Terraform بالممارسة في المغرب: الحاويات والتنسيق والبنية-كشيفرة و CI/CD. تحضير لشهادتي CKAD و Terraform Associate.',
      },
    },
    en: {
      title: 'DevOps: Kubernetes & Terraform in practice',
      slug: FORMATION_SLUGS.devops.en,
      summary:
        'Containerize, orchestrate and automate: hands-on Kubernetes and Terraform, in the spirit of the CKAD and Terraform Associate certifications our trainers hold.',
      duration: '5 days (35 h)',
      objectives: [
        'Containerize an application and manage its images',
        'Deploy and expose applications on Kubernetes',
        'Describe infrastructure as code with Terraform',
        'Build a complete CI/CD pipeline',
        'Prepare the CKAD and Terraform Associate (003) certifications',
      ],
      program: [
        {
          title: 'Containers',
          items: 'Images, registries and good practices\nNetworking and volumes\nDebugging containers',
        },
        {
          title: 'Kubernetes — core',
          items: 'Pods, deployments, services\nConfigMaps and secrets\nProbes, resources and autoscaling',
        },
        {
          title: 'Kubernetes — operations',
          items: 'Ingress and exposure\nLogs and monitoring\nUpdate strategies',
        },
        {
          title: 'Terraform',
          items: 'Providers, resources, state\nModules and composition\nWorkspaces and team practices',
        },
        {
          title: 'CI/CD pipeline',
          items: 'Build-test-deploy pipeline\nKubernetes + Terraform integration\nEnd-to-end capstone project',
        },
      ],
      audience: 'Developers, system administrators, platform engineers, ops teams transitioning to DevOps.',
      prerequisites: 'Comfortable with the Linux command line and basic application deployment concepts.',
      seo: {
        metaTitle: 'DevOps Kubernetes & Terraform training',
        metaDescription:
          'Hands-on Kubernetes and Terraform in Morocco: containers, orchestration, infrastructure-as-code, CI/CD. CKAD and Terraform Associate preparation.',
      },
    },
  },

  {
    key: 'agile',
    category: 'agile',
    modalities: ['presentiel', 'distanciel', 'intra'],
    fr: {
      title: 'Gestion de projet agile : Scrum & SAFe',
      slug: FORMATION_SLUGS.agile.fr,
      summary:
        'Piloter un produit en Scrum et passer à l’échelle avec SAFe : rôles, rituels, backlog, métriques — animé par des praticiens certifiés PSM et SAFe 5.',
      duration: '3 jours (21 h)',
      objectives: [
        'Maîtriser le cadre Scrum : rôles, événements, artefacts',
        'Construire et prioriser un backlog produit',
        'Piloter par les métriques agiles (vélocité, burndown)',
        'Comprendre la coordination multi-équipes avec SAFe',
        'Préparer la certification PSM I',
      ],
      program: [
        {
          title: 'Fondamentaux agiles',
          items: 'Valeurs et principes\nScrum vs kanban vs cycle en V\nQuand l’agilité est (ou n’est pas) adaptée',
        },
        {
          title: 'Scrum en profondeur',
          items: 'Rôles : PO, SM, développeurs\nSprint, daily, revue, rétrospective\nDefinition of Done et qualité',
        },
        {
          title: 'Backlog et priorisation',
          items: 'User stories et critères d’acceptation\nEstimation et planification\nTechniques de priorisation',
        },
        {
          title: 'Passage à l’échelle : SAFe',
          items: 'Trains de release (ART) et PI planning\nRôles à l’échelle\nQuand envisager SAFe',
        },
        {
          title: 'Certification et cas réels',
          items: 'Examen blanc PSM I\nÉtudes de cas issues de nos missions\nPlan d’action personnel',
        },
      ],
      audience: 'Chefs de projet, futurs Scrum Masters et Product Owners, managers IT, équipes en transformation agile.',
      prerequisites: 'Aucune expérience agile exigée ; une première expérience de projet est un plus.',
      seo: {
        metaTitle: 'Formation agile Scrum & SAFe (prépa PSM)',
        metaDescription:
          'Formation Scrum et SAFe au Maroc par des praticiens certifiés PSM/SAFe 5 : rôles, rituels, backlog, métriques et préparation PSM I.',
      },
    },
    ar: {
      title: 'إدارة المشاريع الرشيقة: سكروم و SAFe',
      slug: FORMATION_SLUGS.agile.ar,
      summary:
        'قيادة منتج بإطار سكروم والتوسع عبر SAFe: الأدوار والطقوس وقائمة المهام والمؤشرات — يؤطره ممارسون معتمدون PSM و SAFe 5.',
      duration: '3 أيام (21 ساعة)',
      objectives: [
        'التمكن من إطار سكروم: الأدوار والفعاليات والمخرجات',
        'بناء قائمة مهام المنتج وترتيب أولوياتها',
        'القيادة بالمؤشرات الرشيقة (السرعة، منحنى الإنجاز)',
        'فهم تنسيق الفرق المتعددة عبر SAFe',
        'التهيؤ لشهادة PSM I',
      ],
      program: [
        {
          title: 'أساسيات الرشاقة',
          items: 'القيم والمبادئ\nسكروم مقابل كانبان مقابل الدورة التقليدية\nمتى تناسب الرشاقة (ومتى لا)',
        },
        {
          title: 'سكروم بعمق',
          items: 'الأدوار: مالك المنتج، سكروم ماستر، المطورون\nالسبرينت والاجتماع اليومي والعرض والاسترجاع\nتعريف الاكتمال والجودة',
        },
        {
          title: 'قائمة المهام والأولويات',
          items: 'قصص المستخدم ومعايير القبول\nالتقدير والتخطيط\nتقنيات ترتيب الأولويات',
        },
        {
          title: 'التوسع: SAFe',
          items: 'قطارات الإصدار والتخطيط الفصلي\nالأدوار على نطاق واسع\nمتى يُعتمد SAFe',
        },
        {
          title: 'الشهادة وحالات واقعية',
          items: 'امتحان تجريبي PSM I\nدراسات حالة من مهماتنا\nخطة عمل شخصية',
        },
      ],
      audience: 'مديرو المشاريع، سكروم ماسترز ومالكو المنتج المستقبليون، مديرو المعلوميات، والفرق في تحول رشيق.',
      prerequisites: 'لا تُشترط تجربة رشيقة سابقة؛ تجربة أولى في تدبير المشاريع ميزة إضافية.',
      seo: {
        metaTitle: 'تكوين أجايل سكروم و SAFe (تحضير PSM)',
        metaDescription:
          'تكوين سكروم و SAFe بالمغرب يؤطره ممارسون معتمدون PSM/SAFe 5: الأدوار والطقوس وقائمة المهام والمؤشرات والتحضير لـ PSM I.',
      },
    },
    en: {
      title: 'Agile project management: Scrum & SAFe',
      slug: FORMATION_SLUGS.agile.en,
      summary:
        'Run a product with Scrum and scale with SAFe: roles, rituals, backlog, metrics — delivered by PSM and SAFe 5 certified practitioners.',
      duration: '3 days (21 h)',
      objectives: [
        'Master the Scrum framework: roles, events, artifacts',
        'Build and prioritize a product backlog',
        'Steer with agile metrics (velocity, burndown)',
        'Understand multi-team coordination with SAFe',
        'Prepare the PSM I certification',
      ],
      program: [
        {
          title: 'Agile foundations',
          items: 'Values and principles\nScrum vs kanban vs waterfall\nWhen agility fits (and when it does not)',
        },
        {
          title: 'Scrum in depth',
          items: 'Roles: PO, SM, developers\nSprint, daily, review, retrospective\nDefinition of Done and quality',
        },
        {
          title: 'Backlog and prioritization',
          items: 'User stories and acceptance criteria\nEstimation and planning\nPrioritization techniques',
        },
        {
          title: 'Scaling: SAFe',
          items: 'Release trains (ART) and PI planning\nRoles at scale\nWhen to consider SAFe',
        },
        {
          title: 'Certification and real cases',
          items: 'PSM I mock exam\nCase studies from our engagements\nPersonal action plan',
        },
      ],
      audience: 'Project managers, future Scrum Masters and Product Owners, IT managers, teams in agile transformation.',
      prerequisites: 'No prior agile experience required; first project experience is a plus.',
      seo: {
        metaTitle: 'Agile Scrum & SAFe training (PSM prep)',
        metaDescription:
          'Scrum and SAFe training in Morocco by PSM/SAFe 5 certified practitioners: roles, rituals, backlog, metrics and PSM I preparation.',
      },
    },
  },

  {
    key: 'bureautique',
    category: 'bureautique',
    modalities: ['presentiel', 'intra'],
    fr: {
      title: 'Bureautique & digitalisation des services',
      slug: FORMATION_SLUGS.bureautique.fr,
      summary:
        'Rendre les équipes administratives autonomes et efficaces : traitement de texte, tableur, présentations, collaboration en ligne et premiers réflexes de dématérialisation.',
      duration: '4 jours (28 h)',
      objectives: [
        'Produire des documents administratifs professionnels et normalisés',
        'Exploiter un tableur : formules, tableaux croisés, graphiques',
        'Construire des présentations claires et convaincantes',
        'Collaborer efficacement en ligne (documents partagés, visioconférence)',
        'Adopter les bons réflexes de dématérialisation et de sécurité',
      ],
      program: [
        {
          title: 'Documents professionnels',
          items: 'Modèles et styles\nCourriers, rapports et publipostage\nPDF et signature de documents',
        },
        {
          title: 'Tableur — du calcul à l’analyse',
          items: 'Formules et fonctions essentielles\nMise en forme et validation de données\nTableaux croisés dynamiques et graphiques',
        },
        {
          title: 'Présentations',
          items: 'Structurer un message\nSupports visuels lisibles\nPrésenter à l’oral avec aisance',
        },
        {
          title: 'Collaboration et dématérialisation',
          items: 'Documents partagés et co-édition\nMessagerie et visioconférence efficaces\nClassement numérique et sauvegarde\nHygiène numérique : mots de passe, hameçonnage',
        },
      ],
      audience: 'Agents administratifs, assistants de direction, personnels des administrations et collectivités en cours de digitalisation.',
      prerequisites: 'Usage basique d’un ordinateur. Aucun niveau bureautique préalable exigé.',
      seo: {
        metaTitle: 'Formation bureautique & digitalisation',
        metaDescription:
          'Formation bureautique pour administrations et entreprises au Maroc : documents, tableur, présentations, collaboration en ligne et dématérialisation.',
      },
    },
    ar: {
      title: 'المكتبيات ورقمنة المصالح الإدارية',
      slug: FORMATION_SLUGS.bureautique.ar,
      summary:
        'تمكين الفرق الإدارية من الاستقلالية والفعالية: معالجة النصوص، الجداول، العروض، العمل التشاركي عبر الإنترنت وأولى خطوات الرقمنة.',
      duration: '4 أيام (28 ساعة)',
      objectives: [
        'إنتاج وثائق إدارية مهنية وموحدة',
        'استغلال الجداول: الصيغ والجداول المحورية والرسوم',
        'بناء عروض واضحة ومقنعة',
        'التعاون الفعال عبر الإنترنت (وثائق مشتركة، اجتماعات مرئية)',
        'اكتساب أسس الرقمنة والسلامة الرقمية',
      ],
      program: [
        {
          title: 'الوثائق المهنية',
          items: 'النماذج والأنماط\nالمراسلات والتقارير والدمج البريدي\nملفات PDF وتوقيع الوثائق',
        },
        {
          title: 'الجداول — من الحساب إلى التحليل',
          items: 'الصيغ والدوال الأساسية\nالتنسيق والتحقق من البيانات\nالجداول المحورية والرسوم البيانية',
        },
        {
          title: 'العروض التقديمية',
          items: 'هيكلة الرسالة\nدعامات بصرية مقروءة\nالإلقاء الشفوي بثقة',
        },
        {
          title: 'التعاون والرقمنة',
          items: 'الوثائق المشتركة والتحرير التشاركي\nالمراسلة والاجتماعات المرئية الفعالة\nالترتيب الرقمي والنسخ الاحتياطي\nالنظافة الرقمية: كلمات السر والتصيد',
        },
      ],
      audience: 'الموظفون الإداريون، مساعدو الإدارة، والعاملون بالإدارات والجماعات في مسار الرقمنة.',
      prerequisites: 'استعمال أساسي للحاسوب. لا يُشترط مستوى مسبق في المكتبيات.',
      seo: {
        metaTitle: 'تكوين المكتبيات والرقمنة',
        metaDescription:
          'تكوين في المكتبيات للإدارات والمقاولات بالمغرب: الوثائق والجداول والعروض والعمل التشاركي عبر الإنترنت والرقمنة.',
      },
    },
    en: {
      title: 'Office tools & service digitalization',
      slug: FORMATION_SLUGS.bureautique.en,
      summary:
        'Make administrative teams autonomous and effective: word processing, spreadsheets, presentations, online collaboration and first digitalization reflexes.',
      duration: '4 days (28 h)',
      objectives: [
        'Produce professional, standardized administrative documents',
        'Use spreadsheets: formulas, pivot tables, charts',
        'Build clear, convincing presentations',
        'Collaborate effectively online (shared documents, video meetings)',
        'Adopt sound digitalization and security reflexes',
      ],
      program: [
        {
          title: 'Professional documents',
          items: 'Templates and styles\nLetters, reports and mail merge\nPDFs and document signing',
        },
        {
          title: 'Spreadsheets — from calculation to analysis',
          items: 'Essential formulas and functions\nFormatting and data validation\nPivot tables and charts',
        },
        {
          title: 'Presentations',
          items: 'Structuring a message\nReadable visual supports\nPresenting with confidence',
        },
        {
          title: 'Collaboration and digitalization',
          items: 'Shared documents and co-editing\nEffective email and video meetings\nDigital filing and backup\nDigital hygiene: passwords, phishing',
        },
      ],
      audience: 'Administrative staff, executive assistants, personnel of administrations and local authorities undergoing digitalization.',
      prerequisites: 'Basic computer use. No prior office-tools level required.',
      seo: {
        metaTitle: 'Office tools & digitalization training',
        metaDescription:
          'Office-tools training for administrations and companies in Morocco: documents, spreadsheets, presentations, online collaboration and digitalization.',
      },
    },
  },
];
