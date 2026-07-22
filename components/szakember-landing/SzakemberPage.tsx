'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from './SzakemberPage.module.css';

// TODO: cseréld ki a 3 valódi kész weboldal screenshotjára
const szakmak = [
  {
    id: 'vizszerelo',
    nev: 'Vízszerelő',
    kep: '/oldal-vizszerelo.webp',
    leiras: 'Duguláselhárítás, csőtörés, szerelvényezés — kész, szövegezett oldal.',
  },
  {
    id: 'tetofedo',
    nev: 'Tetőfedő',
    kep: '/oldal-tetofedo.webp',
    leiras: 'Tetőfelújítás, bádogos munkák, javítás — kész, szövegezett oldal.',
  },
  {
    id: 'festo',
    nev: 'Festő',
    kep: '/oldal-festo.webp',
    leiras: 'Lakásfestés, tapétázás, homlokzat — kész, szövegezett oldal.',
  },
];

// Az "Egyéb"-hez nincs kész oldal, ezért nincs kártyája — egyből a formhoz visz
const EGYEB = { id: 'egyeb', nev: 'Egyéb' };
const opciok = [...szakmak.map((s) => ({ id: s.id, nev: s.nev })), EGYEB];

export function SzakemberPage() {
  const [szakma, setSzakma] = useState('');
  const [foglalkozas, setFoglalkozas] = useState('');
  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [terulet, setTerulet] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [nagykep, setNagykep] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // nagyított kép: Escape-re zár, közben ne görögjön a háttér
  useEffect(() => {
    if (!nagykep) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNagykep(null); };
    document.addEventListener('keydown', onKey);
    const eredeti = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = eredeti;
    };
  }, [nagykep]);

  // "Ez kell nekem!" a nagyított képből: bezár, kiválaszt, formhoz görget
  const kellNekem = (id: string) => {
    setNagykep(null);
    setSzakma(id);
    setError('');
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  };

  const nagykepSzakma = szakmak.find((s) => s.id === nagykep);

  // headline alatti gyorsválasztó: kiválasztja és az adott oldalhoz görget
  // (Egyéb-nél nincs kártya, ezért egyből a formhoz)
  const ugrasSzakmahoz = (id: string) => {
    setSzakma(id);
    setError('');
    const cel = id === EGYEB.id ? formRef.current : cardRefs.current[id];
    cel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // kártyáról: kiválasztja és a formhoz görget
  const valaszt = (id: string) => {
    setSzakma(id);
    setError('');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const valasztottNev = opciok.find((s) => s.id === szakma)?.nev ?? '';
  const egyebValasztva = szakma === EGYEB.id;

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!szakma) { setError('Válaszd ki, melyik oldal kell!'); return; }
    if (!nev.trim() || !telefon.trim()) { setError('Add meg a neved és telefonszámod!'); return; }
    if (!email.trim()) { setError('Add meg az email címed!'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Érvénytelen email cím.'); return; }
    if (!cegnev.trim()) { setError('Add meg a vállalkozásod nevét!'); return; }
    if (!terulet.trim()) { setError('Add meg, hol vállalsz munkát!'); return; }
    setLoading(true);
    setError('');
    try {
      // Közös azonosító a browser pixel és a szerver oldali CAPI dedupjához
      const eventId = ujEventId();
      const res = await fetch('/api/szakember-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, telefon, email, cegnev, terulet, szakma: valasztottNev, foglalkozas, eventId, website }),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent('Lead', { content_name: valasztottNev }, eventId); // csak sikeres beküldésre
        setSent(true);
      } else setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } catch {
      setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.blobA} aria-hidden="true" />
      <div className={styles.blobB} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.logo}>NEZ<span>OR</span></div>

        {/* HERO */}
        <span className={styles.badge}>⚡ Kész oldalak — mindegyikből egy vihető</span>
        <h1 className={styles.h1}>
          24 órán belül<br />
          <span className={styles.grad}>tiéd a kész weboldal.</span>
        </h1>
        <p className={styles.lead}>
          Előre megcsináltuk ezeket az oldalakat, hogy neked ne kelljen ezzel bajlódnod.
          <strong> A te nevedre szabjuk, és 24 órán belül élesben van.</strong>
        </p>
        <div className={styles.priceRow}>
          <span className={styles.priceOld}>120.000 Ft</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.priceNew}>50.000 Ft</span>
        </div>

        {/* GYORSVÁLASZTÓ a headline alatt */}
        <p className={styles.chooseLabel}>Melyik szakmában dolgozol?</p>
        <div className={styles.chooseRow}>
          {opciok.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.chooseBtn} ${szakma === s.id ? styles.chooseBtnActive : ''}`}
              onClick={() => ugrasSzakmahoz(s.id)}
            >
              {s.nev} →
            </button>
          ))}
        </div>

        {/* KÁRTYÁK */}
        <div className={styles.cards}>
          {szakmak.map((s) => (
            <div
              key={s.id}
              ref={(el) => { cardRefs.current[s.id] = el; }}
              className={`${styles.card} ${styles[s.id]} ${szakma === s.id ? styles.cardActive : ''}`}
            >
              <span className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.cardInner}>
                <button
                  type="button"
                  className={styles.cardImg}
                  onClick={() => setNagykep(s.id)}
                  aria-label={`${s.nev} weboldal nagyítása`}
                >
                  <Image src={s.kep} alt={`${s.nev} weboldal`} fill sizes="(max-width: 900px) 92vw, 340px" style={{ objectFit: 'contain' }} />
                  <span className={styles.zoomHint}>🔍 Kattints a nagyításhoz</span>
                </button>
                <h2>{s.nev}</h2>
                <p>{s.leiras}</p>
                <button type="button" className={styles.cardBtn} onClick={() => valaszt(s.id)}>
                  Ez kell →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div ref={formRef} className={styles.formCard}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Megvan, foglaltuk neked!</h3>
              <p>
                Hamarosan hívunk a részletekkel, és 24 órán belül élesben lesz az oldalad.
                Addig is: <a href="tel:+36302036721">+36 30 203 6721</a>
              </p>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>
                {!valasztottNev && 'Melyik oldal kell?'}
                {valasztottNev && egyebValasztva && 'Mondd el, mire van szükséged'}
                {valasztottNev && !egyebValasztva && (
                  <>Kérem a <span className={styles.grad}>{valasztottNev.toLowerCase()}</span> oldalt</>
                )}
              </h3>

              {/* szakma választó – a kártyáról érkezve már ki van választva */}
              <div className={styles.pills}>
                {opciok.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.pill} ${szakma === s.id ? styles.pillActive : ''}`}
                    onClick={() => { setSzakma(s.id); setError(''); }}
                  >
                    {szakma === s.id ? '✓ ' : ''}{s.nev}
                  </button>
                ))}
              </div>

              <input
                type="text"
                name="nezor_hp_field"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.fields}>
                <input type="text" placeholder="Teljes neved *" value={nev} onChange={(e) => setNev(e.target.value)} />
                <input type="tel" placeholder="Telefonszámod *" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                <input type="email" placeholder="Email címed *" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Vállalkozás neve *" value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                <input
                  type="text"
                  placeholder="Hol vállalsz munkát? *"
                  value={terulet}
                  onChange={(e) => setTerulet(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={egyebValasztva ? 'Mivel foglalkozol? (pl. villanyszerelő)' : 'Mivel foglalkozol? (nem kötelező)'}
                  value={foglalkozas}
                  onChange={(e) => setFoglalkozas(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
              </div>
              <p className={styles.fieldsNote}>
                {egyebValasztva
                  ? <>A <strong>&bdquo;Mivel foglalkozol?&rdquo;</strong> mezőt nem kötelező kitölteni — de ha megírod, pontosabb ajánlatot tudunk adni.</>
                  : <>A <strong>&bdquo;Mivel foglalkozol?&rdquo;</strong> mező nem kötelező, a többivel tudunk <strong>azonnal nekiállni</strong>.</>}
              </p>

              {error && <p className={styles.error}>{error}</p>}

              <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Küldés...' : 'Kérem az oldalt 50.000 Ft-ért →'}
              </button>
              <p className={styles.note}>
                Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
              </p>
              <p className={styles.gdpr}>
                A jelentkezés elküldésével elfogadod az{' '}
                <a href="/adatkezeles" target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatónkat</a>.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── NAGYÍTOTT KÉP (telón és gépen is) ── */}
      {nagykepSzakma && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${nagykepSzakma.nev} weboldal`}
          onClick={() => setNagykep(null)}
        >
          <button type="button" className={styles.lbClose} onClick={() => setNagykep(null)} aria-label="Bezárás">✕</button>

          <div className={styles.lbInner} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lbImgWrap}>
              <Image
                src={nagykepSzakma.kep}
                alt={`${nagykepSzakma.nev} weboldal`}
                width={900}
                height={558}
                className={styles.lbImg}
                sizes="(max-width: 900px) 96vw, 900px"
              />
            </div>
            <div className={styles.lbBar}>
              <span className={styles.lbNev}>{nagykepSzakma.nev} weboldal</span>
              <button type="button" className={styles.lbCta} onClick={() => kellNekem(nagykepSzakma.id)}>
                Ez kell nekem! →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
