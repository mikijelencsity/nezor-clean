'use client';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? 'G-X79GL5MKMH';

type GtagWindow = Window & { dataLayer?: unknown[]; _gaLoaded?: boolean };

function gtag(...args: unknown[]) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(args);
}

function consentState(granted: boolean) {
  return {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  } as const;
}

function loadGA() {
  if (typeof window === 'undefined') return;
  const w = window as GtagWindow;
  if (w._gaLoaded) return;
  w._gaLoaded = true;

  w.dataLayer = w.dataLayer ?? [];

  // Google Consent Mode v2 — alapból mindent elutasítunk, így a script már
  // az elfogadás ELŐTT is be tud töltődni: a hirdetésből érkező első
  // látogatást is méri (anonim/modellezett adatként), amíg a látogató
  // nem dönt a sütikről. Korábban a GA csak elfogadás UTÁN töltődött be,
  // emiatt a hirdetésekből jövő forgalom nagy része nem jelent meg.
  const stored = localStorage.getItem('nezorCookieConsent');
  gtag('consent', 'default', { ...consentState(stored === 'accepted'), wait_for_update: 500 });

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_ID);
}

export function GoogleAnalytics() {
  useEffect(() => {
    loadGA();

    const onAccepted = () => gtag('consent', 'update', consentState(true));
    const onRejected = () => gtag('consent', 'update', consentState(false));
    window.addEventListener('nezor_cookie_accepted', onAccepted);
    window.addEventListener('nezor_cookie_rejected', onRejected);
    return () => {
      window.removeEventListener('nezor_cookie_accepted', onAccepted);
      window.removeEventListener('nezor_cookie_rejected', onRejected);
    };
  }, []);

  return null;
}
