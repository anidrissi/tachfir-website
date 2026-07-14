import type { Payload } from 'payload';

/**
 * Contenus de lancement — remplis à l'étape « seed complet » :
 * 3 articles ×3 langues, 6 formations ×3 langues, 3 témoignages
 * [EN_ATTENTE], 5 clients.
 */
export async function seedContent(payload: Payload) {
  payload.logger.info('Contenus de lancement : injectés à l’étape seed (à venir).');
}
