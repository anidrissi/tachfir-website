'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const inputBase =
  'w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-primary aria-[invalid=true]:border-red-500';

export function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required ? (
          <span className="text-red-500" aria-hidden>
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(inputBase, className)} {...props} />;
}

export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(inputBase, 'min-h-32 resize-y', className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(inputBase, 'appearance-none', className)} {...props}>
      {children}
    </select>
  );
}
