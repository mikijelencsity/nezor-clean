'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/landing';

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('nezorCookieConsent');
    } catch {
      // localStorage nem elérhető
    }
    if (!stored) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  const decide = (v: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem('nezorCookieConsent', v);
    } catch {
      // localStorage nem elérhető
    }
    setShow(false);
    window.dispatchEvent(new Event(v === 'accepted' ? 'nezor_cookie_accepted' : 'nezor_cookie_rejected'));
  };

  return (
    <div className={`${styles.bar} ${show ? styles.barShow : ''} ${isLanding ? styles.landing : ''}`}>
      <p className={styles.text}>
        Ez a weboldal sütiket használ a működéshez és a felhasználói élmény javításához. Részletek az{' '}
        <a href="/adatkezeles">Adatkezelési tájékoztatóban</a>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.reject}`} onClick={() => decide('rejected')}>
          Csak szükséges
        </button>
        <button type="button" className={`${styles.btn} ${styles.accept}`} onClick={() => decide('accepted')}>
          Elfogadom az összeset
        </button>
      </div>
    </div>
  );
}
