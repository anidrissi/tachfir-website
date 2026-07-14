import { BookOpen, Check, GraduationCap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import { FaqSection, type FaqItem } from '@/components/content/faq-section';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { company } from '@/config/company';
import type { LocalizedSlug } from '@/config/editorial';
import { Link } from '@/i18n/navigation';
import type { AppPathname, Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/localized-path';

type Step = { title: string; text: string };
type Point = { title: string; text: string };

export type ServicePageProps = {
  locale: Locale;
  /** Namespace de messages : serviceDev | serviceCyber | serviceConsulting */
  namespace: 'serviceDev' | 'serviceCyber' | 'serviceConsulting';
  pathname: AppPathname;
  relatedFormation: LocalizedSlug;
  relatedPost: LocalizedSlug;
};

/**
 * Gabarit des pages service : problème → démarche → livrables →
 * pourquoi Tachfir → FAQ (schema FAQPage) → maillage interne → CTA.
 */
export async function ServicePage({
  locale,
  namespace,
  pathname,
  relatedFormation,
  relatedPost,
}: ServicePageProps) {
  const t = await getTranslations(namespace);
  const tn = await getTranslations('nav');

  const steps = t.raw('approach.steps') as Step[];
  const deliverables = t.raw('deliverables.items') as string[];
  const whyPoints = t.raw('why.points') as Point[];
  const faqItems = t.raw('faq.items') as FaqItem[];
  const hasStack = t.has('stack.title');
  const hasNearshore = t.has('nearshoreArgs.title');

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('hero.title'),
    description: t('hero.intro'),
    url: absoluteUrl(company.siteUrl, pathname, locale),
    areaServed: ['MA', 'FR'],
    provider: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Container>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: tn('services'), href: '/services' },
            { label: t('hero.eyebrow') },
          ]}
        />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')}>
        <div className="mt-8">
          <ButtonLink href="/devis" size="lg">
            {t('hero.cta')}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Problème */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading title={t('problem.title')} align="start" />
          <p className="mt-5 text-lg leading-relaxed text-muted">{t('problem.text')}</p>
        </Container>
      </section>

      {/* Démarche */}
      <section className="bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container>
          <SectionHeading title={t('approach.title')} />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li key={i}>
                <Card className="h-full">
                  <span
                    className="font-display text-2xl font-bold text-sarcelle dark:text-sarcelle-vif"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Stack (dev) ou arguments nearshore (conseil) */}
      {hasStack ? (
        <section className="py-16 sm:py-20">
          <Container className="max-w-4xl">
            <SectionHeading title={t('stack.title')} align="start" />
            <ul className="mt-6 flex flex-wrap gap-3">
              {(t.raw('stack.items') as string[]).map((item, i) => (
                <li
                  key={i}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {hasNearshore ? (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading title={t('nearshoreArgs.title')} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(t.raw('nearshoreArgs.items') as Point[]).map((item, i) => (
                <Card key={i}>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Livrables */}
      <section className={hasStack || hasNearshore ? 'bg-surface py-16 dark:bg-nuit sm:py-20' : 'py-16 sm:py-20'}>
        <Container className="max-w-4xl">
          <SectionHeading title={t('deliverables.title')} align="start" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-sarcelle dark:text-sarcelle-vif"
                  aria-hidden
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pourquoi Tachfir */}
      <section className="py-16 sm:py-20">
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

      {/* FAQ */}
      <FaqSection title={t('faq.title')} items={faqItems} />

      {/* Maillage interne */}
      <section className="border-t border-border py-12">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            {t('related.title')}
          </h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={{
                pathname: '/formations/[slug]',
                params: { slug: relatedFormation[locale] },
              }}
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              <GraduationCap className="h-4 w-4" aria-hidden />
              {t('related.formation')}
            </Link>
            <Link
              href={{ pathname: '/blog/[slug]', params: { slug: relatedPost[locale] } }}
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline sm:ms-8"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              {t('related.article')}
            </Link>
          </div>
        </Container>
      </section>

      <CtaBanner
        locale={locale}
        title={t('related.quote')}
        ctaLabel={t('hero.cta')}
        ctaHref="/devis"
      />
    </>
  );
}
