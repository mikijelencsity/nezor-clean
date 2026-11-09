import { Roll } from "./Roll";
import { MetaAnim } from "./MetaAnim";
import Velaris from "./ui/velaris";
import { HeroMotion } from "./HeroMotion";

const HERO_COLORS = ["#2f6fe0", "#1747a6", "#0a1f4d", "#000000"];

// Szavanként maszkba csomagolva, hogy a HeroMotion alulról felúsztathassa őket.
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i, a) => (
    <span key={i} className="-mt-[0.2em] inline-block overflow-hidden pt-[0.2em] align-bottom">
      <span data-hero-w className="inline-block">
        {w}
        {i < a.length - 1 ? " " : ""}
      </span>
    </span>
  ));
}

export function Hero() {
  return (
    <Velaris
      height="100svh"
      bg="#000000"
      colors={HERO_COLORS}
      speed={1.1}
      grain={0.12}
      className="relative bg-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div data-hero-dim className="pointer-events-none absolute inset-0 bg-black opacity-0" />
      <HeroMotion className="relative flex h-full flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <h1 className="font-display leading-[1.15] text-[#f8f9fa]">
          <span className="block text-5xl sm:text-7xl md:text-8xl"><Words text="MINT A BANKRABLÁS," /></span>
          <span className="block text-5xl sm:text-7xl md:text-8xl"><Words text="CSAK LEGÁLIS.*" /></span>
        </h1>
        <p data-hero-in className="max-w-xl text-base text-[#cfcfcf] sm:text-lg">
          Akár még sosem hirdettél, akár már csalódtál benne: mi csináljuk, te
          foglalkozz a vállalkozásoddal.
        </p>
        <form data-hero-in className="flex w-full max-w-xl overflow-hidden rounded-full bg-[#e9e9ea]">
          <span className="flex items-center pl-5 pr-2 text-lg">👋</span>
          <input
            type="email"
            placeholder="Írd be az emailed, küldünk egy kis 'varázslatot'..."
            className="flex-1 bg-transparent px-2 py-4 text-sm text-black placeholder:text-[#6b6b6b] outline-none"
          />
          <button
            type="submit"
            className="btn-roll roll-white group flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white"
          >
            <Roll label={<>Megyek <span aria-hidden>→</span></>} hover="Mehet! →" />
          </button>
        </form>
        <p data-hero-in className="max-w-xl text-sm font-medium text-[#f8f9fa]/85">
          *Maszk és menekülőautó nélkül. Bizonyított eredményekkel.
        </p>
        <span data-hero-in className="block">
          <MetaAnim className="mt-4 h-14 sm:mt-6 sm:h-[4.5rem]" />
        </span>
      </HeroMotion>
    </Velaris>
  );
}
