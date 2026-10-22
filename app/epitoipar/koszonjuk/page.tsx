import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import { EpitoiparKoszonjuk } from '@/components/epitoipar/EpitoiparKoszonjuk';

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

export default function EpitoiparKoszonjukRoute() {
  return (
    <div className={`${anton.variable} ${inter.variable}`}>
      <EpitoiparKoszonjuk />
    </div>
  );
}
