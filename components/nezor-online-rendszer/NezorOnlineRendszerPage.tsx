'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './NezorOnlineRendszerPage.module.css';

const RENDSZER_KEP = '/nezor-online-rendszer-csomag.png';

/* ---------- Reveal: finom scroll-in animáció ---------- */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Adatok ---------- */
const hamisMegoldasok = [
  { cim: '„Kell egy weboldal.”', leiras: 'Önmagában kevés. Ha senki nem látja, csak egy online névjegykártya.' },
  { cim: '„Majd posztolok Facebookra.”', leiras: 'A poszt nem stratégia. Főleg, ha nincs mögötte ajánlat, mérés és kampány.' },
  { cim: '„Rányomok egy kis hirdetést.”', leiras: 'Landing és követés nélkül csak pénzégetés. Kattintás lesz, rendszer nem.' },
  { cim: '„Majd ajánlanak.”', leiras: 'Az ajánlás jó, csak nem skálázható. Nem erre lehet kiszámítható hónapot építeni.' },
];

const kapszKartyak = [
  { cim: 'Meta hirdetéskezelés', leiras: 'A kampányok beállítása, figyelése és finomítása Facebookon és Instagramon — beleértve az ajánlat és szöveg csiszolását is.' },
  { cim: 'Havi 1 landing oldal', leiras: 'Minden hónapban egy célzott kampányoldal az aktuális ajánlatodhoz.' },
  { cim: 'Weboldal karbantartás', leiras: 'Kisebb frissítések, hibák figyelése, technikai alapok rendben tartása.' },
  { cim: 'Mérés + riport + javítás', leiras: 'Nem találgatunk: nézzük, mi működik, és havi riportban összefoglaljuk, mit érdemes javítani.' },
];

const kreativKartyak = [
  { kep: '/HIRDETES3.webp', alt: '6x hirdetési megtérülés', metric: '6×', type: <>Hirdetési megtérülés<br />tesztelt kreatívból</> },
  { kep: '/HIRDETES4.webp', alt: '90.000 elérés hirdetés', metric: '90.000', type: <>Elérés<br />10.000 Ft hirdetési költésből</> },
  { kep: '/HIRDETES2.webp', alt: '100.000 Ft bevétel hirdetés', metric: '100.000 Ft+', type: <>Bevétel<br />12.000 Ft hirdetési költésből</> },
  { kep: '/HIRDETES1.webp', alt: '4x hirdetési megtérülés', metric: '4×', type: <>Hirdetési megtérülés<br />tesztelt kreatívból</> },
];

const probahonap = {
  nev: 'NEZOR havi ügyfélszerző rendszer',
  cim: 'Próbáld ki az első hónapot 19.000 Ft-ért.',
  alcim: 'Normál díj: 79.000 Ft/hó. Az első hónapot azért adjuk 19.000 Ft-ért, mert először bizonyítani akarunk, nem magyarázkodni.',
  arElso: '19.000 Ft',
  arElsoLabel: 'az első hónap',
  arUtana: 'Utána 79.000 Ft / hó',
  lista: [
    'Weboldal karbantartás',
    'Meta hirdetéskezelés',
    'Havi 1 kampány landing oldal',
    'Mérés',
    'Riport',
    'Optimalizálás',
  ],
  apro: 'Az első hónap után eldöntöd, folytatjuk-e. Nincs hosszú hűségidő. Hirdetési költség külön.',
  cta: 'Kérem a próbahónapot →',
};

