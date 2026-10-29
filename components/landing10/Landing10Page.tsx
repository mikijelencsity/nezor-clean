'use client';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ujEventId } from '@/components/analytics/FacebookPixel';
import { KOSZONJUK_KULCS, formazMobil } from './Landing10Koszonjuk';
import styles from './Landing10Page.module.css';

// Magyar mobilszám a +36 előhívó UTÁN: 20/30/31/50/70 + 7 számjegy
const MOBIL_RE = /^(20|30|31|50|70)\d{7}$/;

/** A megérkezéskor elmentett fbclid (ha a látogató hirdetésből jött) */
function fbclidAdat(): { fbclid?: string; fbclidIdo?: number } {
  try {
    const nyers = sessionStorage.getItem('nezorFbclid');
    if (!nyers) return {};
    const { fbclid, ido } = JSON.parse(nyers) as { fbclid: string; ido: number };
    return { fbclid, fbclidIdo: ido };
  } catch {
    return {};
  }
}
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
    cim: '**Hogy hívnak**, és hova írhatunk?',
    placeholder: 'Keresztneved',
  },
  {
    tipus: 'egy', kulcs: 'fb', cimke: 'Facebook-hirdetés',
    felett: (n) => `Szia ${n}! Hogy kiderüljön, tényleg tudunk-e segíteni a vállalkozásodnak… van pár kérdésünk.`,
    cim: 'Először: próbáltál már **fizetett Facebook-hirdetést**?',
    opciok: ['Igen, most is hirdetek', 'Próbáltam, de abbahagytam', 'Még nem próbáltam'],
    mikor: (v) => v.utvonal !== 'kezdo',
    szuro: (o, v) => !(v.utvonal === 'valto' && o === 'Még nem próbáltam'),
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
    placeholder: 'Pl. szépségszalon Budapesten, átlagosan 25 000 Ft-os kezelésekkel',
  },
  {
    tipus: 'egy', kulcs: 'keret', cimke: 'Havi hirdetési keret',
    cim: 'Mekkora **havi összeget** szánnál hirdetésre?',
    al: 'Azért kérdezzük, hogy lássuk, tudunk-e segíteni — és hogy a kereteden belül a legjobb megoldást javasoljuk.',
    opciok: ['50 000 Ft alatt', '50–100 ezer Ft', '100–200 ezer Ft', '200–500 ezer Ft', '500 ezer Ft felett', 'Még nem tudom'],
  },
  {
    // utolsó előtti lépés: a telefonszám (utána már csak az elérhetőségi adatok jönnek)
    tipus: 'telefon', kulcs: 'telefon', cimke: 'Telefon',
    cim: (n) => `Köszi, ${n}! **Hova hívhatunk**, hogy elindítsuk a közös munkát?`,
    al: 'Csak ezért kérjük: telefonon mondjuk el, mit javaslunk. Spam nincs.',
  },
];

const MIKROSZOVEG = 'Miért éri meg ez mindenkinek?';

const UTVONAL_CIMKE: Record<string, string> = {
  kezdo: 'Még sosem hirdetett',
  valto: 'Már hirdet — lecserélné / kiszervezné',
};

/** A nyitóképernyő szövegei */
const szoveg = {
  lead: <>Egy gyönyörű családi ház árát már elhirdettük, hogy <strong>neked ne kelljen 12 000+ órát rászánnod
    olyan dologra, ami roha*tul nem érdekel</strong> :)</>,
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

// Gyakori kérdések (a válaszok a NEZOR tényleges feltételei)
const gyik: { kerdes: string; valasz: React.ReactNode }[] = [
  {
    kerdes: 'Van hűségidő?',
    valasz: <>Nincs. <b>Havonta felmondható</b>: ha nem vagy elégedett, a hónap végén leállítjuk.</>,
  },
  {
    kerdes: 'Mennyi a minimális hirdetési keret?',
    valasz: <>Havi <b>60 000 Ft</b> (napi kb. 2 000 Ft), amit közvetlenül a Metának fizetsz. Ennél többet is lehet, a céljaid alapján közösen döntjük el.</>,
  },
  {
    kerdes: 'Kell már weboldal?',
    valasz: <>Nem. <b>Elkészítjük neked az oldalt</b> (olyat, mint ez), ez benne van a havi díjunkban.</>,
  },
  {
    kerdes: 'Mennyi idő, mire jön az első ajánlatkérés?',
    valasz: <>Általában <b>pár napon belül</b> a hirdetés indulása után.</>,
  },
  {
    kerdes: 'Honnan jönnek az érdeklődők?',
    valasz: <>Onnan, <b>ahonnan te szeretnéd</b>: egy városból, egy vagy több megyéből, egész Magyarországról, vagy akár külföldről, például Németországból. A hirdetést csak ott mutatjuk, ahol vállalsz munkát.</>,
  },
];

