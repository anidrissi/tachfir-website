import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { cn } from '@/lib/utils';

/**
 * Rendu du contenu riche Lexical (CMS) avec la typographie du site.
 * RTL-safe : listes/citations en propriétés logiques (voir globals.css).
 */
export function RichText({
  data,
  className,
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  return (
    <LexicalRichText
      data={data}
      className={cn(
        'prose prose-slate max-w-none dark:prose-invert',
        'prose-headings:font-display prose-a:text-primary prose-strong:text-foreground',
        className,
      )}
    />
  );
}
