import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './ContactSection.module.css';

export function ContactSection() {
  return (
    <section className={styles.section} id="kapcsolat">
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '20%', right: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, left: '-100px' }} />

      <SectionLabel>06 · Kapcsolat</SectionLabel>
      <SectionTitle>
        Beszélgessünk <span style={{ color: '#0099b8' }}>20 percet.</span>
      </SectionTitle>
      <p className={styles.sub}>
        20 perc, semmi kötelezettség. Megmutatjuk, hol szivárog most a pénz, és hogy mit kezdjünk vele.
      </p>

      <div className={styles.contactWrap}>
        <div className={styles.contactLeft}>
          <div className={styles.contactShapes}><span></span><span></span><span></span></div>
          <div className={styles.contactRings}><span></span><span></span></div>
          <h3>Foglalj egy <span className={styles.accent}>konzultációt</span></h3>
          <p>Hová tűnnek az érdeklődők? Miért nem vásárolnak? A hívás után tudni fogod a válaszokat, és azt is, hogyan javíts rajta.</p>
          <ul className={styles.contactBullets}>
            <li>Kötelezettségmentes 20 perces hívás</li>
            <li>24 órán belül visszajelzünk</li>
            <li>Személyre szabott elemzés</li>
          </ul>
        </div>

        <div className={styles.contactRight}>
          <h4>Töltsd ki és beszéljünk</h4>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.full}`}>
              <label>Név *</label>
              <input type="text" placeholder="Kovács Péter" />
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label>Email *</label>
              <input type="email" placeholder="pelda@gmail.com" />
            </div>
          </div>
          <button className={styles.formSubmit}>Kérek egy rövid konzultációt →</button>
          <p className={styles.formFoot}>Az adatokat bizalmasan kezeljük, harmadik félnek nem adjuk át.</p>
        </div>
      </div>
    </section>
  );
}
