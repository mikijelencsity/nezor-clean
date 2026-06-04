import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './UtmutatatoContactSection.module.css';

export function UtmutatatoContactSection() {
  return (
    <section className={shared.lightSection} id="kapcsolat">
      <GridBg light />
      <div className={shared.container} style={{ position: 'relative', zIndex: 1 }}>
        <div className={`${shared.secLabel} ${shared.textCenter}`}>
          Ingyenes egyeztetés — kötelezettség nélkül
        </div>
        <h2
          className={`${shared.secTitle} ${shared.secTitleDark} ${shared.textCenter}`}
          style={{ marginBottom: '48px' }}
        >
          Mondd el, hol tartasz most —{' '}
          <span className={shared.accentDark}>megmutatjuk a következő lépést.</span>
        </h2>
        <div className={styles.contactWrap}>
          <div className={styles.contactLeft}>
            <div className={styles.contactShapes}>
              <span></span>
              <span></span>
            </div>
            <h3>
              Akár van weboldalad, akár nincs —{' '}
              <span className={shared.accent}>20 perc alatt</span> konkrét javaslatot adunk.
            </h3>
            <p>
              Nem fogunk azonnal eladni semmit. Először megértjük, mi kell neked — aztán
              megmutatjuk a legjobb utat.
            </p>
            <ul className={styles.contactStepsList}>
              <li>
                <span className={styles.stepNum}>1</span>Kitöltöd a formot — 30 másodperc
              </li>
              <li>
                <span className={styles.stepNum}>2</span>24 órán belül időpontot küldünk
              </li>
              <li>
                <span className={styles.stepNum}>3</span>30 perces hívás — utána írásos javaslat
              </li>
            </ul>
            <ul className={styles.contactBullets}>
              <li>24 órán belüli válasz</li>
              <li>Nincs kötelezettség</li>
              <li>Csak őszinte beszélgetés</li>
            </ul>
          </div>
          <div className={styles.contactRight}>
            <h4>Foglalok egy ingyenes egyeztetést</h4>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Keresztneved *</label>
                <input type="text" placeholder="Pl. László" />
              </div>
              <div className={styles.field}>
                <label>E-mail-cím *</label>
                <input type="email" placeholder="te@cegednev.hu" />
              </div>
            </div>
            <button className={styles.formSubmit}>
              Foglalok egy ingyenes egyeztetést →
            </button>
            <p className={styles.formFoot}>
              Az adataidat csak veled fogjuk használni — sehova nem továbbítjuk. 24 órán belül
              visszaírunk.
            </p>
            <p className={styles.formAlt}>
              vagy ha gyorsabb így:{' '}
              <a href="mailto:info@nezor.hu">info@nezor.hu</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
