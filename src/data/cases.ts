// Esettanulmányok adatai. Forrás: Meta hirdetéskezelő, 2026. november 2-i állapot (a futó kampányoknál a mai napig tartó összesítés, időtartamot nem írunk ki).
// Új esettanulmány: vedd fel ide, tedd a képet a public/images/case-studies/ mappába.

export type Industry = "Építőipar" | "Szépségipar" | "Kereskedelem" | "Idősgondozás";
export type Goal = "Ajánlatkérés" | "Időpontfoglalás";

export type CaseStudy = {
  slug: string;
  name: string;
  industry: Industry;
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
  image: string;
  /** a kép önmagában mutatja az eredményt: a főoldali kártyán csak a név kerül rá, takarás nélkül */
  imageOnly?: boolean;
  // partner-logó a public/images/partnerek/ mappából (ha nincs, a név szövegként jelenik meg)
  logo?: string;
  website?: string;
  /** valódi hirdetéskezelő-képernyőképek a kampányról (public/images/case-studies/kampany/…); ha üres, a szekció nem jelenik meg */
  shots?: string[];
  results: {
    count: number;
    unit: string; // pl. "ajánlatkérés"
    /** elavult: az időtartamot nem írjuk ki, az adatokban nincs megadva */
    days?: number;
    costPer: number; // Ft / eredmény
    dailySpend?: number;
    monthlySpend?: number;
    spend: number;
    spendLabel: "Eddigi költés" | "Teljes költés";
  };
};

