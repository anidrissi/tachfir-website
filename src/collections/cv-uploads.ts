import path from 'path';
import { fileURLToPath } from 'url';
import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminOrEditor, never } from '@/access';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * CV déposés via /talents — fichiers PRIVÉS.
 * `read` réservé aux administrateurs/éditeurs : un visiteur anonyme qui tente
 * l'URL directe du fichier reçoit un 403 (jamais servi au public).
 * Création via la Local API (route /api/talents, overrideAccess) uniquement.
 */
export const CvUploads: CollectionConfig = {
  slug: 'cv-uploads',
  labels: {
    singular: { fr: 'CV', ar: 'سيرة ذاتية', en: 'CV' },
    plural: { fr: 'CV (vivier)', ar: 'السير الذاتية', en: 'CVs' },
  },
  admin: {
    group: { fr: 'Recrutement', ar: 'التوظيف', en: 'Recruitment' },
    hidden: false,
  },
  access: {
    read: isAdminOrEditor,
    create: never,
    update: never,
    delete: isAdmin,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../private-uploads/cv'),
    mimeTypes: ['application/pdf'],
    disableLocalStorage: false,
  },
  fields: [],
};
