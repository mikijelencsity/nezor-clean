import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './SituationSection.module.css';

export function SituationSection() {
  return (
    <>
      {/* Part Divider */}
      <div className={styles.partDivider} id="helyzet">
        <div className={styles.partDividerInner}>
          <div className={styles.partEyebrow}>I. Rész</div>
          <div className={styles.partMega}>
            <span className={shared.accentDark}>A helyzet</span>
          </div>
          <p className={styles.partTagline}>Mi a baj, miért van így, és mit mutatnak a számok</p>
        </div>
      </div>

      {/* Pain Points */}
      <section className={shared.lightSection}>
        <GridBg light />
        <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
          <span className={shared.secLabel}>A probléma</span>
          <h2
            className={`${shared.secTitle} ${shared.secTitleDark}`}
            style={{ maxWidth: '820px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Valószínűleg azért olvasod, mert{' '}
            <span className={shared.accentDark}>ismerős ez az érzés.</span>
          </h2>
          <div className={`${styles.painIntro} ${shared.textCenter} ${shared.mb60}`}>
            <p>
              Évek óta dolgozol a szakmádban. Tudod, mit csinálsz, és a munkáid magukért
              beszélnek — legalábbis annak, aki látta őket. A baj az, hogy ma egyre kevesebben
              látják.
            </p>
            <p>
              A megrendelők keresési szokásai megváltoztak. Aki ma szakembert keres, az nem a
              szomszédot kérdezi először — hanem a Google-t. És ha ott nem talál meg téged,
              továbblép a következőhöz.
            </p>
          </div>
          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <span className={styles.painNum}>01</span>
              <h3>Kevesebb a megkeresés</h3>
              <p>Régen állandóan csörgött a telefon. Most hetekig is eltarthat, mire új munka jön be.</p>
            </div>
            <div className={styles.painCard}>
              <span className={styles.painNum}>02</span>
              <h3>Árlenyomás</h3>
              <p>
                Sokan az „olcsóbb ajánlatot" választják, mert nincs alapod megmutatni, miért éri
                meg téged választani.
              </p>
            </div>
            <div className={styles.painCard}>
              <span className={styles.painNum}>03</span>
              <h3>Láthatatlanság</h3>
              <p>
                Aki rád keres a neten, semmit nem talál — vagy egy elhagyott Facebook-oldalt
                2020-ból.
              </p>
            </div>
            <div className={styles.painCard}>
              <span className={styles.painNum}>04</span>
              <h3>Bizonytalan jövő</h3>
              <p>
                Nem tudod megtervezni a következő hónapokat, mert nem tudod, lesz-e munka.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
