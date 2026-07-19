import type { Metadata } from 'next';
import { Award } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CipherPattern } from '@/components/brand/cipher-pattern';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'certifications', '/certifications');
}

const GROUPS = ['agile', 'dev', 'network', 'cloud'] as const;

export default async function CertificationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('certificationsPage');
  const tn = await getTranslations('nav');

  const points = t.raw('why.points') as Array<{ title: string; text: string }>;

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('certifications') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      {/* Grille des 11 certifications */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {GROUPS.map((group) => (
              <Card key={group}>
                <h2 className="text-lg font-bold">{t(`groups.${group}.title`)}</h2>
                <ul className="mt-4 space-y-3">
                  {(t.raw(`groups.${group}.items`) as string[]).map((cert, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Award className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="font-medium leading-relaxed">{cert}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div
            className="mt-12 flex justify-center text-sarcelle/30 dark:text-sarcelle-vif/20"
            aria-hidden="true"
          >
            <CipherPattern className="h-8 w-auto" />
          </div>
        </Container>
      </section>

      {/* Argumentaire */}
      <section className="border-t border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container>
          <SectionHeading title={t('why.title')} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {points.map((point, i) => (
              <Card key={i}>
                <h3 className="font-bold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA double */}
      <section className="py-16 text-center sm:py-20">
        <Container>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold">{t('cta.title')}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/services/outsourcing-talents-it" size="lg">
              {t('cta.buttonConsulting')}
            </ButtonLink>
            <ButtonLink href="/formations" size="lg" variant="outline">
              {t('cta.buttonFormations')}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
