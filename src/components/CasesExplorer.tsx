"use client";

import Image from "next/image";
import Link from "next/link";
import { cases, formatHuf } from "@/data/cases";
import { formatNumber } from "./CountUp";
import { BottomCta } from "./BottomCta";

function CaseCard({ c, index }: { c: (typeof cases)[number]; index: number }) {
  return (
    <Link
      href={`/esettanulmanyok/${c.slug}`}
      className="cs-card group flex w-full flex-col sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* a képek mind 4:5 arányúak, ezért vágás és szöveg nélkül, teljes egészében látszanak */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/10 bg-card shadow-md transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent group-hover:shadow-xl">
        <Image
          src={c.image}
          alt={c.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <p className="font-display text-3xl leading-none">{c.name}</p>
          <p className="mt-2 text-sm text-black/60">
            <span className="font-semibold text-black">{formatNumber(c.results.count)}</span> {c.results.unit} · 1 db ára{" "}
            <span className="font-semibold text-black">{formatHuf(c.results.costPer)}</span>
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-base text-white transition-transform duration-500 group-hover:-rotate-45">
          →
        </span>
      </div>
    </Link>
  );
}

export function CasesExplorer() {
  return (
    <>
      {/* hős-rész */}
      <section className="relative overflow-hidden bg-[#f8f9fa] px-6 pb-20 pt-36 text-center text-black sm:pt-44">
        <div aria-hidden className="pp-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[24rem] w-[50rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-accent/40 blur-[120px]"
        />
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meta3d/diagram.webp" alt="" className="animate-float-b mx-auto mb-6 w-40 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-60" />
          <h1 className="font-display mx-auto max-w-6xl text-[clamp(1.4rem,7.6vw,6rem)] leading-[1.12]">
            <span className="whitespace-nowrap">PAPÍRON MINDENKI JÓ.</span>
            <br />
            MI SZÁMOKKAL.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base text-[#5a5a5a] sm:text-lg">
            Valódi cégek, valódi hirdetési fiókok. Nyisd meg a kampányt, és nézd
            meg, mennyibe került egy megkeresés.
          </p>
        </div>
      </section>

      {/* kártyák */}
      <section className="bg-[#f8f9fa] px-4 pb-28 pt-12 text-black sm:px-8">
        <div className="mx-auto max-w-[110rem]">
          <p className="mb-6 text-sm text-black/50">
            Esettanulmányaikból:
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {cases.map((c, i) => (
              <CaseCard key={c.slug} c={c} index={i} />
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center text-xs text-black/40">
            Az adatok a Meta hirdetéskezelőből származnak, 2026. november 2-i
            állapot szerint. Az eredmények cégenként eltérhetnek.
          </p>
        </div>
      </section>

      <BottomCta />
    </>
  );
}
