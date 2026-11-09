import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";
import { Reveal } from "./Reveal";

// Közös záró felhívás az aloldalak alján (a lábléc előtt).
export function BottomCta() {
  return (
    <section className="bg-[#f8f9fa] px-6 py-24 text-center text-black sm:py-32">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meta3d/szikra.webp" alt="" className="animate-float-b mx-auto mb-6 w-24 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-32" />
          <h2 className="font-display text-4xl leading-[1.1] sm:text-6xl">
            TÖBB VEVŐT AKARSZ,
            <br />
            VAGY CSAK OLVASOD EZT?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#4a4a4a] sm:text-xl">
            A hirdetés nem varázslat, hanem munka. Mi megcsináljuk, te csak az ügyfelekkel foglalkozol. A
            konkurenciád már hirdet, szóval érdemes lépni, mielőtt az ügyfeleid hozzá csörögnek.
          </p>
          <Halo className="mt-10">
            <OpenWizardButton
              hover="Okos döntés."
              className="font-display rounded-full bg-accent px-10 py-6 text-2xl tracking-wide text-white sm:px-16 sm:text-3xl"
            >
              TÖBB VEVŐT AKAROK
            </OpenWizardButton>
          </Halo>
        </div>
      </Reveal>
    </section>
  );
}
