import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-primary" aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{t('title')}</h1>
      <p className="mt-3 max-w-md text-muted">{t('description')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-cobalt-deep"
        >
          {t('backHome')}
        </Link>
        <Link
          href="/services"
          className="rounded-md border border-border px-5 py-2.5 font-semibold transition-colors hover:bg-surface"
        >
          {t('services')}
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border px-5 py-2.5 font-semibold transition-colors hover:bg-surface"
        >
          {t('contact')}
        </Link>
      </div>
    </main>
  );
}
