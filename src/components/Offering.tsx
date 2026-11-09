"use client";

import { Roll } from "./Roll";
import type { Advertised } from "./ContactWizard";
import { useContactWizard } from "./ContactWizardProvider";
import { PartnerLogos } from "./PartnerLogos";

const offers: {
  advertised: Advertised;
  eyebrow: string;
  title: string;
  desc: string;
  reviews: string;
}[] = [
  {
    advertised: "nem",
    eyebrow: "MÉG SOHA NEM HIRDETTÉL?",
    title: "0-RÓL KEZDJÜK",
    desc: "Az alapoktól felépítjük a Facebook és Instagram hirdetéseidet: célzás, kreatív, szöveg, optimalizálás. Te a rendeléseket intézed, mi a forgalmat.",
    reviews: "Kötelezettségmentes ajánlat",
  },
  {
    advertised: "igen",
    eyebrow: "MÁR HIRDETTÉL?",
    title: "MÁR HIRDETTEM",
    desc: "20 perces ingyenes hívás, amiben megmutatjuk, hol szivárog most a pénz a hirdetéseidnél, és hogyan javíthatunk rajta.",
    reviews: "Semmilyen elköteleződéssel nem jár",
  },
];

export function Offering() {
  const openWizard = useContactWizard();

  return (
    <section className="px-6 py-20 text-center text-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/vegtelen-3d.webp"
        alt=""
        className="animate-float-b mx-auto mb-4 w-52 select-none drop-shadow-[0_24px_30px_rgba(8,102,255,0.22)] sm:w-72"
      />
      <p className="font-display mb-12 text-4xl leading-[1.15] text-black sm:text-6xl">
        VÁLASZD KI, HOGYAN INDULJUNK
      </p>
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2">
        {offers.map((o) => (
          <div
            key={o.title}
            className="group relative flex flex-col items-center gap-6 rounded-3xl border border-black/10 bg-white p-12 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-md sm:min-h-[26rem] sm:justify-center"
          >
            {o.advertised === "nem" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/meta3d/buborek.webp"
                alt=""
                className="animate-float-a pointer-events-none absolute -left-4 -top-10 w-24 -rotate-6 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:-left-8 sm:-top-12 sm:w-32"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/meta3d/nagyito.webp"
                alt=""
                className="animate-float-b pointer-events-none absolute -right-6 -top-[4.75rem] w-28 rotate-6 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:-right-16 sm:-top-28 sm:w-40"
              />
            )}
            <p className="text-sm font-medium text-[#8a8a8a]">{o.eyebrow}</p>
            <h3 className="font-display text-5xl sm:text-6xl">{o.title}</h3>
            <p className="text-lg text-[#5a5a5a]">{o.desc}</p>
            <button
              onClick={() => openWizard({ advertised: o.advertised })}
              className="btn-roll roll-dark rounded-full bg-accent px-10 py-4 text-base font-semibold text-white">
              <Roll label="Foglalok időpontot" hover="Na végre!" />
            </button>
            <p className="text-sm text-[#8a8a8a]">{o.reviews}</p>
          </div>
        ))}
      </div>

      <p className="mt-20 text-xs font-semibold tracking-widest text-black/50 sm:mt-28">EDDIGI PROJEKTJEINK:</p>
      <PartnerLogos />
    </section>
  );
}
