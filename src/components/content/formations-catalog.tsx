'use client';

import { Clock, MonitorPlay } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type CatalogItem = {
  id: number | string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  duration: string;
  modalitiesLabel: string;
};

/**
 * Catalogue des formations avec filtre par catégorie (côté client,
 * aucune requête : les données sont déjà rendues par le serveur).
 */
export function FormationsCatalog({
  items,
  categories,
  allLabel,
  filterLabel,
  detailsLabel,
}: {
  items: CatalogItem[];
  categories: Array<{ value: string; label: string }>;
  allLabel: string;
  filterLabel: string;
  detailsLabel: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const visible = selected ? items.filter((i) => i.category === selected) : items;

  // N'affiche que les catégories réellement présentes dans le catalogue
  const present = categories.filter((c) => items.some((i) => i.category === c.value));

  return (
    <div>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelected(null)}
          aria-pressed={selected === null}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
            selected === null
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border hover:border-primary hover:text-primary',
          )}
        >
          {allLabel}
        </button>
        {present.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setSelected(cat.value === selected ? null : cat.value)}
            aria-pressed={selected === cat.value}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
              selected === cat.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary hover:text-primary',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col rounded-card border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <Badge tone="blue">{item.categoryLabel}</Badge>
            </div>
            <h2 className="mt-4 text-lg font-bold leading-snug">
              <Link
                href={{ pathname: '/formations/[slug]', params: { slug: item.slug } }}
                className="after:absolute after:inset-0 group-hover:text-primary"
              >
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
            <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                <dd>{item.duration}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <MonitorPlay className="h-4 w-4" aria-hidden />
                <dd>{item.modalitiesLabel}</dd>
              </div>
            </dl>
            <span className="mt-3 text-sm font-semibold text-primary">{detailsLabel}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
