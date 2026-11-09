export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="flex flex-col items-center gap-5 bg-black px-6 pt-32 pb-16 text-center text-[#f8f9fa]">
      <p className="text-xs font-semibold tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1 className="font-display max-w-3xl text-4xl leading-[0.95] sm:text-6xl">
        {title}
      </h1>
      <p className="max-w-xl text-sm text-[#cfcfcf] sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}
