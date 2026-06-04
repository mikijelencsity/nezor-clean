import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './BridgeSection.module.css';

export function BridgeSection() {
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
            „Ár-érték arányban nem találtunk jobbat a környéken.{' '}
            <mark>Megértették, hogy az építőiparban más szókincs, más logika kell.</mark>"
          </p>
          <div className={styles.reviewHead}>
            <div className={`${shared.avatar} ${shared.avGold}`}>LO</div>
            <div>
              <div className={styles.reviewName}>Lengyel Olivér</div>
              <div className={styles.reviewMeta}>Estur Épker Kft., Baja</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
