import Image from 'next/image';
import type { Media } from '@/payload-types';

/**
 * Image issue du CMS (collection media) rendue via next/image.
 * `alt` localisé obligatoire côté CMS. Retourne null si le média est absent.
 */
export function CmsImage({
  media,
  size,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: {
  media: Media | number | null | undefined;
  size?: 'thumbnail' | 'card' | 'hero';
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!media || typeof media === 'number') return null;

  const variant = size ? media.sizes?.[size] : undefined;
  const url = variant?.url ?? media.url;
  const width = variant?.width ?? media.width;
  const height = variant?.height ?? media.height;

  if (!url || !width || !height) return null;

  return (
    <Image
      src={url}
      alt={media.alt ?? ''}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
