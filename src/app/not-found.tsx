import { Roll } from "@/components/Roll";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { OpenWizardButton } from "@/components/OpenWizardButton";

export const metadata: Metadata = {
  title: "404 | NEZOR",
  description: "Ez az oldal nincs kész. Pedig szóltunk a webes csávónak.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      {/* egy képernyőre fér: a méretek a képernyő magasságához igazodnak, nincs görgetés */}
      <main className="relative flex h-svh flex-col items-center justify-center overflow-hidden bg-[#f8f9fa] px-6 pb-6 pt-20 text-center text-black">
        <div aria-hidden className="pp-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-80 w-[44rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-accent/35 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl">
          {/* 404: az első 4-es fejjel lefelé, a második darabokban, mellette nyíl */}
          <div className="relative mx-auto mb-[clamp(3rem,9svh,4.5rem)] inline-block">
            <h1
              aria-label="404"
              className="font-display flex select-none items-center justify-center gap-[0.03em] text-[clamp(4.5rem,min(26vw,30svh),16rem)] leading-[0.85]"
            >
              <span aria-hidden className="inline-block rotate-180">4</span>
              <span aria-hidden>0</span>
              <span aria-hidden className="relative inline-block">
                <span className="invisible">4</span>
                {[
                  { clip: "inset(0 38% 40% 0)", move: "translate(-0.09em,-0.05em) rotate(-9deg)" },
                  { clip: "inset(0 0 0 54%)", move: "translate(0.08em,0.02em) rotate(7deg)" },
                  { clip: "inset(64% 46% 0 0)", move: "translate(-0.07em,0.09em) rotate(16deg)" },
                ].map((p) => (
                  <span key={p.clip} className="absolute inset-0" style={{ clipPath: p.clip, transform: p.move }}>
                    4
                  </span>
                ))}
                <span className="absolute left-[8%] top-[88%] h-[0.05em] w-[0.05em] rotate-12 bg-night" />
                <span className="absolute left-[78%] top-[96%] h-[0.035em] w-[0.035em] -rotate-12 bg-night" />
                <span className="absolute left-[44%] top-[104%] h-[0.04em] w-[0.04em] rotate-45 bg-night" />
              </span>
            </h1>

            <div className="pointer-events-none absolute right-[-2%] top-full -mt-2 flex flex-row-reverse items-start gap-1 sm:right-[4%]">
              <svg viewBox="0 0 120 80" className="h-14 w-20 -scale-x-100 text-black sm:h-16 sm:w-24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M104 70 C 70 74, 28 60, 24 18" />
                <path d="M10 30 L24 14 L38 30" />
              </svg>
              <span className="mt-6 -rotate-6 whitespace-nowrap rounded-md bg-accent px-3 py-1 font-display text-lg sm:text-2xl">
                ENNYIRE NINCS KÉSZ
              </span>
            </div>
          </div>
          <p className="font-display mt-[clamp(0.25rem,1.5svh,1rem)] text-[clamp(1.4rem,5svh,3.75rem)] leading-none">
            EZ AZ OLDAL NINCS KÉSZ.
          </p>
          <p className="font-display mt-[clamp(0.25rem,1.2svh,0.75rem)] text-[clamp(1.1rem,4svh,3rem)] leading-none">
            <span className="inline-block bg-accent px-3 pb-1 pt-2">PEDIG SZÓLTUNK A WEBES CSÁVÓNAK.</span>
          </p>

          <div className="mt-[clamp(1rem,4svh,2.5rem)] flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-roll roll-dark rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white"
            >
              <Roll label="Vissza a főoldalra" hover="Haza, gyerünk." />
            </Link>
            <OpenWizardButton hover="Készen vagyunk. Tényleg." className="rounded-full bg-night px-8 py-3.5 text-sm font-semibold text-accent">
              Kérek egy oldalt, ami kész
            </OpenWizardButton>
          </div>
        </div>
      </main>
    </>
  );
}