// Építőipari referenciák a referencia panelhez (Meta hirdetéskezelő, 2026.10.22-i állapot).
// koltes: eddigi teljes költés, napi: jelenlegi napi keret, aktiv: fut-e most a kampány
// lezaras, munkaErtek: becsült értékek (nem a Metából)
const epitoipariReferenciak = [
  {
    szegmens: 'Mobilház-gyártás',
    leiras: 'Mobilházakra kerestünk vevőket Facebookon és Instagramon. Eddig ez hozta a legolcsóbb ajánlatkéréseket.',
    lead: '1 125', arPerLead: '339 Ft', idotartam: '5 hét',
    koltes: '381 046 Ft', napi: '10 000 Ft', aktiv: true,
    lezaras: '10%', munkaErtek: '6,2 M Ft',
  },
  {
    szegmens: 'Generálkivitelezés',
    leiras: 'Építkezni, felújítani készülőktől hoztunk ajánlatkéréseket egy generálkivitelezőnek.',
    lead: '262', arPerLead: '1 328 Ft', idotartam: '5 hét',
    koltes: '347 911 Ft', napi: '10 000 Ft', aktiv: true,
    lezaras: '12%', munkaErtek: '4 M Ft',
  },
  {
    szegmens: 'Könnyűszerkezetes házak',
    leiras: 'Acélvázas, könnyűszerkezetes házakra gyűjtöttünk ajánlatkéréseket. A kampány már az első hetekben beindult.',
    lead: '204', arPerLead: '867 Ft', idotartam: '2,5 hét',
    koltes: '177 009 Ft', napi: '10 000 Ft', aktiv: true,
    lezaras: '7,5%', munkaErtek: '70 M+ Ft',
  },
  {
    szegmens: 'Térkövezés, betonozás, kertépítés',
    leiras: 'Egy helyi kivitelezőnek hozunk ajánlatkéréseket térkövezésre, betonozásra és kertépítésre.',
    lead: '200', arPerLead: '741 Ft', idotartam: '3 hónap',
    koltes: '148 299 Ft', napi: '2 000 Ft', aktiv: true,
    lezaras: '16%', munkaErtek: '1,2 M Ft',
  },
  {
    szegmens: 'Laminált parketta',
    leiras: 'Laminált parkettára gyűjtöttünk ajánlatkéréseket egy hónapon át.',
    lead: '46', arPerLead: '1 290 Ft', idotartam: '4 hét',
    koltes: '59 339 Ft', napi: '2 000 Ft', aktiv: false,
    lezaras: '12%', munkaErtek: '200 E Ft',
  },
  {
    szegmens: 'Hőszigetelés',
    leiras: 'Rezsicsökkentésre építő hirdetésekkel hoztunk ajánlatkéréseket hőszigetelésre.',
    lead: '72', arPerLead: '846 Ft', idotartam: '',
    koltes: '60 942 Ft', napi: '2 000 Ft', aktiv: false,
    lezaras: '15%', munkaErtek: '3 M Ft',
  },
];

