import type { Metadata } from 'next';
import { CheckCircle2, Clock, GraduationCap, MonitorPlay, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CtaBanner } from '@/components/content/cta-banner';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SetAlternates } from '@/components/providers/alternates-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { company } from '@/config/company';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getFormationBySlug, getFormations, getLocalizedSlugs } from '@/lib/content';
import { absoluteUrl, localizedPaths } from '@/lib/localized-path';
import { buildMetadata } from '@/lib/metadata';
import { decodeSlug } from '@/lib/params';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): Promise<Array<{ slug: string }>> {
  const formations = await getFormations(params.locale as Locale);
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const formation = await getFormationBySlug(locale as Locale, decodeSlug(slug));
  if (!formation) return {};

  const slugs = await getLocalizedSlugs('formations', formation.id);
  const paramsByLocale = Object.fromEntries(
    routing.locales.filter((l) => slugs[l]).map((l) => [l, { slug: slugs[l] as string }]),
  );

  return buildMetadata({
    locale: locale as Locale,
    title: formation.seo?.metaTitle || formation.title,
    description: formation.seo?.metaDescription || formation.summary,
    pathname: '/formations/[slug]',
    paramsByLocale,
  });
}

const MODALITY_MODE: Record<string, string> = {
  presentiel: 'Onsite',
  distanciel: 'Online',
  intra: 'Onsite',
};

export default async function FormationDetailPage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  setRequestLocale(locale);
  const slug = decodeSlug(rawSlug);

  const formation = await getFormationBySlug(locale as Locale, slug);
  if (!formation) notFound();

  const t = await getTranslations('formationsPage');
  const tn = await getTranslations('nav');

  const slugs = await getLocalizedSlugs('formations', formation.id);
  const alternates = Object.fromEntries(
    routing.locales
      .filter((l) => slugs[l])
      .map((l) => [
        l,
        localizedPaths('/formations/[slug]', l as Locale, { slug: slugs[l] as string }).external,
      ]),
  );

  const objectives = formation.objectives ?? [];
  const program = formation.program ?? [];

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: formation.title,
    description: formation.summary,
    inLanguage: locale,
    url: absoluteUrl(company.siteUrl, '/formations/[slug]', locale as Locale, { slug }),
    provider: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
      sameAs: company.linkedin,
    },
    hasCourseInstance: (formation.modalities ?? []).map((m) => ({
      '@type': 'CourseInstance',
      courseMode: MODALITY_MODE[m] ?? 'Onsite',
      courseWorkload: formation.duration,
    })),
  };

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <SetAlternates alternates={alternates} />

      <Container>
        <Breadcrumbs
          locale={locale as Locale}
          items={[{ label: tn('formations'), href: '/formations' }, { label: formation.title }]}
        />
      </Container>

      {/* En-tête */}
      <section className="border-b border-border bg-surface py-12 dark:bg-nuit sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{t(`categories.${formation.category}`)}</Badge>
            {(formation.modalities ?? []).map((m) => (
              <Badge key={m} tone="neutral">
                {t(`modalities.${m}`)}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">{formation.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{formation.summary}</p>
          <div className="mt-8">
            <ButtonLink href="/devis" size="lg">
              {t('detail.cta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-12">
            {/* Objectifs */}
            <section>
              <h2 className="text-2xl font-bold">{t('detail.objectives')}</h2>
              <ul className="mt-5 space-y-3">
                {objectives.map((obj) => (
                  <li key={obj.id ?? obj.text} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-sarcelle dark:text-sarcelle-vif"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{obj.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Programme */}
            <section>
              <h2 className="text-2xl font-bold">{t('detail.program')}</h2>
              <ol className="mt-5 space-y-4">
                {program.map((module, i) => (
                  <li
                    key={module.id ?? i}
                    className="rounded-card border border-border bg-card p-5"
                  >
                    <h3 className="font-bold">
                      <span
                        className="me-3 font-display text-sarcelle dark:text-sarcelle-vif"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {module.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5 ps-9 text-sm text-muted">
                      {module.items
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line, j) => (
                          <li key={j} className="list-disc leading-relaxed">
                            {line}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            {/* Note intra */}
            <p className="rounded-md border border-dashed border-sarcelle/40 bg-sarcelle/5 px-4 py-3 text-sm text-muted">
              {t('detail.ctaIntra')}
            </p>
          </div>

          {/* Fiche latérale */}
          <aside>
            <div className="rounded-card border border-border bg-card p-6 lg:sticky lg:top-24">
              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold">{t('detail.duration')}</dt>
                    <dd className="text-muted">{formation.duration}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MonitorPlay className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold">{t('detail.modalities')}</dt>
                    <dd className="text-muted">
                      {(formation.modalities ?? []).map((m) => t(`modalities.${m}`)).join(' · ')}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold">{t('detail.audience')}</dt>
                    <dd className="leading-relaxed text-muted">{formation.audience}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold">{t('detail.prerequisites')}</dt>
                    <dd className="leading-relaxed text-muted">{formation.prerequisites}</dd>
                  </div>
                </div>
              </dl>
              <ButtonLink href="/devis" className="mt-6 w-full">
                {t('detail.cta')}
              </ButtonLink>
              <Link
                href="/formations"
                className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
              >
                {t('detail.backToCatalog')}
              </Link>
            </div>
          </aside>
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
