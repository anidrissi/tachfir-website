import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CmsImage } from '@/components/content/cms-image';
import { RichText } from '@/components/content/rich-text';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SetAlternates } from '@/components/providers/alternates-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { company } from '@/config/company';
import { Link } from '@/i18n/navigation';
import { routing, type Locale, type StaticAppPathname } from '@/i18n/routing';
import { getLocalizedSlugs, getPostBySlug, getPosts } from '@/lib/content';
import { absoluteUrl, localizedPaths } from '@/lib/localized-path';
import { buildMetadata } from '@/lib/metadata';
import { decodeSlug } from '@/lib/params';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): Promise<Array<{ slug: string }>> {
  const posts = await getPosts(params.locale as Locale);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as Locale, decodeSlug(slug));
  if (!post) return {};

  const slugs = await getLocalizedSlugs('posts', post.id);
  const paramsByLocale = Object.fromEntries(
    routing.locales.filter((l) => slugs[l]).map((l) => [l, { slug: slugs[l] as string }]),
  );

  return buildMetadata({
    locale: locale as Locale,
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    pathname: '/blog/[slug]',
    paramsByLocale,
  });
}

/** Maillage interne : catégorie d'article → service lié. */
const CATEGORY_SERVICE: Record<string, StaticAppPathname> = {
  'marches-publics': '/services/fourniture-informatique',
  nearshore: '/services/conseil-it-nearshore',
  formation: '/formations',
  cybersecurite: '/services/cybersecurite',
  guides: '/services',
  actualites: '/services',
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug: rawSlug } = await params;
  setRequestLocale(locale);
  const slug = decodeSlug(rawSlug);

  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations('blogPage');
  const tn = await getTranslations('nav');
  const format = await getFormatter();

  const slugs = await getLocalizedSlugs('posts', post.id);
  const alternates = Object.fromEntries(
    routing.locales
      .filter((l) => slugs[l])
      .map((l) => [
        l,
        localizedPaths('/blog/[slug]', l as Locale, { slug: slugs[l] as string }).external,
      ]),
  );

  const url = absoluteUrl(company.siteUrl, '/blog/[slug]', locale as Locale, { slug });
  const cover =
    post.coverImage && typeof post.coverImage !== 'number' ? post.coverImage : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: post.author ?? company.name, url: company.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
      logo: { '@type': 'ImageObject', url: `${company.siteUrl}/brand/logo.svg` },
    },
    ...(cover?.url ? { image: [company.siteUrl + cover.url] } : {}),
  };

  const relatedService = CATEGORY_SERVICE[post.category] ?? '/services';

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <SetAlternates alternates={alternates} />

      <Container>
        <Breadcrumbs
          locale={locale as Locale}
          items={[{ label: tn('blog'), href: '/blog' }, { label: post.title }]}
        />
      </Container>

      <article className="pb-16">
        <header className="border-b border-border bg-surface py-12 dark:bg-nuit sm:py-16">
          <Container className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="teal">{t(`categories.${post.category}`)}</Badge>
              {post.publishedAt ? (
                <p className="text-sm text-muted">
                  {t('publishedOn')}{' '}
                  <time dateTime={post.publishedAt}>
                    {format.dateTime(new Date(post.publishedAt), {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.author ? ` — ${t('by')} ${post.author}` : null}
                </p>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          </Container>
        </header>

        {cover ? (
          <Container className="max-w-3xl">
            <div className="mt-10 overflow-hidden rounded-card border border-border">
              <CmsImage
                media={cover}
                size="hero"
                className="w-full object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </Container>
        ) : null}

        <Container className="max-w-3xl">
          <div className="mt-10">
            <RichText data={post.content} />
          </div>

          {/* Maillage interne : service lié + devis */}
          <aside className="mt-12 rounded-card border border-border bg-surface p-6 dark:bg-nuit">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              {t('related.title')}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link
                href={relatedService}
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                {t('related.service')}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
              <ButtonLink href="/devis" size="sm">
                {t('related.cta')}
              </ButtonLink>
            </div>
          </aside>

          <p className="mt-8">
            <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
              ← {t('backToBlog')}
            </Link>
          </p>
        </Container>
      </article>
    </>
  );
}
