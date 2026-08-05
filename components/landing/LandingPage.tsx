'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from './LandingPage.module.css';

const formatFt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Az ajánlat lejárata: 2026. augusztus 25. 23:59:59
const DEADLINE = new Date('2026-08-25T23:59:59').getTime();
const pad2 = (n: number) => String(n).padStart(2, '0');


const szolgaltatasTimeline = [
  { cim: 'Adatgyűjtés és ajánlatkészítés', leiras: 'Felmérjük vállalkozásod szolgáltatásait, és közösen kialakítunk egy neked szóló ajánlatot.', kep: '/szolgaltatas-ajanlat.png' },
  { cim: 'Meglévő online jelenlét felmérése', leiras: 'Van-e weboldalad, webshopod, Facebook oldalad, hirdetési fiókod és Google cégprofilod. Ha ezek nincsenek, közösen pótoljuk, hogy hirdetésed hatékony legyen.', kep: '/szolgaltatas-jelenlet.png' },
  { cim: 'Landing oldal és hirdetés készítés', leiras: 'Elkészítjük a landing oldalt, és elindítjuk rá a hirdetési kampányt.', kep: '/szolgaltatas-landing-hirdetes.png' },
];

const cegek = [
  { src: '/estur.webp', alt: 'Estur', style: { objectFit: 'cover' as const, transform: 'scale(1.4) translateY(17%)' } },
  { src: '/cruisershop.webp', alt: 'Cruiser Shop', style: {} },
  { src: '/koronagomba.webp', alt: 'Korona Gomba', style: { objectFit: 'cover' as const, transform: 'scale(2.8) translateY(13%)' } },
  { src: '/nekedsutom.webp', alt: 'Neked Sütöm', style: {} },
  { src: '/image.webp', alt: 'Ügyfél', style: {} },
];

// FONTOS: ezek javasolt értékek — írd át a valós áraidra!
const ertekLebontas = [
  { cim: 'Landing oldal a kampányhoz', jegyzet: '', ertek: '70.000 Ft' },
  { cim: 'Hirdetési kampány + 1 havi kezelés', jegyzet: 'felépítés, indítás, optimalizálás', ertek: '79.000 Ft' },
];


const kampanySor1 = [
  'Cruiser Shop', 'Hazai Kávé Kft.', 'Kisállatkereskedes Baja', 'Neked Sütöm', 'InShape - Diet', 'Loft Of Beauty',
];
const kampanySor2 = [
  'Estur Épker Kft.', 'ZT Épületgépészet', 'Hellinger Kft.', 'Dover Check', 'Korona Gombaipari Egyesülés', 'Tóth Tamás - kertépítés',
];
const kampanySor3 = [
  'Forint - Soft Kft.', 'Adótanácsadók Egyesülete', 'G-R Ékszerszalon', 'Samu Kutyakozmetika', 'Szeko Ablak Kft.', 'XL - Lemeztechnika Kft.',
];

// A profilképek erős blurja és a név takarása a képbe van égetve (_p.jpeg)
const kepVelemenyek = [
  { kep: '/IMG_1699_m2.webp', w: 1169, h: 688, alt: 'Ügyfél visszajelzés', idezet: 'Nagyon nem bántam meg, hogy ebbe belevágtunk.' },
  { kep: '/IMG_1700_m2.webp', w: 1170, h: 270, alt: 'Ügyfél visszajelzés', idezet: 'A munkát és az erőfeszítéseteket értékelem, köszönöm.' },
  { kep: '/IMG_1702_m2.webp', w: 1169, h: 1649, alt: 'Ügyfél visszajelzés', idezet: 'Nah srácok, erről beszéltem! Ez így profi lett!' },
];

