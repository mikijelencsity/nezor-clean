import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Squiggle } from '@/components/ui/Squiggle';
import styles from './GBPSection.module.css';

export function GBPSection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '10%', left: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, right: '-100px' }} />
      <Squiggle
        d="M240,20 Q80,100 180,220 T60,400"
        viewBox="0 0 280 420"
        style={{ top: 60, right: '5%', width: 280, height: 420 }}
      />

      <SectionLabel>05 · Google Cégem</SectionLabel>
      <SectionTitle>
        Profi Google profil, <span style={{ color: '#0099b8' }}>amitől hisznek neked</span>
      </SectionTitle>
      <p className={styles.sub}>
        Mielőtt bárki felhívna, megnéz a Google-ön. Itt dől el, hogy egyáltalán esélyt kapsz-e.
      </p>

      <div className={styles.gbpCard}>
        <div className={styles.gbpImg}>Kép helye</div>
        <div className={styles.gbpBody}>
          <span className={styles.gbpBadge}>Google Cégem profil</span>
          <h3>Az első benyomás <span className={styles.accent}>a Google-ön kezdődik.</span></h3>
          <p className={styles.gbpLead}>Profilt építünk, ami első ránézésre komolyan vehető.</p>
          <p>Adatlap, fotók, kategóriák, posztok, értékelés-kezelés, minden a helyén. Mire az érdeklődő a weboldaladra kattint, már megnyertük a bizalmát.</p>
          <div className={styles.gbpStars}>
            <span className={styles.star}>★★★★★</span>
            <b>5,0</b>
            <span>· Több tucat valódi értékelés ügyfelektől</span>
          </div>
        </div>
      </div>
    </section>
  );
}
