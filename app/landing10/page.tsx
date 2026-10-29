import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import { Landing10Page } from '@/components/landing10/Landing10Page';

const anton = Anton({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-robusztus',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['800'],
  variable: '--font-szoveg',
});

export const metadata: Metadata = {
  title: 'Hirdetés, ami megrendelést hoz | NEZOR',
  description: 'Elég a pénzégetésből: Facebook- és Instagram-hirdetés, ami ügyfeleket hoz. Pár gyors kérdés, és felvesszük veled a kapcsolatot.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Landing10Route() {
  return (
    <div className={`${anton.variable} ${inter.variable}`}>
      <Landing10Page />
    </div>
  );
}
