import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './TimelineSection.module.css';

export function TimelineSection() {
  return (
    <section
      className={shared.lightSection}
      id="idosor"
      style={{ background: 'linear-gradient(180deg,#fff8dc 0%,#eef4ff 100%)' }}
    >
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Ha még nincs weboldalad — ez vár rád</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Így néz ki egy weboldal az{' '}
          <span className={shared.accentDark}>első 6 hónapban.</span>
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Sokan azt kérdezik: mikor fog hozni eredményt? Az őszinte válasz: nem azonnal — de
          hamarabb, mint gondolnád.
        </p>
        <div className={styles.timelineWrap}>
          <div className={styles.tlItem}>
            <div className={styles.tlDot}>
              1–2<br />hét
            </div>
            <div className={styles.tlContent}>
              <span className={styles.tlTime}>1–2. hét</span>
              <h3>Az oldal elkészül és élesedik</h3>
              <p>
                Bemutatkozó szöveg, referenciafotók, elérhetőség, mobilbarát dizájn. Google már
                indexeli — mostantól találhatóvá válsz.
              </p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDot}>
              2–4<br />hét
            </div>
            <div className={styles.tlContent}>
              <span className={styles.tlTime}>2–4. hét</span>
              <h3>Google-profil beállítás és első értékelések</h3>
              <p>
                Beállítjuk a Google Business profilt, megkérjük a régi ügyfeleket értékelésre.
                Ettől kezdve a Google Térképen is megjelensz.
              </p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDot}>
              1–2<br />hó
            </div>
            <div className={styles.tlContent}>
              <span className={styles.tlTime}>1–2. hónap</span>
              <h3>Első organikus megkeresések</h3>
              <p>
                Tapasztalataink szerint ügyfeleink többsége az első 6 héten belül kap olyan hívást,
                ahol a hívó azt mondja: „a neten találtalak meg."
              </p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDot}>
              3–6<br />hó
            </div>
            <div className={styles.tlContent}>
              <span className={styles.tlTime}>3–6. hónap</span>
              <h3>Rendszeres forgalom és magasabb ár</h3>
              <p>
                Ahogy gyűlnek az értékelések és nő a látogatottság, a beérkező megkeresések
                minősége is javul — az érdeklődők kevésbé árérzékenyek.
              </p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDot}>
              6+<br />hó
            </div>
            <div className={styles.tlContent}>
              <span className={styles.tlTime}>6+ hónap</span>
              <h3>A weboldal visszahozta az árát — és tovább dolgozik</h3>
              <p>
                Egy jól felépített weboldal évekig dolgozik neked. Nem kell fizetned minden egyes
                megkeresésért — szemben a hirdetésekkel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
