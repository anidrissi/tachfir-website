import { cn } from '@/lib/utils';

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-card border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
