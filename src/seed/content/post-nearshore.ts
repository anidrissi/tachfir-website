import { POST_SLUGS } from '@/config/editorial';
import { b, doc, h2, ol, p, ul } from '../lexical';

/**
 * Article 2 — Nearshore au Maroc : pourquoi les entreprises françaises
 * externalisent leur développement (catégorie nearshore).
 */
export const postNearshore = {
  category: 'nearshore' as const,
  publishedAt: '2026-06-28T09:00:00.000Z',
  cover: 'nearshore' as const,
  coverAlts: {
    ar: 'رسم توضيحي: تبادل بين المغرب وفرنسا يرمز إلى التعهيد القريب',
    fr: 'Illustration : échanges Maroc-France symbolisant le nearshore',
    en: 'Illustration: Morocco–France exchange symbolizing nearshore work',
  },

  ar: {
    title: 'التعهيد القريب في المغرب: لماذا تختاره الشركات الفرنسية؟',
    slug: POST_SLUGS.nearshore.ar,
    excerpt:
      'توقيت متطابق تقريباً، فرنسية سلسة، كفاءات معتمدة وتكاليف محكومة: كيف أصبح المغرب الوجهة الأولى للتعهيد المعلوماتي القريب للشركات الفرنسية، وكيف تنجحون انطلاقتكم.',
    seo: {
      metaTitle: 'التعهيد القريب بالمغرب: الدليل الكامل',
      metaDescription:
        'لماذا تعهّد الشركات الفرنسية تطويرها المعلوماتي إلى المغرب؟ التوقيت واللغة والكفاءات والتكلفة، ونصائح عملية لانطلاقة ناجحة.',
    },
    content: doc(
      p(
        'تواجه الشركات الفرنسية، صغيرة كانت أم متوسطة، معادلة صعبة: مشاريع رقمية تتكاثر، وكفاءات معلوماتية نادرة وغالية، وآجال توظيف تمتد لأشهر. أمام هذا الواقع، اختارت مئات الشركات حلاً أثبت جدواه: التعهيد القريب (nearshore) نحو المغرب.',
      ),
      p('في هذا المقال، نشرح لماذا ينجح هذا النموذج، وكيف تتفادون أخطاء البداية.'),
      h2('المثلث الرابح: التوقيت واللغة والتكلفة'),
      p('ثلاثة عوامل تجعل المغرب وجهة مميزة مقارنة بالتعهيد البعيد:'),
      ul([
        'التوقيت: فارق ساعية بين الدار البيضاء وباريس لا يتجاوز ساعة واحدة طوال السنة. اجتماعاتكم الصباحية تجمع الفريقين في الزمن الحقيقي، دون تناوب ليلي.',
        'اللغة والثقافة: الفرنسية لغة عمل جارية في قطاع المعلوميات المغربي — اجتماعات، توثيق، ومراجعات برمجية بلا وسيط ولا ترجمة.',
        'التكلفة: أثمنة أدنى بوضوح من مثيلاتها في فرنسا لنفس مستوى الخبرة، مع قرب جغرافي (نحو ثلاث ساعات طيران) يسهّل اللقاءات الدورية.',
      ]),
      h2('منظومة تقنية ناضجة'),
      p(
        'لم يعد التعهيد المغربي تجربة ناشئة: فمدن الدار البيضاء والرباط ومراكش تحتضن أقطاباً مخصصة للترحيل الخدماتي (مثل كازا نيرشور بالدار البيضاء)، وشركات خدمات رقمية دولية مستقرة منذ سنوات، ومدارس مهندسين تخرّج سنوياً دفعات مؤهلة في التطوير والسحابة والأمن السيبراني. والنتيجة سوق كفاءات واسع، معتاد على معايير الجودة الأوروبية ومنهجيات أجايل.',
      ),
      h2('نماذج التعاون: اختاروا ما يناسب نضجكم'),
      ol([
        'التوظيف بالوكالة (régie): مستشار أو أكثر يندمجون في فرقكم وأدواتكم — أبسط نقطة انطلاق.',
        'الفريق المخصص: فريق كامل يقوده مزودكم المغربي وفق أهداف متفق عليها، مع حكامة مشتركة.',
        'الصيانة التطبيقية (TMA): إسناد صيانة وتطوير تطبيقاتكم القائمة بالتزامات خدمة واضحة.',
      ]),
      p(
        'نصيحتنا: ابدؤوا صغيراً — مستشار واحد أو نطاق صيانة محدود — ثم وسّعوا بعد ترسيخ الثقة والمساطر.',
      ),
      h2('المعطيات والامتثال: أسئلة يجب طرحها'),
      p(
        'إذا كانت مشاريعكم تعالج معطيات شخصية، فتأكدوا من أن مزودكم المغربي يتقن الإطارين معاً: النظام الأوروبي RGPD عبر البنود التعاقدية النموذجية والالتزامات الملحقة، والإطار المغربي (القانون 09-08 واللجنة الوطنية لمراقبة حماية المعطيات الشخصية). واطلبوا التزامات مكتوبة حول الولوجات الاسمية، عزل البيئات، والسرية.',
      ),
      h2('كيف تنجحون الانطلاقة؟'),
      ul([
        'حددوا نطاقاً تجريبياً ملموساً لمدة 2-3 أشهر بمؤشرات نجاح واضحة.',
        'استثمروا في الاستقبال: ولوجات جاهزة، توثيق محدث، ومرجع داخلي متاح.',
        'أرسوا إيقاعاً: اجتماعات يومية قصيرة، عرض في نهاية كل دورة، ولقاء حكامة شهري.',
        'قيسوا: سرعة الإنجاز، جودة التسليمات، احترام الآجال — لا الانطباعات.',
      ]),
      p(
        b('خلاصة: '),
        'التعهيد القريب بالمغرب ليس مجرد خفض للتكاليف، بل توسيع لقدرتكم الهندسية بلغة عملكم وفي توقيتكم. تشفير تواكب الشركات الفرنسية بمستشارين معتمدين، من المستشار الواحد إلى الفريق المخصص — راسلونا لنناقش سياقكم.',
      ),
    ),
  },

  fr: {
    title: 'Nearshore au Maroc : pourquoi les entreprises françaises externalisent leur développement',
    slug: POST_SLUGS.nearshore.fr,
    excerpt:
      'Fuseau quasi identique, français courant, compétences certifiées et coûts maîtrisés : pourquoi le Maroc s’est imposé comme destination nearshore des entreprises françaises — et comment réussir son démarrage.',
    seo: {
      metaTitle: 'Nearshore au Maroc : le guide complet',
      metaDescription:
        'Pourquoi les entreprises françaises externalisent au Maroc : fuseau, langue, compétences, coûts — et les conseils concrets pour bien démarrer.',
    },
    content: doc(
      p(
        'PME comme ETI françaises font face à la même équation : des projets numériques qui se multiplient, des compétences IT rares et chères, des délais de recrutement qui s’étirent sur des mois. Face à ce constat, des centaines d’entreprises ont adopté une solution éprouvée : l’externalisation nearshore vers le Maroc.',
      ),
      p('Dans cet article, nous expliquons pourquoi ce modèle fonctionne — et comment éviter les erreurs de démarrage.'),
      h2('Le triangle gagnant : fuseau, langue, coût'),
      p('Trois facteurs distinguent le Maroc de l’offshore lointain :'),
      ul([
        'Le fuseau horaire : entre Casablanca et Paris, l’écart n’excède jamais une heure. Vos réunions du matin réunissent les deux équipes en temps réel, sans travail décalé.',
        'La langue et la culture : le français est langue de travail courante dans l’IT marocain — réunions, documentation et revues de code se font sans intermédiaire ni traduction.',
        'Le coût : des tarifs sensiblement inférieurs aux prestations équivalentes en France à niveau d’expertise égal, avec une proximité géographique (environ 3 h de vol) qui facilite les rencontres régulières.',
      ]),
      h2('Un écosystème technologique mûr'),
      p(
        'Le nearshore marocain n’est plus une expérimentation : Casablanca, Rabat et Marrakech abritent des zones dédiées à l’offshoring (comme Casanearshore à Casablanca), des ESN internationales installées depuis des années et des écoles d’ingénieurs qui forment chaque année des promotions qualifiées en développement, cloud et cybersécurité. Résultat : un vivier de compétences large, habitué aux standards de qualité européens et aux méthodologies agiles.',
      ),
      h2('Les modèles de collaboration : choisissez selon votre maturité'),
      ol([
        'La régie : un ou plusieurs consultants intégrés à vos équipes et à vos outils — le point de départ le plus simple.',
        'L’équipe dédiée : une équipe complète pilotée par votre prestataire marocain sur des objectifs convenus, avec gouvernance partagée.',
        'La TMA : la maintenance et l’évolution de vos applications existantes, avec des engagements de service clairs.',
      ]),
      p(
        'Notre conseil : commencez petit — un consultant ou un périmètre de TMA limité — puis étendez une fois la confiance et les processus installés.',
      ),
      h2('Données et conformité : les questions à poser'),
      p(
        'Si vos projets traitent des données personnelles, assurez-vous que votre prestataire marocain maîtrise les deux cadres : le RGPD côté européen, via les clauses contractuelles types et les engagements associés, et le cadre marocain (Loi 09-08, CNDP). Exigez des engagements écrits sur les accès nominatifs, le cloisonnement des environnements et la confidentialité.',
      ),
      h2('Réussir le démarrage'),
      ul([
        'Définissez un périmètre pilote concret de 2-3 mois avec des critères de succès explicites.',
        'Investissez dans l’onboarding : accès prêts, documentation à jour, référent interne disponible.',
        'Installez un rythme : daily courts, démo à chaque fin de sprint, comité de gouvernance mensuel.',
        'Mesurez : vélocité, qualité des livrables, respect des délais — pas des impressions.',
      ]),
      p(
        b('En résumé : '),
        'le nearshore marocain n’est pas qu’une réduction de coûts — c’est une extension de votre capacité d’ingénierie, dans votre langue et votre fuseau. Tachfir accompagne les entreprises françaises avec des consultants certifiés, du consultant unique à l’équipe dédiée — écrivez-nous pour parler de votre contexte.',
      ),
    ),
  },

  en: {
    title: 'Nearshore in Morocco: why French companies outsource their development here',
    slug: POST_SLUGS.nearshore.en,
    excerpt:
      'Near-identical time zone, fluent French, certified skills and controlled costs: why Morocco has become the nearshore destination for French companies — and how to start right.',
    seo: {
      metaTitle: 'Nearshore Morocco: the complete guide',
      metaDescription:
        'Why French companies outsource development to Morocco: time zone, language, skills and costs — plus concrete advice for a successful start.',
    },
    content: doc(
      p(
        'French SMEs and mid-caps face the same equation: multiplying digital projects, scarce and expensive IT skills, hiring cycles that stretch over months. Confronted with this, hundreds of companies have adopted a proven solution: nearshore outsourcing to Morocco.',
      ),
      p('In this article we explain why the model works — and how to avoid early mistakes.'),
      h2('The winning triangle: time zone, language, cost'),
      p('Three factors set Morocco apart from far-shore destinations:'),
      ul([
        'Time zone: between Casablanca and Paris the gap never exceeds one hour. Morning meetings bring both teams together in real time, without shift work.',
        'Language and culture: French is a working language across Moroccan IT — meetings, documentation and code reviews happen without intermediaries or translation.',
        'Cost: rates significantly below equivalent services in France for the same level of expertise, with geographic proximity (about a 3-hour flight) making regular visits easy.',
      ]),
      h2('A mature tech ecosystem'),
      p(
        'Moroccan nearshore is no longer an experiment: Casablanca, Rabat and Marrakech host dedicated offshoring zones (such as Casanearshore in Casablanca), international IT services firms established for years, and engineering schools graduating qualified cohorts in development, cloud and cybersecurity every year. The result: a wide talent pool, used to European quality standards and agile methodologies.',
      ),
      h2('Collaboration models: pick by maturity'),
      ol([
        'Staff augmentation: one or more consultants embedded in your teams and tools — the simplest starting point.',
        'Dedicated team: a full team run by your Moroccan partner against agreed objectives, with shared governance.',
        'Application maintenance: the upkeep and evolution of your existing applications, with clear service commitments.',
      ]),
      p(
        'Our advice: start small — one consultant or a limited maintenance scope — then expand once trust and processes are in place.',
      ),
      h2('Data and compliance: the questions to ask'),
      p(
        'If your projects process personal data, make sure your Moroccan partner masters both frameworks: GDPR on the European side, through standard contractual clauses and related commitments, and the Moroccan framework (Law 09-08, CNDP). Require written commitments on named access, environment segregation and confidentiality.',
      ),
      h2('Getting the start right'),
      ul([
        'Define a concrete 2–3 month pilot scope with explicit success criteria.',
        'Invest in onboarding: access ready, up-to-date documentation, an available internal referent.',
        'Set a rhythm: short dailies, a demo at every sprint end, a monthly governance meeting.',
        'Measure: velocity, deliverable quality, deadline adherence — not impressions.',
      ]),
      p(
        b('Bottom line: '),
        'Moroccan nearshore is not just cost reduction — it is an extension of your engineering capacity, in your language and your time zone. Tachfir supports French companies with certified consultants, from a single consultant to a dedicated team — write to us about your context.',
      ),
    ),
  },
};
