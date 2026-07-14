import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/ui/container';
import { whatsappHref } from '@/config/company';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { getSettings } from '@/lib/settings';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'contact', '/contact');
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contactPage');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const settings = await getSettings(locale as Locale);

  const waLink = whatsappHref(settings.whatsapp, tc('whatsappMessage'));

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('contact') }]} />
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
          {/* Formulaire (étape formulaires) */}
          <div id="formulaire">
            {/* Le composant ContactForm est branché à l'étape « Formulaires & API ». */}
          </div>

          {/* NAP */}
          <aside className="order-first lg:order-none">
            <div className="rounded-card border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-bold">{t('info.title')}</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-semibold">{t('info.address')}</p>
                    <p className="text-muted">
                      {settings.address}
                      <br />
                      {settings.city}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-semibold">{t('info.phone')}</p>
                    <p className="text-muted" dir="ltr">
                      {settings.phone}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-semibold">{t('info.email')}</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-muted transition-colors hover:text-primary"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
                {waLink ? (
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4 w-4 shrink-0 fill-[#25D366]"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    <div>
                      <p className="font-semibold">{t('info.whatsapp')}</p>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-primary"
                        dir="ltr"
                      >
                        {settings.whatsapp}
                      </a>
                    </div>
                  </li>
                ) : null}
              </ul>
              <p className="mt-5 rounded-md border border-dashed border-border bg-surface px-3 py-2 text-xs text-muted">
                {t('info.mapPending')}
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