const faq = [
  { k: 'Ez tényleg 39.500 Ft?', v: 'Igen. Az első teljes hónap 79.000 helyett 39.500 Ft. Utána te döntöd el, folytatjuk-e a közös munkát.' },
  { k: 'Miből jön ki a 39.500 Ft, és mi az, amit garantálunk?', v: 'Az első hónap 39.500 Ft-jából 29.500 Ft a landing oldal, 10.000 Ft pedig a hirdetéskezelés díja. Ha a hirdetésed statisztikailag nem térül meg, a 10.000 Ft-os hirdetéskezelési díjat garanciálisan visszaadjuk — a landing oldal 29.500 Ft-os értéke viszont a tiéd marad, örökre, hiszen az már a te tulajdonod, egy örök érték.' },
  { k: 'Mit kapok pontosan?', v: 'Egy erre a célra épített weboldalt (ún. landing oldalt) — ide érkeznek majd az érdeklődők a hirdetésből —, és egy teljes havi hirdetési kampányt kapsz, összerakva, élesben.' },
  { k: 'Van bármilyen kötelezettség?', v: 'Nincs. Bármikor lemondhatod az első hónapban, nem kötünk hosszú távú szerződést, míg nem vagy elkötelezett a közös munka felé.' },
  { k: 'Nekem kell megírnom a szövegeket?', v: 'Nem. Elég, ha elmondod, mivel foglalkozol. A szöveget és a felépítést mi rakjuk össze.' },
  { k: 'Mennyi idő, míg elindul?', v: 'Néhány nap alatt élesben van a megjelenésed és a hirdetési kampányod.' },
  { k: 'A hirdetési költség benne van?', v: 'A hirdetési budget közvetlenül a Metához megy, nem hozzánk. A 39.500 Ft a mi munkánk díja. Így átlátható, mennyi megy hirdetésre és mennyi a mi díjunk. Egy átlagos hazai kampány napi 2.000 Ft-tól akár napi több száz ezer Ft-ig is terjedhet — a te vállalkozásodhoz és céljaidhoz mérten közösen állapítjuk meg, mennyit érdemes rászánnod. A beállításban végig segítünk, nem kell értened hozzá.' },
];

