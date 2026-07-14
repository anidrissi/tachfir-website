import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'about', '/a-propos');
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aboutPage');
  const tn = await getTranslations('nav');

  const values = t.raw('values.items') as Array<{ title: string; text: string }>;

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('about') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      {/* Histoire */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading title={t('story.title')} align="start" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            <p>{t('story.text1')}</p>
            <p>{t('story.text2')}</p>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="border-t border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container>
          <SectionHeading title={t('values.title')} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Card key={i}>
                <span
                  className="font-display text-xl font-bold text-sarcelle dark:text-sarcelle-vif"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Équipe */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading title={t('team.title')} align="start" />
          <p className="mt-5 text-lg leading-relaxed text-muted">{t('team.text')}</p>
          <p className="mt-6 rounded-md border border-dashed border-ambre/50 bg-ambre/5 px-4 py-3 text-sm text-muted">
            {t('team.note')}
          </p>
        </Container>
      </section>

      <CtaBanner locale={locale as Locale} title={t('cta.title')} ctaLabel={t('cta.button')} ctaHref="/contact" />
    </>
  );
}
