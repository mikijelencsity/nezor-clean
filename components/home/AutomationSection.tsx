import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Squiggle } from '@/components/ui/Squiggle';
import styles from './AutomationSection.module.css';

export function AutomationSection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '10%', left: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, right: '-100px' }} />
      <Squiggle
        d="M40,20 Q220,100 100,220 T240,420"
        viewBox="0 0 300 460"
        style={{ top: 60, left: '3%', width: 300, height: 460 }}
      />

      <SectionLabel>03 · Automatizmus</SectionLabel>
      <SectionTitle>
        Több vásárlás <span style={{ color: '#0099b8' }}>automatikusan</span>
      </SectionTitle>
      <p className={styles.sub}>
        Két folyamat a háttérben. Az egyik visszahozza az elveszett vásárlókat, a másik visszahívja a régieket.
      </p>

      <div className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureImg}>Kép helye</div>
          <div className={styles.featureBody}>
            <h3>Érdeklődőből vásárló</h3>
            <p className={styles.featureLead}>Ne veszíts el olyan vásárlókat, akik már majdnem hívtak / fizettek.</p>
            <p>Kosárba tett, aztán eltűnt? Email és SMS emlékeztetők hozzák vissza, anélkül, hogy egy ujjadat is mozdítanád.</p>
            <div className={styles.featureListTitle}>Mit jelent a gyakorlatban</div>
            <ul className={styles.featureList}>
              <li>Látod, ki hagyta félbe a rendelést</li>
              <li>Automatikus utánkövetés indul</li>
              <li>Több befejezett vásárlás</li>
              <li>Kevesebb elveszett bevétel</li>
            </ul>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureImg}>Kép helye</div>
          <div className={styles.featureBody}>
            <h3>Vásárlóból törzsvásárló</h3>
            <p className={styles.featureLead}>Egyszeri vásárlókból visszatérő ügyfelek. Automatikusan.</p>
            <p>Vásárlás után nem ér véget a kapcsolat. Email-sorozatok tartják melegen az ügyfelet, tippekkel, ajánlatokkal, kedvezményekkel.</p>
            <div className={styles.featureListTitle}>Mit jelent a gyakorlatban</div>
            <ul className={styles.featureList}>
              <li>Köszönő email a vásárlás után</li>
              <li>Termékhasználati útmutatók</li>
              <li>Véleménykérés a megfelelő pillanatban</li>
              <li>Ajánlások és visszatérő kampányok</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
