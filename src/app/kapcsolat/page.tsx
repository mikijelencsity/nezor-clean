import type { Metadata } from "next";
import { Roll } from "@/components/Roll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Halo } from "@/components/Halo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kapcsolat | NEZOR",
  description:
    "Beszélgessünk 20 percet: kötelezettségmentes konzultáció Facebook hirdetésekről, 24 órán belül visszajelzünk.",
};

const bullets = [
  "Kötelezettségmentes 20 perces hívás",
  "24 órán belül visszajelzünk",
  "Személyre szabott elemzés",
];

// Fehéres, áttetsző „üveg” kártya lágy színátmenettel és belső fénnyel.
const glass =
  "relative overflow-hidden rounded-[2rem] border border-white/90 bg-gradient-to-br from-white/95 via-white/70 to-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_40px_90px_-40px_rgba(8,102,255,0.45)] backdrop-blur-xl";

const field =
  "w-full rounded-2xl border border-black/10 bg-white/90 px-5 py-4 text-base text-ink placeholder:text-ink/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export default function Kapcsolat() {
  return (
    <>
      <Header />
      <main className="pastel-bg relative overflow-hidden px-6 pb-28 pt-36 text-ink sm:pt-44">
        {/* lágy fehér fényfoltok a háttérben */}
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-white/80 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-[32rem] h-[30rem] w-[30rem] rounded-full bg-white/70 blur-[110px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/meta3d/buborek.webp"
            alt=""
            className="animate-float-a mx-auto mb-4 w-28 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-40"
          />
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-widest text-accent shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            KAPCSOLAT
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.6rem,8vw,6rem)] leading-[0.98]">
            BESZÉLGESSÜNK <span className="text-accent">20 PERCET.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-ink/65 sm:text-lg">
            Hová tűnnek az érdeklődőid? Miért nem vásárolnak eleget? A hívás után tudni fogod a válaszokat, és azt is, hogyan javíts rajta.
          </p>
        </div>

        <Reveal>
          <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={`${glass} flex flex-col justify-between gap-8 p-8 sm:p-10`}>
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
              <ul className="relative flex flex-col gap-4">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-base font-medium sm:text-lg">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-white shadow-[0_6px_14px_-4px_rgba(8,102,255,0.6)]">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="relative border-t border-ink/10 pt-8">
                <p className="mb-4 text-sm font-semibold tracking-widest text-ink/50">VAGY HÍVJ MINKET EGYENESEN</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:info@nezor.hu"
                    className="group flex items-center gap-4 rounded-2xl border border-white bg-white/70 p-3 pr-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#5aa2ff] text-white">
                      <MailIcon />
                    </span>
                    <span className="text-base font-semibold">info@nezor.hu</span>
                  </a>
                  <a
                    href="tel:+36704554703"
                    className="group flex items-center gap-4 rounded-2xl border border-white bg-white/70 p-3 pr-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#5aa2ff] text-white">
                      <PhoneIcon />
                    </span>
                    <span className="text-base font-semibold">+36 70 455 4703</span>
                  </a>
                </div>
              </div>
            </div>

            <form className={`${glass} flex flex-col gap-4 p-8 sm:p-10`}>
              <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#ffd6b8]/40 blur-3xl" />
              <h2 className="font-display relative text-3xl sm:text-4xl">KÉREK EGY RÖVID KONZULTÁCIÓT</h2>
              <p className="relative -mt-1 mb-2 text-sm text-ink/60">Három adat, és már jelentkezünk.</p>
              <input type="text" name="name" required autoComplete="name" placeholder="Neved *" className={`${field} relative`} />
              <input type="email" name="email" required autoComplete="email" placeholder="E-mail címed *" className={`${field} relative`} />
              <input type="tel" name="phone" required autoComplete="tel" placeholder="Telefonszámod *" className={`${field} relative`} />
              <div className="relative mt-4 flex justify-center">
                <Halo>
                  <button
                    type="submit"
                    className="btn-roll roll-dark rounded-full bg-accent px-9 py-4 text-base font-semibold text-white sm:text-lg"
                  >
                    <Roll label="Kérek egy rövid konzultációt →" hover="Küldés!" />
                  </button>
                </Halo>
              </div>
              <p className="relative mt-2 text-center text-xs text-ink/50">
                Az adatokat bizalmasan kezeljük, harmadik félnek nem adjuk át.
              </p>
            </form>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
