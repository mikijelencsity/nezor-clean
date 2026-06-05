import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { FacebookMessenger } from '@/components/analytics/FacebookMessenger';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800', '900'] });

export const metadata: Metadata = {
  title: 'NEZOR — Weboldal + Meta hirdetés',
  description:
    'Weboldalakat és webshopokat építünk, majd Meta hirdetésekkel hozzuk rájuk a vevőket. Egy kézből, átlátható áron.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'NEZOR — Weboldal + Meta hirdetés',
    description: 'Weboldalakat és webshopokat építünk, majd Meta hirdetésekkel hozzuk rájuk a vevőket. Egy kézből, átlátható áron.',
    url: 'https://nezor.hu',
    siteName: 'NEZOR Webfejlesztés',
    locale: 'hu_HU',
    type: 'website',
    images: [
      {
        url: 'https://nezor.hu/nezor-logo-transparent.webp',
        width: 400,
        height: 400,
        alt: 'NEZOR Webfejlesztés',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'NEZOR — Weboldal + Meta hirdetés',
    description: 'Weboldalakat és webshopokat építünk, majd Meta hirdetésekkel hozzuk rájuk a vevőket.',
    images: ['https://nezor.hu/nezor-logo-transparent.webp'],
  },
  metadataBase: new URL('https://nezor.hu'),
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NEZOR Webfejlesztés',
  description: 'Weboldalak, webshopok és Meta hirdetések egy kézből.',
  url: 'https://nezor.hu',
  email: 'info@nezor.hu',
  areaServed: { '@type': 'Country', name: 'Hungary' },
  founder: [
    { '@type': 'Person', name: 'Müller Dániel' },
    { '@type': 'Person', name: 'Jelencsity Miklós' },
  ],
  knowsAbout: [
    'weboldal fejlesztés',
    'webshop fejlesztés',
    'Meta hirdetések',
    'Facebook hirdetések',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Mennyibe kerül egy weboldal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Már 50.000 Ft-tól is kaphatsz weboldalt. Minden projektre egyedi árajánlatot készítünk a konzultáció után.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mennyi idő alatt készül el a weboldal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Igénytől függ. Egy egyszerű oldal néhány hét, egy összetett webshop tovább tart.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mi van, ha nem vagyok elégedett?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A folyamat közben végig látod a munkát és menet közben módosíthatunk rajta.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mennyi a Facebook hirdetési költség?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Meta felé a budget-et közvetlenül te fizeted, mi csak a saját munkánkat számlázzuk.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />
        <FacebookMessenger />
        <SpeedInsights />
      </body>
    </html>
  );
}
