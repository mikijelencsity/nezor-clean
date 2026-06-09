'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface CalBookerProps {
  nev: string;
  email: string;
  onSuccess: () => void;
}

export function CalBooker({ nev, email, onSuccess }: CalBookerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'ingyenes-konzultacio' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#0f1226' },
          dark: { 'cal-brand': '#00e5ff' },
        },
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
      cal('on', {
        action: 'bookingSuccessful',
        callback: onSuccess,
      });
    })();
  }, [onSuccess]);

  return (
    <Cal
      namespace="ingyenes-konzultacio"
      calLink="daniel-muller-50c5tx/ingyenes-konzultacio"
      calOrigin="https://cal.eu"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view', name: nev, email, useSlotsViewOnSmallScreen: 'true' }}
    />
  );
}
