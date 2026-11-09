import Link from "next/link";

// A **dupla csillaggal** jelölt bekezdések félkövérek; a PROOF bekezdés mellé referencia-link kerül.
const PROOF = "**Az elmúlt időszakban több mint 2 milliárd forint árbevételt generáltunk az ügyfeleinknek.**";

const paragraphs = [
  "Kedves vállalkozó,",
  "**Ma már a legtöbben nem kérdezik meg az ismerőst, kit ajánl.**",
  "Nem keresnek rá. Nem telefonálnak körbe. Nem érdeklődnek.",
  "Görgetnek. És annál állnak meg, ami épp az ő problémájukról szól.",
  "**Ha nem te mutatod meg nekik, miért a te szolgáltatásod a megoldás, akkor valaki más fogja.**",
  "Mi ezt csináljuk: a hirdetésedet azok elé tesszük, akiknek szükségük van rád, és megmondjuk nekik, miért te.",
  PROOF,
  "Ha még nem próbáltad, az alapoktól felépítjük.",
  "Ha próbáltad, de nem működött, és jó a terméked vagy a szolgáltatásod, akkor nem azon múlt. Hanem a tálaláson és a mögötte lévő rendszeren.",
  "Lent választhatsz, honnan indulunk.",
];

// Az állítás mellé: vékony, aláhúzott „Referenciák” link, vékony nyíllal. Nagy képernyőn a szöveghasáb mellett,
// az utolsó sorral egy vonalban áll; kisebben a mondat végére kerül.
function ProofLink() {
  return (
    <Link
      href="/esettanulmanyok"
      className="group ml-2 inline-flex items-center gap-1.5 whitespace-nowrap py-1.5 align-middle text-base font-light lg:absolute lg:bottom-[0.3em] lg:left-full lg:ml-8 text-accent underline decoration-1 underline-offset-[6px] transition-colors hover:text-accent-deep sm:text-lg"
    >
      Referenciák
      <svg
        aria-hidden
        viewBox="0 0 24 12"
        className="h-3 w-6 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
      </svg>
    </Link>
  );
}

export function LetterSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-4 pt-24 text-black sm:pb-8">
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
        {paragraphs.map((p) =>
          p === PROOF ? (
            <p key={p} className="relative font-bold">
              {p.slice(2, -2)}
              <ProofLink />
            </p>
          ) : p.startsWith("**") ? (
            <p key={p} className="font-bold">
              {p.slice(2, -2)}
            </p>
          ) : (
            <p key={p}>{p}</p>
          ),
        )}
      </div>
    </section>
  );
}
