'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './LandingPage.module.css';

const formatFt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Az ajánlat lejárata: 2026. július 20. 23:59:59
const DEADLINE = new Date('2026-07-20T23:59:59').getTime();
const pad2 = (n: number) => String(n).padStart(2, '0');


const cegek = [
  { src: '/estur.webp', alt: 'Estur', style: { objectFit: 'cover' as const, transform: 'scale(1.4) translateY(17%)' } },
  { src: '/cruisershop.webp', alt: 'Cruiser Shop', style: {} },
  { src: '/koronagomba.webp', alt: 'Korona Gomba', style: { objectFit: 'cover' as const, transform: 'scale(2.8) translateY(13%)' } },
  { src: '/nekedsutom.webp', alt: 'Neked Sütöm', style: {} },
  { src: '/image.webp', alt: 'Ügyfél', style: {} },
];

const hirdetesKreativok = [
  { kep: '/HIRDETES3.webp', metrika: '6×', tipus: 'Megtérülés', ceg: 'Forint - Soft Kft.' },
  { kep: '/HIRDETES4.webp', metrika: '90.000', tipus: 'Elérés 10.000 Ft-ból', ceg: 'ZT Épületgépészet' },
  { kep: '/HIRDETES2.webp', metrika: '100.000 Ft', tipus: 'Bevétel 12.000 Ft-ból', ceg: 'Hazai Kávé Kft.' },
  { kep: '/HIRDETES1.webp', metrika: '4×', tipus: 'Megtérülés', ceg: 'Dover Check' },
];

const kampanySor1 = [
  'Cruiser Shop', 'Hazai Kávé Kft.', 'Kisállatkereskedes Baja', 'Neked Sütöm', 'InShape - Diet',
];
const kampanySor2 = [
  'Estur Épker Kft.', 'ZT Épületgépészet', 'Hellinger Kft.', 'Dover Check', 'Korona Gombaipari Egyesülés',
];
const kampanySor3 = [
  'Forint - Soft Kft.', 'Adótanácsadók Egyesülete', 'G-R Ékszerszalon', 'Samu Kutyakozmetika',
];

const csomagTartalom = [
  { cim: 'Bemutatkozó oldal', leiras: 'Ahol az érdeklődő látja, hogy komoly vagy, és bizalmat kap tőled.' },
  { cim: 'Google cégprofil', leiras: 'Hogy akkor is megtaláljanak, ha még nem ismernek.' },
  { cim: '1 teljes havi hirdetési kampány', leiras: 'Érdeklődőket hozunk neked, és vásárlókká konvertáljuk őket.' },
];

// A profilképek erős blurja és a név takarása a képbe van égetve (_p.jpeg)
const kepVelemenyek = [
  { kep: '/IMG_1699_m2.webp', w: 1169, h: 688, alt: 'Ügyfél visszajelzés' },
  { kep: '/IMG_1700_m2.webp', w: 1170, h: 270, alt: 'Ügyfél visszajelzés' },
  { kep: '/IMG_1702_m2.webp', w: 1169, h: 1649, alt: 'Ügyfél visszajelzés' },
];

const faq = [
  { k: 'Ez tényleg 19.990 Ft?', v: 'Igen. Az első teljes hónap 79.000 helyett 19.990 Ft. Utána te döntöd el, folytatjuk-e a közös munkát.' },
  { k: 'Mit kapok pontosan?', v: 'Egy bemutatkozó oldalt, egy Google cégprofilt, és egy teljes havi hirdetési kampányt – összerakva, élesben.' },
  { k: 'Van bármilyen kötelezettség?', v: 'Nincs. Bármikor lemondhatod az első hónapban, nem kötünk hosszú távú szerződést, míg nem vagy elkötelezett a közös munka felé.' },
  { k: 'Nekem kell megírnom a szövegeket?', v: 'Nem. Elég, ha elmondod, mivel foglalkozol – a szöveget és a felépítést mi rakjuk össze.' },
  { k: 'Mennyi idő, míg elindul?', v: 'Néhány nap alatt élesben van a megjelenésed és a hirdetési kampányod.' },
  { k: 'A hirdetési költség benne van?', v: 'A Meta felé fizetendő budget-et közvetlenül te állítod be, a mi munkánk a 19.990 Ft. Így átlátható, mi megy hirdetésre és mi a mi díjunk.' },
];

