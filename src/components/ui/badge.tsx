import { cn } from '@/lib/utils';

type Tone = 'teal' | 'amber' | 'blue' | 'neutral';

const tones: Record<Tone, string> = {
  teal: 'bg-sarcelle/10 text-sarcelle dark:bg-sarcelle-vif/10 dark:text-sarcelle-vif',
  amber: 'bg-ambre/10 text-ambre',
  blue: 'bg-cobalt/10 text-cobalt dark:bg-cobalt/25 dark:text-brume',
  neutral: 'bg-surface text-muted',
};

export function Badge({
  tone = 'teal',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
