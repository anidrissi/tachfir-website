import type { Metadata } from 'next';
import { Code2, GraduationCap, PackageSearch, ShieldCheck, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import type { Locale, StaticAppPathname } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'services', '/services');
}

const CARDS: Array<{
  key: 'dev' | 'cyber' | 'consulting' | 'formation';
  href: StaticAppPathname;
  icon: typeof Code2;
}> = [
  { key: 'dev', href: '/services/developpement-web-mobile', icon: Code2 },
  { key: 'cyber', href: '/services/cybersecurite', icon: ShieldCheck },
  { key: 'consulting', href: '/services/outsourcing-talents-it', icon: Users },
  { key: 'formation', href: '/formations', icon: GraduationCap },
];

export default async function ServicesHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('servicesHub');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('services') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {CARDS.map(({ key, href, icon: Icon }) => (
              <Card key={key} className="group relative flex flex-col">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-bold">{t(`cards.${key}.title`)}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{t(`cards.${key}.text`)}</p>
                <Link
                  href={href}
                  className="mt-5 text-sm font-semibold text-primary after:absolute after:inset-0 group-hover:underline"
                >
                  {tc('learnMore')}
                </Link>
              </Card>
            ))}

            {/* Fourniture — carte pleine largeur, mise en avant */}
            <Card className="group relative flex flex-col border-ambre/40 md:col-span-2 md:flex-row md:items-center md:gap-8">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ambre/15 text-ambre">
                <PackageSearch className="h-5 w-5" aria-hidden />
              </span>
              <div className="mt-4 flex-1 md:mt-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{t('cards.supply.title')}</h2>
                  <Badge tone="amber">{t('cards.supply.badge')}</Badge>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{t('cards.supply.text')}</p>
              </div>
              <Link
                href="/services/fourniture-informatique"
                className="mt-4 shrink-0 text-sm font-semibold text-primary after:absolute after:inset-0 group-hover:underline md:mt-0"
              >
                {tc('learnMore')}
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Nearshore France */}
      <section className="border-t border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sarcelle dark:text-sarcelle-vif">
              {t('nearshore.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold">{t('nearshore.title')}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t('nearshore.text')}</p>
          </div>
          <ButtonLink
            href="/services/outsourcing-talents-it"
            size="lg"
            className="justify-self-start lg:justify-self-end"
          >
            {t('nearshore.cta')}
          </ButtonLink>
        </Container>
      </section>

      <CtaBanner
        locale={locale as Locale}
        title={tc('ctaQuote')}
        ctaLabel={tn('quote')}
        secondaryLabel={tc('ctaContact')}
        secondaryHref="/contact"
      />
    </>
  );
}
