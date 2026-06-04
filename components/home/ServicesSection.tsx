import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Squiggle } from '@/components/ui/Squiggle';
import styles from './ServicesSection.module.css';

export function ServicesSection() {
  return (
    <section className={styles.section} id="szolgaltatas">
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '-100px', left: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: '-100px', right: '-100px' }} />
      <Squiggle
        d="M30,20 Q200,80 80,200 T220,380"
        viewBox="0 0 280 420"
        style={{ top: 80, left: '5%', width: 280, height: 420 }}
      />

      <SectionLabel>01 · Szolgáltatás</SectionLabel>
      <SectionTitle>
        Weboldal vagy webáruház,<br />
        <span style={{ color: '#0099b8' }}>az online névjegyed és üzleted</span>
      </SectionTitle>
      <p className={styles.sub}>
        Kell egy hely, ahol bemutatod a szolgáltatásod vagy eladod a terméked. Ezt alakítjuk ki elsőnek.
      </p>

      <div className={styles.servicesGrid}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceImg}>
            <span className={styles.serviceBadge}>Bemutatkozó</span>
            Kép helye
          </div>
          <div className={styles.serviceBody}>
            <h3>Bemutatkozó oldal</h3>
            <p>Tiszta felépítés, fókuszált üzenet. Szolgáltatóknak, akiknek elég egy erős alapoldal.</p>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceImg}>
            <span className={styles.serviceBadge}>Landing</span>
            Kép helye
          </div>
          <div className={styles.serviceBody}>
            <h3>Landing oldal</h3>
            <p>Egy termék, egy ajánlat, egy cél: a látogatóból érdeklődő.</p>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceImg}>
            <span className={styles.serviceBadge}>Webshop</span>
            Kép helye
          </div>
          <div className={styles.serviceBody}>
            <h3>Webáruház</h3>
            <p>Termékek, kosár, fizetés, admin, kulcsrakészen. Az első naptól értékesítésre kész.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
