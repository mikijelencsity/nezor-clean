import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <GridBg />
      <GlowBlob color="blue" />
      <GlowBlob color="yellow" />

      <div className={styles.container}>
        <div className={styles.badge}>Weboldal + Meta hirdetés</div>

        <h1 className={styles.title}>
          Weboldal, amit <span className={styles.accent}>látnak.</span><br />
          Ügyfél, aki <span className={styles.accent}>vásárol.</span>
        </h1>

        <p className={styles.sub}>
          Weboldalakat és webshopokat építek, majd Meta hirdetésekkel hozom rájuk a vevőket. Egy kézből, átlátható áron.
        </p>

        <div className={styles.ctaRow}>
          <a href="#kapcsolat" className={`${styles.btn} ${styles.btnPrimary}`}>Konzultációt kérek →</a>
          <a href="#" className={`${styles.btn} ${styles.btnGhost}`}>Esettanulmányok</a>
        </div>

        <div className={styles.media}>
          <video
            className={styles.mediaVideo}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/cursorful-video-1780505482371.mp4" type="video/mp4" />
          </video>
        </div>

        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>20+</div>
            <div className={styles.statLabel}>elégedett ügyfél</div>
          </div>
          <div>
            <div className={styles.statNum}>5 év</div>
            <div className={styles.statLabel}>tapasztalat</div>
          </div>
          <div>
            <div className={styles.statNum}>100%</div>
            <div className={styles.statLabel}>elégedettségi garancia</div>
          </div>
        </div>
      </div>
    </section>
  );
}
