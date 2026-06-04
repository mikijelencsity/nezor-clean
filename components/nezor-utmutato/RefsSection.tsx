import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './RefsSection.module.css';

export function RefsSection() {
  return (
    <section className={shared.lightSection} id="referencia">
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Korábbi munkák</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Akiknek már <span className={shared.accentDark}>megcsináltuk.</span>
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Ezek nem mockupok. Mind valódi magyar vállalkozás, akik ma is használják azt, amit
          közösen építettünk fel velük.
        </p>
        <div className={styles.refsGrid}>
          <div className={`${styles.refCard} ${styles.featured}`}>
            <div className={`${styles.refImg} ${styles.dark}`}>🌐</div>
            <div className={styles.refBody}>
              <span className={styles.refBadge}>Saját — nezor.hu</span>
              <h3>NEZOR Webfejlesztés</h3>
              <p>A saját bemutatkozó oldalunk. Amit hirdetünk, magunkon is alkalmazzuk.</p>
              <span className={styles.refUrl}>nezor.hu</span>
            </div>
          </div>
          <div className={styles.refCard}>
            <div className={styles.refImg}>🏗️</div>
            <div className={styles.refBody}>
              <span className={styles.refBadge}>Építőipar — Baja</span>
              <h3>Estur Épker Kft.</h3>
              <p>
                Többnyelvű (HU/EN/DE) építőipari weboldal, szolgáltatások, referenciák és
                partnerek.
              </p>
              <span className={styles.refUrl}>estur.hu</span>
            </div>
          </div>
          <div className={styles.refCard}>
            <div className={styles.refImg}>🔧</div>
            <div className={styles.refBody}>
              <span className={styles.refBadge}>Épületgépészet — Kecskemét</span>
              <h3>ZT Épületgépészet</h3>
              <p>Komplett bemutatkozó oldal + 15 cikkes magyar nyelvű szakmai blog a SEO-hoz.</p>
              <span className={styles.refUrl}>ztepuletgepeszet.hu</span>
            </div>
          </div>
          <div className={styles.refCard}>
            <div className={styles.refImg}>🏠</div>
            <div className={styles.refBody}>
              <span className={styles.refBadge}>Építőipar</span>
              <h3>Hellinger Kft.</h3>
              <p>
                Bemutatkozó oldal folyamatos fejlesztéssel — az ügyfél ma is aktívan bővíti velünk
                együtt.
              </p>
              <span className={styles.refUrl}>hellingerkft.hu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
