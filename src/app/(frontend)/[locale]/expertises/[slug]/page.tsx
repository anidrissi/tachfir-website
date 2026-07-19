import type { Metadata } from 'next';
import { Layers, Sparkles, UserCheck } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { CtaBanner } from '@/components/content/cta-banner';
import { RichText } from '@/components/content/rich-text';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SetAlternates } from '@/components/providers/alternates-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import {
  EXPERTISE_MODALITIES,
  EXPERTISE_SENIORITIES,
} from '@/collections/expertises';
import { company } from '@/config/company';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getExpertiseBySlug, getExpertises, getLocalizedSlugs } from '@/lib/content';
import { absoluteUrl, localizedPaths } from '@/lib/localized-path';
import { buildMetadata } from '@/lib/metadata';
import { decodeSlug } from '@/lib/params';

type Props = { params: Promise<{ locale: string; slug: string }> };

function labelOf(
  options: ReadonlyArray<{ value: string; label: Record<string, string> }>,
  value: string,
  locale: Locale,
): string {
  const opt = options.find((o) => o.value === value);
  return opt ? (opt.label[locale] ?? opt.label.fr) : value;
}

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): Promise<Array<{ slug: string }>> {
  const expertises = await getExpertises(params.locale as Locale);
  return expertises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const expertise = await getExpertiseBySlug(locale as Locale, decodeSlug(slug));
  if (!expertise) return {};

  const slugs = await getLocalizedSlugs('expertises', expertise.id);
  const paramsByLocale = Object.fromEntries(
    routing.locales.filter((l) => slugs[l]).map((l) => [l, { slug: slugs[l] as string }]),
  );

  return buildMetadata({
    locale: locale as Locale,
    title: expertise.seo?.metaTitle || expertise.title,
    description: expertise.seo?.metaDescription || expertise.tagline,
    pathname: '/expertises/[slug]',
    paramsByLocale,
  });
}

export default async function ExpertiseDetailPage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  setRequestLocale(locale);
  const slug = decodeSlug(rawSlug);
  const loc = locale as Locale;

  const expertise = await getExpertiseBySlug(loc, slug);
  if (!expertise) notFound();

  const t = await getTranslations('expertisesPage');
  const tn = await getTranslations('nav');

  const slugs = await getLocalizedSlugs('expertises', expertise.id);
  const alternates = Object.fromEntries(
    routing.locales
      .filter((l) => slugs[l])
      .map((l) => [
        l,
        localizedPaths('/expertises/[slug]', l as Locale, { slug: slugs[l] as string }).external,
      ]),
  );

  const seniorities = (expertise.seniorities ?? []) as string[];
  const modalities = (expertise.modalities ?? []) as string[];
  const techs = (expertise.technologies ?? []).map((tech) => tech.name).filter(Boolean) as string[];

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: expertise.title,
    description: expertise.tagline,
    serviceType: expertise.title,
    url: absoluteUrl(company.siteUrl, '/expertises/[slug]', loc, { slug }),
    areaServed: ['MA', 'FR', 'BE', 'CA', 'AE', 'SA', 'QA'],
    provider: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
      sameAs: company.linkedin,
    },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <SetAlternates alternates={alternates} />

      <Container>
        <Breadcrumbs
          locale={loc}
          items={[
            { label: tn('servicesExpertises'), href: '/expertises' },
            { label: expertise.title },
          ]}
        />
      </Container>

      <section className="border-b border-border bg-surface py-12 dark:bg-nuit sm:py-16">
        <Container>
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl">{expertise.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{expertise.tagline}</p>
          {techs.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {techs.map((tech) => (
                <li key={tech}>
                  <Badge tone="neutral">{tech}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8">
            <ButtonLink href="/devis" size="lg">
              {t('detail.cta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            <RichText data={expertise.description as SerializedEditorState} />
          </div>

          <aside>
            <div className="rounded-card border border-border bg-card p-6 lg:sticky lg:top-24">
              <dl className="space-y-5 text-sm">
                {seniorities.length > 0 ? (
                  <div className="flex items-start gap-3">
                    <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="font-semibold">{t('detail.seniorities')}</dt>
                      <dd className="text-muted">
                        {seniorities.map((s) => labelOf(EXPERTISE_SENIORITIES, s, loc)).join(' · ')}
                      </dd>
                    </div>
                  </div>
                ) : null}
                {modalities.length > 0 ? (
                  <div className="flex items-start gap-3">
                    <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <dt className="font-semibold">{t('detail.modalities')}</dt>
                      <dd className="text-muted">
                        {modalities.map((m) => labelOf(EXPERTISE_MODALITIES, m, loc)).join(' · ')}
                      </dd>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-semibold">{t('detail.needProfiles')}</dt>
                    <dd className="leading-relaxed text-muted">{t('detail.needProfilesText')}</dd>
                  </div>
                </div>
              </dl>
              <ButtonLink href="/devis" className="mt-6 w-full">
                {t('detail.cta')}
              </ButtonLink>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted">
                {t('detail.candidateHint')}{' '}
                <Link href="/talents" className="font-semibold text-primary hover:underline">
                  {t('detail.ctaTalent')}
                </Link>
              </p>
              <Link
                href="/expertises"
                className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
              >
                {t('detail.backToList')}
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBanner
        locale={loc}
        title={t('cta.title')}
        text={t('cta.text')}
        ctaLabel={t('detail.cta')}
        ctaHref="/devis"
      />
    </>
  );
}
