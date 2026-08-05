import type { Metadata } from 'next';
import { HeroVariaciok } from '@/components/landing/HeroVariaciok';

export const metadata: Metadata = {
  title: 'Hero variációk — belső nézet',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HeroVariaciokRoute() {
  return <HeroVariaciok />;
}