/** /landing10 — a /landing100 önálló másolata, a „Bízd ránk vagy pénzeld tovább Zuckerberget” kreatívokhoz */
export function Landing10Page() {
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
  const [panel, setPanel] = useState(false); // oldalról kinyíló „mi ez?” panel
  const [refPanel, setRefPanel] = useState(false); // oldalról kinyíló referencia panel
  const [adatPanel, setAdatPanel] = useState(false); // oldalról kinyíló, erre a landingre szabott adatkezelési tájékoztató
  const router = useRouter();
  const pathname = usePathname();
  // ár-animáció: 150 000 Ft → 79 000 Ft, amikor a kártya a képernyőre ér (egyszer fut le)
  const [ar, setAr] = useState(150_000);
  const [arKesz, setArKesz] = useState(false);
  const arRef = useRef<HTMLParagraphElement>(null);
  const magyarazoRef = useRef<HTMLDivElement>(null); // a „Nagy, kék gomb” magyarázó rész
  const arLefutott = useRef(false);
  const elkuldve = useRef(false);
  const reszlegesKuldve = useRef<string | null>(null);
  const emlekeztetoId = useRef<string | null>(null); // az időzített emlékeztető levél azonosítója
  const reszlegesAdat = useRef<string | null>(null);
  const fokusz = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const nev = String(v.keresztnev ?? '').trim();
  const sz = (t: Szoveg | undefined) => (typeof t === 'function' ? t(nev, v) : t);
  const aktivLepesek = lepesek.filter((l) => !l.mikor || l.mikor(v));
  const VEGE = aktivLepesek.length; // utolsó lépés: elérhetőség
  const aktualis = aktivLepesek[lepes];

  const indit = () => {
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

  // Hirdetésre kattintás azonosítója (fbclid): az első megérkezéskor elmentjük (a munkamenet végéig),
  // és a végleges küldéskor a szerver átadja a Metának — süti-elfogadás nélkül is működik az attribúció
  useEffect(() => {
    try {
      const fbclid = new URLSearchParams(window.location.search).get('fbclid');
      if (fbclid && !sessionStorage.getItem('nezorFbclid')) {
        sessionStorage.setItem('nezorFbclid', JSON.stringify({ fbclid, ido: Date.now() }));
      }
    } catch { /* nem elérhető */ }
  }, []);

  // Megnyitáskor mindig a hero tetejéről induljon az oldal: a böngésző (pl. a Facebook beépített
  // böngészője) ne állítsa vissza a korábbi görgetést, és horgony se ugorjon lejjebb
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    const fel = () => window.scrollTo(0, 0);
    fel();
    const onPageshow = (e: PageTransitionEvent) => { if (e.persisted) fel(); };
    window.addEventListener('load', fel, { once: true });
    window.addEventListener('pageshow', onPageshow);
    return () => {
      window.removeEventListener('load', fel);
      window.removeEventListener('pageshow', onPageshow);
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

  // a süti-sáv „Adatkezelési tájékoztató” linkje is ezt a panelt nyitja (nem visz el az oldalról)
  useEffect(() => {
    const nyit = (e: Event) => { e.preventDefault(); setAdatPanel(true); };
    window.addEventListener('nezor_adatkezeles_open', nyit);
    return () => window.removeEventListener('nezor_adatkezeles_open', nyit);
  }, []);

  useEffect(() => {
    if (!panel && !refPanel && !adatPanel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPanel(false); setRefPanel(false); setAdatPanel(false); } };
    document.addEventListener('keydown', onKey);
    const regi = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = regi;
    };
  }, [panel, refPanel, adatPanel]);

  /** Lehet-e továbblépni az aktuális lépésből */
  const ervenyes = (() => {
    if (!aktualis) return false;
    const e = v[aktualis.kulcs];
    switch (aktualis.tipus) {
      case 'szoveg':
        // az első lépésben a név mellett az e-mail-címet is kérjük
        return typeof e === 'string' && e.trim().length > 0
          && (aktualis.kulcs !== 'keresztnev' || (EMAIL_RE.test(email.trim()) && hozzajarulas));
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
    if (aktualis.kulcs === 'keresztnev' && !EMAIL_RE.test(email.trim())) {
      setError('Érvénytelen e-mail-cím. Pl. nev@ceged.hu'); return;
    }
    if (aktualis.kulcs === 'keresztnev' && !hozzajarulas) {
      setError('A továbblépéshez fogadd el az adatkezelési tájékoztatót!'); return;
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

  // Félbehagyott jelentkezés (csak hozzájárulással): ha a látogató elhagyja az oldalt,
  // - telefonszám esetén az eddigi válaszokkal értesítő e-mailt kapunk, hogy visszahívhassuk;
  // - e-mail-cím esetén a szerver 1 órára időzít neki egy emlékeztető levelet.
  // Ha később mégis befejezi, a végleges küldés lemondja az időzített emlékeztetőt.
  useEffect(() => {
    const vanTelefon = MOBIL_RE.test(mobil);
    const vanEmail = EMAIL_RE.test(email.trim());
    reszlegesAdat.current = indul && !sent && hozzajarulas && nev !== '' && (vanTelefon || vanEmail)
      ? JSON.stringify({
          reszleges: true,
          valaszok: valaszokOsszeallit(),
          nev: [vezeteknev.trim(), nev].filter(Boolean).join(' '),
          keresztnev: nev,
          telefon: vanTelefon ? `+36 ${mobil}` : undefined,
          email: vanEmail ? email.trim() : undefined,
          oldal: window.location.pathname,
          hozzajarulas,
          website,
        })
      : null;
  });

  useEffect(() => {
    const kuld = () => {
      // ugyanazt az adatot nem küldjük kétszer; új adat (pl. közben megadott telefonszám) esetén igen
      if (elkuldve.current || !reszlegesAdat.current || reszlegesKuldve.current === reszlegesAdat.current) return;
      reszlegesKuldve.current = reszlegesAdat.current;
      // a már időzített emlékeztető azonosítóját is visszaküldjük, hogy a szerver ne időzítsen újat
      const torzs = JSON.stringify({ ...JSON.parse(reszlegesAdat.current), emlekeztetoId: emlekeztetoId.current ?? undefined });
      // keepalive: az oldal bezárása után is elmegy; ha az oldal nyitva marad (pl. fülváltás),
      // megkapjuk az időzített emlékeztető azonosítóját, hogy befejezéskor lemondhassuk
      fetch('/api/epitoipar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: torzs,
        keepalive: true,
      })
        .then((r) => r.json())
        .then((d: { emlekeztetoId?: string }) => { if (d.emlekeztetoId) emlekeztetoId.current = d.emlekeztetoId; })
        .catch(() => { /* az oldal közben bezárult */ });
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
      // Meta Lead: a szerver (CAPI) minden végleges beküldésnél küldi az űrlapon adott hozzájárulás alapján;
      // a böngészős pixel ugyanezzel az eventId-vel (csak süti-elfogadásnál) fut, így a Meta egynek számolja
      const eventId = ujEventId();
      const valaszok = valaszokOsszeallit();
      const res = await fetch('/api/epitoipar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valaszok,
          nev: `${vezeteknev.trim()} ${nev}`,
          telefon: `+36 ${mobil}`,
          email: email.trim(),
          emlekeztetoId: emlekeztetoId.current ?? undefined,
          oldal: window.location.pathname,
          ...fbclidAdat(),
          hozzajarulas, eventId, website,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        elkuldve.current = true;
        setSent(true);
        // köszönőoldal saját URL-en: ott fut a Meta Lead esemény (és ott mérhető URL-alapú konverzióként is)
        try {
          sessionStorage.setItem(KOSZONJUK_KULCS, JSON.stringify({ nev, mobil, eventId }));
        } catch { /* nem elérhető */ }
        router.push(`${pathname.replace(/\/$/, '')}/koszonjuk`);
      } else setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } catch {
      setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } finally {
      setLoading(false);
    }
  };

  // Kötelező adatkezelési hozzájárulás: a telefonos lépésben és a végleges küldés előtt is látszik (közös állapot)
  const hozzajarulasMezo = (
    <label className={styles.hozzajarulas}>
      <input type="checkbox" checked={hozzajarulas} onChange={(e) => setHozzajarulas(e.target.checked)} />
      <span>
        Elolvastam és elfogadom az{' '}
        <button type="button" className={styles.linkGomb} onClick={(e) => { e.preventDefault(); setAdatPanel(true); }}>
          Adatkezelési tájékoztatót
        </button>, és
        hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel céljából kezeljétek, félbehagyott kitöltés
        esetén legfeljebb 4 e-mailben emlékeztessetek és ajánlatot küldjetek, valamint hirdetéseitek mérése céljából titkosítva a Meta részére
        továbbítsátok. *
      </span>
    </label>
  );

  // a headline alatti első kérdés: érvényes adatokkal a kérdőív 2. lépésével folytatódik
  const elsoLepesErvenyes = nev !== '' && EMAIL_RE.test(email.trim()) && hozzajarulas;
  const elsoLepesKesz = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!nev) { setError('Add meg a keresztneved!'); return; }
    if (!EMAIL_RE.test(email.trim())) { setError('Érvénytelen e-mail-cím. Pl. nev@ceged.hu'); return; }
    if (!hozzajarulas) { setError('A továbblépéshez fogadd el az adatkezelési tájékoztatót!'); return; }
    setError('');
    setLepes(1);
    setIndul(true);
    window.scrollTo({ top: 0 });
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
            <p className={styles.introCimke}>Vállalkozóknak, akik hirdetnek</p>
            {/* a „Bízd ránk vagy pénzeld tovább Zuckerberget” kreatívok folytatása */}
            <h1 className={styles.introH1}>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>Eddig</span>
              <span className={styles.introSor}><span className={styles.introPiros}>Zuckerberg</span></span>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>keresett a hirdetéseiden.</span>
              <span className={`${styles.introSor} ${styles.introSorVekony}`}>Mostantól</span>
              <span className={styles.introSor}><span className={styles.alahuzas}><span className={styles.introPiros}>te</span> fogsz.</span></span>
            </h1>

            {/* ELSŐ KÉRDÉS A HEADLINE ALATT — ugyanaz az állapot, mint a kérdőív első lépése */}
            <form className={styles.heroUrlap} onSubmit={elsoLepesKesz} noValidate>
              <p className={styles.felett}>Rendben, nem húzzuk az időd. De mielőtt belevágunk, nem akarunk udvariatlanok lenni…</p>
              <h2 className={styles.kerdes}><span className={styles.kerdesKiemelt}>Hogy hívnak</span>, és hova írhatunk?</h2>
              <input
                className={styles.mezo}
                type="text"
                autoComplete="given-name"
                placeholder="Keresztneved"
                value={String(v.keresztnev ?? '')}
                onChange={(e) => beallit('keresztnev', e.target.value)}
              />
              <input
                className={`${styles.mezo} ${styles.mezoMasodik}`}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="E-mail-címed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {hozzajarulasMezo}
              {!indul && error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={`${styles.tovabb} ${elsoLepesErvenyes ? styles.tovabbAktiv : ''}`}>
                Tovább <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className={styles.tartalom}>
            <p className={styles.introLead}>{szoveg.lead}</p>
            {/* META-LOGÓ (eredeti, Wikimedia Commons) */}
            <div className={styles.metaLogo}>
              <Image unoptimized loading="eager" src="/meta-logo.svg" alt="Meta" width={288} height={191} />
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
            <button
              type="button"
              className={`${styles.introCta} ${styles.nagyCta}`}
              onClick={() => magyarazoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
            <p className={`${styles.mikro} ${styles.mikroFelso}`}>{MIKROSZOVEG}</p>
            {/* a hero „Igen, érdekel!” gombja ide görget */}
            {/* ALAPÍTÓ a gomb mellett — a gombra mutat */}
            <div ref={magyarazoRef} className={`${styles.ctaSor} ${styles.ctaSorCel}`}>
              <div className={styles.ctaAlapito}>
                <Image unoptimized loading="eager" src="/alapito-bal.webp" alt="Müller Dániel, a NEZOR alapítója öltönyben, a gombra mutat" width={702} height={1000} sizes="(max-width: 700px) 36vw, 260px" />
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
                <p className={styles.gyorstalpalo}>Gyorstalpaló: mi ez, miért jó, miért mi.</p>
              </div>
            </div>
            <p className={styles.introBizalom}>
              <span className={styles.csillagok} aria-hidden="true">★★★★★</span>
              50+ magyar vállalkozás bízik bennünk
            </p>

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
              <Image unoptimized loading="eager" className={styles.velemenyKep} src="/ugyfel-uzenet.webp" alt="Ügyfélüzenet: Aztaku**a dekomoly 💪💪💪 Nagyon jók vagytok 💪💪🤩🤩🤩" width={1398} height={672} sizes="(max-width: 560px) 90vw, 480px" />
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
                <Image unoptimized loading="eager" src="/alapito-jobb.webp" alt="Jelencsity Miklós, a NEZOR alapítója öltönyben, az árra mutat" width={677} height={1000} sizes="(max-width: 700px) 38vw, 230px" />
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
                  </span>
                  <span className={styles.arHo} aria-hidden="true">/hó</span>
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

            {/* GYAKORI KÉRDÉSEK — ugyanaz a lenyíló dizájn, mint a „Mi ez?” panelben */}
            <section className={styles.gyik}>
              <h2 className={styles.gyikCim}>Gyakori kérdések</h2>
              {gyik.map((k) => (
                <details key={k.kerdes} className={styles.panelBlokk}>
                  <summary>{k.kerdes}</summary>
                  <p>{k.valasz}</p>
                </details>
              ))}
            </section>
            </div>
          </div>
        ) : sent ? (
          <div className={styles.lepes}>
            <div className={styles.kesz} aria-hidden="true">✓</div>
            <h2 className={styles.kerdes}>Megkaptuk, {nev}!</h2>
            <p className={styles.al}>
              Hamarosan hívunk a <b>+36 {formazMobil(mobil)}</b> számon, erről a számról: <b>+36 30 203 6721</b>. Vedd fel! 📞
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
                    {aktualis.kulcs === 'keresztnev' && (
                      <input
                        className={`${styles.mezo} ${styles.mezoMasodik}`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="E-mail-címed"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                    {aktualis.kulcs === 'keresztnev' && hozzajarulasMezo}
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
                <p className={styles.al}>Már csak pár adat, és hívunk a <b>+36 {formazMobil(mobil)}</b> számon.</p>
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
                {hozzajarulasMezo}
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={`${styles.tovabb} ${vegeErvenyes ? styles.tovabbAktiv : ''}`} disabled={loading}>
                  {loading ? 'Küldés...' : <>Kezdjük el a közös munkát <span aria-hidden="true">→</span></>}
                </button>
              </form>
            )}

            <button type="button" className={styles.vissza} onClick={vissza}>← Vissza</button>
          </div>
        )}

        {/* ÁLLANDÓ CTA — a nyitóképernyőn végig a képernyő alján */}
        {!indul && (
          <div className={styles.allandoCta}>
            <button type="button" className={`${styles.introCta} ${styles.allandoCtaGomb}`} onClick={indit}>
              Kezdjük meg a munkát! <span aria-hidden="true">→</span>
            </button>
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
            <summary>Mi ez?</summary>
            <p className={styles.panelEmoji} aria-hidden="true">🤔</p>
            <p>
              Tegyük fel, <b>szépségszalonod van Budapesten</b>, és a környékről várod a vendégeket.
            </p>
            <p>
              Mi elkészítjük <b>a saját oldaladat</b> (olyat, mint ez), és <b>Facebook- és Instagram-hirdetésekkel</b>{' '}
              odahozzuk azokat, akiket érdekel, amit kínálsz.
            </p>
            <p>
              Aki ajánlatot kér, annak az adatai <b>bekerülnek a saját Excel-táblázatodba</b>, vagy <b>elküldjük neked
              e-mailben</b>, vagy <b>egyből téged hív fel</b>.
            </p>
            <p><b>Pofon egyszerű.</b></p>
            <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={panel ? 0 : -1} onClick={() => { setPanel(false); indit(); }}>
              Igen, érdekel! <span aria-hidden="true">→</span>
            </button>
          </details>

          <details className={styles.panelBlokk}>
            <summary>Miért jó neked?</summary>
            <p className={styles.panelEmoji} aria-hidden="true">💪</p>
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
            <summary>Miért velünk?</summary>
            <p className={styles.panelEmoji} aria-hidden="true">🤝</p>
            <p><b>5 évvel ezelőtt kezdtük.</b></p>
            <p>
              Azóta <b>50+ céggel dolgoztunk</b> minden szegmensből: az egyéni vállalkozótól a cégcsoportokig.
            </p>
            <p>
              Azoknak is, akik csak egy kis városban akarnak terjeszkedni, és azoknak is, akik egész Közép-Európát
              akarják lefedni.
            </p>
            <p>
              Sok rizikó nincs. <b>Ha nincs érdeklődő arra, amit csinálsz, a díjunkat visszautaljuk.</b>
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

        {/* OLDALRÓL KINYÍLÓ ADATKEZELÉSI TÁJÉKOZTATÓ — erre a landingre szabva, nem visz el az oldalról */}
        <div className={`${styles.panelHatter} ${styles.adatPanelHatter} ${adatPanel ? styles.panelHatterNyitva : ''}`} onClick={() => setAdatPanel(false)} aria-hidden="true" />
        <aside
          className={`${styles.panel} ${styles.adatPanel} ${adatPanel ? styles.panelNyitva : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="adat-panel-cim"
          aria-hidden={!adatPanel}
        >
          <button type="button" className={styles.panelBezar} aria-label="Bezárás" onClick={() => setAdatPanel(false)} tabIndex={adatPanel ? 0 : -1}>×</button>
          <p id="adat-panel-cim" className={styles.panelCim}>Adatkezelés</p>
          <p className={styles.adatAlcim}>Építőipari ajánlatkérés · hatályos: 2026. október 23-tól</p>

          <h3>Ki kezeli az adataidat?</h3>
          <p>
            <b>Müller Dániel E.V.</b> (NEZOR) · adószám: 91037491-1-23 · 6500 Baja, Budai Nagy Antal u. 36. ·{' '}
            <a href="mailto:info@nezor.hu">info@nezor.hu</a>
          </p>

          <h3>Milyen adatokat kérünk ezen az oldalon?</h3>
          <ul>
            <li>A kérdőívre adott válaszaid (pl. hirdettél-e már, mivel foglalkozol, mekkora a havi keret, hány új ügyfelet szeretnél).</li>
            <li>A neved, mobilszámod, e-mail-címed és a cégneved.</li>
            <li>A hozzájárulásod időpontját.</li>
            <li>A látogatás technikai adatait (IP-cím, böngésző), amelyeket a tárhelyszolgáltató automatikusan rögzít.</li>
          </ul>
          <p>
            <b>Félbehagyott kitöltés:</b> ha a jelölőnégyzetet bepipáltad, de nem küldöd el az űrlapot, legfeljebb 4 e-mailt
            küldünk a megadott címre: 1 óra múlva egy emlékeztetőt, 1 nap múlva az ajánlatunkat, 3 nap múlva
            referenciákat, 7 nap múlva egy utolsó ajánlatot. Ha közben befejezed a jelentkezést, vagy a levélben a
            leiratkozásra kattintasz, a hátralévőket töröljük. Ha a telefonszámod is megadtad, az
            addig megadott adataidról mi is e-mailt kapunk, hogy visszahívhassunk.
          </p>

          <h3>Mire használjuk?</h3>
          <ul>
            <li>Hogy telefonon vagy e-mailben felvegyük veled a kapcsolatot, és a válaszaid alapján ajánlatot adjunk.</li>
            <li>Hogy mérjük, mennyire hatékonyak a hirdetéseink.</li>
          </ul>

          <h3>Milyen jogalapon?</h3>
          <p>
            A <b>hozzájárulásod</b> alapján (GDPR 6. cikk (1) a) pont), amelyet a jelölőnégyzet bepipálásával adsz meg.
            Bármikor visszavonhatod egy e-maillel az <a href="mailto:info@nezor.hu">info@nezor.hu</a> címre; ez nem
            érinti a visszavonás előtti adatkezelést.
          </p>

          <h3>Kinek adjuk át?</h3>
          <p>Az adataidat nem adjuk el. Ezeket a szolgáltatókat használjuk:</p>
          <ul>
            <li><b>Resend</b> (USA): az űrlapról érkező értesítő e-mailek kézbesítése.</li>
            <li><b>Vercel</b> (USA): a weboldal tárhelye.</li>
            <li>
              <b>Meta</b> (Írország): az űrlap végleges elküldésekor a neved, telefonszámod és e-mail-címed{' '}
              <b>visszafejthetetlen, titkosított formában</b> (SHA-256), valamint az IP-címed és böngészőadataid a
              hirdetéseink méréséhez (Conversions API). A Meta Pixel sütijei csak akkor működnek, ha a süti-sávban
              elfogadtad őket.
            </li>
            <li><b>Google</b> (Írország): látogatottsági statisztika, sütikkel csak a süti-sávban adott hozzájárulás esetén.</li>
          </ul>
          <p>
            Az USA-ba történő adattovábbítás az EU–USA adatvédelmi keretrendszer, illetve az Európai Bizottság általános
            szerződési feltételei alapján történik.
          </p>

          <h3>Meddig őrizzük?</h3>
          <p>
            Ha nem jön létre közöttünk szerződés, legfeljebb <b>1 évig</b>, vagy amíg nem kéred a törlést. Szerződés
            esetén a számviteli jogszabályokban előírt ideig.
          </p>

          <h3>Milyen jogaid vannak?</h3>
          <p>
            Kérhetsz tájékoztatást az adataidról, kérheted a kijavításukat, a törlésüket és a kezelésük korlátozását,
            tiltakozhatsz, és kérheted, hogy géppel olvasható formában kiadjuk őket. Írj az{' '}
            <a href="mailto:info@nezor.hu">info@nezor.hu</a> címre, <b>30 napon belül</b> válaszolunk.
          </p>

          <h3>Panasz</h3>
          <p>
            Ha úgy érzed, jogsértően kezeljük az adataidat, a Nemzeti Adatvédelmi és Információszabadság Hatósághoz
            (NAIH) fordulhatsz: 1055 Budapest, Falk Miksa utca 9–11. ·{' '}
            <a href="https://naih.hu" target="_blank" rel="noopener">naih.hu</a> ·{' '}
            <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>
          </p>

          <button type="button" className={`${styles.introCta} ${styles.panelCta}`} tabIndex={adatPanel ? 0 : -1} onClick={() => setAdatPanel(false)}>
            Rendben, értem
          </button>
        </aside>

        {/* OLDALRÓL KINYÍLÓ REFERENCIA PANEL — valós eredmények a Meta hirdetéskezelőből */}
        <div className={`${styles.panelHatter} ${refPanel ? styles.panelHatterNyitva : ''}`} onClick={() => setRefPanel(false)} aria-hidden="true" />
        <aside
          className={`${styles.panel} ${styles.refPanel} ${refPanel ? styles.panelNyitva : ''}`}
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
              <p>{r.leiras}</p>
              <div className={styles.refStatok}>
                <p><b>{r.lead}</b><span>ajánlatkérés</span></p>
                <p><b>{r.arPerLead}</b><span>/ ajánlatkérés</span></p>
                <p><b>{r.lezaras}</b><span>munka megvalósulása</span></p>
                <p><b>{r.munkaErtek}</b><span>átlagos munka értéke*</span></p>
                <p><b>{r.koltes}</b><span>eddigi költés</span></p>
                <p><b>{r.napi}</b><span>napi költés</span></p>
                {r.idotartam && <p><b>{r.idotartam}</b><span>alatt</span></p>}
              </div>
              <button type="button" className={`${styles.introCta} ${styles.panelReszCta}`} tabIndex={refPanel ? 0 : -1} onClick={() => { setRefPanel(false); indit(); }}>
                Nekem is ilyet! <span aria-hidden="true">→</span>
              </button>
            </details>
          ))}

          <p className={styles.refForras}>
            Ajánlatkérések és költések: valós adatok a Meta hirdetéskezelőből, 2026. október.
            <br />* A munka megvalósulása és az átlagos munkaérték becslés.
          </p>
          <button type="button" className={`${styles.introCta} ${styles.panelCta}`} tabIndex={refPanel ? 0 : -1} onClick={() => { setRefPanel(false); indit(); }}>
            Oké, kezdjük el <span aria-hidden="true">→</span>
          </button>
          <p className={styles.mikro}>{MIKROSZOVEG}</p>
        </aside>

        <p className={styles.foot}>
          Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
        </p>

        {/* JOGI LÁBLÉC */}
        <footer className={styles.jogi}>
          <p className={styles.jogiLinkek}>
            <button type="button" onClick={() => setAdatPanel(true)}>Adatkezelési tájékoztató</button>
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
