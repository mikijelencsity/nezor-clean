import Link from 'next/link';
import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './FreeDemoSection.module.css';

export function FreeDemoSection() {
  return (
    <section className={shared.lightSection}>
      <GridBg light />
      <div className={styles.wrap} style={{ position: 'relative', zIndex: 1 }}>
        <span className={styles.badge}>⚡ Expressz weboldal</span>
        <h3>
          2 napon belül kell{' '}
          <span className={shared.accent}>weboldal</span>?
        </h3>
        <p>
          Nincs időd hosszas egyeztetésre, konzultációra, oda-vissza emailezésre? Vannak már
          elkészített weboldalaink, amelyek gazdára várnak — válassz egyet, add meg az adataidat,
          és a tiéd lehet.
        </p>
        <ul className={styles.steps}>
          <li>
            <span className={styles.stepNum}>1</span>
            <span>Kiválasztod a hozzád illő weboldalt a kész designok közül</span>
          </li>
          <li>
            <span className={styles.stepNum}>2</span>
            <span>Megadod az adataidat, elküldöd a szövegeidet és képeidet emailben</span>
          </li>
          <li>
            <span className={styles.stepNum}>3</span>
            <span>48 órán belül a saját arculatoddal, élesben fut a weboldalad</span>
          </li>
        </ul>
        <Link href="/gyors-weboldal" className={styles.ctaBtn}>
          Válassz egy weboldalt, és induljon a tiéd →
        </Link>
        <p className={styles.note}>
          Ezek a weboldalak már elkészültek, csak egy gazdára várnak — amint kiválasztod, a te
          adataiddal és képeiddel élesítjük.
        </p>
      </div>
    </section>
  );
}
