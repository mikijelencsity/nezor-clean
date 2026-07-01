import type { Metadata } from 'next';
import { UgyfelszerzoRendszerPage } from '@/components/ugyfelszerzo-rendszer/UgyfelszerzoRendszerPage';

export const metadata: Metadata = {
  title: 'Helyi Ügyfélszerző Rendszer — NEZOR',
  description: 'Nem weboldalt kapsz. Egy ügyfélszerző rendszert, ami segít, hogy megtaláljanak, megbízzanak benned, és ajánlatot kérjenek.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <UgyfelszerzoRendszerPage />;
}
