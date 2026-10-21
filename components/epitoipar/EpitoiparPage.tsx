'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from './EpitoiparPage.module.css';

function sutiElfogadva(): boolean {
  try {
    return localStorage.getItem('nezorCookieConsent') === 'accepted';
  } catch {
    return false;
  }
}

// Magyar mobilszám a +36 előhívó UTÁN: 20/30/31/50/70 + 7 számjegy
const MOBIL_RE = /^(20|30|31|50|70)\d{7}$/;

/** A beírt telefonszámból a +36 utáni rész (06/36/+36 előtagot levágjuk) */
function mobilSzamjegyek(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('0036')) d = d.slice(4);
  else if (d.startsWith('36')) d = d.slice(2);
  else if (d.startsWith('06')) d = d.slice(2);
  return d;
}

type Ertek = string | string[];
type Valaszok = Record<string, Ertek>;
type Szoveg = string | ((nev: string) => string);

type Lepes = { kulcs: string; cimke: string; cim: Szoveg; al?: Szoveg; felett?: Szoveg } & (
  | { tipus: 'szoveg'; placeholder: string; inputMode?: 'text' | 'email' | 'numeric' | 'url'; ellenoriz?: (v: string) => string | null }
  | { tipus: 'hosszu'; placeholder?: string }
  | { tipus: 'egy'; opciok: string[] }
  | { tipus: 'tobb'; opciok: { cimke: string; ikon: string; szin: string }[] }
);

const lepesek: Lepes[] = [
  {
    tipus: 'szoveg', kulcs: 'keresztnev', cimke: 'Keresztnév',
    cim: 'Rendben, nem húzzuk az időd. De mielőtt belevágunk — nem akarunk udvariatlanok lenni… Hogy hívnak?',
    placeholder: 'Keresztneved',
  },
  {
    tipus: 'egy', kulcs: 'fb', cimke: 'Facebook-hirdetés',
    felett: (n) => `Köszi, ${n}! Hogy kiderüljön, tényleg tudunk-e segíteni a vállalkozásodnak… van pár kérdésünk.`,
    cim: 'Először: próbáltál már fizetett Facebook-hirdetést?',
    opciok: ['Igen, most is hirdetek', 'Próbáltam, de abbahagytam', 'Még nem próbáltam'],
  },
  {
    tipus: 'tobb', kulcs: 'csatornak', cimke: 'Jelenlegi ügyfélszerzés',
    cim: 'Oké, szuper! Most honnan jönnek az ügyfeleid?',
    al: '(Többet is választhatsz)',
    opciok: [
      { cimke: 'Facebook', ikon: 'f', szin: '#1877f2' },
      { cimke: 'Google', ikon: 'G', szin: '#ea4335' },
      { cimke: 'Weboldal', ikon: '🌐', szin: '#0f9d58' },
      { cimke: 'Ajánlás', ikon: '🗣️', szin: '#8e44ad' },
      { cimke: 'Szórólap / újság', ikon: '📰', szin: '#1565c0' },
      { cimke: 'Hirdetési portál', ikon: '📋', szin: '#f39c12' },
      { cimke: 'Egyéb', ikon: '🔔', szin: '#f1c40f' },
      { cimke: 'Semmi', ikon: '⛔', szin: '#777' },
    ],
  },
  {
    tipus: 'hosszu', kulcs: 'leiras', cimke: 'Tevékenység',
    cim: 'Röviden: mivel foglalkozol, kiknek, és milyen árszinten?',
    placeholder: 'Pl. tetőfedés és tetőfelújítás családi házakra, átlagosan 2–5 millió Ft-os munkák',
  },
  {
    tipus: 'egy', kulcs: 'keret', cimke: 'Havi hirdetési keret',
    cim: 'Mekkora havi összeget szánnál hirdetésre?',
    al: 'Azért kérdezzük, hogy lássuk, tudunk-e segíteni — és hogy a kereteden belül a legjobb megoldást javasoljuk.',
    opciok: ['50 000 Ft alatt', '50–100 ezer Ft', '100–200 ezer Ft', '200–500 ezer Ft', '500 ezer Ft felett', 'Még nem tudom'],
  },
  {
    tipus: 'szoveg', kulcs: 'ugyfelszam', cimke: 'Havi új ügyfél', inputMode: 'numeric',
    cim: 'Hány új ügyfelet szeretnél havonta?',
    al: 'Ehhez mérten javasoljuk a hirdetési keretet.',
    placeholder: 'Pl. 5',
  },
];

