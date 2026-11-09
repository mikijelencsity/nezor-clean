import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomCta } from "@/components/BottomCta";
import { Reveal } from "@/components/Reveal";
import { HorizonDivider } from "@/components/HorizonDivider";
import { CaseHero } from "@/components/CaseHero";
import { OpenWizardButton } from "@/components/OpenWizardButton";
import { ResultsTitle } from "@/components/ResultsTitle";
import { CaseFlow } from "@/components/CaseFlow";
import { IgenDe } from "@/components/IgenDe";
import { cases, getCase } from "@/data/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/esettanulmanyok/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.name} esettanulmány | NEZOR`, description: c.headline };
}

function ServiceIcon({ name }: { name: string }) {
  const cls = "h-10 w-10 shrink-0 text-[#0866ff]";
  if (name.includes("Facebook"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.7 2 14.7 2 12.4 2 10.8 3.4 10.8 6v2.5H8.2V12h2.6v10H14V12h2.6l.4-3.5H14z" />
      </svg>
    );
  if (name.includes("Landing"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden>
        <path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9H5V5zm2 0v7h10V5H7zM2 16h20v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1z" />
      </svg>
    );
  if (name.includes("Weboldal"))
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9.5h18M7 6.8h.01M10 6.8h.01" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h3" />
    </svg>
  );
}

function Title({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 className={`font-display mb-10 text-4xl leading-none sm:text-6xl ${dark ? "text-white" : ""}`}>
      {children}
    </h2>
  );
}

export default async function CasePage({ params }: PageProps<"/esettanulmanyok/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const r = c.results;
  const related = cases.filter((x) => x.slug !== c.slug).sort((a, b) => Number(b.industry === c.industry) - Number(a.industry === c.industry)).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* hős-rész */}
        <CaseHero
          industry={c.industry}
          goal={c.goal}
          name={c.name}
          logo={c.logo}
        />
        <HorizonDivider from="#000000" to="#f8f9fa" />

        <div className="bg-[#f8f9fa] text-black">
          {/* számok */}
          <Reveal>
            <section className="px-6 pb-20 pt-10">
              <div className="mx-auto max-w-6xl">
                <ResultsTitle lines={["EREDMÉNYEK", "EGY PILLANTÁSRA"]} />
                <CaseFlow
                  count={r.count}
                  unit={r.unit}
                  costPer={r.costPer}
                  spend={r.spend}
                  spendLabel={r.spendLabel}
                  dailySpend={r.dailySpend}
                  monthlySpend={r.monthlySpend}
                />
              </div>
            </section>
          </Reveal>


          {/* valódi hirdetéskezelő-képernyőképek (csak ha az ügyfélhez fel van véve) */}
          {c.shots && c.shots.length > 0 && (
            <Reveal>
              <section className="px-6 pb-20">
                <div className="mx-auto max-w-5xl">
                  <div className="text-center">
                    <Title>A KAMPÁNY, ÉLESBEN</Title>
                  </div>
                  <div className={`grid gap-6 ${c.shots.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {c.shots.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt={`${c.name} hirdetéskezelő-képernyőkép`}
                        className="w-full rounded-2xl border border-black/10 bg-white shadow-[0_30px_70px_-30px_rgba(8,102,255,0.35)]"
                      />
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          )}

          {/* szolgáltatások: szürke sáv, fehér kártyák ikonnal */}
          <Reveal>
            <section className="bg-[#efefef] px-6 py-20 sm:py-24">
              <div className="mx-auto max-w-6xl text-center">
                <h2 className="font-display mb-12 text-5xl leading-none sm:text-7xl">MIT CSINÁLTUNK</h2>
                <ul className="flex flex-wrap justify-center gap-4 lg:flex-nowrap">
                  {c.services.map((name) => (
                    <li
                      key={name}
                      className="flex min-w-[15rem] items-center gap-4 rounded-2xl bg-white px-6 py-7 lg:max-w-[23rem] lg:flex-1 text-left shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                      <ServiceIcon name={name} />
                      <span className="text-lg font-semibold leading-tight">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          {/* háttér */}
          <Reveal>
            <section className="px-6 pb-24 pt-20 sm:pt-32">
              <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/10 shadow-lg">
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <Title>HÁTTÉR</Title>
                  <p className="text-lg leading-relaxed text-[#4a4a4a] sm:text-xl">{c.background}</p>
                  <OpenWizardButton hover="Mehet! →" className="mt-8 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white">
                    Ingyenes konzultáció <span aria-hidden>→</span>
                  </OpenWizardButton>
                </div>
              </div>
            </section>
          </Reveal>

          {/* Jó így könnyű... (az ellenvetés és a válaszunk; csak ajánlatkérés-célú ügyfeleknél, mert az űrlapos érvelés időpontfoglalásra nem igaz) */}
          {c.goal === "Ajánlatkérés" && (
            <Reveal>
              <section className="px-6 pb-24 pt-4">
                <div className="mx-auto max-w-5xl">
                  <IgenDe count={r.count} unit={r.unit} />
                </div>
              </section>
            </Reveal>
          )}
        </div>

        <div className="bg-[#f8f9fa] text-black">
          {/* további esetek */}
          <Reveal>
            <section className="px-6 pb-24">
              <div className="mx-auto max-w-5xl">
                <Title>MÉG EZEKET NÉZD MEG</Title>
                <div className="grid gap-5 sm:grid-cols-3">
                  {related.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/esettanulmanyok/${x.slug}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-black"
                    >
                      <Image src={x.image} alt={x.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/25 bg-black/35 px-5 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-300 group-hover:border-accent/70">
                        <span className="font-display pt-0.5 text-lg leading-none tracking-wide text-white sm:text-xl">{x.name}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        </div>

      </main>
      <BottomCta />
      <Footer />
    </>
  );
}
