import { getFormatter, getTranslations } from 'next-intl/server';
import { CmsImage } from '@/components/content/cms-image';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import type { Post } from '@/payload-types';

/** Carte article de blog. */
export async function PostCard({ post }: { post: Post }) {
  const t = await getTranslations('blogPage');
  const format = await getFormatter();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {post.coverImage && typeof post.coverImage !== 'number' ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface">
          <CmsImage
            media={post.coverImage}
            size="card"
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <Badge tone="teal">{t(`categories.${post.category}`)}</Badge>
          {post.publishedAt ? (
            <time dateTime={post.publishedAt} className="text-xs text-muted">
              {format.dateTime(new Date(post.publishedAt), {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug">
          <Link
            href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
            className="after:absolute after:inset-0 group-hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
