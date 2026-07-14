import { getFormatter } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/routing';
import { getSettings } from '@/lib/settings';

type Section = { title: string; text: string };

/** Remplace les jetons {address} {city} {email} {phone} {ice} {rc} par les valeurs settings. */
function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => values[key] ?? m);
}

/** Gabarit des pages légales (mentions, confidentialité). */
export async function LegalPage({
  locale,
  title,
  updatedLabel,
  intro,
  sections,
  breadcrumbLabel,
}: {
  locale: Locale;
  title: string;
  updatedLabel: string;
  intro?: string;
  sections: Section[];
  breadcrumbLabel: string;
}) {
  const settings = await getSettings(locale);
  const format = await getFormatter();
  const values = {
    address: settings.address,
    city: settings.city,
    email: settings.email,
    phone: settings.phone,
    ice: settings.ice,
    rc: settings.rc,
  };

  // Date de dernière révision du contenu légal (mise à jour à chaque édition)
  const updatedAt = new Date('2026-07-14');

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale} items={[{ label: breadcrumbLabel }]} />
      </Container>
      <section className="py-10 sm:py-14">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">
            {updatedLabel}{' '}
            {format.dateTime(updatedAt, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {intro ? <p className="mt-6 leading-relaxed text-muted">{fill(intro, values)}</p> : null}
          <div className="mt-10 space-y-10">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">
                  {fill(section.text, values)}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
