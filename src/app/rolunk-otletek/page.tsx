import type { Metadata } from "next";
import type { ReactNode } from "react";

// Belső vázlatoldal: 20 elrendezés-ötlet a főoldali „Rólunk” részhez. Ugyanaz a tartalom, más felépítés.
// Nem indexelendő, élesítés előtt törölhető.
export const metadata: Metadata = {
  title: "Rólunk – elrendezés-ötletek | NEZOR",
  robots: { index: false, follow: false },
};

const DANI = { name: "Müller Dániel", src: "/images/csapat/ferfi-bal.webp" };
const MIKI = { name: "Jelencsity Miklós", src: "/images/csapat/ferfi-jobb.webp" };
const FOUNDERS = [DANI, MIKI];
const FACTS = [
  { value: "50+", label: "magyar vállalkozás" },
  { value: "12 000+", label: "óra tapasztalat" },
  { value: "Heti", label: "egyeztetés" },
];
const TITLE = "EZ A KÉT ARC VAN A HIRDETÉSEID MÖGÖTT.";
const MSG = "https://www.nezor.hu/ugyfel-uzenet.webp";
const fade = "linear-gradient(to bottom, #000 80%, transparent)";

function Intro({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 text-lg leading-snug text-[#4a4a4a] sm:text-xl ${className}`}>
      <p>
        A NEZOR-t ketten alapítottuk: <strong className="text-black">Müller Dániel</strong> és{" "}
        <strong className="text-black">Jelencsity Miklós</strong>.
      </p>
      <p>Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust.</p>
    </div>
  );
}

function Eyebrow({ light = false }: { light?: boolean }) {
  return <p className={`text-sm font-semibold tracking-widest ${light ? "text-white/70" : "text-accent"}`}>RÓLUNK</p>;
}

function Title({ className = "" }: { className?: string }) {
  return <h2 className={`font-display mt-3 text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.1] ${className}`}>{TITLE}</h2>;
}

function Facts({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <dl className={`grid grid-cols-3 gap-3 ${className}`}>
      {FACTS.map((f) => (
        <div
          key={f.label}
          className={`rounded-2xl px-2 py-4 text-center ${light ? "border border-white/15 bg-white/10" : "border border-black/10 bg-white/70 shadow-[0_12px_30px_-18px_rgba(8,102,255,0.45)]"}`}
        >
          <dt className="sr-only">{f.label}</dt>
          <dd className={`font-display whitespace-nowrap text-[clamp(1.2rem,4.6vw,1.75rem)] leading-none ${light ? "text-white" : "text-accent"}`}>{f.value}</dd>
          <dd className={`mt-1.5 text-xs leading-tight sm:text-sm ${light ? "text-white/70" : "text-[#5a5a5a]"}`}>{f.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Cutout({ f, className = "", faded = true }: { f: typeof DANI; className?: string; faded?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={f.src}
      alt={`${f.name}, a NEZOR alapítója`}
      loading="lazy"
      style={faded ? { WebkitMaskImage: fade, maskImage: fade } : undefined}
      className={`block h-auto select-none drop-shadow-[0_26px_30px_rgba(10,31,77,0.25)] ${className}`}
    />
  );
}

function Avatar({ f, size = "h-24 w-24", ring = "ring-white" }: { f: typeof DANI; size?: string; ring?: string }) {
  return (
    <div className={`${size} shrink-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_30%,#dce8ff,#a9c6ff)] ring-4 ${ring}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={f.src} alt={f.name} loading="lazy" className="h-[150%] w-full object-cover object-top" />
    </div>
  );
}

function NamePill({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`inline-block rounded-full bg-night px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:px-4 sm:text-sm ${className}`}>{name}</span>;
}

function Message({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={MSG}
      alt="Ügyfélüzenet: Aztaku**a dekomoly. Nagyon jók vagytok."
      width={1398}
      height={672}
      loading="lazy"
      className={`h-auto w-full rounded-3xl border-[6px] border-white shadow-[0_30px_70px_-30px_rgba(10,31,77,0.45)] ${className}`}
    />
  );
}

function Variant({ n, name, note, children, dark = false }: { n: number; name: string; note: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={`v${n}`} className="scroll-mt-20 border-t-4 border-dashed border-accent/30">
      <div className="sticky top-0 z-20 flex items-baseline gap-3 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <span className="font-display text-2xl text-accent">{String(n).padStart(2, "0")}</span>
        <span className="font-semibold">{name}</span>
        <span className="hidden text-sm text-[#6b6b6b] md:inline">{note}</span>
      </div>
      <div className={`overflow-hidden px-4 py-20 sm:px-6 ${dark ? "bg-night text-white" : "bg-[#f8f9fa] text-black"}`}>{children}</div>
    </section>
  );
}

const VARIANTS: { name: string; note: string; dark?: boolean; body: ReactNode }[] = [
  {
    name: "Klasszikus kettéosztás",
    note: "Bal oldalt a két fotó egymás mellett, jobb oldalt cím, szöveg, számok.",
    body: (
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 items-end gap-2">
          {FOUNDERS.map((f) => (
            <figure key={f.name} className="relative">
              <Cutout f={f} className="w-full" />
              <figcaption className="absolute inset-x-0 bottom-[6%] text-center"><NamePill name={f.name} /></figcaption>
            </figure>
          ))}
        </div>
        <div>
          <Eyebrow />
          <Title />
          <Intro className="mt-6" />
          <Facts className="mt-8 max-w-md" />
        </div>
      </div>
    ),
  },
  {
    name: "Tükrözött kettéosztás, egymásra csúszó fotók",
    note: "Szöveg balra, a két alapító jobbra, részben egymás mögött.",
    body: (
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow />
          <Title />
          <Intro className="mt-6 max-w-lg" />
          <Facts className="mt-8 max-w-md" />
        </div>
        <div className="relative mx-auto flex w-full max-w-lg items-end justify-center">
          <Cutout f={DANI} className="relative z-10 w-[58%] -mr-[14%]" />
          <Cutout f={MIKI} className="w-[62%]" />
        </div>
      </div>
    ),
  },
  {
    name: "Sötét kártya",
    note: "Egy nagy, lekerekített fekete kártya; a fotók alul kifutnak belőle.",
    body: (
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-night px-6 pt-14 text-center text-white sm:px-12">
        <Eyebrow light />
        <Title className="text-white" />
        <Intro className="mx-auto mt-6 max-w-xl text-white/75 [&_strong]:text-white" />
        <Facts light className="mx-auto mt-8 max-w-md" />
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 items-end gap-4">
          {FOUNDERS.map((f) => <Cutout key={f.name} f={f} faded={false} className="w-full" />)}
        </div>
      </div>
    ),
  },
  {
    name: "Két alapító-kártya",
    note: "Két egyforma kártya fotóval és névvel, fölötte a cím, alatta a számok.",
    body: (
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow />
        <Title />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {FOUNDERS.map((f) => (
            <figure key={f.name} className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(10,31,77,0.35)]">
              <div className="bg-[radial-gradient(circle_at_50%_40%,#dce8ff,#f8f9fa)] px-8 pt-8">
                <Cutout f={f} faded={false} className="mx-auto h-72 w-auto sm:h-80" />
              </div>
              <figcaption className="px-6 py-5 text-xl font-bold">{f.name}<span className="block text-sm font-normal text-[#6b6b6b]">alapító</span></figcaption>
            </figure>
          ))}
        </div>
        <Intro className="mx-auto mt-10 max-w-xl" />
        <Facts className="mx-auto mt-8 max-w-md" />
      </div>
    ),
  },
  {
    name: "Számok a fotókon",
    note: "A három szám lebegő címkeként ül a fotókon, külön számsor nincs.",
    body: (
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow />
        <Title />
        <Intro className="mx-auto mt-6 max-w-xl" />
        <div className="relative mx-auto mt-10 grid max-w-3xl grid-cols-2 items-end gap-4">
          {FOUNDERS.map((f) => <Cutout key={f.name} f={f} className="w-full" />)}
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`absolute rounded-2xl bg-white px-4 py-3 text-left shadow-xl ${["left-0 top-[18%] -rotate-3", "left-1/2 top-[45%] -translate-x-1/2 rotate-2", "right-0 top-[22%] rotate-3"][i]}`}
            >
              <p className="font-display text-2xl leading-none text-accent">{f.value}</p>
              <p className="mt-1 text-xs text-[#5a5a5a]">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Magazin-idézet",
    note: "A fő mondat óriási idézetként, kis kerek fotókkal és nevekkel aláírva.",
    body: (
      <div className="mx-auto max-w-4xl">
        <Eyebrow />
        <p className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1]">„Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust.”</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="flex items-center gap-3">
              <Avatar f={f} size="h-16 w-16" />
              <div><p className="font-bold">{f.name}</p><p className="text-sm text-[#6b6b6b]">a NEZOR alapítója</p></div>
            </div>
          ))}
        </div>
        <Facts className="mt-10 max-w-md" />
      </div>
    ),
  },
  {
    name: "Bento rács",
    note: "Csempék: két fotó, cím, számok és az ügyfélüzenet egy rácsban.",
    body: (
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4 md:grid-rows-[auto_auto]">
        <div className="rounded-3xl bg-white p-8 md:col-span-2">
          <Eyebrow />
          <Title className="text-[clamp(1.75rem,3.5vw,2.75rem)]" />
          <Intro className="mt-5 text-base sm:text-lg" />
        </div>
        {FOUNDERS.map((f) => (
          <figure key={f.name} className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_35%,#cfe0ff,#eef3ff)] px-4 pt-6">
            <Cutout f={f} faded={false} className="mx-auto w-full max-w-[14rem]" />
            <figcaption className="absolute inset-x-0 bottom-4 text-center"><NamePill name={f.name} /></figcaption>
          </figure>
        ))}
        {FACTS.map((f) => (
          <div key={f.label} className="flex flex-col justify-center rounded-3xl bg-accent p-6 text-white">
            <p className="font-display text-4xl leading-none">{f.value}</p>
            <p className="mt-2 text-sm text-white/80">{f.label}</p>
          </div>
        ))}
        <div className="rounded-3xl bg-white p-3"><Message className="border-0 shadow-none" /></div>
      </div>
    ),
  },
  {
    name: "Minimál, összeérő avatarok",
    note: "Két kerek fotó középen egymásba csúszva, alatta rövid szöveg. Sok levegő.",
    body: (
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Avatar f={DANI} size="h-32 w-32 sm:h-40 sm:w-40" />
          <div className="-ml-6"><Avatar f={MIKI} size="h-32 w-32 sm:h-40 sm:w-40" /></div>
        </div>
        <div className="mt-8"><Eyebrow /></div>
        <Title />
        <Intro className="mt-6" />
        <Facts className="mx-auto mt-8 max-w-md" />
      </div>
    ),
  },
  {
    name: "Számsáv felül",
    note: "Óriás számok viszik az első benyomást, utána jönnek az arcok és a szöveg.",
    body: (
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 border-y border-black/10 py-8 text-center">
          {FACTS.map((f) => (
            <div key={f.label}>
              <p className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-none text-accent">{f.value}</p>
              <p className="mt-2 text-sm text-[#5a5a5a] sm:text-base">{f.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow />
            <Title />
            <Intro className="mt-6" />
          </div>
          <div className="grid grid-cols-2 items-end gap-2">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} className="w-full" />)}</div>
        </div>
      </div>
    ),
  },
  {
    name: "Polaroid",
    note: "Fehér keretes, kicsit elforgatott fotók, mintha az asztalon feküdnének.",
    body: (
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="flex justify-center gap-2">
          {FOUNDERS.map((f, i) => (
            <figure key={f.name} className={`w-[46%] bg-white p-3 pb-12 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)] ${i ? "mt-10 rotate-[5deg]" : "-rotate-[4deg]"}`}>
              <div className="aspect-[4/5] overflow-hidden bg-[#e6eefc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.name} loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-center text-lg italic">{f.name}</figcaption>
            </figure>
          ))}
        </div>
        <div>
          <Eyebrow />
          <Title />
          <Intro className="mt-6" />
          <Facts className="mt-8 max-w-md" />
        </div>
      </div>
    ),
  },
  {
    name: "Üvegkártya a fotók előtt",
    note: "A fotók nagyban, háttérként; a szöveg egy elmosott hátterű kártyán ül előttük.",
    body: (
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 items-end opacity-90">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} className="w-full" />)}</div>
        <div className="mx-auto -mt-24 max-w-xl rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-2xl backdrop-blur-xl sm:absolute sm:inset-x-0 sm:bottom-10 sm:mt-0">
          <Eyebrow />
          <Title className="text-[clamp(1.75rem,3.5vw,2.75rem)]" />
          <Intro className="mt-5 text-base sm:text-lg" />
          <Facts className="mt-6" />
        </div>
      </div>
    ),
  },
  {
    name: "Három oszlop: kik, mit, hogyan",
    note: "Felül a két arc, alatta három rövid blokk: kik vagyunk, mit csinálunk, hogyan dolgozunk.",
    body: (
      <div className="mx-auto max-w-6xl text-center">
        <Eyebrow />
        <Title />
        <div className="mx-auto mt-8 flex max-w-xl items-end justify-center gap-2">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} className="w-1/2" />)}</div>
        <div className="mt-6 grid gap-4 text-left md:grid-cols-3">
          {[
            ["Kik vagyunk", "A NEZOR-t ketten alapítottuk: Müller Dániel és Jelencsity Miklós."],
            ["Mit csinálunk", "Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust."],
            ["Hogyan dolgozunk", "Heti egyeztetés, 50+ magyar vállalkozás és 12 000+ óra tapasztalat mögöttünk."],
          ].map(([h, t], i) => (
            <div key={h} className="rounded-3xl bg-white p-7 shadow-[0_20px_40px_-25px_rgba(10,31,77,0.3)]">
              <p className="font-display text-3xl text-accent">0{i + 1}</p>
              <p className="mt-2 text-xl font-bold">{h}</p>
              <p className="mt-2 text-[#4a4a4a]">{t}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Chat-bemutatkozás",
    note: "Az alapítók üzenetbuborékokban mutatkoznak be, a végén jön az ügyfél válasza.",
    body: (
      <div className="mx-auto max-w-2xl">
        <div className="text-center"><Eyebrow /><Title /></div>
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <Avatar f={DANI} size="h-12 w-12" />
            <p className="rounded-3xl rounded-bl-md bg-white px-5 py-4 text-lg shadow">Szia! Dani vagyok, a NEZOR egyik alapítója.</p>
          </div>
          <div className="flex flex-row-reverse items-end gap-3">
            <Avatar f={MIKI} size="h-12 w-12" />
            <p className="rounded-3xl rounded-br-md bg-accent px-5 py-4 text-lg text-white shadow">Én pedig Miklós. Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust.</p>
          </div>
          <div className="flex items-end gap-3">
            <Avatar f={DANI} size="h-12 w-12" />
            <p className="rounded-3xl rounded-bl-md bg-white px-5 py-4 text-lg shadow">Eddig 50+ magyar vállalkozásnak, 12 000+ óra alatt. Hetente egyeztetünk.</p>
          </div>
          <Message className="mt-4" />
        </div>
      </div>
    ),
  },
  {
    name: "Aszimmetrikus",
    note: "Egy nagy fotó balra, egy kisebb jobbra lent, a szöveg közöttük átlósan.",
    body: (
      <div className="mx-auto grid max-w-6xl items-end gap-6 lg:grid-cols-[1fr_1.1fr_0.7fr]">
        <Cutout f={DANI} className="mx-auto w-full max-w-sm" />
        <div className="self-center pb-10">
          <Eyebrow />
          <Title />
          <Intro className="mt-6" />
          <Facts className="mt-8" />
        </div>
        <Cutout f={MIKI} className="mx-auto w-2/3 max-w-[14rem] lg:w-full" />
      </div>
    ),
  },
  {
    name: "Kék sáv",
    note: "Teljes szélességű kék háttér, fehér szöveg; a fotók a sáv aljára ülnek.",
    body: (
      <div className="-mx-4 -my-20 bg-accent px-4 pt-20 text-white sm:-mx-6 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-2">
          <div className="pb-16">
            <Eyebrow light />
            <Title className="text-white" />
            <Intro className="mt-6 text-white/85 [&_strong]:text-white" />
            <Facts light className="mt-8 max-w-md" />
          </div>
          <div className="grid grid-cols-2 items-end gap-2">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} faded={false} className="w-full" />)}</div>
        </div>
      </div>
    ),
  },
  {
    name: "Névjegykártyák",
    note: "Két vízszintes névjegy egymás alatt: kerek fotó, név, egy sor szöveg.",
    body: (
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow />
          <Title />
          <Intro className="mt-6" />
        </div>
        <div className="flex flex-col gap-5">
          {FOUNDERS.map((f, i) => (
            <div key={f.name} className={`flex items-center gap-5 rounded-3xl bg-white p-5 shadow-[0_20px_40px_-25px_rgba(10,31,77,0.35)] ${i ? "lg:ml-12" : "lg:mr-12"}`}>
              <Avatar f={f} size="h-24 w-24" ring="ring-accent/20" />
              <div>
                <p className="text-xl font-bold">{f.name}</p>
                <p className="text-[#6b6b6b]">alapító · NEZOR</p>
              </div>
            </div>
          ))}
          <Facts className="mt-2" />
        </div>
      </div>
    ),
  },
  {
    name: "Ügyfélüzenet középen",
    note: "Az ügyfél üzenete a főszereplő, a két alapító két oldalról nézi.",
    body: (
      <div className="mx-auto max-w-6xl text-center">
        <Eyebrow />
        <Title />
        <div className="mt-10 grid items-end gap-4 lg:grid-cols-[1fr_1.4fr_1fr]">
          <Cutout f={DANI} className="mx-auto hidden w-full max-w-xs lg:block" />
          <div className="pb-10">
            <Message />
            <Intro className="mx-auto mt-8 max-w-md" />
            <Facts className="mx-auto mt-6 max-w-md" />
          </div>
          <Cutout f={MIKI} className="mx-auto hidden w-full max-w-xs lg:block" />
        </div>
      </div>
    ),
  },
  {
    name: "Félbevágott képernyő",
    note: "Bal fele sötét a fotókkal, jobb fele világos a szöveggel.",
    body: (
      <div className="-mx-4 -my-20 grid lg:grid-cols-2 sm:-mx-6">
        <div className="flex items-end justify-center gap-2 bg-night px-6 pt-16">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} faded={false} className="w-[45%]" />)}</div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
          <Eyebrow />
          <Title />
          <Intro className="mt-6" />
          <Facts className="mt-8 max-w-md" />
        </div>
      </div>
    ),
  },
  {
    name: "Óriás háttér-tipográfia",
    note: "Halvány, hatalmas „NEZOR” felirat a háttérben, előtte a két arc és a szöveg.",
    body: (
      <div className="relative mx-auto max-w-6xl text-center">
        <p aria-hidden className="font-display pointer-events-none absolute inset-x-0 top-[28%] select-none text-[clamp(6rem,24vw,20rem)] leading-none text-accent/10">NEZOR</p>
        <div className="relative">
          <Eyebrow />
          <Title />
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 items-end gap-4">{FOUNDERS.map((f) => <Cutout key={f.name} f={f} className="w-full" />)}</div>
          <Intro className="mx-auto mt-6 max-w-xl" />
          <Facts className="mx-auto mt-8 max-w-md" />
        </div>
      </div>
    ),
  },
  {
    name: "Kompakt sáv",
    note: "Rövid változat egyetlen sorban: avatarok, egy mondat, számok.",
    body: (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(10,31,77,0.35)] lg:flex-row">
        <div className="flex">
          <Avatar f={DANI} size="h-20 w-20" />
          <div className="-ml-4"><Avatar f={MIKI} size="h-20 w-20" /></div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <p className="text-xl font-bold">Müller Dániel és Jelencsity Miklós</p>
          <p className="mt-1 text-[#4a4a4a]">Ők ketten vannak a hirdetéseid mögött. Facebook-hirdetés, weboldal, automatizmus.</p>
        </div>
        <Facts className="w-full max-w-md" />
      </div>
    ),
  },
];

export default function RolunkOtletek() {
  return (
    <main className="min-h-screen bg-white">
      <header className="px-4 py-12 text-center sm:px-6">
        <h1 className="font-display text-4xl">Rólunk – 20 elrendezés</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#5a5a5a]">Ugyanaz a tartalom, húszféle felépítésben. Szólj a számmal, amelyik tetszik, és azt teszem be a főoldalra.</p>
        <nav className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {VARIANTS.map((v, i) => (
            <a key={v.name} href={`#v${i + 1}`} className="rounded-full border border-black/10 px-3 py-1 text-sm hover:border-accent hover:text-accent">
              {String(i + 1).padStart(2, "0")} {v.name}
            </a>
          ))}
        </nav>
      </header>
      {VARIANTS.map((v, i) => (
        <Variant key={v.name} n={i + 1} name={v.name} note={v.note} dark={v.dark}>
          {v.body}
        </Variant>
      ))}
    </main>
  );
}
