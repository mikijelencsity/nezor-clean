import Link from "next/link";
import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";

// Árak-link és felhívás. Az ár külön, az Árak oldalon van.
export function StraightTalk() {
  return (
    <section className="px-6 pb-6 pt-24 text-black sm:pb-8 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="text-center">
          <Link
            href="/arak"
            className="text-lg font-semibold underline underline-offset-4 transition-colors hover:text-accent sm:text-xl"
          >
            Mennyibe kerül? Megnézem az árakat →
          </Link>
        </p>

        <div className="mt-20 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meta3d/szivlajk.webp" alt="" className="animate-float-a mx-auto mb-6 w-44 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-56" />
          <Halo>
            <OpenWizardButton service="hirdetes" hover="Most. Most kell." className="rounded-full bg-accent px-10 py-5 text-xl font-semibold text-white sm:px-14 sm:py-6 sm:text-2xl">
              Na, mikor fogod megnyomni?
            </OpenWizardButton>
          </Halo>
        </div>
      </div>
    </section>
  );
}
