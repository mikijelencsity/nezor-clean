'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { NavDrawer } from '@/components/ui/NavDrawer';
import styles from './ReferenciaSlider.module.css';

type Case = {
  number: string;
  tags: string[];
  title: string;
  desc: string;
  href?: string;
  metrics: { value: string; label: string }[];
  image: string;
  noteTitle: string;
  noteText: string;
  category: 'weboldal' | 'hirdetes';
};

const cases: Case[] = [
  {
    number: '01',
    tags: ['Ajánlatkérés', 'Értékesítés'],
    title: 'Hellinger Kft.',
    category: 'weboldal',
    desc: 'Egyszerű, üzleti ajánlatra épített oldal, ahol a szolgáltatás gyorsan érthető és a döntés gyorsul.',
    href: 'https://hellingerkft.hu/',
    metrics: [
      { value: '5×', label: 'Átlagos ROI' },
      { value: 'Üzleti', label: 'Ajánlat' },
      { value: '1 hó', label: 'Gyors élesítés' },
    ],
    image: '/chatgpt-6.png',
    noteTitle: 'Ajánlatkérésre optimalizált',
    noteText: 'Ajánlatkérésre hangolt struktúra, amely végigvezeti az érdeklődőt.',
  },
  {
    number: '02',
    tags: ['Weboldal', 'Landing oldal', 'Lead fókusz'],
    title: 'Estur Kft.',
    category: 'weboldal',
    desc: 'Ajánlatkérő fókusz: minden blokk a kapcsolatfelvételre irányít, egyszerűen és világosan.',
    href: 'https://estur.hu/',
    metrics: [
      { value: '1 cél', label: 'Ajánlatkérés' },
      { value: 'Mobil', label: 'Mobil első' },
      { value: 'Clean', label: 'Zajmentes felület' },
    ],
    image: '/chatgpt-4.png',
    noteTitle: 'Ajánlatkérésre optimalizált',
    noteText: 'A látvány és a struktúra egyértelműen a következő lépésre tereli a látogatót.',
  },
  {
    number: '03',
    tags: ['Márkaépítés', 'Prémium webdesign', 'Vizualis upgrade'],
    title: 'DoverCheck',
    category: 'weboldal',
    desc: 'Prémium megjelenés, ami megbízhatóságot és hitelességet közvetít a márka számára.',
    href: 'https://doversolution.hu/',
    metrics: [
      { value: 'Premium', label: 'Prémium pozíció' },
      { value: 'Brand', label: 'Erősebb arculat' },
      { value: 'Visual', label: 'Látványos minőség' },
    ],
    image: '/chatgpt-2.png',
    noteTitle: 'Márkaerősítő design',
    noteText: 'Esztétikus, de üzleti célú felépítés, ami a bizalmat növeli.',
  },
  {
    number: '04',
    tags: ['Vendéglátás', 'Helyi brand', 'Mobil'],
    title: 'Neked Sütöm',
    category: 'weboldal',
    desc: 'Helyi weboldal, ami gyorsan viszi a vendéget az étlaphoz és az ízek hangulatát adja át.',
    href: 'https://nekedsutom.hu/',
    metrics: [
      { value: 'Helyi', label: 'Közeli vásárló' },
      { value: 'Mobil', label: 'Telefonra szabott' },
      { value: 'Étel', label: 'Ízletes kommunikáció' },
    ],
    image: '/chatgpt-5.png',
    noteTitle: 'Hangulatos rendelés',
    noteText: 'Az oldal gyors hozzáférést ad a menühöz, és a rendelést vonzóvá teszi.',
  },
  {
    number: '05',
    tags: ['Kiskereskedelem', 'Szerviz', 'Konverzió'],
    title: 'CruiserShop',
    category: 'weboldal',
    desc: 'Online kirakat, amely a bringákat és a szervizszolgáltatást egyaránt könnyen áttekinthetővé teszi.',
    href: 'https://kerekparszakuzletbaja.hu/',
    metrics: [
      { value: '300+', label: 'Bringamodellek' },
      { value: '5000+', label: 'Elégedett vásárló' },
      { value: '10+', label: 'Év szakértelem' },
    ],
    image: '/chatgpt-3.png',
    noteTitle: 'Online kirakat',
    noteText: 'Gyorsan mutatja a bringákat, és egyszerűen vezeti a látogatót.',
  },
  {
    number: '06',
    tags: ['Egészséges életmód', 'E-commerce', 'Prémium'],
    title: 'Inshape-Diet',
    category: 'weboldal',
    desc: 'Prémium életmód webshop, ahol a termékek és a szolgáltatások egységes, profi élményt adnak.',
    href: 'https://inshape-diet.com/',
    metrics: [
      { value: 'Lifestyle', label: 'Életstílus' },
      { value: 'Shop', label: 'Webshop élmény' },
      { value: 'Prémium', label: 'Magas minőség' },
    ],
    image: '/chatgpt-7.png',
    noteTitle: 'Prémium atmoszféra',
    noteText: 'A design egyszerre formál imázst és mutat profi terméket.',
  },
  {
    number: '07',
    tags: ['Nyílászáró gyártás', 'Bemutatkozó weboldal', 'Bizalomépítés'],
    title: 'Szeko Ablak Kft.',
    category: 'weboldal',
    desc: 'Letisztult bemutatkozó oldal a 2010 óta piacon lévő ablakgyártónak, ami szakmai hitelességet és minőséget közvetít.',
    href: 'https://szekoablak.hu/',
    metrics: [
      { value: '2010', label: 'Alapítva' },
      { value: 'Nyílászáró', label: 'Gyártás' },
      { value: 'Minőség', label: 'Szakmai hitelesség' },
    ],
    image: '/szeko-ablak.png',
    noteTitle: 'Szakmai bemutatkozás',
    noteText: 'Az oldal a gyártói háttér és a tapasztalat köré építi a bizalmat.',
  },
  {
    number: '08',
    tags: ['Építőipar', 'Kivitelezés', 'Ajánlatkérés'],
    title: 'Komár és Fia Kft.',
    category: 'weboldal',
    desc: 'Teljes körű építőipari kivitelező weboldala Budapest és Pest vármegye térségére, egyértelmű ajánlatkérő fókusszal.',
    href: 'https://komaresfiakft.hu/',
    metrics: [
      { value: 'Teljes körű', label: 'Kivitelezés' },
      { value: 'Ingyenes', label: 'Helyszíni felmérés' },
      { value: 'Pest vm.', label: 'Kiszolgálási terület' },
    ],
    image: '/komar-es-fia.png',
    noteTitle: 'Ajánlatkérésre optimalizált',
    noteText: 'Az oldal megbízhatóságot közvetít, és gyorsan az árajánlat-kéréshez vezeti a látogatót.',
  },
  {
    number: '09',
    tags: ['Facebook hirdetés', 'ROAS', 'Kreatív tesztelés'],
    title: 'Dover Check',
    category: 'hirdetes',
    desc: 'Tesztelt kreatívokból építkező Facebook-kampány, amely stabil, magas megtérülést hozott.',
    metrics: [
      { value: '4×', label: 'Megtérülés' },
      { value: 'Facebook', label: 'Hirdetési platform' },
      { value: 'Tesztelt', label: 'Kreatív' },
    ],
    image: '/HIRDETES1.webp',
    noteTitle: 'Kreatívvezérelt kampány',
    noteText: 'A/B tesztelt kreatívok emelték a megtérülést kampányszinten.',
  },
  {
    number: '10',
    tags: ['Facebook hirdetés', 'Bevétel', 'Kis büdzsé'],
    title: 'Hazai Kávé Kft.',
    category: 'hirdetes',
    desc: 'Kis hirdetési kerettel indított kampány, ami arányaiban komoly bevételt hozott.',
    metrics: [
      { value: '100.000 Ft+', label: 'Bevétel' },
      { value: '12.000 Ft', label: 'Költségből' },
      { value: 'Facebook', label: 'Hirdetési platform' },
    ],
    image: '/HIRDETES2.webp',
    noteTitle: 'Kis büdzséből nagy eredmény',
    noteText: 'A célzás és a kreatív együtt hozta ki a magas megtérülést alacsony költésből.',
  },
  {
    number: '11',
    tags: ['Facebook hirdetés', 'ROAS', 'Kreatív tesztelés'],
    title: 'Forint - Soft Kft.',
    category: 'hirdetes',
    desc: 'Több kreatívváltozat tesztelése után stabilizált, magas megtérülésű kampány.',
    metrics: [
      { value: '6×', label: 'Megtérülés' },
      { value: 'Facebook', label: 'Hirdetési platform' },
      { value: 'Tesztelt', label: 'Kreatív' },
    ],
    image: '/HIRDETES3.webp',
    noteTitle: 'Kreatívvezérelt kampány',
    noteText: 'A tesztelt kreatívok közül a legjobban teljesítőre állt rá a büdzsé.',
  },
  {
    number: '12',
    tags: ['Facebook hirdetés', 'Elérés', 'Kis büdzsé'],
    title: 'ZT Épületgépészet',
    category: 'hirdetes',
    desc: 'Alacsony költésből futó kampány, amely nagy márkaismertséget és elérést hozott.',
    metrics: [
      { value: '90.000', label: 'Elérés' },
      { value: '10.000 Ft', label: 'Költségből' },
      { value: 'Facebook', label: 'Hirdetési platform' },
    ],
    image: '/HIRDETES4.webp',
    noteTitle: 'Kis büdzséből nagy elérés',
    noteText: 'A célzás pontossága miatt a kis költés is komoly elérést hozott.',
  },
];

