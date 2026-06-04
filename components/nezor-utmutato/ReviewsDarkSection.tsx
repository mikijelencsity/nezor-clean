import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import shared from './utmutato-shared.module.css';
import styles from './ReviewsDarkSection.module.css';

export function ReviewsDarkSection() {
  return (
    <section className={shared.darkSection} id="velemenyek">
      <GridBg />
      <GlowBlob color="yellow" style={{ opacity: 0.25 }} />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={`${shared.secLabel} ${styles.labelBlue}`}>Vélemények</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleWhite}`}>
          Amit az ügyfeleink <span className={shared.accent}>mondanak rólunk.</span>
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedLight} ${shared.mxAuto} ${shared.mb60}`}
        >
          Nem reklámszövegek. Magyar vállalkozók, akikkel együtt dolgoztunk — saját szavaikkal.
        </p>
        <div className={styles.testiGrid}>
          <div className={styles.testiGCard}>
            <div className={shared.starsRow}>★★★★★</div>
            <p className={styles.tgQuote}>
              „Őszintén, eleinte szkeptikus voltam — annyi mindenki ígér mindenfélét. De náluk az
              volt a különbség, hogy nem akartak rögtön eladni valamit. Először végighallgatták, mit
              csinálunk, és csak utána mondtak véleményt. A weboldal és a blog azóta is hozza az
              érdeklődőket."
            </p>
            <div className={styles.tgAuthor}>
              <div className={`${shared.avatar} ${shared.avCyan}`}>TZ</div>
              <div>
                <span className={styles.tgName}>Tihanics Zalán</span>
                <span className={styles.tgRole}>ZT Épületgépészet, Kecskemét</span>
              </div>
            </div>
          </div>
          <div className={styles.testiGCard}>
            <div className={shared.starsRow}>★★★★★</div>
            <p className={styles.tgQuote}>
              „Az volt számomra a legjobb, hogy megértették, mit csinálunk. Az építőiparban más
              szókincs, más logika kell, nem mindenki tudja kezelni. A háromnyelvű oldal pontosan
              azt tudja, amit kértünk, és német ügyfeleket is hozott már."
            </p>
            <div className={styles.tgAuthor}>
              <div className={`${shared.avatar} ${shared.avGold}`}>LO</div>
              <div>
                <span className={styles.tgName}>Lengyel Olivér</span>
                <span className={styles.tgRole}>Estur Épker Kft., Baja</span>
              </div>
            </div>
          </div>
          <div className={styles.testiGCard}>
            <div className={shared.starsRow}>★★★★★</div>
            <p className={styles.tgQuote}>
              „Más cégeknél éreztük, hogy mire végre elkészül valami, már rég nem azt akarjuk. Dani
              és Miki folyamatosan visszacsatolt, kérdezett, és pontosan azt csinálták, amit
              kértünk. Az oldalra azóta is büszkék vagyunk."
            </p>
            <div className={styles.tgAuthor}>
              <div className={`${shared.avatar} ${shared.avPurple}`}>HA</div>
              <div>
                <span className={styles.tgName}>Hellinger Adrián</span>
                <span className={styles.tgRole}>Hellinger Kft.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
