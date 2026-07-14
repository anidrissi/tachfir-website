import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/brand/logo';
import { DesktopNav, MobileNav } from '@/components/layout/main-nav';
import { LangSwitcher } from '@/components/layout/lang-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { ButtonLink } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export async function Header() {
  const t = await getTranslations('common');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t('brandLatin')} className="shrink-0">
          <Logo />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-1.5">
          <LangSwitcher />
          <ThemeToggle />
          <ButtonLink href="/devis" size="sm" className="hidden sm:inline-flex">
            {t('ctaQuote')}
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
