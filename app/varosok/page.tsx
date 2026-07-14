import type { Metadata } from 'next';
import Link from 'next/link';
import { NavDrawer } from '@/components/ui/NavDrawer';
import { City, localCities, nationalCities } from '@/lib/cities';
import styles from './varosok.module.css';

export const metadata: Metadata = {
  title: 'Weboldal, webshop és hirdetés készítés városonként — NEZOR',
  description: 'Weboldal készítés, webshop fejlesztés, Facebook és Google hirdetés kezelés Magyarország összes nagyobb városában. Bács-Kiskun megye és országos lefedettség.',
  openGraph: {
    title: 'Városok — NEZOR',
    description: 'Weboldal, webshop és hirdetés kezelés Magyarország összes nagyobb városában.',
    url: 'https://nezor.hu/varosok',
  },
  robots: { index: true, follow: true },
};

const services = [
  { label: 'Weboldal', slug: 'weboldal-keszites' },
  { label: 'Webshop', slug: 'webshop-keszites' },
  { label: 'Facebook hirdetés', slug: 'facebook-hirdetes' },
  { label: 'Google hirdetés', slug: 'google-hirdetes' },
];

function CityGroup({ title, cityList }: { title: string; cityList: City[] }) {
  return (
    <section className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      <div className={styles.grid}>
        {cityList.map((city) => (
          <div key={city.slug} className={styles.card}>
            <div className={styles.cardName}>{city.name}</div>
            <div className={styles.chips}>
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/${city.slug}`} className={styles.chip}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function VarosokPage() {
  return (
    <div className={styles.page}>
      <NavDrawer />
      <div className={styles.header}>
        <span className={styles.eyebrow}>Lefedettség</span>
        <h1 className={styles.h1}>Weboldal és hirdetés kezelés <span className={styles.accent}>városonként</span></h1>
        <p className={styles.sub}>
          Weboldal készítés, webshop fejlesztés, Facebook és Google hirdetés kezelés Bács-Kiskun megyétől az egész országig. Válaszd ki a városodat!
        </p>
      </div>

      <div className={styles.content}>
        <CityGroup title="Bács-Kiskun megye" cityList={localCities} />
        <CityGroup title="Magyarország — nagyobb városok" cityList={nationalCities} />
      </div>
    </div>
  );
}
