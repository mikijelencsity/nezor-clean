import type { Metadata } from 'next';
import { NotFoundPage } from '@/components/not-found/NotFoundPage';

export const metadata: Metadata = {
  title: '404 — Ez az oldal nem létezik | NEZOR',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
