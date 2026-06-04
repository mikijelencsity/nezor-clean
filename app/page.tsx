import type { Metadata } from 'next';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SideContact } from '@/components/ui/SideContact';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { HeroSection } from '@/components/home/HeroSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { AdsSection } from '@/components/home/AdsSection';
import { AutomationSection } from '@/components/home/AutomationSection';
import { AiSection } from '@/components/home/AiSection';
import { GBPSection } from '@/components/home/GBPSection';
import { StorySection } from '@/components/home/StorySection';
import { ContactSection } from '@/components/home/ContactSection';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = { title: 'NEZOR — Weboldal + Meta hirdetés' };

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <SideContact href="#kapcsolat" />
      <HeroSection />
      <ReviewsSection />
      <ProcessSection />
      <ServicesSection />
      <AdsSection />
      <AutomationSection />
      <AiSection />
      <GBPSection />
      <StorySection />
      <ContactSection />
      <FAQSection />
      <FloatingCTA href="#kapcsolat" label="Konzultációt kérek →" />
    </>
  );
}
