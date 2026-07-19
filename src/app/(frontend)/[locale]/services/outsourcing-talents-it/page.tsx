import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ServicePage } from '@/components/content/service-page';
import { FORMATION_SLUGS, POST_SLUGS } from '@/config/editorial';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale as Locale,
    'serviceOutsourcing',
    '/services/outsourcing-talents-it',
  );
}

export default async function OutsourcingServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ServicePage
      locale={locale as Locale}
      namespace="serviceOutsourcing"
      pathname="/services/outsourcing-talents-it"
      relatedFormation={FORMATION_SLUGS.agile}
      relatedPost={POST_SLUGS.nearshore}
    />
  );
}
