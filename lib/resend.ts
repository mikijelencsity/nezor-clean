import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY || 'dummy-key-for-build';
export const resend = new Resend(apiKey);

export const FROM_EMAIL = 'NEZOR <info@nezor.hu>';
export const NOTIFY_EMAIL = 'miklosjelencsity@gmail.com';
