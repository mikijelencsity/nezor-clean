import type { Metadata } from 'next';
import { UtmutatatoHero } from '@/components/nezor-utmutato/UtmutatatoHero';
import { AudienceSection } from '@/components/nezor-utmutato/AudienceSection';
import { SituationSection } from '@/components/nezor-utmutato/SituationSection';
import { StepsSection } from '@/components/nezor-utmutato/StepsSection';
import { BonusSection } from '@/components/nezor-utmutato/BonusSection';
import { CouponSection } from '@/components/nezor-utmutato/CouponSection';
import { DarkCTASection } from '@/components/nezor-utmutato/DarkCTASection';
import { ChecklistSection } from '@/components/nezor-utmutato/ChecklistSection';
import { TimelineSection } from '@/components/nezor-utmutato/TimelineSection';
import { ChecklistVerifySection } from '@/components/nezor-utmutato/ChecklistVerifySection';
import { UtmutatatoServicesSection } from '@/components/nezor-utmutato/UtmutatatoServicesSection';
import { RefsSection } from '@/components/nezor-utmutato/RefsSection';
import { BridgeSection } from '@/components/nezor-utmutato/BridgeSection';
import { ReviewsDarkSection } from '@/components/nezor-utmutato/ReviewsDarkSection';
import { UtmutatatoContactSection } from '@/components/nezor-utmutato/UtmutatatoContactSection';
import { LeadTracker } from '@/components/nezor-utmutato/LeadTracker';

export const metadata: Metadata = {
  title: 'Online jelenlét építőiparosoknak — NEZOR Útmutató',
};

export default function UtmutatatoPage() {
  return (
    <>
      <LeadTracker />
      <UtmutatatoHero />
      <AudienceSection />
      <SituationSection />
      <StepsSection />
      <BonusSection />
      <CouponSection />
      <DarkCTASection />
      <ChecklistSection />
      <TimelineSection />
      <ChecklistVerifySection />
      <UtmutatatoServicesSection />
      <RefsSection />
      <BridgeSection />
      <ReviewsDarkSection />
      <UtmutatatoContactSection />
    </>
  );
}
