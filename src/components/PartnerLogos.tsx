// file: kép a public/images/partnerek/ mappából; text: ha nincs logó, a domain szövegként.
export type Logo = {
  name: string;
  file?: string;
  text?: string;
  wordmark?: "kingjet";
};

const rowOne: Logo[] = [
  { name: "Hellinger Kft.", file: "hellinger" },
  { name: "Mobilhazgyarto.hu", file: "mobilhazgyarto" },
  { name: "Estur", file: "estur" },
  { name: "Szeko Ablak Kft.", file: "szeko" },
  { name: "Korona Gomba", file: "koronagomba" },
  { name: "Kacérkaraj Hentesműhely", file: "kacerkaraj" },
  { name: "Passa Bőrdíszmű", file: "passa" },
];

const rowTwo: Logo[] = [
  { name: "Inshape-Diet", file: "inshape" },
  { name: "Dover Solution", file: "dover" },
  { name: "The Cruiser Shop", file: "cruisershop" },
  { name: "Tóth Tamás EV.", file: "tothtamas" },
  { name: "Neked Sütöm", file: "nekedsutom" },
  { name: "Plasztikkártya.hu", file: "plasztikkartya" },
  { name: "Quickhouse.hu", file: "quickhouse" },
  { name: "Cupseal", file: "cupseal" },
  { name: "Loft of Beauty", file: "loftofbeauty" },
  { name: "Ároktői Liget Senior Rezidencia", file: "arokto" },
  { name: "KingJet Europe", wordmark: "kingjet" },
];

// Az összes partner egy listában (pl. az egysoros futósávhoz a hero alatt).
export const allLogos: Logo[] = [...rowOne, ...rowTwo];

// Széles, teljes magasságú szöveges logók: kisebb magasságot kapnak, különben túlnőnek a többin.
const wide = new Set(["plasztikkartya"]);

const fade =
  "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]";

function Row({
  logos,
  reverse,
  duration,
}: {
  logos: Logo[];
  reverse?: boolean;
  duration: string;
}) {
  // Egy csoport elég hosszú ahhoz, hogy kitöltse a képernyőt, a sáv két csoportból áll.
  const group = [...logos, ...logos, ...logos];

  return (
    <div className={`overflow-hidden ${fade}`}>
      <div
        className={`flex w-max hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((g) => (
          <div key={g} className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
            {group.map((l, i) => {
              const primary = g === 0 && i < logos.length;
              if (l.wordmark === "kingjet") {
                return (
                  <span
                    key={`${l.name}-${i}`}
                    aria-hidden={!primary}
                    aria-label={primary ? l.name : undefined}
                    className="shrink-0 whitespace-nowrap text-3xl font-black tracking-tight opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:text-4xl"
                  >
                    <span className="text-[#20232f]">KING</span>
                    <span className="text-[#e4202a]">JET</span>
                  </span>
                );
              }
              return l.file ? (
                <img
                  key={`${l.name}-${i}`}
                  src={`/images/partnerek/${l.file}.webp`}
                  alt={primary ? l.name : ""}
                  aria-hidden={!primary}
                  className={`w-auto shrink-0 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${wide.has(l.file) ? "h-6 sm:h-8" : "h-12 sm:h-16"}`}
                />
              ) : (
                <span
                  key={`${l.name}-${i}`}
                  aria-hidden={!primary}
                  className="shrink-0 whitespace-nowrap text-xl font-bold tracking-tight text-black/60 transition duration-300 hover:text-black sm:text-2xl"
                >
                  {l.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnerLogos() {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="-mx-6 flex flex-col gap-10">
        <Row logos={rowOne} duration="45s" />
        <Row logos={rowTwo} reverse duration="55s" />
      </div>
    </div>
  );
}
