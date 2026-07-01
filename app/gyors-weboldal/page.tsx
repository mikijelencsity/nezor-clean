import type { Metadata } from 'next';
import { GyorsWeboldalPage } from '@/components/gyors-weboldal/GyorsWeboldalPage';

export const metadata: Metadata = {
  title: 'Weboldal 2 napon belül — NEZOR',
  description: 'Válassz designt, add meg az adataidat — és 48 órán belül élesben fut a weboldalad.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <GyorsWeboldalPage />;
}
