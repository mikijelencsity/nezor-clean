"use client";

import { CountUp, useInView } from "./CountUp";

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
};

// Nagy, felfutó számok panelekben.
export function CaseStats({ stats }: { stats: Stat[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-2">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${
            i === 0 ? "border-accent bg-accent text-white" : "border-black/10 bg-white"
          }`}
        >
          <p
            className={`font-display whitespace-nowrap text-6xl leading-none sm:text-7xl ${
              i === 0 ? "" : "bg-gradient-to-b from-black to-accent bg-clip-text text-transparent"
            }`}
          >
            <CountUp value={s.value} suffix={s.suffix} run={seen} />
          </p>
          <p className="mt-4 text-sm font-semibold tracking-widest">{s.label.toUpperCase()}</p>
          {s.sub && <p className={`mt-1 text-sm ${i === 0 ? "text-black/70" : "text-[#5a5a5a]"}`}>{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
