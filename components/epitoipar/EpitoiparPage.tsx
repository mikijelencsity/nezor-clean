'use client';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A beírt telefonszámból a +36 utáni rész (06/36/+36 előtagot levágjuk) */
function mobilSzamjegyek(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('0036')) d = d.slice(4);
  else if (d.startsWith('36')) d = d.slice(2);
  else if (d.startsWith('06')) d = d.slice(2);
  return d;
}

type Ertek = string | string[];

/** „**szöveg**” → pirossal kiemelt rész a kérdésben */
function kiemel(t: string | undefined, osztaly: string) {
  if (!t) return t;
  return t.split('**').map((r, i) => (i % 2 ? <span key={i} className={osztaly}>{r}</span> : r));
}
type Valaszok = Record<string, Ertek>;
type Szoveg = string | ((nev: string, v: Valaszok) => string);

type Lepes = {
  kulcs: string; cimke: string; cim: Szoveg; al?: Szoveg; felett?: Szoveg;
  /** csak akkor jelenik meg, ha igaz (pl. csak a váltóknak) */
  mikor?: (v: Valaszok) => boolean;
} & (
  | { tipus: 'szoveg'; placeholder: string; inputMode?: 'text' | 'email' | 'numeric' | 'url'; ellenoriz?: (v: string) => string | null }
  | { tipus: 'hosszu'; placeholder?: string }
  | { tipus: 'egy'; opciok: string[]; szuro?: (o: string, v: Valaszok) => boolean }
  | { tipus: 'tobb'; opciok: { cimke: string; ikon: string; szin: string }[] }
  | { tipus: 'telefon' }
);

const lepesek: Lepes[] = [
  {
    tipus: 'szoveg', kulcs: 'keresztnev', cimke: 'Keresztnév',
    felett: 'Rendben, nem húzzuk az időd. De mielőtt belevágunk — nem akarunk udvariatlanok lenni…',
    cim: '**Hogy hívnak?**',
    placeholder: 'Keresztneved',
  },
  {
    // a telefonszámot korán kérjük: ha valaki félúton kilép, így is vissza tudjuk hívni
    tipus: 'telefon', kulcs: 'telefon', cimke: 'Telefon',
    cim: (n) => `Szia ${n}! **Hova hívhatunk**, hogy elindítsuk a közös munkát?`,
    al: 'Csak ezért kérjük: telefonon mondjuk el, mit javaslunk. Spam nincs.',
  },
  {
    tipus: 'egy', kulcs: 'fb', cimke: 'Facebook-hirdetés',
    felett: (n) => `Köszi, ${n}! Hogy kiderüljön, tényleg tudunk-e segíteni a vállalkozásodnak… van pár kérdésünk.`,
    cim: 'Először: próbáltál már **fizetett Facebook-hirdetést**?',
    opciok: ['Igen, most is hirdetek', 'Próbáltam, de abbahagytam', 'Még nem próbáltam'],
    mikor: (v) => v.utvonal !== 'kezdo',
    szuro: (o, v) => !(v.utvonal === 'valto' && o === 'Még nem próbáltam'),
  },
  {
    // csak annak, aki már hirdetett: ez a váltók legfontosabb kérdése
    tipus: 'tobb', kulcs: 'gond', cimke: 'Mi volt a gond a hirdetéssel',
    mikor: (v) => v.utvonal === 'valto' || (typeof v.fb === 'string' && v.fb !== 'Még nem próbáltam'),
    felett: (n) => `Értem, ${n}. Akkor nézzük, min kell változtatni.`,
    cim: 'Mi volt vele **a gond** eddig?',
    al: '(Többet is választhatsz)',
    opciok: [
      { cimke: 'Drága volt, nem érte meg', ikon: '💸', szin: '#0064e0' },
      { cimke: 'Nem jött belőle hívás', ikon: '📵', szin: '#555' },
      { cimke: 'Nincs rá időm', ikon: '⏰', szin: '#f39c12' },
      { cimke: 'Az ügynökség nem csinált semmit', ikon: '😴', szin: '#8e44ad' },
      { cimke: 'Nem értek hozzá', ikon: '🤷', szin: '#1565c0' },
      { cimke: 'Egyéb', ikon: '🔔', szin: '#f1c40f' },
    ],
  },
  {
    tipus: 'tobb', kulcs: 'csatornak', cimke: 'Jelenlegi ügyfélszerzés',
    felett: (n, v) => (v.utvonal === 'kezdo' || v.fb === 'Még nem próbáltam'
      ? `Semmi gond, ${n} — a legtöbb ügyfelünk is így kezdte. Mi mindent beállítunk.`
      : ''),
    cim: 'Oké, szuper! Most **honnan jönnek az ügyfeleid**?',
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
    cim: 'Röviden: **mivel foglalkozol**, kiknek, és milyen árszinten?',
    placeholder: 'Pl. tetőfedés és tetőfelújítás családi házakra, átlagosan 2–5 millió Ft-os munkák',
  },
  {
    tipus: 'egy', kulcs: 'keret', cimke: 'Havi hirdetési keret',
    cim: 'Mekkora **havi összeget** szánnál hirdetésre?',
    al: 'Azért kérdezzük, hogy lássuk, tudunk-e segíteni — és hogy a kereteden belül a legjobb megoldást javasoljuk.',
    opciok: ['50 000 Ft alatt', '50–100 ezer Ft', '100–200 ezer Ft', '200–500 ezer Ft', '500 ezer Ft felett', 'Még nem tudom'],
  },
  {
    tipus: 'szoveg', kulcs: 'ugyfelszam', cimke: 'Havi új ügyfél', inputMode: 'numeric',
    cim: 'Hány **új ügyfelet** szeretnél havonta?',
    al: 'Ehhez mérten javasoljuk a hirdetési keretet.',
    placeholder: 'Pl. 5',
  },
];

