import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import shared from './utmutato-shared.module.css';
import styles from './DarkCTASection.module.css';

export function DarkCTASection() {
  return (
    <section className={shared.darkSection}>
      <GridBg />
      <GlowBlob color="blue" style={{ opacity: 0.3 }} />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={`${shared.secLabel} ${styles.labelBlue}`}>
          Ha még nincs weboldalad
        </span>
        <h2 className={`${shared.secTitle} ${shared.secTitleWhite}`}>
          Minden nap elveszítesz{' '}
          <span className={shared.accent}>potenciális ügyfeleket</span> — és nem is tudod.
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedLight} ${shared.mxAuto} ${shared.mb60}`}
        >
          Magyarországon havonta több tízezer ember keres Google-ön helyi szakembert. Ezek a
          keresések valakihez jutnak el. Ha nincs online jelenléted, az garantáltan nem te leszel.
        </p>
        <div className={styles.lossGrid}>
          <div className={styles.lossCard}>
            <span className={styles.lossNum}>~320</span>
            <span>ember keres havonta Google-ön tetőfedőt egy átlagos magyar megyében</span>
          </div>
          <div className={styles.lossCard}>
            <span className={styles.lossNum}>10</span>
            <span>
              link fér el a Google első oldalán — aki nincs ott, a keresések 95%-ából kiesik
            </span>
          </div>
          <div className={styles.lossCard}>
            <span className={styles.lossNum}>3×</span>
            <span>
              magasabb árat tud elkérni az a szakember, akinek professzionális weboldalán
              referenciák is vannak
            </span>
          </div>
        </div>
        <div className={styles.lossQuote}>
          <p>
            Nem azért veszítesz ügyfelet, mert rosszabb vagy a versenytársadnál. Hanem azért, mert
            ő megtalálható — te meg nem.
          </p>
        </div>
      </div>
    </section>
  );
}
