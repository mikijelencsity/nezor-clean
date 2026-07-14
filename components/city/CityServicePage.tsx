import Link from 'next/link';
import { NavDrawer } from '@/components/ui/NavDrawer';
import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { City, cities } from '@/lib/cities';
import { FAQAccordion, FAQItem } from './FAQAccordion';
import {
  pick,
  weboldalIntro, weboldalWhyOnline, weboldalTypes, weboldalProcess,
  webshopIntro, webshopWhyNow, webshopFeatures, webshopProcess,
  facebookIntro, facebookWhyMeta, facebookTypes, facebookProcess,
  googleIntro, googleWhyGoogle, googleTypes, googleProcess,
} from '@/lib/cityContent';
import styles from './CityServicePage.module.css';

export type ServiceType = 'weboldal' | 'webshop' | 'facebook' | 'google';

interface ServiceConfig {
  title: string;
  slug: string;
  badge: string;
  heroDesc: (c: City) => string;
  features: string[];
  faq: (c: City) => FAQItem[];
  cta: string;
  getIntro: (c: City) => string;
  getWhyOnline: (c: City) => string;
  getTypes: (c: City) => string;
  getProcess: (c: City) => string;
  whyOnlineTitle: (c: City) => string;
  typesTitle: (c: City) => string;
  processTitle: string;
}

