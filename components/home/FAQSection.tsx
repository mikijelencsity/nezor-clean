import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './FAQSection.module.css';

const faqs = [
  {
    q: 'Mennyibe kerül egy weboldal?',
    a: 'Már 50.000 Ft-tól is kaphatsz weboldalt, de minden projektre egyedi árajánlatot készítünk. Egy egyszerű bemutatkozó oldal és egy összetett webshop nem ugyanaz, ezért a konzultáció után, amikor már látjuk a feladatot, adunk konkrét számot. Nincs rejtett költség, és nem mondunk árat azelőtt, hogy értenénk, mire van szükséged.',
  },
  {
    q: 'Mennyi idő alatt készül el?',
    a: 'Igénytől függ. Egy egyszerű oldal néhány hét, egy összetett webshop tovább tart. A pontos időzítést az első konzultáción rögzítjük, és tartjuk is.',
  },
  {
    q: 'Mi van, ha nem vagyok elégedett?',
    a: 'A folyamat közben végig látod a munkát, és menet közben módosíthatunk rajta. A cél nem az, hogy átadjunk valamit, hanem hogy elégedett legyél vele. Különben mi sem örülünk az eredménynek.',
  },
  {
    q: 'Kell saját szöveg, kép, tartalom?',
    a: 'Nem feltétlenül. Ha van saját anyagod, beépítjük. Ha nincs, segítünk a szövegezésben és a fotózás megszervezésében is, sok ügyfelünknél mi adjuk a teljes tartalmi alapot.',
  },
  {
    q: 'Van havi díj? Mit fedez?',
    a: 'Weboldalhoz csak akkor, ha kéred. Karbantartást, frissítést, biztonsági mentést és apróbb módosításokat fed le. Facebook hirdetés vagy webshop esetén viszont mindig van havi díj, mert folyamatos optimalizálás és karbantartás kell hozzájuk.',
  },
  {
    q: 'Mennyi a Facebook hirdetési költség?',
    a: 'A Meta felé a budget-et közvetlenül te fizeted, mi csak a saját munkánkat számlázzuk. Így átlátható minden forint: tudod, mi megy hirdetésre és mi a mi díjunk.',
  },
  {
    q: 'Mi van, ha már van weboldalam?',
    a: 'Megnézzük együtt. Néha elég átdolgozni a meglévőt, néha viszont gyorsabb és olcsóbb nulláról kezdeni. Őszintén megmondjuk, melyik éri meg neked.',
  },
  {
    q: 'Milyen iparágakkal dolgoztok?',
    a: 'Sokfélével, étterem, építőipar, kávé, logisztika, gyártás, kereskedelem, szolgáltatók. Az iparágat hamar megtanuljuk, az értékesítés logikája viszont szektor-független.',
  },
  {
    q: 'Hol vagytok? Online vagy személyes találkozó?',
    a: 'Az ország bármely pontján megoldható személyes találkozó, ha a projekt megkívánja. Az ügyfeleink többsége egyébként Zoom-on dolgozik velünk, mert gyorsabb és nem kell senkinek órákat utaznia.',
  },
];

export function FAQSection() {
  return (
    <section className={styles.section}>
      <GridBg light />
      <GlowBlob color="blue" style={{ top: '10%', left: '-150px' }} />
      <GlowBlob color="yellow" style={{ bottom: 0, right: '-100px' }} />

      <SectionLabel>Gyakori kérdések</SectionLabel>
      <SectionTitle>
        Erre <span style={{ color: '#0099b8' }}>biztos kíváncsi vagy</span>
      </SectionTitle>
      <p className={styles.sub}>
        A leggyakoribb kérdések, amiket az érdeklődőktől kapunk. Ha a tiéd nincs köztük, írd meg a hívásban.
      </p>

      <div className={styles.faqList}>
        {faqs.map((faq, i) => (
          <details className={styles.faqItem} key={i}>
            <summary>{faq.q}</summary>
            <div className={styles.faqAnswer}>{faq.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
