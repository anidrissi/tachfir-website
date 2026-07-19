import { JsonLd } from '@/components/seo/json-ld';
import { company, isPending } from '@/config/company';
import type { Locale } from '@/i18n/routing';
import { getSettings } from '@/lib/settings';

/**
 * JSON-LD globaux : Organization + ProfessionalService (NAP,
 * areaServed MA/FR, logo, sameAs LinkedIn). Rendus dans le layout.
 * Les valeurs [EN_ATTENTE] sont omises du balisage.
 */
export async function OrgJsonLd({ locale }: { locale: Locale }) {
  const settings = await getSettings(locale);

  const address = !isPending(settings.address)
    ? {
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
          addressLocality: isPending(settings.city) ? undefined : settings.city,
          addressCountry: 'MA',
        },
      }
    : {};

  const telephone = !isPending(settings.phone) ? { telephone: settings.phone } : {};

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${company.siteUrl}/#organization`,
        name: company.name,
        url: company.siteUrl,
        logo: `${company.siteUrl}/brand/logo.svg`,
        slogan: company.tagline,
        email: settings.email,
        sameAs: [settings.linkedin],
        ...telephone,
        ...address,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${company.siteUrl}/#service`,
        name: company.name,
        url: company.siteUrl,
        image: `${company.siteUrl}/brand/logo.svg`,
        parentOrganization: { '@id': `${company.siteUrl}/#organization` },
        areaServed: ['MA', 'FR', 'BE', 'CA', 'AE', 'SA', 'QA'],
        email: settings.email,
        ...telephone,
        ...address,
      },
    ],
  };

  return <JsonLd data={data} />;
}
