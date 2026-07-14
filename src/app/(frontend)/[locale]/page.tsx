import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: string }> };

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('home.hero');

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">{t('title')}</h1>
        <p className="mt-6 text-lg text-muted">{t('subtitle')}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/devis"
            className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-cobalt-deep"
          >
            {t('ctaQuote')}
          </Link>
          <Link
            href="/services"
            className="rounded-md border border-border px-6 py-3 font-semibold transition-colors hover:bg-surface"
          >
            {t('ctaServices')}
          </Link>
        </div>
      </div>
    </main>
  );
}
