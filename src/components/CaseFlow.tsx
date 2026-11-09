"use client";

import { CountUp, useInView } from "./CountUp";

// "Eredmények egy pillantásra": a valós összesített számok egyetlen ábrán.
// költés ÷ ajánlatkérés = 1 ajánlatkérés ára (napi bontás nincs, ezért nem rajzolunk kitalált görbét).

type Props = {
  count: number;
  unit: string;
  costPer: number;
  spend: number;
  spendLabel: string;
  dailySpend?: number;
  monthlySpend?: number;
};

const huf = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;

function Op({ kind, seen, delay }: { kind: "div" | "eq"; seen: boolean; delay: number }) {
  return (
    <div
      className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-white to-[#e6efff] shadow-[0_10px_24px_-6px_rgba(8,102,255,0.45)] transition-all duration-700 sm:h-16 sm:w-16 ${
        seen ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 text-accent sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        {kind === "div" ? (
          <>
            <path d="M4 12h16" />
            <circle cx="12" cy="4.5" r="1.2" fill="currentColor" />
            <circle cx="12" cy="19.5" r="1.2" fill="currentColor" />
          </>
        ) : (
          <>
            <path d="M4 8.5h16" />
            <path d="M4 15.5h16" />
          </>
        )}
      </svg>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold shadow-sm sm:text-base">
      {children}
    </span>
  );
}

export function CaseFlow({ count, unit, costPer, spend, spendLabel, dailySpend, monthlySpend }: Props) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const reveal = (d: number) => ({
    className: `transition-all duration-700 ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
    style: { transitionDelay: `${d}ms` },
  });

  return (
    <div ref={ref}>
      <div className="relative grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)] lg:gap-5">
        {/* összekötő vonal a csomópontok mögött */}
        <div aria-hidden className="absolute inset-x-10 top-1/2 hidden h-0 border-t-2 border-dashed border-accent/30 lg:block" />

        {/* költés */}
        <div {...reveal(0)}>
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-7 text-center lg:px-4 shadow-[0_18px_50px_-24px_rgba(8,102,255,0.4)] sm:p-9">
            <p className="text-xs font-semibold tracking-[0.25em] text-black/45">{spendLabel.toUpperCase()}</p>
            <p className="font-display mt-4 whitespace-nowrap text-5xl leading-none sm:text-6xl lg:text-4xl xl:text-5xl">
              <CountUp value={spend} suffix=" Ft" run={seen} />
            </p>
          </div>
        </div>

        <Op kind="div" seen={seen} delay={300} />

        {/* ajánlatkérés: a főszereplő */}
        <div {...reveal(150)}>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#2f84ff] via-[#0866ff] to-[#0a2fb0] p-9 text-center text-white shadow-[0_30px_70px_-22px_rgba(8,102,255,0.8)] sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[28px] border-white/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full border-[28px] border-white/10" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
            <p className="relative text-xs font-semibold tracking-[0.25em] text-white/75">{unit.toUpperCase()}</p>
            <p className="font-display relative mt-3 text-8xl leading-none sm:text-9xl">
              <CountUp value={count} run={seen} />
            </p>
          </div>
        </div>

        <Op kind="eq" seen={seen} delay={450} />

        {/* 1 ajánlatkérés ára: a poén */}
        <div {...reveal(300)}>
          <div className="relative overflow-hidden rounded-3xl bg-black p-7 text-center text-white lg:px-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-9">
            <div aria-hidden className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-accent/45 blur-3xl" />
            <p className="relative text-xs font-semibold tracking-[0.25em] text-white/60">1 {unit.toUpperCase()} ÁRA</p>
            <p className="font-display relative mt-4 whitespace-nowrap text-5xl leading-none sm:text-6xl lg:text-4xl xl:text-5xl">
              <CountUp value={costPer} suffix=" Ft" run={seen} />
            </p>
            <p className="relative mt-4 text-sm text-white/60">darabonként</p>
          </div>
        </div>
      </div>

      {(dailySpend || monthlySpend) && (
        <div {...reveal(500)}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {dailySpend && <Pill>napi költés: {huf(dailySpend)}</Pill>}
            {monthlySpend && <Pill>havi kb. {huf(monthlySpend)}</Pill>}
          </div>
        </div>
      )}
    </div>
  );
}
