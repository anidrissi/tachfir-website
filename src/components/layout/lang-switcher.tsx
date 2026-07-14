'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAlternates } from '@/components/providers/alternates-provider';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LangSwitcher() {
  const t = useTranslations('lang');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const { alternates } = useAlternates();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        <Languages className="h-4 w-4" aria-hidden />
        <span className="sr-only">{t('label')} : </span>
        <span className="uppercase">{locale}</span>
      </button>
      {open ? (
        <ul
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-md border border-border bg-card py-1 shadow-lg"
        >
          {routing.locales.map((l) => {
            const isActive = l === locale;
            const override = alternates?.[l];
            const label = t(l);
            const itemClass = cn(
              'block px-4 py-2 text-sm transition-colors hover:bg-surface',
              isActive ? 'font-semibold text-primary' : 'text-foreground',
            );
            return (
              <li key={l} role="none">
                {override ? (
                  <NextLink
                    role="menuitem"
                    href={override}
                    hrefLang={l}
                    lang={l}
                    className={itemClass}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NextLink>
                ) : (
                  <Link
                    role="menuitem"
                    // @ts-expect-error — pathname interne + params dynamiques restitués tels quels
                    href={{ pathname, params }}
                    locale={l as Locale}
                    hrefLang={l}
                    lang={l}
                    className={itemClass}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