export function LandingPage() {
  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Ár-kalkulátor: 79.000 → 19.990 leszámlálás, amikor a szekció képbe ér
  const priceRef = useRef<HTMLDivElement>(null);
  const [priceVal, setPriceVal] = useState(79000);
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        io.disconnect();
        const start = 79000, end = 19990, dur = 1400, t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setPriceVal(Math.round(start + (end - start) * eased));
          if (p < 1) requestAnimationFrame(tick);
          else setPriceVal(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!nev.trim() || !telefon.trim()) { setError('Add meg a neved és telefonszámod!'); return; }
    if (!email.trim()) { setError('Add meg az email címed!'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Érvénytelen email cím.'); return; }
    setLoading(true);
    setError('');
    try {
      // Egyedi eventId a browser pixel + CAPI deduplikációhoz
      const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      // Browser pixel Lead event
      if (typeof window !== 'undefined' && (window as Window & { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as Window & { fbq?: (...a: unknown[]) => void }).fbq?.('track', 'Lead', {}, { eventID: eventId });
      }

      const res = await fetch('/api/landing-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, telefon, email, website }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
      } else {
        setError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
      }
    } catch {
      setError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.blobA} aria-hidden="true" />
      <div className={styles.blobB} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.logo}>NEZ<span>OR</span></div>

        {/* ── HERO / HOOK ── */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Komplett ügyfélszerző rendszer · 5+ év tapasztalat
          </div>
          <h1 className={styles.h1}>
            Te is <span className={styles.grad}>TUDOD</span>:<br />több ügyfél kell.<br />Megmutatjuk, hogyan.
          </h1>
          <p className={styles.heroMatch}>
            Te értesz a szakmádhoz. <span className={styles.heroMatchHi}>Mi az ügyfélszerzéshez.</span>
          </p>
          <p className={styles.heroSub}>
            Több ügyfelet szeretnél — de eddig vagy nem működött, amit próbáltál, vagy bele se kezdtél. Érthető.
          </p>

          {/* A rendszer fizikai bemutatója */}
          <div className={styles.heroArrow} aria-hidden="true">
            <svg viewBox="0 0 72 62" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 8c30 2 42 18 34 40" fill="none" />
              <path d="M40 36l8 14 12-9" fill="none" />
            </svg>
          </div>
          <div className={styles.heroMockup}>
            <Image
              src="/nezor-doboz-circle.webp"
              alt="NEZOR Online Rendszer csomag"
              width={760}
              height={760}
              className={styles.heroMockupImg}
              priority
              sizes="(max-width: 720px) 60vw, 260px"
            />
          </div>
        </section>

        {/* ── PROBLÉMA ── */}
        <section className={`${styles.section} ${styles.markSection}`}>
          <span className={styles.bgMark} aria-hidden="true">?</span>
          <div className={styles.markContent}>
            <h2 className={styles.h2}>De mi is a <span className={styles.grad}>baj?</span></h2>
            <p className={styles.lead}>
              Jó vagy a szakmádban, de nem érkezik annyi megkeresés, mint amennyi kellene. Ez érthető.
            </p>
            <p className={styles.body}>
              Miért lehet ez? Mert nem látják a szolgáltatásod, nem látják eleget, vagy nem megfelelően
              vannak kezelve a lehetséges érdeklődők.
            </p>
          </div>
        </section>

        {/* ── MEGOLDÁS ── */}
        <div className={styles.accentStripe} aria-hidden="true" />
        <section className={`${styles.section} ${styles.markSection}`}>
          <span className={`${styles.bgMark} ${styles.bgMarkExcl}`} aria-hidden="true">!</span>
          <div className={styles.markContent}>
            <span className={styles.kicker}>Megoldásunk erre…</span>
            <p className={styles.solution}>
              Nem varázslók vagyunk, hanem <strong>5 éve foglalkozunk ügyfélszerzéssel – online.</strong>{' '}
              Megjelenést alakítunk ki, bizalmat építünk, érdeklődőket hozunk neked, melyeket vásárlókká
              konvertálunk.
            </p>
          </div>
        </section>

        {/* ── REFERENCIA SOR ── */}
        <section className={styles.refRow}>
          <div className={styles.refAvatars}>
            {cegek.map((c) => (
              <div key={c.src} className={styles.refAvatar}>
                <Image src={c.src} alt={c.alt} width={64} height={64} style={c.style} />
              </div>
            ))}
          </div>
          <div className={styles.refStars}>★★★★★</div>
          <p className={styles.refText}>Már <strong>21 vállalkozás</strong> választott minket</p>
        </section>

        {/* ── HIRDETÉSI KAMPÁNY REFERENCIÁK (mozgó sáv) ── */}
        <div className={styles.campaignStrip}>
          <div className={styles.campaignLabel}>Cégek, akiknek már futtattunk <span className={styles.grad}>hirdetési kampányt</span></div>
          <div className={styles.campaignTrack}>
            {[...kampanySor1, ...kampanySor1, ...kampanySor1, ...kampanySor1].map((ceg, i) => (
              <span key={`s1-${i}`}>{ceg}</span>
            ))}
          </div>
          <div className={`${styles.campaignTrack} ${styles.campaignTrackAlt}`}>
            {[...kampanySor2, ...kampanySor2, ...kampanySor2, ...kampanySor2].map((ceg, i) => (
              <span key={`s2-${i}`}>{ceg}</span>
            ))}
          </div>
          <div className={styles.campaignTrack}>
            {[...kampanySor3, ...kampanySor3, ...kampanySor3, ...kampanySor3, ...kampanySor3, ...kampanySor3].map((ceg, i) => (
              <span key={`s3-${i}`}>{ceg}</span>
            ))}
          </div>
        </div>

        {/* ── HIRDETÉSI KREATÍVOK (csúszó sáv) ── */}
        <section className={styles.section} style={{ marginBottom: 24 }}>
          <h2 className={styles.h2}>Másoknak már <span className={styles.grad}>bevált</span> hirdetések</h2>
          <p className={styles.body}>
            Ha kész a megjelenésed, hirdetéssel hozzuk rá a forgalmat — íme pár valós kampányeredmény.
          </p>
        </section>
        <div className={styles.creativeMarquee}>
          <div className={styles.creativeTrack}>
            {[...hirdetesKreativok, ...hirdetesKreativok].map((h, i) => (
              <div key={`kr-${i}`} className={styles.creativeCard}>
                <div className={styles.creativeImg}>
                  <Image src={h.kep} alt={`${h.metrika} ${h.tipus} – ${h.ceg}`} fill sizes="(max-width: 720px) 60vw, 260px" style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.creativeFoot}>
                  <span className={styles.creativeMetric}>{h.metrika}</span>
                  <span className={styles.creativeType}>{h.tipus}</span>
                  <span className={styles.creativeCeg}>{h.ceg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── VÉLEMÉNYEK (valós screenshotok, személyes adat kitakarva) ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Amit az <span className={styles.grad}>ügyfeleink</span> mondanak</h2>
          <div className={styles.kepVelemenyStack}>
            {kepVelemenyek.map((v) => (
              <div key={v.kep} className={styles.kepVelemenyCard}>
                <div className={styles.kepVelemenyImgWrap}>
                  <Image
                    src={v.kep}
                    alt={v.alt}
                    width={v.w}
                    height={v.h}
                    className={styles.kepVelemenyImg}
                    sizes="(max-width: 720px) 92vw, 560px"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ÁR REVEAL ── */}
        <section className={styles.section}>
          <p className={styles.body}>
            Most biztos azt gondolnád, hogy egy <span className={styles.grad}>több száz ezer forintos rendszerről</span> van szó…
          </p>
          <div className={styles.priceCard} ref={priceRef}>
            <p className={styles.priceLead}>De nem. 1 teljes hónapig veled dolgozunk:</p>
            <div className={styles.priceRow}>
              <span className={styles.priceOld}>79.000 Ft</span>
              <span className={styles.priceReveal}>
                <span className={styles.priceTag}>ELSŐ HÓNAP CSAK</span>
                <span className={`${styles.priceNew} ${priceVal > 19990 ? styles.priceCounting : ''}`}>{formatFt(priceVal)} Ft</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── ÉRTÉK-INDOKLÁS ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>19.990 Ft — hol a csapda?</h2>
          <p className={styles.lead}><span className={styles.grad}>Nincs csapda.</span></p>
          <p className={styles.body}>
            Az első hónap a bizonyítás hónapja. Ha nem hozunk értéket, lemondod. Ha igen, együtt építkezünk tovább.
          </p>
        </section>

        {/* ── SZOLGÁLTATÁS PAKK + CTA ── */}
        <section className={styles.section}>
          <div className={styles.packCard}>
            <span className={styles.packBadge}>Komplett rendszer</span>
            <h3 className={styles.packTitle}>A teljes ügyfélszerző rendszer</h3>
            <ul className={styles.packList}>
              {csomagTartalom.map((f) => (
                <li key={f.cim}>{f.cim}</li>
              ))}
            </ul>
            <div className={styles.packPrice}>
              <span className={styles.priceOld}>79.000 Ft</span>
              <span className={styles.packPriceNew}>19.990 Ft<span> / első hó</span></span>
            </div>
            <p className={styles.guarantee}>🔓 Bármikor lemondhatod — teljes elégedettségi garancia.</p>
          </div>
        </section>

        {/* ── ZÁRÓ CTA + MULTI-STEP FORM ── */}
        <section ref={formRef} className={styles.formSection}>
          <div className={styles.formBox}>
            {sent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Megkaptuk a jelentkezésed!</h3>
                <p>Hamarosan felvesszük veled a kapcsolatot, és megkezdjük a közös munkát.
                  Addig is: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
              </div>
            ) : (
              <>
                <h2 className={styles.formTitle}><span className={styles.grad}>Kezdjük meg</span> a közös munkát</h2>
                <p className={styles.formSub}>
                  Csak a neved és telefonszámod kell — 30 mp, a többit hívásban egyeztetjük.
                </p>

                {/* honeypot – valódi látogató nem tölti ki */}
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

                <div className={styles.field}>
                  <label>Teljes név *</label>
                  <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Telefonszám *</label>
                  <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Email cím *</label>
                  <input
                    type="email"
                    placeholder="te@example.hu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="button" className={styles.formBtn} onClick={handleSubmit} disabled={loading} style={{ width: '100%' }}>
                  {loading ? 'Küldés...' : 'Vedd fel velünk a kapcsolatot →'}
                </button>

                <p className={styles.contactLine}>
                  Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
                </p>

                <p className={styles.formNote}>
                  🔒 Az adataiddal csak kapcsolatfelvételhez élünk, harmadik félnek nem adjuk át.{' '}
                  <a href="/adatkezeles" target="_blank">Adatkezelési tájékoztató</a>
                </p>
              </>
            )}
          </div>
          <p className={styles.signature}>
            Velünk dolgozol: <strong>Müller Dániel</strong> és <strong>Jelencsity Miklós</strong>
          </p>
        </section>

        {/* ── FAQ (legalul) ── */}
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

        {/* ── ZÁRÓ NUDGE (FAQ után, hogy ne legyen zsákutca) ── */}
        <section className={styles.section} style={{ marginTop: 72 }}>
          <h2 className={styles.h2}>Kezdjük el?</h2>
          <p className={styles.body}>
            Az első hónap 19.990 Ft, bármikor lemondható. Gyakorlatilag nem kockáztatsz semmit.
          </p>
          <button type="button" className={styles.ctaPrimary} onClick={scrollToForm} style={{ marginTop: 24 }}>
            Vedd fel velünk a kapcsolatot →
          </button>
        </section>

        <p className={styles.foot}>© 2026 NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
      </div>

      {/* ── STICKY VISSZASZÁMLÁLÓ ── */}
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
