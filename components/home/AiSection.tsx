import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './AiSection.module.css';

export function AiSection() {
  return (
    <section className={styles.section}>
      <GridBg />
      <GlowBlob color="blue" style={{ top: '-100px', left: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: '-100px', right: '-100px' }} />

      <SectionLabel white>04 · Mesterséges intelligencia</SectionLabel>
      <SectionTitle white>
        Mesterséges intelligencia,<br />
        <span style={{ color: '#00e5ff' }}>a te javadra</span>
      </SectionTitle>
      <p className={styles.sub}>
        Két AI funkció, ami éjjel-nappal melletted áll. Az egyik a kereséseknél tesz láthatóvá, a másik az oldaladon válaszol.
      </p>

      <div className={styles.aiGrid}>
        <div className={styles.aiCard}>
          <div className={styles.aiImg}>Kép helye</div>
          <div className={styles.aiBody}>
            <h3>ChatGPT téged ajánl</h3>
            <p className={styles.aiLead}>Amikor valaki rákeres, te jössz fel elsőként.</p>
            <p>Az AI keresők ma már nem linkeket adnak, ajánlanak. Az oldaladat úgy hangoljuk, hogy a ChatGPT és Gemini neked dolgozzon.</p>
          </div>
        </div>

        <div className={styles.aiCard}>
          <div className={styles.aiImg}>Kép helye</div>
          <div className={styles.aiBody}>
            <h3>Chatbot, a 0–24-es munkatárs</h3>
            <p className={styles.aiLead}>Sosem alszik, sosem fárad, mindig válaszol.</p>
            <p>Árak, szállítás, időpontok, azonnali válasz minden kérdésre. Hajnali kettőkor is. Az érdeklődőd nem vár, te nem maradsz le.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
