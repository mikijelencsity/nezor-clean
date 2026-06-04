import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './UtmutatatoServicesSection.module.css';

export function UtmutatatoServicesSection() {
  return (
    <section
      className={shared.lightSection}
      id="szolgaltatasok"
      style={{ background: 'linear-gradient(180deg,#fff8dc 0%,#eef4ff 100%)' }}
    >
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Amit kínálunk</span>
        <h2 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Négy dolog, ami együtt <span className={shared.accentDark}>működő rendszert alkot.</span>
        </h2>
        <p
          className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}
        >
          Nem kell mindet egyszerre — de mindegyik egy lépéssel közelebb visz ahhoz, hogy az
          ügyfelek téged találjanak meg.
        </p>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <div className={styles.serviceNum}>01</div>
              <div>
                <h3>Weboldal</h3>
                <div className={styles.serviceLead}>A digitális névjegyed</div>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <p>Mobilbarát, gyors, képekkel a munkáidról. Az alap, ami nélkül minden más nem működik.</p>
            </div>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <div className={styles.serviceNum}>02</div>
              <div>
                <h3>Google-profil</h3>
                <div className={styles.serviceLead}>Helyi megjelenés a térképen</div>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <p>
                Amikor valaki a szakmádra keres a környékeden, te jelenj meg. Értékelések, térkép,
                elérhetőség — beállítjuk, optimalizáljuk.
              </p>
            </div>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <div className={styles.serviceNum}>03</div>
              <div>
                <h3>Facebook-hirdetés</h3>
                <div className={styles.serviceLead}>Te éred el az ügyfelet</div>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <p>
                Célzott hirdetések a környékeden élő, felújítást tervező embereknek. Te éred el az
                ügyfelet, nem csak várod.
              </p>
            </div>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <div className={styles.serviceNum}>04</div>
              <div>
                <h3>Közösségi média képzés</h3>
                <div className={styles.serviceLead}>Heti 20 perc, folyamatos jelenlét</div>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <p>
                Megtanítjuk hogyan posztolj hetente egyszer — okostelefonnal, 20 perc alatt —, ami
                folyamatosan hitelességet épít.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.priceBox}>
          <div className={styles.priceBoxText}>
            <span className={styles.pbLabel}>Mennyibe kerül?</span>
            <strong>Alap weboldal 50 000 Ft-tól indul.</strong>
            <p>
              Egyetlen elveszített megrendelés általában ennek a 3–4-szerese. Az egyeztetésen pontos
              árajánlatot adunk — ingyen, kötelezettség nélkül.
            </p>
          </div>
          <a href="#kapcsolat" className={`${shared.btn} ${shared.btnPrimary}`}>
            Kérek árajánlatot →
          </a>
        </div>
      </div>
    </section>
  );
}
