import path from 'path';
import { fileURLToPath } from 'url';
import type { CollectionConfig } from 'payload';
import { anyone, isAdminOrEditor } from '@/access';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Médias : uploads images avec `alt` localisé OBLIGATOIRE (accessibilité + SEO).
 * Stockage : disque local en dev (./media), Vercel Blob en production
 * (plugin activé quand BLOB_READ_WRITE_TOKEN est défini).
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Média', ar: 'وسائط', en: 'Media' },
    plural: { fr: 'Médias', ar: 'الوسائط', en: 'Media' },
  },
  admin: {
    group: { fr: 'Contenus', ar: 'المحتويات', en: 'Content' },
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 900 },
      { name: 'hero', width: 1600 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Texte alternatif', ar: 'النص البديل', en: 'Alt text' },
      admin: {
        description: {
          fr: 'Description de l’image pour l’accessibilité et le SEO (obligatoire, par langue).',
          ar: 'وصف الصورة لأغراض الوصول والسيو (إلزامي، لكل لغة).',
          en: 'Image description for accessibility and SEO (required, per language).',
        },
      },
    },
  ],
};
