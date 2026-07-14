import type { Metadata } from 'next';
import {
  Boxes,
  FileCheck2,
  HardDrive,
  Laptop,
  Network,
  Printer,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBanner } from '@/components/content/cta-banner';
import { FaqSection, type FaqItem } from '@/components/content/faq-section';
import { PageHero } from '@/components/content/page-hero';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { company, whatsappHref } from '@/config/company';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/localized-path';
import { pageMetadata } from '@/lib/metadata';
import { getSettings } from '@/lib/settings';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'serviceSupply', '/services/fourniture-informatique');
}

const FAMILY_ICONS = [Laptop, HardDrive, Network, Printer, FileCheck2, Boxes];

export default async function SupplyServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('serviceSupply');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const settings = await getSettings(locale as Locale);

  const families = t.raw('families.items') as Array<{ title: string; text: string }>;
  const publicItems = t.raw('publicSector.items') as string[];
  const steps = t.raw('process.steps') as Array<{ title: string; text: string }>;
  const faqItems = t.raw('faq.items') as FaqItem[];

  const waLink = whatsappHref(settings.whatsapp, tc('whatsappMessage'));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('hero.title'),
    description: t('hero.intro'),
    url: absoluteUrl(company.siteUrl, '/services/fourniture-informatique', locale as Locale),
    areaServed: 'MA',
    provider: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Container>
        <Breadcrumbs
          locale={locale as Locale}
          items={[
            { label: tn('services'), href: '/services' },
            { label: tn('servicesSupply') },
          ]}
        />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')}>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/devis" size="lg">
            {t('hero.cta')}
          </ButtonLink>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-base font-semibold transition-colors hover:border-[#25D366] hover:text-[#25D366]"
            >
              {t('hero.ctaWhatsApp')}
            </a>
          ) : null}
        </div>
      </PageHero>

      {/* Familles couvertes */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading title={t('families.title')} intro={t('families.intro')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((family, i) => {
              const Icon = FAMILY_ICONS[i] ?? Boxes;
              return (
                <Card key={i}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-bold">{family.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{family.text}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Réassurance secteur public */}
      <section className="bg-abysse py-16 text-white dark:bg-surface sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-sarcelle-vif">
            {t('publicSector.eyebrow')}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white dark:text-foreground">
            {t('publicSector.title')}
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {publicItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white/85 dark:text-muted">
                <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-sarcelle-vif" aria-hidden />
                <span>{item.replace('{zones}', settings.deliveryZones)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Timeline processus */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading title={t('process.title')} />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li key={i} className="relative">
                <Card className="h-full">
                  <span
                    className="font-display text-2xl font-bold text-ambre"
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

      <FaqSection title={t('faq.title')} items={faqItems} />

      <CtaBanner
        locale={locale as Locale}
        title={t('cta.title')}
        text={t('cta.text')}
        ctaLabel={t('cta.button')}
      />
    </>
  );
}
