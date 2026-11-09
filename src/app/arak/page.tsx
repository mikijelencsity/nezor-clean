import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { OpenWizardButton } from "@/components/OpenWizardButton";
import { Halo } from "@/components/Halo";
import { HorizonDivider } from "@/components/HorizonDivider";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/components/ContactWizard";
import { formatHuf } from "@/data/cases";
import { AD_FEE_DISCOUNTED_HUF, AD_FEE_HUF } from "@/data/offers";

export const metadata: Metadata = {
  title: "Árak | NEZOR",
  description:
    "Weboldal, webshop és Facebook-hirdetéskezelés. A hirdetéskezelés fix havi díjas, a weboldalt és a webshopot a te igényeidhez árazzuk.",
};

type Plan = {
  /** a kártya gombja ezzel a szolgáltatással nyitja a kérdéssort */
  service: Service;
  tag: string;
  title: string;
  lead: string;
  /** fix havi ár; ha nincs, egyedi ajánlat */
  price?: string;
  /** rövid címkék, kártyánként legfeljebb három */
  chips: string[];
  /** a kártya teteje: referencia-mockup vagy 3D figura */
  visual: { kind: "photo"; src: string; alt: string } | { kind: "figure"; src: string };
  refs: { label: string; href: string };
  cta: string;
  featured?: boolean;
};

// Középen a hirdetéskezelés (fix ár, sötét kiemelt kártya), két oldalán a weboldal és a webshop egy-egy valódi
// referencia-mockuppal. A címkék a korábbi, hosszabb felsorolások rövidítései (src/data/sites.ts).
const plans: Plan[] = [
  {
    service: "weboldal",
    tag: "WEBOLDAL",
    title: "Weboldal",
    lead: "Bemutatkozó oldal, ami megkeresést hoz.",
    chips: ["Ajánlatkérő űrlap", "Referenciák, galéria", "Több nyelv"],
    visual: { kind: "photo", src: "/images/weboldalak/komar.webp", alt: "A Komár és Fia Kft. weboldala laptopon és telefonon" },
    refs: { label: "Weboldal-referenciák", href: "/weboldalak" },
    cta: "Ajánlatot kérek",
  },
  {
    service: "hirdetes",
    tag: "FACEBOOK · INSTAGRAM",
    title: "Hirdetés",
    lead: "Mindent mi csinálunk, te az érdeklődőkkel foglalkozol.",
    price: formatHuf(AD_FEE_HUF),
    chips: ["Érdeklődőgyűjtő oldal", "Kész elérhetőségek", "Heti beszámoló"],
    visual: { kind: "figure", src: "/images/meta3d/raketa.webp" },
    refs: { label: "Esettanulmányok", href: "/esettanulmanyok" },
    cta: "Kérek egy konzultációt",
    featured: true,
  },
  {
    service: "webshop",
    tag: "WEBSHOP",
    title: "Webshop",
    lead: "Online bolt, ahol a vevő megrendeli, amit árulsz.",
    chips: ["Kosár, termékváltozatok", "Vásárlói fiók", "Külföldi szállítás"],
    visual: { kind: "photo", src: "/images/weboldalak/cruisershop.webp", alt: "A CruiserShop webshopja laptopon és telefonon" },
    refs: { label: "Webshop-referenciák", href: "/weboldalak" },
    cta: "Ajánlatot kérek",
  },
];

const priceFaqs = [
  {
    q: "Mennyibe kerül egy weboldal vagy webshop?",
    a: "Attól függ, mekkora és mit kell tudnia: egy bemutatkozó oldal más, mint egy több száz termékes bolt. A 20 perces hívásban átbeszéljük, mire van szükséged, és utána árajánlatot küldünk.",
  },
  {
    q: "Van havi díj a hirdetéskezelésre? Mit fedez?",
    a: "Igen, havi 79 000 Ft, ez a hirdetéskezelés díja — a hirdetési költségtől külön. Ebbe tartozik a célzás, a kreatívok, a szövegírás, az optimalizálás és a heti egyeztetés. Nem tűnünk el, miután megkaptuk a pénzt.",
  },
  {
    q: "Mennyi a Facebook hirdetési költség?",
    a: "Ez a te büdzsédtől függ, nem a mienktől. Van, aki napi 3.000 Ft-ból indul, van, aki többől. Az első hívásban közösen kitaláljuk, mennyi az értelmes kezdő összeg a te iparágadban — nem sózunk rád felesleges nagyságrendet.",
  },
];

function Visual({ p }: { p: Plan }) {
  if (p.visual.kind === "photo") {
    return (
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.visual.src}
          alt={p.visual.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <p className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold tracking-widest text-black backdrop-blur">
          {p.tag}
        </p>
      </div>
    );
  }
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem] bg-[radial-gradient(120%_90%_at_50%_100%,#0866ff_0%,#0a2a6b_45%,#0b0b0f_100%)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.visual.src}
        alt=""
        className="animate-float-a absolute left-1/2 top-[26%] h-[70%] w-auto -translate-x-1/2 rotate-12 select-none drop-shadow-[0_30px_40px_rgba(8,102,255,0.6)]"
      />
      {/* a rakéta a címkék alatt kezdődik, hogy ne lógjanak bele */}
      <p className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold tracking-widest text-white">{p.tag}</p>
      <p className="absolute right-4 top-4 z-10 hidden rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-bold tracking-widest text-white/90 backdrop-blur min-[420px]:block">
        FIX HAVIDÍJ
      </p>
    </div>
  );
}

