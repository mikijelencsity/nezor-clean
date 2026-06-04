import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import styles from './UtmutatatoHero.module.css';

export function UtmutatatoHero() {
  return (
    <section className={styles.hero}>
      <GridBg />
      <GlowBlob color="blue" />
      <GlowBlob color="yellow" />
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>Képzeld el</div>
        <h1>Valaki most keres egy szakembert a környékeden.</h1>
        <span className={styles.heroPunch}>
          <span className={styles.accent}>Nem téged talál.</span>
        </span>
        <p className={styles.heroSub}>
          Naponta elveszíted azokat az ügyfeleket, akik nem találnak online.
          Megmutatjuk, hogyan legyél ott, amikor keresnek — és hogyan válasszanak téged.
        </p>
        <div className={styles.heroCta}>
          <a href="#kapcsolat" className={`${styles.btn} ${styles.btnPrimary}`}>
            Ingyenes egyeztetés →
          </a>
          <a href="#helyzet" className={`${styles.btn} ${styles.btnGhost}`}>
            Olvasd el az útmutatót
          </a>
        </div>
        <div className={styles.heroStats}>
          <div>
            <div className={styles.statNum}>6+</div>
            <div className={styles.statLabel}>Év tapasztalat</div>
          </div>
          <div>
            <div className={styles.statNum}>20+</div>
            <div className={styles.statLabel}>Magyar vállalkozás</div>
          </div>
          <div>
            <div className={styles.statNum}>10%</div>
            <div className={styles.statLabel}>Most kedvezmény</div>
          </div>
        </div>
      </div>
    </section>
  );
}
