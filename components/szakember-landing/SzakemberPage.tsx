'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from './SzakemberPage.module.css';

const formatFt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Magyar mobilszám: 06/+36 előhívó + 20/30/31/50/70 szolgáltatói kód + 7 számjegy (szóköz/kötőjel opcionális)
const PHONE_RE = /^(?:\+36|06)[\s-]?(20|30|31|50|70)[\s-]?\d{3}[\s-]?\d{4}$/;

// Az ajánlat lejárata: 2026. augusztus 25. 23:59:59
const DEADLINE = new Date('2026-08-25T23:59:59').getTime();
const pad2 = (n: number) => String(n).padStart(2, '0');

const szakmak = [
  { id: 'vizszerelo', nev: 'Vízszerelő' },
  { id: 'tetofedo', nev: 'Tetőfedő' },
  { id: 'festo', nev: 'Festő' },
];
const EGYEB = { id: 'egyeb', nev: 'Egyéb' };
const opciok = [...szakmak, EGYEB];

const ertekLebontas = [
  { cim: 'Landing oldal a kampányhoz', jegyzet: '', ertek: '70.000 Ft' },
  { cim: 'Hirdetési kampány + 1 havi kezelés', jegyzet: 'felépítés, indítás, optimalizálás', ertek: '79.000 Ft' },
];

