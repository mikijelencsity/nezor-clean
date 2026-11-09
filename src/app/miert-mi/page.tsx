import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Halo } from "@/components/Halo";
import { Header } from "@/components/Header";
import { HorizonDivider } from "@/components/HorizonDivider";
import { OpenWizardButton } from "@/components/OpenWizardButton";
import { Reveal } from "@/components/Reveal";
import { cases, formatCount, formatHuf } from "@/data/cases";
import { howItWorksSteps } from "@/data/howItWorks";

export const metadata: Metadata = {
  title: "Kisokos | NEZOR",
  description:
    "Tényleg hoz ügyfelet egy Facebook-hirdetés? Elmagyarázzuk, hogyan működik, megmutatjuk két saját ügyfelünk számait, a döntést pedig rád bízzuk.",
};

// A számok közvetlenül az esettanulmányok adataiból jönnek, így mindig egyeznek a listával.
function pick(slug: string) {
  const c = cases.find((x) => x.slug === slug);
  if (!c) throw new Error(`Hiányzó esettanulmány: ${slug}`);
  return c;
}

const myth = [
  { slug: "mobilhazgyarto", text: "Mobilház, ami több millió forintba kerül." },
  { slug: "cupseal", text: "Dobozzáró gép, amit vállalkozások vesznek." },
  { slug: "kingjet", text: "UV-nyomtató, ami milliós tétel." },
  { slug: "arokto", text: "Senior rezidencia, amit a családok alaposan megfontolnak." },
].map(({ slug, text }) => ({ ...pick(slug), text }));

const steps = howItWorksSteps;

const examples = [
  {
    ...pick("toth-tamas"),
    title: "Egy térkövező, napi 2 000 forintból.",
    story: [
      "Tóth Tamás egyéni vállalkozó. Térkövezés, betonozás, földmunka, kertépítés.",
      "A kapacitása véges, ezért nem tömeg kellett neki, hanem komoly megrendelők a környékről.",
      "Az elkészült munkáit mutattuk meg a helyi lakosoknak.",
    ],
  },
  {
    ...pick("mobilhazgyarto"),
    title: "Egy gyártó, akinek egy eladott ház több millió.",
    story: [
      "Mobil- és konténerházakat gyárt. Már egyetlen új megrendelő is rengeteg pénzt hoz neki.",
      "Két külön célcsoportot építettünk: lakossági vevőket és ipari megrendelőket, például büfékhez és telephelyi irodákhoz.",
      "Mindkettő a saját üzenetét kapta.",
    ],
  },
];

