import type { Payload } from 'payload';
import { ensureCover } from './covers';
import { formationsSeed } from './formations-data';
import { postCertifications } from './post-certifications';
import { postMarchesPublics } from './post-marches-publics';
import { postNearshore } from './post-nearshore';

const context = { disableRevalidate: true };

type PostSeed = typeof postMarchesPublics;

async function seedPost(payload: Payload, seed: PostSeed) {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: seed.ar.slug } },
    locale: 'ar',
    draft: true,
    limit: 1,
  });
  if (existing.totalDocs > 0) {
    payload.logger.info(`Article déjà présent : ${seed.fr.slug}`);
    return;
  }

  const coverId = await ensureCover(payload, seed.cover, seed.coverAlts);

  const created = await payload.create({
    collection: 'posts',
    locale: 'ar',
    draft: false,
    context,
    data: {
      title: seed.ar.title,
      slug: seed.ar.slug,
      excerpt: seed.ar.excerpt,
      category: seed.category,
      content: seed.ar.content as never,
      author: 'Tachfir',
      publishedAt: seed.publishedAt,
      coverImage: coverId,
      seo: seed.ar.seo,
      _status: 'published',
    },
  });

  for (const locale of ['fr', 'en'] as const) {
    const data = seed[locale];
    await payload.update({
      collection: 'posts',
      id: created.id,
      locale,
      draft: false,
      context,
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content as never,
        seo: data.seo,
        _status: 'published',
      },
    });
  }
  payload.logger.info(`Article seedé (ar/fr/en) : ${seed.fr.slug}`);
}

async function seedFormations(payload: Payload) {
  for (const seed of formationsSeed) {
    const existing = await payload.find({
      collection: 'formations',
      where: { slug: { equals: seed.ar.slug } },
      locale: 'ar',
      draft: true,
      limit: 1,
    });
    if (existing.totalDocs > 0) {
      payload.logger.info(`Formation déjà présente : ${seed.fr.slug}`);
      continue;
    }

    const created = await payload.create({
      collection: 'formations',
      locale: 'ar',
      draft: false,
      context,
      data: {
        title: seed.ar.title,
        slug: seed.ar.slug,
        category: seed.category,
        summary: seed.ar.summary,
        duration: seed.ar.duration,
        modalities: seed.modalities,
        objectives: seed.ar.objectives.map((text) => ({ text })),
        program: seed.ar.program,
        audience: seed.ar.audience,
        prerequisites: seed.ar.prerequisites,
        seo: seed.ar.seo,
        _status: 'published',
      },
    });

    for (const locale of ['fr', 'en'] as const) {
      const data = seed[locale];
      await payload.update({
        collection: 'formations',
        id: created.id,
        locale,
        draft: false,
        context,
        data: {
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          duration: data.duration,
          objectives: data.objectives.map((text) => ({ text })),
          program: data.program,
          audience: data.audience,
          prerequisites: data.prerequisites,
          seo: data.seo,
          _status: 'published',
        },
      });
    }
    payload.logger.info(`Formation seedée (ar/fr/en) : ${seed.fr.slug}`);
  }
}

