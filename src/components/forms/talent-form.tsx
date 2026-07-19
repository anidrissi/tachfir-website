'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { CheckCircle2, LoaderCircle, Paperclip, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Select, TextInput } from '@/components/forms/fields';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import {
  CV_ACCEPT,
  FILE_MAX_BYTES,
  isAllowedCvType,
  TALENT_SENIORITIES,
  talentSchema,
  type TalentInput,
} from '@/lib/schemas';

export type ExpertiseOption = { value: string; label: string };

export function TalentForm({ expertises }: { expertises: ExpertiseOption[] }) {
  const t = useTranslations('forms.talent');
  const tv = useTranslations('forms.validation');
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const defaultExpertise = expertises[0]?.value ?? 'other';
  const [showOther, setShowOther] = useState(defaultExpertise === 'other');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TalentInput>({
    resolver: standardSchemaResolver(talentSchema),
    defaultValues: { seniority: 'confirme', expertise: defaultExpertise, website: '' },
  });

  const err = (key?: string) => (key ? tv(key) : undefined);
  const expertiseReg = register('expertise');

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
    if (!isAllowedCvType(f.type)) {
      setFileError(tv('cvType'));
      setFile(null);
      return;
    }
    setFile(f);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (fileError) return;
    if (!file) {
      setFileError(tv('cvRequired'));
      return;
    }
    setStatus('sending');
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(values)) {
        data.append(key, String(value ?? ''));
      }
      data.append('cv', file, file.name);

      const res = await fetch('/api/talents', { method: 'POST', body: data });
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
        <CheckCircle2
          className="mx-auto h-10 w-10 text-sarcelle dark:text-sarcelle-vif"
          aria-hidden
        />
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
          label={t('fullName.label')}
          htmlFor={`${id}-fullName`}
          required
          error={err(errors.fullName?.message)}
        >
          <TextInput
            id={`${id}-fullName`}
            placeholder={t('fullName.placeholder')}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
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

      <div className="grid gap-5 sm:grid-cols-2">
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
        <Field
          label={t('linkedin.label')}
          htmlFor={`${id}-linkedin`}
          error={err(errors.linkedin?.message)}
        >
          <TextInput
            id={`${id}-linkedin`}
            dir="ltr"
            placeholder={t('linkedin.placeholder')}
            {...register('linkedin')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('expertise.label')}
          htmlFor={`${id}-expertise`}
          required
          error={err(errors.expertise?.message)}
        >
          <Select
            id={`${id}-expertise`}
            {...expertiseReg}
            onChange={(e) => {
              void expertiseReg.onChange(e);
              setShowOther(e.target.value === 'other');
            }}
          >
            {expertises.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            <option value="other">{t('expertise.other')}</option>
          </Select>
        </Field>
        <Field
          label={t('seniority.label')}
          htmlFor={`${id}-seniority`}
          required
          error={err(errors.seniority?.message)}
        >
          <Select id={`${id}-seniority`} {...register('seniority')}>
            {TALENT_SENIORITIES.map((value) => (
              <option key={value} value={value}>
                {t(`seniority.options.${value}`)}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {showOther ? (
        <Field
          label={t('expertiseOther.label')}
          htmlFor={`${id}-expertiseOther`}
          error={err(errors.expertiseOther?.message)}
        >
          <TextInput
            id={`${id}-expertiseOther`}
            placeholder={t('expertiseOther.placeholder')}
            {...register('expertiseOther')}
          />
        </Field>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('availability.label')}
          htmlFor={`${id}-availability`}
          error={err(errors.availability?.message)}
        >
          <TextInput
            id={`${id}-availability`}
            placeholder={t('availability.placeholder')}
            {...register('availability')}
          />
        </Field>
        <Field
          label={t('remote.label')}
          htmlFor={`${id}-remote`}
          error={err(errors.remote?.message)}
        >
          <TextInput
            id={`${id}-remote`}
            placeholder={t('remote.placeholder')}
            {...register('remote')}
          />
        </Field>
      </div>

      {/* CV (PDF, requis) */}
      <div>
        <p className="mb-1.5 text-sm font-semibold">
          {t('cv.label')} <span className="text-red-600 dark:text-red-400">*</span>
        </p>
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
              aria-label={t('cv.remove')}
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
            id={`${id}-cv`}
            type="file"
            accept={CV_ACCEPT}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            className="block w-full cursor-pointer rounded-md border border-dashed border-border bg-card px-3.5 py-3 text-sm text-muted file:me-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
          />
        )}
        <p className="mt-1.5 text-xs text-muted">{t('cv.hint')}</p>
        {fileError ? (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {fileError}
          </p>
        ) : null}
      </div>

      {/* Consentement */}
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
        <p
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
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
