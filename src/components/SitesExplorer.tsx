"use client";

import { useState } from "react";
import Image from "next/image";
import { sites, siteKinds, type SiteKind, type SiteRef } from "@/data/sites";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-widest text-black/50">{children}</p>;
}

function SiteCard({ s, index }: { s: SiteRef; index: number }) {
  const host = new URL(s.url).hostname.replace(/^www\./, "");
  return (
    <article
      id={s.slug}
      className="cs-card scroll-mt-24 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(8,102,255,0.55)] sm:p-10"
      style={{ animationDelay: `${Math.min(index, 3) * 90}ms` }}
    >
      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
        {/* képernyőkép: 1200×960, vágás nélkül */}
        <a
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.name} oldalának megnyitása`}
          className="group relative block aspect-[5/4] w-full overflow-hidden rounded-3xl border border-black/10 bg-card lg:sticky lg:top-24"
        >
          <Image
            src={`/images/weboldalak/${s.img}.webp`}
            alt={`${s.name} weboldal`}
            fill
            sizes="(min-width: 1280px) 40rem, (min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>

        {/* történet */}
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-relaxed tracking-widest text-accent">
            {(s.kindLabel ?? s.kind).toUpperCase()} · {s.industry.toUpperCase()} · {s.subsegment.toUpperCase()}
            {s.location && ` · ${s.location.toUpperCase()}`}
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.5rem,9vw,2.25rem)] uppercase leading-[1.15] [overflow-wrap:anywhere] sm:text-6xl lg:text-5xl">
            {s.name}
          </h2>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block py-1.5 text-sm text-black/60 transition-colors hover:text-accent"
          >
            {host} <span aria-hidden>↗</span>
          </a>

          <p className="mt-5 text-lg font-medium leading-relaxed">{s.lead}</p>

          <div className="mt-7 grid gap-6">
            <div>
              <Label>HÁTTÉR</Label>
              <p className="mt-2 leading-relaxed text-[#4a4a4a]">{s.background}</p>
            </div>
            <div>
              <Label>AMIT ÉPÍTETTÜNK</Label>
              <p className="mt-2 leading-relaxed text-[#4a4a4a]">{s.solution}</p>
            </div>
            <div>
              <Label>AZ OLDALON</Label>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.features.map((f) => (
                  <li key={f} className="rounded-full border border-black/10 bg-[#f8f9fa] px-3.5 py-1.5 text-sm font-medium">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_14px_36px_-12px_rgba(8,102,255,0.8)]"
          >
            Megnézem az oldalt ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export function SitesExplorer() {
  const [active, setActive] = useState<SiteKind | null>(null);
  const shown = active ? sites.filter((s) => s.kind === active) : sites;
  const filters: { label: string; value: SiteKind | null }[] = [
    { label: "Mind", value: null },
    ...siteKinds.map((k) => ({ label: k === "Weboldal" ? "Weboldalak" : "Webáruházak", value: k })),
  ];

  return (
    <>
      {/* típusszűrő: görgetéskor fent marad */}
      <div className="sticky top-0 z-30 border-y border-black/10 bg-[#f8f9fa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:justify-center sm:px-8">
          {filters.map((f) => {
            const on = active === f.value;
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.value)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-black/10 bg-white text-black hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-[#f8f9fa] px-4 pb-28 pt-10 text-black sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold tracking-widest text-black/50">
            {active ? (active === "Weboldal" ? "WEBOLDALAK" : "WEBÁRUHÁZAK") : "WEBOLDALAK ÉS WEBÁRUHÁZAK"} · {shown.length} REFERENCIA
          </p>
          <div className="grid gap-8">
            {shown.map((s, i) => (
              <SiteCard key={s.slug} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
