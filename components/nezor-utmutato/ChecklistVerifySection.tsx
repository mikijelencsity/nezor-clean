'use client';

import { useState } from 'react';
import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './ChecklistVerifySection.module.css';

const ITEMS = [
  {
    num: 1,
    title: 'Az oldalon 5 másodperc alatt érthetővé válik, mivel foglalkozol és hol dolgozol',
    tip: 'Pl. „Tetőfedő és bádogos vállalkozó, Pest megye" — nem „Minőségi megoldások minden igényre"',
  },
  {
    num: 2,
    title: 'A telefonszám az oldal tetején látható és mobilon kattintható',
    tip: 'Az érdeklődők 60%-a mobiltelefonról néz — ha nem kattintható a szám, továbblép',
  },
  {
    num: 3,
    title: 'Van legalább 5 referenciafotó valódi elvégzett munkáról',
    tip: 'Képek nélkül az ügyfél nem mer bízni benned — ezt nem lehet szövegekkel pótolni',
  },
  {
    num: 4,
    title: 'Van legalább 1 valódi ügyfélvélemény névvel',
    tip: 'Egy konkrét idézet többe ér tíz általános mondatnál',
  },
  {
    num: 5,
    title: 'Az oldal mobilon is jól néz ki és gyorsan tölt be',
    tip: 'A látogatók többsége mobilról érkezik — ha lassú vagy eltört mobilon, azonnal bezárják',
  },
  {
    num: 6,
    title: 'Szerepel valahol a cégnév, székhely vagy adószám',
    tip: 'Ez az egyik legerősebb bizalmi jel — megmutatja hogy valódi, bejegyzett vállalkozás áll mögötted',
  },
  {
    num: 7,
    title: 'Van Google Business profil és legalább 3 értékelés',
    tip: 'A Google térképes megjelenés sok esetben több megkeresést hoz mint maga a weboldal',
  },
];

const MESSAGES = [
  {
    min: 0,
    title: 'Most még sok minden hiányzik.',
    text: 'Ez nem baj, legalább pontosan látszik, honnan érdemes elindulni. Először a telefon, a referenciafotók és az alap bemutatkozás legyen rendben.',
  },
  {
    min: 3,
    title: 'Van alap, de még sok megkeresés elmehet melletted.',
    text: 'Már nem nulláról indulsz, viszont pár hiányzó rész miatt az érdeklődő könnyen továbbkattinthat.',
  },
  {
    min: 5,
    title: 'Egész jó online alapod van.',
    text: 'A legtöbb fontos bizalmi elem megvan. Itt már az apró javítások és a jobb láthatóság hozhatnak több érdeklődést.',
  },
  {
    min: 7,
    title: 'Erős az online megjelenésed.',
    text: 'Ha ezek tényleg mind rendben vannak, akkor már nem az alapokon múlik a dolog. Ilyenkor a forgalom, hirdetés és következetes tartalom a következő lépés.',
  },
];

export function ChecklistVerifySection() {
  const [checked, setChecked] = useState<boolean[]>(Array(7).fill(false));

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const score = checked.filter(Boolean).length;
  const message = MESSAGES.reduce(
    (cur, next) => (score >= next.min ? next : cur),
    MESSAGES[0]
  );
  const state = score <= 2 ? styles.isBad : score <= 4 ? styles.isMid : styles.isGood;

  return (
    <section className={shared.lightSection} id="ellenorzo">
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Elvihető eszköz</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Weboldal önellenőrző —{' '}
          <span className={shared.accentDark}>7 pont,</span> amit nézz meg most.
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Ha van weboldalad, menj végig ezen a listán. Ha nincs, nézd meg mit fog tartalmazni.
          Minden kipipált pont egy okkal több, hogy az ügyfél téged hívjon.
        </p>
        <div className={styles.clList}>
          {ITEMS.map((item, i) => (
            <div
              key={item.num}
              className={`${styles.clItem} ${checked[i] ? styles.isSelected : ''}`}
              role="checkbox"
              aria-checked={checked[i]}
              tabIndex={0}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <div className={styles.clCheck}>{item.num}</div>
              <div className={styles.clBody}>
                <strong>{item.title}</strong>
                <div className={styles.clTip}>
                  <span className={styles.clTipLabel}>Tipp:</span> {item.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.clResult} ${state}`} aria-live="polite">
          <span className={styles.clResultScore}>
            {score}/{ITEMS.length}
          </span>
          <div className={styles.clResultTitle}>{message.title}</div>
          <p className={styles.clResultText}>{message.text}</p>
        </div>
        <div className={styles.clCtaBox}>
          <h3>Mit jelent az eredmény?</h3>
          <p>
            Az egyeztetésen ezt a listát együtt nézzük végig — és megmutatjuk pontosan melyik pont
            mennyit ér a megkeresések számában. Ingyenes, kötelezettség nélkül.
          </p>
          <a href="#kapcsolat" className={`${shared.btn} ${shared.btnDark}`}>
            Kérek ingyenes átnézést →
          </a>
        </div>
      </div>
    </section>
  );
}
