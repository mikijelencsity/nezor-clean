const paragraphs = [
  "Frissítve: 2026. október",
  "Kedves vállalkozó,",
  "Tudjuk, hogy nehéz.",
  "Jó, amit csinálsz. És jól csinálod.",
  "Csak épp a telefon nem csörög.",
  "Vagy csak az csörög,",
  "aki két perc alatt összedobott neked",
  "egy minősíthetetlen weboldalt,",
  "és azt ígérte, hogy ez rengeteg ügyfelet hoz.",
  "(Nem fog, legalábbis nem ez a tapasztalatunk 😬)",
  "Mert a legszebb weboldal is csak egy bolt a zsákutca végén.",
  "Szép. Jól felszerelt. Csak épp nem jár arra senki.",
  "A hirdetés az a tábla, ami odairányítja az embereket.",
  "Ezért kell a hirdetés.",
  "Ügyfelet találni a legnehezebb az egészben.",
  "Ezt senki nem tanítja meg.",
  "Mégis ez dönti el, marad-e a vállalkozás.",
  "Mindenkinek van hozzá tanácsa.",
  "A baj az, hogy mindegyik más.",
  "Próbálkoztál.",
  "Szóltál az ismerősöknek.",
  "Az ismerősök szóltak az ismerőseiknek.",
  "Aztán az ismerősök ismerősei is elfogytak.",
  "A nagynénid kétszer is megosztotta a posztot.",
  "Ami szép gesztus, de a rezsit nem fizeti.",
  "Közben mindenki azt mondja: „hirdetni kell”.",
  "Aki már hirdetett, tudja, hogy ez nem ilyen egyszerű.",
  "Aki még nem, az fél, hogy elmegy a pénz.",
  "Mindkettő jogos félelem.",
  "A tanácsokból is elég volt.",
  "A sógor szerint „csinálj egy TikTokot”.",
  "A „szakértő” ismerős szerint „minden a tartalom”.",
  "A videó szerint napi pár ezerből gazdagodsz.",
  "(Spoiler: nem. A videó készítője gazdagodott meg.)",
  "Mi nem ígérünk csodát.",
  "(A csodákat külön számláznánk.)",
  "Azt ígérjük, hogy átvesszük a nehezét.",
  "A célzást. A szöveget. A beállítást. A mérést.",
  "Te csak az ügyfelekkel foglalkozol.",
  "És csinálod azt, amihez értesz.",
  "Ha már hirdettél: megnézzük, hol megy el a pénz, és megjavítjuk.",
  "Ha még nem: az alapoktól felépítjük, emberi nyelven.",
  "Nálunk ez nem varázslat, hanem munka.",
  "Egy kis rendszerrel és sokkal kevesebb idegeskedéssel.",
  "(Az idegeskedést megtarthatod, ha hiányzik.)",
  "Ez indul el itt lent…",
];

export function LetterSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-44 pt-24 text-black sm:pb-64">
      {/* oldalsó fények: felül és alul is kifutnak, hogy se a hero éle alatt, se az Offering felé ne legyen varrat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-accent/40 via-accent/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_12rem,black_calc(100%-14rem),transparent)] sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-accent/40 via-accent/10 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_12rem,black_calc(100%-14rem),transparent)] sm:w-48 sm:from-accent/70 sm:via-accent/25 lg:w-72"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col gap-8 text-2xl leading-snug sm:gap-11 sm:text-[2rem]">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={i < 1 ? "text-sm text-[#8a8a8a] sm:text-base" : undefined}
          >
            {p}
          </p>
        ))}
        <p className="mt-4 text-lg text-[#6b6b6b] sm:text-xl">
          u.i.: A gól a lövőt lepi meg legjobban 😉
        </p>
      </div>
    </section>
  );
}