export function LandingPage() {
  const router = useRouter();
  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [szakma, setSzakma] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Nem döntött még? — csak emailt kérő, alacsonyabb elköteleződésű opt-in
  const [magnetEmail, setMagnetEmail] = useState('');
  const [magnetLoading, setMagnetLoading] = useState(false);
  const [magnetError, setMagnetError] = useState('');
  const [magnetSent, setMagnetSent] = useState(false);

  const handleMagnetSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!magnetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(magnetEmail)) {
      setMagnetError('Adj meg egy érvényes email címet.');
      return;
    }
    setMagnetLoading(true);
    setMagnetError('');
    try {
      const res = await fetch('/api/landing-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magnetEmail }),
      });
      const data = await res.json();
      if (data.ok) {
        setMagnetSent(true);
      } else {
        setMagnetError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
      }
    } catch {
      setMagnetError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
    } finally {
      setMagnetLoading(false);
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Ár-kalkulátor: 79.000 → 39.500 leszámlálás, amikor a szekció képbe ér
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
        const start = 79000, end = 39500, dur = 1400, t0 = performance.now();
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
    if (!cegnev.trim()) { setError('Add meg a cégneved!'); return; }
    if (!szakma.trim()) { setError('Add meg, milyen vállalkozásod van!'); return; }
    setLoading(true);
    setError('');
    try {
      // Közös azonosító a browser pixel és a szerver oldali CAPI dedupjához
      const eventId = ujEventId();
      const res = await fetch('/api/landing-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, telefon, email, cegnev, szakma, eventId }),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent('Lead', {}, eventId); // csak sikeres beküldésre
        router.push('/landing/koszonjuk');
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
            5+ év tapasztalat · valós ügyfelek, valós eredmények
          </div>
          <span className={styles.heroQuoteMark} aria-hidden="true">&ldquo;</span>
          <h1 className={`${styles.h1} ${styles.heroQuote}`}>
            <span className={styles.heroQuoteLine}>Új ügyfeleket hozunk</span>
            <span className={styles.heroNumLine}>
              <span className={styles.heroNum}>30</span> nap alatt.
            </span>
            <span className={`${styles.grad} ${styles.heroGuaranteeLine}`}>Vagy visszakapod a hirdetéskezelési díjat.</span>
          </h1>
          <div className={styles.heroPills}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              30 nap kötöttség nélkül
            </span>
            <span className={`${styles.badge} ${styles.badgeAlt}`}>
              <span className={`${styles.badgeDot} ${styles.badgeDotAlt}`} />
              Garanciával
            </span>
          </div>
          <p className={styles.heroSub}>
            Landing oldal + élő hirdetési kampány, összerakva, 39.500 Ft-ból az első hónapban.
          </p>

          {/* görgetés-jelző: elválasztja a hero-t a következő szekciótól */}
          <p className={styles.scrollCueLabel}>Nézd meg, mit csinálunk!</p>
          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollCueLine} />
            <span className={styles.scrollCueCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v13M6 12l6 6 6-6" />
              </svg>
            </span>
          </div>

        </section>

        {/* ── AMIT CSINÁLUNK (kompakt, 3 lépéses, nem görgetős) ── */}
        <div className={styles.accentStripe} aria-hidden="true" />
        <section className={styles.section}>
          <h2 className={styles.h2}>
            Így növeljük <span className={styles.grad}>ügyfeleink vállalkozásának forgalmát</span>
          </h2>

          <div className={styles.serviceGrid}>
            {szolgaltatasTimeline.map((s, i) => (
              <div key={s.cim} className={styles.serviceCard}>
                <span className={styles.serviceCardNum}>{i + 1}</span>
                {s.kep ? (
                  <div className={Array.isArray(s.kep) ? styles.serviceThumbRow : styles.serviceThumbWrap}>
                    {(Array.isArray(s.kep) ? s.kep : [s.kep]).map((k) => (
                      <div key={k} className={styles.serviceThumb}>
                        <Image src={k} alt={s.cim} fill sizes="(max-width: 720px) 90vw, 300px" style={{ objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.serviceThumbWrap}>
                    <div className={styles.serviceThumbPlaceholder}>
                      <span className={styles.serviceImagePlaceholderIcon}>🖼️</span>
                      <span>KÉP HELYE</span>
                    </div>
                  </div>
                )}
                <h3 className={styles.serviceCardTitle}>{s.cim}</h3>
                <p className={styles.serviceCardText}>{s.leiras}</p>
              </div>
            ))}
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
          <p className={styles.refText}>
            Már <strong>24 vállalkozás</strong> választott minket <strong className={styles.grad}>idén</strong>
          </p>
        </section>

        {/* ── HIRDETÉSI KAMPÁNY REFERENCIÁK (mozgó sáv) ── */}
        <div className={styles.campaignStrip}>
          <div className={styles.campaignLabel}>Cégek, akik már <span className={styles.grad}>bíztak bennünk</span>…</div>
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

        {/* ── VÉLEMÉNYEK (valós screenshotok, személyes adat kitakarva) ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Amit az <span className={styles.grad}>ügyfeleink</span> mondanak</h2>
          <div className={styles.kepVelemenyStack}>
            {kepVelemenyek.map((v) => (
              <div key={v.kep} className={styles.kepVelemenyCard}>
                <p className={styles.kepVelemenyQuote}>„{v.idezet}”</p>
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

        <p className={styles.sectionTease}>Jó, jó… <span className={styles.grad}>de mennyibe kerül ez nekem?</span></p>

        {/* ── ÁR REVEAL ── */}
        <section className={styles.section}>
          <div className={styles.priceCard} ref={priceRef}>
            <Image
              src="/nezorgarancia.webp"
              alt="1 hónapos garancia"
              width={140}
              height={140}
              className={styles.guaranteeSeal}
            />
            <p className={styles.priceLead}><span className={styles.grad}>Ajánlatunk</span> az 1. hónapra</p>
            <div className={styles.priceRow}>
              <span className={styles.priceOld}>79.000 Ft</span>
              <span className={styles.priceReveal}>
                <span className={styles.priceTag}>ELSŐ HÓNAP CSAK</span>
                <span className={`${styles.priceNew} ${priceVal > 39500 ? styles.priceCounting : ''}`}>{formatFt(priceVal)} Ft</span>
              </span>
            </div>

            <h3 className={styles.packTitle} style={{ fontSize: '1.15rem', marginTop: 28 }}>Mit kapsz, és mit ér?</h3>
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

            <p className={styles.priceCtaLead}>
              Egy egész hónapig azon dolgozunk, hogy új ügyfeleid legyenek.
            </p>
            <button type="button" className={styles.ctaPrimary} onClick={scrollToForm}>
              Vedd fel velünk a kapcsolatot →
            </button>
          </div>
        </section>

        <p className={styles.sectionTease}>Garancia? <span className={styles.grad}>Van!</span></p>

        {/* ── GARANCIA ── */}
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
            <p className={styles.body} style={{ marginTop: 18 }}>
              Azért merjük ezt vállalni, mert nem vállalunk el senkit, akin úgy érezzük, nem
              tudunk segíteni. Csak azért, hogy több ügyfelünk legyen.
            </p>
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
                  Csak néhány gyors adat kell tőled, nem lesz macera.
                </p>


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
                <div className={styles.field}>
                  <label>Cégnév *</label>
                  <input type="text" placeholder="Pl. Kovács Tetőfedés" value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Milyen vállalkozásod van? *</label>
                  <input type="text" placeholder="Pl. webshop, szépségszalon, tanácsadás, tetőfedés" value={szakma} onChange={(e) => setSzakma(e.target.value)} />
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

            {/* Alapítói fotó — kerek, a form tetején, szöveget nem takar */}
            <Image
              src="/alapitok2.webp"
              alt="Müller Dániel és Jelencsity Miklós — NEZOR alapítók"
              width={440}
              height={440}
              className={styles.formPhoto}
              sizes="120px"
            />
          </div>
          <p className={styles.signature}>
            Velünk dolgozol: <strong>Müller Dániel</strong> és <strong>Jelencsity Miklós</strong>
          </p>
        </section>

        {/* ── MÉG NEM DÖNTÖTTÉL? — email opt-in, kampánypélda + 3 tipp ──
            Egyelőre kikapcsolva (elmentve, ha vissza kell kapcsolni).
        <section className={styles.section}>
          <div className={styles.magnetCard}>
            {magnetSent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Elküldtük emailben!</h3>
                <p>Nézd meg a postaládád — benne egy valós kampánypélda és 3 tipp, amivel már ma elindulhatsz.</p>
              </div>
            ) : (
              <>
                <h2 className={styles.h2}>Még <span className={styles.grad}>nem döntöttél?</span></h2>
                <p className={styles.sectionTease} style={{ margin: '10px 0 20px' }}>
                  Valaki ugyanígy olvasta ezt, mint most te.<br />
                  <span className={styles.grad}>Ma már ügyfelünk.</span>
                </p>
                <ul className={styles.guaranteeList} style={{ marginTop: 4 }}>
                  <li><strong>Friss, belsős példa</strong> egy valódi kampányból.</li>
                  <li><strong>3 tipp</strong>, amit akár már ma használhatsz.</li>
                </ul>
                <div className={styles.magnetForm}>
                  <input
                    type="email"
                    placeholder="te@example.hu"
                    value={magnetEmail}
                    onChange={(e) => setMagnetEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMagnetSubmit(e)}
                  />
                  <button type="button" onClick={handleMagnetSubmit} disabled={magnetLoading}>
                    {magnetLoading ? 'Küldés...' : 'Kérem a tippeket →'}
                  </button>
                </div>
                {magnetError && <p className={styles.error}>{magnetError}</p>}
              </>
            )}
          </div>
        </section>
        */}

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
            Az első hónap 39.500 Ft, bármikor lemondható. Gyakorlatilag nem kockáztatsz semmit.
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
