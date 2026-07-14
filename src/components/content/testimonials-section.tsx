import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Locale } from '@/i18n/routing';
import { getTestimonials } from '@/lib/content';

/** Témoignages clients (CMS) — placeholders [EN_ATTENTE] jusqu'à remplacement. */
export async function TestimonialsSection({
  locale,
  eyebrow,
  title,
  limit = 3,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  limit?: number;
}) {
  const testimonials = await getTestimonials(locale, limit);
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-surface py-16 dark:bg-nuit sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <Quote className="h-6 w-6 text-sarcelle dark:text-sarcelle-vif" aria-hidden />
              <blockquote className="mt-4 flex-1 leading-relaxed text-muted">
                « {item.quote} »
              </blockquote>
              <footer className="mt-5 border-t border-border pt-4">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-muted">
                  {[item.role, item.company].filter(Boolean).join(' — ')}
                </p>
              </footer>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
