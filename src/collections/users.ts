import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access';

/**
 * Utilisateurs de l'admin.
 * Rôles : `admin` (tout) · `editor` (contenus uniquement — pas d'accès
 * aux utilisateurs ni aux réglages destructifs).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Utilisateur', ar: 'مستخدم', en: 'User' },
    plural: { fr: 'Utilisateurs', ar: 'المستخدمون', en: 'Users' },
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: { fr: 'Administration', ar: 'الإدارة', en: 'Administration' },
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom', ar: 'الاسم', en: 'Name' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: { fr: 'Rôle', ar: 'الدور', en: 'Role' },
      options: [
        { value: 'admin', label: { fr: 'Administrateur', ar: 'مدير', en: 'Administrator' } },
        { value: 'editor', label: { fr: 'Éditeur', ar: 'محرر', en: 'Editor' } },
      ],
      access: {
        // Seul un admin peut attribuer/modifier les rôles
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      saveToJWT: true,
    },
  ],
};
