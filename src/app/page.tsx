import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PartnerStrip } from "@/components/PartnerStrip";
import { LetterSection } from "@/components/LetterSection";
import { Offering } from "@/components/Offering";
import { CaseStudyMarquee } from "@/components/CaseStudyMarquee";
import { HomeConsultation } from "@/components/HomeConsultation";
import { MobileCta } from "@/components/MobileCta";
import { AboutUs } from "@/components/AboutUs";import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HorizonDivider } from "@/components/HorizonDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        {/* fekete rész a hero folytatásaként: egysoros partner-logó futósáv, utána a horizont-váltás a szöveges szekcióba */}
        <PartnerStrip />
        {/* a hero és a logósáv tiszta fekete, ezért ez az átmenet is feketéből indul (a többi a --night árnyalatból) */}
        <HorizonDivider from="#000000" to="#f8f9fa" />
        <div className="pastel-flow">
          <Reveal>
            <LetterSection />
          </Reveal>
          <Reveal>
            <Offering />
          </Reveal>
        </div>
        <HorizonDivider from="#f8f9fa" to="#212121" flip />
        <Reveal>
          <CaseStudyMarquee />
        </Reveal>
        <HomeConsultation />
        <HorizonDivider from="#212121" to="#f8f9fa" tight />
        <div className="pastel-flow-img">
          <Reveal>
            <AboutUs />
          </Reveal>
          <Reveal>
            <Faq />
          </Reveal>
        </div>
      </main>
      <MobileCta />
      <Footer />
    </>
  );
}