const MIKROSZOVEG = 'Pár gyors kérdés · kb. 1 perc · utána hívunk és indulunk';

const UTVONAL_CIMKE: Record<string, string> = {
  kezdo: 'Még sosem hirdetett',
  valto: 'Már hirdet — lecserélné / kiszervezné',
};

/** A nyitóképernyő szövegei */
const szoveg = {
  lead: <>Egy gyönyörű családi ház árát már elhirdettük, hogy <strong>neked ne kelljen 7200+ órát rászánnod
    olyan dologra, ami roha*tul nem érdekel</strong> :)</>,
  ajanlat: <><span>Így termel pénzt</span><strong>ez cégednek</strong></>,
  fbCim: 'Te is a Facebookot nyomod, és egy hirdetés szövegét olvasod…',
  fbPiros: 'Működik a téma. Nem atomfizika.',
  csomag: [
    'Egész hónapban közös munka',
    'Éjjel-nappal működő ügyfélszerzés',
    'Kapsz egy ilyen oldalt, mint amin most vagy',
    'Megkapod a leendő ügyfeleid elérhetőségeit',
    'Heti beszámolók és teljes elérhetőség',
  ],
  };

// Referenciák (a /referenciak oldal és a hirdetési eredmények ügyfelei)
const referenciak = [
  // építőipar elöl
  'Komár és Fia Kft.', 'Szeko Ablak Kft.', 'ZT Épületgépészet', 'Estur Épker Kft.', 'Mobilházgyártó',
  'QuickHouse', 'Empire Build', 'Tóth Tamás E.V.', 'XL - Lemeztechnika Kft.', 'Hellinger Kft.',
  'Dover Check', 'Forint - Soft Kft.', 'Hazai Kávé Kft.', 'Cruiser Shop', 'Neked Sütöm', 'CupSeal',
  'KingJet Europe', 'UV4YOU', 'Plasztikkártya',
  'Korona Gombaipari Egyesülés', 'Adótanácsadók Egyesülete', 'G-R Ékszerszalon', 'InShape - Diet', 'Loft Of Beauty',
  'Passa Bőrdíszmű', 'LégvárBirodalom Baja', 'Kisállatkereskedés Baja', 'Samu Kutyakozmetika',
];

