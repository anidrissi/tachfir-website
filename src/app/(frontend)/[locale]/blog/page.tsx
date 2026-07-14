import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/content/page-hero';
import { PostCard } from '@/components/content/post-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/routing';
import { getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'blog', '/blog');
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blogPage');
  const tn = await getTranslations('nav');

  const posts = await getPosts(locale as Locale);

  return (
    <>
      <Container>
        <Breadcrumbs locale={locale as Locale} items={[{ label: tn('blog') }]} />
      </Container>

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} intro={t('hero.intro')} />

      <section className="py-14 sm:py-20">
        <Container>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center text-muted">
              {t('empty')}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
