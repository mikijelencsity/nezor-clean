"use client";
import { useState } from "react";
import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";

const faqs = [
  {
    q: "Mennyi a Facebook hirdetési költség?",
    a: "Ez a te büdzsédtől függ, nem a mienktől. Van, aki napi 3.000 Ft-ból indul, van, aki többől. Az első hívásban közösen kitaláljuk, mennyi az értelmes kezdő összeg a te iparágadban — nem sózunk rád felesleges nagyságrendet.",
  },
  {
    q: "Van havi díj? Mit fedez?",
    a: "Igen, ez a hirdetéskezelés díja — a hirdetési költségtől külön. Ebbe tartozik a célzás, a kreatívok, a szövegírás, az optimalizálás és a heti egyeztetés. Nem tűnünk el, miután megkaptuk a pénzt.",
  },
  {
    q: "Mi van, ha már van weboldalam vagy Facebook oldalam?",
    a: "Remek, akkor arra építünk. Nem kell mindent lecserélni ahhoz, hogy végre jó hirdetéseid legyenek — csak azt nézzük meg, mi hiányzik a rendszerből.",
  },
  {
    q: "Milyen iparágakkal dolgoztok?",
    a: "Webshoptól a kutyakozmetikáig, ékszerszalontól az épületgépészetig. Nem number ez, ha kicsi vagy nagy a céged — az számít, hogy van kinek eladni.",
  },
  {
    q: "Mi van, ha nem vagyok elégedett?",
    a: "Akkor beszélünk, és igazítunk rajta — mert csak akkor éri meg nekünk is, ha neked megéri. Az első 20 perces konzultáció egyébként teljesen kötelezettségmentes.",
  },
  {
    q: "Hol vagytok? Online vagy személyes találkozó is lehet?",
    a: "Alapból online dolgozunk, videóhívással — így gyorsabbak és rugalmasabbak vagyunk. Ha közel vagy hozzánk, a személyes egyeztetés sem kizárt.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-28 text-black sm:py-36">
      <div className="relative mx-auto max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/meta3d/kerdojel.webp"
          alt=""
          className="animate-float-b mx-auto mb-6 w-28 -rotate-6 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-40"
        />
      <h2 className="mb-14 text-center font-display text-5xl leading-[1.2] sm:text-7xl sm:leading-[1.2]">
        BIZTOS VAN
        <br />
        KÉRDÉSED.
      </h2>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className="rounded-2xl border border-black/10 bg-[#e6e8eb] transition-colors hover:border-accent/40"
          >
            <button
              className="flex w-full items-center justify-between px-7 py-6 text-left text-lg font-semibold sm:text-2xl"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span
                className="ml-4 text-3xl text-accent transition-transform"
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="px-7 pb-7 text-base leading-relaxed text-[#4a4a4a] sm:text-xl">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="mb-5 text-base sm:text-xl">
          SZÓVAL AKKOR FOGLALJUNK EGY IDŐPONTOT?
        </p>
        <Halo>
          <OpenWizardButton hover="Okos döntés." className="rounded-full bg-accent px-10 py-5 text-lg font-semibold text-white sm:text-xl">
            Kérek egy konzultációt
          </OpenWizardButton>
        </Halo>
      </div>
    </section>
  );
}
