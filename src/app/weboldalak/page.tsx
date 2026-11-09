import Image from "next/image";
import { BottomCta } from "@/components/BottomCta";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const sites = [
  { tag: "AJÁNLATKÉRÉS", name: "Hellinger Kft.", img: "hellinger", url: "https://hellingerkft.hu/" },
  { tag: "WEBOLDAL", name: "Estur Kft.", img: "estur", url: "https://estur.hu/" },
  { tag: "MÁRKAÉPÍTÉS", name: "DoverCheck", img: "dovercheck", url: "https://doversolution.hu/" },
  { tag: "VENDÉGLÁTÁS", name: "Neked Sütöm", img: "nekedsutom", url: "https://nekedsutom.hu/" },
  { tag: "KISKERESKEDELEM", name: "CruiserShop", img: "cruisershop", url: "https://kerekparszakuzletbaja.hu/" },
  { tag: "EGÉSZSÉGES ÉLETMÓD", name: "Inshape-Diet", img: "inshape", url: "https://inshape-diet.com/" },
  { tag: "NYÍLÁSZÁRÓ GYÁRTÁS", name: "Szeko Ablak Kft.", img: "szeko", url: "https://szekoablak.hu/" },
];

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
            WEBOLDAL REFERENCIÁK
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-[0.95] sm:text-6xl">
            OLDALAK, AMIKET MÁR ÁTADTUNK.
          </h1>
          <p className="max-w-xl text-sm text-[#5a5a5a] sm:text-base">
            A hirdetés hozza a látogatót, az oldal viszi tovább a megkeresésig.
            Ezeken dolgoztunk eddig.
          </p>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s) => (
            <Reveal key={s.name}>
              <article className="flex flex-col gap-4">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[1402/1122] w-full overflow-hidden rounded-sm border border-black/10"
                >
                  <Image
                    src={`/images/weboldalak/${s.img}.webp`}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-widest text-accent">
                    {s.tag}
                  </p>
                  <h2 className="font-display text-2xl">{s.name}</h2>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold underline underline-offset-4 hover:text-accent"
                  >
                    Megnézem →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </main>
      <BottomCta />
      <Footer />
    </>
  );
}
