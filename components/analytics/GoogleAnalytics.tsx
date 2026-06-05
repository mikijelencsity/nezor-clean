'use client';
import { useEffect } from 'react';

const GA_ID = 'G-X79GL5MKMH';

function loadGA() {
  if (typeof window === 'undefined') return;
  if ((window as Window & { _gaLoaded?: boolean })._gaLoaded) return;
  (window as Window & { _gaLoaded?: boolean })._gaLoaded = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  (window as Window & { dataLayer?: unknown[] }).dataLayer =
    (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];

  function gtag(...args: unknown[]) {
    (window as Window & { dataLayer?: unknown[] }).dataLayer!.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID);
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (localStorage.getItem('nezorCookieConsent') === 'accepted') {
      loadGA();
    }

    const handler = () => loadGA();
    window.addEventListener('nezor_cookie_accepted', handler);
    return () => window.removeEventListener('nezor_cookie_accepted', handler);
  }, []);

  return null;
}
