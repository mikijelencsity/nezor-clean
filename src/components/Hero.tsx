import { NameStartForm } from "./NameStartForm";
import { MetaAnim } from "./MetaAnim";
import Velaris from "./ui/velaris";
import { HeroMotion } from "./HeroMotion";

// a hero és a logósáv tiszta fekete marad (a többi sötét szekció a --night árnyalatot kapja)
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
      {/* az alja pontosan a logósáv hátterébe fut ki, hogy ne legyen varrat */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      <div data-hero-dim className="pointer-events-none absolute inset-0 bg-black opacity-0" />
      <HeroMotion className="relative flex h-full flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        {/* a sortávolságnak a soron kell lennie: a text-* osztály különben felülírja 1-re */}
        <h1 className="font-display tracking-[0.02em] text-[#f8f9fa]">
          <span className="block text-5xl leading-[1.3] sm:text-7xl sm:leading-[1.3] md:text-8xl md:leading-[1.3]"><Words text="HA JÓ VAGY VALAMIBEN," /></span>
          <span className="mt-[0.15em] block text-5xl leading-[1.3] sm:text-7xl sm:leading-[1.3] md:text-8xl md:leading-[1.3]"><Words text="NE CSINÁLD INGYEN.*" /></span>
        </h1>
        <p data-hero-in className="max-w-xl text-base text-[#cfcfcf] sm:text-lg">
          Akár még sosem hirdettél, akár már csalódtál benne: mi csináljuk, te
          foglalkozz a vállalkozásoddal.
        </p>
        <NameStartForm data-hero-in="" />
        <p data-hero-in className="max-w-xl text-sm font-medium text-[#f8f9fa]/85">
          *A konzultációnk kivétel.
        </p>
        <span data-hero-in className="block">
          <MetaAnim className="mt-4 h-14 sm:mt-6 sm:h-[4.5rem]" />
        </span>
      </HeroMotion>
    </Velaris>
  );
}
