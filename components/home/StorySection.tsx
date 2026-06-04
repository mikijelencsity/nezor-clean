import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import styles from './StorySection.module.css';

const refs = [
  'Korona Gombaipari Egyesülés',
  'Estur Épker Kft.',
  'Hazai Kávé Kft.',
  'Neked Sütöm',
  'ZT Épületgépészet',
  'Vialog Trans Kft.',
  'Cruiser Shop',
  'DoverSolution',
];

export function StorySection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '10%', right: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, left: '-100px' }} />

      <div className={styles.storyCard}>
        <div className={styles.storyImg}><span>Kép helye</span></div>
        <div className={styles.storyBody}>
          <div className={styles.storyEyebrow}>Miért mi</div>
          <h3>16 évesen indultunk. <span className={styles.accent}>Bukni nem lehetett.</span></h3>
          <p>A családi vállalkozást kellett online eladnunk, különben az egész megszűnik. Nem volt B terv. Eredményt kellett hoznunk, ráadásul ingyen, mert csak akkor volt értelme, ha közben az értékesítés is működik.</p>
          <p><strong>Működött.</strong> A család azóta is ebből él. Több mint 5 éve csináljuk nap mint nap, és időközben rájöttünk: amit a saját bőrünkön megtanultunk, az másoknak is működik. Mára több mint 20 magyar vállalkozónál.</p>
          <p>Veled is őszinték leszünk: mi is abból élünk, hogy ez működjön nálad. Ha az oldalad nem érdekel senkit, vagy a hirdetésed nem hoz megrendelést, te nem fogsz visszatérni. <strong>Csak akkor éri meg nekünk, ha neked is megéri.</strong></p>
          <div className={styles.storySign}>
            <div className={styles.storySignNames}>Müller Dániel &amp; Jelencsity Miklós</div>
            <div className={styles.storySignRole}>Alapítók · NEZOR Webfejlesztés</div>
          </div>
        </div>
      </div>

      <div className={styles.refStrip}>
        <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3a3f58', marginBottom: '22px' }}>
          Akik bíztak már bennünk...
        </div>
        <div className={styles.refTrack}>
          {[...refs, ...refs].map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
