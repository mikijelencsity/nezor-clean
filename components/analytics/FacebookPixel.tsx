'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq: Window['fbq'];
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

function initPixel() {
  if (!PIXEL_ID || typeof window === 'undefined') return;
  if (window.fbq != null) return; // already loaded

  // Standard FB Pixel init snippet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n: any = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (n.callMethod) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      n.callMethod(...args);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (n.queue = n.queue ?? []).push(args);
    }
  };
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);

  window.fbq('init', PIXEL_ID);
}

export function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!PIXEL_ID) return;
    initPixel();
    // PageView minden oldalváltáskor
    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}

/** Hívd meg feliratkozáskor — Lead konverzió */
export function trackLead(email?: string) {
  if (!PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', email ? { em: email } : {});
}

/** Általános esemény küldés */
export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', event, params ?? {});
}
