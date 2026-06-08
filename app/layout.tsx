import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { FacebookMessenger } from '@/components/analytics/FacebookMessenger';
import { FacebookPixel } from '@/components/analytics/FacebookPixel';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800', '900'] });

const siteDescription =
  'NEZOR Webfejlesztés — Müller Dániel és Jelencsity Miklós ügynöksége Baján: weboldalt, webshopot építünk és Meta hirdetésekkel hozzuk rá a vevőket. 16 évesen indultak, mára 20+ magyar vállalkozásnak segítettek online ügyfeleket szerezni.';

export const metadata: Metadata = {
  title: 'NEZOR — Weboldal + Meta hirdetés Baján, 20+ magyar vállalkozásnak',
  description: siteDescription,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'NEZOR — Weboldal + Meta hirdetés Baján, 20+ magyar vállalkozásnak',
    description: siteDescription,
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
    title: 'NEZOR — Weboldal + Meta hirdetés Baján, 20+ magyar vállalkozásnak',
    description: siteDescription,
    images: ['https://nezor.hu/nezor-logo-transparent.webp'],
  },
  metadataBase: new URL('https://nezor.hu'),
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NEZOR Webfejlesztés',
  description: 'Weboldalak, webshopok és Meta hirdetések egy kézből — 16 évesen alapították, ma már több mint 20 magyar vállalkozásnak segítenek online ügyfeleket szerezni.',
  url: 'https://nezor.hu',
  email: 'info@nezor.hu',
  telephone: '+36704554703',
  image: 'https://nezor.hu/nezor-logo-transparent.webp',
  priceRange: '50.000 Ft-tól',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Budai Nagy Antal u. 36.',
    addressLocality: 'Baja',
    postalCode: '6500',
    addressCountry: 'HU',
  },
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
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Kovács Dóra' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Korábban semmit sem tudtam a hirdetéseinkről. Most minden hétfőn megnézem a riportot, és pontosan tudom, mi működött és mi nem. Nagyobb lett a bizalmam a marketingbe is, meg magamba is.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Nagy Balázs' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'A második hónap végére kétszer annyi minőségi érdeklődőnk volt, és a pipeline is rendezett lett. Nem vesztek el a jó leadek – és ez volt a legnagyobb problémánk korábban.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Tóth Krisztina' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Nem egy újabb bonyolult szoftvert kaptam, hanem egy működő rendszert. A heti riport tényleg segít, és végre értem, mi mögött van eredmény és mi mögött csak szerencse.',
    },
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
        text: 'Már 50.000 Ft-tól is kaphatsz weboldalt, de minden projektre egyedi árajánlatot készítünk. Egy egyszerű bemutatkozó oldal és egy összetett webshop nem ugyanaz, ezért a konzultáció után, amikor már látjuk a feladatot, adunk konkrét számot. Nincs rejtett költség, és nem mondunk árat azelőtt, hogy értenénk, mire van szükséged.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mennyi idő alatt készül el?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Igénytől függ. Egy egyszerű oldal néhány hét, egy összetett webshop tovább tart. A pontos időzítést az első konzultáción rögzítjük, és tartjuk is.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mi van, ha nem vagyok elégedett?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A folyamat közben végig látod a munkát, és menet közben módosíthatunk rajta. A cél nem az, hogy átadjunk valamit, hanem hogy elégedett legyél vele. Különben mi sem örülünk az eredménynek.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kell saját szöveg, kép, tartalom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nem feltétlenül. Ha van saját anyagod, beépítjük. Ha nincs, segítünk a szövegezésben és a fotózás megszervezésében is, sok ügyfelünknél mi adjuk a teljes tartalmi alapot.',
      },
    },
    {
      '@type': 'Question',
      name: 'Van havi díj? Mit fedez?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weboldalhoz csak akkor, ha kéred. Karbantartást, frissítést, biztonsági mentést és apróbb módosításokat fed le. Facebook hirdetés vagy webshop esetén viszont mindig van havi díj, mert folyamatos optimalizálás és karbantartás kell hozzájuk.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mennyi a Facebook hirdetési költség?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Meta felé a budget-et közvetlenül te fizeted, mi csak a saját munkánkat számlázzuk. Így átlátható minden forint: tudod, mi megy hirdetésre és mi a mi díjunk.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mi van, ha már van weboldalam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Megnézzük együtt. Néha elég átdolgozni a meglévőt, néha viszont gyorsabb és olcsóbb nulláról kezdeni. Őszintén megmondjuk, melyik éri meg neked.',
      },
    },
    {
      '@type': 'Question',
      name: 'Milyen iparágakkal dolgoztok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sokfélével, étterem, építőipar, kávé, logisztika, gyártás, kereskedelem, szolgáltatók. Az iparágat hamar megtanuljuk, az értékesítés logikája viszont szektor-független.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hol vagytok? Online vagy személyes találkozó?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Az ország bármely pontján megoldható személyes találkozó, ha a projekt megkívánja. Az ügyfeleink többsége egyébként Zoom-on dolgozik velünk, mert gyorsabb és nem kell senkinek órákat utaznia.',
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
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
