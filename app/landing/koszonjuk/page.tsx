'use client';
import { useEffect } from 'react';

export default function KoszonjukPage() {
  useEffect(() => {
    const fire = () => {
      (window as Window & { fbq?: (...a: unknown[]) => void }).fbq?.('track', 'Lead');
    };
    // Pixel init (FacebookPixel komponens) és a Lead event egyszerre fut useEffect-ben,
    // ezért várunk egy ticket hogy a pixel biztosan init-elődjön előbb.
    const t = setTimeout(fire, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080c1e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'rgba(0,229,255,0.12)',
        border: '2px solid rgba(0,229,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        marginBottom: 32,
        color: '#00e5ff',
      }}>
        ✓
      </div>
      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 48px)',
        fontWeight: 900,
        color: '#fff',
        margin: '0 0 16px',
        letterSpacing: '-0.02em',
      }}>
        Megkaptuk!
      </h1>
      <p style={{
        fontSize: 18,
        color: 'rgba(255,255,255,0.6)',
        margin: '0 0 8px',
        maxWidth: 480,
        lineHeight: 1.6,
      }}>
        Hamarosan felvesszük veled a kapcsolatot.
      </p>
      <p style={{
        fontSize: 15,
        color: 'rgba(255,255,255,0.35)',
        margin: '0 0 48px',
      }}>
        Általában 1 munkanapon belül jelentkezünk.
      </p>
      <a
        href="/landing"
        style={{
          color: 'rgba(0,229,255,0.7)',
          fontSize: 14,
          textDecoration: 'underline',
          textUnderlineOffset: 4,
        }}
      >
        ← Vissza
      </a>
    </div>
  );
}
