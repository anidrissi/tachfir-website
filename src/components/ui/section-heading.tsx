import { cn } from '@/lib/utils';

/**
 * En-tête de section : eyebrow (petit label sarcelle) + titre + intro.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'start';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-start',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sarcelle dark:text-sarcelle-vif">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-bold sm:text-4xl">{title}</Tag>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}
