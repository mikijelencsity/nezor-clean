'use client';
import { useEffect } from 'react';
import './home-page.css';

export function HomePage() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const el = document.getElementById('scrollProgress');
      if (el) el.style.width = pct + '%';
    });

    // Review kártyák reveal scrollra
    const cards = document.querySelectorAll('.review-card');
    cards.forEach(c => c.classList.add('reveal-init'));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-show');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
    cards.forEach(c => obs.observe(c));

    // Hirdetési kártya: kattintásra nagy nézet (lightbox) a képpel + cégnévvel
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg') as HTMLImageElement | null;
    const lbCompany = document.getElementById('lightboxCompany');
    function openLightbox(src: string, company: string, alt: string) {
      if (lbImg) { lbImg.src = src; lbImg.alt = alt || ''; }
      if (lbCompany) lbCompany.textContent = company || '';
      if (lb) { lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      if (lb) { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
      document.body.style.overflow = '';
    }
    document.querySelectorAll<HTMLImageElement>('.creative-img.clickable img[data-company]').forEach(img => {
      const parent = img.closest('.creative-img');
      if (parent) parent.addEventListener('click', () => openLightbox(img.src, (img as HTMLImageElement & { dataset: DOMStringMap }).dataset.company || '', img.alt));
    });
    const lightboxCloseBtn = document.getElementById('lightboxClose');
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // Halk háttér-konfetti az Ajándék szekcióban — alulról lassan felszáll, folyamatosan
    (function () {
      const canvas = document.getElementById('giftConfetti') as HTMLCanvasElement | null;
      const section = document.getElementById('gift');
      if (!canvas || !section) return;
      const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      if (reduce) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const colors = ['#00e5ff', '#ffe600', '#ffffff', '#a855f7'];
      let W = 0, H = 0, parts: any[] = [], running = false, visible = false;
      function resize() { W = canvas!.width = section!.clientWidth; H = canvas!.height = section!.clientHeight; }
      function makePart(initial: boolean) {
        return {
          x: Math.random() * W,
          y: initial ? Math.random() * H : H + 10 + Math.random() * 40,
          vy: -(0.35 + Math.random() * 0.6),
          vx: (Math.random() - 0.5) * 0.3,
          size: 5 + Math.random() * 5,
          color: colors[(Math.random() * colors.length) | 0],
          rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.05,
          sway: Math.random() * Math.PI * 2, swaySp: 0.01 + Math.random() * 0.02,
          alpha: 0.3 + Math.random() * 0.35
        };
      }
      function init() { resize(); parts = []; for (let i = 0; i < 20; i++) parts.push(makePart(true)); }
      function loop() {
        if (!running) return;
        ctx!.clearRect(0, 0, W, H);
        parts.forEach(p => {
          p.sway += p.swaySp; p.x += p.vx + Math.sin(p.sway) * 0.3; p.y += p.vy; p.rot += p.vr;
          if (p.y < -20) Object.assign(p, makePart(false));
          ctx!.save();
          ctx!.globalAlpha = p.alpha;
          ctx!.translate(p.x, p.y); ctx!.rotate(p.rot);
          ctx!.fillStyle = p.color;
          ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx!.restore();
        });
        requestAnimationFrame(loop);
      }
      window.addEventListener('resize', () => { if (visible) resize(); });
      const io = new IntersectionObserver(es => {
        es.forEach(e => {
          visible = e.isIntersecting;
          if (visible && !running) { parts.length ? resize() : init(); running = true; requestAnimationFrame(loop); }
          else if (!visible) { running = false; }
        });
      }, { threshold: 0 });
      io.observe(section);
    })();

    // Preloader
    const onLoad = () => {
      const pre = document.getElementById('preloader');
      if (!pre) return;
      const preLogo = document.getElementById('preLogo') as HTMLImageElement | null;
      const headline = document.getElementById('preHeadline');
      const heroLogo = document.querySelector('.hero-logo img') as HTMLImageElement | null;
      const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      const hold = reduce ? 400 : 1900;

      setTimeout(() => {
        if (headline) {
          (headline as HTMLElement).style.transition = 'opacity .35s ease, transform .35s ease';
          (headline as HTMLElement).style.opacity = '0';
          (headline as HTMLElement).style.transform = 'translateY(-8px)';
        }

        if (heroLogo && preLogo && !reduce) {
          const a = preLogo.getBoundingClientRect();
          const b = heroLogo.getBoundingClientRect();
          const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
          const dy = (b.top + b.height / 2) - (a.top + a.height / 2);
          const scale = b.height / a.height;
          preLogo.style.transition = 'transform .8s cubic-bezier(.65,0,.2,1)';
          preLogo.style.transform = `translate(${dx}px,${dy}px) scale(${scale})`;
          setTimeout(() => {
            pre.classList.add('hide');
            setTimeout(() => pre.remove(), 650);
          }, 820);
        } else {
          pre.classList.add('hide');
          setTimeout(() => pre.remove(), 650);
        }
      }, hold);
    };

    if (document.readyState === 'complete') {
      setTimeout(onLoad, 0);
    } else {
      window.addEventListener('load', onLoad);
    }

    // SMS-beugró
    (function () {
      const toast = document.getElementById('smsToast');
      const svc = document.getElementById('szolgaltatas');
      if (!toast || !svc) return;
      let shown = false;
      const io = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting && !shown) {
            shown = true;
            setTimeout(() => toast.classList.add('show'), 600);
            io.disconnect();
          }
        });
      }, { threshold: 0 });
      io.observe(svc);
      const smsText = document.getElementById('smsText');
      const smsClose = document.getElementById('smsClose');
      const smsContact = document.getElementById('smsContact');
      let phase = 0;
      if (smsContact) smsContact.addEventListener('click', () => { toast.classList.remove('show'); });
      if (smsClose) smsClose.addEventListener('click', () => {
        if (phase === 0) {
          phase = 1;
          if (smsText) smsText.textContent = 'NEZOR gépel…';
          setTimeout(() => {
            if (smsText) smsText.textContent = 'Most komolyan? 😅 Egy üzenet azért belefért volna...';
            phase = 2;
          }, 2500);
        } else if (phase === 2) {
          toast.classList.remove('show');
        }
      });
    })();

    // Nyeremény pop-up
    (function () {
      const pop = document.getElementById('winPop');
      const trigger = document.querySelector('.ai-section');
      if (!pop || !trigger) return;
      let shown = false;
      function openWin() {
        pop!.classList.add('show'); pop!.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      function closeWin() {
        pop!.classList.remove('show'); pop!.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      const io = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting && !shown) { shown = true; openWin(); io.disconnect(); }
        });
      }, { threshold: 0 });
      io.observe(trigger);
      const winCloseBtn = document.getElementById('winClose');
      if (winCloseBtn) winCloseBtn.addEventListener('click', closeWin);
      pop.addEventListener('click', e => { if (e.target === pop) closeWin(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && pop!.classList.contains('show')) closeWin(); });
      const winForm = document.getElementById('winForm');
      if (winForm) winForm.addEventListener('submit', e => {
        e.preventDefault();
        const card = pop!.querySelector('.winpop-card');
        if (card) {
          card.innerHTML = '<button class="winpop-close" id="winClose2" aria-label="Bezárás">×</button>' +
            '<div class="winpop-eyebrow">🎉 Sikeres jelentkezés</div>' +
            '<h2 class="winpop-title">Köszönjük!</h2>' +
            '<p class="winpop-sub">Felvettünk a listára. Ha te leszel a szerencsés, e-mailben jelentkezünk!</p>';
          const wc2 = document.getElementById('winClose2');
          if (wc2) wc2.addEventListener('click', closeWin);
        }
        setTimeout(closeWin, 2800);
      });
    })();

    // Jogi dokumentumok
    (function () {
      const note = '<div class="legal-note">Ez egy minta-sablon. Közzététel előtt töltsd ki a [szögletes zárójeles] részeket a saját cégadataiddal, és ellenőriztesd jogi szakemberrel.</div>';
      const docs: Record<string, { title: string; html: string }> = {
        aszf: {
          title: 'Általános Szerződési Feltételek', html: note +
            '<h3>1. Szolgáltató adatai</h3><p>Cégnév: [Cégnév]<br>Székhely: [Cím]<br>Adószám: [Adószám]<br>E-mail: [E-mail]<br>Telefon: [Telefon]</p>' +
            '<h3>2. A szolgáltatás tárgya</h3><p>A Szolgáltató weboldal- és webáruház-fejlesztési, online marketing és kapcsolódó szolgáltatásokat nyújt a Megrendelő részére egyedi megállapodás alapján.</p>' +
            '<h3>3. Megrendelés és szerződéskötés</h3><p>A megrendelés a kapcsolatfelvételt és az egyedi ajánlat kölcsönös, írásbeli (e-mailes) elfogadását követően jön létre.</p>' +
            '<h3>4. Díjazás és fizetés</h3><p>A szolgáltatás díja az egyedi ajánlatban szerepel. A fizetés a kiállított számla alapján, az azon megjelölt határidőig esedékes.</p>' +
            '<h3>5. Teljesítés</h3><p>A Szolgáltató a megállapodás szerinti tartalommal és határidőre teljesít. A Megrendelő köteles a szükséges anyagokat és visszajelzéseket időben biztosítani.</p>' +
            '<h3>6. Elállás, lemondás</h3><p>Egyedi igény szerint megkezdett munkák esetén a Megrendelőt a teljesítés arányában fizetési kötelezettség terheli; a részleteket az egyedi szerződés tartalmazza.</p>' +
            '<h3>7. Felelősség</h3><p>A Szolgáltató nem felel a Megrendelő által átadott tartalmak jogszerűségéért, valamint a rajta kívül álló okból (pl. harmadik fél szolgáltatása) bekövetkező hibákért.</p>' +
            '<h3>8. Panaszkezelés</h3><p>Panasz a [E-mail] címen tehető, amelyet a Szolgáltató [pl. 30] napon belül kivizsgál és megválaszol.</p>' +
            '<h3>9. Záró rendelkezések</h3><p>A nem szabályozott kérdésekben a magyar jog, különösen a Ptk. az irányadó. Hatályos: [dátum].</p>'
        },
        adatkezeles: {
          title: 'Adatkezelési tájékoztató', html: note +
            '<h3>1. Az adatkezelő</h3><p>[Cégnév], [Székhely], adószám: [Adószám], e-mail: [E-mail].</p>' +
            '<h3>2. Kezelt adatok és cél</h3><p>Kapcsolatfelvételkor: név, e-mail-cím, telefonszám, üzenet — az érdeklődés megválaszolása, ajánlatadás, kapcsolattartás céljából. Nyereményjáték esetén: e-mail-cím — a részvétel és az eredményről való értesítés céljából.</p>' +
            '<h3>3. Az adatkezelés jogalapja</h3><p>Az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) a)), illetve szerződés teljesítése (6. cikk (1) b)).</p>' +
            '<h3>4. Tárolás ideje</h3><p>A cél megvalósulásáig vagy a hozzájárulás visszavonásáig; jogszabályi kötelezettség esetén az abban előírt ideig.</p>' +
            '<h3>5. Adatfeldolgozók</h3><p>Tárhelyszolgáltató: [Tárhely]. E-mail/marketing eszköz: [Szolgáltató]. Ők saját adatvédelmi szabályzatuk szerint járnak el.</p>' +
            '<h3>6. Az érintett jogai</h3><ul><li>Tájékoztatás, hozzáférés</li><li>Helyesbítés, törlés</li><li>Korlátozás</li><li>Adathordozhatóság</li><li>Tiltakozás, hozzájárulás visszavonása</li></ul><p>A jogok a [E-mail] címen gyakorolhatók.</p>' +
            '<h3>7. Jogorvoslat</h3><p>Panasz esetén a NAIH-hoz (www.naih.hu) lehet fordulni, illetve bírósági jogorvoslat vehető igénybe. Hatályos: [dátum].</p>'
        },
        cookie: {
          title: 'Cookie szabályzat', html: note +
            '<h3>1. Mik a sütik?</h3><p>A sütik kis adatfájlok, amelyeket a böngésződ tárol a weboldal megfelelő működése és a felhasználói élmény javítása érdekében.</p>' +
            '<h3>2. Milyen sütiket használunk?</h3><ul><li><b>Működéshez szükséges:</b> pl. a cookie-hozzájárulásod megjegyzése. Ezek nélkül az oldal nem működik megfelelően.</li><li><b>Statisztikai:</b> névtelen módon segítenek megérteni az oldal használatát (pl. [Google Analytics], ha használsz ilyet).</li></ul>' +
            '<h3>3. Hozzájárulás kezelése</h3><p>Az első látogatáskor dönthetsz a sütik elfogadásáról vagy elutasításáról. A döntésed a böngésződ tárolt adatainak törlésével módosíthatod.</p>' +
            '<h3>4. Sütik letiltása</h3><p>A böngésződ beállításaiban bármikor letilthatod vagy törölheted a sütiket; ez egyes funkciók működését korlátozhatja.</p>' +
            '<p>Kapcsolat: [E-mail]. Hatályos: [dátum].</p>'
        }
      };
      const modal = document.getElementById('legalModal');
      if (modal) {
        const titleEl = document.getElementById('legalTitle');
        const bodyEl = document.getElementById('legalBody');
        const card = modal.querySelector('.legal-card');
        const openLegal = (key: string) => {
          const d = docs[key]; if (!d) return;
          if (titleEl) titleEl.textContent = d.title;
          if (bodyEl) bodyEl.innerHTML = d.html;
          modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          if (card) (card as HTMLElement).scrollTop = 0;
        };
        const closeLegal = () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
        document.querySelectorAll('[data-legal]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openLegal(el.getAttribute('data-legal') || ''); }));
        const legalCloseBtn = document.getElementById('legalClose');
        if (legalCloseBtn) legalCloseBtn.addEventListener('click', closeLegal);
        modal.addEventListener('click', e => { if (e.target === modal) closeLegal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) closeLegal(); });
      }

      // Cookie sáv
      const bar = document.getElementById('cookieBar');
      if (bar) {
        if (!localStorage.getItem('nezorCookieConsent')) setTimeout(() => bar.classList.add('show'), 1200);
        const decide = (v: string) => { try { localStorage.setItem('nezorCookieConsent', v); } catch (e) { } bar.classList.remove('show'); };
        const acceptBtn = document.getElementById('cookieAccept');
        const rejectBtn = document.getElementById('cookieReject');
        if (acceptBtn) acceptBtn.addEventListener('click', () => decide('accepted'));
        if (rejectBtn) rejectBtn.addEventListener('click', () => decide('rejected'));
      }
    })();

    // A lebegő CTA ne takarja a láblécet
    (function () {
      const fcta = document.querySelector('.floating-cta') as HTMLElement | null;
      const foot = document.querySelector('.footer');
      if (!fcta || !foot) return;
      fcta.style.transition = 'opacity .3s ease';
      new IntersectionObserver(es => es.forEach(e => {
        fcta!.style.opacity = e.isIntersecting ? '0' : '1';
        fcta!.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
      }), { threshold: 0 }).observe(foot);
    })();

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      <div className="preloader" id="preloader">
        <img className="preloader-logo" src="/nezor-logo-transparent.png" alt="NEZOR" id="preLogo" />
        <div className="preloader-headline" id="preHeadline">
          <span className="pre-word pre-left">Sikerre</span>
          <span className="pre-word pre-right">készen?</span>
        </div>
      </div>

      <div className="scroll-progress" id="scrollProgress"></div>

      <section className="hero">
        <div className="grid-bg"></div>
        <div className="glow glow-blue"></div>
        <div className="glow glow-yellow"></div>

        <div className="container">
          <div className="hero-logo">
            <img src="/nezor-logo-transparent.png" alt="NEZOR" />
          </div>

          <h1>
            Online rendszer,<br />
            ami <span className="accent h1-pop">vevőt</span> hoz<br />
            <span className="accent h1-pop">0–24</span>
          </h1>

          <p className="sub">
            Több érdeklődő, több vásárló, kiszámítható növekedés. Mi felépítjük hozzá a rendszert.
          </p>

          <div className="cta-row">
            <a href="#kapcsolat" className="btn btn-primary">Konzultációt kérek →</a>
            <a href="#process" className="btn btn-ghost">Nézzük tovább!</a>
          </div>

          <div className="media">
            <video
              className="media-img"
              autoPlay
              muted
              loop
              playsInline
              style={{ transform: 'scale(1.14)' }}
            >
              <source src="/cursorful-video-1780505482371.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="reviews light-section" id="referenciak">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '30%', left: '-200px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: '10%', right: '-150px' }}></div>

        {/* kanyargó csík */}
        <svg className="squiggle" style={{ top: '50px', right: 0, width: '300px', height: '500px' }} viewBox="0 0 300 500">
          <defs>
            <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#ffe600" />
            </linearGradient>
          </defs>
          <path d="M250,20 Q100,100 200,200 T150,400 Q80,460 250,490" />
        </svg>

        <div className="section-label" style={{ display: 'none' }}></div>
        <h2 className="section-title">
          Valós visszajelzések<br />
          <span className="accent">különböző cégektől</span>
        </h2>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-head">
              <div className="avatar green">Ö</div>
              <div>
                <div className="review-name">Ördögh Bence</div>
                <div className="review-meta">3 Google-értékelés</div>
              </div>
              <div className="g-logo"><span>G</span></div>
            </div>
            <div className="stars">★★★★★ <span className="date">4 hónapja</span></div>
            <p className="review-text">
              Az új oldalunk egyszerűen <mark>profin és modernül néz ki</mark>. Többen mondták, hogy mennyivel komolyabb lett a benyomás, és érződik az érdeklődőkön is, hogy jobban megbíznak bennünk.
            </p>
            <div className="review-actions"><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
          </div>

          <div className="review-card">
            <div className="review-head">
              <div className="avatar blue">L</div>
              <div>
                <div className="review-name">Lengyel Olivér</div>
                <div className="review-meta">7 Google-értékelés</div>
              </div>
              <div className="g-logo"><span>G</span></div>
            </div>
            <div className="stars">★★★★★ <span className="date">2 hónapja</span></div>
            <p className="review-text">
              Végre van egy weboldalunk, amire <mark>büszkén küldöm rá az ügyfeleket</mark>. Letisztult, gyors, mobilon is tökéletes, pontosan olyan, amilyennek mindig szerettem volna.
            </p>
            <div className="review-actions"><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
          </div>

          <div className="review-card">
            <div className="review-head">
              <div className="avatar red">H</div>
              <div>
                <div className="review-name">Hellinger Adrián</div>
                <div className="review-meta">5 Google-értékelés</div>
              </div>
              <div className="g-logo"><span>G</span></div>
            </div>
            <div className="stars">★★★★★ <span className="date">6 hónapja</span></div>
            <p className="review-text">
              Nem gondoltam, hogy ekkora különbség lesz. Az oldal <mark>igényes és bizalmat kelt</mark>, és azóta többen keresnek minket. Nyilván azért, mert már ránézésre komolyan vesznek bennünket.
            </p>
            <div className="review-actions"><span>👍 Hasznos</span><span>🖼 Fotók</span></div>
          </div>
        </div>

        <p className="disclaimer">
          A weboldalon olvasható vélemények tényleges megbízóinktól érkeztek, akik hozzájárulásukat adták nevük és adataik közzétételéhez. Az elért eredmények ügyfélről ügyfélre változhatnak – befolyásolja őket az adott vállalkozás működése, az aktuális piaci helyzet, valamint az is, ki mennyit tesz hozzá –, ezért nem értelmezhetők garantált, átlagos teljesítményként. Az első egyeztetés ingyenes, és semmilyen elköteleződéssel nem jár.
        </p>
      </section>

      <section className="process" id="process">
        <div className="process-inner">
          <div className="process-eyebrow">Te lehetsz a következő. <span className="pe-arrow">→</span></div>
          <h2 className="process-mega">
            <span className="accent">0</span>-ról az <span className="accent">1.</span> ügyfél
            <span className="process-online">online</span>
          </h2>
          <div className="process-steps-mini">
            <span className="process-step-mini">Weboldal</span>
            <span className="process-step-mini-arrow">→</span>
            <span className="process-step-mini">Hirdetés</span>
            <span className="process-step-mini-arrow">→</span>
            <span className="process-step-mini">Ügyfél</span>
          </div>
          <p className="process-tagline">Nézzük meg, hogyan is kezdenénk...</p>
          <a href="#szolgaltatas" className="scroll-arrow" aria-label="Tovább lefelé">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      <section className="light-section" id="szolgaltatas">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '-100px', left: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: '-100px', right: '-100px' }}></div>

        <svg className="squiggle" style={{ top: '80px', left: '5%', width: '280px', height: '420px' }} viewBox="0 0 280 420">
          <path d="M30,20 Q200,80 80,200 T220,380" />
        </svg>

        <div className="section-label">01 · Szolgáltatás</div>
        <h2 className="section-title">
          Weboldal vagy webáruház,<br />
          <span className="accent">az online névjegyed és üzleted</span>
        </h2>
        <p className="section-sub">
          Kell egy hely, ahol bemutatod a szolgáltatásod vagy eladod a terméked. Ezt alakítjuk ki elsőnek.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-img">
              <img src="/modernweboldal.png" alt="Bemutatkozó oldal" />
              <span className="service-badge">Bemutatkozó</span>
            </div>
            <div className="service-body">
              <h3>Bemutatkozó oldal</h3>
              <p>Tiszta felépítés, fókuszált üzenet. Szolgáltatóknak, akiknek elég egy erős alapoldal.</p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img">
              <img src="/profilanding.png" alt="Landing oldal" />
              <span className="service-badge">Landing</span>
            </div>
            <div className="service-body">
              <h3>Landing oldal</h3>
              <p>Egy termék, egy ajánlat, egy cél: a látogatóból érdeklődő.</p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-img">
              <img src="/premiumwebshop.png" alt="Webáruház" />
              <span className="service-badge">Webshop</span>
            </div>
            <div className="service-body">
              <h3>Webáruház</h3>
              <p>Termékek, kosár, fizetés, admin, kulcsrakészen. Az első naptól értékesítésre kész.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="price-band">
        <div className="price-band-inner">
          <div className="price-band-text">
            Weboldal már <span className="num">50.000 Ft-tól</span> · Egyedi árajánlat a feladathoz szabva
          </div>
          <a href="#kapcsolat" className="price-band-cta">Kérek árajánlatot →</a>
        </div>
      </section>

      <section className="light-section" style={{ background: '#eaf1f9', paddingBottom: 0 }}>
        <div className="glow glow-blue" style={{ top: '5%', right: '-350px', opacity: 0.2 }}></div>
        <div className="glow glow-yellow" style={{ bottom: '5%', left: '-300px', opacity: 0.2 }}></div>

        <svg className="squiggle" style={{ top: '60px', right: '3%', width: '320px', height: '480px' }} viewBox="0 0 320 480">
          <path d="M280,30 Q120,120 240,240 T80,440" />
        </svg>

        <div className="section-label">02 · Hirdetés</div>
        <h2 className="section-title">
          Másoknak már bevált<br />
          <span className="accent">hirdetések</span>
        </h2>
        <p className="section-sub">
          Ha készen van a felületed, utána készítünk Facebook hirdetéseket, hogy forgalom érkezzen az oldaladra / webáruházadra.
        </p>

        <div className="creatives-marquee">
          <div className="creatives-track">
            {/* 1. kör (4 kártya) */}
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES3.png" alt="6x megtérülés hirdetés" data-company="Forint - Soft Kft." /></div><div className="creative-foot"><span className="creative-metric">6×</span><span className="creative-type">Megtérülés</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES4.png" alt="90.000 elérés hirdetés" data-company="ZT Épületgépészet" /></div><div className="creative-foot"><span className="creative-metric">90.000</span><span className="creative-type">Elérés<br />10.000 Ft-ból</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES2.png" alt="100.000 Ft bevétel hirdetés" data-company="Hazai Kávé Kft." /></div><div className="creative-foot"><span className="creative-metric">100.000 Ft</span><span className="creative-type">Bevétel<br />12.000 Ft-ból</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES1.png" alt="4x megtérülés hirdetés" data-company="Dover Check" /></div><div className="creative-foot"><span className="creative-metric">4×</span><span className="creative-type">Megtérülés</span></div></div>

            {/* 2. kör: pontos másolat a hézagmentes loophoz (-50%) */}
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES3.png" alt="6x megtérülés hirdetés" data-company="Forint - Soft Kft." /></div><div className="creative-foot"><span className="creative-metric">6×</span><span className="creative-type">Megtérülés</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES4.png" alt="90.000 elérés hirdetés" data-company="ZT Épületgépészet" /></div><div className="creative-foot"><span className="creative-metric">90.000</span><span className="creative-type">Elérés<br />10.000 Ft-ból</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES2.png" alt="100.000 Ft bevétel hirdetés" data-company="Hazai Kávé Kft." /></div><div className="creative-foot"><span className="creative-metric">100.000 Ft</span><span className="creative-type">Bevétel<br />12.000 Ft-ból</span></div></div>
            <div className="creative-card"><div className="creative-img clickable"><img src="/HIRDETES1.png" alt="4x megtérülés hirdetés" data-company="Dover Check" /></div><div className="creative-foot"><span className="creative-metric">4×</span><span className="creative-type">Megtérülés</span></div></div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '10%', left: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: 0, right: '-100px' }}></div>

        <svg className="squiggle" style={{ top: '60px', left: '3%', width: '300px', height: '460px' }} viewBox="0 0 300 460">
          <path d="M40,20 Q220,100 100,220 T240,420" />
        </svg>

        <div className="section-label">03 · Automatizmus</div>
        <h2 className="section-title">
          Több vásárlás <span className="accent">automatikusan</span>
        </h2>
        <p className="section-sub">
          Két folyamat a háttérben. Az egyik visszahozza az elveszett vásárlókat, a másik visszahívja a régieket.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-img"><img src="/visszaterovevo.png" alt="Egyszeri vásárló" /></div>
            <div className="feature-body">
              <h3>Érdeklődőből vásárló</h3>
              <p className="feature-lead">Ne veszíts el olyan vásárlókat, akik már majdnem hívtak / fizettek.</p>
              <p>Kosárba tett, aztán eltűnt? Email és SMS emlékeztetők hozzák vissza, anélkül, hogy egy ujjadat is mozdítanád.</p>
              <div className="feature-list-title">Mit jelent a gyakorlatban</div>
              <ul className="feature-list">
                <li>Látod, ki hagyta félbe a rendelést</li>
                <li>Automatikus utánkövetés indul</li>
                <li>Több befejezett vásárlás</li>
                <li>Kevesebb elveszett bevétel</li>
              </ul>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-img"><img src={'/a visszatérő vásárlo.png'} alt="Visszatérő törzsvásárló" /></div>
            <div className="feature-body">
              <h3>Vásárlóból törzsvásárló</h3>
              <p className="feature-lead">Egyszeri vásárlókból visszatérő ügyfelek. Automatikusan.</p>
              <p>Vásárlás után nem ér véget a kapcsolat. Email-sorozatok tartják melegen az ügyfelet, tippekkel, ajánlatokkal, kedvezményekkel.</p>
              <div className="feature-list-title">Mit jelent a gyakorlatban</div>
              <ul className="feature-list">
                <li>Köszönő email a vásárlás után</li>
                <li>Termékhasználati útmutatók</li>
                <li>Véleménykérés a megfelelő pillanatban</li>
                <li>Ajánlások és visszatérő kampányok</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '-100px', left: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: '-100px', right: '-100px' }}></div>

        <div className="section-label">04 · Mesterséges intelligencia</div>
        <h2 className="section-title">
          Mesterséges intelligencia,<br />
          <span className="accent">a te javadra</span>
        </h2>
        <p className="section-sub">
          Két AI funkció, ami éjjel-nappal melletted áll. Az egyik a kereséseknél tesz láthatóvá, a másik az oldaladon válaszol.
        </p>

        <div className="ai-grid">
          <div className="ai-card">
            <div className="ai-img"><img src={'/chatgpttégegajánl.png'} alt="ChatGPT téged ajánl" /></div>
            <div className="ai-body">
              <h3>ChatGPT téged ajánl</h3>
              <p className="ai-lead">Amikor valaki rákeres, te jössz fel elsőként.</p>
              <p>Az AI keresők ma már nem linkeket adnak, ajánlanak. Az oldaladat úgy hangoljuk, hogy a ChatGPT és Gemini neked dolgozzon.</p>
            </div>
          </div>

          <div className="ai-card">
            <div className="ai-img"><img src="/chatbot.png" alt="Chatbot, a 0–24-es munkatárs" /></div>
            <div className="ai-body">
              <h3>Chatbot, a 0–24-es munkatárs</h3>
              <p className="ai-lead">Sosem alszik, sosem fárad, mindig válaszol.</p>
              <p>Árak, szállítás, időpontok, azonnali válasz minden kérdésre. Hajnali kettőkor is. Az érdeklődőd nem vár, te nem maradsz le.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '10%', left: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: 0, right: '-100px' }}></div>

        <svg className="squiggle" style={{ top: '60px', right: '5%', width: '280px', height: '420px' }} viewBox="0 0 280 420">
          <path d="M240,20 Q80,100 180,220 T60,400" />
        </svg>

        <div className="section-label">05 · Google Cégem</div>
        <h2 className="section-title">
          Profi Google profil, <span className="accent">amitől hisznek neked</span>
        </h2>
        <p className="section-sub">
          Mielőtt bárki felhívna, megnéz a Google-ön. Itt dől el, hogy egyáltalán esélyt kapsz-e.
        </p>

        <div className="gbp-card">
          <div className="gbp-img"><img src="/google.png" alt="Google Cégem profil" /></div>
          <div className="gbp-body">
            <span className="gbp-badge">Google Cégem profil</span>
            <h3>Az első benyomás <span className="accent">a Google-ön kezdődik.</span></h3>
            <p className="gbp-lead">Profilt építünk, ami első ránézésre komolyan vehető.</p>
            <p>Adatlap, fotók, kategóriák, posztok, értékelés-kezelés, minden a helyén. Mire az érdeklődő a weboldaladra kattint, már megnyertük a bizalmát.</p>
            <div className="gbp-stars">
              <span className="star">★★★★★</span>
              <b>5,0</b>
              <span>· Több tucat valódi értékelés ügyfelektől</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gift-section" id="gift">
        <canvas className="gift-confetti" id="giftConfetti"></canvas>
        <div className="gift-inner">
          <div className="gift-circle">
            <div className="gift-circle-img"><img src="/ajandek.png" alt="Domain matrica céges autón" style={{ objectPosition: '62% center' }} /></div>
            <span className="gift-circle-domain">Céged neve online – bármerre jársz, látnak.</span>
          </div>
          <div className="gift-text">
            <div className="gift-eyebrow">Együttműködést megkezdő ajándék</div>
            <h2 className="gift-title">A domained matricán, <span className="accent">ajándékba!</span></h2>
            <p className="gift-sub">Amikor elindulunk, ajándékba kapod a saját domain neveddel ellátott matricát – céges autóra, kirakatra, falra, bárhová ragaszthatod. Hadd lássák, hol találnak meg online.</p>
            <a href="#kapcsolat" className="gift-highlight">Vágjunk bele! →</a>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '10%', right: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: 0, left: '-100px' }}></div>

        <div className="story-card">
          <div className="story-img"><img src={'/miértmi.png'} alt="NEZOR alapítók" /></div>
          <div className="story-body">
            <div className="story-eyebrow">Miért mi</div>
            <h3>16 évesen indultunk. <span className="accent">Bukni nem lehetett.</span></h3>
            <p>A családi vállalkozás matrica termékeit kellett online eladnunk, különben az egész megszűnik. Nem volt B terv. Eredményt kellett hoznunk, ráadásul ingyen, mert csak akkor volt értelme, ha közben az értékesítés is működik.</p>
            <p><strong>Működött.</strong> A család azóta is ebből él. Több mint 5 éve csináljuk nap mint nap, és időközben rájöttünk: amit a saját bőrünkön megtanultunk, az másoknak is működik. Mára több mint 20 magyar vállalkozónál.</p>
            <p>Veled is őszinték leszünk: mi is abból élünk, hogy ez működjön nálad. Ha az oldalad nem érdekel senkit, vagy a hirdetésed nem hoz megrendelést, te nem fogsz visszatérni. <strong>Csak akkor éri meg nekünk, ha neked is megéri.</strong></p>
            <div className="story-sign">
              <div className="story-sign-names">Müller Dániel &amp; Jelencsity Miklós</div>
              <div className="story-sign-role">Alapítók · NEZOR Webfejlesztés</div>
            </div>
          </div>
        </div>

        <div className="story-cta">
          <a href="#kapcsolat">Foglalj egy konzultációt →</a>
          <p>20 perc, semmi kötelezettség.</p>
        </div>

        <div className="ref-strip">
          <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3a3f58', marginBottom: '22px' }}>
            Cégek, akikkel már együtt dolgoztunk
          </div>
          <div className="ref-track">
            <span>Cruiser Shop</span>
            <span>Hazai Kávé Kft.</span>
            <span>Kisállatkereskedes Baja</span>
            <span>Neked Sütöm</span>
            <span>InShape - Diet</span>
            <span>Estur Épker Kft.</span>
            <span>ZT Épületgépészet</span>
            {/* duplikálva loophoz */}
            <span>Cruiser Shop</span>
            <span>Hazai Kávé Kft.</span>
            <span>Kisállatkereskedes Baja</span>
            <span>Neked Sütöm</span>
            <span>InShape - Diet</span>
            <span>Estur Épker Kft.</span>
            <span>ZT Épületgépészet</span>
          </div>
          <div className="ref-track alt">
            <span>Hellinger Kft.</span>
            <span>Dover Check</span>
            <span>Korona Gombaipari Egyesülés</span>
            <span>Forint - Soft Kft.</span>
            <span>Adótanácsadók Egyesülete</span>
            <span>G-R Ékszerszalon</span>
            <span>Samu Kutyakozmetika</span>
            {/* duplikálva loophoz */}
            <span>Hellinger Kft.</span>
            <span>Dover Check</span>
            <span>Korona Gombaipari Egyesülés</span>
            <span>Forint - Soft Kft.</span>
            <span>Adótanácsadók Egyesülete</span>
            <span>G-R Ékszerszalon</span>
            <span>Samu Kutyakozmetika</span>
          </div>
        </div>
      </section>

      <section className="light-section" id="kapcsolat">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '20%', right: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: 0, left: '-100px' }}></div>

        <div className="section-label">06 · Kapcsolat</div>
        <h2 className="section-title">
          Beszélgessünk <span className="accent">20 percet.</span>
        </h2>
        <p className="section-sub">
          20 perc, semmi kötelezettség. Megmutatjuk, hol szivárog most a pénz, és hogy mit kezdjünk vele.
        </p>

        <div className="contact-wrap">
          <div className="contact-left">
            <div className="contact-shapes"><span></span><span></span><span></span></div>
            <div className="contact-rings"><span></span><span></span></div>
            <h3>Foglalj egy <span className="accent">konzultációt</span></h3>
            <p>Hová tűnnek az érdeklődők? Miért nem vásárolnak? A hívás után tudni fogod a válaszokat, és azt is, hogyan javíts rajta.</p>
            <ul className="contact-bullets">
              <li>Kötelezettségmentes 20 perces hívás</li>
              <li>24 órán belül visszajelzünk</li>
              <li>Személyre szabott elemzés</li>
            </ul>
          </div>
          <div className="contact-right">
            <h4>Töltsd ki és beszéljünk</h4>
            <div className="form-grid">
              <div className="field full"><label>Név *</label><input type="text" placeholder="Kovács Péter" /></div>
              <div className="field full"><label>Email *</label><input type="email" placeholder="pelda@gmail.com" /></div>
              <div className="field full"><label>Telefonszám *</label><input type="tel" placeholder="+36 20 123 4567" /></div>
            </div>
            <button className="form-submit">Kérek egy rövid konzultációt →</button>
            <p className="form-foot">Az adatokat bizalmasan kezeljük, harmadik félnek nem adjuk át.</p>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="grid-bg"></div>
        <div className="glow glow-blue" style={{ top: '10%', left: '-150px' }}></div>
        <div className="glow glow-yellow" style={{ bottom: 0, right: '-100px' }}></div>

        <div className="section-label">Gyakori kérdések</div>
        <h2 className="section-title">
          Erre <span className="accent">biztos kíváncsi vagy</span>
        </h2>
        <p className="section-sub">
          A leggyakoribb kérdések, amiket az érdeklődőktől kapunk. Ha a tiéd nincs köztük, írd meg a hívásban.
        </p>

        <div className="faq-list">
          <details className="faq-item">
            <summary>Mennyibe kerül egy weboldal?</summary>
            <div className="faq-answer">Már 50.000 Ft-tól is kaphatsz weboldalt, de minden projektre egyedi árajánlatot készítünk. Egy egyszerű bemutatkozó oldal és egy összetett webshop nem ugyanaz, ezért a konzultáció után, amikor már látjuk a feladatot, adunk konkrét számot. Nincs rejtett költség, és nem mondunk árat azelőtt, hogy értenénk, mire van szükséged.</div>
          </details>

          <details className="faq-item">
            <summary>Mennyi idő alatt készül el?</summary>
            <div className="faq-answer">Igénytől függ. Egy egyszerű oldal néhány hét, egy összetett webshop tovább tart. A pontos időzítést az első konzultáción rögzítjük, és tartjuk is.</div>
          </details>

          <details className="faq-item">
            <summary>Mi van, ha nem vagyok elégedett?</summary>
            <div className="faq-answer">A folyamat közben végig látod a munkát, és menet közben módosíthatunk rajta. A cél nem az, hogy átadjunk valamit, hanem hogy elégedett legyél vele. Különben mi sem örülünk az eredménynek.</div>
          </details>

          <details className="faq-item">
            <summary>Kell saját szöveg, kép, tartalom?</summary>
            <div className="faq-answer">Nem feltétlenül. Ha van saját anyagod, beépítjük. Ha nincs, segítünk a szövegezésben és a fotózás megszervezésében is, sok ügyfelünknél mi adjuk a teljes tartalmi alapot.</div>
          </details>

          <details className="faq-item">
            <summary>Van havi díj? Mit fedez?</summary>
            <div className="faq-answer">Weboldalhoz csak akkor, ha kéred. Karbantartást, frissítést, biztonsági mentést és apróbb módosításokat fed le. Facebook hirdetés vagy webshop esetén viszont mindig van havi díj, mert folyamatos optimalizálás és karbantartás kell hozzájuk.</div>
          </details>

          <details className="faq-item">
            <summary>Mennyi a Facebook hirdetési költség?</summary>
            <div className="faq-answer">A Meta felé a budget-et közvetlenül te fizeted, mi csak a saját munkánkat számlázzuk. Így átlátható minden forint: tudod, mi megy hirdetésre és mi a mi díjunk.</div>
          </details>

          <details className="faq-item">
            <summary>Mi van, ha már van weboldalam?</summary>
            <div className="faq-answer">Megnézzük együtt. Néha elég átdolgozni a meglévőt, néha viszont gyorsabb és olcsóbb nulláról kezdeni. Őszintén megmondjuk, melyik éri meg neked.</div>
          </details>

          <details className="faq-item">
            <summary>Milyen iparágakkal dolgoztok?</summary>
            <div className="faq-answer">Sokfélével, étterem, építőipar, kávé, logisztika, gyártás, kereskedelem, szolgáltatók. Az iparágat hamar megtanuljuk, az értékesítés logikája viszont szektor-független.</div>
          </details>

          <details className="faq-item">
            <summary>Hol vagytok? Online vagy személyes találkozó?</summary>
            <div className="faq-answer">Az ország bármely pontján megoldható személyes találkozó, ha a projekt megkívánja. Az ügyfeleink többsége egyébként Zoom-on dolgozik velünk, mert gyorsabb és nem kell senkinek órákat utaznia.</div>
          </details>
        </div>
      </section>

      <a href="#kapcsolat" className="floating-cta">Konzultációt kérek →</a>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">NEZOR</div>
          <div className="footer-links">
            <a href="#" data-legal="aszf">ÁSZF</a>
            <a href="#" data-legal="adatkezeles">Adatkezelési tájékoztató</a>
            <a href="#" data-legal="cookie">Cookie szabályzat</a>
          </div>
        </div>
        <div className="footer-copy">
          © 2026 NEZOR. Minden jog fenntartva.
        </div>
      </footer>

      <div className="lightbox" id="lightbox" aria-hidden="true">
        <button className="lightbox-close" id="lightboxClose" aria-label="Bezárás">&times;</button>
        <img className="lightbox-img" id="lightboxImg" src="" alt="" />
        <div className="lightbox-caption">
          <small>Ügyfél</small>
          <b id="lightboxCompany"></b>
        </div>
      </div>

      <div className="sms-toast" id="smsToast" role="status">
        <button className="sms-close" id="smsClose" aria-label="Bezárás">×</button>
        <div className="sms-row">
          <div className="sms-avatar">N</div>
          <div className="sms-body">
            <div className="sms-top"><span className="sms-name">NEZOR</span><span className="sms-time">most</span></div>
            <div className="sms-text" id="smsText">Szia! 👋 Tetszik, amit látsz? Készen állsz? Beszéljük meg a terved.</div>
          </div>
        </div>
        <div className="sms-actions">
          <a href="#kapcsolat" className="sms-btn" id="smsContact">Kapcsolatfelvétel →</a>
        </div>
      </div>

      <div className="winpop" id="winPop" aria-hidden="true">
        <div className="winpop-card">
          <button className="winpop-close" id="winClose" aria-label="Bezárás">×</button>
          <div className="winpop-eyebrow">🎉 Nyereményjáték</div>
          <h2 className="winpop-title">Nyerj egy <span className="accent">prémium weboldalt</span> ingyen</h2>
          <p className="winpop-sub">Hogy nyerhetsz? Egy e-mail cím és játékban vagy.</p>
          <form className="winpop-form" id="winForm">
            <input type="email" id="winEmail" placeholder="te@email.hu" required />
            <button type="submit">Jelentkezem</button>
          </form>
          <div className="winpop-foot">Az eredményekről időben tájékoztatunk, sok sikert!</div>
        </div>
      </div>

      <div className="legal-modal" id="legalModal" aria-hidden="true">
        <div className="legal-card">
          <button className="legal-close" id="legalClose" aria-label="Bezárás">×</button>
          <h2 className="legal-title" id="legalTitle"></h2>
          <div className="legal-body" id="legalBody"></div>
        </div>
      </div>

      <div className="cookie-bar" id="cookieBar">
        <p className="cookie-text">Ez a weboldal sütiket használ a működéshez és a felhasználói élmény javításához. Részletek a <a data-legal="cookie">Cookie szabályzatban</a>.</p>
        <div className="cookie-actions">
          <button className="cookie-btn cookie-reject" id="cookieReject">Elutasítom</button>
          <button className="cookie-btn cookie-accept" id="cookieAccept">Elfogadom</button>
        </div>
      </div>
    </>
  );
}
