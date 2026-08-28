'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './NotFoundPage.module.css';

const HINTS = [
  'Ha ez egy weboldal lenne, most nem tűnne el.',
  'Szólj, és mi megépítjük azt, ami nem 404-ezik.',
  'A NEZOR-nál a linkek is működnek. Tényleg.',
  'Ennyi kattintásból már egy landing oldalt is meg lehetne tervezni.',
  'Oké, ez már makacs — de attól még nem lesz itt semmi.',
];

const DODGE_RADIUS = 160;
const PARTICLE_COUNT = 14;

export function NotFoundPage() {
  const [clicks, setClicks] = useState(0);
  const [mascotPos, setMascotPos] = useState({ left: 0, top: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const mascotPosRef = useRef(mascotPos);
  mascotPosRef.current = mascotPos;

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * -10,
      })),
    []
  );

  useEffect(() => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    setMascotPos({
      left: (bounds?.width ?? window.innerWidth) * 0.78,
      top: (bounds?.height ?? window.innerHeight) * 0.68,
    });
  }, []);

  const jumpMascot = useCallback(() => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    const maxLeft = (bounds?.width ?? window.innerWidth) - 70;
    const maxTop = (bounds?.height ?? window.innerHeight) - 70;
    setMascotPos({
      left: Math.max(20, Math.random() * maxLeft),
      top: Math.max(20, Math.random() * maxTop),
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setParallax({
      x: ((e.clientX - bounds.left) / bounds.width - 0.5) * 24,
      y: ((e.clientY - bounds.top) / bounds.height - 0.5) * 24,
    });

    const mx = e.clientX - bounds.left;
    const my = e.clientY - bounds.top;
    const { left, top } = mascotPosRef.current;
    const dx = left + 32 - mx;
    const dy = top + 32 - my;
    const dist = Math.hypot(dx, dy);

    if (dist < DODGE_RADIUS) {
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
      const push = DODGE_RADIUS - dist + 40;
      const maxLeft = bounds.width - 70;
      const maxTop = bounds.height - 70;
      setMascotPos({
        left: Math.min(maxLeft, Math.max(10, left + Math.cos(angle) * push)),
        top: Math.min(maxTop, Math.max(10, top + Math.sin(angle) * push)),
      });
    }
  }, []);

  const handleCodeClick = () => {
    setClicks((c) => c + 1);
    jumpMascot();
  };

  const hint = clicks > 0 ? HINTS[Math.min(clicks - 1, HINTS.length - 1)] : '';

  return (
    <div className={styles.wrap} ref={wrapRef} onMouseMove={handleMouseMove}>
      <div className={styles.bgGrid} />
      <div
        className={`${styles.blob} ${styles.blob1}`}
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      />
      <div
        className={`${styles.blob} ${styles.blob2}`}
        style={{ transform: `translate(${-parallax.x}px, ${-parallax.y}px)` }}
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div
        className={styles.mascot}
        style={{ left: mascotPos.left, top: mascotPos.top }}
        aria-hidden
      >
        <svg viewBox="0 0 64 64" width="56" height="56">
          <circle cx="32" cy="32" r="30" fill="url(#g)" />
          <circle cx="23" cy="28" r="4.5" fill="#0f1226" />
          <circle cx="41" cy="28" r="4.5" fill="#0f1226" />
          <path d="M22 41c4 5 16 5 20 0" stroke="#0f1226" strokeWidth="3" fill="none" strokeLinecap="round" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--blue)" />
              <stop offset="100%" stopColor="var(--yellow)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
