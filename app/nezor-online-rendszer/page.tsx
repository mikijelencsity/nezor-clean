import type { Metadata } from 'next';
import { NezorOnlineRendszerPage } from '@/components/nezor-online-rendszer/NezorOnlineRendszerPage';

export const metadata: Metadata = {
  title: 'NEZOR Online Rendszer — Nem weboldal. Ügyfélszerző rendszer.',
  description: 'Landing oldal + Meta hirdetés + mérés + automatizáció — egy komplett online ügyfélszerző rendszer, 7–14 nap alatt élesben.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <NezorOnlineRendszerPage />;
}
