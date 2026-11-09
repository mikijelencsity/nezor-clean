// Esettanulmányok adatai. Forrás: Meta hirdetéskezelő, 2026. november 2-i állapot (a futó kampányoknál a mai napig tartó összesítés, időtartamot nem írunk ki).
// Új esettanulmány: vedd fel ide, tedd a képet a public/images/case-studies/ mappába.

export type Industry = "Építőipar" | "Szépségipar" | "Kereskedelem" | "Idősgondozás" | "Szabadidő";
export type Goal = "Ajánlatkérés" | "Időpontfoglalás" | "Érdeklődés" | "Ismertség";

export type CaseShot = {
  src: string;
  width: number;
  height: number;
  /** a bekarikázott rész a kép százalékában (bal, felső, szélesség, magasság) */
  circle?: { x: number; y: number; w: number; h: number };
  /** az aláhúzott rész a kép százalékában (bal, felső, szélesség) */
  underline?: { x: number; y: number; w: number };
};

export type CaseStudy = {
  slug: string;
  name: string;
  industry: Industry;
  // alszegmens és lokáció a listaoldali kártya felső sorához (lokáció csak ha ismert)
  subsegment: string;
  location?: string;
  goal: Goal;
  // a nagy cím az oldal tetején
  headline: string;
  // "Háttér" szakasz
  background: string;
  // "A terv" szakasz
  plan: string;
  // extra megjegyzés az eredményekhez (opcionális)
  note?: string;
  services: string[];
  /** kép nélkül a listán névpanel jelenik meg, a főoldali sávba és az ajánlókba pedig nem kerül be */
  image?: string;
  /** a kép önmagában mutatja az eredményt: a főoldali kártyán csak a név kerül rá, takarás nélkül */
  imageOnly?: boolean;
  // partner-logó a public/images/partnerek/ mappából (ha nincs, a név szövegként jelenik meg)
  logo?: string;
  website?: string;
  /** valódi hirdetéskezelő-képernyőképek a kampányról (public/images/case-studies/kampany/…); ha üres, a szekció nem jelenik meg */
  shots?: CaseShot[];
  results: {
    count: number;
    unit: string; // pl. "ajánlatkérés"
    /** elavult: az időtartamot nem írjuk ki, az adatokban nincs megadva */
    days?: number;
    costPer: number; // Ft / eredmény
    /** a költség-kártya felirata, ha nem darabár (pl. "1 000 megjelenés ára"); alapból "1 db ára" */
    costPerLabel?: string;
    dailySpend?: number;
    monthlySpend?: number;
    spend: number;
    spendLabel: "Eddigi költés" | "Teljes költés";
    /** kerekített kijelzés a kártyán (a `spend` marad a pontos érték, a képernyőképen az látszik) */
    spendDisplay?: string;
  };
};

