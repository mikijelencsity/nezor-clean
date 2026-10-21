import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import { EpitoiparPage } from '@/components/epitoipar/EpitoiparPage';

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
  title: 'Építőipari vállalkozóknak — 4 gyors kérdés | NEZOR',
  description: 'Több megrendelés építőipari vállalkozóknak. Válaszolj 4 gyors kérdésre, és felvesszük veled a kapcsolatot.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EpitoiparRoute() {
  return (
    <div className={`${anton.variable} ${inter.variable}`}>
      <EpitoiparPage />
    </div>
  );
}
