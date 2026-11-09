// "Jó így könnyű..." szekció: kimondja az ellenvetést (jött-ment embert nem nehéz szerezni), és megmutatja, miért mások a mi érdeklődőink.

type Props = { count: number; unit: string };

function Bubble({ who, side, children }: { who: string; side: "left" | "right"; children: React.ReactNode }) {
  const right = side === "right";
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[92%] sm:max-w-[78%]">
        <p className={`mb-1.5 text-xs font-semibold tracking-[0.25em] text-black/45 ${right ? "text-right" : ""}`}>{who}</p>
        <div
          className={`rounded-3xl px-6 py-5 text-lg leading-snug sm:px-8 sm:py-6 sm:text-2xl ${
            right
              ? "rounded-br-lg bg-gradient-to-b from-[#2f84ff] to-[#0866ff] text-white shadow-[0_20px_44px_-20px_rgba(8,102,255,0.8)]"
              : "rounded-bl-lg bg-white text-black shadow-[0_14px_34px_-18px_rgba(0,0,0,0.3)]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Row({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base sm:text-lg">
      <span
        aria-hidden
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-black ${
          ok ? "bg-accent text-white" : "bg-black/10 text-black/40"
        }`}
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className={ok ? "font-semibold text-black" : "text-black/55"}>{children}</span>
    </li>
  );
}

export function IgenDe({ count, unit }: Props) {
  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="font-display text-6xl leading-none sm:text-8xl">JÓ ÍGY KÖNNYŰ...</h2>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Bubble who="TE" side="left">
          Jó így könnyű. {count} {unit}? Jött-ment embert bárki össze tud szedni.
        </Bubble>
        <Bubble who="MI" side="right">
          Igazad van, így tényleg könnyű. Egy harsány hirdetés, és ott a tömeg: a kíváncsiskodók, a „mit nyomtam meg?” típus, meg aki
          véletlenül ráhúzta az ujját a telefonra.
        </Bubble>
        <Bubble who="MI" side="right">
          Csakhogy mi nem tömeget gyűjtünk. Nálunk csak az érkezik meg, aki végigolvasta az ajánlatot, kitöltötte az űrlapot, megadta az
          elérhetőségét, és leírta, pontosan mit szeretne.
        </Bubble>
        <Bubble who="MI" side="right">
          Szóval ez nem a „jó így könnyű” eset. Ez az a fajta nehéz, amit mi csinálunk meg helyetted.
        </Bubble>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-7 sm:p-9">
          <p className="font-display text-3xl leading-none text-black/50 sm:text-4xl">A VÉLETLEN KATTINTÁS</p>
          <ul className="mt-6 flex flex-col gap-4">
            <Row ok={false}>Megcsúszott az ujja a telefonon</Row>
            <Row ok={false}>Nem tudja, mit nyomott meg</Row>
            <Row ok={false}>Semmilyen adatot nem hagy</Row>
            <Row ok={false}>Neked kell kitalálnod, mit akar</Row>
          </ul>
        </div>
        <div className="rounded-3xl bg-black p-7 text-white shadow-[0_30px_70px_-30px_rgba(8,102,255,0.7)] sm:p-9">
          <p className="font-display text-3xl leading-none text-[#6fa2ff] sm:text-4xl">A MI ÉRDEKLŐDŐNK</p>
          <ul className="mt-6 flex flex-col gap-4 [&_span:last-child]:!text-white">
            <Row ok>Rákattintott a hirdetésre</Row>
            <Row ok>Elolvasta, miről szól</Row>
            <Row ok>Kitöltötte az űrlapot</Row>
            <Row ok>Megadta az elérhetőségét</Row>
            <Row ok>Leírta, pontosan mire van szüksége</Row>
          </ul>
        </div>
      </div>

      <p className="font-display mx-auto mt-12 max-w-3xl text-center text-3xl leading-tight sm:text-5xl">
        Ezért ér többet egy ilyen {unit}, mint száz véletlen kattintás.
      </p>
    </div>
  );
}
