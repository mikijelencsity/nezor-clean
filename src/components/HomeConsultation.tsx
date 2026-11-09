"use client";

import dynamic from "next/dynamic";

export const CONSULTATION_ID = "kezdjuk";

// Csak böngészőben renderelődik, mert a kérdéssor a sessionStorage-ból olvassa ki az előre megadott nevet.
// A helyfoglaló miatt nem ugrik meg az oldal, amikor betöltődik.
const Wizard = dynamic(() => import("./ContactWizard").then((m) => m.ContactWizard), {
  ssr: false,
  loading: () => <div className="mx-auto min-h-[38rem] w-full max-w-2xl rounded-3xl bg-white/5" />,
});

const fade = "linear-gradient(to bottom, #000 80%, transparent)";

// a kérdéssor két oldalán az alapítók, egymás (és a kérdéssor) felé mutatnak; csak széles képernyőn
const founders = [
  { name: "Müller Dániel", src: "/images/csapat/ferfi-bal.webp", scale: 1 },
  // a két fotón eltér az arány: így látszanak ugyanakkorának
  { name: "Jelencsity Miklós", src: "/images/csapat/ferfi-jobb.webp", scale: 1.12 },
];

function Founder({ f }: { f: (typeof founders)[number] }) {
  return (
    <figure className="relative hidden self-end lg:block">
      <div style={{ WebkitMaskImage: fade, maskImage: fade, transform: `scale(${f.scale})`, transformOrigin: "50% 100%" }} className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.src}
          alt={`${f.name}, a NEZOR alapítója`}
          loading="lazy"
          className="mx-auto block h-auto w-full max-w-[20rem] select-none"
        />
      </div>
      {/* névcímke a fotó alján, a sötét öltönyön (a halványító maszkon kívül, hogy ne fakuljon el) */}
      <figcaption className="absolute inset-x-0 bottom-[9%] text-center">
        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]">
          {f.name}
        </span>
      </figcaption>
    </figure>
  );
}

// Valódi ügyfélüzenetek (a chat-kép és Messenger-buborékok a régi nezor.hu/landing oldalról, a kiemelt mondatra vágva),
// egy sorban a kérdéssor fölött, váltakozva megdöntve. A buborékok szélessége a kivágás szélességével arányos,
// így bennük egyforma a betűméret.
const BUBBLE_REM = 19; // a 965 px széles kivágás szélessége remben
const reviews = [
  {
    src: "/images/velemenyek/ugyfel-uzenet.webp",
    width: 1398,
    height: 672,
    alt: "Ügyfélüzenet: Aztaku**a dekomoly. Nagyon jók vagytok.",
    tilt: "-rotate-3",
    rem: 16,
  },
  {
    src: "/images/velemenyek/nem-bantam-meg.webp",
    width: 965,
    height: 255,
    alt: "Ügyfélüzenet: Nagyon nem bántam meg, hogy ebbe belevágtunk.",
    tilt: "rotate-2",
    rem: BUBBLE_REM,
  },
  {
    src: "/images/velemenyek/profi-lett.webp",
    width: 966,
    height: 220,
    alt: "Ügyfélüzenet: Nah srácok, erről beszéltem! Ez így profi lett!",
    tilt: "-rotate-2",
    rem: (966 / 965) * BUBBLE_REM,
  },
  {
    src: "/images/velemenyek/erofeszites.webp",
    width: 950,
    height: 255,
    alt: "Ügyfélüzenet: A munkát és az erőfeszítéseteket értékelem, köszönöm.",
    tilt: "rotate-1",
    rem: (950 / 965) * BUBBLE_REM,
  },
];

// Telefonon és tableten oldalra húzható sor, széles képernyőn egymás mellett, középre igazítva.
function Reviews() {
  return (
    <ul
      aria-label="Ügyfeleink üzenetei"
      className="relative z-20 -mx-4 mb-10 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 py-4 [scrollbar-width:none] sm:-mx-6 sm:mb-12 lg:mx-auto lg:max-w-7xl lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0"
    >
      {reviews.map((r) => (
        // A fehér keret a li háttere + paddingje, nem az img bordere: megdöntve a border és a kép között
        // a böngésző hajszálnyi rést hagy, amin átlátszott a sötét háttér.
        <li
          key={r.src}
          style={{ width: `min(78vw, ${r.rem}rem)` }}
          className={`shrink-0 snap-center select-none rounded-2xl bg-white p-1 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] ${r.tilt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.src}
            alt={r.alt}
            width={r.width}
            height={r.height}
            loading="lazy"
            className="block h-auto w-full rounded-xl"
          />
        </li>
      ))}
    </ul>
  );
}

// Az esettanulmányok után rögtön a beágyazott kapcsolatfelvétel: fölötte egy sorban az ügyfélvélemények, két oldalán az alapítók.
export function HomeConsultation() {
  return (
    <section className="overflow-hidden bg-night px-4 pb-14 pt-4 text-center text-[#f8f9fa] sm:px-6 sm:pb-16 sm:pt-8 lg:pb-12">
      <div id={CONSULTATION_ID} className="scroll-mt-24">
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,8vw,5rem)] leading-[1.15]">
          A TE SZÁMAID KÖVETKEZNEK?
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-xl text-lg text-white/75 sm:mb-10 sm:text-xl">
          Pár kérdés, és megmondjuk, mit csinálnánk nálad.
        </p>

        <Reviews />

        <div className="mx-auto grid max-w-7xl items-end gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)] lg:gap-6">
          <Founder f={founders[0]} />

          <div className="relative text-left">
            <Wizard advertised={null} service="hirdetes" />
          </div>

          <Founder f={founders[1]} />
        </div>
      </div>
    </section>
  );
}
