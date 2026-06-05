import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY || 'dummy-key-for-build';
export const resend = new Resend(apiKey);

export const FROM_EMAIL = 'NEZOR <info@nezor.hu>';
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'miklosjelencsity@gmail.com';

/** HTML-escape user input to prevent injection in email templates */
export function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
