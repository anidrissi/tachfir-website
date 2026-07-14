'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { CheckCircle2, LoaderCircle, Paperclip, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Select, TextArea, TextInput } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import {
  FILE_ACCEPT,
  FILE_MAX_BYTES,
  isAllowedFileType,
  QUOTE_BUDGETS,
  QUOTE_DEADLINES,
  QUOTE_TYPES,
  quoteSchema,
  type QuoteInput,
} from '@/lib/schemas';

type QuoteType = (typeof QUOTE_TYPES)[number];

export function QuoteForm() {
  const t = useTranslations('forms.quote');
  const tv = useTranslations('forms.validation');
  const id = useId();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preselected = searchParams.get('type');
  const defaultType: QuoteType = (QUOTE_TYPES as readonly string[]).includes(preselected ?? '')
    ? (preselected as QuoteType)
    : 'developpement';

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: standardSchemaResolver(quoteSchema),
    defaultValues: { type: defaultType, sector: 'public', website: '', ice: '' },
  });

  const err = (key?: string) => (key ? tv(key) : undefined);

  const onFileChange = (f: File | null) => {
    setFileError(null);
    if (!f) {
      setFile(null);
      return;
    }
    if (f.size > FILE_MAX_BYTES) {
      setFileError(tv('fileSize'));
      setFile(null);
      return;
    }
    if (!isAllowedFileType(f.type)) {
      setFileError(tv('fileType'));
      setFile(null);
      return;
    }
    setFile(f);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (fileError) return;
    setStatus('sending');
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(values)) {
        data.append(key, String(value ?? ''));
      }
      if (file) data.append('file', file, file.name);

      const res = await fetch('/api/quote', { method: 'POST', body: data });
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
      <h2 className="text-xl font-bold">{t('title')}</h2>

      {/* Honeypot */}
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
          label={t('type.label')}
          htmlFor={`${id}-type`}
          required
          error={err(errors.type?.message)}
        >
          <Select id={`${id}-type`} {...register('type')}>
            {QUOTE_TYPES.map((value) => (
              <option key={value} value={value}>
                {t(`type.options.${value}`)}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label={t('sector.label')}
          htmlFor={`${id}-sector`}
          required
          error={err(errors.sector?.message)}
        >
          <Select id={`${id}-sector`} {...register('sector')}>
            <option value="public">{t('sector.options.public')}</option>
            <option value="prive">{t('sector.options.prive')}</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('company.label')}
          htmlFor={`${id}-company`}
          required
          error={err(errors.company?.message)}
        >
          <TextInput
            id={`${id}-company`}
            placeholder={t('company.placeholder')}
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            {...register('company')}
          />
        </Field>
        <Field label={t('ice.label')} htmlFor={`${id}-ice`} error={err(errors.ice?.message)}>
          <TextInput
            id={`${id}-ice`}
            dir="ltr"
            placeholder={t('ice.placeholder')}
            aria-invalid={Boolean(errors.ice)}
            {...register('ice')}
          />
        </Field>
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
          label={t('role.label')}
          htmlFor={`${id}-role`}
          required
          error={err(errors.role?.message)}
        >
          <TextInput
            id={`${id}-role`}
            placeholder={t('role.placeholder')}
            autoComplete="organization-title"
            aria-invalid={Boolean(errors.role)}
            {...register('role')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
        <Field
          label={t('phone.label')}
          htmlFor={`${id}-phone`}
          required
          error={err(errors.phone?.message)}
        >
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
      </div>

      <Field
        label={t('description.label')}
        htmlFor={`${id}-description`}
        required
        error={err(errors.description?.message)}
      >
        <TextArea
          id={`${id}-description`}
          placeholder={t('description.placeholder')}
          aria-invalid={Boolean(errors.description)}
          {...register('description')}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('budget.label')}
          htmlFor={`${id}-budget`}
          required
          error={err(errors.budget?.message)}
        >
          <Select id={`${id}-budget`} defaultValue="nd" {...register('budget')}>
            {QUOTE_BUDGETS.map((value) => (
              <option key={value} value={value}>
                {t(`budget.options.${value}`)}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label={t('deadline.label')}
          htmlFor={`${id}-deadline`}
          required
          error={err(errors.deadline?.message)}
        >
          <Select id={`${id}-deadline`} defaultValue="flexible" {...register('deadline')}>
            {QUOTE_DEADLINES.map((value) => (
              <option key={value} value={value}>
                {t(`deadline.options.${value}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {/* Pièce jointe */}
      <div>
        <p className="mb-1.5 text-sm font-semibold">{t('file.label')}</p>
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <Paperclip className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-muted">
                ({(file.size / 1024 / 1024).toFixed(1)} Mo)
              </span>
            </span>
            <button
              type="button"
              aria-label={t('file.remove')}
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="rounded p-1 text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : (
          <input
            ref={fileInputRef}
            id={`${id}-file`}
            type="file"
            accept={FILE_ACCEPT}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            className="block w-full cursor-pointer rounded-md border border-dashed border-border bg-card px-3.5 py-3 text-sm text-muted file:me-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
          />
        )}
        <p className="mt-1.5 text-xs text-muted">{t('file.hint')}</p>
        {fileError ? (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {fileError}
          </p>
        ) : null}
      </div>

      {/* Consentement Loi 09-08 */}
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