const VEGE = lepesek.length; // utolsó lépés: elérhetőség

export function EpitoiparPage() {
  const [indul, setIndul] = useState(false); // nyitóképernyő → űrlap
  const [lepes, setLepes] = useState(0);
  const [v, setV] = useState<Valaszok>({});
  const [vezeteknev, setVezeteknev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [hozzajarulas, setHozzajarulas] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [kilepes, setKilepes] = useState(false); // kilépési popup
  const elkuldve = useRef(false);
  const fokusz = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const nev = String(v.keresztnev ?? '').trim();
  const sz = (t: Szoveg | undefined) => (typeof t === 'function' ? t(nev) : t);
  const aktualis = lepesek[lepes];

  const indit = () => {
    setKilepes(false);
    setIndul(true);
    window.scrollTo({ top: 0 });
  };

  const tovabb = () => {
    setError('');
    setLepes((l) => l + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const vissza = () => {
    setError('');
    if (lepes === 0) setIndul(false); // első kérdésről vissza a nyitóképernyőre
    else setLepes(lepes - 1);
  };

  const beallit = (kulcs: string, ertek: Ertek) => setV((elozo) => ({ ...elozo, [kulcs]: ertek }));

  // Szöveges lépésnél a mező kapja a fókuszt
  useEffect(() => {
    if (indul && !sent) fokusz.current?.focus({ preventScroll: true });
  }, [indul, lepes, sent]);

  useEffect(() => { elkuldve.current = sent; }, [sent]);

  // Kilépési szándék: asztalin az egér kimegy az ablak tetején, mobilon gyors visszagörgetés.
  // Munkamenetenként egyszer jelenik meg, beküldés után soha.
  useEffect(() => {
    let mutatva = false;
    try { mutatva = sessionStorage.getItem('nezorKilepes') === '1'; } catch { /* nem elérhető */ }
    const mutat = () => {
      if (mutatva || elkuldve.current) return;
      mutatva = true;
      try { sessionStorage.setItem('nezorKilepes', '1'); } catch { /* nem elérhető */ }
      setKilepes(true);
    };
    const onMouseOut = (e: MouseEvent) => { if (!e.relatedTarget && e.clientY <= 0) mutat(); };
    let utolsoY = window.scrollY;
    let utolsoT = performance.now();
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const sebesseg = (utolsoY - y) / Math.max(t - utolsoT, 1); // px/ms, felfelé pozitív
      if (y > 300 && sebesseg > 2.5) mutat();
      utolsoY = y;
      utolsoT = t;
    };
    const indulasKesleltetes = setTimeout(() => {
      document.addEventListener('mouseout', onMouseOut);
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 5000);
    return () => {
      clearTimeout(indulasKesleltetes);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!kilepes) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setKilepes(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [kilepes]);

  /** Lehet-e továbblépni az aktuális lépésből */
  const ervenyes = (() => {
    if (!aktualis) return false;
    const e = v[aktualis.kulcs];
    switch (aktualis.tipus) {
      case 'szoveg':
      case 'hosszu':
        return typeof e === 'string' && e.trim().length > 0;
      case 'tobb':
        return Array.isArray(e) && e.length > 0;
      default:
        return typeof e === 'string';
    }
  })();

  const szovegTovabb = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!aktualis || !ervenyes) return;
    if (aktualis.tipus === 'szoveg' && aktualis.ellenoriz) {
      const hiba = aktualis.ellenoriz(String(v[aktualis.kulcs]).trim());
      if (hiba) { setError(hiba); return; }
    }
    tovabb();
  };

  const mobil = mobilSzamjegyek(telefon);
  const vegeErvenyes = nev !== '' && vezeteknev.trim() !== '' && MOBIL_RE.test(mobil) && cegnev.trim() !== '' && hozzajarulas;

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!nev) { setError('Add meg a keresztneved!'); return; }
    if (!vezeteknev.trim()) { setError('Add meg a vezetékneved!'); return; }
    if (!MOBIL_RE.test(mobil)) { setError('Érvénytelen mobilszám. Pl. 30 123 4567'); return; }
    if (!cegnev.trim()) { setError('Add meg a cégneved!'); return; }
    if (!hozzajarulas) { setError('A küldéshez fogadd el az adatkezelési tájékoztatót!'); return; }
    setLoading(true);
    setError('');
    try {
      // Meta Lead esemény (Pixel + CAPI) csak süti-hozzájárulás esetén
      const eventId = sutiElfogadva() ? ujEventId() : undefined;
      const valaszok: Record<string, string> = { 'Cégnév:': cegnev.trim() };
      for (const l of lepesek) {
        if (l.kulcs === 'keresztnev') continue;
        const e = v[l.kulcs] ?? '';
        valaszok[`${l.cimke}:`] = Array.isArray(e) ? e.join(', ') : e;
      }
      const res = await fetch('/api/epitoipar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valaszok,
          nev: `${vezeteknev.trim()} ${nev}`,
          telefon: `+36 ${mobil}`,
          hozzajarulas, eventId, website,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        if (eventId) trackEvent('Lead', {}, eventId);
        setSent(true);
        window.scrollTo({ top: 0 });
      } else setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } catch {
      setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } finally {
      setLoading(false);
    }
  };

  const tovabbGomb = (aktiv: boolean) => (
    <button type="submit" className={`${styles.tovabb} ${aktiv ? styles.tovabbAktiv : ''}`} disabled={!aktiv}>
      Tovább <span aria-hidden="true">→</span>
    </button>
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {!indul ? (
          /* NYITÓKÉPERNYŐ — a form csak a gomb után jelenik meg */
          <div className={styles.intro}>
            <p className={styles.introLogo}>NEZOR</p>
            <p className={styles.introCimke}>Építőipari vállalkozóknak</p>
            <h1 className={styles.introH1}>
              <span className={styles.introSor}>
                <span className={styles.raketa} aria-hidden="true">
                  <Image src="/raketa.png" alt="" width={256} height={256} sizes="90px" priority />
                </span>
                <span className={styles.introPiros}>Felturbózzuk</span>
              </span>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>az értékesítésedet —</span>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>úgy, hogy közben</span>
              <span className={styles.introSor}><span className={styles.alahuzas}><span className={styles.introPiros}>zéró</span> feladatod</span> van.</span>
            </h1>
            <p className={styles.introLead}>
              Egy gyönyörű családi ház árát már elhirdettük, hogy <strong>neked ne kelljen 3000+ órát rászánnod
              olyan dologra, ami roha*tul nem érdekel</strong> :)
            </p>
            {/* MÉM — „he tryna ignore it” (2026), magyar felirattal */}
            <figure className={styles.mem}>
              <figcaption className={styles.memSzitu}>
                Az építőipari vállalkozó, amikor 3 hónapja nem csörög a telefon, de „majd jön ajánlás”:
              </figcaption>
              <div className={styles.memKep}>
                <Image src="/mem-ignore.png" alt="Mém: egy kutya nyugodtan ül csukott szemmel, miközben mellette lángol a tűz" fill sizes="(max-width: 700px) 92vw, 440px" />
                <p className={styles.memFelirat}>próbálja ignorálni 😭😭😭</p>
              </div>
            </figure>
            <p className={styles.introAjanlat}>
              🎁 <strong>Ingyenes konzultáció</strong>, ahol bemutatjuk, hogyan kell <strong>2026-ban ügyfelet szerezni</strong> és
              felkészülni <strong>2027-re</strong>.
            </p>
            <button type="button" className={styles.introCta} onClick={indit}>
              Rányomok erre a nagy gombra! <span aria-hidden="true">→</span>
            </button>
            <p className={styles.introBizalom}>
              <span className={styles.csillagok} aria-hidden="true">★★★★★</span>
              50+ magyar vállalkozás bízik bennünk
            </p>
            <p className={styles.introEset}>
              <strong>Komár és Fia Kft.</strong> (építőipar): <strong>73 érdeklődő</strong>, érdeklődőnként <strong>935 Ft</strong>-ból
            </p>
            {/* ALAPÍTÓK — egymásra mutatnak, középen a nevek */}
            <div className={styles.alapitok}>
              <div className={styles.alapitoKep}>
                <Image src="/alapito-bal.webp" alt="A NEZOR egyik alapítója öltönyben, jobbra mutat" width={702} height={1000} sizes="(max-width: 700px) 34vw, 240px" />
              </div>
              <div className={styles.alapitokKozep}>
                <p className={styles.alapitokNev}>Müller Dániel &amp; Jelencsity Miklós</p>
                <p className={styles.alapitokSzerep}>Alapítók · NEZOR</p>
                <p className={styles.alapitokHivas}>Mi hívunk vissza személyesen</p>
              </div>
              <div className={styles.alapitoKep}>
                <Image src="/alapito-jobb.webp" alt="A NEZOR másik alapítója öltönyben, balra mutat" width={677} height={1000} sizes="(max-width: 700px) 34vw, 240px" />
              </div>
            </div>
          </div>
        ) : sent ? (
          <div className={styles.lepes}>
            <div className={styles.kesz} aria-hidden="true">✓</div>
            <h2 className={styles.kerdes}>Megkaptuk, {nev}!</h2>
            <p className={styles.al}>
              Hamarosan felvesszük veled a kapcsolatot a megadott telefonszámon. Kérdés esetén:{' '}
              <a href="mailto:info@nezor.hu">info@nezor.hu</a>
            </p>
          </div>
        ) : (
          <div className={styles.lepes}>
            {/* HALADÁSJELZŐ */}
            <div className={styles.pottyok} role="progressbar" aria-valuemin={1} aria-valuemax={VEGE + 1} aria-valuenow={lepes + 1}>
              {Array.from({ length: VEGE + 1 }, (_, i) => (
                <span key={i} className={`${styles.potty} ${i <= lepes ? styles.pottyKesz : ''}`} />
              ))}
            </div>

            {aktualis ? (
              <form onSubmit={szovegTovabb} key={aktualis.kulcs}>
                {aktualis.felett && <p className={styles.felett}>{sz(aktualis.felett)}</p>}
                <h2 className={styles.kerdes}>{sz(aktualis.cim)}</h2>
                {aktualis.al && <p className={styles.al}>{sz(aktualis.al)}</p>}

                {aktualis.tipus === 'szoveg' && (
                  <>
                    <input
                      ref={fokusz}
                      className={styles.mezo}
                      type={aktualis.inputMode === 'email' ? 'email' : 'text'}
                      inputMode={aktualis.inputMode}
                      autoComplete={aktualis.kulcs === 'keresztnev' ? 'given-name' : 'off'}
                      placeholder={aktualis.placeholder}
                      value={String(v[aktualis.kulcs] ?? '')}
                      onChange={(e) => beallit(aktualis.kulcs, e.target.value)}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    {tovabbGomb(ervenyes)}
                  </>
                )}

                {aktualis.tipus === 'hosszu' && (
                  <>
                    <textarea
                      ref={fokusz}
                      className={`${styles.mezo} ${styles.mezoHosszu}`}
                      placeholder={aktualis.placeholder}
                      value={String(v[aktualis.kulcs] ?? '')}
                      onChange={(e) => beallit(aktualis.kulcs, e.target.value)}
                    />
                    {tovabbGomb(ervenyes)}
                  </>
                )}

                {aktualis.tipus === 'egy' && (
                  <div className={styles.radiok}>
                    {aktualis.opciok.map((o) => (
                      <button
                        key={o}
                        type="button"
                        className={`${styles.radio} ${v[aktualis.kulcs] === o ? styles.radioAktiv : ''}`}
                        onClick={() => { beallit(aktualis.kulcs, o); tovabb(); }}
                      >
                        <span className={styles.radioKor} aria-hidden="true" />
                        {o}
                      </button>
                    ))}
                  </div>
                )}

                {aktualis.tipus === 'tobb' && (
                  <>
                    <div className={styles.ikonok}>
                      {aktualis.opciok.map((o) => {
                        const lista = (v[aktualis.kulcs] as string[] | undefined) ?? [];
                        const be = lista.includes(o.cimke);
                        return (
                          <button
                            key={o.cimke}
                            type="button"
                            aria-pressed={be}
                            className={`${styles.ikonGomb} ${be ? styles.ikonGombAktiv : ''}`}
                            onClick={() => {
                              // „Semmi” kizárja a többit
                              const uj = o.cimke === 'Semmi'
                                ? (be ? [] : ['Semmi'])
                                : be ? lista.filter((x) => x !== o.cimke) : [...lista.filter((x) => x !== 'Semmi'), o.cimke];
                              beallit(aktualis.kulcs, uj);
                            }}
                          >
                            <span className={styles.ikonKor} style={{ color: o.szin }} aria-hidden="true">{o.ikon}</span>
                            {o.cimke}
                          </button>
                        );
                      })}
                    </div>
                    {tovabbGomb(ervenyes)}
                  </>
                )}

              </form>
            ) : (
              /* UTOLSÓ LÉPÉS — elérhetőség */
              <form onSubmit={handleSubmit}>
                <h2 className={styles.kerdes}>
                  BUMM! 👊 Úgy tűnik, komolyan tudunk segíteni a vállalkozásodnak a bevált hirdetési rendszereinkkel — csak add meg az adataidat!
                </h2>
                <p className={styles.al}>Töltsd ki az alábbi mezőket, és hamarosan felvesszük veled a kapcsolatot telefonon.</p>
                <input
                  className={styles.honeypot}
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  aria-hidden="true"
                />
                <div className={styles.mezok}>
                  <input className={styles.mezo} type="text" autoComplete="given-name" placeholder="Keresztnév *" value={String(v.keresztnev ?? '')} onChange={(e) => beallit('keresztnev', e.target.value)} />
                  <input className={styles.mezo} type="text" autoComplete="family-name" placeholder="Vezetéknév *" value={vezeteknev} onChange={(e) => setVezeteknev(e.target.value)} />
                  <div className={styles.telefonSor}>
                    <span className={styles.elohivo}>🇭🇺 +36</span>
                    <input className={styles.mezo} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Mobilszám * (pl. 30 123 4567)" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                  </div>
                  <input className={styles.mezo} type="text" autoComplete="organization" placeholder="Cégnév *" value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                </div>
                <label className={styles.hozzajarulas}>
                  <input type="checkbox" checked={hozzajarulas} onChange={(e) => setHozzajarulas(e.target.checked)} />
                  <span>
                    Elolvastam az <a href="/adatkezeles" target="_blank" rel="noopener">Adatkezelési tájékoztatót</a>, és
                    hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel céljából kezeljétek.
                  </span>
                </label>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={`${styles.tovabb} ${vegeErvenyes ? styles.tovabbAktiv : ''}`} disabled={loading}>
                  {loading ? 'Küldés...' : <>Kérem az ingyenes tervet <span aria-hidden="true">→</span></>}
                </button>
              </form>
            )}

            <button type="button" className={styles.vissza} onClick={vissza}>← Vissza</button>
          </div>
        )}

        {/* KILÉPÉSI POPUP */}
        {kilepes && (
          <div className={styles.kilepesHatter} onClick={() => setKilepes(false)}>
            <div
              className={styles.kilepesDoboz}
              role="dialog"
              aria-modal="true"
              aria-labelledby="kilepes-cim"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className={styles.kilepesBezar} aria-label="Bezárás" onClick={() => setKilepes(false)}>×</button>
              <h2 id="kilepes-cim" className={styles.kilepesCim}>Állj csak meg, mester!</h2>
              <p className={styles.kilepesSzoveg}>
                Na, próbáljuk újra, jó? Nézd, kevesebb mint 2 perc kitölteni ezt az űrlapot… <em>*fókusz*</em>… és utána
                kapsz egy ingyenes, személyre szabott ügyfélszerzési tervet.
              </p>
              <div className={styles.kilepesKep} aria-hidden="true">
                <span className={styles.kilepesKez}>✋</span>
                <span className={styles.kilepesVarj}>Várj!</span>
              </div>
              <button type="button" className={styles.kilepesCta} onClick={indit}>
                Kérem az ingyenes tervet
              </button>
              <p className={styles.kilepesApro}>
                Adatkezelés: a spammereknek külön hely jár a pokolban — mi oda nem akarunk kerülni.
              </p>
            </div>
          </div>
        )}

        <p className={styles.foot}>
          Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
        </p>

        {/* JOGI LÁBLÉC */}
        <footer className={styles.jogi}>
          <p className={styles.jogiLinkek}>
            <a href="/adatkezeles">Adatkezelési tájékoztató</a>
            <button type="button" onClick={() => window.dispatchEvent(new Event('nezor_cookie_open'))}>
              Süti-beállítások
            </button>
          </p>
          <p className={styles.jogiMeta}>
            Ez az oldal nem a Meta Platforms, Inc. része, és a Meta semmilyen formában nem támogatja.
          </p>
        </footer>
      </div>
    </div>
  );
}