/** 3 témoignages placeholders — clairement marqués [EN_ATTENTE]. */
const TESTIMONIALS = [
  {
    author: '[EN_ATTENTE — nom du client]',
    company: '[EN_ATTENTE — société]',
    order: 1,
    ar: {
      role: 'مدير نظم المعلومات',
      quote:
        '[في الانتظار — شهادة حقيقية] واكبنا فريق تشفير في إعادة بناء منصتنا الداخلية باحترافية وشفافية، مع احترام تام للآجال.',
    },
    fr: {
      role: 'DSI',
      quote:
        '[EN_ATTENTE — à remplacer par un vrai témoignage] L’équipe Tachfir a refondu notre plateforme interne avec professionnalisme et transparence, dans le respect total des délais.',
    },
    en: {
      role: 'CIO',
      quote:
        '[PENDING — replace with a real testimonial] The Tachfir team rebuilt our internal platform with professionalism and transparency, fully on schedule.',
    },
  },
  {
    author: '[EN_ATTENTE — nom du client]',
    company: '[EN_ATTENTE — administration]',
    order: 2,
    ar: {
      role: 'رئيس مصلحة المعلوميات',
      quote:
        '[في الانتظار — شهادة حقيقية] من عرض الأثمان إلى التسليم والتركيب، عولج سند طلبنا بسرعة ودقة، بفوترة مطابقة تماماً لمساطرنا.',
    },
    fr: {
      role: 'Chef de service informatique',
      quote:
        '[EN_ATTENTE — à remplacer par un vrai témoignage] Du devis à la livraison et l’installation, notre bon de commande a été traité vite et bien, avec une facturation parfaitement conforme à nos procédures.',
    },
    en: {
      role: 'Head of IT department',
      quote:
        '[PENDING — replace with a real testimonial] From quote to delivery and installation, our purchase order was handled quickly and properly, with invoicing fully compliant with our procedures.',
    },
  },
  {
    author: '[EN_ATTENTE — nom du client]',
    company: '[EN_ATTENTE — entreprise française]',
    order: 3,
    ar: {
      role: 'مدير تقني',
      quote:
        '[في الانتظار — شهادة حقيقية] فريقنا المخصص لدى تشفير امتداد حقيقي لفريقنا الباريسي: نفس التوقيت، نفس اللغة، ونفس مستوى الجودة.',
    },
    fr: {
      role: 'CTO',
      quote:
        '[EN_ATTENTE — à remplacer par un vrai témoignage] Notre équipe dédiée chez Tachfir est un vrai prolongement de notre équipe parisienne : même fuseau, même langue, même niveau d’exigence.',
    },
    en: {
      role: 'CTO',
      quote:
        '[PENDING — replace with a real testimonial] Our dedicated team at Tachfir is a true extension of our Paris team: same time zone, same language, same level of quality.',
    },
  },
];

async function seedTestimonials(payload: Payload) {
  const existing = await payload.find({ collection: 'testimonials', limit: 1 });
  if (existing.totalDocs > 0) {
    payload.logger.info('Témoignages déjà présents.');
    return;
  }

  for (const item of TESTIMONIALS) {
    const created = await payload.create({
      collection: 'testimonials',
      locale: 'ar',
      context,
      data: {
        author: item.author,
        company: item.company,
        order: item.order,
        visible: true,
        role: item.ar.role,
        quote: item.ar.quote,
      },
    });
    for (const locale of ['fr', 'en'] as const) {
      await payload.update({
        collection: 'testimonials',
        id: created.id,
        locale,
        context,
        data: { role: item[locale].role, quote: item[locale].quote },
      });
    }
  }
  payload.logger.info('3 témoignages [EN_ATTENTE] seedés.');
}

/** 5 références clients — logos HD à fournir (TODO-CLIENT.md). */
const CLIENTS = [
  { name: 'Intelcia', url: 'https://www.intelcia.com', order: 1 },
  { name: 'Proxiad', url: 'https://www.proxiad.com', order: 2 },
  { name: 'Alten', url: 'https://www.alten.com', order: 3 },
  { name: 'SFR', url: 'https://www.sfr.fr', order: 4 },
  { name: 'Fuzyo', url: null, order: 5 },
];

async function seedClients(payload: Payload) {
  const existing = await payload.find({ collection: 'clients', limit: 1 });
  if (existing.totalDocs > 0) {
    payload.logger.info('Clients déjà présents.');
    return;
  }
  for (const client of CLIENTS) {
    await payload.create({
      collection: 'clients',
      context,
      data: client,
    });
  }
  payload.logger.info('5 clients seedés (logos [EN_ATTENTE]).');
}

export async function seedContent(payload: Payload) {
  await seedPost(payload, postMarchesPublics);
  await seedPost(payload, postNearshore as unknown as PostSeed);
  await seedPost(payload, postCertifications as unknown as PostSeed);
  await seedFormations(payload);
  await seedTestimonials(payload);
  await seedClients(payload);
}
