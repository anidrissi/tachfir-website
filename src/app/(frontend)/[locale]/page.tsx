import type { Metadata } from 'next';
import {
  Code2,
  GraduationCap,
  PackageSearch,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CipherPattern } from '@/components/brand/cipher-pattern';
import { ClientsBand } from '@/components/content/clients-band';
import { CtaBanner } from '@/components/content/cta-banner';
import { FormationCard } from '@/components/content/formation-card';
import { PostCard } from '@/components/content/post-card';
import { TestimonialsSection } from '@/components/content/testimonials-section';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { company } from '@/config/company';
import { Link } from '@/i18n/navigation';
import type { Locale, StaticAppPathname } from '@/i18n/routing';
import { getFormations, getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'home', '/');
}

const POLES: Array<{
  key: 'dev' | 'cyber' | 'consulting' | 'formation';
  href: StaticAppPathname;
  icon: typeof Code2;
}> = [
  { key: 'dev', href: '/services/developpement-web-mobile', icon: Code2 },
  { key: 'cyber', href: '/services/cybersecurite', icon: ShieldCheck },
  { key: 'consulting', href: '/services/outsourcing-talents-it', icon: Users },
  { key: 'formation', href: '/formations', icon: GraduationCap },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const [formations, posts] = await Promise.all([
    getFormations(locale as Locale, 3),
    getPosts(locale as Locale, 3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface dark:bg-nuit">
        <CipherPattern
          aria-hidden
          className="pointer-events-none absolute -top-8 end-0 h-64 w-auto text-sarcelle/15 dark:text-sarcelle-vif/10"
        />
        <CipherPattern
          aria-hidden
          className="pointer-events-none absolute -bottom-10 start-0 hidden h-48 w-auto text-cobalt/10 dark:text-cobalt/15 lg:block"
        />
        <Container className="relative py-20 sm:py-28">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-sarcelle dark:text-sarcelle-vif">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/devis" size="lg">
              {t('hero.ctaQuote')}
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              {t('hero.ctaServices')}
            </ButtonLink>
          </div>
          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
            {(
              [
                [company.stats.clients, t('stats.clients')],
                [company.stats.projects, t('stats.projects')],
                [company.stats.experts, t('stats.experts')],
              ] as const
            ).map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-4xl font-bold text-primary">
                  {value}
                  <span className="text-sarcelle dark:text-sarcelle-vif">+</span>
                </dd>
                <dd className="mt-1 text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Logos clients (CMS) */}
      <ClientsBand title={t('clients.title')} />

      {/* 4 pôles */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('poles.eyebrow')}
            title={t('poles.title')}
            intro={t('poles.intro')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POLES.map(({ key, href, icon: Icon }) => (
              <Card key={key} className="group relative flex flex-col">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold">{t(`poles.${key}.title`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`poles.${key}.text`)}
                </p>
                <Link
                  href={href}
                  className="mt-4 text-sm font-semibold text-primary after:absolute after:inset-0 group-hover:underline"
                >
                  {t('poles.more')}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Bandeau certifications */}
      <section className="bg-abysse py-16 text-white dark:bg-surface sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sarcelle-vif">
              {t('certifications.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-white dark:text-foreground sm:text-4xl">
              {t('certifications.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-white/75 dark:text-muted">
              {t('certifications.text')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.certifications.slice(0, 6).map((cert) => (
                <Badge key={cert} tone="teal" className="bg-white/10 text-sarcelle-vif">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
          <ButtonLink
            href="/certifications"
            variant="outline"
            size="lg"
            className="justify-self-start border-white/30 text-white hover:border-sarcelle-vif hover:text-sarcelle-vif dark:border-border dark:text-foreground lg:justify-self-end"
          >
            {t('certifications.cta')}
          </ButtonLink>
        </Container>
      </section>

      {/* Témoignages (CMS) */}
      <TestimonialsSection
        locale={locale as Locale}
        eyebrow={t('testimonials.eyebrow')}
        title={t('testimonials.title')}
      />

      {/* Aperçu formations (CMS) */}
      {formations.length > 0 ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t('formations.eyebrow')}
              title={t('formations.title')}
              intro={t('formations.intro')}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <ButtonLink href="/formations" variant="outline">
                {t('formations.cta')}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Bloc fourniture IT */}
      <section className="border-y border-border bg-surface py-16 dark:bg-nuit sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <span className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-ambre/15 text-ambre lg:inline-flex">
            <PackageSearch className="h-8 w-8" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-ambre">
              {t('supply.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              {t('supply.title')}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t('supply.text')}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <ButtonLink href="/devis">{t('supply.cta')}</ButtonLink>
              <ButtonLink href="/services/fourniture-informatique" variant="outline">
                {t('supply.ctaSecondary')}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Derniers articles (CMS) */}
      {posts.length > 0 ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow={t('posts.eyebrow')} title={t('posts.title')} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <ButtonLink href="/blog" variant="outline">
                {t('posts.cta')}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      {/* CTA final */}
      <CtaBanner
        locale={locale as Locale}
        title={t('finalCta.title')}
        text={t('finalCta.text')}
        ctaLabel={t('finalCta.cta')}
        secondaryLabel={t('finalCta.ctaAlt')}
        secondaryHref="/contact"
      />
    </>
  );
}
