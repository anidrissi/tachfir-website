import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/brand/logo';
import { CipherPattern } from '@/components/brand/cipher-pattern';
import { Link } from '@/i18n/navigation';
import type { StaticAppPathname, Locale } from '@/i18n/routing';
import { getSettings } from '@/lib/settings';

const SERVICE_LINKS: Array<{ href: StaticAppPathname; key: string }> = [
  { href: '/services/developpement-web-mobile', key: 'servicesDev' },
  { href: '/services/cybersecurite', key: 'servicesCyber' },
  { href: '/services/outsourcing-talents-it', key: 'servicesOutsourcing' },
  { href: '/services/fourniture-informatique', key: 'servicesSupply' },
  { href: '/expertises', key: 'servicesExpertises' },
  { href: '/formations', key: 'formations' },
];

const COMPANY_LINKS: Array<{ href: StaticAppPathname; key: string }> = [
  { href: '/a-propos', key: 'about' },
  { href: '/references', key: 'references' },
  { href: '/certifications', key: 'certifications' },
  { href: '/blog', key: 'blog' },
  { href: '/talents', key: 'talentsJoin' },
  { href: '/contact', key: 'contact' },
  { href: '/devis', key: 'quote' },
];

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const settings = await getSettings(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface dark:bg-nuit">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t('description')}
            </p>
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('linkedinAria')}
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z" />
              </svg>
            </a>
          </div>

          {/* Services */}
          <nav aria-label={t('colServices')}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('colServices')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Entreprise */}
          <nav aria-label={t('colCompany')}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('colCompany')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coordonnées (NAP) */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('colContact')}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {settings.address}
                  <br />
                  {settings.city}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span dir="ltr">{settings.phone}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {settings.email}
                </a>
              </li>
              <li className="pt-2 text-xs">
                {t('ice')} : <span dir="ltr">{settings.ice}</span>
                <br />
                {t('rc')} : <span dir="ltr">{settings.rc}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center text-sarcelle/30 dark:text-sarcelle-vif/20" aria-hidden="true">
          <CipherPattern className="h-8 w-auto" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} Tachfir — {t('rights')}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/mentions-legales"
                className="transition-colors hover:text-primary"
              >
                {t('legalNotice')}
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="transition-colors hover:text-primary"
              >
                {t('privacyPolicy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
