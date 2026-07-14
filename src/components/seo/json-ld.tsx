/**
 * Injecte un bloc JSON-LD (schema.org) de façon sûre.
 * `<` est échappé pour empêcher toute injection de balise.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