const gyik = [
  { k: 'Mit tartalmaz a havi 79.000 Ft?', v: 'Weboldal karbantartást, Meta hirdetéskezelést, havi 1 kampány landing oldalt, alap mérést, havi riportot és javítási javaslatot.' },
  { k: 'Mit kapok az első hónapban 19.000 Ft-ért?', v: 'Elindítjuk az első havi együttműködést: megnézzük a vállalkozásod, felépítjük az első kampány irányát, elkészítjük / előkészítjük a kampány landing oldalt, és beállítjuk az alapokat. A cél, hogy lásd, hogyan dolgozunk.' },
  { k: 'A hirdetési költség benne van az árban?', v: 'Nem. A hirdetési költséget külön fizeted, közvetlenül a Meta felé. Így teljesen átlátható, mennyi megy hirdetésre és mennyi a kezelésre.' },
  { k: 'Garantáltan lesz ügyfelem?', v: 'Garantált ügyfelet felelősen senki nem tud ígérni. Amit vállalunk: kampányt, landing oldalt, mérést és javítást építünk, hogy ne találgatásból menjen az ügyfélszerzés.' },
  { k: 'Mi van, ha már van weboldalam?', v: 'Megdolgozunk abból, amid van. Ha használható, karbantartjuk és kampány landinggel egészítjük ki. Ha nem alkalmas hirdetésre, igény szerint készítünk újat.' },
  { k: 'Hogyan kezdjük?', v: 'Kitöltöd az űrlapot, megnézzük a vállalkozásod, majd egyeztetjük, hogy van-e értelme elindítani a próbahónapot.' },
];

