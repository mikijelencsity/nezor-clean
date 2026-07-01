'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { NavDrawer } from '@/components/ui/NavDrawer';
import styles from './ReferenciaSlider.module.css';

const cases = [
  {
    number: '01',
    tags: ['Ajánlatkérés', 'Értékesítés'],
    title: 'Hellinger Kft.',
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
  const [visibleCases, setVisibleCases] = useState<string[]>([]);
  const casesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <main className={styles.root}>
      <div className={styles.noise} />
      <NavDrawer />

      <div className={styles.wrap}>
        <section id="munkak">
          <div className={styles.sectionTitle}>
            <h2>Referenciák, a legfrissebb munkáinkból</h2>
          </div>

          <div className={styles.cases} ref={casesRef}>
            {cases.map((item, index) => {
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
