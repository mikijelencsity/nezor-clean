import { Unbounded, Montserrat } from 'next/font/google';
import type { Metadata } from 'next';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-unbounded',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Adatkezelési Tájékoztató — NEZOR',
};

export default function AdatkezelesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${unbounded.variable} ${montserrat.variable}`}
      style={{
        fontFamily: 'var(--font-montserrat, sans-serif)',
        background: 'linear-gradient(155deg, #EFF6FF 0%, #F0F9FF 60%, #F0FDF4 100%)',
        minHeight: '100vh',
        color: '#0F172A',
      }}
    >
      {children}
    </div>
  );
}
