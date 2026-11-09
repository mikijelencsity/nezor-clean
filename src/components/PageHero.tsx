// Aloldali fejléc. `black`: a főoldali hero tiszta feketéje (pl. az Árak oldalon); alapból a --night árnyalat,
// hogy a Városok oldalon a fejléc egybefolyjon az alatta lévő sötét szekciókkal.
// `compact`: kisebb alsó térköz, és a cím egy sorban marad (a betűméret a képernyő szélességéhez igazodik).
export function PageHero({
  eyebrow,
  title,
  subtitle,
  black = false,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  black?: boolean;
  compact?: boolean;
}) {
  return (
    <section
      className={`flex flex-col items-center gap-5 px-6 pt-32 text-center text-[#f8f9fa] ${compact ? "pb-4" : "pb-16"} ${black ? "bg-black" : "bg-night"}`}
    >
      <p className="text-xs font-semibold tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1
        className={`font-display leading-[1.15] ${
          compact ? "whitespace-nowrap text-[clamp(1.5rem,7.2vw,4rem)]" : "max-w-3xl text-4xl sm:text-6xl"
        }`}
      >
        {title}
      </h1>
      <p className="max-w-xl text-sm text-[#cfcfcf] sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}
