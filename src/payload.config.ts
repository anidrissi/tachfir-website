import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { ar } from '@payloadcms/translations/languages/ar';
import { en } from '@payloadcms/translations/languages/en';
import { fr } from '@payloadcms/translations/languages/fr';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Candidatures } from '@/collections/candidatures';
import { Clients } from '@/collections/clients';
import { CvUploads } from '@/collections/cv-uploads';
import { Expertises } from '@/collections/expertises';
import { Formations } from '@/collections/formations';
import { Media } from '@/collections/media';
import { Posts } from '@/collections/posts';
import { Testimonials } from '@/collections/testimonials';
import { Users } from '@/collections/users';
import { Settings } from '@/globals/settings';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const databaseUri = process.env.DATABASE_URI ?? 'file:./tachfir.db';
const isPostgres =
  databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://');

export default buildConfig({
  // Base de données : SQLite en local/dev, Postgres (Neon / Vercel Postgres) en production.
  db: isPostgres
    ? postgresAdapter({ pool: { connectionString: databaseUri } })
    : sqliteAdapter({ client: { url: databaseUri } }),

  secret: process.env.PAYLOAD_SECRET ?? '',

  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — Tachfir Admin',
    },
    dateFormat: 'dd/MM/yyyy',
  },

  // Interface d'admin en français par défaut (ar/en disponibles par utilisateur).
  i18n: {
    supportedLanguages: { fr, ar, en },
    fallbackLanguage: 'fr',
  },

  // Localisation des contenus : mêmes locales que le front, arabe par défaut.
  localization: {
    locales: [
      { code: 'ar', label: 'العربية', rtl: true },
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'ar',
    fallback: true,
  },

  editor: lexicalEditor(),

  collections: [
    Posts,
    Formations,
    Expertises,
    Testimonials,
    Clients,
    Media,
    Candidatures,
    CvUploads,
    Users,
  ],
  globals: [Settings],

  graphQL: { disable: true },

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  plugins: [
    // Médias sur Vercel Blob dès que le jeton est présent (production).
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
