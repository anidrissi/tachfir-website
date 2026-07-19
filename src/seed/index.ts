import config from '@payload-config';
import { getPayload, type Payload } from 'payload';
import { company } from '@/config/company';

/**
 * Seed idempotent : `npm run seed`
 * - crée l'utilisateur admin initial (PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD)
 * - renseigne le global settings (placeholders [EN_ATTENTE])
 * - injecte les contenus de lancement (articles, formations, témoignages, clients)
 *
 * Exécuté avec NODE_ENV=development pour que le schéma soit poussé
 * automatiquement vers la base (SQLite en local/CI).
 */
async function seedAdminUser(payload: Payload) {
  const email = process.env.PAYLOAD_ADMIN_EMAIL ?? 'admin@tachfir.com';
  const password = process.env.PAYLOAD_ADMIN_PASSWORD;

  if (!password) {
    payload.logger.warn('PAYLOAD_ADMIN_PASSWORD absent — utilisateur admin non créé.');
    return;
  }

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    payload.logger.info(`Utilisateur admin déjà présent (${email}).`);
    return;
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      name: 'Administrateur Tachfir',
      role: 'admin',
    },
  });
  payload.logger.info(`Utilisateur admin créé : ${email} (changer le mot de passe à la 1re connexion).`);
}

async function seedSettings(payload: Payload) {
  const current = await payload.findGlobal({ slug: 'settings', locale: 'ar' });
  if (current?.email) {
    payload.logger.info('Global settings déjà renseigné — inchangé.');
    return;
  }

  const context = { disableRevalidate: true };

  // Locale par défaut (ar), puis traductions fr/en des champs localisés.
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'ar',
    context,
    data: {
      address: company.address.street,
      city: company.address.city,
      phone: company.phone,
      whatsapp: company.whatsapp,
      email: company.email,
      linkedin: company.linkedin,
      ice: company.ice,
      rc: company.rc,
      deliveryZones: '[في الانتظار — مناطق التوصيل، مثلاً: جميع أنحاء المغرب]',
      responseBanner: 'نرد خلال 24 إلى 48 ساعة',
      shortlistBanner: 'قائمة مختصرة خلال 72 ساعة',
    },
  });
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'fr',
    context,
    data: {
      address: company.address.street,
      city: company.address.city,
      deliveryZones: '[EN_ATTENTE — zones de livraison, ex. tout le Maroc]',
      responseBanner: 'Réponse sous 24-48 h',
      shortlistBanner: 'Shortlist sous 72 h',
    },
  });
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'en',
    context,
    data: {
      address: company.address.street,
      city: company.address.city,
      deliveryZones: '[PENDING — delivery zones, e.g. all of Morocco]',
      responseBanner: 'Reply within 24–48 h',
      shortlistBanner: 'Shortlist within 72 h',
    },
  });

  payload.logger.info('Global settings initialisé (placeholders [EN_ATTENTE]).');
}

/*
 * NB : top-level await obligatoire — `payload run` appelle process.exit(0)
 * dès que l'évaluation du module se termine.
 */
try {
  const payload = await getPayload({ config });

  payload.logger.info('— Seed Tachfir : démarrage —');
  await seedAdminUser(payload);
  await seedSettings(payload);

  // Contenus de lancement (articles, formations, témoignages, clients)
  const { seedContent } = await import('./content');
  await seedContent(payload);

  payload.logger.info('— Seed Tachfir : terminé —');
} catch (err) {
  console.error('Seed en échec :', err);
  process.exit(1);
}
