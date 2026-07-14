import { Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CipherPattern } from '@/components/brand/cipher-pattern';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import type { StaticAppPathname, Locale } from '@/i18n/routing';
import { getSettings } from '@/lib/settings';

/**
 * Bandeau CTA final : fond marine, bouton principal + bandeau de
 * réassurance (« Réponse sous 24-48 h », éditable via le CMS).
 */
export async function CtaBanner({
  locale,
  title,
  text,
  ctaLabel,
  ctaHref = '/devis',
  secondaryLabel,
  secondaryHref,
}: {
  locale: Locale;
  title: string;
  text?: string;
  ctaLabel: string;
  ctaHref?: StaticAppPathname;
  secondaryLabel?: string;
  secondaryHref?: StaticAppPathname;
}) {
  const t = await getTranslations('common');
  const settings = await getSettings(locale);
  const banner = settings.responseBanner ?? t('responseTime');

  return (
    <section className="relative overflow-hidden bg-abysse py-16 text-white dark:bg-surface sm:py-20">
      <CipherPattern
        aria-hidden
        className="pointer-events-none absolute -bottom-4 start-6 h-32 w-auto text-sarcelle-vif/15"
      />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white dark:text-foreground sm:text-4xl">
          {title}
        </h2>
        {text ? (
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75 dark:text-muted">{text}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={ctaHref} size="lg">
            {ctaLabel}
          </ButtonLink>
          {secondaryLabel && secondaryHref ? (
            <ButtonLink
              href={secondaryHref}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:border-sarcelle-vif hover:text-sarcelle-vif dark:border-border dark:text-foreground"
            >
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sarcelle-vif">
          <Clock className="h-4 w-4" aria-hidden />
          {banner}
        </p>
      </Container>
    </section>
  );
}
