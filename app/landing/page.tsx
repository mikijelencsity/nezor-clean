import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'NEZOR — Hogyan szerezz több megrendelőt online?',
};

export default function LandingRoute() {
  return <LandingPage />;
}
