import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './BonusSection.module.css';

export function BonusSection() {
  return (
    <section className={shared.lightSection}>
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Az adatok</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Mit mondanak <span className={shared.accentDark}>a számok?</span>
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Ezek nem általunk kitalált adatok — a magyar és nemzetközi piacon végzett kutatások
          egybehangzóan ezt mutatják az építőipari szolgáltatások területén.
        </p>
        <div className={styles.bigstatsGrid}>
          <div className={styles.bigstatCard}>
            <span className={styles.bigstatNum}>81%</span>
            <p className={styles.bigstatDesc}>
              Az emberek először online keresnek, mielőtt szakembert választanának
            </p>
          </div>
          <div className={styles.bigstatCard}>
            <span className={styles.bigstatNum}>72%</span>
            <p className={styles.bigstatDesc}>
              A Google-értékeléseket ugyanolyan komolyan veszik, mint a személyes ajánlást
            </p>
          </div>
          <div className={styles.bigstatCard}>
            <span className={styles.bigstatNum}>4×</span>
            <p className={styles.bigstatDesc}>
              Ennyiszer több megkeresést kap az a vállalkozás, amelynek 10+ értékelése van
            </p>
          </div>
          <div className={styles.bigstatCard}>
            <span className={styles.bigstatNum}>67%</span>
            <p className={styles.bigstatDesc}>
              Lemond a kapcsolatfelvételről, ha a weboldal nem mobilbarát vagy elavult
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