function renderCaseTitle(title: string) {
  const splitAt = title.lastIndexOf(' ');
  if (splitAt === -1) return title;

  return (
    <>
      <span>{title.slice(0, splitAt)}</span>{' '}
      <span className={styles.titleAccent}>{title.slice(splitAt + 1)}</span>
    </>
  );
}

export function ReferenciaSlider() {
  const [activeTab, setActiveTab] = useState<'weboldal' | 'hirdetes'>('weboldal');
  const [visibleCases, setVisibleCases] = useState<string[]>([]);
  const casesRef = useRef<HTMLDivElement>(null);

  const filteredCases = cases.filter((item) => item.category === activeTab);

  useEffect(() => {
    setVisibleCases([]);

    const container = casesRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const caseId = card.dataset.caseId;
          if (!caseId) return;

          setVisibleCases((prev) =>
            prev.includes(caseId) ? prev : [...prev, caseId]
          );
          instance.unobserve(card);
        });
      },
      { threshold: 0.2 }
    );

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(`.${styles.case}`)
    );
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <main className={styles.root}>
      <div className={styles.noise} />
      <NavDrawer />

      <div className={styles.wrap}>
        <section id="munkak">
          <div className={styles.sectionTitle}>
            <h2>Referenciák, a legfrissebb munkáinkból</h2>
          </div>

          <div className={styles.tabSwitch} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'weboldal'}
              className={`${styles.tabBtn} ${activeTab === 'weboldal' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('weboldal')}
            >
              Weboldalak
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hirdetes'}
              className={`${styles.tabBtn} ${activeTab === 'hirdetes' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('hirdetes')}
            >
              Hirdetések
            </button>
          </div>

          <div className={styles.cases} ref={casesRef}>
            {filteredCases.map((item, index) => {
              const isVisible = visibleCases.includes(item.number);

              return (
                <article
                  className={`${styles.case} ${isVisible ? styles.visible : ''}`}
                  key={item.number}
                  data-case-id={item.number}
                  style={{ '--case-index': index } as { [key: string]: string | number }}
                >
                  <div className={styles.caseText}>
                    <div className={styles.caseMeta}>
                      <span className={styles.caseBadge}>{item.tags[0]}</span>
                    </div>

                    <h3 className={styles.caseTitle}>{renderCaseTitle(item.title)}</h3>
                    <p className={styles.caseDesc}>{item.desc}</p>

                    {item.href && (
                      <div className={styles.caseActions}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.btn + ' ' + styles.btnPrimary}
                        >
                          Projekt megnyitása
                        </a>
                      </div>
                    )}
                  </div>

                  <div className={styles.caseVisual}>
                  <div className={styles.glowCircle} />
                  <div className={styles.imageWrapper}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 720px) 100vw, 40vw" />
                  </div>

                  <div className={styles.floatingNote}>
                    <strong>{item.noteTitle}</strong>
                    <span>{item.noteText}</span>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
