'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GridBg } from '@/components/ui/GridBg';
import styles from './EpitoipariWeboldalPage.module.css';

const utvonal = [
  { kep: '/wave-step-1.webp' },
  { kep: '/wave-step-2.webp' },
  { kep: '/wave-step-3.webp' },
  { kep: '/wave-step-4.webp' },
  { kep: '/wave-step-5.webp' },
];

const STEP_H = 640;
const STEP_H_MOBILE = 620;
const GUTTER_W = 100;

function blobPoint(i: number, mobile: boolean) {
  const stepH = mobile ? STEP_H_MOBILE : STEP_H;
  return { x: mobile ? 50 : (i % 2 === 0 ? 22 : 78), y: i * stepH + (mobile ? 60 : 320) };
}

function WaveBlobTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 560);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const passed = vh * 0.8 - rect.top;
        const pct = rect.height > 0 ? Math.min(1, Math.max(0, passed / rect.height)) : 0;
        setProgress((prev) => (Math.abs(prev - pct) > 0.001 ? pct : prev));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stepH = isMobile ? STEP_H_MOBILE : STEP_H;
  const totalH = utvonal.length * stepH;
  const revealY = progress * totalH;

  return (
    <div ref={containerRef} className={styles.waveTimeline} style={{ height: totalH }}>
      <svg className={styles.waveSvg} viewBox={`0 0 ${GUTTER_W} ${totalH}`} preserveAspectRatio="none">
        <defs>
          <clipPath id="waveReveal" clipPathUnits="userSpaceOnUse">
            <rect x={0} y={0} width={GUTTER_W} height={revealY} />
          </clipPath>
        </defs>
        {utvonal.slice(0, -1).map((_, i) => {
          const p0 = blobPoint(i, isMobile);
          const p1 = blobPoint(i + 1, isMobile);
          return (
            <line
              key={`bg-${i}`}
              x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y}
              className={styles.waveSegInactive}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <g clipPath="url(#waveReveal)">
          {utvonal.slice(0, -1).map((_, i) => {
            const p0 = blobPoint(i, isMobile);
            const p1 = blobPoint(i + 1, isMobile);
            return (
              <line
                key={`fg-${i}`}
                x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y}
                className={styles.waveSegActive}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>
      </svg>

      {utvonal.map((u, i) => {
        const p = blobPoint(i, isMobile);
        const active = revealY >= p.y;
        const isLeftBlob = p.x < GUTTER_W / 2;
        return (
          <div
            key={u.kep}
            className={`${styles.waveStep} ${active ? styles.waveStepActive : ''} ${isMobile ? styles.waveStepMobile : ''}`}
            style={{ top: i * stepH, height: stepH }}
          >
            <div
              className={styles.waveBlob}
              style={{ left: `${p.x}%`, top: p.y - i * stepH }}
            >
              <span>{i + 1}</span>
            </div>
            <div
              className={isMobile ? styles.waveCardMobile : `${styles.waveCard} ${isLeftBlob ? styles.waveCardRight : styles.waveCardLeft}`}
            >
              <Image src={u.kep} alt={`${i + 1}. lépés`} width={1254} height={1254} quality={95} sizes="(max-width: 560px) 80vw, 540px" className={styles.waveCardImg} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const szakmak = [
  'Tetőfedés', 'Ács / bádogos', 'Kőműves munka', 'Burkolás', 'Festés', 'Villanyszerelés',
  'Víz-gáz-fűtés', 'Klíma', 'Asztalos munka', 'Generálkivitelezés', 'Egyéb',
];

const mintak = [
  {
    id: 'egyszeru', nev: 'Alap weboldal', tier: 'alap' as const, headline: 'Tetőfedés, bádogozás, javítás', cta: 'Ajánlatot kérek',
    leiras: 'Ha gyorsan kell egy normális oldal, amit el tudsz küldeni az érdeklődőknek.',
    elonezetUrl: 'https://mikijelencsity.github.io/epitoipari-oldal/',
  },
  {
    id: 'referencias', nev: 'Többoldalas weboldal', tier: 'premium' as const, headline: 'Munkáink', cta: 'Munkáim megnézése',
    leiras: 'Ha a munkáidnak kell meggyőzniük az érdeklődőt. Képek, szolgáltatások, ajánlatkérés egy helyen.',
    elonezetUrl: 'https://mikijelencsity.github.io/Altalanos/index.html',
  },
  {
    id: 'premium', nev: 'Többoldalas weboldal', tier: 'premium' as const, headline: 'Építőipari kivitelezés', cta: 'Ajánlatot kérek',
    leiras: 'Ha erősebb vállalkozói megjelenést szeretnél, több tartalommal és profibb hatással.',
    elonezetUrl: 'https://mullerdanielev-nezor.github.io/k-m-ves-weboldal/',
  },
];

const mintaMockupKepek: Record<string, string> = {
  egyszeru: '/epitoipari-mockup-alap.webp',
  referencias: '/epitoipari-mockup-referencias.webp',
  premium: '/epitoipari-mockup-premium.webp',
};

// TODO: cseréld ki valódi referencia-oldal screenshotokra
const referenciaKepek = [
  { id: 'ref-1', nev: 'Kerékpárszaküzlet stílus', kep: '/referencia-1.webp' },
  { id: 'ref-2', nev: 'Hellinger Kft. stílus', kep: '/referencia-2.webp' },
  { id: 'ref-3', nev: 'Estur stílus', kep: '/referencia-3.webp' },
];

const sablonElokepek = ['/epitoipari-mockup-alap.webp', '/epitoipari-mockup-referencias.webp', '/epitoipari-mockup-premium.webp'];

const csomagok = [
  {
    id: 'sima', nev: 'Egyoldalas weboldal', alcim: 'Kezdőknek', ar: '50.000 Ft',
    dontes: 'Ha gyorsan kell egy normális, egyoldalas oldal.',
    jellemzok: ['Egyoldalas weboldal', 'Mobilbarát kialakítás', 'Szövegek és képek beépítése', 'Kapcsolat / ajánlatkérés rész', 'Első verzió akár 24 órán belül'],
  },
  {
    id: 'premium', nev: 'Többoldalas weboldal', alcim: 'Profiknak', ar: '120.000 Ft', badge: 'Ajánlott',
    dontes: 'Ha több szolgáltatást, munkaképeket és komolyabb megjelenést szeretnél.',
    jellemzok: ['Bővebb felépítés', 'Szolgáltatások részletesebben', 'Referenciák / munkáink rész', 'Erősebb bemutatkozó szövegezés', 'Ajánlatkérésre épített oldal', 'Első verzió akár 24 órán belül'],
  },
];

const SAJAT_ELKEPZELES = 'sajat';

const faq = [
  { k: 'Ez sablonoldal lesz?', v: 'Nem. A kiválasztott stílus csak kiinduló irány. A végleges oldal a te munkáidra, szolgáltatásaidra és vállalkozásodra lesz igazítva.' },
  { k: 'Tényleg elkészülhet 24 órán belül?', v: 'Az első verzió akár 24 órán belül elkészülhet, ha gyorsan megvannak az alap adatok, képek és elérhetőségek.' },
  { k: 'Kell kész szöveget küldenem?', v: 'Nem. Elég, ha megadod, mivel foglalkozol, hol dolgozol és milyen szolgáltatásokat vállalsz. A szövegben segítünk.' },
  { k: 'Ez havidíjas?', v: 'Nem kötelező havidíjas. Az itt látható ár egyszeri weboldalkészítési díj.' },
];

export function EpitoipariWeboldalPage() {
  const mintakRef = useRef<HTMLDivElement>(null);
  const csomagokRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const valasztasEredmenyRef = useRef<HTMLDivElement>(null);

  const [ut, setUt] = useState<'gyors' | 'sajat' | ''>('');
  const [minta, setMinta] = useState('');
  const [leiras, setLeiras] = useState('');
  const [csomag, setCsomag] = useState('premium');
  const [szakma, setSzakma] = useState('');
  const [nev, setNev] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [telepules, setTelepules] = useState('');
  const [website, setWebsite] = useState('');
  const [tartalom, setTartalom] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [valasztasMod, setValasztasMod] = useState<'' | 'elokeszitett' | 'egyeni'>('');
  const [formStep, setFormStep] = useState(1);
  const FORM_LEPESEK = 5;

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectMinta = (id: string) => {
    setMinta(id);
  };

  useEffect(() => {
    if (valasztasMod) {
      valasztasEredmenyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [valasztasMod]);

  const handleMintaValasztas = (id: string) => {
    selectMinta(id);
    scrollTo(csomagokRef);
  };

  const valasztottMinta = mintak.find((m) => m.id === minta);

  const valasztottCsomag = csomagok.find((c) => c.id === csomag);

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!nev || !telefon) return 'Add meg a neved és telefonszámod!';
    }
    if (step === 2) {
      if (!email) return 'Add meg az e-mail-címed!';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Érvénytelen e-mail cím.';
      if (!szakma) return 'Válassz, milyen munkával foglalkozol!';
    }
    if (step === 3) {
      if (!csomag) return 'Válassz csomagot!';
    }
    if (step === 4) {
      if (!minta) return 'Válassz mintát, vagy jelöld, hogy saját elképzelésed van!';
      if (minta === SAJAT_ELKEPZELES && !leiras) return 'Írd le röviden, milyen oldalt szeretnél!';
    }
    return '';
  };

  const handleTovabb = () => {
    const hiba = validateStep(formStep);
    if (hiba) {
      setError(hiba);
      return;
    }
    setError('');
    setFormStep((s) => Math.min(s + 1, FORM_LEPESEK));
  };

  const handleVissza = () => {
    setError('');
    setFormStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!tartalom) {
      setError('Kérjük fogadd el a feltételt!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/epitoipari-weboldal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nev, cegnev, email, telefon, telepules, website,
          szakma,
          stilus: minta === SAJAT_ELKEPZELES ? 'Saját elképzelés' : `${valasztottMinta?.nev} – ${valasztottMinta?.headline}`,
          leiras: minta === SAJAT_ELKEPZELES ? leiras : undefined,
          csomag: `${valasztottCsomag?.nev} (${valasztottCsomag?.ar})`,
        }),
      });
      if (!res.ok) {
        setError('Hiba történt a küldés során. Próbáld újra, vagy írj nekünk: info@nezor.hu');
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError('Hiba történt a küldés során. Próbáld újra, vagy írj nekünk: info@nezor.hu');
    }
    setLoading(false);
  };


  return (
    <section className={styles.page}>
      <GridBg light />
      <div className={styles.container}>

        {/* HERO */}
        <div className={styles.hero}>
          <div className={styles.heroBlobTl} aria-hidden="true" />
          <div className={styles.heroBlobBr} aria-hidden="true" />
          <div className={styles.heroDots} aria-hidden="true" />

          <div className={styles.heroText}>
            <span className={styles.label}>ÉPÍTŐIPARI VÁLLALKOZÓKNAK</span>
            <h1 className={styles.h1}>
              Aki rád keres,<br />
              az téged válasszon.
            </h1>
            <p className={styles.heroSub}>
              Modern weboldal, Google megjelenés és online ügyfélszerzés szakembereknek, akik
              komolyabb képet akarnak mutatni a megrendelők felé.
            </p>
            <div className={styles.heroCtas}>
              <button type="button" className={styles.ctaPrimary} onClick={() => scrollTo(formRef)}>
                Kérek egy gyors weboldal tervet →
              </button>
            </div>
            <p className={styles.heroTrust}>Ingyenes egyeztetés · 24 órán belüli válasz · Építőiparra szabva</p>
          </div>

          <div className={styles.heroPreview}>
            <div className={styles.heroImageWrap}>
              <Image src="/epitoipari-hero-v2.webp" alt="Építőipari weboldal előnézet laptopon és telefonon" fill style={{ objectFit: 'contain' }} sizes="(max-width: 900px) 90vw, 560px" priority />
            </div>
          </div>
        </div>

        <div className={styles.heroBenefits}>
          <div className={styles.heroBenefitCard}>
            <h3>Weboldal</h3>
            <p>Ahol a megrendelő látja, hogy komoly vagy.</p>
          </div>
          <div className={styles.heroBenefitCard}>
            <h3>Google Cégprofil</h3>
            <p>Hogy akkor is megtaláljanak, ha nem ismernek.</p>
          </div>
          <div className={styles.heroBenefitCard}>
            <h3>Több érdeklődő</h3>
            <p>Nem csak szép oldal, hanem munka is jöjjön belőle.</p>
          </div>
        </div>

        <div className={styles.scrollArrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
        </div>

        {/* PROBLÉMAFELISMERÉS */}
        <div className={styles.section}>
          <h2 className={styles.h2}>Nálunk az a tapasztalat, hogy egy csomó jó szakember simán elveszik a tömegben.</h2>
          <p className={styles.sectionSub}>
            Nem mert rosszabb, hanem mert nincs hol megtalálni.
          </p>
          <div className={styles.engraved} data-text="Itt jövünk mi a képbe...">Itt jövünk mi a képbe...</div>

          <WaveBlobTimeline />
        </div>


        {/* REFERENCIÁK MARQUEE */}
        <div className={styles.refStrip}>
          <div className={styles.refLabel}>Cégek, akikkel már együtt dolgoztunk</div>
          <div className={styles.refTrack}>
            <span>Cruiser Shop</span>
            <span>Hazai Kávé Kft.</span>
            <span>Kisállatkereskedes Baja</span>
            <span>Neked Sütöm</span>
            <span>InShape - Diet</span>
            <span>Estur Épker Kft.</span>
            <span>ZT Épületgépészet</span>
            <span>Cruiser Shop</span>
            <span>Hazai Kávé Kft.</span>
            <span>Kisállatkereskedes Baja</span>
            <span>Neked Sütöm</span>
            <span>InShape - Diet</span>
            <span>Estur Épker Kft.</span>
            <span>ZT Épületgépészet</span>
          </div>
          <div className={`${styles.refTrack} ${styles.refTrackAlt}`}>
            <span>Hellinger Kft.</span>
            <span>Dover Check</span>
            <span>Korona Gombaipari Egyesülés</span>
            <span>Forint - Soft Kft.</span>
            <span>Adótanácsadók Egyesülete</span>
            <span>G-R Ékszerszalon</span>
            <span>Samu Kutyakozmetika</span>
            <span>Hellinger Kft.</span>
            <span>Dover Check</span>
            <span>Korona Gombaipari Egyesülés</span>
            <span>Forint - Soft Kft.</span>
            <span>Adótanácsadók Egyesülete</span>
            <span>G-R Ékszerszalon</span>
            <span>Samu Kutyakozmetika</span>
          </div>
        </div>

        {/* MEGOLDÁS — FŐ AJÁNLAT */}
        <div className={styles.section}>
          <h2 className={styles.h2}>Nem kell nulláról kitalálnod.</h2>
          <p className={styles.sectionSub}>
            Válassz egy kiinduló stílust, mi pedig rászabjuk a vállalkozásodra. A végleges oldalon
            a te munkáid, szolgáltatásaid és elérhetőségeid lesznek.
          </p>
        </div>


        {/* MINTÁK */}
        <div ref={mintakRef} className={styles.section}>
          <div className={`${styles.bigNumberBlock} ${styles.bigNumberBlockCyan}`}>
            <span className={styles.bigNumberBg}>1</span>
            <h2 className={styles.h2}>Gyorsaság csomag</h2>
            <p className={styles.sectionSub}>
              Előre elkészített designok közül választasz, mi pedig rászabjuk a vállalkozásodra.
            </p>
            <div className={styles.mintaGrid}>
              {mintak.map((m) => (
                <div
                  key={m.id}
                  className={`${styles.mintaCard} ${minta === m.id ? styles.mintaCardActive : ''} ${m.tier === 'premium' ? styles.mintaCardPremium : ''}`}
                >
                  {m.tier === 'premium' && <span className={styles.mintaTierBadge}>★ Prémium</span>}
                  <div className={`${styles.mintaPreview} ${styles[`mintaPreview_${m.id}`]}`}>
                    {mintaMockupKepek[m.id] ? (
                      <div className={styles.mintaPreviewImgWrap}>
                        <Image
                          src={mintaMockupKepek[m.id]}
                          alt={m.nev}
                          fill
                          style={{ objectFit: 'contain' }}
                          className={styles.mintaPreviewImg}
                        />
                      </div>
                    ) : (
                      <>
                        <div className={styles.mockupBar}>
                          <span /><span /><span />
                        </div>
                        <div className={styles.mintaPreviewBody}>
                          <h4>{m.headline}</h4>
                          <div className={styles.mintaPreviewGrid}>
                            <span /><span /><span />
                          </div>
                          <div className={styles.mintaPreviewCta}>{m.cta}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <h3>{m.nev}</h3>
                  <p>{m.leiras}</p>
                  <a href={m.elonezetUrl} target="_blank" rel="noopener noreferrer" className={styles.mintaBtn}>
                    Megtekintem →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.bigNumberBlock} ${styles.bigNumberBlockYellow}`}>
            <span className={styles.bigNumberBg}>2</span>
            <h2 className={styles.h2}>Teljesen személyre szabott</h2>
            <p className={styles.sectionSub}>
              Nulláról építjük, a te elképzelésed alapján. Csak írd le, mit szeretnél.
            </p>
            <p className={styles.referenciaKepLabel}>
              Egyéni igények alapján készült weboldalainkból:
            </p>
            <div className={styles.referenciaKepWrap}>
              <div className={styles.referenciaKepGrid}>
                {referenciaKepek.map((r, i) => (
                  <div
                    key={r.kep}
                    className={styles.referenciaKepCard}
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    <div className={styles.referenciaKepOrb} aria-hidden="true" />
                    <div className={styles.referenciaKepShadow} aria-hidden="true" />
                    <Image src={r.kep} alt="Referencia weboldal" width={560} height={400} className={styles.referenciaKepImg} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* CSOMAGOK */}
        <div ref={csomagokRef} className={styles.section}>
          <h2 className={styles.h2}>Csomagjaink</h2>
          <p className={styles.sectionSub}>
            Két egyszerű opció. Az egyik gyors induláshoz, a másik komolyabb céges megjelenéshez.
          </p>
          <div className={styles.csomagGrid}>
            {csomagok.map((c) => (
              <div key={c.id} className={`${styles.csomagCard} ${c.id === 'premium' ? styles.csomagCardPremium : ''}`}>
                {c.badge && <span className={styles.csomagBadge}>{c.badge}</span>}
                <h3>{c.nev}</h3>
                <span className={styles.csomagAlcim}>{c.alcim}</span>
                <p className={styles.csomagAr}>{c.ar}</p>
                <p className={styles.csomagDontes}>{c.dontes}</p>
                <ul>
                  {c.jellemzok.map((j) => <li key={j}>{j}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>


        {/* FORM */}
        <div ref={formRef} className={styles.formCard}>
          {sent ? (
            <div className={styles.successWrap}>
              <div className={styles.successIcon}>✓</div>
              <h3>Megkaptuk az adataidat</h3>
              <p>
                Hamarosan felvesszük veled a kapcsolatot, és egyeztetjük a weboldalad első
                verzióját. Addig is: <a href="mailto:info@nezor.hu">info@nezor.hu</a>
              </p>
            </div>
          ) : (
            <>
              <h2 className={styles.formTitle}>Kérem az első verziót</h2>
              <p className={styles.formLead}>
                30 másodperc kitölteni. A részleteket utána egyeztetjük.<br />
                Nem kell kész szöveggel érkezned.
              </p>

              <div className={styles.formProgress}>
                {Array.from({ length: FORM_LEPESEK }, (_, i) => i + 1).map((s) => (
                  <span key={s} className={`${styles.formProgressDot} ${s <= formStep ? styles.formProgressDotActive : ''}`} />
                ))}
              </div>
              <p className={styles.formStepLabel}>{formStep}. / {FORM_LEPESEK} lépés</p>

              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {formStep === 1 && (
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label>Teljes név *</label>
                    <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label>Telefonszám *</label>
                    <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label>E-mail-cím *</label>
                    <input type="email" placeholder="te@example.hu" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label>Milyen munkával foglalkozol? *</label>
                    <select value={szakma} onChange={(e) => setSzakma(e.target.value)} className={styles.select}>
                      <option value="">Válassz...</option>
                      {szakmak.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className={styles.csomagValasztoSor}>
                  {csomagok.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`${styles.csomagValasztoKartya} ${csomag === c.id ? styles.csomagValasztoKartyaActive : ''} ${c.id === 'premium' ? styles.csomagValasztoKartyaPremium : ''}`}
                      onClick={() => setCsomag(c.id)}
                    >
                      {c.badge && <span className={styles.csomagValasztoBadge}>{c.badge}</span>}
                      <h3>{c.nev}</h3>
                      <span className={styles.csomagValasztoAlcim}>{c.alcim}</span>
                      <p className={styles.csomagValasztoAr}>{c.ar}</p>
                      <p className={styles.csomagValasztoDontes}>{c.dontes}</p>
                    </button>
                  ))}
                </div>
              )}

              {formStep === 4 && (
                <div className={styles.valasztasDontes}>
                  <p className={styles.valasztasFelhivas}>👇 Melyik illik jobban rád? 👇</p>
                  <div className={styles.valasztasKartyaSor}>
                    <button
                      type="button"
                      className={`${styles.valasztasKartya} ${valasztasMod === 'elokeszitett' ? styles.valasztasKartyaActive : ''}`}
                      onClick={() => setValasztasMod('elokeszitett')}
                    >
                      <span className={styles.valasztasKartyaIcon}>🗂️</span>
                      <h3>Előre elkészített</h3>
                      <p>Válassz a fenti 3 stílus közül, mi pedig rászabjuk a vállalkozásodra.</p>
                      <span className={styles.valasztasKartyaCta}>Kattints ide →</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.valasztasKartya} ${valasztasMod === 'egyeni' ? styles.valasztasKartyaActive : ''}`}
                      onClick={() => { setValasztasMod('egyeni'); setUt('sajat'); selectMinta(SAJAT_ELKEPZELES); }}
                    >
                      <span className={styles.valasztasKartyaIcon}>✏️</span>
                      <h3>Egyéni ötlet</h3>
                      <p>Nulláról építjük, a te elképzelésed alapján.</p>
                      <span className={styles.valasztasKartyaCta}>Kattints ide →</span>
                    </button>
                  </div>
                  <div ref={valasztasEredmenyRef}>
                    {valasztasMod === 'elokeszitett' && (
                      <>
                        <p className={styles.valasztasSablonHint}>👇 Válassz a 3 stílus közül 👇</p>
                        <div className={styles.valasztasSablonSor}>
                          {/* TODO: cseréld ki valódi sablon-screenshotokra */}
                          {mintak.map((m, i) => (
                            <button
                              key={m.id}
                              type="button"
                              className={`${styles.valasztasSablonKartya} ${minta === m.id ? styles.valasztasSablonKartyaActive : ''}`}
                              onClick={() => { setUt('gyors'); selectMinta(m.id); }}
                            >
                              <Image src={sablonElokepek[i]} alt={m.nev} width={280} height={200} className={styles.valasztasSablonKep} />
                              <span>{m.nev} →</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    {minta === SAJAT_ELKEPZELES && (
                      <div className={`${styles.field} ${styles.fieldFull}`} style={{ marginTop: 24, textAlign: 'left' }}>
                        <label>Írd le röviden az elképzelésed *</label>
                        <textarea
                          autoFocus
                          placeholder="Pl. sötétebb, komolyabb oldalt szeretnék, referenciákkal, szolgáltatásokkal és ajánlatkérő gombbal."
                          value={leiras}
                          onChange={(e) => setLeiras(e.target.value)}
                          rows={4}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formStep === 5 && (
                <>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" checked={tartalom} onChange={(e) => setTartalom(e.target.checked)} />
                    <span>Tudomásul veszem, hogy a pontos képeket, szövegeket és adatokat egyeztetés után küldöm el.</span>
                  </label>
                </>
              )}

              {error && <p className={styles.errorText}>{error}</p>}

              <div className={styles.formNavRow}>
                {formStep > 1 && (
                  <button type="button" className={styles.formBackBtn} onClick={handleVissza}>
                    ← Vissza
                  </button>
                )}
                {formStep < FORM_LEPESEK ? (
                  <button type="button" className={styles.formNextBtn} onClick={handleTovabb}>
                    Tovább →
                  </button>
                ) : (
                  <button className={styles.formSubmit} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Küldés...' : 'Kérem az első verziót →'}
                  </button>
                )}
              </div>
              <p className={styles.formFoot}>Az adataidat csak kapcsolatfelvételhez használjuk.</p>
            </>
          )}
        </div>


        {/* FAQ */}
        <div className={styles.faqBlock}>
          <h2 className={styles.h2}>Gyakori kérdések</h2>
          <div className={styles.faqList}>
            {faq.map((f) => (
              <details key={f.k} className={styles.faqItem}>
                <summary>{f.k}</summary>
                <p>{f.v}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {!sent && (
        <div className={styles.stickyMobile}>
          <button type="button" onClick={() => scrollTo(formRef)}>Kérem a weboldalam</button>
        </div>
      )}
    </section>
  );
}
