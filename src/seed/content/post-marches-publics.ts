import { POST_SLUGS } from '@/config/editorial';
import { b, doc, h2, ol, p, ul } from '../lexical';

/**
 * Article 1 — Marchés publics : réussir votre commande de matériel
 * informatique au Maroc (catégorie marches-publics).
 */
export const postMarchesPublics = {
  category: 'marches-publics' as const,
  publishedAt: '2026-06-20T09:00:00.000Z',
  cover: 'procurement' as const,
  coverAlts: {
    ar: 'رسم توضيحي: سند طلب مصادق عليه لاقتناء معدات معلوماتية',
    fr: 'Illustration : bon de commande validé pour du matériel informatique',
    en: 'Illustration: approved purchase order for IT hardware',
  },

  ar: {
    title: 'سند الطلب للمعدات المعلوماتية: دليل الإدارات المغربية',
    slug: POST_SLUGS.marchesPublics.ar,
    excerpt:
      'من تحديد الحاجة إلى محضر التسلم: دليل عملي للإدارات والمؤسسات العمومية المغربية لإنجاح اقتناء المعدات المعلوماتية عبر سند الطلب أو طلب العروض.',
    seo: {
      metaTitle: 'سند الطلب للمعدات المعلوماتية: دليل عملي',
      metaDescription:
        'دليل عملي للمشتري العمومي المغربي: اختيار المسطرة، صياغة الحاجة، انتقاء المورد، التسلم والضمان. اقتناء معلوماتي ناجح خطوة بخطوة.',
    },
    content: doc(
      p(
        'يُعد اقتناء المعدات المعلوماتية من أكثر النفقات تكراراً في ميزانيات الإدارات والجماعات والمؤسسات العمومية المغربية: حواسيب، طابعات، خوادم، معدات شبكية ورخص برمجية. ومع ذلك، كثيراً ما تتحول عملية بسيطة في ظاهرها إلى مصدر تأخير ونزاعات: مواصفات غامضة، عروض غير قابلة للمقارنة، آجال تسليم منفلتة، أو معدات لا تطابق الحاجة الفعلية.',
      ),
      p(
        'في هذا الدليل، نلخص الممارسات التي نلاحظها ميدانياً لدى المشترين العموميين الأكثر نجاعة، من تحديد الحاجة إلى محضر التسلم النهائي.',
      ),
      h2('اختيار المسطرة المناسبة: سند طلب أم طلب عروض؟'),
      p(
        'ينظم مرسوم الصفقات العمومية (المرسوم رقم 2.22.431) طرق الاقتناء المتاحة للإدارات. وعملياً، يمر اقتناء المعدات المعلوماتية غالباً عبر إحدى مسطرتين:',
      ),
      ul([
        'سند الطلب: للاقتناءات المحدودة في حدود السقف المالي المنصوص عليه في النصوص الجاري بها العمل — مسطرة سريعة تتطلب مع ذلك الاستشارة الكتابية لعدة متنافسين.',
        'طلب العروض: للحاجيات الأكبر حجماً، بدفتر تحملات ومسطرة إشهار وتقييم كاملة.',
      ]),
      p(
        'القاعدة الذهبية: لا تُجزّئوا حاجة كبيرة إلى سندات طلب متعددة لتفادي طلب العروض؛ فالمراقبة المالية تنتبه لذلك، والأهم أن التجزئة تحرمكم من أثمنة الحجم الأفضل.',
      ),
      h2('صياغة حاجة واضحة وقابلة للمقارنة'),
      p(
        'جودة العروض التي ستتوصلون بها انعكاس مباشر لجودة تعبيركم عن الحاجة. المواصفات الجيدة تحدد:',
      ),
      ul([
        'الخصائص التقنية الدنيا: المعالج، الذاكرة، التخزين، الشاشة — دون تسمية علامة تجارية بعينها إلا مع عبارة «أو ما يعادلها».',
        'الضمان المطلوب ومدته، وشروط خدمة ما بعد البيع.',
        'آجال التسليم القصوى ومكان التسليم والتركيب إن لزم.',
        'الرخص البرمجية المطلوبة بصيغها الدقيقة (دائمة أم اشتراك، عدد المستخدمين).',
        'شروط التكوين أو المواكبة عند الاقتضاء.',
      ]),
      p(
        'كلما كانت الحاجة أدق، كانت العروض قابلة للمقارنة فعلاً، وقلّت المفاجآت بعد التسليم.',
      ),
      h2('انتقاء مورد موثوق'),
      p('قبل إسناد الطلب، تحققوا من العناصر التي تميز المورد الجاد:'),
      ul([
        'الوضعية القانونية والجبائية: التعريف الموحد للمقاولة (ICE)، السجل التجاري، شهادات الانخراط والوضعية الجبائية سارية المفعول.',
        'المراجع: تجارب مماثلة مع إدارات أو مقاولات، يمكن التحقق منها.',
        'القدرة على خدمة ما بعد البيع: مسار واضح للتشخيص والاستبدال والإصلاح.',
        'وضوح العرض: عرض أثمان مفصل بالمراجع والكميات والآجال والضمان — لا أثمنة جملة غامضة.',
      ]),
      quoteBlock(),
      h2('التسلم والضمان والفوترة'),
      p('عند التسليم، لا توقعوا محضر التسلم إلا بعد:'),
      ol([
        'التحقق الكمي: مطابقة الكميات المسلَّمة لسند الطلب.',
        'التحقق النوعي: تشغيل المعدات والتأكد من مطابقتها للمواصفات المطلوبة.',
        'تسلم وثائق الضمان والفواتير المطابقة (تتضمن ICE والسجل التجاري ومراجع الطلب).',
      ]),
      p(
        'واحرصوا على أرشفة المحضر ووثائق الضمان: فهي أساس أي مطالبة لاحقة خلال فترة الضمان.',
      ),
      h2('خلاصة عملية'),
      p(
        'اقتناء معلوماتي ناجح = حاجة مصاغة بدقة + مسطرة مناسبة + مورد يمكن التحقق من جديته + تسلم موثق. وإذا رغبتم في ربح الوقت، فإن فريق تشفير يعالج سندات الطلب وطلبات العروض المعلوماتية للإدارات والمقاولات المغربية، بعرض أثمان مفصل خلال 24 إلى 48 ساعة، وفوترة مطابقة، وضمان وخدمة ما بعد البيع.',
      ),
    ),
  },

  fr: {
    title: 'Marchés publics : réussir votre commande de matériel informatique au Maroc',
    slug: POST_SLUGS.marchesPublics.fr,
    excerpt:
      'Du besoin au PV de réception : le guide pratique des administrations marocaines pour réussir un achat informatique par bon de commande ou appel d’offres.',
    seo: {
      metaTitle: 'Bon de commande informatique : le guide',
      metaDescription:
        'Guide de l’acheteur public marocain : procédure, rédaction du besoin, choix du fournisseur, réception. Un achat informatique réussi, pas à pas.',
    },
    content: doc(
      p(
        'L’achat de matériel informatique est l’une des dépenses les plus récurrentes des administrations, collectivités et établissements publics marocains : postes de travail, imprimantes, serveurs, équipements réseau, licences logicielles. Pourtant, une opération en apparence simple tourne souvent au casse-tête : spécifications floues, offres incomparables, délais qui dérapent, matériel inadapté au besoin réel.',
      ),
      p(
        'Ce guide condense les pratiques que nous observons sur le terrain chez les acheteurs publics les plus efficaces, de la définition du besoin au procès-verbal de réception.',
      ),
      h2('Choisir le bon véhicule : bon de commande ou appel d’offres ?'),
      p(
        'Le décret relatif aux marchés publics (décret n° 2-22-431) encadre les modes de passation. En pratique, un achat de matériel informatique passe le plus souvent par l’une de ces deux procédures :',
      ),
      ul([
        'Le bon de commande (سند الطلب) : pour les acquisitions limitées, dans la limite des seuils fixés par la réglementation en vigueur — une procédure rapide qui exige néanmoins la consultation écrite de plusieurs concurrents.',
        'L’appel d’offres (طلب عروض) : pour les besoins plus importants, avec cahier des charges (CPS), publicité et procédure d’évaluation complète.',
      ]),
      p(
        'Règle d’or : ne fractionnez pas un besoin important en plusieurs bons de commande pour éviter l’appel d’offres. Le contrôle financier y veille, et surtout, le fractionnement vous prive des meilleurs prix de volume.',
      ),
      h2('Rédiger un besoin clair et comparable'),
      p(
        'La qualité des offres reçues est le reflet direct de la qualité de votre expression de besoin. Une bonne spécification précise :',
      ),
      ul([
        'Les caractéristiques techniques minimales : processeur, mémoire, stockage, écran — sans citer une marque, sauf à ajouter « ou équivalent ».',
        'La garantie exigée, sa durée et les conditions de SAV.',
        'Les délais de livraison maximaux, le lieu de livraison et l’installation éventuelle.',
        'Les licences logicielles dans leur forme exacte (perpétuelle ou abonnement, nombre d’utilisateurs).',
        'Les prestations de formation ou d’accompagnement le cas échéant.',
      ]),
      p(
        'Plus le besoin est précis, plus les offres sont réellement comparables — et moins il y a de surprises après livraison.',
      ),
      h2('Sélectionner un fournisseur fiable'),
      p('Avant d’attribuer, vérifiez ce qui distingue un fournisseur sérieux :'),
      ul([
        'Situation légale et fiscale : ICE, registre de commerce, attestations fiscales et de la CNSS en cours de validité.',
        'Références : des livraisons comparables auprès d’administrations ou d’entreprises, vérifiables.',
        'Capacité de SAV : un circuit clair de diagnostic, remplacement et réparation.',
        'Clarté de l’offre : un devis (عرض أثمان) détaillé — références, quantités, délais, garantie — plutôt qu’un prix global opaque.',
      ]),
      quoteBlockFr(),
      h2('Réception, garantie et facturation'),
      p('À la livraison, ne signez le procès-verbal de réception qu’après :'),
      ol([
        'La vérification quantitative : les quantités livrées correspondent au bon de commande.',
        'La vérification qualitative : mise sous tension et conformité aux spécifications demandées.',
        'La remise des documents de garantie et de factures conformes (ICE, RC, références de la commande).',
      ]),
      p(
        'Archivez soigneusement PV et documents de garantie : ils fondent toute réclamation pendant la période de garantie.',
      ),
      h2('L’essentiel à retenir'),
      p(
        'Un achat informatique réussi = un besoin rédigé avec précision + la bonne procédure + un fournisseur vérifiable + une réception documentée. Et si vous voulez gagner du temps : l’équipe Tachfir traite les bons de commande et appels d’offres informatiques des administrations et entreprises marocaines, avec un devis détaillé sous 24-48 h, une facturation conforme, la garantie et le SAV.',
      ),
    ),
  },

  en: {
    title: 'Public procurement: getting IT hardware purchases right in Morocco',
    slug: POST_SLUGS.marchesPublics.en,
    excerpt:
      'From requirements to acceptance report: a practical guide for Moroccan public buyers to succeed with IT purchases through purchase orders or tenders.',
    seo: {
      metaTitle: 'IT purchase orders in Morocco: the guide',
      metaDescription:
        'A practical guide for Moroccan public buyers: choosing the procedure, writing specifications, selecting a supplier, acceptance and warranty. Step by step.',
    },
    content: doc(
      p(
        'IT hardware is one of the most recurrent purchases in Moroccan administrations, local authorities and public institutions: workstations, printers, servers, network equipment, software licenses. Yet a seemingly simple operation often becomes a headache: vague specifications, offers that cannot be compared, slipping deadlines, or hardware that does not match the actual need.',
      ),
      p(
        'This guide condenses the practices we observe among the most effective public buyers, from requirements definition to the final acceptance report.',
      ),
      h2('Choosing the right vehicle: purchase order or tender?'),
      p(
        'The Moroccan public procurement decree (No. 2-22-431) governs purchasing procedures. In practice, IT hardware purchases usually go through one of two routes:',
      ),
      ul([
        'The purchase order (bon de commande / سند الطلب): for limited purchases, within the thresholds set by current regulations — a fast procedure that still requires written consultation of several competitors.',
        'The call for tenders: for larger needs, with full specifications (CPS), publication and evaluation.',
      ]),
      p(
        'Golden rule: do not split a large need into several purchase orders to avoid a tender. Financial control watches for it — and splitting deprives you of volume pricing anyway.',
      ),
      h2('Writing clear, comparable requirements'),
      p(
        'The quality of the offers you receive directly reflects the quality of your requirements. A good specification states:',
      ),
      ul([
        'Minimum technical characteristics: CPU, memory, storage, display — without naming a brand, unless adding “or equivalent”.',
        'The required warranty, its duration and after-sales conditions.',
        'Maximum delivery times, delivery location and installation if needed.',
        'Software licenses in their exact form (perpetual or subscription, number of users).',
        'Training or support services where relevant.',
      ]),
      p(
        'The more precise the need, the more genuinely comparable the offers — and the fewer surprises after delivery.',
      ),
      h2('Selecting a reliable supplier'),
      p('Before awarding, check what distinguishes a serious supplier:'),
      ul([
        'Legal and tax standing: ICE, trade register, valid tax and social security certificates.',
        'References: comparable deliveries to administrations or companies, verifiable.',
        'After-sales capacity: a clear diagnosis, replacement and repair process.',
        'Clarity of the offer: a detailed quote — references, quantities, lead times, warranty — rather than an opaque lump sum.',
      ]),
      quoteBlockEn(),
      h2('Acceptance, warranty and invoicing'),
      p('At delivery, sign the acceptance report only after:'),
      ol([
        'Quantitative check: delivered quantities match the purchase order.',
        'Qualitative check: equipment powered on and compliant with the requested specifications.',
        'Handover of warranty documents and compliant invoices (ICE, RC, order references).',
      ]),
      p(
        'Archive the report and warranty documents carefully: they are the basis of any claim during the warranty period.',
      ),
      h2('The takeaway'),
      p(
        'A successful IT purchase = precisely written requirements + the right procedure + a verifiable supplier + documented acceptance. And if you want to save time: the Tachfir team handles IT purchase orders and tenders for Moroccan administrations and companies, with a detailed quote within 24–48 h, compliant invoicing, warranty and after-sales service.',
      ),
    ),
  },
};

function quoteBlock() {
  return p(
    b('نصيحة ميدانية: '),
    'اطلبوا دائماً من الموردين تحديد مدة صلاحية عرض الأثمان. فأسعار المعدات المعلوماتية تتقلب، وعرضٌ بلا مدة صلاحية يفتح باب المراجعات المزعجة عند التنفيذ.',
  );
}

function quoteBlockFr() {
  return p(
    b('Conseil de terrain : '),
    'exigez toujours une durée de validité sur les devis. Les prix du matériel informatique fluctuent, et un devis sans durée de validité ouvre la porte à des révisions désagréables au moment de l’exécution.',
  );
}

function quoteBlockEn() {
  return p(
    b('Field tip: '),
    'always require a validity period on quotes. IT hardware prices fluctuate, and a quote without a validity period opens the door to unpleasant revisions at execution time.',
  );
}
