import { ChevronDown } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export type FaqItem = { q: string; a: string };

/**
 * FAQ accessible sans JavaScript (details/summary) + schema.org FAQPage.
 */
export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <JsonLd data={jsonLd} />
        <SectionHeading title={title} align="start" />
        <div className="mt-8 divide-y divide-border rounded-card border border-border bg-card">
          {items.map((item, i) => (
            <details key={i} className="group px-5 py-4 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
