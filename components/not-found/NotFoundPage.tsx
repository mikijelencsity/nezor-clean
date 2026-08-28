'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NotFoundPage.module.css';

const HINTS = [
  'Ha ez egy weboldal lenne, most nem tűnne el.',
  'Szólj, és mi megépítjük azt, ami nem 404-ezik.',
  'A NEZOR-nál a linkek is működnek. Tényleg.',
  'Ennyi kattintásból már egy landing oldalt is meg lehetne tervezni.',
  'Oké, ez már gyanús — de a doboz is fárad, hagyjuk békén.',
];

export function NotFoundPage() {
  const [clicks, setClicks] = useState(0);
  const [mascotPos, setMascotPos] = useState<{ left: number; top: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fleeMascot = useCallback(() => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    const maxLeft = (bounds?.width ?? window.innerWidth) - 80;
    const maxTop = (bounds?.height ?? window.innerHeight) - 80;
    setMascotPos({
      left: Math.max(16, Math.random() * maxLeft),
      top: Math.max(16, Math.random() * maxTop),
    });
  }, []);

  const handleCodeClick = () => {
    setClicks((c) => c + 1);
    fleeMascot();
  };

  const hint = clicks > 0 ? HINTS[Math.min(clicks - 1, HINTS.length - 1)] : '';

  return (
    <div className={styles.wrap} ref={wrapRef} onMouseEnter={() => !mascotPos && fleeMascot()}>
      <div className={styles.bgGrid} />
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      {mascotPos && (
        <Image
          src="/nezor-doboz-v2.webp"
          alt=""
          width={64}
          height={64}
          className={styles.mascot}
          style={{ left: mascotPos.left, top: mascotPos.top }}
        />
      )}

      <div className={styles.content}>
        <div className={styles.code} onClick={handleCodeClick} title="Bökj rá, ha unatkozol">
          404
        </div>
        <div className={styles.title}>Ez az oldal nem épült meg — vagy elköltözött.</div>
        <p className={styles.subtitle}>
          A link, amit követtél, nem vezet sehova. Nálunk ez ritkán fordul elő — a weboldalainkon
          minden gomb és link oda megy, ahova kell.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            Vissza a főoldalra
          </Link>
          <Link href="/#kapcsolat" className={styles.btnSecondary}>
            Kapcsolatfelvétel
          </Link>
        </div>

        <div className={styles.easterEgg}>
          <div className={styles.hint}>{hint}</div>
        </div>
      </div>
    </div>
  );
}
