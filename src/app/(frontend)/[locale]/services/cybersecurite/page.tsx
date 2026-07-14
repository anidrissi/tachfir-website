import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ServicePage } from '@/components/content/service-page';
import { FORMATION_SLUGS, POST_SLUGS } from '@/config/editorial';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'serviceCyber', '/services/cybersecurite');
}

export default async function CyberServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ServicePage
      locale={locale as Locale}
      namespace="serviceCyber"
      pathname="/services/cybersecurite"
      relatedFormation={FORMATION_SLUGS.cyberops}
      relatedPost={POST_SLUGS.certifications}
    />
  );
}
