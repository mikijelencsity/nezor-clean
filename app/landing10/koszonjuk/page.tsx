import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import { Landing10Koszonjuk } from '@/components/landing10/Landing10Koszonjuk';

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
  title: 'Köszönjük! | NEZOR',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Landing10KoszonjukRoute() {
  return (
    <div className={`${anton.variable} ${inter.variable}`}>
      <Landing10Koszonjuk />
    </div>
  );
}
