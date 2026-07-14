import { z } from 'zod';

/**
 * Schémas de validation partagés client/serveur.
 * Les messages sont des CLÉS de forms.validation.* (traduites à l'affichage).
 */

const phoneRegex = /^\+?[\d\s().-]{8,20}$/;

export const QUOTE_TYPES = [
  'developpement',
  'cybersecurite',
  'conseil',
  'formation',
  'fourniture',
] as const;

export const QUOTE_BUDGETS = ['lt50k', '50to150k', '150to500k', 'gt500k', 'nd'] as const;
export const QUOTE_DEADLINES = ['urgent', '1to3', '3to6', 'flexible'] as const;

export const quoteSchema = z.object({
  type: z.enum(QUOTE_TYPES, 'required'),
  company: z.string().trim().min(1, 'required').max(200),
  sector: z.enum(['public', 'prive'], 'required'),
  ice: z.string().trim().max(30).optional().or(z.literal('')),
  name: z.string().trim().min(1, 'required').max(120),
  role: z.string().trim().min(1, 'required').max(120),
  email: z.email('email'),
  phone: z.string().trim().regex(phoneRegex, 'phone'),
  description: z.string().trim().min(10, 'minMessage').max(5000),
  budget: z.enum(QUOTE_BUDGETS, 'required'),
  deadline: z.enum(QUOTE_DEADLINES, 'required'),
  consent: z.literal(true, 'consent'),
  /** Honeypot : rempli par les robots → traité silencieusement côté serveur */
  website: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'required').max(120),
  email: z.email('email'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'phone')
    .optional()
    .or(z.literal('')),
  message: z.string().trim().min(10, 'minMessage').max(5000),
  consent: z.literal(true, 'consent'),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Contraintes de la pièce jointe (devis / bon de commande). */
export const FILE_MAX_BYTES = 10 * 1024 * 1024; // 10 Mo
export const FILE_ACCEPT = 'application/pdf,image/*';

export function isAllowedFileType(mime: string): boolean {
  return mime === 'application/pdf' || mime.startsWith('image/');
}
