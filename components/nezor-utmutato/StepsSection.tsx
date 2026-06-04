import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './StepsSection.module.css';

export function StepsSection() {
  return (
    <section
      className={shared.lightSection}
      style={{ background: 'linear-gradient(180deg,#fff8dc 0%,#eef4ff 100%)' }}
    >
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>Miért van ez</span>
        <h2
          className={`${shared.secTitle} ${shared.secTitleDark}`}
          style={{ marginBottom: '40px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Ez nem a te hibád.
          <br />
          <span className={shared.accentDark}>A világ változott meg.</span>
        </h2>
        <div className={styles.storyCard}>
          <div className={styles.storyLeft}>
            <div className={styles.storyLeftGrid}></div>
            <div className={styles.storyLeftContent}>
              <span className={styles.pullStat}>10 perc</span>
              <span className={styles.pullStatLabel}>
                Ennyi idő alatt dönt az ügyfeled — te ott vagy-e a listáján?
              </span>
              <div className={styles.pullQuoteText}>
                „Az ügyfeled nem azt nézi, hogy van-e profilod. Azt nézi, hogy megéri-e rád bízni a
                házát."
              </div>
            </div>
          </div>
          <div className={styles.storyBody}>
            <div className={styles.storyEyebrow}>A mai ügyfél döntési folyamata</div>
            <h3>
              Tíz percben dől el, hogy{' '}
              <span className={shared.accentDark}>a listáján vagy, vagy sem.</span>
            </h3>
            <p>
              Képzeld el a tipikus ügyfeledet. Egy harmincas-negyvenes ember, aki most vette meg a
              házát, és tetőt, burkolást vagy festést keres. Régen három-négy embert kérdezett volna
              meg az ismerősei közül.
            </p>
            <p>
              Ma este, a kanapén ülve, telefonnal a kezében öt különböző szakember weboldalát
              végignézi, képeket vizsgál, értékeléseket olvas — és reggelre eldöntötte, kit hív fel.
            </p>
            <div className={styles.pullQuoteBox}>
              <p>
                Nem azért, mert ő bizalmatlan vagy felszínes. Hanem azért, mert ma{' '}
                <strong>kockázatkerülő</strong>. Sok pénzről van szó.
              </p>
            </div>
            <p>
              És itt jön a jó hír: a versenytársaid 80%-ának sincs ez rendben. Ha te az a kevés
              vagy, aki professzionálisan jelen van online, automatikusan kiemelkedsz a tömegből.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
