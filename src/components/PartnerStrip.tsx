import { allLogos } from "./PartnerLogos";

// Ezeknek külön, részlet-megtartó fehér változatuk van (public/images/partnerek/mono): a sötét/telített részek fehérek, a világosak átlátszók.
// Magasabb arányú logók: nagyobb magasságot kapnak, hogy vizuálisan ugyanakkorák legyenek, mint a széles szövegesek.
const tall = new Set(["estur", "koronagomba", "nekedsutom", "cruisershop", "quickhouse", "cupseal", "arokto", "tothtamas", "loftofbeauty"]);
const mono = new Set(["estur", "szeko", "koronagomba", "passa", "nekedsutom"]);
// Széles, nehéz logók: kisebb magasságot kapnak, különben túlnőnek a többin.
const wide = new Set(["plasztikkartya"]);
// A hero-sávból kihagyott logók (a logó-falon továbbra is szerepelnek).
const stripLogos = allLogos.filter((l) => l.file !== "kacerkaraj");

// Egysoros, a szélességének 80%-át kitöltő logó-futósáv a fekete részen (fehér sziluett logók, a szélek elhalványulnak).
export function PartnerStrip() {
  const group = (g: number) => (
    <div key={g} className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
      {stripLogos.map((l, i) => {
        const primary = g === 0;
        if (l.wordmark === "kingjet") {
          return (
            <span
              key={`${l.name}-${i}`}
              aria-hidden={!primary}
              aria-label={primary ? l.name : undefined}
              className="shrink-0 whitespace-nowrap text-2xl font-black tracking-tight text-white/90 transition-colors duration-300 hover:text-white sm:text-3xl"
            >
              KINGJET
            </span>
          );
        }
        return l.file ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${l.name}-${i}`}
            src={`/images/partnerek/${mono.has(l.file) ? "mono/" : ""}${l.file}.webp`}
            alt={primary ? l.name : ""}
            aria-hidden={!primary}
            className={`w-auto shrink-0 opacity-95 transition-opacity duration-300 hover:opacity-100 ${mono.has(l.file) ? "brightness-150" : "brightness-0 invert"} ${tall.has(l.file) ? "h-12 sm:h-[3.75rem]" : wide.has(l.file) ? "h-6 sm:h-7" : "h-9 sm:h-11"}`}
          />
        ) : (
          <span
            key={`${l.name}-${i}`}
            aria-hidden={!primary}
            aria-label={primary ? l.name : undefined}
            className="font-display shrink-0 whitespace-nowrap text-[1.65rem] leading-none tracking-wide text-white/90 transition-colors duration-300 hover:text-white sm:text-[2rem]"
          >
            {l.text}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="relative bg-black py-8 sm:py-12">
      {/* a hero alját finoman feketébe halványítja */}
      <div className="pointer-events-none absolute inset-x-0 bottom-full h-[8vw] bg-gradient-to-b from-transparent to-black" />
      <div className="mx-auto w-[80%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "60s" }}>
          {[0, 1].map(group)}
        </div>
      </div>
    </div>
  );
}
