import Link from "next/link";
import { marqueeCards, type CaseStudy, type UpcomingCase } from "@/data/cases";

// Csak a kép és a név-címke: a számok a hirdetés képén és az esettanulmány-oldalon vannak.
// Az adat nélküli kártya (UpcomingCase) nem kattintható.
function ResultCard({ c }: { c: CaseStudy | UpcomingCase }) {
  const clickable = "results" in c;
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.image}
        alt={c.name}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${clickable ? "group-hover:scale-105" : ""}`}
      />
      <span
        className={`absolute left-4 top-4 inline-flex items-center rounded-full border border-white/25 bg-black/35 px-5 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-300 sm:left-5 sm:top-5 ${clickable ? "group-hover:border-accent/70" : ""}`}
      >
        <span className="font-display pt-0.5 text-lg leading-none tracking-wide text-white sm:text-xl">{c.name}</span>
      </span>
    </>
  );
  const cls = "group relative block aspect-[4/5] w-72 shrink-0 overflow-hidden rounded-2xl bg-card sm:w-[26rem]";
  return clickable ? (
    <Link href={`/esettanulmanyok/${c.slug}`} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} cursor-default select-none`}>{inner}</div>
  );
}

export function CaseStudyMarquee() {
  const items = [...marqueeCards, ...marqueeCards];

  return (
    <section className="overflow-hidden bg-black py-20 text-center text-[#f8f9fa]">
      <p className="text-xs font-semibold tracking-widest text-accent sm:text-sm">
        ESETTANULMÁNYAINK
      </p>
      <h2 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">
        Hogy ne csak levegőbe beszéljünk.
      </h2>

      <div className="relative mt-14 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {items.map((c, i) => (
            <ResultCard key={`${c.slug}-${i}`} c={c} />
          ))}
        </div>
      </div>

      <Link
        href="/esettanulmanyok"
        className="mt-12 inline-block rounded-full border border-accent bg-accent px-10 py-4 text-base font-semibold text-white shadow-[0_0_32px_-4px] shadow-accent/60 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_0_44px_-2px] hover:shadow-accent/80"
      >
        Még több eredmény →
      </Link>

      <p className="mx-auto mt-8 max-w-xl px-6 text-xs text-white/40">
        Az adatok a Meta hirdetéskezelőből származnak, 2026. november 2-i állapot
        szerint. Az eredmények cégenként eltérhetnek.
      </p>
    </section>
  );
}
