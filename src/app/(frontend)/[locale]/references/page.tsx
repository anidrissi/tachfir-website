import type { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientsBand } from '@/components/content/clients-band';
import { CtaBanner } from '@/components/content/cta-banner';
import { PageHero } from '@/components/content/page-hero';
import { TestimonialsSection } from '@/components/content/testimonials-section';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { company } from '@/config/company';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'references', '/references');
}

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('referencesPage');
  const tn = await getTranslations('nav');

  const sectors = t.raw('sectors.items') as string[];

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('references') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      <ClientsBand title={t('logos.title')} />

      {/* Chiffres clés */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={t('stats.title')} />
          <dl className="mt-10 grid gap-6 text-center sm:grid-cols-3">
            {(
              [
                [company.stats.clients, t('stats.clients')],
                [company.stats.projects, t('stats.projects')],
                [company.stats.experts, t('stats.experts')],
              ] as const
            ).map(([value, label]) => (
              <div key={label} className="rounded-card border border-border bg-card p-8">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-5xl font-bold text-primary">
                  {value}
                  <span className="text-sarcelle dark:text-sarcelle-vif">+</span>
                </dd>
                <dd className="mt-2 text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Secteurs */}
      <section className="border-t border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container>
          <SectionHeading title={t('sectors.title')} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-card border border-border bg-card px-5 py-4"
              >
                <Building2 className="h-5 w-5 shrink-0 text-sarcelle dark:text-sarcelle-vif" aria-hidden />
                <span className="font-medium">{sector}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TestimonialsSection locale={locale as Locale} title={t('testimonials.title')} limit={6} />

      <CtaBanner
        locale={locale as Locale}
        title={t('cta.title')}
        ctaLabel={t('cta.button')}
      />
    </>
  );
}