// Építőipari referenciák a referencia panelhez (Meta hirdetéskezelő, 2026.10.22-i állapot).
// koltes: eddigi teljes költés, napi: jelenlegi napi keret, aktiv: fut-e most a kampány
// kep: a szegmens legtöbb érdeklődőt hozó hirdetésének képe
const epitoipariReferenciak = [
  {
    szegmens: 'Mobilház-gyártás',
    kep: '/referencia-hirdetesek/mobilhaz.webp', kepW: 900, kepH: 900,
    leiras: 'Mobilházakra kerestünk vevőket Facebookon és Instagramon. Eddig ez hozta a legolcsóbb érdeklődőket.',
    lead: '1 125', arPerLead: '339 Ft', idotartam: '5 hét',
    koltes: '381 046 Ft', napi: '10 000 Ft', aktiv: true,
  },
  {
    szegmens: 'Generálkivitelezés',
    kep: '/referencia-hirdetesek/generalkivitelezes.webp', kepW: 900, kepH: 882,
    leiras: 'Építkezni, felújítani készülő érdeklődőket hoztunk egy generálkivitelezőnek képes, videós hirdetésekkel.',
    lead: '242', arPerLead: '1 355 Ft', idotartam: '5 hét',
    koltes: '327 976 Ft', napi: '10 000 Ft', aktiv: true,
  },
  {
    szegmens: 'Könnyűszerkezetes házak',
    kep: '/referencia-hirdetesek/konnyuszerkezetes.webp', kepW: 900, kepH: 1066,
    leiras: 'Acélvázas, könnyűszerkezetes házakra gyűjtöttünk érdeklődőket. A kampány már az első hetekben beindult.',
    lead: '204', arPerLead: '867 Ft', idotartam: '2,5 hét',
    koltes: '177 009 Ft', napi: '10 000 Ft', aktiv: true,
  },
  {
    szegmens: 'Térkövezés, betonozás, kertépítés',
    kep: '/referencia-hirdetesek/terkovezes.webp', kepW: 900, kepH: 1073,
    leiras: 'Egy helyi kivitelezőnek hozunk ajánlatkéréseket térkövezésre, betonozásra és kertépítésre.',
    lead: '200', arPerLead: '741 Ft', idotartam: '3 hónap',
    koltes: '148 299 Ft', napi: '2 000 Ft', aktiv: true,
  },
  {
    szegmens: 'Laminált parketta',
    kep: '/referencia-hirdetesek/laminalt.webp', kepW: 900, kepH: 1600,
    leiras: 'Laminált parkettára gyűjtöttünk érdeklődőket egy hónapon át.',
    lead: '46', arPerLead: '1 290 Ft', idotartam: '4 hét',
    koltes: '59 339 Ft', napi: '2 200 Ft', aktiv: false,
  },
  {
    szegmens: 'Hőszigetelés',
    kep: '/referencia-hirdetesek/hoszigeteles.webp', kepW: 900, kepH: 900,
    leiras: 'Frissen indult kampány, ezek az első napok számai.',
    lead: '2', arPerLead: '4 206 Ft', idotartam: '8 nap',
    koltes: '8 439 Ft', napi: '1 000 Ft', aktiv: true,
  },
];

