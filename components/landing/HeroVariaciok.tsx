'use client';
import landing from './LandingPage.module.css';
import s from './HeroVariaciok.module.css';

const BADGE = (
  <span className={landing.badge}>
    <span className={landing.badgeDot} />
    5+ év tapasztalat · valós ügyfelek, valós eredmények
  </span>
);

const SUB = (
  <p style={{ fontSize: 14, color: 'rgba(0,0,0,.6)', maxWidth: 480 }}>
    Landing oldal + élő hirdetési kampány, összerakva, 39.500 Ft-ból az első hónapban.
  </p>
);

const variants: { id: string; num: string; name: string; rationale: string; render: () => React.ReactNode }[] = [
  {
    id: 'v1',
    num: '01',
    name: 'Kiegyensúlyozott két sor',
    rationale: 'A jelenlegi felépítés finomítva — nagyobb sortáv, tisztább arány a két szín közt.',
    render: () => (
      <>
        {BADGE}
        <h2 className={landing.h1} style={{ fontSize: 'clamp(1.8rem, 4.4vw, 2.9rem)' }}>
          Új ügyfelek 30 nap alatt.<br />
          <span className={landing.grad}>Vagy visszakapod a hirdetéskezelési díjat.</span>
        </h2>
        {SUB}
      </>
    ),
  },
  {
    id: 'v2',
    num: '02',
    name: 'Fekete blokk, hirdetés-hangulat',
    rationale: 'Sötét doboz, mint egy kifüggesztett hirdetés — a garancia-mondat kék kiemeléssel üt be.',
    render: () => (
      <>
        {BADGE}
        <div className={landing.heroMatch} style={{ maxWidth: 600 }}>
          Új ügyfelek 30 nap alatt.<br />
          <span className={landing.heroMatchHi}>Vagy visszakapod a hirdetéskezelési díjat.</span>
        </div>
        {SUB}
      </>
    ),
  },
  {
    id: 'v3',
    num: '03',
    name: 'Garancia-jegy / kupon',
    rationale: 'A garancia-tagmondat egy letéphető jegy formájában — a fizikai garanciapapír vizuális nyelvén.',
    render: () => (
      <>
        {BADGE}
        <h2 className={landing.h1} style={{ fontSize: 'clamp(1.7rem, 4vw, 2.6rem)' }}>Új ügyfelek 30 nap alatt.</h2>
        <div style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 2,
          background: '#1D4ED8', color: '#fff', padding: '11px 22px 11px 16px', borderRadius: '0 10px 10px 0',
          fontWeight: 800, fontSize: 15,
        }}>
          <span style={{
            position: 'absolute', left: -1, top: 0, bottom: 0, width: 0,
            borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '14px solid #fff',
          }} />
          <span style={{
            width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,.18)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
          }}>✓</span>
          Vagy visszakapod a hirdetéskezelési díjat
        </div>
        {SUB}
      </>
    ),
  },
  {
    id: 'v4',
    num: '04',
    name: 'Nagy szám a középpontban',
    rationale: 'A „30 nap” lesz a vizuális horgony — a konkrét időkeret dominál, a garancia alátámasztásként fut alatta.',
    render: () => (
      <>
        {BADGE}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'clamp(3.4rem,10vw,5.5rem)', fontWeight: 900, lineHeight: .85, color: '#1D4ED8', letterSpacing: '-0.03em' }}>30</span>
          <span style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.01em', maxWidth: 280, textAlign: 'left' }}>
            NAP ALATT<br />ÚJ ÜGYFELEK.
          </span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#1D4ED8', maxWidth: 520 }}>
          Vagy visszakapod a hirdetéskezelési díjat — garantáltan.
        </p>
        {SUB}
      </>
    ),
  },
  {
    id: 'v5',
    num: '05',
    name: 'Pecsét a szöveg mellett',
    rationale: 'Aszimmetrikus elrendezés: baloldalt a headline, jobbra egy körpecsét viszi a garancia-üzenetet.',
    render: () => (
      <>
        {BADGE}
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 680 }}>
          <h2 className={landing.h1} style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.5rem)', textAlign: 'left', flex: '1 1 320px', minWidth: 240 }}>
            Új ügyfelek<br /><span className={landing.grad}>30 nap alatt.</span>
          </h2>
          <div style={{
            flex: '0 0 auto', width: 118, height: 118, borderRadius: '50%', border: '2.5px dashed #1D4ED8',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            transform: 'rotate(-8deg)', color: '#1D4ED8', fontWeight: 800, fontSize: 11.5, lineHeight: 1.3, letterSpacing: '.02em', padding: 10,
          }}>
            VISSZAKAPOD<br />A DÍJAT<br /><span style={{ fontSize: 9, fontWeight: 700, opacity: .75 }}>HA NEM MŰKÖDIK</span>
          </div>
        </div>
        {SUB}
      </>
    ),
  },
  {
    id: 'v6',
    num: '06',
    name: 'Pipa-bizonyíték',
    rationale: 'A garancia nem folyó mondat, hanem egy külön bizonyíték-sor, pipa-ikonnal — mint egy tényállítás.',
    render: () => (
      <>
        {BADGE}
        <h2 className={landing.h1} style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)' }}>Új ügyfelek 30 nap alatt.</h2>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(29,78,216,.07)',
          border: '1px solid rgba(29,78,216,.22)', padding: '9px 18px', borderRadius: 100, fontWeight: 700, fontSize: 14, color: '#1D4ED8',
        }}>
          <span style={{
            width: 19, height: 19, borderRadius: '50%', background: '#1D4ED8', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flex: '0 0 auto',
          }}>✓</span>
          Vagy visszakapod a hirdetéskezelési díjat
        </div>
        {SUB}
      </>
    ),
  },
  {
    id: 'v7',
    num: '07',
    name: 'Feszes egysoros (asztali)',
    rationale: 'Kisebb méret, szorosabb tracking, egy sorba tömörítve — visszafogottabb, „masthead” jellegű nyitás.',
    render: () => (
      <>
        {BADGE}
        <h2 style={{
          fontWeight: 900, letterSpacing: '-0.01em', fontSize: 'clamp(1.05rem,2.3vw,1.55rem)',
          whiteSpace: 'nowrap', maxWidth: '100%', overflowX: 'auto',
        }}>
          Új ügyfelek 30 nap alatt. <span className={landing.grad}>Vagy visszakapod a hirdetéskezelési díjat.</span>
        </h2>
        <div style={{ width: 64, height: 3, background: '#1D4ED8', borderRadius: 3, margin: '2px 0 4px' }} />
        {SUB}
      </>
    ),
  },
  {
    id: 'v8',
    num: '08',
    name: 'Aláhúzott ígéret',
    rationale: 'A garancia-mondat kap egy kézzel húzott aláhúzást, mint amikor valaki tollal kiemeli a lényeget.',
    render: () => (
      <>
        {BADGE}
        <h2 className={landing.h1} style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)', fontWeight: 700 }}>
          Új ügyfelek 30 nap alatt.<br />
          <span style={{ position: 'relative', fontWeight: 900, display: 'inline-block', marginTop: 6 }}>
            Vagy visszakapod a hirdetéskezelési díjat.
            <svg viewBox="0 0 300 18" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -8, width: '100%', height: 14 }}>
              <path d="M2,10 C60,16 240,2 298,9" fill="none" stroke="#1D4ED8" strokeWidth={5} strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <div style={{ marginTop: 10 }}>{SUB}</div>
      </>
    ),
  },
  {
    id: 'v9',
    num: '09',
    name: 'Alapítói idézet',
    rationale: 'Személyes ígéretként tálalva, idézőjel-ornamenssel — mintha a két alapító mondaná ki élőben.',
    render: () => (
      <>
        <div style={{ fontSize: 56, lineHeight: .5, fontWeight: 900, color: 'rgba(29,78,216,.28)', marginBottom: 2 }}>&ldquo;</div>
        <h2 className={landing.h1} style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, fontStyle: 'italic', maxWidth: 560 }}>
          Új ügyfeleket hozunk 30 nap alatt.
          <span className={landing.grad} style={{ fontStyle: 'normal' }}> Vagy visszakapod a hirdetéskezelési díjat.</span>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(0,0,0,.6)' }}>— Müller Dániel &amp; Jelencsity Miklós, NEZOR</p>
        {SUB}
      </>
    ),
  },
  {
    id: 'v10',
    num: '10',
    name: 'Két címke, mint egy garanciacímke',
    rationale: 'Az ígéret és a garancia két külön, egymásra pakolt „matrica” — warranty-label vizuális nyelv.',
    render: () => (
      <>
        {BADGE}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{
            background: '#14161b', color: '#fff', fontWeight: 800, fontSize: 'clamp(1rem,2.4vw,1.5rem)',
            padding: '11px 24px', borderRadius: 10, letterSpacing: '-0.01em',
          }}>
            ÚJ ÜGYFELEK 30 NAP ALATT
          </span>
          <span style={{
            background: 'transparent', color: '#1D4ED8', fontWeight: 800, fontSize: 'clamp(.85rem,2vw,1.15rem)',
            padding: '9px 22px', borderRadius: 10, border: '2px solid #1D4ED8', letterSpacing: '-0.005em',
          }}>
            VAGY VISSZAKAPOD A HIRDETÉSKEZELÉSI DÍJAT
          </span>
        </div>
        <div style={{ marginTop: 6 }}>{SUB}</div>
      </>
    ),
  },
  {
    id: 'v11',
    num: '11',
    name: '04 + 09 ötvözet — idézet, nagy számmal',
    rationale: 'Az alapítói idézet személyessége, benne a „30” mint kiemelt vizuális horgony a mondat közepén.',
    render: () => (
      <>
        <div style={{ fontSize: 56, lineHeight: .5, fontWeight: 900, color: 'rgba(29,78,216,.28)', marginBottom: 2 }}>&ldquo;</div>
        <h2
          className={landing.h1}
          style={{
            fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, fontStyle: 'italic',
            maxWidth: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 6,
          }}
        >
          <span>Új ügyfeleket hozunk</span>
          <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{
              fontStyle: 'normal', fontWeight: 900, color: '#1D4ED8',
              fontSize: 'clamp(2.6rem, 7vw, 4rem)', lineHeight: .85, letterSpacing: '-0.03em',
            }}>30</span>
            nap alatt.
          </span>
          <span className={landing.grad} style={{ fontStyle: 'normal', width: '100%', display: 'block', marginTop: 4 }}>
            Vagy visszakapod a hirdetéskezelési díjat.
          </span>
        </h2>
        {SUB}
      </>
    ),
  },
];

