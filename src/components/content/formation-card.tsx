import { Clock, MonitorPlay } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import type { Formation } from '@/payload-types';

/** Carte formation (listing + aperçu accueil). */
export async function FormationCard({ formation }: { formation: Formation }) {
  const t = await getTranslations('formationsPage');

  return (
    <article className="group flex flex-col rounded-card border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <Badge tone="blue">{t(`categories.${formation.category}`)}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug">
        <Link
          href={{ pathname: '/formations/[slug]', params: { slug: formation.slug } }}
          className="after:absolute after:inset-0 group-hover:text-primary"
        >
          {formation.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{formation.summary}</p>
      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden />
          <dt className="sr-only">{t('card.duration')}</dt>
          <dd>{formation.duration}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <MonitorPlay className="h-4 w-4" aria-hidden />
          <dt className="sr-only">{t('card.modalities')}</dt>
          <dd>
            {(formation.modalities ?? [])
              .map((m) => t(`modalities.${m}`))
              .join(' · ')}
          </dd>
        </div>
      </dl>
    </article>
  );
}
