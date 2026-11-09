import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";

// Egyenes beszéd: szakszó → emberül (lapos lista), alatta két egyenes állítás. Csili-vili nélkül.
const dictionary = [
  {
    jargon: "360 fokos kommunikációs stratégia",
    human: "Kitaláljuk, ki vásárolna tőled, és megmutatunk neki téged.",
  },
  {
    jargon: "Konverziós tölcsér optimalizálása",
    human: "Aki rákattint, az ajánlatot kér, nem csak nézelődik.",
  },
  {
    jargon: "Havi riport (42 oldalas PDF)",
    human: "Két mondatban megírjuk, mennyit hozott. A többit úgysem olvasnád el.",
  },
  {
    jargon: "Célcsoport-szegmentálás",
    human: "Nem mindenkinek hirdetünk, hanem annak, aki tényleg vehetne tőled.",
  },
  {
    jargon: "Skálázható megoldás",
    human: "Ha működik, még több pénzt rakunk rá. Ha nem, megmondjuk, és nem toljuk tovább.",
  },
];

const statements = [
  {
    title: "A NEHEZÉT MI CSINÁLJUK.",
    text: "Célzás, kreatív, szöveg, beállítás, optimalizálás. Te csak az ügyfelekkel foglalkozol.",
  },
  {
    title: "NEKÜNK AKKOR ÉRI MEG, HA NEKED IS.",
    text: "Ha több pénzt akarsz keresni, jó helyen jársz. Ha nem, nem érdemes velünk dolgoznod, és ezt még szívesen el is mondjuk.",
  },
];

export function StraightTalk() {
  return (
    <section className="px-6 py-24 text-black sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-center text-[clamp(2.25rem,8vw,5.5rem)] leading-none">
          EGYENESEN MONDJUK.
        </h2>
        <p className="mx-auto mb-12 mt-5 max-w-xl text-center text-base text-[#5a5a5a] sm:text-lg">
          Az ügynökségi nyelvet lefordítottuk. Így hangzik ugyanez emberül.
        </p>

        <ul className="border-t border-black/15">
          {dictionary.map((d) => (
            <li
              key={d.jargon}
              className="grid gap-2 border-b border-black/15 py-6 md:grid-cols-[2fr_3fr] md:items-baseline md:gap-10 md:py-7"
            >
              <span className="text-base font-medium text-black/70 line-through decoration-black/40 decoration-1 sm:text-lg">
                {d.jargon}
              </span>
              <span className="font-display text-2xl leading-[1.1] sm:text-3xl">{d.human}</span>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex flex-col gap-12">
          {statements.map((s) => (
            <div key={s.title} className="border-l-[6px] border-accent pl-6 sm:pl-8">
              <h3 className="font-display text-3xl leading-none sm:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4a4a4a] sm:text-xl">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meta3d/szivlajk.webp" alt="" className="animate-float-a mx-auto mb-6 w-44 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-56" />
          <Halo>
            <OpenWizardButton hover="Most. Most kell." className="rounded-full bg-accent px-10 py-5 text-xl font-semibold text-white sm:px-14 sm:py-6 sm:text-2xl">
              Na, mikor fogod megnyomni?
            </OpenWizardButton>
          </Halo>
        </div>
      </div>
    </section>
  );
}
