import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalPage } from '@/components/content/legal-sections';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'privacy', '/politique-confidentialite');
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacyPage');
  const tf = await getTranslations('footer');

  return (
    <LegalPage
      locale={locale as Locale}
      title={t('title')}
      updatedLabel={t('updated')}
      intro={t('intro')}
      sections={t.raw('sections') as Array<{ title: string; text: string }>}
      breadcrumbLabel={tf('privacyPolicy')}
    />
  );
}
