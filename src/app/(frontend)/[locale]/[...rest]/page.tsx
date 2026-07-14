import { notFound } from 'next/navigation';

/** Attrape toutes les URLs inconnues sous une locale → 404 localisée. */
export default function CatchAllPage() {
  notFound();
}
