'use client';
import { useEffect, useState } from 'react';

const DEADLINE = new Date('2026-07-20T23:59:59').getTime();
const pad2 = (n: number) => String(n).padStart(2, '0');

function useCd() {
  const [ready, setReady] = useState(false);
  const [rem, setRem] = useState(0);
  useEffect(() => {
    const t = () => setRem(Math.max(0, DEADLINE - Date.now()));
    t(); setReady(true);
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(rem / 1000);
  return { ready, nap: Math.floor(s / 86400), ora: Math.floor((s % 86400) / 3600), perc: Math.floor((s % 3600) / 60), mp: s % 60 };
}

export default function CountdownOtletek() {
  const cd = useCd();
  const val = (n: number, pad = true) => (cd.ready ? (pad ? pad2(n) : String(n)) : '––');
  const units: [string, string][] = [['NAP', val(cd.nap, false)], ['ÓRA', val(cd.ora)], ['PERC', val(cd.perc)], ['MP', val(cd.mp)]];

  const heading: React.CSSProperties = { fontSize: 13, fontWeight: 800, color: '#888', margin: '48px 0 12px', textTransform: 'uppercase', letterSpacing: '.08em', textAlign: 'center' };
  const section: React.CSSProperties = { maxWidth: 1000, margin: '0 auto', borderRadius: 28, padding: '52px 32px', textAlign: 'center' };
  const cta = (light: boolean): React.CSSProperties => ({ marginTop: 40, padding: '20px 48px', border: 'none', borderRadius: 100, fontSize: 20, fontWeight: 900, cursor: 'pointer', color: light ? '#d61020' : '#16181d', background: light ? '#fff' : 'linear-gradient(135deg,#ff3340,#ff8c00)', boxShadow: '0 14px 40px rgba(255,51,64,.35)' });

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '30px 20px 90px', color: '#111', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto 8px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900 }}>Nagy visszaszámláló — ötletek</h1>
        <p style={{ color: '#555' }}>Szekció-méretű, élő számláló 2026. július 20-ig. Melyik tetszik?</p>
      </div>

      {/* 1 – Sötét, nagy dobozos */}
      <div style={heading}>1 · Sötét, nagy dobozok</div>
      <div style={{ ...section, background: '#14161b', color: '#fff' }}>
        <div style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 8 }}>⏳ Az ajánlat lejár</div>
        <div style={{ color: 'rgba(255,255,255,.7)', marginBottom: 34 }}>Utána 79.000 Ft a havidíj — most az első hónap csak 19.990 Ft.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px,2vw,20px)', flexWrap: 'wrap' }}>
          {units.map(([l, v]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 18, padding: 'clamp(14px,2.5vw,26px) clamp(14px,2.5vw,30px)', minWidth: 'clamp(78px,15vw,130px)' }}>
              <div style={{ fontSize: 'clamp(2.6rem,8vw,4.6rem)', fontWeight: 900, lineHeight: 1, color: '#ff8c00', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,.55)', marginTop: 10 }}>{l}</div>
            </div>
          ))}
        </div>
        <button style={cta(false)}>Kell nekem! →</button>
      </div>

      {/* 2 – Piros, óriás számok kettősponttal */}
      <div style={heading}>2 · Piros, óriás számok</div>
      <div style={{ ...section, background: 'linear-gradient(135deg,#ff3340,#d61020)', color: '#fff' }}>
        <div style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 30 }}>⚡ Már csak ennyi időd van!</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(6px,1.5vw,16px)', flexWrap: 'wrap' }}>
          {units.map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(3rem,10vw,6rem)', fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', opacity: .85, marginTop: 8 }}>{l}</div>
              </div>
              {i < units.length - 1 && <div style={{ fontSize: 'clamp(3rem,10vw,6rem)', fontWeight: 900, lineHeight: 1, margin: '0 clamp(4px,1vw,10px)', opacity: .5 }}>:</div>}
            </div>
          ))}
        </div>
        <button style={cta(true)}>Kérem most! →</button>
      </div>

      {/* 3 – Világos kártya, dobozos */}
      <div style={heading}>3 · Világos kártya</div>
      <div style={{ ...section, background: '#fff', boxShadow: '0 24px 60px rgba(0,0,0,.1)', border: '1px solid rgba(0,0,0,.06)' }}>
        <div style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 8, color: '#14161b' }}>Az ajánlat lejár</div>
        <div style={{ color: '#666', marginBottom: 34 }}>Az első hónap <b style={{ color: '#ff3340' }}>19.990 Ft</b> — csak a visszaszámlálás végéig.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px,2vw,20px)', flexWrap: 'wrap' }}>
          {units.map(([l, v]) => (
            <div key={l} style={{ background: '#14161b', borderRadius: 18, padding: 'clamp(14px,2.5vw,26px) clamp(14px,2.5vw,30px)', minWidth: 'clamp(78px,15vw,130px)' }}>
              <div style={{ fontSize: 'clamp(2.6rem,8vw,4.6rem)', fontWeight: 900, lineHeight: 1, color: '#ff8c00', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.1em', color: 'rgba(255,255,255,.55)', marginTop: 10 }}>{l}</div>
            </div>
          ))}
        </div>
        <button style={cta(false)}>Kell nekem! →</button>
      </div>
    </div>
  );
}
