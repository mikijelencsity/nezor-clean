import type { Metadata } from 'next';
import { Landing2Page } from '@/components/landing2/Landing2Page';

export const metadata: Metadata = {
  title: 'Kérj egy valódi kampánypéldát — NEZOR',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Landing2Route() {
  return <Landing2Page />;
}