export function EpitoiparPage() {
  const [indul, setIndul] = useState(false); // nyitóképernyő → űrlap
  const [lepes, setLepes] = useState(0);
  const [v, setV] = useState<Valaszok>({});
  const [vezeteknev, setVezeteknev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [email, setEmail] = useState('');
  const [hozzajarulas, setHozzajarulas] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [kilepes, setKilepes] = useState(false); // kilépési popup
  const [panel, setPanel] = useState(false); // oldalról kinyíló „mi ez?” panel
  const [refPanel, setRefPanel] = useState(false); // oldalról kinyíló referencia panel
  // ár-animáció: 150 000 Ft → 79 000 Ft, amikor a kártya a képernyőre ér (egyszer fut le)
  const [ar, setAr] = useState(150_000);
  const [arKesz, setArKesz] = useState(false);
  const arRef = useRef<HTMLParagraphElement>(null);
  const arLefutott = useRef(false);
  const elkuldve = useRef(false);
  const reszlegesKuldve = useRef(false);
  const reszlegesAdat = useRef<string | null>(null);
  const fokusz = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const nev = String(v.keresztnev ?? '').trim();
  const sz = (t: Szoveg | undefined) => (typeof t === 'function' ? t(nev, v) : t);
  const aktivLepesek = lepesek.filter((l) => !l.mikor || l.mikor(v));
  const VEGE = aktivLepesek.length; // utolsó lépés: elérhetőség
  const aktualis = aktivLepesek[lepes];

  const indit = () => {
    setKilepes(false);
    setIndul(true);
    window.scrollTo({ top: 0 });
  };


  // állandó „vissza a főoldalra” gomb: a kérdőívből a nyitóképernyőre (a válaszok megmaradnak)
  const fooldalra = () => {
    setError('');
    setIndul(false);
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
    const el = arRef.current;
    if (!el || arLefutott.current) return;
    const csokkentett = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      arLefutott.current = true;
      if (csokkentett) { setAr(79_000); setArKesz(true); return; }
      const start = performance.now();
      const tart = 1400;
      const lep = (t: number) => {
        const x = Math.min((t - start) / tart, 1);
        const lassul = 1 - Math.pow(1 - x, 3);
        setAr(Math.round((150_000 - 71_000 * lassul) / 1000) * 1000);
        if (x < 1) raf = requestAnimationFrame(lep);
        else setArKesz(true);
      };
      raf = requestAnimationFrame(lep);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [indul]);

  useEffect(() => {
    if (!panel && !refPanel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(false); setRefPanel(false); } };
    document.addEventListener('keydown', onKey);
    const regi = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = regi;
    };
  }, [panel, refPanel]);

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
      case 'telefon':
        return MOBIL_RE.test(mobilSzamjegyek(telefon)) && hozzajarulas;
      default:
        return typeof e === 'string';
    }
  })();

  const szovegTovabb = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!aktualis || (!ervenyes && aktualis.tipus !== 'telefon')) return;
    if (aktualis.tipus === 'telefon') {
      if (!MOBIL_RE.test(mobil)) { setError('Érvénytelen mobilszám. Pl. 30 123 4567'); return; }
      if (!hozzajarulas) { setError('A továbblépéshez fogadd el az adatkezelési tájékoztatót!'); return; }
    }
    if (aktualis.tipus === 'szoveg' && aktualis.ellenoriz) {
      const hiba = aktualis.ellenoriz(String(v[aktualis.kulcs]).trim());
      if (hiba) { setError(hiba); return; }
    }
    tovabb();
  };

  const mobil = mobilSzamjegyek(telefon);
  const vegeErvenyes = nev !== '' && vezeteknev.trim() !== '' && MOBIL_RE.test(mobil) && cegnev.trim() !== '' && EMAIL_RE.test(email.trim()) && hozzajarulas;

  const valaszokOsszeallit = () => {
    const valaszok: Record<string, string> = {};
    if (cegnev.trim()) valaszok['Cégnév:'] = cegnev.trim();
    const utvonal = typeof v.utvonal === 'string' ? v.utvonal : '';
    if (UTVONAL_CIMKE[utvonal]) valaszok['Kiinduló helyzet:'] = UTVONAL_CIMKE[utvonal];
    for (const l of aktivLepesek) {
      if (l.kulcs === 'keresztnev' || l.tipus === 'telefon') continue;
      const e = v[l.kulcs] ?? '';
      valaszok[`${l.cimke}:`] = Array.isArray(e) ? e.join(', ') : e;
    }
    return valaszok;
  };

  // Félbehagyott jelentkezés: ha a telefonszám már megvan, de a látogató elhagyja az oldalt,
  // az eddigi válaszokkal emailt kapunk róla (egyszer, beküldés esetén nem).
  useEffect(() => {
    reszlegesAdat.current = indul && !sent && MOBIL_RE.test(mobil) && hozzajarulas && lepes > 1
      ? JSON.stringify({
          reszleges: true,
          valaszok: valaszokOsszeallit(),
          nev: [vezeteknev.trim(), nev].filter(Boolean).join(' '),
          telefon: `+36 ${mobil}`,
          hozzajarulas,
          website,
        })
      : null;
  });

  useEffect(() => {
    const kuld = () => {
      if (reszlegesKuldve.current || elkuldve.current || !reszlegesAdat.current) return;
      reszlegesKuldve.current = true;
      try {
        navigator.sendBeacon('/api/epitoipar-lead', new Blob([reszlegesAdat.current], { type: 'application/json' }));
      } catch { /* nem elérhető */ }
    };
    const onRejtve = () => { if (document.visibilityState === 'hidden') kuld(); };
    document.addEventListener('visibilitychange', onRejtve);
    window.addEventListener('pagehide', kuld);
    return () => {
      document.removeEventListener('visibilitychange', onRejtve);
      window.removeEventListener('pagehide', kuld);
    };
  }, []);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!nev) { setError('Add meg a keresztneved!'); return; }
    if (!vezeteknev.trim()) { setError('Add meg a vezetékneved!'); return; }
    if (!MOBIL_RE.test(mobil)) { setError('Érvénytelen mobilszám. Pl. 30 123 4567'); return; }
    if (!cegnev.trim()) { setError('Add meg a cégneved!'); return; }
    if (!EMAIL_RE.test(email.trim())) { setError('Érvénytelen e-mail-cím. Pl. nev@ceged.hu'); return; }
    if (!hozzajarulas) { setError('A küldéshez fogadd el az adatkezelési tájékoztatót!'); return; }
    setLoading(true);
    setError('');
    try {
      // Meta Lead esemény (Pixel + CAPI) csak süti-hozzájárulás esetén
      const eventId = sutiElfogadva() ? ujEventId() : undefined;
      const valaszok = valaszokOsszeallit();
      const res = await fetch('/api/epitoipar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valaszok,
          nev: `${vezeteknev.trim()} ${nev}`,
          telefon: `+36 ${mobil}`,
          email: email.trim(),
          hozzajarulas, eventId, website,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        if (eventId) trackEvent('Lead', {}, eventId);
        elkuldve.current = true;
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
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>az értékesítésedet,</span>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>úgy, hogy közben</span>
              <span className={styles.introSor}><span className={styles.alahuzas}><span className={styles.introPiros}>zéró</span> feladatod</span> van.</span>
            </h1>
            <div className={styles.tartalom}>
            <p className={styles.introLead}>{szoveg.lead}</p>
            {/* META-LOGÓ (eredeti, Wikimedia Commons) */}
            <div className={styles.metaLogo}>
              <Image src="/meta-logo.svg" alt="Meta" width={288} height={191} />
            </div>
            <div className={styles.metaAppok}>
              <svg viewBox="0 0 24 24" role="img" aria-label="Facebook">
                <path fill="#1877f2" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
              </svg>
              <svg viewBox="0 0 24 24" role="img" aria-label="Instagram">
                <defs>
                  <radialGradient id="igHatter" cx="30%" cy="107%" r="150%">
                    <stop offset="0" stopColor="#fdf497" />
                    <stop offset=".05" stopColor="#fdf497" />
                    <stop offset=".45" stopColor="#fd5949" />
                    <stop offset=".6" stopColor="#d6249f" />
                    <stop offset=".9" stopColor="#285aeb" />
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#igHatter)" />
                <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
                <circle cx="16.2" cy="7.8" r="1.05" fill="#fff" />
              </svg>
            </div>
            <button type="button" className={`${styles.introCta} ${styles.nagyCta}`} onClick={indit}>
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
            <p className={`${styles.mikro} ${styles.mikroFelso}`}>{MIKROSZOVEG}</p>
            <p className={styles.ctaCim}>{szoveg.ajanlat}</p>
            {/* ALAPÍTÓ a gomb mellett — a gombra mutat */}
            <div className={styles.ctaSor}>
              <div className={styles.ctaAlapito}>
                <Image src="/alapito-bal.webp" alt="Müller Dániel, a NEZOR alapítója öltönyben, a gombra mutat" width={702} height={1000} sizes="(max-width: 700px) 36vw, 260px" />
                <p className={styles.ctaNevek}>Müller Dániel</p>
              </div>
              <div className={styles.ctaTartalom}>
                <button type="button" className={styles.introCta} onClick={() => setPanel(true)} aria-haspopup="dialog" aria-expanded={panel}>
                  {/* két tiszta sorban, hogy a „rá!” ne maradjon egyedül */}
                  <span className={styles.ketSor}>
                    <span>Nagy, kék gomb,</span>
                    <span>nyomj rá! <span aria-hidden="true">→</span></span>
                  </span>
                </button>
                <p className={`${styles.mikro} ${styles.mikroBal}`}>Gyorstalpaló: mi ez, miért jó, miért mi.</p>
              </div>
            </div>
            <p className={styles.introBizalom}>
              <span className={styles.csillagok} aria-hidden="true">★★★★★</span>
              50+ magyar vállalkozás bízik bennünk
            </p>
            {/* „NEM ATOMFIZIKA” — teljes szélességű fekete sáv */}
            <section className={styles.fb}>
              <svg className={styles.fbIkon} viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
              </svg>
              <h2 className={styles.fbCim}>{szoveg.fbCim}</h2>
              <p className={styles.fbCimPiros}>{szoveg.fbPiros}</p>
            </section>

            {/* REFERENCIA SOR */}
            <div className={styles.referenciak}>
              <p className={styles.referenciakCim}>Eddigi projektjeink:</p>
              <div className={styles.referenciakRacs}>
                {[referenciak.slice(0, 10), referenciak.slice(10, 19), referenciak.slice(19)].map((sor, i) => (
                  <div key={i} className={styles.referenciakSav}>
                    {/* duplikálva a folyamatos körbeforgáshoz; minden második sor visszafelé megy */}
                    <p className={`${styles.referenciakSor} ${i % 2 ? styles.referenciakSorVissza : ''}`}>
                      {[...sor, ...sor].map((n, j) => (
                        <span key={j} className={styles.referencia} aria-hidden={j >= sor.length}>{n}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ÜGYFÉLVÉLEMÉNY — valós üzenet egy ügyfelünktől, chatként */}
            <figure className={styles.velemeny}>
              <Image className={styles.velemenyKep} src="/ugyfel-uzenet.webp" alt="Ügyfélüzenet: Aztaku**a dekomoly 💪💪💪 Nagyon jók vagytok 💪💪🤩🤩🤩" width={1398} height={672} sizes="(max-width: 560px) 90vw, 480px" />
              <figcaption className={styles.velemenyNev}>Egy ügyfelünk öröme nemes egyszerűséggel megfogalmazva.</figcaption>
            </figure>
            <div className={styles.refBlokk}>
              <p className={styles.refSzoveg}>Vannak szofisztikált referenciáink is.</p>
              <button type="button" className={`${styles.introCta} ${styles.refGomb}`} onClick={() => setRefPanel(true)} aria-haspopup="dialog" aria-expanded={refPanel}>
                Referenciák <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* AJÁNLAT */}
            <div className={styles.csomag}>
              <div className={styles.csomagAlapito}>
                <Image src="/alapito-jobb.webp" alt="Jelencsity Miklós, a NEZOR alapítója öltönyben, az árra mutat" width={677} height={1000} sizes="(max-width: 700px) 38vw, 230px" />
                <p className={styles.csomagAlapitoNev}>Jelencsity Miklós</p>
              </div>
              <div className={styles.csomagFej}>
                <p className={styles.csomagCimke}>Az ajánlatunk</p>
                <p ref={arRef} className={styles.csomagAr} aria-label="79 000 Ft havonta">
                  <span className={`${styles.arSzam} ${arKesz ? styles.arAlahuzva : ''}`} aria-hidden="true">
                    {/* minden számjegy fix szélességű helyen áll, így pörgés közben semmi nem ugrál */}
                    {String(ar).padStart(6, '0').split('').map((j, i) => (
                      <Fragment key={i}>
                        <span className={`${styles.arJegy} ${i === 0 && ar < 100_000 ? styles.arJegyRejtett : ''}`}>{j}</span>
                        {i === 2 && <span className={styles.arKoz} />}
                      </Fragment>
                    ))}
                    <span className={styles.arFt}>Ft</span>
                  </span>{' '}
                  <span className={styles.arHo} aria-hidden="true">/ hó</span>
                </p>
                <p className={styles.csomagAl}>Ennyi a mi díjunk — és ezért mindent mi csinálunk.</p>
              </div>
              <ul className={styles.csomagLista}>
                {szoveg.csomag.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className={styles.csomagMegj}>
                + a hirdetési keret, amit közvetlenül a Metának fizetsz — így minden forint átlátható.
              </p>
              <button type="button" className={styles.introCta} onClick={indit}>
                Ezt kérem! <span aria-hidden="true">→</span>
              </button>
              <p className={styles.mikro}>{MIKROSZOVEG}</p>
            </div>

            {/* GARANCIA — a két alapító a dobozra mutat */}
            <div className={styles.garanciaSor}>
              <div className={styles.garanciaAlapito}>
                <Image src="/alapito-bal.webp" alt="Müller Dániel, a NEZOR alapítója, a garanciára mutat" width={702} height={1000} sizes="(max-width: 700px) 28vw, 200px" />
                <p className={styles.ctaNevek}>Müller Dániel</p>
              </div>
              <div className={styles.garancia}>
                <svg className={styles.garanciaIkon} viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-1.2 15.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z" />
                </svg>
                <p className={styles.garanciaCim}>Ha nem hozunk munkát, <span>a pénzt visszaadjuk.</span></p>
                <p className={styles.garanciaSzoveg}>Ennyire biztosak vagyunk benne, hogy működik.</p>
              </div>
              <div className={styles.garanciaAlapito}>
                <Image src="/alapito-jobb.webp" alt="Jelencsity Miklós, a NEZOR alapítója, a garanciára mutat" width={677} height={1000} sizes="(max-width: 700px) 28vw, 200px" />
                <p className={styles.ctaNevek}>Jelencsity Miklós</p>
              </div>
            </div>
            <p className={styles.garanciaCtaCim}>Így már más?</p>
            <button type="button" className={`${styles.introCta} ${styles.nagyCta}`} onClick={indit}>
              Kezdjünk el dolgozni! <span aria-hidden="true">→</span>
            </button>
            </div>
          </div>
        ) : sent ? (
          <div className={styles.lepes}>
            <div className={styles.kesz} aria-hidden="true">✓</div>
            <h2 className={styles.kerdes}>Megkaptuk, {nev}!</h2>
            <p className={styles.al}>
              Hamarosan hívunk a <b>+36 {mobil}</b> számon, erről a számról: <b>+36 30 203 6721</b>. Vedd fel! 📞
              <br />Kérdés esetén: <a href="mailto:info@nezor.hu">info@nezor.hu</a>
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
                {sz(aktualis.felett) && <p className={styles.felett}>{sz(aktualis.felett)}</p>}
                <h2 className={styles.kerdes}>{kiemel(sz(aktualis.cim), styles.kerdesKiemelt)}</h2>
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

                {aktualis.tipus === 'telefon' && (
                  <>
                    <div className={`${styles.telefonSor} ${styles.telefonSorKozep}`}>
                      <span className={styles.elohivo}>🇭🇺 +36</span>
                      <input
                        ref={fokusz}
                        className={styles.mezo}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="Mobilszám (pl. 30 123 4567)"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                      />
                    </div>
                    <label className={styles.hozzajarulas}>
                      <input type="checkbox" checked={hozzajarulas} onChange={(e) => setHozzajarulas(e.target.checked)} />
                      <span>
                        Elolvastam az <a href="/adatkezeles" target="_blank" rel="noopener">Adatkezelési tájékoztatót</a>, és
                        hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel céljából kezeljétek.
                      </span>
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={`${styles.tovabb} ${ervenyes ? styles.tovabbAktiv : ''}`}>
                      Tovább <span aria-hidden="true">→</span>
                    </button>
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
                    {aktualis.opciok.filter((o) => !aktualis.szuro || aktualis.szuro(o, v)).map((o) => (
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
                <p className={styles.al}>Már csak pár adat, és hívunk a <b>+36 {mobil}</b> számon.</p>
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
                  <input className={styles.mezo} type="email" inputMode="email" autoComplete="email" placeholder="E-mail-cím *" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={`${styles.tovabb} ${vegeErvenyes ? styles.tovabbAktiv : ''}`} disabled={loading}>
                  {loading ? 'Küldés...' : <>Kezdjük el a közös munkát <span aria-hidden="true">→</span></>}
                </button>
              </form>
            )}

            <button type="button" className={styles.vissza} onClick={vissza}>← Vissza</button>
          </div>
        )}

        {indul && (
          <button type="button" className={styles.fooldalGomb} onClick={fooldalra}>
            <span aria-hidden="true">←</span> Vissza a főoldalra
          </button>
        )}

        {/* OLDALRÓL KINYÍLÓ PANEL — mi ez, miért jó, miért velünk */}
        <div className={`${styles.panelHatter} ${panel ? styles.panelHatterNyitva : ''}`} onClick={() => setPanel(false)} aria-hidden="true" />
        <aside
          className={`${styles.panel} ${panel ? styles.panelNyitva : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panel-cim"
          aria-hidden={!panel}
        >
          <button type="button" className={styles.panelBezar} aria-label="Bezárás" onClick={() => setPanel(false)} tabIndex={panel ? 0 : -1}>×</button>
          <p id="panel-cim" className={styles.panelCim}>NEZOR</p>

          <details className={styles.panelBlokk}>
            <summary>🤔 Mi ez?</summary>
            <Image className={styles.panelKep} src="/epitoipari-hero-v2.webp" alt="Építőipari weboldal laptopon és telefonon, mellette egy új ajánlatkérés értesítés" width={1448} height={1086} sizes="(max-width: 480px) 86vw, 400px" />
            <p>
              Tegyük fel, <b>budapesti villanyszerelő vagy</b>, aki 50 km-es körzetben vállal munkát.
            </p>
            <p>
              Mi kialakítunk neked egy ilyen oldalt, mint amin most vagy, és <b>képes, videós hirdetésekkel érdeklődőket
              hozunk rá</b>.
            </p>
            <p>
              Amikor beérkezik egy érdeklődő, automatikusan kapsz róla egy e-mailt, vagy egyből <b>téged hívnak fel</b>.
            </p>
            <p><b>Pofon egyszerű.</b></p>
            <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={panel ? 0 : -1} onClick={() => { setPanel(false); indit(); }}>
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
          </details>

          <details className={styles.panelBlokk}>
            <summary>💪 Miért jó neked?</summary>
            <Image className={styles.panelKep} src="/HIRDETES4.webp" alt="Példa hirdetés: Fűtesz vagy csak a lerakódást melegíted? — ZT Épületgépészet" width={1254} height={1254} sizes="(max-width: 480px) 86vw, 400px" />
            <p>
              Az emberek 90%-a a telefonját nyomja, és alapvetően <b>fel se ismeri a problémáját</b>, amíg az arcába nincs nyomva.
            </p>
            <p>
              Mi felismertetjük velük a problémát, amire <b>Te leszel a megoldás</b>.
            </p>
            <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={panel ? 0 : -1} onClick={() => { setPanel(false); indit(); }}>
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
          </details>

          <details className={styles.panelBlokk}>
            <summary>🤝 Miért velünk?</summary>
            <Image className={styles.panelKep} src="/alapitok.webp" alt="Müller Dániel és Jelencsity Miklós, a NEZOR alapítói" width={440} height={440} sizes="(max-width: 480px) 86vw, 400px" />
            <p>
              16 évesen kezdtük: a családi vállalkozásunkat kellett online eladnunk, különben bezár. <b>Nem volt B terv.</b>
              Működött, a család azóta is ebből él.
            </p>
            <p>Ma már <b>50+ magyar vállalkozásnál</b> csináljuk ugyanezt.</p>
            <p>
              Ketten vagyunk, Dani és Miki. <b>Minket hívsz, mi vesszük fel</b> — nem egy call center, ahol mindig más beszél veled.
            </p>
            <p>
              És mivel abból élünk, hogy nálad működjön: <b>ha neked nem éri meg, nekünk sem.</b>
            </p>
            <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={panel ? 0 : -1} onClick={() => { setPanel(false); indit(); }}>
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
          </details>

          <button type="button" className={`${styles.introCta} ${styles.panelCta}`} tabIndex={panel ? 0 : -1} onClick={() => { setPanel(false); indit(); }}>
            Oké, kezdjük el <span aria-hidden="true">→</span>
          </button>
          <p className={styles.mikro}>{MIKROSZOVEG}</p>
        </aside>

        {/* OLDALRÓL KINYÍLÓ REFERENCIA PANEL — építőipari eredmények a Meta hirdetéskezelőből */}
        <div className={`${styles.panelHatter} ${refPanel ? styles.panelHatterNyitva : ''}`} onClick={() => setRefPanel(false)} aria-hidden="true" />
        <aside
          className={`${styles.panel} ${refPanel ? styles.panelNyitva : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ref-panel-cim"
          aria-hidden={!refPanel}
        >
          <button type="button" className={styles.panelBezar} aria-label="Bezárás" onClick={() => setRefPanel(false)} tabIndex={refPanel ? 0 : -1}>×</button>
          <p id="ref-panel-cim" className={styles.panelCim}>REFERENCIÁK</p>

          {epitoipariReferenciak.map((r, i) => (
            <details key={r.szegmens} className={styles.panelBlokk} open={i === 0}>
              <summary>
                {r.szegmens}
                <span className={`${styles.refAllapot} ${r.aktiv ? styles.refAktiv : ''}`}>{r.aktiv ? 'Aktív' : 'Szünetel'}</span>
              </summary>
              <Image className={styles.refKep} src={r.kep} alt={`${r.szegmens}: kép a munkáról`} width={r.kepW} height={r.kepH} sizes="(max-width: 480px) 86vw, 400px" />
              <p>{r.leiras}</p>
              <div className={styles.refStatok}>
                <p><b>{r.lead}</b><span>érdeklődő</span></p>
                <p><b>{r.arPerLead}</b><span>/ érdeklődő</span></p>
                <p><b>{r.idotartam}</b><span>alatt</span></p>
                <p><b>{r.koltes}</b><span>eddigi költés</span></p>
                <p><b>{r.napi}</b><span>napi költés</span></p>
              </div>
              <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={refPanel ? 0 : -1} onClick={() => { setRefPanel(false); indit(); }}>
                Nekem is ilyet! <span aria-hidden="true">→</span>
              </button>
            </details>
          ))}

          <p className={styles.refForras}>Valós adatok a Meta hirdetéskezelőből, 2026. október.</p>
          <button type="button" className={`${styles.introCta} ${styles.panelCta}`} tabIndex={refPanel ? 0 : -1} onClick={() => { setRefPanel(false); indit(); }}>
            Oké, kezdjük el <span aria-hidden="true">→</span>
          </button>
          <p className={styles.mikro}>{MIKROSZOVEG}</p>
        </aside>

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
                már indulhat is a közös munka, és jöhetnek az új megrendelők.
              </p>
              <div className={styles.kilepesKep} aria-hidden="true">
                <span className={styles.kilepesKez}>✋</span>
                <span className={styles.kilepesVarj}>Várj!</span>
              </div>
              <button type="button" className={styles.kilepesCta} onClick={indit}>
                Kezdjük el!
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
