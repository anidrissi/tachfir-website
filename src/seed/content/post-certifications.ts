import { POST_SLUGS } from '@/config/editorial';
import { b, doc, h2, p, ul } from '../lexical';

/**
 * Article 3 — Les certifications IT les plus demandées au Maroc
 * (catégorie formation).
 */
export const postCertifications = {
  category: 'formation' as const,
  publishedAt: '2026-07-08T09:00:00.000Z',
  cover: 'certification' as const,
  coverAlts: {
    ar: 'رسم توضيحي: شارة اعتماد مهني في المعلوميات',
    fr: 'Illustration : badge de certification professionnelle IT',
    en: 'Illustration: professional IT certification badge',
  },

  ar: {
    title: 'أهم الشهادات المعلوماتية المطلوبة في المغرب',
    slug: POST_SLUGS.certifications.ar,
    excerpt:
      'السحابة، ديف أوبس، الشبكات، الأمن السيبراني وأجايل: جولة في الشهادات التي يبحث عنها سوق الشغل المغربي فعلاً، وكيف تختارون مساركم.',
    seo: {
      metaTitle: 'أهم الشهادات المعلوماتية بالمغرب',
      metaDescription:
        'أي شهادة معلوماتية تختار في المغرب؟ السحابة وديف أوبس والشبكات والأمن وأجايل: قراءة عملية في طلب السوق ونصائح لاختيار المسار.',
    },
    content: doc(
      p(
        'في سوق شغل معلوماتي يزداد تنافسية، لم تعد السيرة الذاتية وحدها كافية. فالمشغلون المغاربة — من شركات الخدمات الرقمية إلى الإدارات — يبحثون عن أدلة قابلة للتحقق على الكفاءة. وهنا يأتي دور الشهادات المهنية: إطار موحد، امتحان مستقل، وصلاحية محددة في الزمن.',
      ),
      p(
        'بناءً على ما نلاحظه في مشاريعنا وفي متطلبات طلبات العروض، هذه هي العائلات الأكثر طلباً بالمغرب.',
      ),
      h2('السحابة: AWS وAzure وOCI'),
      p(
        'مع تسارع تبني الحوسبة السحابية لدى المقاولات المغربية، أصبحت شهادات المزودين الثلاثة الكبار الأكثر ظهوراً في عروض التوظيف: مستويات Associate لدى AWS، وشهادات Azure Administrator/Developer لدى مايكروسوفت، وشهادات Oracle Cloud Infrastructure (بما فيها مساراتها الحديثة في الذكاء الاصطناعي والذكاء الاصطناعي التوليدي). قيمتها الحقيقية: إثبات القدرة على تصميم بنيات سحابية آمنة ومحكومة التكلفة.',
      ),
      h2('ديف أوبس والحاويات: CKAD وTerraform'),
      p(
        'أصبح النشر الآلي والبنية-كشيفرة معياراً في المشاريع الجادة. شهادة CKAD (مطور تطبيقات Kubernetes المعتمد) تثبت إتقان نشر التطبيقات على أشهر منصات التنسيق، فيما تؤكد شهادة HashiCorp Terraform Associate القدرة على وصف البنية التحتية بشيفرة قابلة للمراجعة والتكرار. كلتاهما عمليتان بامتياز: امتحانات قائمة على مهام حقيقية لا على الحفظ.',
      ),
      h2('الشبكات والأمن السيبراني: CCNA وCyberOps'),
      p(
        'تبقى CCNA من سيسكو المرجع الأول في أساسيات الشبكات (توجيه، تبديل، لاسلكي)، وهي غالباً شرط ضمني في مناصب البنية التحتية. أما Cisco CyberOps Associate فتفتح باب مراكز عمليات الأمن (SOC): مراقبة، رصد التسللات، والاستجابة للحوادث — مجال يتوسع بسرعة مع تزايد التهديدات على المؤسسات المغربية.',
      ),
      h2('المنهجيات: PSM وSAFe'),
      p(
        'لم تعد الشهادات حكراً على التقنيين: فمديرو المشاريع وسكروم ماسترز مطالبون بدورهم بإثبات إلمامهم بالأطر الرشيقة. شهادة Professional Scrum Master (PSM) تثبت فهماً دقيقاً لإطار سكروم، فيما تستهدف SAFe المنظمات الكبيرة التي تنسق عدة فرق متوازية — وهي حالة شائعة لدى المشغلين الكبار وشركات الخدمات بالمغرب.',
      ),
      h2('التطوير: Java من Oracle'),
      p(
        'ما تزال Java العمود الفقري للأنظمة المعلوماتية في البنوك والتأمين والإدارة المغربية. شهادتا Oracle Certified Professional Java وOracle Certified Expert Java EE تميزان المطور الذي يتقن اللغة ومنصتها المؤسساتية عن مجرد المستعمل العابر لها.',
      ),
      h2('كيف تختارون مساركم؟'),
      ul([
        'انطلقوا من هدف مهني، لا من موضة: منصب مستهدف ثم الشهادة التي تسنده.',
        'رتبوا الأساسيات أولاً: شبكات أو برمجة قبل التخصصات الدقيقة.',
        'اختاروا تكويناً يجمع التحضير للشهادة والتطبيق العملي على حالات حقيقية.',
        'خططوا للتجديد: أغلب الشهادات تُجدَّد كل سنتين إلى ثلاث سنوات.',
      ]),
      p(
        b('وأخيراً: '),
        'الشهادة لا تعوض الخبرة، لكنها تجعلها مرئية وقابلة للمقارنة. في تشفير، يحمل مستشارونا هذه الشهادات نفسها ويؤطرون تكوينات تحضيرية لها — اطلعوا على كتالوج تكويناتنا أو اطلبوا مساراً مخصصاً لفريقكم.',
      ),
    ),
  },

  fr: {
    title: 'Les certifications IT les plus demandées au Maroc',
    slug: POST_SLUGS.certifications.fr,
    excerpt:
      'Cloud, DevOps, réseaux, cybersécurité, agilité : tour d’horizon des certifications que le marché marocain demande vraiment — et comment choisir votre parcours.',
    seo: {
      metaTitle: 'Certifications IT les plus demandées au Maroc',
      metaDescription:
        'Quelle certification IT viser au Maroc ? Cloud, DevOps, réseaux, sécurité, agile : lecture concrète de la demande du marché et conseils pour choisir.',
    },
    content: doc(
      p(
        'Sur un marché de l’emploi IT de plus en plus concurrentiel, le CV seul ne suffit plus. Les employeurs marocains — des ESN aux administrations — cherchent des preuves vérifiables de compétence. C’est précisément le rôle des certifications professionnelles : un référentiel commun, un examen indépendant, une validité dans le temps.',
      ),
      p(
        'Sur la base de ce que nous observons dans nos projets et dans les exigences des appels d’offres, voici les familles les plus demandées au Maroc.',
      ),
      h2('Cloud : AWS, Azure, OCI'),
      p(
        'Avec l’accélération de l’adoption du cloud par les entreprises marocaines, les certifications des trois grands fournisseurs dominent les offres d’emploi : les niveaux Associate chez AWS, les parcours Azure Administrator/Developer chez Microsoft, et les certifications Oracle Cloud Infrastructure — y compris leurs déclinaisons récentes en intelligence artificielle et IA générative. Leur vraie valeur : prouver la capacité à concevoir des architectures cloud sécurisées et maîtrisées en coûts.',
      ),
      h2('DevOps et conteneurs : CKAD, Terraform'),
      p(
        'Déploiement automatisé et infrastructure-as-code sont devenus le standard des projets sérieux. La CKAD (Certified Kubernetes Application Developer) atteste la maîtrise du déploiement d’applications sur l’orchestrateur le plus répandu ; la HashiCorp Terraform Associate confirme la capacité à décrire l’infrastructure en code révisable et reproductible. Deux certifications éminemment pratiques : des examens fondés sur des tâches réelles, pas sur du par-cœur.',
      ),
      h2('Réseaux et cybersécurité : CCNA, CyberOps'),
      p(
        'La CCNA de Cisco reste la référence des fondamentaux réseau (routage, commutation, sans-fil), souvent prérequis implicite des postes d’infrastructure. La Cisco CyberOps Associate, elle, ouvre la porte des centres d’opérations de sécurité (SOC) : supervision, détection d’intrusion, réponse à incident — un domaine en forte croissance à mesure que les menaces sur les organisations marocaines augmentent.',
      ),
      h2('Méthodes : PSM, SAFe'),
      p(
        'Les certifications ne sont plus réservées aux profils techniques : chefs de projet et Scrum Masters doivent eux aussi prouver leur maîtrise des cadres agiles. La Professional Scrum Master (PSM) valide une compréhension rigoureuse de Scrum ; SAFe cible les organisations qui coordonnent plusieurs équipes en parallèle — un cas fréquent chez les grands comptes et les ESN au Maroc.',
      ),
      h2('Développement : Java par Oracle'),
      p(
        'Java reste l’épine dorsale des systèmes d’information de la banque, de l’assurance et de l’administration marocaines. Les certifications Oracle Certified Professional Java et Oracle Certified Expert Java EE distinguent le développeur qui maîtrise le langage et sa plateforme d’entreprise du simple utilisateur occasionnel.',
      ),
      h2('Comment choisir son parcours ?'),
      ul([
        'Partez d’un objectif métier, pas d’une mode : un poste visé, puis la certification qui le soutient.',
        'Priorisez les fondamentaux : réseaux ou programmation avant les spécialisations pointues.',
        'Choisissez une formation qui combine préparation à l’examen et pratique sur des cas réels.',
        'Anticipez le renouvellement : la plupart des certifications se renouvellent tous les deux à trois ans.',
      ]),
      p(
        b('Pour finir : '),
        'une certification ne remplace pas l’expérience — elle la rend visible et comparable. Chez Tachfir, nos consultants détiennent précisément ces certifications et animent des formations qui y préparent : parcourez notre catalogue ou demandez un parcours sur mesure pour votre équipe.',
      ),
    ),
  },

  en: {
    title: 'The most in-demand IT certifications in Morocco',
    slug: POST_SLUGS.certifications.en,
    excerpt:
      'Cloud, DevOps, networking, cybersecurity, agile: a tour of the certifications the Moroccan market actually asks for — and how to choose your path.',
    seo: {
      metaTitle: 'Most in-demand IT certifications in Morocco',
      metaDescription:
        'Which IT certification to aim for in Morocco? Cloud, DevOps, networking, security, agile: a concrete read of market demand and advice on choosing.',
    },
    content: doc(
      p(
        'In an increasingly competitive IT job market, a CV alone is no longer enough. Moroccan employers — from IT services firms to public administrations — look for verifiable proof of competence. That is exactly what professional certifications provide: a common framework, an independent exam, and time-bound validity.',
      ),
      p(
        'Based on what we see in our projects and in tender requirements, here are the certification families most in demand in Morocco.',
      ),
      h2('Cloud: AWS, Azure, OCI'),
      p(
        'As Moroccan companies accelerate cloud adoption, the certifications of the three major providers dominate job postings: AWS Associate levels, Microsoft’s Azure Administrator/Developer tracks, and Oracle Cloud Infrastructure certifications — including their recent AI and generative AI variants. Their real value: proving the ability to design secure, cost-controlled cloud architectures.',
      ),
      h2('DevOps and containers: CKAD, Terraform'),
      p(
        'Automated deployment and infrastructure-as-code have become the standard for serious projects. The CKAD (Certified Kubernetes Application Developer) attests to deploying applications on the most widespread orchestrator; the HashiCorp Terraform Associate confirms the ability to describe infrastructure as reviewable, reproducible code. Both are eminently practical: exams built on real tasks, not memorization.',
      ),
      h2('Networking and cybersecurity: CCNA, CyberOps'),
      p(
        'Cisco’s CCNA remains the reference for networking fundamentals (routing, switching, wireless), often an implicit prerequisite for infrastructure roles. Cisco CyberOps Associate opens the door to security operations centers (SOC): monitoring, intrusion detection, incident response — a fast-growing field as threats against Moroccan organizations increase.',
      ),
      h2('Methods: PSM, SAFe'),
      p(
        'Certifications are no longer reserved for technical profiles: project managers and Scrum Masters must also prove their command of agile frameworks. The Professional Scrum Master (PSM) validates a rigorous understanding of Scrum; SAFe targets organizations coordinating several parallel teams — a frequent case among large accounts and IT services firms in Morocco.',
      ),
      h2('Development: Java by Oracle'),
      p(
        'Java remains the backbone of information systems in Moroccan banking, insurance and administration. The Oracle Certified Professional Java and Oracle Certified Expert Java EE credentials distinguish developers who master the language and its enterprise platform from casual users.',
      ),
      h2('How to choose your path'),
      ul([
        'Start from a career goal, not a trend: a target role, then the certification that supports it.',
        'Prioritize fundamentals: networking or programming before narrow specializations.',
        'Choose training that combines exam preparation with practice on real cases.',
        'Plan for renewal: most certifications renew every two to three years.',
      ]),
      p(
        b('Finally: '),
        'a certification does not replace experience — it makes it visible and comparable. At Tachfir, our consultants hold these very certifications and deliver training that prepares for them: browse our catalog or request a tailored path for your team.',
      ),
    ),
  },
};
