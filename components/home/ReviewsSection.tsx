import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Squiggle } from '@/components/ui/Squiggle';
import styles from './ReviewsSection.module.css';

export function ReviewsSection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '30%', left: '-200px' }} />
      <GlowBlob color="yellow" style={{ bottom: '10%', right: '-150px' }} />
      <Squiggle
        d="M250,20 Q100,100 200,200 T150,400 Q80,460 250,490"
        viewBox="0 0 300 500"
        style={{ top: 50, right: 0, width: 300, height: 500 }}
      />

      <SectionTitle>
        Valós visszajelzések<br />
        <span className={styles.accent}>különböző cégektől</span>
      </SectionTitle>

      <div className={styles.reviewsGrid}>
        {/* Card 1 */}
        <div className={styles.reviewCard}>
          <div className={styles.reviewHead}>
            <div className={`${styles.avatar} ${styles.avatarGreen}`}>K</div>
            <div>
              <div className={styles.reviewName}>Kovács Dóra</div>
              <div className={styles.reviewMeta}>3 Google-értékelés</div>
            </div>
            <div className={styles.gLogo}><span>G</span></div>
          </div>
          <div className={styles.stars}>★★★★★ <span className={styles.date}>4 hónapja</span></div>
          <p className={styles.reviewText}>
            Korábban semmit sem tudtam a hirdetéseinkről. Most <mark>minden hétfőn megnézem a riportot</mark>, és pontosan tudom, mi működött és mi nem. Nagyobb lett a bizalmam a marketingbe is, meg magamba is.
          </p>
          <div className={styles.reviewActions}><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
        </div>

        {/* Card 2 */}
        <div className={styles.reviewCard}>
          <div className={styles.reviewHead}>
            <div className={`${styles.avatar} ${styles.avatarBlue}`}>N</div>
            <div>
              <div className={styles.reviewName}>Nagy Balázs</div>
              <div className={styles.reviewMeta}>7 Google-értékelés</div>
            </div>
            <div className={styles.gLogo}><span>G</span></div>
          </div>
          <div className={styles.stars}>★★★★★ <span className={styles.date}>2 hónapja</span></div>
          <p className={styles.reviewText}>
            A második hónap végére <mark>kétszer annyi minőségi érdeklődőnk volt</mark>, és a pipeline is rendezett lett. Nem vesztek el a jó leadek – és ez volt a legnagyobb problémánk korábban.
          </p>
          <div className={styles.reviewActions}><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
        </div>

        {/* Card 3 */}
        <div className={styles.reviewCard}>
          <div className={styles.reviewHead}>
            <div className={`${styles.avatar} ${styles.avatarRed}`}>T</div>
            <div>
              <div className={styles.reviewName}>Tóth Krisztina</div>
              <div className={styles.reviewMeta}>5 Google-értékelés</div>
            </div>
            <div className={styles.gLogo}><span>G</span></div>
          </div>
          <div className={styles.stars}>★★★★★ <span className={styles.date}>6 hónapja</span></div>
          <p className={styles.reviewText}>
            Nem egy újabb bonyolult szoftvert kaptam, hanem <mark>egy működő rendszert</mark>. A heti riport tényleg segít, és végre értem, mi mögött van eredmény és mi mögött csak szerencse.
          </p>
          <div className={styles.reviewActions}><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
        </div>
      </div>

      <p className={styles.disclaimer}>
        Az oldalon megjelenő visszajelzések valódi ügyfeleinktől származnak, nevük és adataik engedélyükkel kerültek feltüntetésre. Az egyéni eredmények az üzleti modell, a piaci körülmények és az egyéni hozzáállás függvényében eltérhetnek, és nem tekinthetők garantált átlagnak. Az első konzultáció díjmentes és kötelezettségmentes.
      </p>
    </section>
  );
}
