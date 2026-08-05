import Image from 'next/image';
import styles from './otletek.module.css';

const szakmak = [
  { id: 'viz', nev: 'Vízszerelő', kep: '/oldal-vizszerelo.webp', leiras: 'Duguláselhárítás, csőtörés, szerelvényezés — kész, szövegezett oldal.' },
  { id: 'teto', nev: 'Tetőfedő', kep: '/oldal-tetofedo.webp', leiras: 'Tetőfelújítás, bádogos munkák, javítás — kész, szövegezett oldal.' },
  { id: 'fest', nev: 'Festő', kep: '/oldal-festo.webp', leiras: 'Lakásfestés, tapétázás, homlokzat — kész, szövegezett oldal.' },
];

const valtozatok = [
  { v: 'v1', cim: '1 · Körbefutó vonal — egy vékony fénycsík fut a keret mentén' },
  { v: 'v2', cim: '2 · Pulzáló glow — a keret színe lassan „lélegzik"' },
  { v: 'v3', cim: '3 · Statikus gradient keret — nincs animáció, tiszta' },
  { v: 'v4', cim: '4 · Felső accent sáv — minimál, letisztult' },
  { v: 'v5', cim: '5 · Offset színes lap — vastag kontúr, tömör színárnyék' },
];

function Kartya({ s, v }: { s: typeof szakmak[0]; v: string }) {
  return (
    <div className={`${styles[v]} ${styles[s.id]}`}>
      {v === 'v1' && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="1.5" y="1.5" width="97" height="97" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {v === 'v4' && <div className={styles.sav} />}
      <div className={styles.inner}>
        <div className={styles.img}>
          <Image src={s.kep} alt={s.nev} fill sizes="(max-width: 900px) 92vw, 340px" style={{ objectFit: 'contain' }} />
        </div>
        <h3>{s.nev}</h3>
        <p>{s.leiras}</p>
        <button type="button" className={styles.btn}>Ez kell →</button>
      </div>
    </div>
  );
}

export default function KartyaOtletek() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Kártya-stílus ötletek</h1>
        <p className={styles.sub}>Melyik tetszik? Mondd a számát, és azt építem be a landingre.</p>

        {valtozatok.map((val) => (
          <div key={val.v}>
            <div className={styles.label}>{val.cim}</div>
            <div className={styles.row}>
              {szakmak.map((s) => <Kartya key={s.id} s={s} v={val.v} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
