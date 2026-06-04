import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './CouponSection.module.css';

export function CouponSection() {
  return (
    <section
      className={shared.lightSection}
      style={{
        background: 'linear-gradient(180deg,#eef4ff 0%,#fff8dc 100%)',
        padding: '56px 24px',
      }}
    >
      <GridBg light />
      <div className={styles.testiWrap} style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.testiCard}>
          <div className={shared.starsRow}>★★★★★</div>
          <p className={styles.testiText}>
            „Jó lett a weboldal, átlátható lett minden, és nem sokkal utána már meg is kerestek
            rajta keresztül."
          </p>
          <div className={styles.reviewHead}>
            <div className={`${shared.avatar} ${shared.avCyan}`}>TZ</div>
            <div>
              <div className={styles.reviewName}>Tihanics Zalán</div>
              <div className={styles.reviewMeta}>ZT Épületgépészet, Kecskemét</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
