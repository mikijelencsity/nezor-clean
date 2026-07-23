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

function elfogadta(): boolean {
  try {
    return localStorage.getItem('nezorCookieConsent') === 'accepted';
  } catch {
    return false;
  }
}

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

  // Süti-hozzájárulás: a Meta a 'revoke' állapotban nem küld eseményt.
  // Fontos, hogy az init ELŐTT hívjuk meg (Meta követelmény).
  window.fbq('consent', elfogadta() ? 'grant' : 'revoke');
  window.fbq('init', PIXEL_ID);
}

export function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!PIXEL_ID) return;
    initPixel();
    // PageView minden oldalváltáskor (hozzájárulás nélkül a Meta visszatartja)
    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  // A süti-sáv döntésére azonnal reagálunk
  useEffect(() => {
    if (!PIXEL_ID) return;
    const grant = () => window.fbq?.('consent', 'grant');
    const revoke = () => window.fbq?.('consent', 'revoke');
    window.addEventListener('nezor_cookie_accepted', grant);
    window.addEventListener('nezor_cookie_rejected', revoke);
    return () => {
      window.removeEventListener('nezor_cookie_accepted', grant);
      window.removeEventListener('nezor_cookie_rejected', revoke);
    };
  }, []);

  return null;
}

/**
 * Általános esemény küldés.
 * Az eventId a szerver oldali CAPI eseménnyel való deduplikációhoz kell —
 * ugyanazt az azonosítót kell átadni mindkét helyen.
 */
export function trackEvent(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (!PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  if (eventId) {
    window.fbq('track', event, params ?? {}, { eventID: eventId });
  } else {
    window.fbq('track', event, params ?? {});
  }
}

/** Egyedi esemény-azonosító a browser + CAPI deduplikációhoz */
export function ujEventId(prefix = 'lead') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
