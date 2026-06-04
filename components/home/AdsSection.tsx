import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Squiggle } from '@/components/ui/Squiggle';
import styles from './AdsSection.module.css';

const creatives = [
  { metric: '4.8x', type: 'ROAS\nTermék ad' },
  { metric: '6.4%', type: 'CTR\nStatic' },
  { metric: '3.2x', type: 'ROAS\nUGC' },
  { metric: '7.1%', type: 'CTR\nVideo ad' },
  { metric: '5.6x', type: 'ROAS\nKarusszel' },
  { metric: '8.9%', type: 'CTR\nReels' },
  { metric: '2.4x', type: 'ROAS\nStory ad' },
  { metric: '5.2%', type: 'CTR\nCollection' },
];

export function AdsSection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '20%', right: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, left: '-100px' }} />
      <Squiggle
        d="M280,30 Q120,120 240,240 T80,440"
        viewBox="0 0 320 480"
        style={{ top: 60, right: '3%', width: 320, height: 480 }}
      />

      <SectionLabel>02 · Hirdetés</SectionLabel>
      <SectionTitle>
        Tesztelt és bizonyított<br />
        <span style={{ color: '#0099b8' }}>hirdetési anyagok</span>
      </SectionTitle>
      <p className={styles.sub}>
        Ha készen van a felületed, utána készítünk Facebook hirdetéseket, hogy forgalom érkezzen az oldaladra / webáruházadra.
      </p>

      <div className={styles.creativesMarquee}>
        <div className={styles.creativesTrack}>
          {[...creatives, ...creatives].map((c, i) => (
            <div className={styles.creativeCard} key={i}>
              <div className={styles.creativeImg}>Kép helye</div>
              <div className={styles.creativeFoot}>
                <span className={styles.creativeMetric}>{c.metric}</span>
                <span className={styles.creativeType}>{c.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
