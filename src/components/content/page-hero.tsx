import { CipherPattern } from '@/components/brand/cipher-pattern';
import { Container } from '@/components/ui/container';

/** Hero de page interne : eyebrow + H1 + intro sur fond discret. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface dark:bg-nuit">
      <CipherPattern
        aria-hidden
        className="pointer-events-none absolute -top-6 end-0 h-40 w-auto text-sarcelle/15 dark:text-sarcelle-vif/10"
      />
      <Container className="relative py-14 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sarcelle dark:text-sarcelle-vif">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