export function HeroVariaciok() {
  return (
    <div className={s.wrap}>
      <div className={s.intro}>
        <div className={s.introEyebrow}>Belső eszköz · Hero headline</div>
        <h1 className={s.introTitle}>10 elrendezési irány ugyanarra a szövegre</h1>
        <p className={s.introText}>
          A szöveg fix marad — „Új ügyfelek 30 nap alatt. Vagy visszakapod a hirdetéskezelési díjat.”
          Ami változik: tördelés, súlyozás, mit emelünk ki és milyen formában. Ez a valódi landing
          CSS-ét használja, tehát pixelre pontosan ezt látnád a hero-ban.
        </p>
        <nav className={s.indexNav}>
          {variants.map((v) => (
            <a key={v.id} href={`#${v.id}`}>
              <span>{v.num}</span> {v.name}
            </a>
          ))}
        </nav>
      </div>

      {variants.map((v) => (
        <section key={v.id} id={v.id} className={s.card}>
          <div className={s.strip}>
            <span className={s.num}>{v.num}</span>
            <span className={s.name}>{v.name}</span>
            <span className={s.rationale}>{v.rationale}</span>
          </div>
          <div className={s.stage}>{v.render()}</div>
        </section>
      ))}

      <p className={s.footNote}>
        Ez az oldal csak belső nézegetésre való, nincs linkelve sehonnan. Mondd meg, melyik számot
        építsem be a valódi /landing hero-jába.
      </p>
    </div>
  );
}
