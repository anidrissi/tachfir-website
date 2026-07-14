import { cn } from '@/lib/utils';

/**
 * Marque « bloc chiffré » : trois carrés pleins + un losange accent —
 * un bloc de données sur quatre est chiffré (tachfir = تشفير).
 * Wordmark temporaire en attendant le logo définitif (voir TODO-CLIENT.md).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('h-8 w-8', className)}
    >
      <rect x="2" y="2" width="12" height="12" rx="3" className="fill-abysse dark:fill-brume" />
      <rect x="18" y="2" width="12" height="12" rx="3" className="fill-abysse dark:fill-brume" />
      <rect x="2" y="18" width="12" height="12" rx="3" className="fill-abysse dark:fill-brume" />
      <rect
        x="19"
        y="19"
        width="10"
        height="10"
        rx="2.5"
        className="fill-sarcelle dark:fill-sarcelle-vif"
        transform="rotate(45 24 24)"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        TACHFIR
      </span>
    </span>
  );
}
