import type { Metadata } from 'next';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TalentForm, type ExpertiseOption } from '@/components/forms/talent-form';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/routing';
import { getExpertises } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'talents', '/talents');
}

export default async function TalentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('talentsPage');
  const tn = await getTranslations('nav');

  const expertises = await getExpertises(locale as Locale);
  const options: ExpertiseOption[] = expertises.map((e) => ({
    value: String(e.id),
    label: e.title,
  }));

  const reasons = t.raw('aside.reasons') as string[];

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('talents') }]} />
      </Container>

      <section className="border-b border-border bg-surface py-12 dark:bg-nuit sm:py-16">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-sarcelle dark:text-sarcelle-vif">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">{t('hero.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t('hero.intro')}</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div id="formulaire">
            <TalentForm expertises={options} />
          </div>

          <aside className="order-first lg:order-none">
            <div className="rounded-card border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-bold">{t('aside.title')}</h2>
              <ul className="mt-4 space-y-3">
                {reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-sarcelle dark:text-sarcelle-vif"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t('aside.confidential')}
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
