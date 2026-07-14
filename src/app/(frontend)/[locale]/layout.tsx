import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { AlternatesProvider } from '@/components/providers/alternates-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { company } from '@/config/company';
import { fontVariables } from '@/lib/fonts';
import { routing, type Locale } from '@/i18n/routing';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    template: '%s | Tachfir',
    default: 'Tachfir — Building Trust through Secure Tech',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050f1c' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('common');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AlternatesProvider>
              <a
                href="#content"
                className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                {t('skipToContent')}
              </a>
              <Header />
              <main id="content" className="flex flex-1 flex-col">
                {children}
              </main>
              <Footer locale={locale as Locale} />
              <WhatsAppButton locale={locale as Locale} />
            </AlternatesProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