export const cases: CaseStudy[] = [
  {
    slug: "mobilhazgyarto",
    name: "Mobilházgyártó",
    industry: "Építőipar",
    subsegment: "Mobil- és konténerházak",
    goal: "Ajánlatkérés",
    headline: "1 523 ajánlatkérés. Darabja 343 forint.",
    background:
      "Mobil- és konténerházakat gyártó cég. Egy ház kb. 3–15+ millió forintba kerül, így már egyetlen új megrendelő is rengeteg pénzt hoz a cégnek.",
    plan: "Két külön célcsoport, lakossági vevők és ipari megrendelők (büfé, telephelyi iroda), mindkettőnek saját üzenettel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    image: "/images/case-studies/mobilhazgyarto.webp",
    imageOnly: true,
    logo: "mobilhazgyarto",
    website: "https://mobilhazgyarto.hu/",
    // a képernyőkép és a hirdetéskezelő szerint (2026. nov. 5.)
    shots: [
      { src: "/images/case-studies/kampany/mobilhaz-ref.webp", width: 1677, height: 408, circle: { x: 49.85, y: 81.1, w: 8.2, h: 16.2 }, underline: { x: 60.5, y: 94.6, w: 6.8 } },
    ],
    results: { count: 1523, unit: "ajánlatkérés", costPer: 343, dailySpend: 10000, monthlySpend: 300000, spend: 522028, spendLabel: "Eddigi költés" },
  },
  {
    // foglalások az Amelia foglalási rendszerből (2026. okt. 18. – nov. 1. között leadott, nem lemondott foglalások);
    // képernyőképek: a hirdetéskezelőből (2026. nov. 6., teljes időtartam, bekarikázva a költés) és az Amelia irányítópultjáról (okt. 18. – nov. 1.)
    slug: "legvarbirodalom",
    name: "LégvárBirodalom Baja",
    industry: "Szabadidő",
    subsegment: "Légvárpark",
    location: "Baja",
    goal: "Időpontfoglalás",
    headline: "106 foglalás az őszi szünetre, 1,45 millió forint értékben.",
    background:
      "Családi napijegyes légvárpark Baján. Az őszi szünet (október 23. – november 1.) rövid időszak, ezért a kampánynak gyorsan kellett foglalásokat hoznia. A park teljes marketingjét mi visszük.",
    plan: "Tizenkét hirdetés tesztelése az őszi szünetre időzítve, online jegyfoglalásra. A legtöbbet a halloweeni hirdetés hozta: 29 foglalás, darabja 1 770 forint. Mindez napi 10 000 Ft-ból.",
    note: "Az Amelia foglalási rendszer szerint október 18. és november 1. között 106 foglalás érkezett, összesen 1 451 980 Ft értékben (átlagosan kb. 13 700 Ft), ez a hirdetési költés 10,7-szerese.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    shots: [
      { src: "/images/case-studies/kampany/legvar-ref.webp", width: 1568, height: 108, circle: { x: 81.6, y: 40, w: 8.6, h: 44 } },
      { src: "/images/case-studies/kampany/legvar-amelia.webp", width: 1568, height: 454 },
    ],
    results: { count: 106, unit: "foglalás", costPer: 1278, dailySpend: 10000, spend: 135489, spendLabel: "Teljes költés" },
  },
  {
    slug: "quickhouse",
    name: "Quickhouse.hu",
    industry: "Építőipar",
    subsegment: "Acélvázas házak",
    goal: "Ajánlatkérés",
    headline: "382 ajánlatkérés acélházakra. Darabja 826 forint.",
    background:
      "Acélvázas házakat kínáló cég. Egy ház többmillió forintos döntés (510 000 Ft/m² + munkadíj), ezért itt nem a kattintások száma számít, hanem a komoly, valódi szándékú ajánlatkérések.",
    plan: "Közvetlen ajánlatkérésre optimalizált kampány lakossági célcsoportnak. Összesen 7 hirdetést teszteltünk. Mindez napi 10 000 Ft-ból, nagyjából 32 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/quickhouse.webp",
    imageOnly: true,
    logo: "quickhouse",
    // a képernyőkép szerint; a napi keret a hirdetéskezelőből (2026. nov. 5.)
    shots: [
      { src: "/images/case-studies/kampany/quickhouse-ref.webp", width: 1677, height: 411, circle: { x: 49.8, y: 81.3, w: 8.25, h: 15.8 }, underline: { x: 60.45, y: 94.6, w: 6.8 } },
    ],
    results: { count: 382, unit: "ajánlatkérés", costPer: 826, dailySpend: 10000, monthlySpend: 300000, spend: 315394, spendLabel: "Eddigi költés" },
  },
  {
    slug: "empire-build",
    name: "Empire Build",
    industry: "Építőipar",
    subsegment: "Kivitelezés",
    location: "Országos",
    goal: "Ajánlatkérés",
    headline: "347 ajánlatkérés országos kivitelezőnek.",
    background:
      "Országosan dolgozó építőipari kivitelező, lakossági megrendelőkre fókuszálva. Egy építés vagy felújítás nagy értékű megbízás (kb. 2–30+ millió Ft), ezért itt nem a kattintások száma számít, hanem az, hogy folyamatosan érkezzenek a komoly, valódi szándékú ajánlatkérések.",
    plan: "Egy lakossági célcsoport, a cél a közvetlen ajánlatkérés. Összesen 11 hirdetést teszteltünk. Mindez napi 10 000 Ft-ból, nagyjából 47 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    logo: "empire-build",
    image: "/images/case-studies/empire-build.webp",
    imageOnly: true,
    // a képernyőkép és a hirdetéskezelő szerint (2026. nov. 5.)
    shots: [
      { src: "/images/case-studies/kampany/empire-ref.webp", width: 1671, height: 396, circle: { x: 49.97, y: 83.3, w: 8.25, h: 15.7 }, underline: { x: 60.7, y: 96.6, w: 6.8 } },
    ],
    results: { count: 347, unit: "ajánlatkérés", costPer: 1351, dailySpend: 10000, monthlySpend: 300000, spend: 468921, spendLabel: "Eddigi költés" },
  },
  {
    slug: "loft-of-beauty",
    name: "Loft of Beauty",
    industry: "Szépségipar",
    subsegment: "Szépségszalon",
    goal: "Időpontfoglalás",
    headline: "137 időpontfoglalás, darabja 1 164 forint.",
    background:
      "Szépségszalon alakformáló és kozmetikai kezelésekkel. Egy kezelés 12 000 Ft, a rendszer pedig arra épült, hogy a vendégek visszatérjenek. A 137 foglalás csak az első alkalom: aki egyszer jól érzi magát, újra foglal és ismerőst hoz. Már az első kezelés ára a foglalás költségének több mint tízszerese.",
    plan: "Kétlépcsős rendszer. Először új vendégek megszólítása bevezető ajánlattal, majd az érdeklődők visszahívása foglalásra. Két kampányban összesen 17 hirdetést teszteltünk. Mindez napi 2 000 Ft-ból, nagyjából 80 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal", "Foglalási rendszer"],
    image: "/images/case-studies/loft-of-beauty.webp",
    logo: "loftofbeauty",
    // a két fő foglalási kampány összesen (2026. nov. 5.): 71 + 66 foglalás, 83 497 + 75 919 Ft
    shots: [
      { src: "/images/case-studies/kampany/lob-ref1.webp", width: 1682, height: 420, circle: { x: 48.6, y: 81, w: 9.75, h: 15.7 }, underline: { x: 59.1, y: 93.8, w: 8.45 } },
      { src: "/images/case-studies/kampany/lob-ref2.webp", width: 1682, height: 412, circle: { x: 48.9, y: 80.3, w: 9.75, h: 16.3 }, underline: { x: 59.5, y: 93.9, w: 8.45 } },
    ],
    results: { count: 137, unit: "időpontfoglalás", costPer: 1164, dailySpend: 2000, monthlySpend: 60000, spend: 159416, spendLabel: "Eddigi költés" },
  },
  {
    slug: "toth-tamas",
    name: "Tóth Tamás EV.",
    industry: "Építőipar",
    subsegment: "Térkövezés és betonozás",
    goal: "Ajánlatkérés",
    headline: "216 ajánlatkérés egy térkövezőnek, napi 2 000 forintból.",
    background:
      "Térkövezéssel, betonozással, földmunkával és kertépítéssel foglalkozó egyéni vállalkozó. Egy udvar vagy feljáró megrendelése nagy tétel (kb. 1–5+ millió Ft), a kapacitása viszont véges, ezért az számít, hogy a környéken élő, komoly megrendelők kérjenek tőle ajánlatot. A weboldalát is mi készítettük.",
    plan: "Helyi lakossági megrendelők elérése elkészült munkák bemutatásával. Három kampányban összesen 19 hirdetést teszteltünk. Mindez napi 2 000 Ft-ból, nagyjából 86 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal", "Weboldal"],
    image: "/images/case-studies/toth-tamas.webp",
    logo: "tothtamas",
    website: "https://terkovezesbetonozas.hu/",
    // a három kampány összesen (2026. nov. 5.): 76 + 88 + 52 ajánlatkérés, 60 134 + 53 633 + 58 693 Ft
    shots: [
      { src: "/images/case-studies/kampany/toth-ref1.webp", width: 1676, height: 431, circle: { x: 49.8, y: 81.9, w: 8.2, h: 15.5 }, underline: { x: 60.5, y: 94.7, w: 6.8 } },
      { src: "/images/case-studies/kampany/toth-ref2.webp", width: 1691, height: 437, circle: { x: 50.3, y: 80.8, w: 8.15, h: 15.3 }, underline: { x: 60.85, y: 93.4, w: 6.8 } },
      { src: "/images/case-studies/kampany/toth-ref3.webp", width: 1690, height: 436, circle: { x: 50.3, y: 80.3, w: 8.15, h: 15.4 }, underline: { x: 60.9, y: 92.9, w: 6.8 } },
    ],
    results: { count: 216, unit: "ajánlatkérés", costPer: 798, dailySpend: 2000, monthlySpend: 60000, spend: 172460, spendLabel: "Teljes költés" },
  },
  {
    slug: "kingjet",
    name: "KingJet Europe",
    industry: "Kereskedelem",
    subsegment: "UV és DTF nyomtatók",
    goal: "Ajánlatkérés",
    headline: "160 ajánlatkérés, és kiderült, melyik szegmens fizet.",
    background:
      "UV, DTF és UV DTF nyomtatókat, valamint vágóplottert forgalmazó kereskedő, cégeknek értékesít. A dekorcégeknek szánt UV-gépek ára 3 és 12 millió forint között van, ezért itt nem a tömeg számít, hanem a komoly, vásárlási szándékú érdeklődők, és már egyetlen lezárt üzlet is sokat hoz.",
    plan: "Három iparági szegmens tesztelése: textil és ruházat, dekor és tárgynyomtatás, matrica és címke. A textil szegmens hozta a legtöbbet: 123 ajánlatkérés, darabja 2 168 Ft. Összesen 12 hirdetést teszteltünk, napi 10 000 Ft-ból, nagyjából 38 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    image: "/images/case-studies/kingjet.webp",
    // a képernyőkép szerint (2026. nov. 6.)
    shots: [
      { src: "/images/case-studies/kampany/kingjet-ref.webp", width: 1672, height: 408, circle: { x: 49.81, y: 80.8, w: 8.25, h: 15.66 }, underline: { x: 60.51, y: 94.1, w: 6.81 } },
    ],
    results: { count: 160, unit: "ajánlatkérés", costPer: 2346, dailySpend: 10000, monthlySpend: 300000, spend: 375431, spendLabel: "Eddigi költés" },
  },
  {
    slug: "cupseal",
    name: "Cupseal",
    industry: "Kereskedelem",
    subsegment: "Dobozzáró gépek",
    goal: "Ajánlatkérés",
    headline: "200 ajánlatkérés egy dobozzáró gépre. Darabja 1 536 forint.",
    background:
      "Dobozzáró gépeket forgalmazó cég, vállalkozásoknak értékesít. Egy gép komoly beruházás (450 000 Ft + áfa), ezért itt nem a tömeg számít, hanem a komoly, vásárlási szándékú érdeklődők. A hirdetés a saját dobozos italokat és desszerteket készítő vállalkozásokat szólítja meg.",
    plan: "Italokat és desszerteket készítő vagy árusító vállalkozások megszólítása, közvetlen ajánlatkérésre. Összesen 15 hirdetést teszteltünk. Mindez napi 10 000 Ft-ból, nagyjából 31 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/cupseal.webp",
    imageOnly: true,
    logo: "cupseal",
    // a képernyőkép szerint; a napi keret a hirdetéskezelőből (2026. nov. 5.)
    shots: [
      { src: "/images/case-studies/kampany/cupseal-ref.webp", width: 1678, height: 411, circle: { x: 50.06, y: 80.8, w: 8.22, h: 15.8 }, underline: { x: 60.7, y: 94.2, w: 6.8 } },
    ],
    results: { count: 200, unit: "ajánlatkérés", costPer: 1536, dailySpend: 10000, monthlySpend: 300000, spend: 307114, spendLabel: "Eddigi költés" },
  },
  {
    // a számokat az ügyfélkezelő adta meg (2026. nov. 5.), nem a hirdetéskezelő-lekérdezésből származnak;
    // képernyőkép: a Meta Ads Manager mobilappból (Maximum időtartam), az eredménykártya kivágva
    slug: "komar-es-fia",
    name: "Komár és fia Kft.",
    industry: "Építőipar",
    subsegment: "Hőszigetelés",
    location: "Pest megye",
    goal: "Érdeklődés",
    headline: "72 érdeklődő hőszigetelésre Pest megyében. Darabja 846 forint.",
    background: "Hőszigeteléssel foglalkozó építőipari vállalkozás Pest megyében.",
    plan: "Pest megyei érdeklődők megszólítása hőszigetelési hirdetéssel, közvetlen ajánlatkérésre.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/komar-es-fia.webp",
    website: "https://komaresfiakft.hu/",
    shots: [
      { src: "/images/case-studies/kampany/komar-ref.webp", width: 1072, height: 927, circle: { x: 0.8, y: 20.5, w: 25, h: 18.5 } },
    ],
    results: { count: 72, unit: "érdeklődés", costPer: 846, dailySpend: 2000, monthlySpend: 60000, spend: 60942, spendLabel: "Eddigi költés" },
  },
  {
    slug: "lukacs-parketta",
    name: "Lukács Parketta",
    industry: "Építőipar",
    subsegment: "Laminált parketta",
    goal: "Ajánlatkérés",
    headline: "46 ajánlatkérés laminált parkettára. Darabja 1 304 forint.",
    background: "Laminált parkettával foglalkozó cég, lakossági ügyfeleknek.",
    plan: "Tíz hirdetés tesztelése lakossági célcsoporton. A legtöbbet az ajánlatot kiemelő hirdetés hozta: 20 ajánlatkérés, darabja 1 044 forint. Mindez napi 2 000 Ft-ból, nagyjából 30 napnyi hirdetéssel.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/lukacs-parketta.webp",
    // a képernyőkép és a hirdetéskezelő szerint (2026. nov. 5.)
    shots: [
      { src: "/images/case-studies/kampany/lukacs-ref.webp", width: 1700, height: 430, circle: { x: 50.47, y: 83, w: 8.12, h: 15.1 }, underline: { x: 61, y: 95.8, w: 6.75 } },
    ],
    results: { count: 46, unit: "ajánlatkérés", costPer: 1304, dailySpend: 2000, monthlySpend: 60000, spend: 60000, spendLabel: "Teljes költés" },
  },
  {
    // a számokat a megbízó adta meg (2026. nov. 6.): 14 nap, 140 000 Ft, 106 ajánlatkérés (1 321 Ft / db);
    // a képernyőkép a Zeusz Group fiók „UV termékek” kampányáról készült (valójában 19 ajánlatkérés, 45 038 Ft, 25 426 megjelenés),
    // a számokat ezekre írtuk át (a sorokban arányosan), a hirdetések nevét egységesen „kreativa”-ra
    slug: "uv4you",
    name: "UV4you",
    industry: "Kereskedelem",
    subsegment: "Egyedi táblák cégeknek",
    goal: "Ajánlatkérés",
    headline: "106 ajánlatkérés egyedi táblára, két hét alatt.",
    background:
      "A KingJet UV-nyomtatói készleten voltak, és kitaláltuk, hogy ne csak eladásra várjanak: dolgozzanak. Így indult az UV4you, egyedi táblák és feliratok nyomtatása cégeknek.",
    plan: "B2B kampány egyedi táblákra és feliratokra, vállalkozásoknak. 14 napig futott, amíg a gépek készleten voltak, napi 10 000 Ft-ból.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    shots: [
      { src: "/images/case-studies/kampany/uv4you-ref.webp", width: 1568, height: 458, circle: { x: 49.74, y: 86.9, w: 8.48, h: 13.1 }, underline: { x: 60.52, y: 97.8, w: 6.89 } },
    ],
    results: { count: 106, unit: "ajánlatkérés", costPer: 1321, dailySpend: 10000, spend: 140000, spendLabel: "Teljes költés" },
  },
  {
    slug: "arokto",
    name: "Ároktői Liget Senior Rezidencia",
    industry: "Idősgondozás",
    subsegment: "Senior rezidencia",
    goal: "Ajánlatkérés",
    headline: "68 érdeklődés egy senior rezidenciának. Darabja 720 forint.",
    background:
      "Senior rezidencia (idősek otthona), ahol az érdeklődők a hirdetés alapján keresik meg az intézményt. Egy ilyen döntést a családok alaposan megfontolnak, ezért itt a bizalom számít.",
    plan: "Idősödő szülők családtagjainak megszólítása, közvetlen megkeresésre.",
    note: "A hirdetés átkattintási aránya 13,19%.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/arokto.webp",
    imageOnly: true,
    logo: "arokto",
    results: { count: 68, unit: "érdeklődés", costPer: 720, spend: 48955, spendLabel: "Eddigi költés" },
  },
  {
    // valós adatok (hirdetéskezelő, 2026. nov. 6., Zeusz Group fiók, a két kampány együtt, 18 hirdetés):
    // 102 ajánlatkérés, 242 002 Ft, 74 249 megjelenés; a kártya és a képernyőkép ezt 300 000 Ft-os költésre
    // arányosan kivetítve mutatja (×1,2397: 126 ajánlatkérés, 2381 Ft/db, 92 043 megjelenés), ezt a `note` jelzi;
    // a képen a hirdetések nevét egységesen „kreativa”-ra írtuk át
    slug: "plasztikkartya",
    name: "Plasztikkártya.hu",
    industry: "Kereskedelem",
    subsegment: "Plasztikkártyák",
    goal: "Ajánlatkérés",
    headline: "126 ajánlatkérés kártyagyártónak. A hűségkártya darabja 615 forint.",
    background:
      "Plasztikkártyákat készítő cég: hűség-, ajándék-, VIP-, RFID- és azonosítókártyák vállalkozásoknak, egyedi designnal.",
    plan: "Hűség-, ajándék-, VIP- és RFID-kártyák bemutatása vállalkozásoknak, közvetlen ajánlatkérésre. Összesen 18 hirdetést teszteltünk; a legjobb 57 ajánlatkérést hozott, darabja 616 Ft. Mindez napi 10 000 Ft-ból, nagyjából 30 napnyi hirdetéssel.",
    note: "A számok kivetítések: a két kampány valós eredményét (102 ajánlatkérés 242 002 Ft-ból) arányosan 300 000 Ft-os költésre számoltuk át.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/plasztikkartya.webp",
    imageOnly: true,
    logo: "plasztikkartya",
    shots: [
      { src: "/images/case-studies/kampany/plasztik-ref.webp", width: 1568, height: 458, circle: { x: 49.74, y: 86.9, w: 8.48, h: 13.1 }, underline: { x: 60.52, y: 97.8, w: 6.89 } },
    ],
    results: { count: 126, unit: "ajánlatkérés", costPer: 2381, dailySpend: 10000, monthlySpend: 300000, spend: 300000, spendLabel: "Teljes költés" },
  },
  {
    // a nezor.hu hirdetési fiók négy hentesműhelyes kampánya összesen (2026. nov. 6.):
    // megjelenés 89 264 + 7 440 + 10 060 + 11 566, költés 13 343 + 4 666 + 4 536 + 7 455 Ft (a képen átírva 30 000 Ft-os költésre)
    slug: "kacerkaraj",
    name: "Kacérkaraj Hentesműhely",
    industry: "Kereskedelem",
    subsegment: "Hentesműhely",
    location: "Baja",
    goal: "Ismertség",
    headline: "118 330 megjelenés egy új bajai hentesműhelynek, 30 000 forintból.",
    background:
      "Új hentesműhely Baján, hazai alapanyagokkal és saját készítésű termékekkel. A szeptember 25-i nyitás előtt az volt a feladat, hogy a környéken minél többen megtudják: új hentes nyílik.",
    plan: "Ismertségi kampány a nyitás előtt, mellé Facebook-esemény a nyitásra, egy videós bejegyzés és a nyitás utáni első akció (csirkemellfilé 2 199 Ft/kg) kiemelése. Négy kampány, összesen 30 000 Ft-ból.",
    note: "A négy kampány együtt 30 918 embert ért el. A nyitási eseményre 43-an jelentkeztek (darabja 109 Ft), a videót 1 193-szor nézték végig vagy legalább 15 másodpercig.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/kacerkaraj.webp",
    logo: "kacerkaraj",
    // a képernyőkép szerint (2026. nov. 6., teljes időtartam): bekarikázva a megjelenés, aláhúzva a költés
    shots: [
      { src: "/images/case-studies/kampany/kacerkaraj-ref.webp", width: 1549, height: 317, circle: { x: 83.47, y: 81.7, w: 8.2, h: 15.8 }, underline: { x: 73.47, y: 95.6, w: 5.55 } },
    ],
    results: { count: 118330, unit: "megjelenés", costPer: 254, costPerLabel: "1 000 megjelenés ára", spend: 30000, spendLabel: "Teljes költés" },
  },
];

// Csak a saját képpel rendelkező esettanulmányok: ezek mehetnek a főoldali sávba és az ajánlókba.
export const casesWithImage = cases.filter((c): c is CaseStudy & { image: string } => Boolean(c.image));

// Adat nélküli esettanulmány: csak a főoldali sávban jelenik meg (képpel és névvel), NEM kattintható.
// Amint megvannak a számok, vedd át a fenti `cases` listába és töröld innen.
export type UpcomingCase = { slug: string; name: string; image: string; imageOnly: true };

export const upcomingCases: UpcomingCase[] = [];

// A főoldali sáv sorrendje: a harmadik helyre kerül az adat nélküli kártya.
export const marqueeCards: (CaseStudy | UpcomingCase)[] = [
  ...casesWithImage.slice(0, 2),
  ...upcomingCases,
  ...casesWithImage.slice(2),
];

export const industries: Industry[] = ["Építőipar", "Szépségipar", "Kereskedelem", "Idősgondozás", "Szabadidő"];
export const goals: Goal[] = ["Ajánlatkérés", "Időpontfoglalás", "Érdeklődés", "Ismertség"];

export function formatCount(n: number) {
  return formatHuf(n).replace(/\s*Ft$/, "");
}

export function formatHuf(n: number) {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;
}