export const cases: CaseStudy[] = [
  {
    slug: "mobilhazgyarto",
    name: "Mobilházgyártó",
    industry: "Építőipar",
    goal: "Ajánlatkérés",
    headline: "1 440 ajánlatkérés. Darabja 343 forint.",
    background:
      "Mobil- és konténerházakat gyártó cég. Egy ház több millió forintba kerül, így már egyetlen új megrendelő is rengeteg pénzt hoz a cégnek.",
    plan: "Két külön célcsoport, lakossági vevők és ipari megrendelők (büfé, telephelyi iroda), mindkettőnek saját üzenettel.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    image: "/images/case-studies/mobilhazgyarto.webp",
    imageOnly: true,
    logo: "mobilhazgyarto",
    website: "https://mobilhazgyarto.hu/",
    results: { count: 1440, unit: "ajánlatkérés", costPer: 343, dailySpend: 10000, monthlySpend: 300000, spend: 493528, spendLabel: "Eddigi költés" },
  },
  {
    slug: "empire-build",
    name: "Empire Build",
    industry: "Építőipar",
    goal: "Ajánlatkérés",
    headline: "323 ajánlatkérés országos kivitelezőnek.",
    background:
      "Országosan dolgozó építőipari kivitelező, lakossági megrendelőkre fókuszálva. Egy építés vagy felújítás nagy értékű megbízás, ezért itt nem a kattintások száma számít, hanem az, hogy folyamatosan érkezzenek a komoly, valódi szándékú ajánlatkérések.",
    plan: "Egy lakossági célcsoport, a cél a közvetlen ajánlatkérés.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    logo: "empire-build",
    image: "/images/case-studies/empire-build.webp",
    imageOnly: true,
    results: { count: 323, unit: "ajánlatkérés", costPer: 1361, dailySpend: 10000, monthlySpend: 300000, spend: 439612, spendLabel: "Eddigi költés" },
  },
  {
    slug: "toth-tamas",
    name: "Tóth Tamás EV.",
    industry: "Építőipar",
    goal: "Ajánlatkérés",
    headline: "76 ajánlatkérés egy térkövezőnek, havi 60 ezerből.",
    background:
      "Térkövezéssel, betonozással, földmunkával és kertépítéssel foglalkozó egyéni vállalkozó. Egy udvar vagy feljáró megrendelése nagy tétel, a kapacitása viszont véges, ezért az számít, hogy a környéken élő, komoly megrendelők kérjenek tőle ajánlatot. A weboldalát is mi készítettük.",
    plan: "Helyi lakossági megrendelők elérése elkészült munkák bemutatásával.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal", "Weboldal"],
    image: "/images/case-studies/toth-tamas.webp",
    logo: "tothtamas",
    website: "https://terkovezesbetonozas.hu/",
    results: { count: 76, unit: "ajánlatkérés", costPer: 791, dailySpend: 2000, monthlySpend: 60000, spend: 60134, spendLabel: "Teljes költés" },
  },
  {
    slug: "loft-of-beauty",
    name: "Loft of Beauty",
    industry: "Szépségipar",
    goal: "Időpontfoglalás",
    headline: "71 időpontfoglalás, darabja 1 176 forint.",
    background:
      "Szépségszalon alakformáló és kozmetikai kezelésekkel. Egy kezelés 12 000 Ft, a rendszer pedig arra épült, hogy a vendégek visszatérjenek. A 71 foglalás csak az első alkalom: aki egyszer jól érzi magát, újra foglal és ismerőst hoz. Már az első kezelés ára a foglalás költségének több mint tízszerese.",
    plan: "Kétlépcsős rendszer. Először új vendégek megszólítása bevezető ajánlattal, majd az érdeklődők visszahívása foglalásra.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal", "Foglalási rendszer"],
    image: "/images/case-studies/loft-of-beauty.webp",
    logo: "loftofbeauty",
    results: { count: 71, unit: "időpontfoglalás", costPer: 1176, dailySpend: 2000, monthlySpend: 60000, spend: 83497, spendLabel: "Teljes költés" },
  },
  {
    slug: "kingjet",
    name: "KingJet Europe",
    industry: "Kereskedelem",
    goal: "Ajánlatkérés",
    headline: "152 ajánlatkérés, és kiderült, melyik szegmens fizet.",
    background:
      "UV, DTF és UV DTF nyomtatókat, valamint vágóplottert forgalmazó kereskedő, cégeknek értékesít. Egy nyomtató milliós tétel, ezért itt nem a tömeg számít, hanem a komoly, vásárlási szándékú érdeklődők, és már egyetlen lezárt üzlet is sokat hoz.",
    plan: "Három iparági szegmens tesztelése: textil és ruházat, dekor és tárgynyomtatás, matrica és címke. A textil szegmens hozta a legtöbbet.",
    services: ["Facebook és Instagram hirdetéskezelés", "Landing oldal"],
    image: "/images/case-studies/kingjet.webp",
    results: { count: 152, unit: "ajánlatkérés", costPer: 2240, dailySpend: 10000, monthlySpend: 300000, spend: 340517, spendLabel: "Eddigi költés" },
  },
  {
    slug: "quickhouse",
    name: "Quickhouse.hu",
    industry: "Építőipar",
    goal: "Ajánlatkérés",
    headline: "353 ajánlatkérés acélházakra. Darabja 819 forint.",
    background:
      "Acélvázas házakat kínáló cég. Egy ház többmillió forintos döntés, ezért itt nem a kattintások száma számít, hanem a komoly, valódi szándékú ajánlatkérések.",
    plan: "Közvetlen ajánlatkérésre optimalizált kampány lakossági célcsoportnak.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/quickhouse.webp",
    imageOnly: true,
    logo: "quickhouse",
    results: { count: 353, unit: "ajánlatkérés", costPer: 819, spend: 289268, spendLabel: "Eddigi költés" },
  },
  {
    slug: "cupseal",
    name: "Cupseal",
    industry: "Kereskedelem",
    goal: "Ajánlatkérés",
    headline: "191 ajánlatkérés egy dobozzáró gépre. Darabja 1 460 forint.",
    background:
      "Dobozzáró gépeket forgalmazó cég, vállalkozásoknak értékesít. Egy gép komoly beruházás, ezért itt nem a tömeg számít, hanem a komoly, vásárlási szándékú érdeklődők. A hirdetés a saját dobozos italokat és desszerteket készítő vállalkozásokat szólítja meg.",
    plan: "Italokat és desszerteket készítő vagy árusító vállalkozások megszólítása, közvetlen ajánlatkérésre.",
    services: ["Facebook és Instagram hirdetéskezelés"],
    image: "/images/case-studies/cupseal.webp",
    imageOnly: true,
    logo: "cupseal",
    results: { count: 191, unit: "ajánlatkérés", costPer: 1460, spend: 278948, spendLabel: "Eddigi költés" },
  },
  {
    slug: "arokto",
    name: "Ároktői Liget Senior Rezidencia",
    industry: "Idősgondozás",
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
];

// Adat nélküli esettanulmány: csak a főoldali sávban jelenik meg (képpel és névvel), NEM kattintható.
// Amint megvannak a számok, vedd át a fenti `cases` listába és töröld innen.
export type UpcomingCase = { slug: string; name: string; image: string; imageOnly: true };

export const upcomingCases: UpcomingCase[] = [
  {
    slug: "plasztikkartya",
    name: "Plasztikkártya.hu",
    image: "/images/case-studies/plasztikkartya.webp",
    imageOnly: true,
  },
];

// A főoldali sáv sorrendje: a harmadik helyre kerül az adat nélküli kártya.
export const marqueeCards: (CaseStudy | UpcomingCase)[] = [
  ...cases.slice(0, 2),
  ...upcomingCases,
  ...cases.slice(2),
];

export const industries: Industry[] = ["Építőipar", "Szépségipar", "Kereskedelem", "Idősgondozás"];
export const goals: Goal[] = ["Ajánlatkérés", "Időpontfoglalás"];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function formatHuf(n: number) {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;
}
