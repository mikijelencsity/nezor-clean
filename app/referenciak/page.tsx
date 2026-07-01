import type { Metadata } from 'next';
import { ReferenciaSlider } from '@/components/referenciak/ReferenciaSlider';

export const metadata: Metadata = {
  title: 'Referenciák — NEZOR Webfejlesztés',
  description: 'Valós eredmények valós magyar vállalkozásoktól. 6× megtérülés, 90.000 elérés, 100.000 Ft bevétel — nézd meg, mit értünk el ügyfeleinknek.',
};

export default function ReferenciaPage() {
  return <ReferenciaSlider />;
}
