"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Velaris from "./ui/velaris";

const HERO_COLORS = ["#2f6fe0", "#1747a6", "#0a1f4d", "#000000"];

// Egy sorba kényszerített tartalom: a nagy méretet csak akkor kicsinyíti, ha a rendelkezésre álló szélességnél szélesebb.
function FitLine({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const fit = () => {
      i.style.zoom = "1";
      const scale = Math.min(1, o.clientWidth / i.scrollWidth);
      i.style.zoom = String(scale);
      setReady(true);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="w-full text-center">
      <div
        ref={inner}
        className={`inline-block whitespace-nowrap transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

type Props = {
  industry: string;
  goal: string;
  name: string;
  logo?: string;
};

export function CaseHero({ industry, goal, name, logo }: Props) {
  return (
    <Velaris
      height="auto"
      bg="#000000"
      colors={HERO_COLORS}
      speed={1.1}
      grain={0.12}
      className="relative min-h-[100svh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-5 px-6 text-center text-[#f8f9fa]">
        <div className="absolute inset-x-0 top-28 flex flex-col items-center gap-4 sm:top-36">
          <Link
            href="/esettanulmanyok"
            className="text-sm font-semibold tracking-widest text-white/70 transition-colors hover:text-white"
          >
            ← ÖSSZES ESETTANULMÁNY
          </Link>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-widest text-black">
              {industry.toUpperCase()}
            </span>
            <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
              {goal.toUpperCase()}
            </span>
          </div>
        </div>

        <FitLine>
          <h1 className="font-display pb-3 text-6xl leading-[0.95] text-white sm:text-8xl lg:text-[8.5rem]">
            {name.toUpperCase()}
          </h1>
        </FitLine>

        <div className="absolute inset-x-0 bottom-10 px-6 sm:bottom-14">
          <FitLine>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {logo && (
                <>
                  <span className="flex h-12 items-center rounded-xl bg-white px-4 sm:h-16 sm:px-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/partnerek/${logo}.webp`}
                      alt={name}
                      className="h-8 w-auto sm:h-10"
                    />
                  </span>
                  <span className="text-3xl text-white/50 sm:text-4xl">+</span>
                </>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/meta3d/nezor-logo.webp"
                alt="NEZOR"
                className="h-12 w-auto select-none drop-shadow-[0_6px_10px_rgba(8,102,255,0.4)] sm:h-16"
              />
            </div>
          </FitLine>
        </div>
      </div>
    </Velaris>
  );
}
