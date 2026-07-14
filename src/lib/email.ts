import { Resend } from 'resend';

export type MailAttachment = {
  filename: string;
  content: Buffer;
};

export type Mail = {
  subject: string;
  text: string;
  replyTo?: string;
  attachment?: MailAttachment;
};

/**
 * Envoi d'email via Resend. Sans RESEND_API_KEY (dev), le message est
 * affiché dans la console et l'envoi est considéré réussi.
 */
export async function sendMail(mail: Mail): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? 'contact@tachfir.com';
  const from = process.env.EMAIL_FROM ?? 'Tachfir <onboarding@resend.dev>';

  if (!apiKey) {
    console.info(
      `\n=== EMAIL (mode dev, RESEND_API_KEY absent) ===\nÀ: ${to}\nDe: ${from}\nRépondre à: ${mail.replyTo ?? '—'}\nSujet: ${mail.subject}\n---\n${mail.text}\n---\nPièce jointe: ${mail.attachment ? `${mail.attachment.filename} (${mail.attachment.content.length} octets)` : 'aucune'}\n=== FIN EMAIL ===\n`,
    );
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      attachments: mail.attachment
        ? [
            {
              filename: mail.attachment.filename,
              content: mail.attachment.content.toString('base64'),
            },
          ]
        : undefined,
    });
    if (error) {
      console.error('Resend a refusé l’envoi :', error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error('Envoi email en échec :', err);
    return { ok: false };
  }
}