function PlanCard({ p }: { p: Plan }) {
  const dark = p.featured;
  return (
    <article
      className={`group relative flex h-full flex-col rounded-[2rem] p-3 transition-transform duration-300 hover:-translate-y-1.5 ${
        dark
          ? "bg-night text-white shadow-[0_40px_90px_-30px_rgba(8,102,255,0.75)] ring-1 ring-white/10 lg:-my-6"
          : "bg-white text-black shadow-[0_30px_70px_-40px_rgba(8,102,255,0.55)] ring-1 ring-black/5"
      }`}
    >
      <Visual p={p} />

      <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5">
        {/* a cím alatt az ár, egymás alatt: három oszlopban egymás mellett nem fértek ki */}
        <h2 className="font-display text-[clamp(2.4rem,11vw,3rem)] uppercase leading-none">{p.title}</h2>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-2 leading-none">
          <span className={`font-display whitespace-nowrap text-[2rem] ${p.price ? "text-accent-soft" : "text-accent"}`}>{p.price ?? "EGYEDI ÁR"}</span>
          <span className={`text-xs font-semibold tracking-widest ${dark ? "text-white/55" : "text-black/45"}`}>
            {p.price ? "/ HÓ" : "/ HÍVÁS UTÁN"}
          </span>
        </p>

        <p className={`mt-3 text-[0.95rem] leading-snug ${dark ? "text-white/70" : "text-[#5a5a5a]"}`}>{p.lead}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {p.chips.map((c) => (
            <li
              key={c}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
                dark ? "bg-white/10 text-white" : "bg-accent/[0.07] text-black"
              }`}
            >
              <span aria-hidden className="text-accent-soft">✓</span>
              {c}
            </li>
          ))}
        </ul>

        {p.price && <p className="mt-4 text-xs leading-relaxed text-white/50">+ hirdetési keret, amit közvetlenül a Metának fizetsz</p>}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-7">
          <OpenWizardButton
            service={p.service}
            hover="Mehet!"
            tone={dark ? "white" : undefined}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white sm:text-base"
          >
            {p.cta}
          </OpenWizardButton>
          <Link
            href={p.refs.href}
            className={`text-sm font-semibold underline-offset-4 transition-colors hover:underline ${dark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-accent"}`}
          >
            {p.refs.label} →
          </Link>
        </div>
      </div>
    </article>
  );
}

// a kártyák alatt: weboldal + hirdetés együtt, az első havi díj fele
function Bundle() {
  return (
    <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-4 rounded-full border-2 border-dashed border-accent/40 bg-white/70 px-6 py-5 text-center backdrop-blur sm:flex-row sm:justify-center sm:gap-6 sm:py-4 sm:text-left">
      <p className="font-display flex items-center gap-2 text-2xl leading-none">
        WEBOLDAL <span className="text-accent">+</span> HIRDETÉS
      </p>
      <p className="text-sm font-semibold text-[#4a4a4a] sm:text-base">
        Első havi hirdetéskezelés <span className="text-black/45 line-through">{formatHuf(AD_FEE_HUF)}</span>{" "}
        <span className="font-display text-xl text-accent">{formatHuf(AD_FEE_DISCOUNTED_HUF)}</span>
      </p>
    </div>
  );
}

export default function Arak() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          black
          compact
          eyebrow="ÁRAK"
          title="SZOLGÁLTATÁSAINK ÁRAZÁSA"
          subtitle="A hirdetéskezelés fix havi díjas. A weboldalt és a webshopot a te igényeidhez árazzuk."
        />
        <HorizonDivider from="#000000" to="#f8f9fa" tight />
        <div className="pastel-flow-img px-4 pb-28 pt-4 text-black sm:px-6 sm:pb-36 lg:pt-10">
          <Reveal>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
              {plans.map((p) => (
                <PlanCard key={p.tag} p={p} />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Bundle />
          </Reveal>

          <Reveal>
            <section className="mx-auto mt-24 max-w-3xl">
              <h2 className="font-display text-center text-3xl leading-[1.15] sm:text-5xl">AMIT AZ ÁRRÓL KÉRDEZNI SZOKTAK</h2>
              <dl className="mt-10 grid gap-5">
                {priceFaqs.map((f) => (
                  <div key={f.q} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(8,102,255,0.55)] sm:p-8">
                    <dt className="text-lg font-extrabold leading-tight sm:text-xl">{f.q}</dt>
                    <dd className="mt-3 leading-relaxed text-[#4a4a4a] sm:text-lg">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <div className="mt-20 text-center">
            <p className="mb-6 text-lg font-semibold sm:text-xl">Nem tudod, melyik kell? Beszéljük meg 20 percben, ingyen.</p>
            <Halo>
              <OpenWizardButton hover="Mehet!" className="rounded-full bg-accent px-10 py-5 text-xl font-semibold text-white sm:px-14 sm:py-6 sm:text-2xl">
                Kérek egy konzultációt
              </OpenWizardButton>
            </Halo>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
