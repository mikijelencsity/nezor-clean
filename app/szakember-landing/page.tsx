import type { Metadata } from 'next';
import { SzakemberPage } from '@/components/szakember-landing/SzakemberPage';

export const metadata: Metadata = {
  title: 'Kész weboldal szakembereknek — 50.000 Ft, 24 órán belül | NEZOR',
  description: 'Kész weboldalak vízszerelőknek, tetőfedőknek és festőknek: 120.000 helyett 50.000 Ft, 24 órán belül a te nevedre szabva.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SzakemberLandingRoute() {
  return <SzakemberPage />;
}
