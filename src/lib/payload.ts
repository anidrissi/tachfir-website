import config from '@payload-config';
import { getPayload, type Payload } from 'payload';

/** Client Payload (Local API) — instance mise en cache par Payload. */
export function getPayloadClient(): Promise<Payload> {
  return getPayload({ config });
}