const faq = [
  { k: 'Ez tényleg 39.500 Ft?', v: 'Igen. Az első teljes hónap 79.000 helyett 39.500 Ft. Utána te döntöd el, folytatjuk-e a közös munkát.' },
  { k: 'Mit kapok pontosan?', v: 'Egy erre a célra épített weboldalt (landing oldalt) — ide érkeznek majd az érdeklődők a hirdetésből —, és egy teljes havi hirdetési kampányt, a te szakmádra szabva.' },
  { k: 'Van bármilyen kötelezettség?', v: 'Nincs. Bármikor lemondhatod az első hónapban, nem kötünk hosszú távú szerződést, míg nem vagy elkötelezett a közös munka felé.' },
  { k: 'Mennyi idő, míg elindul?', v: 'Néhány nap alatt élesben van a megjelenésed és a hirdetési kampányod.' },
];

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
  const formRef = useRef<HTMLDivElement>(null);

  // Élő visszaszámlálás a sticky sávhoz
  const [cdReady, setCdReady] = useState(false);
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, DEADLINE - Date.now()));
    tick();
    setCdReady(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const totalSec = Math.floor(remaining / 1000);
  const cd = {
    nap: Math.floor(totalSec / 86400),
    ora: Math.floor((totalSec % 86400) / 3600),
    perc: Math.floor((totalSec % 3600) / 60),
    mp: totalSec % 60,
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // headline alatti gyorsválasztó: kiválasztja a szakmát és a formhoz görget
  const valasztSzakma = (id: string) => {
    setSzakma(id);
    setError('');
    scrollToForm();
  };

  const valasztottNev = opciok.find((s) => s.id === szakma)?.nev ?? '';
  const egyebValasztva = szakma === EGYEB.id;

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!szakma) { setError('Válaszd ki, melyik szakmában dolgozol!'); return; }
    if (!nev.trim() || !telefon.trim()) { setError('Add meg a neved és telefonszámod!'); return; }
    if (!PHONE_RE.test(telefon.trim())) { setError('Érvénytelen telefonszám. Pl. 06 30 123 4567 vagy +36 30 123 4567.'); return; }
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
        <span className={styles.badge}>⚡ Ügyfélszerzés szakembereknek</span>
        <h1 className={styles.h1}>
          Új ügyfeleket hozunk 30 nap alatt.<br />
          <span className={styles.grad}>Vagy visszakapod a hirdetéskezelési díjat.</span>
        </h1>
        <p className={styles.lead}>
          Landing oldal + élő hirdetési kampány, összerakva, 39.500 Ft-ból az első hónapban.
          <strong> A te szakmádra szabva.</strong>
        </p>

        {/* GYORSVÁLASZTÓ a headline alatt */}
        <p className={styles.chooseLabel}>Melyik szakmában dolgozol?</p>
        <div className={styles.chooseRow}>
          {opciok.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.chooseBtn} ${szakma === s.id ? styles.chooseBtnActive : ''}`}
              onClick={() => valasztSzakma(s.id)}
            >
              {s.nev} →
            </button>
          ))}
        </div>

        {/* ÁR REVEAL */}
        <section className={styles.section}>
          <div className={styles.priceCard}>
            <Image
              src="/nezorgarancia.webp"
              alt="1 hónapos garancia"
              width={120}
              height={120}
              className={styles.guaranteeSeal}
            />
            <p className={styles.priceLead}><span className={styles.grad}>Ajánlatunk</span> az 1. hónapra</p>
            <div className={styles.priceRow} style={{ marginBottom: 28 }}>
              <span className={styles.priceOld}>79.000 Ft</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.priceNew}>39.500 Ft</span>
            </div>

            <h3 className={styles.packTitle}>Mit kapsz, és mit ér?</h3>
            <ul className={styles.valueList}>
              {ertekLebontas.map((e) => (
                <li key={e.cim}>
                  <span className={styles.valueName}>
                    {e.cim}
                    {e.jegyzet && <em>{e.jegyzet}</em>}
                  </span>
                  <b className={styles.valuePrice}>{e.ertek}</b>
                </li>
              ))}
            </ul>
            <div className={styles.valueTotal}>
              <div className={styles.valueTotalRow}>
                <span>Érték:</span> <strong>149.000 Ft</strong>
              </div>
              <div className={styles.valueTotalRow}>
                <span>Ár:</span> <strong className={styles.valuePriceHi}>39.500 Ft</strong>
              </div>
            </div>

            <button type="button" className={styles.ctaPrimary} onClick={scrollToForm}>
              Vedd fel velünk a kapcsolatot →
            </button>
          </div>
        </section>

        {/* GARANCIA */}
        <section className={styles.section}>
          <div className={styles.guaranteeCard}>
            <span className={styles.guaranteeIcon}>🔒</span>
            <h2 className={styles.h2}>
              Garancia: <span className={styles.grad}>kockázat nélkül próbálhatod ki</span>
            </h2>
            <ul className={styles.guaranteeList}>
              <li>Az első hónapot bármikor lemondhatod, nincs szerződés.</li>
              <li>Ha a hirdetésed statisztikailag nem térül meg, <strong>visszafizetjük a 10.000 Ft-os hirdetéskezelési díjat</strong> — a landing oldal 29.500 Ft-os értéke marad a tiéd, örökre.</li>
            </ul>
          </div>
        </section>

        {/* FORM */}
        <div ref={formRef} className={styles.formCard}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Megkaptuk a jelentkezésed!</h3>
              <p>
                Hamarosan felvesszük veled a kapcsolatot, és megkezdjük a közös munkát.
                Addig is: <a href="tel:+36302036721">+36 30 203 6721</a>
              </p>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>
                <span className={styles.grad}>Kezdjük meg</span> a közös munkát
              </h3>

              {/* szakma választó – a gyorsválasztóról érkezve már ki van választva */}
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

              {error && <p className={styles.error}>{error}</p>}

              <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Küldés...' : 'Vedd fel velünk a kapcsolatot →'}
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

        {/* FAQ */}
        <section className={styles.faqSection}>
          <h2 className={styles.h2}>Gyakori kérdések</h2>
          <div className={styles.faqList}>
            {faq.map((f) => (
              <details key={f.k} className={styles.faqItem}>
                <summary>{f.k}</summary>
                <p>{f.v}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ZÁRÓ NUDGE */}
        <section className={styles.section} style={{ marginTop: 56 }}>
          <h2 className={styles.h2}>Kezdjük el?</h2>
          <p className={styles.lead} style={{ marginBottom: 0 }}>
            Az első hónap 39.500 Ft, bármikor lemondható. Gyakorlatilag nem kockáztatsz semmit.
          </p>
          <button type="button" className={styles.ctaPrimary} onClick={scrollToForm} style={{ marginTop: 24 }}>
            Vedd fel velünk a kapcsolatot →
          </button>
        </section>

        <p className={styles.foot}>© 2026 NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
      </div>

      {/* STICKY VISSZASZÁMLÁLÓ */}
      {!sent && (
        <div className={styles.countdownBar}>
          <div className={styles.countdownInner}>
            <div className={styles.countdownLeft}>
              <span className={styles.countdownLabel}>⏳ Az ajánlat lejár:</span>
              <div className={styles.countdownClock}>
                <span><b>{cdReady ? cd.nap : '–'}</b>nap</span>
                <span><b>{cdReady ? pad2(cd.ora) : '––'}</b>óra</span>
                <span><b>{cdReady ? pad2(cd.perc) : '––'}</b>perc</span>
                <span><b>{cdReady ? pad2(cd.mp) : '––'}</b>mp</span>
              </div>
            </div>
            <button type="button" className={styles.countdownBtn} onClick={scrollToForm}>Kell nekem! →</button>
          </div>
        </div>
      )}
    </div>
  );
}
