import type { Metadata } from 'next';
import { SzakemberPage } from '@/components/szakember-landing/SzakemberPage';

export const metadata: Metadata = {
  title: 'Ügyfélszerzés szakembereknek — 39.500 Ft az első hónapban | NEZOR',
  description: 'Landing oldal + élő hirdetési kampány vízszerelőknek, tetőfedőknek, festőknek: új ügyfeleket hozunk 30 nap alatt, vagy visszakapod a hirdetéskezelési díjat.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SzakemberLandingRoute() {
  return <SzakemberPage />;
}
