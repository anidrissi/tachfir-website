import type { Access, FieldAccess, Where } from 'payload';

type Role = 'admin' | 'editor';

function role(user: unknown): Role | undefined {
  return (user as { role?: Role } | null | undefined)?.role;
}

/** Accès réservé aux administrateurs. */
export const isAdmin: Access = ({ req }) => role(req.user) === 'admin';

/** Accès admin — niveau champ (ex. protéger le champ `role`). */
export const isAdminFieldLevel: FieldAccess = ({ req }) => role(req.user) === 'admin';

/** Administrateurs et éditeurs (gestion des contenus). */
export const isAdminOrEditor: Access = ({ req }) => {
  const r = role(req.user);
  return r === 'admin' || r === 'editor';
};

/** Lecture publique. */
export const anyone: Access = () => true;

/**
 * Lecture : contenus publiés pour les visiteurs anonymes,
 * tout (y compris brouillons) pour les utilisateurs connectés.
 */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: 'published' } } satisfies Where;
};

/** Un utilisateur peut se lire/modifier lui-même ; l'admin peut tout. */
export const isAdminOrSelf: Access = ({ req, id }) => {
  if (role(req.user) === 'admin') return true;
  if (req.user && id && String(req.user.id) === String(id)) return true;
  if (req.user) return { id: { equals: req.user.id } } satisfies Where;
  return false;
};
