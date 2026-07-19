'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import type { StaticAppPathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type NavChild = { href: StaticAppPathname; label: string };

const SERVICE_CHILDREN: Array<{ href: StaticAppPathname; key: string }> = [
  { href: '/services/developpement-web-mobile', key: 'servicesDev' },
  { href: '/services/cybersecurite', key: 'servicesCyber' },
  { href: '/services/outsourcing-talents-it', key: 'servicesOutsourcing' },
  { href: '/services/fourniture-informatique', key: 'servicesSupply' },
  { href: '/expertises', key: 'servicesExpertises' },
];

function useCloseOnOutsideOrEscape(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);
  return ref;
}

/** Navigation desktop : liens + menu déroulant Services. */
export function DesktopNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useCloseOnOutsideOrEscape(servicesOpen, () => setServicesOpen(false));

  const linkClass = (active: boolean) =>
    cn(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
      active ? 'text-primary' : 'text-foreground',
    );

  const isServices = pathname.startsWith('/services');

  return (
    <nav aria-label={t('mainNavAria')} className="hidden items-center gap-1 lg:flex">
      <Link href="/" className={linkClass(pathname === '/')}>
        {t('home')}
      </Link>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setServicesOpen((v) => !v)}
          aria-expanded={servicesOpen}
          aria-haspopup="menu"
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
            isServices ? 'text-primary' : 'text-foreground',
          )}
        >
          {t('services')}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
            aria-hidden
          />
        </button>
        {servicesOpen ? (
          <ul
            role="menu"
            className="absolute start-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-md border border-border bg-card py-1.5 shadow-lg"
          >
            {SERVICE_CHILDREN.map(({ href, key }) => (
              <li key={href} role="none">
                <Link
                  role="menuitem"
                  href={href}
                  onClick={() => setServicesOpen(false)}
                  className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-surface hover:text-primary"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li role="none" className="mt-1 border-t border-border pt-1">
              <Link
                role="menuitem"
                href="/services"
                onClick={() => setServicesOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-surface"
              >
                {t('servicesHub')}
              </Link>
            </li>
          </ul>
        ) : null}
      </div>

      <Link href="/formations" className={linkClass(pathname.startsWith('/formations'))}>
        {t('formations')}
      </Link>
      <Link href="/references" className={linkClass(pathname === '/references')}>
        {t('references')}
      </Link>
      <Link href="/blog" className={linkClass(pathname.startsWith('/blog'))}>
        {t('blog')}
      </Link>
      <Link href="/contact" className={linkClass(pathname === '/contact')}>
        {t('contact')}
      </Link>
    </nav>
  );
}

/** Navigation mobile : panneau déroulant plein écran. */
export function MobileNav() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const items: NavChild[] = [
    { href: '/', label: t('home') },
    ...SERVICE_CHILDREN.map(({ href, key }) => ({ href, label: t(key) })),
    { href: '/services', label: t('servicesHub') },
    { href: '/formations', label: t('formations') },
    { href: '/references', label: t('references') },
    { href: '/certifications', label: t('certifications') },
    { href: '/blog', label: t('blog') },
    { href: '/a-propos', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={tc('menu')}
        className="rounded-md p-2 text-foreground transition-colors hover:bg-surface"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="font-display text-lg font-bold">TACHFIR</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tc('closeMenu')}
              className="rounded-md p-2 transition-colors hover:bg-surface"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav aria-label={t('mainNavAria')} className="overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {items.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/devis"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground"
                >
                  {tc('ctaQuote')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
