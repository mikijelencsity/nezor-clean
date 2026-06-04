import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';

export const metadata: Metadata = {
  title: 'NEZOR — Weboldal + Meta hirdetés',
};

export default function Page() {
  return <HomePage />;
}
