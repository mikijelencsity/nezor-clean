// Főoldali „Rólunk” rész: felül nagyban a cím, alatta a két alapító nagyban, háttérként; előttük egy elmosott hátterű üvegkártyán a szöveg.
// A kártya negatív felső margója a szélesség százalékában van megadva (a fotók magassága is a szélességgel nő),
// így a kártya teteje mindig az állunk alatt marad, a fejek nem lógnak bele a szövegbe.
// (Az ügyfélüzenet a konzultációs kérdéssor sarkán van.)
// A kártya 90%-ban fehér: 60%-nál a fotók betöltése után a sötét öltöny és a bőrszín szürke/rózsaszín foltként átütött az elmosott háttéren.
// Az állítások ugyanazok, mint a Kisokos oldalon (/miert-mi) és a GYIK-ban (50+ vállalkozás, 12 000+ óra, heti egyeztetés).
const fade = "linear-gradient(to bottom, #000 80%, transparent)";

const founders = [
  { name: "Müller Dániel", src: "/images/csapat/ferfi-bal.webp" },
  { name: "Jelencsity Miklós", src: "/images/csapat/ferfi-jobb.webp" },
];

const facts = [
  { value: "50+", label: "magyar vállalkozás" },
  { value: "12 000+", label: "óra tapasztalat" },
  { value: "Heti", label: "egyeztetés" },
];

export function AboutUs() {
  return (
    <section id="rolunk" className="relative px-4 pt-24 text-black sm:px-6 sm:pt-32">
      {/* a szekció címe a fotók fölött, nagyban, mint a többi szekciónál */}
      <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-12">
        <p className="text-sm font-semibold tracking-widest text-accent">RÓLUNK</p>
        <h2 className="font-display mt-3 text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.12]">EZ A KÉT ARC VAN A HIRDETÉSEID MÖGÖTT.</h2>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* egyforma méret: a hasábok a képek pixelszélességéhez igazodnak (867 és 1040 px), Miklósé 274/290-szeresre
            kicsinyítve, mert az ő fotóján a fej 290 px, Danién 274 px magas */}
        <div className="grid grid-cols-[867fr_983fr] items-end">
          {founders.map((f) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={f.name}
              src={f.src}
              alt={`${f.name}, a NEZOR alapítója`}
              loading="lazy"
              style={{ WebkitMaskImage: fade, maskImage: fade }}
              className="block h-auto w-full select-none"
            />
          ))}
        </div>

        <div className="relative mx-auto -mt-[30%] max-w-xl rounded-3xl border border-white/60 bg-white/90 p-6 text-center shadow-2xl backdrop-blur-xl sm:-mt-[40%] sm:p-8">
          <div className="flex flex-col gap-4 text-base leading-snug text-[#4a4a4a] sm:text-lg">
            <p>
              A NEZOR-t ketten alapítottuk: <strong className="text-black">Müller Dániel</strong> és{" "}
              <strong className="text-black">Jelencsity Miklós</strong>.
            </p>
            <p>Online rendszert építünk, ami vevőt hoz: Facebook-hirdetést, weboldalt, automatizmust.</p>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-2 min-[380px]:grid-cols-3 min-[380px]:gap-3">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-2 py-3 shadow-[0_12px_30px_-18px_rgba(8,102,255,0.45)] min-[380px]:block min-[380px]:py-4">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display whitespace-nowrap text-[clamp(1.2rem,4.6vw,1.75rem)] leading-none text-accent">{f.value}</dd>
                <dd className="text-xs leading-tight text-[#5a5a5a] min-[380px]:mt-1.5 sm:text-sm">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
