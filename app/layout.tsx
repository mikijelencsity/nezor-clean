// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400','600','800','900'] });

export const metadata: Metadata = {
  title: 'NEZOR',
  description: 'NEZOR Webfejlesztés — Weboldal + Meta hirdetés',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
