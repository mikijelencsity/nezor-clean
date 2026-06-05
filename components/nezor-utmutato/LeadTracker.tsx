'use client';
import { useEffect } from 'react';
import { trackLead } from '@/components/analytics/FacebookPixel';

export function LeadTracker() {
  useEffect(() => {
    // Csak egyszer süljön el — sessionStorage védi a duplikációtól
    if (sessionStorage.getItem('lead_tracked')) return;
    sessionStorage.setItem('lead_tracked', '1');
    trackLead();
  }, []);

  return null;
}
