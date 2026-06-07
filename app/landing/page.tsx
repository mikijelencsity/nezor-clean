import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'NEZOR — Hogyan szerezz több megrendelőt online?',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingRoute() {
  return <LandingPage />;
}
