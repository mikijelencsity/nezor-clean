'use client';

export default function Page() {
  return (
    <>
      <main>
        <header>
          <div className="wrap nav">
            <div className="logo">NE<span>ZOR</span></div>
            <div className="nav-right">
              <a href="#csomagok" className="nav-link">Csomagok</a>
              <a href="#kapcsolat" className="nav-link">Kapcsolat</a>
              <a href="#kapcsolat" className="btn btn-primary">Ajánlatot kérek</a>
            </div>
          </div>
        </header>

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
              <div>
                <h3>Nem tudod melyik kell?</h3>
                <p>
                  A legtöbb vállalkozásnak a Többoldalas csomag a legerősebb döntés.
                  Az Alap indulni jó, a Prémium pedig akkor kell, ha a megjelenésednek is prémiumnak kell lennie.
                </p>
              </div>
              <a href="#" className="btn btn-primary">Segíts választani</a>
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

        header{
          position:sticky;
          top:0;
          z-index:30;
          background:rgba(248,248,242,.78);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(10,25,45,.06);
        }

        .nav{
          min-height:74px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
        }

        .logo{
          font-size:22px;
          font-weight:1000;
          letter-spacing:-1px;
          color:#081022;
        }

        .logo span{color:#00bfe9}

        .nav-right{
          display:flex;
          align-items:center;
          gap:14px;
        }

        .nav-link{
          font-size:14px;
          font-weight:900;
          color:#596273;
        }

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
          padding:72px 0 82px;
        }

        .hero-grid{
          display:grid;
          grid-template-columns:.82fr 1.18fr;
          gap:42px;
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
          font-size:clamp(44px,6.4vw,82px);
          line-height:.92;
          letter-spacing:-3.5px;
          color:#081022;
          margin-bottom:20px;
          max-width:640px;
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
          aspect-ratio:5/4;
          min-height:520px;
          border-radius:34px;
          overflow:hidden;
          background:
            radial-gradient(circle at 8% 18%, rgba(0,223,255,.23), transparent 26%),
            radial-gradient(circle at 88% 82%, rgba(215,255,56,.20), transparent 28%),
            linear-gradient(145deg,#081226 0%,#090f23 52%,#071022 100%);
          box-shadow:0 34px 90px rgba(8,16,34,.25);
          border:1px solid rgba(255,255,255,.12);
          padding:38px 34px;
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
          margin-bottom:44px;
        }

        .visual-brand{
          color:var(--cyan);
          letter-spacing:7px;
          font-size:13px;
          font-weight:1000;
          margin-bottom:20px;
        }

        .visual-title{
          display:inline-block;
          font-size:clamp(42px,5vw,68px);
          line-height:1;
          letter-spacing:-2.5px;
          font-weight:1000;
          background:var(--accent);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          filter:drop-shadow(0 12px 32px rgba(0,223,255,.15));
        }

        .visual-cards{
          position:relative;
          z-index:2;
          display:grid;
          grid-template-columns:1fr 1.12fr 1fr;
          gap:20px;
          align-items:center;
        }

        .visual-card{
          min-height:330px;
          border-radius:28px;
          padding:28px 26px;
          border:1px solid rgba(255,255,255,.12);
          background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.032));
          box-shadow:0 24px 70px rgba(0,0,0,.18);
          backdrop-filter:blur(10px);
          display:flex;
          flex-direction:column;
          justify-content:center;
          position:relative;
          overflow:hidden;
        }

        .visual-card.featured{
          min-height:392px;
          border-color:rgba(0,223,255,.55);
          box-shadow:
            0 28px 80px rgba(0,223,255,.12),
            inset 0 0 0 1px rgba(215,255,56,.45);
          transform:translateY(-10px);
        }

        .visual-card.featured:before{
          content:"";
          position:absolute;
          inset:-1px;
          background:radial-gradient(circle at 50% 0%,rgba(0,223,255,.17),transparent 42%);
          pointer-events:none;
        }

        .icon-bubble{
          width:58px;
          height:58px;
          border-radius:50%;
          display:grid;
          place-items:center;
          margin:0 auto 28px;
          color:var(--cyan);
          border:1px solid rgba(0,223,255,.28);
          background:rgba(0,223,255,.07);
          font-size:25px;
          font-weight:1000;
          box-shadow:0 0 34px rgba(0,223,255,.10);
        }

        .visual-card:nth-child(3) .icon-bubble{
          color:var(--lime);
          border-color:rgba(215,255,56,.26);
          background:rgba(215,255,56,.07);
        }

        .popular-badge{
          position:absolute;
          top:24px;
          left:50%;
          transform:translateX(-50%);
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:9px 15px;
          border-radius:999px;
          background:var(--accent);
          color:#061020;
          font-size:13px;
          font-weight:1000;
          white-space:nowrap;
          box-shadow:0 10px 30px rgba(215,255,56,.16);
        }

        .visual-card h3{
          color:#fff;
          text-align:center;
          font-size:clamp(28px,3vw,39px);
          letter-spacing:-1.4px;
          line-height:1;
          margin-bottom:18px;
        }

        .visual-card .small-line{
          width:46px;
          height:3px;
          border-radius:999px;
          background:var(--accent);
          margin:0 auto 28px;
        }

        .visual-price{
          text-align:center;
          font-size:clamp(34px,4vw,50px);
          line-height:1;
          font-weight:1000;
          letter-spacing:-2px;
          background:var(--accent);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          margin-bottom:12px;
        }

        .visual-desc{
          text-align:center;
          color:#b7c3d5;
          font-weight:700;
          line-height:1.45;
          font-size:15px;
          margin-bottom:24px;
          min-height:42px;
        }

        .visual-feature-list{
          display:grid;
          gap:12px;
          padding-top:22px;
          border-top:1px solid rgba(255,255,255,.08);
        }

        .visual-feature{
          display:flex;
          gap:10px;
          align-items:center;
          color:#e9f1ff;
          font-size:14px;
          font-weight:750;
        }

        .visual-feature i{
          width:20px;
          height:20px;
          flex:none;
          border-radius:50%;
          display:grid;
          place-items:center;
          color:#061020;
          background:var(--accent);
          font-style:normal;
          font-size:12px;
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
          align-items:center;
          justify-content:space-between;
          gap:20px;
          flex-wrap:wrap;
          box-shadow:var(--shadow);
        }

        .final-cta h3{
          color:#fff;
          font-size:clamp(28px,4vw,44px);
          line-height:.96;
          letter-spacing:-2px;
          margin-bottom:8px;
        }

        .final-cta p{
          color:#a5b5c9;
          font-weight:650;
          line-height:1.65;
          max-width:720px;
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
          .package-visual{padding:28px 18px;border-radius:28px}
          .visual-title{font-size:42px}
          .after-packages{padding:64px 0 76px}
        }
      `}</style>
    </>
  );
}