const serviceConfig: Record<ServiceType, ServiceConfig> = {
  weboldal: {
    title: 'Weboldal készítés',
    slug: 'weboldal-keszites',
    badge: 'Weboldal készítés',
    heroDesc: (c) => `Professzionális weboldal készítés ${c.inCity} kis- és középvállalkozásoknak. Gyors, mobilbarát, SEO-optimalizált weboldalak — helyi tapasztalattal, megfizethető áron.`,
    features: [
      'Egyedi, mobilbarát design',
      'Google-barát SEO felépítés',
      'Gyors betöltési idő',
      'Kapcsolatfelvételi form és térkép',
      'SSL tanúsítvány és biztonság',
      'Support az átadás után',
    ],
    faq: (c) => [
      { question: `Mennyibe kerül egy weboldal ${c.inCity}?`, answer: `${c.inCity} a weboldal ára a komplexitástól függ. Ingyenes ajánlatkérés után pontos árat adunk, a "Csomagjaink" oldalon látod a kiindulási árszinteket.` },
      { question: `Mennyi idő alatt készül el a weboldal ${c.inCity}?`, answer: `Alap weboldalak 1-2 héten belül elkészülnek. Összetettebb, egyedi oldalak tovább tarthatnak. A határidőt írásban vállaljuk.` },
      { question: `Segítetek a ${c.adjective} vállalkozásom szövegének megírásában?`, answer: `Igen, kérés esetén segítünk a szövegek megírásában is, SEO-barát formában, hogy a ${c.adjective} keresőtalálatok között minél előrébb kerülj.` },
      { question: `Van-e helyi irodájuk ${c.inCity}?`, answer: `Bács-Kiskun megye egész területén és országosan is dolgozunk, ${c.inCity} is szolgáljuk az ügyfeleinket. Az együttműködés online is gördülékenyen zajlik, szükség esetén Zoom-on egyeztetünk.` },
      { question: `Milyen weboldalakat készítetek ${c.inCity}?`, answer: `Bemutatkozó oldalakat, céges weboldalakat, portfólió oldalakat és landing page-eket készítünk. Minden típust ${c.inCity} és egész Magyarországon vállalunk.` },
      { question: `Mi történik az átadás után?`, answer: `Az átadás után is számíthatsz ránk — bármilyen módosítást, javítást elvégzünk, és havidíjas karbantartási csomagot is kínálunk.` },
    ],
    cta: 'Ingyenes weboldal ajánlat',
    getIntro: (c) => pick(weboldalIntro, c, 0)(c),
    getWhyOnline: (c) => pick(weboldalWhyOnline, c, 1)(c),
    getTypes: (c) => pick(weboldalTypes, c, 2)(c),
    getProcess: (c) => pick(weboldalProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért fontos az online jelenlét ${c.inCity}?`,
    typesTitle: (c) => `Weboldal típusok ${c.inCity}`,
    processTitle: 'A folyamat lépései',
  },
  webshop: {
    title: 'Webshop készítés',
    slug: 'webshop-keszites',
    badge: 'Webshop fejlesztés',
    heroDesc: (c) => `Professzionális webshop készítés ${c.inCity} vállalkozásoknak. Online áruház fizetési rendszerrel, rendeléskezelővel és automatikus számlázással — megfizethető áron.`,
    features: [
      'Biztonságos fizetési integráció',
      'Mobilbarát, gyors webshop',
      'Automatikus rendeléskezelő',
      'Raktárkezelés és értesítők',
      'Automatikus számlázás',
      'Futárszolgálati integráció',
    ],
    faq: (c) => [
      { question: `Mennyibe kerül egy webshop ${c.inCity}?`, answer: `${c.inCity} a webshop ára a termékkészlettől és a szükséges funkcióktól függ. Ingyenes konzultáció után pontos árajánlatot adunk.` },
      { question: `Mennyi idő alatt indul el a webshopom ${c.inCity}?`, answer: `Alap webshopok pár héten belül élesbe kerülnek. A folyamat végén betanítást is tartunk.` },
      { question: `Milyen fizetési módokat építetek be?`, answer: `Bankkártyás online fizetést, utánvétet és átutalást — az igényednek megfelelő kombinációt alakítjuk ki.` },
      { question: `${c.name} területén is tudtok segíteni?`, answer: `Igen, ${c.inCity} is teljes körű webshop fejlesztési szolgáltatást nyújtunk.` },
      { question: `Kezeli a rendszer a készletet?`, answer: `Igen, automatikus raktárkezelés, alacsony készlet értesítők és rendelés-visszaigazolások is beépíthetők.` },
      { question: `Hogyan kezeli a rendszer a számlákat?`, answer: `Integrálható automatikus számlázó rendszerekkel — minden rendelésnél automatikusan kiállítja a számlát.` },
    ],
    cta: 'Ingyenes webshop ajánlat',
    getIntro: (c) => pick(webshopIntro, c, 0)(c),
    getWhyOnline: (c) => pick(webshopWhyNow, c, 1)(c),
    getTypes: (c) => pick(webshopFeatures, c, 2)(c),
    getProcess: (c) => pick(webshopProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért indíts webshopot ${c.inCity}?`,
    typesTitle: (c) => `Webshop funkciók ${c.inCity}`,
    processTitle: 'Webshop fejlesztési folyamat',
  },
  facebook: {
    title: 'Facebook hirdetés kezelés',
    slug: 'facebook-hirdetes',
    badge: 'Facebook & Instagram hirdetések',
    heroDesc: (c) => `Professzionális Facebook és Instagram hirdetés kezelés ${c.inCity} vállalkozásoknak. Célzott Meta kampányok, napi optimalizálással és havi riporttal.`,
    features: [
      'Facebook és Instagram kampányok',
      'Pontos célközönség-meghatározás',
      'Napi optimalizálás és monitorozás',
      'Kreatív szövegek és vizuálok',
      'Havi részletes riport',
      'Átlátható büdzsé kezelés',
    ],
    faq: (c) => [
      { question: `Mekkora büdzsével érdemes elkezdeni ${c.inCity}?`, answer: `Kisebb napi büdzséből is érdemi eredmények elérhetők ${c.adjective} helyi célzással. Az optimális büdzsét az iparág határozza meg.` },
      { question: `Mennyi idő alatt látszanak az eredmények?`, answer: `Az első eredmények 1-2 héten belül láthatók. A kampány optimalizálása folyamatos.` },
      { question: `Instagram hirdetéseket is csináltok?`, answer: `Igen, a Meta rendszere Facebook-ot és Instagramot is lefed, mindkettőre optimalizálunk.` },
      { question: `Kapok-e riportot az eredményekről?`, answer: `Igen, minden hónapban részletes riportot küldünk — elérés, kattintások, leadek, konverziók.` },
      { question: `${c.name} területén is vállaltok hirdetés kezelést?`, answer: `Igen, ${c.inCity} is teljes körű Facebook és Instagram hirdetés kezelési szolgáltatást nyújtunk.` },
      { question: `Mi szükséges az induláshoz?`, answer: `Egy Facebook oldal és egy rövid brief az üzletedről. A hirdetési fiókot és a kampányokat mi állítjuk be.` },
    ],
    cta: 'Ingyenes hirdetési ajánlat',
    getIntro: (c) => pick(facebookIntro, c, 0)(c),
    getWhyOnline: (c) => pick(facebookWhyMeta, c, 1)(c),
    getTypes: (c) => pick(facebookTypes, c, 2)(c),
    getProcess: (c) => pick(facebookProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért érdemes Facebook hirdetést indítani ${c.inCity}?`,
    typesTitle: (c) => `Hirdetés típusok ${c.inCity}`,
    processTitle: 'Hogyan dolgozunk?',
  },
  google: {
    title: 'Google hirdetés kezelés',
    slug: 'google-hirdetes',
    badge: 'Google Ads kampányok',
    heroDesc: (c) => `Professzionális Google Ads kezelés ${c.inCity} vállalkozásoknak. Keresési kampányok, amik pontosan akkor jelennek meg, amikor az ügyfeleid rákeresnek.`,
    features: [
      'Keresési hálózati kampányok',
      'Kulcsszókutatás és -optimalizálás',
      'Konverziókövetés beállítása',
      'Helyi célzás beállítása',
      'Havi részletes riport',
      'Átlátható büdzsé kezelés',
    ],
    faq: (c) => [
      { question: `Mekkora büdzsével érdemes elkezdeni ${c.inCity}?`, answer: `Kisebb napi büdzséből is érdemi eredmények elérhetők ${c.adjective} helyi célzással. Az optimális büdzsét az iparág és a kulcsszavak versenyzettsége határozza meg.` },
      { question: `Mennyi idő alatt látszanak az eredmények?`, answer: `A Google Ads azonnali: a kampány indítása után pár órán belül már érkezhetnek kattintások. Az optimalizálás az első hetekben a legintenzívebb.` },
      { question: `Mi a különbség a Facebook és a Google hirdetés között?`, answer: `A Google-on a felhasználó már keres valamit — döntési szándékkal érkezik. A Facebookon inkább felfedezéssel találkozik a hirdetéseddel. A kettő remekül kiegészíti egymást.` },
      { question: `Kapok-e riportot az eredményekről?`, answer: `Igen, minden hónapban részletes riportot küldünk — megjelenések, kattintások, konverziók, kattintásonkénti költség.` },
      { question: `${c.name} területén is vállaltok Google Ads kezelést?`, answer: `Igen, ${c.inCity} is teljes körű Google Ads kezelési szolgáltatást nyújtunk, helyi célzással is.` },
      { question: `Mi szükséges az induláshoz?`, answer: `Egy weboldal, ahova irányíthatjuk a forgalmat, és egy rövid brief az üzletedről. A Google Ads fiókot és a kampányokat mi állítjuk be.` },
    ],
    cta: 'Ingyenes Google Ads ajánlat',
    getIntro: (c) => pick(googleIntro, c, 0)(c),
    getWhyOnline: (c) => pick(googleWhyGoogle, c, 1)(c),
    getTypes: (c) => pick(googleTypes, c, 2)(c),
    getProcess: (c) => pick(googleProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért érdemes Google Ads kampányt indítani ${c.inCity}?`,
    typesTitle: (c) => `Kampánytípusok ${c.inCity}`,
    processTitle: 'Hogyan dolgozunk?',
  },
};

function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

interface Props {
  city: City;
  service: ServiceType;
}

export function CityServicePage({ city, service }: Props) {
  const cfg = serviceConfig[service];
  const faqItems = cfg.faq(city);
  const otherCities = cities.filter((c) => c.slug !== city.slug && c.isLocal === city.isLocal).slice(0, 8);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <NavDrawer />

      <section className={styles.hero}>
        <GridBg />
        <GlowBlob color="blue" style={{ top: '10%', right: '-150px' }} />
        <GlowBlob color="yellow" style={{ bottom: '-100px', left: '-100px' }} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>{cfg.badge} — {city.name}</div>
          <h1 className={styles.h1}>
            {cfg.title} <span className={styles.accent}>{city.inCity}</span>
          </h1>
          <p className={styles.heroDesc}>{cfg.heroDesc(city)}</p>
          <div className={styles.heroActions}>
            <a href="/#kapcsolat" className={styles.btnPrimary}>{cfg.cta}</a>
            <Link href="/csomagjaink" className={styles.btnSecondary}>Csomagok megtekintése</Link>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section>
          <h2 className={styles.h2}>{cfg.title} {city.inCity} — NEZOR</h2>
          <p className={styles.paragraph}>{cfg.getIntro(city)}</p>
          <ul className={styles.featureGrid}>
            {cfg.features.map((f) => (
              <li key={f} className={styles.featureItem}>{f}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.whyOnlineTitle(city)}</h2>
          <p className={styles.paragraph}>{cfg.getWhyOnline(city)}</p>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.typesTitle(city)}</h2>
          {cfg.getTypes(city).split('\n\n').map((para, i) => (
            <p key={i} className={styles.paragraph}>{para}</p>
          ))}
        </section>

        <section>
          <h2 className={styles.h2}>Miért a NEZOR {city.inCity}?</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3>Gyors átfutás</h3>
              <p>Alap projektek rövid idő alatt elkészülnek {city.inCity} — nem váratsz hónapokat.</p>
            </div>
            <div className={styles.whyCard}>
              <h3>Kiemelkedő ár-érték</h3>
              <p>Áraink a piaci átlag alatt vannak {city.inCity} — anélkül hogy a minőségen spórolnánk.</p>
            </div>
            <div className={styles.whyCard}>
              <h3>Helyi tapasztalat</h3>
              <p>Ismerjük a {city.adjective} piacot és az itteni vállalkozások igényeit és kihívásait.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.processTitle}</h2>
          <p className={styles.paragraph}>{cfg.getProcess(city)}</p>
        </section>

        <section>
          <h2 className={styles.h2}>Kérdések a {cfg.title.toLowerCase()}ről {city.inCity}</h2>
          <FAQAccordion items={faqItems} />
        </section>

        {otherCities.length > 0 && (
          <section>
            <h2 className={styles.h3Small}>{cfg.title} más városokban is</h2>
            <div className={styles.cityLinks}>
              {otherCities.map((c) => (
                <Link key={c.slug} href={`/${cfg.slug}/${c.slug}`} className={styles.cityLink}>
                  {c.name}
                </Link>
              ))}
              <Link href="/varosok" className={styles.cityLinkPrimary}>Összes város →</Link>
            </div>
          </section>
        )}

        <div className={styles.ctaBox}>
          <h2 className={styles.h2}>Dolgozzunk együtt {city.inCity}!</h2>
          <p className={styles.ctaText}>Ingyenes konzultáció — kötelezettség nélkül. Megmutatjuk, mit tudunk érted csinálni.</p>
          <a href="/#kapcsolat" className={styles.btnPrimary}>{cfg.cta}</a>
        </div>
      </div>
    </div>
  );
}
