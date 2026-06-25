import type { Metadata } from 'next';
import { EpitoipariWeboldalPage } from '@/components/epitoipari-weboldal/EpitoipariWeboldalPage';

export const metadata: Metadata = {
  title: 'Weboldal építőipari vállalkozásoknak — NEZOR',
  description: 'Profi, mobilbarát weboldal akár 24 órán belüli első verzióval — tetőfedőknek, ácsoknak, kőműveseknek, villanyszerelőknek és más építőipari vállalkozóknak.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <EpitoipariWeboldalPage />;
}
