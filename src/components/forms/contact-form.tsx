'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, TextArea, TextInput } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { contactSchema, type ContactInput } from '@/lib/schemas';

export function ContactForm() {
  const t = useTranslations('forms.contact');
  const tv = useTranslations('forms.validation');
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: standardSchemaResolver(contactSchema),
    defaultValues: { website: '' },
  });

  const err = (key?: string) => (key ? tv(key) : undefined);

  const onSubmit = handleSubmit(async (values) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  });

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-card border border-sarcelle/40 bg-sarcelle/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-sarcelle dark:text-sarcelle-vif" aria-hidden />
        <h2 className="mt-4 text-xl font-bold">{t('success.title')}</h2>
        <p className="mt-2 text-muted">{t('success.text')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — invisible pour les humains */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('name.label')}
          htmlFor={`${id}-name`}
          required
          error={err(errors.name?.message)}
        >
          <TextInput
            id={`${id}-name`}
            placeholder={t('name.placeholder')}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
        </Field>
        <Field
          label={t('email.label')}
          htmlFor={`${id}-email`}
          required
          error={err(errors.email?.message)}
        >
          <TextInput
            id={`${id}-email`}
            type="email"
            dir="ltr"
            placeholder={t('email.placeholder')}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <Field label={t('phone.label')} htmlFor={`${id}-phone`} error={err(errors.phone?.message)}>
        <TextInput
          id={`${id}-phone`}
          type="tel"
          dir="ltr"
          placeholder={t('phone.placeholder')}
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone')}
        />
      </Field>

      <Field
        label={t('message.label')}
        htmlFor={`${id}-message`}
        required
        error={err(errors.message?.message)}
      >
        <TextArea
          id={`${id}-message`}
          placeholder={t('message.placeholder')}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--primary)]"
            aria-invalid={Boolean(errors.consent)}
            {...register('consent')}
          />
          <span>
            {t('consent')}{' '}
            <Link href="/politique-confidentialite" className="text-primary underline">
              →
            </Link>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {tv('consent')}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {t('error')}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>
    </form>
  );
}
