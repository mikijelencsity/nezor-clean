'use client';

import { useState } from 'react';
import { trackEvent } from '@/components/analytics/FacebookPixel';
import { NavDrawer } from '@/components/ui/NavDrawer';

export default function Page() {
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return;
    setLoading(true);
    setError('');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nev, email, telefon }),
    });
    if (!res.ok) {
      setError('Hiba történt, kérjük próbáld újra.');
      setLoading(false);
      return;
    }
    trackEvent('Lead');
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <main>
        <NavDrawer />

        <section className="hero" id="csomagok">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">NEZOR / Csomagjaink</div>
              <h1>Weboldal <span>csomagok</span> vállalkozásoknak.</h1>
              <p>
                3 tiszta opció: induláshoz, komolyabb céges megjelenéshez vagy prémium szinthez.
                Nincs túlbonyolítva: választasz egy irányt, mi pedig felépítjük.
              </p>

              <div className="hero-actions">
                <a href="#kapcsolat" className="btn btn-primary">Segíts választani</a>
                <a href="#bizalom" className="btn btn-secondary">Mit kapsz?</a>
              </div>

              <div className="hero-mini">
                <div className="mini-card">
                  <strong>50k</strong>
                  <span>belépő csomag</span>
                </div>
                <div className="mini-card">
                  <strong>120k</strong>
                  <span>legjobb ár / érték</span>
                </div>
                <div className="mini-card">
                  <strong>320k</strong>
                  <span>prémium megoldás</span>
                </div>
              </div>
            </div>

            <div className="package-visual" aria-label="NEZOR csomagjaink látványos árkártyák">
              <div className="neon-line left"></div>
              <div className="neon-line right"></div>

              <div className="visual-head">
                <div className="visual-brand">NEZOR</div>
                <div className="visual-title">Csomagjaink</div>
              </div>

              <div className="visual-cards">
                <article className="visual-card">
                  <div className="icon-bubble">▣</div>
                  <h3>Alap</h3>
                  <div className="small-line"></div>
                  <div className="visual-price">50 000 Ft</div>
                  <div className="visual-desc">1 oldalas induló weboldal</div>

                  <div className="visual-feature-list">
                    <div className="visual-feature"><i>✓</i> Reszponzív design</div>
                    <div className="visual-feature"><i>✓</i> Alap SEO beállítás</div>
                    <div className="visual-feature"><i>✓</i> Kapcsolatfelvételi űrlap</div>
                  </div>
                </article>

                <article className="visual-card featured">
                  <div className="popular-badge">★ Legnépszerűbb</div>
                  <div className="icon-bubble">☆</div>
                  <h3>Többoldalas</h3>
                  <div className="small-line"></div>
                  <div className="visual-price">120 000 Ft</div>
                  <div className="visual-desc">Komolyabb céges megjelenéshez</div>

                  <div className="visual-feature-list">
                    <div className="visual-feature"><i>✓</i> Egyedi, modern design</div>
                    <div className="visual-feature"><i>✓</i> Több oldal</div>
                    <div className="visual-feature"><i>✓</i> Fejlett SEO alapok</div>
                  </div>
                </article>

                <article className="visual-card">
                  <div className="icon-bubble">◇</div>
                  <h3>Prémium</h3>
                  <div className="small-line"></div>
                  <div className="visual-price">320 000 Ft</div>
                  <div className="visual-desc">Egyedi, prémium megoldás</div>

                  <div className="visual-feature-list">
                    <div className="visual-feature"><i>✓</i> Teljesen egyedi design</div>
                    <div className="visual-feature"><i>✓</i> Egyedi fejlesztések</div>
                    <div className="visual-feature"><i>✓</i> Prémium támogatás</div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="after-packages" id="bizalom">
          <div className="wrap">
            <div className="trust-grid">
              <div className="trust-card">
                <strong>Mobilbarát</strong>
                <span>Telefonon is rendesen használható oldal, mert ott fogják legtöbben megnézni.</span>
              </div>

              <div className="trust-card">
                <strong>Átlátható árak</strong>
                <span>Három világos csomag, hogy ne kelljen találgatni az induló költségeket.</span>
              </div>

              <div className="trust-card">
                <strong>Ajánlatkérésre építve</strong>
                <span>Nem csak szép oldal, hanem olyan felépítés, ami döntés felé viszi a látogatót.</span>
              </div>
            </div>

            <div className="final-cta" id="kapcsolat">
              {sent ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Megkaptuk!</h3>
                  <p>Hamarosan felvesszük veled a kapcsolatot.</p>
                </div>
              ) : (
                <>
                  <div className="cta-text">
                    <h3>Nem tudod melyik kell?</h3>
                    <p>
                      Írj nekünk és segítünk választani. A legtöbb vállalkozásnak a Többoldalas csomag a legerősebb döntés.
                    </p>
                  </div>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="nezor_hp_field" value={hp} onChange={e => setHp(e.target.value)} style={{display:'none'}} tabIndex={-1} autoComplete="off" />
                    <div className="form-row">
                      <input className="form-input" type="text" placeholder="Neved" value={nev} onChange={e => setNev(e.target.value)} required />
                      <input className="form-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <input className="form-input" type="tel" placeholder="Telefonszám (opcionális)" value={telefon} onChange={e => setTelefon(e.target.value)} />
                    {error && <p className="form-error">{error}</p>}
                    <button className="btn btn-primary form-btn" type="submit" disabled={loading}>
                      {loading ? 'Küldés...' : 'Segíts választani'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <div>© NEZOR</div>
          <div>Weboldal / Hirdetés / Online rendszer</div>
        </div>
      </footer>

      <style jsx global>{`
        :root{
          --dark:#081022;
          --dark2:#0b1832;
          --text:#071225;
          --muted:#5e6a7a;
          --mutedDark:#9fb0c5;
          --white:#ffffff;
          --cyan:#00dfff;
          --lime:#d7ff38;
          --accent:linear-gradient(135deg,var(--cyan),var(--lime));
          --line:rgba(255,255,255,.12);
          --lineLight:rgba(10,25,45,.08);
          --shadow:0 26px 80px rgba(0,0,0,.28);
        }

        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{
          font-family:Inter,Arial,sans-serif;
          color:var(--text);
          background:
            radial-gradient(circle at top left, rgba(0,223,255,.14), transparent 22%),
            radial-gradient(circle at top right, rgba(215,255,56,.13), transparent 24%),
            linear-gradient(180deg,#f8f8f2 0%, #f7f7f2 46%, #081022 46%, #081022 100%);
          overflow-x:hidden;
        }

        a{text-decoration:none;color:inherit}
        .wrap{width:min(1180px,calc(100% - 32px));margin:0 auto}


        .btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:14px 20px;
          border-radius:999px;
          font-weight:950;
          transition:.2s ease;
        }

        .btn:hover{transform:translateY(-2px)}

        .btn-primary{
          background:var(--accent);
          color:#071225;
          box-shadow:0 12px 30px rgba(0,223,255,.22);
        }

        .btn-secondary{
          background:#fff;
          border:1px solid var(--lineLight);
          color:#071225;
        }

        .hero{
          padding:64px 0 80px;
        }

        .hero-grid{
          display:grid;
          grid-template-columns:1fr 1.4fr;
          gap:48px;
          align-items:center;
        }

        .eyebrow{
          display:inline-block;
          color:#00bfe9;
          font-size:12px;
          letter-spacing:1.8px;
          text-transform:uppercase;
          font-weight:950;
          margin-bottom:18px;
        }

        h1{
          font-size:clamp(36px,4.8vw,64px);
          line-height:.96;
          letter-spacing:-2.5px;
          color:#081022;
          margin-bottom:20px;
        }

        h1 span{
          background:var(--accent);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
        }

        .hero p{
          font-size:clamp(17px,1.7vw,20px);
          line-height:1.65;
          color:#5d6675;
          font-weight:650;
          max-width:620px;
        }

        .hero-actions{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:28px;
        }

        .hero-mini{
          margin-top:30px;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
          max-width:620px;
        }

        .mini-card{
          background:#fff;
          border:1px solid var(--lineLight);
          border-radius:18px;
          padding:16px;
          box-shadow:0 12px 30px rgba(8,16,34,.06);
        }

        .mini-card strong{
          display:block;
          font-size:22px;
          letter-spacing:-1px;
          color:#071225;
        }

        .mini-card span{
          display:block;
          margin-top:4px;
          color:#717b89;
          font-size:13px;
          font-weight:800;
        }

        .package-visual{
          position:relative;
          border-radius:28px;
          overflow:hidden;
          background:
            radial-gradient(circle at 8% 18%, rgba(0,223,255,.23), transparent 26%),
            radial-gradient(circle at 88% 82%, rgba(215,255,56,.20), transparent 28%),
            linear-gradient(145deg,#081226 0%,#090f23 52%,#071022 100%);
          box-shadow:0 34px 90px rgba(8,16,34,.25);
          border:1px solid rgba(255,255,255,.12);
          padding:28px 22px;
          isolation:isolate;
        }

        .package-visual:before{
          content:"";
          position:absolute;
          width:280px;
          height:280px;
          border-radius:50%;
          left:-100px;
          top:-80px;
          background:radial-gradient(circle, rgba(0,223,255,.30), rgba(0,223,255,0) 68%);
          filter:blur(8px);
          z-index:-1;
        }

        .package-visual:after{
          content:"";
          position:absolute;
          width:360px;
          height:360px;
          border-radius:50%;
          right:-140px;
          bottom:-140px;
          background:radial-gradient(circle, rgba(215,255,56,.22), rgba(215,255,56,0) 68%);
          filter:blur(10px);
          z-index:-1;
        }

        .neon-line{
          position:absolute;
          pointer-events:none;
          opacity:.85;
        }

        .neon-line.left{
          width:150px;
          height:250px;
          left:20px;
          top:35px;
          border-left:2px solid rgba(0,223,255,.62);
          border-radius:60% 0 0 60%;
          transform:rotate(-18deg);
          box-shadow:-8px 0 30px rgba(0,223,255,.20);
        }

        .neon-line.right{
          width:210px;
          height:150px;
          right:-40px;
          bottom:14px;
          border-bottom:2px solid rgba(215,255,56,.62);
          border-radius:0 0 70% 70%;
          transform:rotate(-14deg);
          box-shadow:0 8px 30px rgba(215,255,56,.16);
        }

        .visual-head{
          text-align:center;
          position:relative;
          z-index:2;
          margin-bottom:24px;
        }

        .visual-brand{
          color:var(--cyan);
          letter-spacing:5px;
          font-size:11px;
          font-weight:1000;
          margin-bottom:10px;
        }

        .visual-title{
          display:inline-block;
          font-size:clamp(28px,3vw,42px);
          line-height:1;
          letter-spacing:-1.5px;
          font-weight:1000;
          background:var(--accent);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          filter:drop-shadow(0 8px 20px rgba(0,223,255,.15));
        }

        .visual-cards{
          position:relative;
          z-index:2;
          display:grid;
          grid-template-columns:1fr 1.12fr 1fr;
          gap:10px;
          align-items:center;
        }

        .visual-card{
          min-height:auto;
          border-radius:20px;
          padding:18px 14px;
          border:1px solid rgba(255,255,255,.12);
          background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.032));
          box-shadow:0 16px 50px rgba(0,0,0,.18);
          backdrop-filter:blur(10px);
          display:flex;
          flex-direction:column;
          justify-content:center;
          position:relative;
          overflow:hidden;
        }

        .visual-card.featured{
          min-height:auto;
          padding-top:46px;
          border-color:rgba(0,223,255,.55);
          box-shadow:
            0 20px 60px rgba(0,223,255,.12),
            inset 0 0 0 1px rgba(215,255,56,.45);
          transform:translateY(-8px);
        }

        .visual-card.featured:before{
          content:"";
          position:absolute;
          inset:-1px;
          background:radial-gradient(circle at 50% 0%,rgba(0,223,255,.17),transparent 42%);
          pointer-events:none;
        }

        .icon-bubble{
          width:40px;
          height:40px;
          border-radius:50%;
          display:grid;
          place-items:center;
          margin:0 auto 14px;
          color:var(--cyan);
          border:1px solid rgba(0,223,255,.28);
          background:rgba(0,223,255,.07);
          font-size:17px;
          font-weight:1000;
          box-shadow:0 0 20px rgba(0,223,255,.10);
        }

        .visual-card:nth-child(3) .icon-bubble{
          color:var(--lime);
          border-color:rgba(215,255,56,.26);
          background:rgba(215,255,56,.07);
        }

        .popular-badge{
          position:absolute;
          top:14px;
          left:50%;
          transform:translateX(-50%);
          display:inline-flex;
          align-items:center;
          gap:5px;
          padding:5px 10px;
          border-radius:999px;
          background:var(--accent);
          color:#061020;
          font-size:10px;
          font-weight:1000;
          white-space:nowrap;
          box-shadow:0 6px 20px rgba(215,255,56,.16);
        }

        .visual-card h3{
          color:#fff;
          text-align:center;
          font-size:clamp(16px,1.8vw,22px);
          letter-spacing:-.8px;
          line-height:1;
          margin-bottom:10px;
        }

        .visual-card .small-line{
          width:32px;
          height:2px;
          border-radius:999px;
          background:var(--accent);
          margin:0 auto 14px;
        }

        .visual-price{
          text-align:center;
          font-size:clamp(20px,2.2vw,28px);
          line-height:1;
          font-weight:1000;
          letter-spacing:-1px;
          background:var(--accent);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          margin-bottom:6px;
        }

        .visual-desc{
          text-align:center;
          color:#b7c3d5;
          font-weight:700;
          line-height:1.4;
          font-size:11px;
          margin-bottom:14px;
          min-height:auto;
        }

        .visual-feature-list{
          display:grid;
          gap:7px;
          padding-top:12px;
          border-top:1px solid rgba(255,255,255,.08);
        }

        .visual-feature{
          display:flex;
          gap:7px;
          align-items:center;
          color:#e9f1ff;
          font-size:11px;
          font-weight:750;
        }

        .visual-feature i{
          width:15px;
          height:15px;
          flex:none;
          border-radius:50%;
          display:grid;
          place-items:center;
          color:#061020;
          background:var(--accent);
          font-style:normal;
          font-size:9px;
          font-weight:1000;
        }

        .after-packages{
          background:#081022;
          padding:82px 0 92px;
          position:relative;
          overflow:hidden;
        }

        .after-packages:before{
          content:"";
          position:absolute;
          width:560px;
          height:560px;
          border-radius:50%;
          background:radial-gradient(circle, rgba(0,223,255,.12), rgba(0,223,255,0) 66%);
          left:-220px;
          top:30px;
          filter:blur(12px);
        }

        .after-packages:after{
          content:"";
          position:absolute;
          width:560px;
          height:560px;
          border-radius:50%;
          background:radial-gradient(circle, rgba(215,255,56,.12), rgba(215,255,56,0) 66%);
          right:-220px;
          bottom:-120px;
          filter:blur(12px);
        }

        .trust-grid{
          position:relative;
          z-index:2;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;
          margin-bottom:28px;
        }

        .trust-card{
          padding:24px;
          border-radius:26px;
          background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.035));
          border:1px solid rgba(255,255,255,.10);
          box-shadow:var(--shadow);
        }

        .trust-card strong{
          display:block;
          color:#fff;
          font-size:24px;
          letter-spacing:-.8px;
          margin-bottom:8px;
        }

        .trust-card span{
          display:block;
          color:#a7b4c7;
          line-height:1.6;
          font-weight:650;
        }

        .final-cta{
          position:relative;
          z-index:2;
          padding:30px;
          border-radius:28px;
          background:linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.045));
          border:1px solid rgba(255,255,255,.10);
          display:flex;
          flex-direction:column;
          gap:24px;
          box-shadow:var(--shadow);
        }

        .final-cta{
          flex-direction:column;
          align-items:stretch;
          gap:28px;
        }

        .cta-text h3{
          color:#fff;
          font-size:clamp(28px,4vw,44px);
          line-height:.96;
          letter-spacing:-2px;
          margin-bottom:8px;
        }

        .cta-text p{
          color:#a5b5c9;
          font-weight:650;
          line-height:1.65;
        }

        .contact-form{
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .form-row{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
        }

        .form-input{
          width:100%;
          padding:14px 18px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.06);
          color:#fff;
          font-size:15px;
          font-family:inherit;
          outline:none;
          transition:.2s;
        }

        .form-input::placeholder{color:rgba(255,255,255,.35)}
        .form-input:focus{border-color:rgba(0,223,255,.5);background:rgba(0,223,255,.06)}

        .form-btn{
          align-self:flex-start;
          border:none;
          cursor:pointer;
          font-family:inherit;
          font-size:15px;
        }

        .form-btn:disabled{opacity:.6;cursor:not-allowed}

        .form-error{
          color:#ff6b6b;
          font-size:14px;
          font-weight:700;
        }

        .form-success{
          text-align:center;
          padding:40px;
          width:100%;
        }

        .success-icon{
          width:60px;
          height:60px;
          border-radius:50%;
          background:var(--accent);
          color:#061020;
          font-size:26px;
          font-weight:900;
          display:grid;
          place-items:center;
          margin:0 auto 18px;
        }

        .form-success h3{
          color:#fff;
          font-size:32px;
          letter-spacing:-1px;
          margin-bottom:8px;
        }

        .form-success p{color:#a5b5c9;font-weight:650}

        @media (max-width:580px){
          .form-row{grid-template-columns:1fr}
        }

        footer{
          background:#081022;
          color:#8fa0b8;
          border-top:1px solid rgba(255,255,255,.06);
          padding:30px 0 40px;
          font-size:14px;
          font-weight:750;
        }

        .footer-row{
          display:flex;
          justify-content:space-between;
          gap:16px;
          flex-wrap:wrap;
        }

        @media (max-width:1120px){
          .hero-grid{grid-template-columns:1fr}
          .package-visual{min-height:auto}
        }

        @media (max-width:820px){
          .visual-cards{
            grid-template-columns:1fr;
          }

          .visual-card,
          .visual-card.featured{
            min-height:auto;
            transform:none;
          }

          .package-visual{
            aspect-ratio:auto;
          }

          .trust-grid{
            grid-template-columns:1fr;
          }
        }

        @media (max-width:720px){
          .wrap{width:min(100% - 22px,1180px)}
          .nav-link{display:none}
          .hero{padding:48px 0 58px}
          h1{letter-spacing:-2.4px}
          .hero-mini{grid-template-columns:1fr}
          .package-visual{padding:28px 18px;border-radius:20px}
          .visual-title{font-size:42px}
          .after-packages{padding:64px 0 76px}
        }
      `}</style>
    </>
  );
}