function Question({ children, className = "text-[clamp(1.9rem,8.4vw,5rem)]" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-display mb-8 leading-[1.15] sm:mb-10 ${className}`}>{children}</h2>;
}

function Lines({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-5 text-xl leading-snug sm:gap-7 sm:text-[1.65rem]">{children}</div>;
}

export default function MiertMi() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-[#f8f9fa] text-black">
        {/* az alapkérdés */}
        <section className="relative overflow-hidden px-6 pb-16 pt-36 sm:pb-24 sm:pt-44">
          <div aria-hidden className="pp-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-24 h-[24rem] w-[50rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-accent/40 blur-[120px]"
          />
          {/* a cím két sorban; a kérdőjel helyén a 3D kérdőjel áll, közvetlenül a szöveg mellett */}
          <div className="relative mx-auto w-fit max-w-full">
            <h1 className="font-display text-center text-[clamp(1.25rem,7.2vw,5rem)] leading-[1.1]">
              <span className="block whitespace-nowrap">TÉNYLEG HOZ ÜGYFELET</span>
              <span className="block whitespace-nowrap">
                EGY FACEBOOK-HIRDETÉS
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/meta3d/kerdojel.webp"
                  alt="?"
                  className="animate-float-b ml-[0.06em] inline-block h-[0.95em] w-auto select-none align-baseline drop-shadow-[0_14px_18px_rgba(8,102,255,0.28)]"
                />
              </span>
            </h1>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="mt-12 sm:mt-16">
              <Lines>
                <p>Jogos kérdés.</p>
                <p>Kívülről úgy néz ki, mintha pénzt öntenél a Facebookba, aztán reménykednél.</p>
                <p className="font-bold">A rövid válasz: igen, hoz. Ha jól csinálják.</p>
                <p>A hirdetés nem csoda. Csak egy tábla, amit pontosan azok elé teszünk, akik vehetnének tőled.</p>
                <p>A hosszabb választ most elmondjuk. Számokkal.</p>
              </Lines>
            </div>
          </div>
        </section>

        {/* a mítosz */}
        <section className="px-6 pb-20 sm:pb-28">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold tracking-widest text-accent">A MÍTOSZ</p>
              <Question>„AZ ÉN IPARÁGAMBAN EZ NEM MŰKÖDNE.”</Question>
              <Lines>
                <p>Biztos te is gondoltad már.</p>
                <p>Hogy a Facebook a macskás videók helye. Hogy komoly dologról ott senki nem érdeklődik.</p>
                <p>Akkor nézzük, miről érdeklődtek eddig:</p>
              </Lines>
              <ul className="my-8 border-t border-black/15 sm:my-10">
                {myth.map((m) => (
                  <li key={m.slug} className="grid gap-1 border-b border-black/15 py-5 sm:grid-cols-[15rem_1fr] sm:items-baseline sm:gap-6">
                    <span className="font-display text-4xl leading-none text-accent sm:text-5xl">{formatCount(m.results.count)}</span>
                    <span className="text-lg leading-snug sm:text-xl">
                      <strong>{m.results.unit}.</strong> {m.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Lines>
                <p className="font-bold">Nem az iparág dönti el. Hanem az, hogy annak mutatod-e, akinek kell, és azt mondod-e neki, ami érdekli.</p>
              </Lines>
            </div>
          </Reveal>
        </section>

        {/* hogyan működik */}
        <section className="px-6 pb-20 sm:pb-28">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              {/* egy sorban marad: a szélessége kb. 12,1 × betűméret, ezért a betűméret a hasábhoz (max. 768 px) igazodik */}
              <Question className="whitespace-nowrap text-[clamp(1.25rem,calc((100vw-3rem)/12.4),3.9rem)]">JÓ, DE HOGY MŰKÖDIK EZ?</Question>
              <Lines>
                <p>Négy lépés. Semmi varázslat.</p>
              </Lines>
              <ol className="mt-8 grid gap-8 sm:mt-10 sm:gap-10">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
                    <span aria-hidden className="font-display text-5xl leading-none text-accent sm:text-7xl">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">{s.title}</h3>
                      <p className="mt-2 text-lg leading-snug text-[#4a4a4a] sm:text-xl">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        {/* két saját példa */}
        <HorizonDivider from="#f8f9fa" to="#212121" flip />
        <section className="bg-night px-6 py-16 text-[#f8f9fa] sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <Question>MUTASSUK MEG.</Question>
              <div className="grid gap-6 lg:grid-cols-2">
                {examples.map((c) => (
                  <article key={c.slug} className="flex flex-col rounded-3xl border border-white/15 bg-white/[0.06] p-6 sm:p-8">
                    <p className="text-sm font-semibold text-[#7fb0ff]">{c.name}</p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">{c.title}</h3>
                    <div className="mt-4 flex flex-1 flex-col gap-3 text-lg leading-snug text-white/80">
                      {c.story.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 min-[400px]:grid-cols-3">
                      {[
                        { label: c.results.unit, value: formatCount(c.results.count) },
                        { label: c.results.costPerLabel ?? "1 db ára", value: formatHuf(c.results.costPer) },
                        { label: c.results.spendLabel, value: formatHuf(c.results.spend) },
                      ].map((s) => (
                        <div key={s.label} className="min-w-0">
                          <dt className="text-xs leading-tight text-white/60 first-letter:uppercase">{s.label}</dt>
                          <dd className="font-display mt-1.5 whitespace-nowrap text-[clamp(0.95rem,4.2vw,1.4rem)] leading-none text-[#7fb0ff]">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
              <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
                <Lines>
                  <p>Az ajánlatkérés még nem eladás. A telefont neked kell felvenned.</p>
                  <p className="font-bold">De legalább csörög.</p>
                </Lines>
              </div>
            </div>
          </Reveal>
        </section>
        <HorizonDivider from="#212121" to="#f8f9fa" />

        {/* neked is megcsinálható */}
        <section className="px-6 pb-20 pt-12 sm:pb-28 sm:pt-16">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <Question>EZ NÁLAM IS MEGCSINÁLHATÓ?</Question>
              <Lines>
                <p className="font-bold">Igen.</p>
                <p>Ugyanez a négy lépés. Más lesz a célcsoport, más lesz az üzenet, és más lesz a szám.</p>
                <p>Ugyanezt a számot nem ígérjük. Ne higgy annak, aki úgy ígér számot, hogy még nem látta a vállalkozásodat.</p>
                <p>A térkövezőnél is ezt csináltuk. A mobilházgyártónál is. Nálad is ezt csinálnánk.</p>
                <p>Több mint 12 000 óra van már mögötte, így nem a te pénzeden tanuljuk meg.</p>
              </Lines>
            </div>
          </Reveal>
        </section>

        {/* miért mi: rád bízzuk */}
        <section className="px-6 pb-20 sm:pb-28">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <Question>ÉS MIÉRT PONT MI?</Question>
              <Lines>
                <p className="font-bold">Ezt rád bízzuk.</p>
                <p>Nem írunk ide hosszú listát arról, mennyire jók vagyunk. Azt mindenki leírja.</p>
                <p>Itt vannak a számok. Itt a módszer. Több mint 50 magyar vállalkozásnak csináltuk már.</p>
                <p>A díjunk havi 79&nbsp;000&nbsp;Ft, plusz a hirdetési keret, amit közvetlenül a Metának fizetsz.</p>
                <p>Beszéljünk 20 percet, ingyen, kötelezettség nélkül. Megnézzük a vállalkozásodat, és elmondjuk, mit csinálnánk.</p>
                <p>Aztán eldöntöd.</p>
              </Lines>
              {/* a gomb a szöveg alá, balra igazítva, mint a bekezdések */}
              <div className="mt-10 text-left">
                <Halo>
                  <OpenWizardButton
                    service="hirdetes"
                    hover="Na, lássuk!"
                    className="font-display rounded-full bg-accent px-10 py-6 text-2xl tracking-wide text-white sm:px-16 sm:text-3xl"
                  >
                    BESZÉLJÜNK 20 PERCET
                  </OpenWizardButton>
                </Halo>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