export function NezorOnlineRendszerPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const kapszRef = useRef<HTMLDivElement>(null);
  const scrollToKapsz = () => kapszRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [tevekenyseg, setTevekenyseg] = useState('');
  const [vanWeboldal, setVanWeboldal] = useState('');
  const [futottHirdetes, setFutottHirdetes] = useState('');
  const [hirdetesiKeret, setHirdetesiKeret] = useState('');
  const [csomag, setCsomag] = useState('');
  const [uzenet, setUzenet] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nev || !telefon || !email || !tevekenyseg) {
      setError('Kérjük töltsd ki a kötelező mezőket!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Érvénytelen e-mail cím.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await fetch('/api/nezor-online-rendszer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nev, telefon, email, cegnev, tevekenyseg,
          vanWeboldal, futottHirdetes, hirdetesiKeret,
          csomag, uzenet, website,
        }),
      });
    } catch {
      // szilensen kezeljük
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <main className={styles.page}>
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlowA} aria-hidden="true" />
        <div className={styles.heroGlowB} aria-hidden="true" />
        <div className={styles.container}>
          <span className={styles.eyebrow}>NEZOR ONLINE RENDSZER</span>
          <h1 className={styles.h1}>
            Ahelyett, hogy ezt olvasod,<br />
            <span className={styles.accentText}>érdeklődők írhatnának neked.</span>
          </h1>
          <p className={styles.heroSub}>
            Ha szolgáltatóként csak ajánlásokból, régi ügyfelekből vagy néha beeső
            megkeresésekből élsz, akkor nem ügyfélszerzésed van — hanem szerencséd.
          </p>
          <button type="button" className={styles.heroScrollArrow} onClick={scrollToKapsz} aria-label="Tovább görgetés">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* 2. PROBLÉMA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>A PROBLÉMA</span>
            <h2 className={styles.h2}>
              Nem azért nincs elég érdeklődőd,<br />mert rossz vagy abban, amit csinálsz.
            </h2>
            <p className={styles.lead}>
              Hanem mert <span className={styles.shimmerText}>nincs rendszer</span>, ami hónapról
              hónapra új emberek elé teszi az ajánlatodat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. KÖVETKEZMÉNY */}
      <section className={`${styles.section} ${styles.agitSection}`}>
        <div className={styles.agitGlow} aria-hidden="true" />
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>MI TÖRTÉNIK, HA NEM VÁLTOZTATSZ</span>
            <h2 className={styles.h2}>
              Egy év múlva ugyanitt leszel.<br /><span className={styles.dangerText}>Csak fáradtabban.</span>
            </h2>
            <p className={styles.sub}>
              Minden hónapban dolgozol, posztolsz, válaszolgatsz — de az ügyfélszerzés véletlenszerű
              marad. A konkurensed lehet, hogy nem jobb nálad, csak láthatóbb.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. HAMIS MEGOLDÁSOK */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>EZT MÁR PRÓBÁLTAD?</span>
            <h2 className={styles.h2}>Amit a legtöbben elrontanak.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.grid4}>
              {hamisMegoldasok.map((h) => (
                <div key={h.cim} className={styles.card}>
                  <h3>{h.cim}</h3>
                  <p>{h.leiras}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. MEGOLDÁS — A NEZOR MÓDSZER */}
      <section className={`${styles.section} ${styles.priceSection}`}>
        <div className={styles.priceSectionGlowA} aria-hidden="true" />
        <div className={styles.priceSectionGlowB} aria-hidden="true" />
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>A MEGOLDÁS</span>
            <h2 className={styles.h2}>
              79.000 Ft helyett<br /><span className={`${styles.accentText} ${styles.priceShout}`}>MOST 1 hónapig 19.000 Ft.</span>
            </h2>
            <p className={styles.leadCenter} style={{ margin: '0 auto' }}>
              Minden hónapban ugyanazt a logikát visszük végig: ajánlat → landing oldal →
              hirdetés → mérés → javítás.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. MIT KAPSZ */}
      <section ref={kapszRef} className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>A SZOLGÁLTATÁS</span>
            <h2 className={styles.h2}>Mit kapsz havi 19.000 Ft-ért?</h2>
            <p className={styles.leadCenter} style={{ margin: '0 auto' }}>
              Nem külön webest, hirdetésest és szövegírót kell keresned. Egy havi ügyfélszerző
              rendszert kapsz, ami minden hónapban dolgozik.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.grid4}>
              {kapszKartyak.map((k) => (
                <div key={k.cim} className={styles.card}>
                  <h3>{k.cim}</h3>
                  <p>{k.leiras}</p>
                </div>
              ))}
            </div>
            <p className={styles.kapszNote}>
              Hirdetési költség külön fizetendő, közvetlenül a Meta felé.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7. PROOF / REFERENCIA */}
      <section className={styles.section} style={{ paddingBottom: 40 }}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>BIZONYÍTÉK</span>
            <h2 className={styles.h2}>Ilyen kreatívokkal és kampánylogikával dolgozunk.</h2>
          </Reveal>
        </div>
        <div className={styles.creativesMarquee}>
          <div className={styles.creativesTrack}>
            {[...kreativKartyak, ...kreativKartyak].map((k, i) => (
              <div className={styles.creativeCard} key={`${k.metric}-${i}`}>
                <div className={styles.creativeImg}>
                  <Image src={k.kep} alt={k.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 78vw, 25vw" />
                </div>
                <div className={styles.creativeFoot}>
                  <span className={styles.creativeMetric}>{k.metric}</span>
                  <span className={styles.creativeType}>{k.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AJÁNLAT */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>AJÁNLAT</span>
            <h2 className={styles.h2}>{probahonap.cim}</h2>
            <p className={styles.leadCenter} style={{ margin: '0 auto' }}>{probahonap.alcim}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.pricing}>
              <div className={`${styles.offerCard} ${styles.priceCardFeatured}`}>
                <span className={styles.priceBadge}>Kockázatmentes indulás</span>

                <div className={styles.offerImgWrap}>
                  <div className={styles.offerImgStripe} aria-hidden="true" />
                  <Image src={RENDSZER_KEP} alt={probahonap.nev} fill style={{ objectFit: 'contain', padding: '12px' }} sizes="(max-width: 900px) 100vw, 420px" quality={95} />
                  <span className={styles.offerImgCaption}>Illusztráció — digitális reprezentáció</span>
                </div>

                <div className={styles.offerBody}>
                  <div className={styles.offerPriceBlock}>
                    <span className={styles.offerPriceBig}>{probahonap.arElso}</span>
                    <span className={styles.offerPriceSub}>{probahonap.arElsoLabel}</span>
                    <span className={styles.offerPriceAfter}>{probahonap.arUtana}</span>
                  </div>

                  <ul className={styles.offerList}>
                    {probahonap.lista.map((it) => <li key={it}>{it}</li>)}
                  </ul>

                  <p className={styles.offerApro}>{probahonap.apro}</p>

                  <button
                    type="button"
                    className={styles.cta}
                    onClick={() => { setCsomag(probahonap.nev); scrollToForm(); }}
                  >
                    {probahonap.cta}
                  </button>

                  <button
                    type="button"
                    className={styles.offerEgyediLink}
                    onClick={() => { setCsomag('Egyedi ajánlat'); scrollToForm(); }}
                  >
                    Nagyobb kampányod van? Kérj egyedi ajánlatot.
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. GYIK */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.eyebrow}>GYAKORI KÉRDÉSEK</span>
            <h2 className={styles.h2}>Amit a legtöbben kérdeznek.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.faqList}>
              {gyik.map((f, i) => (
                <div key={f.k} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQ}
                    onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                  >
                    {f.k}
                    <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}>+</span>
                  </button>
                  <div className={`${styles.faqA} ${openFaq === i ? styles.faqAOpen : ''}`}>
                    <p>{f.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. VÉGSŐ CTA / FORM */}
      <section ref={formRef} className={styles.finalSection}>
        <div className={styles.finalGlow} aria-hidden="true" />
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2Center}>Nézzük meg, működne-e nálad.</h2>
            <p className={styles.leadCenter}>
              Kitöltöd az űrlapot, megnézzük a vállalkozásod, és megmondjuk, van-e értelme
              elindítani a 19.000 Ft-os próbahónapot.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.formCard}>
              {sent ? (
                <div className={styles.successWrap}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Megkaptuk a kérésed</h3>
                  <p>24 órán belül felvesszük veled a kapcsolatot.</p>
                </div>
              ) : (
                <>
                  <input
                    type="text" name="nezor_hp_field" value={website} onChange={(e) => setWebsite(e.target.value)}
                    className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true"
                  />
                  {csomag && <div className={styles.summary}>Érdeklődsz: <strong>{csomag}</strong></div>}
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label>Teljes név *</label>
                      <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Telefonszám *</label>
                      <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>E-mail-cím *</label>
                      <input type="email" placeholder="te@example.hu" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Vállalkozás neve</label>
                      <input type="text" placeholder="Pl. Kovács Kft." value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Tevékenység / iparág *</label>
                      <input type="text" placeholder="Pl. autószerviz, klímás, takarítócég" value={tevekenyseg} onChange={(e) => setTevekenyseg(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Van jelenleg weboldalad?</label>
                      <select value={vanWeboldal} onChange={(e) => setVanWeboldal(e.target.value)}>
                        <option value="">Válassz...</option>
                        <option value="Igen">Igen</option>
                        <option value="Nem">Nem</option>
                        <option value="Készül">Készül</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Futott már Meta hirdetésed?</label>
                      <select value={futottHirdetes} onChange={(e) => setFutottHirdetes(e.target.value)}>
                        <option value="">Válassz...</option>
                        <option value="Igen">Igen</option>
                        <option value="Nem">Nem</option>
                        <option value="Nem tudom">Nem tudom</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Mekkora havi hirdetési keretben gondolkodsz?</label>
                      <select value={hirdetesiKeret} onChange={(e) => setHirdetesiKeret(e.target.value)}>
                        <option value="">Válassz...</option>
                        <option value="30-50.000 Ft">30–50.000 Ft</option>
                        <option value="50-100.000 Ft">50–100.000 Ft</option>
                        <option value="100.000 Ft+">100.000 Ft+</option>
                        <option value="Még nem tudom">Még nem tudom</option>
                      </select>
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label>Üzenet (opcionális)</label>
                      <textarea placeholder="Bármi, amit fontos tudnunk." value={uzenet} onChange={(e) => setUzenet(e.target.value)} rows={3} />
                    </div>
                  </div>
                  {error && <p className={styles.errorText}>{error}</p>}
                  <button className={styles.formSubmit} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Küldés...' : 'Kérem a 19.000 Ft-os próbahónapot →'}
                  </button>
                  <p className={styles.formTrust}>Nincs nyomulás. Ha nem éri meg nálad, azt is megmondjuk.</p>
                  <p className={styles.formFoot}>Vagy írj: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.logo}>NE<span>ZOR</span></div>
          <p>Online rendszer. Átláthatóan. © 2026 NEZOR Webfejlesztés — Baja, Magyarország</p>
        </div>
      </footer>
    </main>
  );
}
