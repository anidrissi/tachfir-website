import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import {
  FormationsCatalog,
  type CatalogItem,
} from '@/components/content/formations-catalog';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { FORMATION_CATEGORIES } from '@/collections/formations';
import type { Locale } from '@/i18n/routing';
import { getFormations } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'formations', '/formations');
}

export default async function FormationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('formationsPage');
  const tn = await getTranslations('nav');

  const formations = await getFormations(locale as Locale);

  const items: CatalogItem[] = formations.map((f) => ({
    id: f.id,
    slug: f.slug,
    title: f.title,
    summary: f.summary,
    category: f.category,
    categoryLabel: t(`categories.${f.category}`),
    duration: f.duration,
    modalitiesLabel: (f.modalities ?? []).map((m) => t(`modalities.${m}`)).join(' · '),
  }));

  const categories = FORMATION_CATEGORIES.map((c) => ({
    value: c.value,
    label: t(`categories.${c.value}`),
  }));

  const whyPoints = t.raw('why.points') as Array<{ title: string; text: string }>;

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('formations') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      <section className="py-14 sm:py-20">
        <Container>
          {items.length > 0 ? (
            <FormationsCatalog
              items={items}
              categories={categories}
              allLabel={t('filters.all')}
              filterLabel={t('filters.label')}
              detailsLabel={t('card.details')}
            />
          ) : (
            <p className="rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center text-muted">
              {t('empty')}
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container>
          <SectionHeading title={t('why.title')} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyPoints.map((point, i) => (
              <Card key={i}>
                <h3 className="font-bold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        locale={locale as Locale}
        title={t('cta.title')}
        text={t('cta.text')}
        ctaLabel={t('cta.button')}
      />
    </>
  );
}
