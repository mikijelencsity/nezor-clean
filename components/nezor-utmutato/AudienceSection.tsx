import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './AudienceSection.module.css';

export function AudienceSection() {
  return (
    <section className={shared.lightSection}>
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Ez az útmutató neked szól, ha…</span>
        <div className={styles.audienceGrid}>
          <div className={styles.audienceCard}>
            <span className={styles.audienceTag}>Még nincs weboldalad</span>
            <h3>Nem tudod, hol kezdd — és félsz, hogy drága lesz</h3>
            <p>
              Megmutatjuk pontosan mit kell tudnod mielőtt elindulsz: mibe kerül, mennyi idő, mire
              számíthatsz az első hónapokban — és mikor fogja hozni az első megkeresést.
            </p>
          </div>
          <div className={styles.audienceCard}>
            <span className={styles.audienceTag}>Van weboldalad, de nem hoz munkát</span>
            <h3>Megvan az oldalad, de a telefon nem csörög miatta</h3>
            <p>
              Megnézzük mi hiányzik belőle. A legtöbb esetben nem a weboldal a probléma — hanem
              az, hogy senki nem találja, vagy aki megtalálja, nem hív.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
