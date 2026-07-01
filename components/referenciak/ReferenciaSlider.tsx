'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ReferenciaSlider.module.css';

const refs = [
  {
    ceg: 'Forint - Soft Kft.',
    kategoria: 'Meta hirdetés',
    story: 'Egy összetett B2B termék, amit nehéz volt online kommunikálni. Az első kampányhónap végére a hirdetések hatszoros megtérülést hoztak.',
    metrikaErtek: 6,
    metrikaUtotag: '×',
    metrikaLabel: 'megtérülés',
    kep: '/HIRDETES3.webp',
    accent: '#00e5ff',
  },
  {
    ceg: 'ZT Épületgépészet',
    kategoria: 'Meta hirdetés',
    story: '10.000 Ft hirdetési büdzséből 90.000 ember látta a céget. Helyi épületgépész vállalkozás — és pontosan a megfelelő emberek elé tettük.',
    metrikaErtek: 90000,
    metrikaUtotag: '',
    metrikaLabel: 'elérés 10 000 Ft-ból',
    kep: '/HIRDETES4.webp',
    accent: '#ffe600',
  },
  {
    ceg: 'Hazai Kávé Kft.',
    kategoria: 'Webshop + Meta hirdetés',
    story: '12.000 Ft hirdetési büdzséből 100.000 Ft bevétel egyetlen hétvége alatt. A webshop és a kampány együtt hozta az eredményt.',
    metrikaErtek: 100000,
    metrikaUtotag: ' Ft',
    metrikaLabel: 'bevétel 12 000 Ft-ból',
    kep: '/HIRDETES2.webp',
    accent: '#00e5ff',
  },
  {
    ceg: 'Dover Check',
    kategoria: 'Meta hirdetés',
    story: 'Ipari ellenőrző eszközök online értékesítése — nem az egyszerű kategória. Mégis négyszeres megtérülést értünk el a hirdetési kampánnyal.',
    metrikaErtek: 4,
    metrikaUtotag: '×',
    metrikaLabel: 'megtérülés',
    kep: '/HIRDETES1.webp',
    accent: '#ffe600',
  },
];

function formatNum(n: number): string {
  return n >= 1000 ? n.toLocaleString('hu-HU') : String(n);
}

function useCountUp(target: number, triggerKey: number, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, triggerKey, duration]);
  return val;
}

export function ReferenciaSlider() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const isScrolling = useRef(false);

  const goTo = useCallback((index: number) => {
    if (isScrolling.current) return;
    const clamped = Math.max(0, Math.min(refs.length - 1, index));
    if (clamped === active) return;
    isScrolling.current = true;
    setActive(clamped);
    setAnimKey(k => k + 1);
    setTimeout(() => { isScrolling.current = false; }, 700);
  }, [active]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      goTo(active + (e.deltaY > 0 || e.deltaX > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [active, goTo]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(active + (diff > 0 ? 1 : -1));
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [active, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(active + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const ref = refs[active];
  const countedVal = useCountUp(ref.metrikaErtek, animKey);

  return (
    <div className={styles.root}>
      {/* Háttér glow — accent szín alapján változik */}
      <div
        className={styles.glow}
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${ref.accent}22 0%, transparent 65%)` }}
        key={`glow-${animKey}`}
      />

      {/* Tartalom — D animáció: blur-dissolve */}
      <div className={styles.content} key={animKey}>
        <div className={styles.left}>
          <div className={styles.kategoria} style={{ color: ref.accent }}>{ref.kategoria}</div>
          <h1 className={styles.cegnev}>{ref.ceg}</h1>
          <p className={styles.story}>{ref.story}</p>
          <div className={styles.metrikaWrap}>
            <div className={styles.metrikaNum} style={{ color: ref.accent }}>
              {formatNum(countedVal)}<span className={styles.metrikaUtotag}>{ref.metrikaUtotag}</span>
            </div>
            <div className={styles.metrikaLabel}>{ref.metrikaLabel}</div>
          </div>
          <Link href="/#kapcsolat" className={styles.cta}>Ilyet akarok →</Link>
        </div>

        <div className={styles.right}>
          <div className={styles.imgFrame}>
            <Image src={ref.kep} alt={ref.ceg} fill style={{ objectFit: 'cover' }} sizes="40vw" priority />
          </div>
        </div>
      </div>

      {/* Dot navigáció */}
      <div className={styles.dots}>
        {refs.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => goTo(i)} aria-label={`${i + 1}. referencia`} />
        ))}
      </div>

      {active > 0 && (
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => goTo(active - 1)} aria-label="Előző">←</button>
      )}
      {active < refs.length - 1 && (
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => goTo(active + 1)} aria-label="Következő">→</button>
      )}

      <Link href="/" className={styles.back}>← Vissza</Link>

      <div className={styles.counter}>
        <span className={styles.counterActive}>{String(active + 1).padStart(2, '0')}</span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>{String(refs.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
