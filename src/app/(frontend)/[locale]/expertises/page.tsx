import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getExpertises } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'expertises', '/expertises');
}

export default async function ExpertisesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('expertisesPage');
  const tn = await getTranslations('nav');

  const expertises = await getExpertises(locale as Locale);
  const whyPoints = t.raw('why.points') as Array<{ title: string; text: string }>;

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('servicesExpertises') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      <section className="py-14 sm:py-20">
        <Container>
          {expertises.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {expertises.map((exp) => {
                const techs = (exp.technologies ?? [])
                  .map((tech) => tech.name)
                  .filter(Boolean) as string[];
                return (
                  <Card key={exp.id} className="group relative flex h-full flex-col">
                    <h2 className="text-lg font-bold leading-snug">
                      <Link
                        href={{ pathname: '/expertises/[slug]', params: { slug: exp.slug } }}
                        className="after:absolute after:inset-0 group-hover:text-primary"
                      >
                        {exp.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{exp.tagline}</p>
                    {techs.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {techs.slice(0, 5).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t('card.details')}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                    </span>
                  </Card>
                );
              })}
            </div>
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
        ctaHref="/talents"
      />
    </>
  );
}
