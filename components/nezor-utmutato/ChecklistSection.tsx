import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './ChecklistSection.module.css';

export function ChecklistSection() {
  return (
    <section className={shared.lightSection}>
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Gyakori félreértés</span>
        <h2
          className={`${shared.secTitle} ${shared.secTitleDark}`}
          style={{ maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          „Nekem van Facebook-oldalam,{' '}
          <span className={shared.accentDark}>az elég."</span> Nem az.
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Sokan azt hiszik, hogy egy Facebook-profil helyettesíti a weboldalt. A kettő más célt
          szolgál — és weboldal nélkül komolyan versenyhátrányban vagy.
        </p>
        <div className={styles.compareWrap}>
          <div className={styles.compareHead}>
            <span>Mit néz az ügyfél</span>
            <span>Weboldal</span>
            <span>Facebook</span>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.crLabel}>Megtalálja-e Google-ön?</span>
            <span className={styles.crVal}>✅</span>
            <span className={styles.crVal}>❌</span>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.crLabel}>Az adatai (képek, szöveg) az övéi?</span>
            <span className={styles.crVal}>✅</span>
            <span className={styles.crVal}>❌</span>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.crLabel}>Befolyásolja-e az algoritmus?</span>
            <span className={styles.crVal}>❌</span>
            <span className={styles.crVal}>✅</span>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.crLabel}>Referenciák, galéria rendesen megjelenítve?</span>
            <span className={styles.crVal}>✅</span>
            <span className={styles.crVal}>〰️</span>
          </div>
          <div className={styles.compareRow}>
            <span className={styles.crLabel}>Professzionális benyomás az ügyfélnek?</span>
            <span className={styles.crVal}>✅</span>
            <span className={styles.crVal}>〰️</span>
          </div>
          <div className={styles.compareNote}>
            <strong>Összefoglalás:</strong> A Facebook-oldal hasznos kiegészítő — de nem
            helyettesíti a weboldalt. A kettő együtt működik a legjobban.
          </div>
        </div>
      </div>
    </section>
  );
}
