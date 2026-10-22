'use client';
import { useEffect, useState } from 'react';
import { trackEvent } from '@/components/analytics/FacebookPixel';
import styles from './EpitoiparPage.module.css';

/** sessionStorage kulcs: az űrlap végleges elküldése után ide kerül a név, a szám és a Meta eventId */
export const KOSZONJUK_KULCS = 'nezorEpitoiparKoszonjuk';

type Bekuldes = { nev: string; mobil: string; eventId?: string; leadKuldve?: boolean };

function sutiElfogadva(): boolean {
  try {
    return localStorage.getItem('nezorCookieConsent') === 'accepted';
  } catch {
    return false;
  }
}

function olvas(): Bekuldes | null {
  try {
    const nyers = sessionStorage.getItem(KOSZONJUK_KULCS);
    return nyers ? (JSON.parse(nyers) as Bekuldes) : null;
  } catch {
    return null;
  }
}

/**
 * Köszönőoldal az építőipari landing után (/epitoipar/koszonjuk, /landing100/koszonjuk).
 * Csak végleges beküldés után jutnak ide. A Meta Lead eseményt a szerver (CAPI) minden beküldésnél elküldi;
 * itt a böngészős pixel csak süti-elfogadásnál fut, ugyanazzal az eventId-vel, így a Meta egynek számolja.
 * Frissítéskor nem tüzel újra. Az oldal saját URL-je miatt a Metában URL-alapú konverzió is beállítható.
 */
export function EpitoiparKoszonjuk() {
  const [adat, setAdat] = useState<Bekuldes | null>(null);

  useEffect(() => {
    const b = olvas();
    setAdat(b);
    if (!b?.eventId || b.leadKuldve || !sutiElfogadva()) return;
    // a pixel inicializálása (FacebookPixel) ugyanebben a körben fut, ezért várunk egy kicsit
    const t = setTimeout(() => {
      trackEvent('Lead', {}, b.eventId);
      try {
        sessionStorage.setItem(KOSZONJUK_KULCS, JSON.stringify({ ...b, leadKuldve: true }));
      } catch { /* nem elérhető */ }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.lepes}>
          <div className={styles.kesz} aria-hidden="true">✓</div>
          <h1 className={styles.kerdes}>Megkaptuk{adat?.nev ? `, ${adat.nev}` : ''}!</h1>
          <p className={styles.al}>
            {adat?.mobil
              ? <>Hamarosan hívunk a <b>+36 {adat.mobil}</b> számon, erről a számról: <b>+36 30 203 6721</b>. Vedd fel! 📞</>
              : <>Hamarosan hívunk erről a számról: <b>+36 30 203 6721</b>. Vedd fel! 📞</>}
            <br />Kérdés esetén: <a href="mailto:info@nezor.hu">info@nezor.hu</a>
          </p>
        </div>
      </div>
    </div>
  );
}
