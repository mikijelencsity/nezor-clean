import type { Metadata } from "next";
import { BottomCta } from "@/components/BottomCta";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SitesExplorer } from "@/components/SitesExplorer";

export const metadata: Metadata = {
  title: "Weboldalak és webáruházak | NEZOR",
  description:
    "Weboldalak és webáruházak, amiket már átadtunk: kinek készült, mit tud az oldal, és mi került rá.",
};

export default function Weboldalak() {
  return (
    <>
      <Header />
      <main className="bg-[#f8f9fa] text-black">
        <section className="flex flex-col items-center gap-5 px-6 pt-32 pb-16 text-center">
          <div className="flex flex-col items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/meta3d/csillagok.webp" alt="5 csillag" className="animate-float-a w-44 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:w-56" />
            <p className="text-xs font-semibold text-[#5a5a5a]">5,0 csillag a Google-értékelések alapján</p>
          </div>
          <p className="text-xs font-semibold tracking-widest text-accent">
            WEBOLDAL ÉS WEBÁRUHÁZ REFERENCIÁK
          </p>
          <h1 className="font-display max-w-4xl text-4xl leading-[1.15] sm:text-6xl">
            OLDALAK ÉS WEBSHOPOK, AMIKET MÁR ÁTADTUNK.
          </h1>
          <p className="max-w-xl text-sm text-[#5a5a5a] sm:text-base">
            A hirdetés hozza a látogatót, az oldal viszi tovább a megkeresésig vagy a kosárig.
            Itt látod, kinek mit építettünk.
          </p>
        </section>

        <SitesExplorer />
      </main>
      <BottomCta service="web" />
      <Footer />
    </>
  );
}
