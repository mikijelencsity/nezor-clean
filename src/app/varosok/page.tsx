import { OpenWizardButton } from "@/components/OpenWizardButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const bacsKiskun = [
  "Kecskemét", "Baja", "Kalocsa", "Kiskunfélegyháza", "Kiskunhalas",
  "Kiskunmajsa", "Kiskőrös", "Kunszentmiklós", "Tiszakécske", "Lajosmizse",
  "Dunavecse", "Soltvadkert", "Jánoshalma",
];

const bigCities = [
  "Budapest", "Debrecen", "Miskolc", "Pécs", "Győr", "Nyíregyháza",
  "Szeged", "Székesfehérvár", "Szombathely", "Szolnok", "Eger", "Veszprém",
  "Zalaegerszeg", "Kaposvár", "Sopron", "Érd", "Tatabánya", "Dunaújváros",
  "Esztergom", "Szekszárd", "Cegléd", "Hódmezővásárhely",
];

function CityGrid({ cities }: { cities: string[] }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {cities.map((c) => (
        <div
          key={c}
          className="group flex min-w-0 flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-5 transition-all hover:-translate-y-1 hover:border-accent/50 sm:px-5"
        >
          <p className="font-display text-[clamp(0.8rem,3.85vw,1.125rem)] leading-tight text-white [overflow-wrap:anywhere] sm:text-lg">{c}</p>
          <p className="text-xs leading-relaxed text-white/55">
            Weboldal · Webshop · Facebook hirdetés · Google hirdetés
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Varosok() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="LEFEDETTSÉG"
          title="WEBOLDAL ÉS HIRDETÉS KEZELÉS VÁROSONKÉNT"
          subtitle="Weboldal készítés, webshop fejlesztés, Facebook és Google hirdetés kezelés Bács-Kiskun megyétől az egész országig. Válaszd ki a városodat."
        />
        <Reveal>
          <section className="bg-night px-6 pb-16 text-[#f8f9fa]">
            <h2 className="mb-8 text-center font-display text-3xl">
              BÁCS-KISKUN MEGYE
            </h2>
            <CityGrid cities={bacsKiskun} />
          </section>
        </Reveal>
        <Reveal>
          <section className="bg-night px-6 pb-24 text-[#f8f9fa]">
            <h2 className="mb-8 text-center font-display text-3xl">
              MAGYARORSZÁG — NAGYOBB VÁROSOK
            </h2>
            <CityGrid cities={bigCities} />
            <div className="mt-16 text-center">
              <p className="mb-4 text-sm">
                A TE VÁROSOD NINCS A LISTÁN? AZ SEM AKADÁLY.
              </p>
              <OpenWizardButton hover="Ez az!" className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white">
                Kérek egy ajánlatot
              </OpenWizardButton>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
