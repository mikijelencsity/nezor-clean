import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export const FROM_EMAIL = "NEZOR <info@nezor.hu>";
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "miklosjelencsity@gmail.com";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
