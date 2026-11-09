import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PartnerStrip } from "@/components/PartnerStrip";
import { LetterSection } from "@/components/LetterSection";
import { Offering } from "@/components/Offering";
import { CaseStudyMarquee } from "@/components/CaseStudyMarquee";
import { StraightTalk } from "@/components/StraightTalk";
import { Faq } from "@/components/Faq";
import { MetaCta } from "@/components/MetaCta";
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
        <HorizonDivider from="#000000" to="#f8f9fa" />
        <div className="pastel-flow">
          <Reveal>
            <LetterSection />
          </Reveal>
          <Reveal>
            <Offering />
          </Reveal>
        </div>
        <HorizonDivider from="#f8f9fa" to="#000000" flip />
        <Reveal>
          <CaseStudyMarquee />
        </Reveal>
        <HorizonDivider from="#000000" to="#f8f9fa" />
        <div className="pastel-flow-img">
          <Reveal>
            <StraightTalk />
          </Reveal>
          <Reveal>
            <Faq />
          </Reveal>
        </div>
        <Reveal>
          <MetaCta />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
