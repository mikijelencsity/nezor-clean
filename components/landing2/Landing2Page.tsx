'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from '@/components/landing/LandingPage.module.css';

const formatFt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Az ajánlat lejárata: 2026. augusztus 10. 23:59:59
const DEADLINE = new Date('2026-08-10T23:59:59').getTime();
const pad2 = (n: number) => String(n).padStart(2, '0');

export function Landing2Page() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Ár-kalkulátor: 79.000 → 49.000 leszámlálás, amikor a kártya képbe ér
  const priceRef = useRef<HTMLDivElement>(null);
  const [priceVal, setPriceVal] = useState(79000);
  const [priceDone, setPriceDone] = useState(false);
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        io.disconnect();
        const start = 79000, end = 49000, dur = 1400, t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setPriceVal(Math.round(start + (end - start) * eased));
          if (p < 1) requestAnimationFrame(tick);
          else { setPriceVal(end); setPriceDone(true); }
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Élő visszaszámlálás a sticky sávhoz
  const [cdReady, setCdReady] = useState(false);
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, DEADLINE - Date.now()));
    tick();
    setCdReady(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const totalSec = Math.floor(remaining / 1000);
  const cd = {
    nap: Math.floor(totalSec / 86400),
    ora: Math.floor((totalSec % 86400) / 3600),
    perc: Math.floor((totalSec % 3600) / 60),
    mp: totalSec % 60,
  };

  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [szakma, setSzakma] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!nev.trim() || !telefon.trim()) { setError('Add meg a neved és telefonszámod!'); return; }
    if (!email.trim()) { setError('Add meg az email címed!'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Érvénytelen email cím.'); return; }
    if (!cegnev.trim()) { setError('Add meg a cégneved!'); return; }
    if (!szakma.trim()) { setError('Add meg, milyen vállalkozásod van!'); return; }
    setLoading(true);
    setError('');
    try {
      const eventId = ujEventId();
      const res = await fetch('/api/landing-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, telefon, email, cegnev, szakma, eventId }),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent('Lead', {}, eventId);
        router.push('/landing/koszonjuk');
      } else {
        setError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
      }
    } catch {
      setError('Hiba történt. Próbáld újra, vagy írj nekünk: info@nezor.hu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.blobA} aria-hidden="true" />
      <div className={styles.blobB} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.logo}>NEZ<span>OR</span></div>

        {/* ── HERO-LITE ── */}
        <section className={styles.hero} style={{ minHeight: 'auto', marginBottom: 48, paddingTop: 24 }}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Még nem döntöttél? Nézd meg, mit építettünk valakinek, aki pont úgy indult, mint te.
          </div>
          <h1 className={styles.h1}>
            Ágota júliusban <span className={styles.grad}>nulláról indult.</span> Mi felépítettük neki az egész rendszert.
          </h1>
          <p className={styles.heroSub}>
            Nézd meg pontosan, hogyan történt, és a végén adunk <strong>3 titkos tippet</strong> az
            online ügyfélszerzéshez.
          </p>
        </section>

        {/* ── KAMPÁNYBEMUTATÓ ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>
            Ismeretlenből a <span className={styles.grad}>partnerségig</span>
            <br />
            <span style={{ fontSize: '0.5em', fontWeight: 700, color: 'rgba(0,0,0,.5)' }}>(megéri végigolvasni)</span>
          </h2>
          <div className={styles.guaranteeCard} style={{ textAlign: 'left', maxWidth: 760 }}>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              Július elején jelentkezett az egyik hirdetésünkre <strong>Ágota</strong>, a nyíregyházi{' '}
              <strong>Loft Of Beauty</strong> tulajdonosa. Alakformálással foglalkozik: olyan
              szépségszalont visz, ahol az emberek testformálási kezelésekre járnak, és még volt hely
              a naptárában, amit szeretett volna megtölteni.
            </p>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              Amikor beszélgetni kezdtünk, kiderült: <strong>online gyakorlatilag nem is létezett.</strong>{' '}
              Nem volt weboldala, nem volt landing oldala, és nem volt semmilyen kampányterve. Ha
              valaki rákeresett volna a nevére, nem sok mindent talált volna. Nem azért, mert ne lenne
              jó szakember, hanem mert eddig soha senki nem rakta össze neki azt a rendszert, ami az
              online megjelenésen keresztül hozza az ügyfeleket. <strong>Nem ijedünk meg, ha egy
              vállalkozás jelenlétét nulláról kell felépítenünk</strong>, sőt, ezekben a projektekben
              van a legtöbb mozgástér: nincs mihez alkalmazkodni, nincs régi rendszert lebontani,
              tiszta lappal indulhatunk.
            </p>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              <strong>Először alaposan átbeszéltük Ágota szolgáltatásait:</strong> mit csinál, kiknek,
              és miben más, mint a konkurencia. Ebből raktunk össze közösen egy erős, világos
              ajánlatot, amire érdemes volt hirdetni.
            </p>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              <strong>Utána jött a weboldal:</strong> felépítettük az alapokat, ahol Ágota először
              jelent meg online. Innentől már volt hova irányítani azokat, akik komolyabban
              érdeklődtek a szolgáltatásai iránt.
            </p>
            <p className={styles.body} style={{ margin: 0, maxWidth: 'none' }}>
              <strong>A weboldal mellé egy külön landing oldalt is kapott,</strong> kifejezetten az
              adott ajánlatra szabva, saját <strong>foglalási és email rendszerrel,</strong> hogy az
              érdeklődőből egy kattintással időpontfoglaló ügyfél legyen. Az elején még voltak nyitott
              kérdések, például hogy Ágota minden foglalásról kap-e automatikus emailt, ezért
              kialakítottunk egy <strong>közös felületet</strong> is, ahol együtt láttuk a bejövő
              foglalásokat, pontos időpontokkal.
            </p>
          </div>

          <p className={styles.sectionTease}>
            Innentől már <span className={styles.grad}>a rendszer dolgozott.</span>
          </p>

          <div className={styles.guaranteeCard} style={{ textAlign: 'left', maxWidth: 760 }}>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              <strong>Közben megterveztük a figyelemfelkeltő hirdetési kreatívjait</strong> is: olyan
              képeket és szövegeket, amik tényleg megállítják a görgetést, és pontosan azt
              kommunikálják, amit Ágota szalonja nyújt.
            </p>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              <strong>Elindulás után együtt mértük a konverziókat:</strong> pontosan láttuk, hányan és
              milyen áron jönnek be az érdeklődőkből. Egy kezelés ára <strong>12.000 Ft</strong> volt,
              a hirdetési keret pedig <strong>60.000 Ft, 30 napra</strong> elosztva, vagyis napi kábé{' '}
              <strong>2.000 Ft-ból</strong> kellett a lehető legtöbbet kihoznunk.
            </p>
            <p className={styles.body} style={{ margin: '0 0 16px', maxWidth: 'none' }}>
              <strong>A végén már csak finomhangolás volt hátra:</strong> miután minden elem élesben
              volt, figyeltük, mi működik jobban, mi kevésbé, és folyamatosan igazítottunk a kampányon
              és a landing oldalon is.
            </p>
            <p className={styles.body} style={{ margin: 0, maxWidth: 'none' }}>
              Ma már nem egyedül próbálja megtölteni a naptárát, hanem <strong>van egy rendszere, ami
              helyette is dolgozik</strong>, pontosan úgy, ahogy azt egy vállalkozónak kell.
            </p>
          </div>
        </section>

        {/* ── 3 TITKOS TIPP ── */}
        <section className={styles.section}>
          <h2 className={styles.h2}>És végül a <span className={styles.grad}>3 titkos tanulság a kampányból</span></h2>
          <div className={styles.folyamatList}>
            {[
              { cim: 'Az ajánlat legyen kristálytiszta, mielőtt hirdetsz.', leiras: 'Mi is ezzel kezdtük Ágotánál: átbeszéltük, mit csinál és kinek, mielőtt egy forintot is elköltöttünk hirdetésre. Egyetlen, jól kommunikált ajánlatra érdemes fókuszálni, mert utána egy nálad már járt embernek sokkal könnyebb eladni a többi kezelést is.' },
              { cim: 'Tedd könnyűvé a foglalást, ne csak az érdeklődést gyűjtsd.', leiras: 'Amíg te alszol, a rendszer akkor is dolgozik: az érdeklődő magától tud időpontot foglalni, nem kell minden emberrel manuálisan egyeztetned. Persze lesz, aki nem jön el, vagy inkább ír, mert segítségre van szüksége, de egy ilyen rendszerrel jelentősen könnyítheted a dolgod.' },
              { cim: 'Ismerd a számaidat, mielőtt elköltöd a budgetet.', leiras: 'Tudd, mennyibe kerül neked egy új ügyfél, különben csak találgatsz, megéri-e. Egy teszt időszak mindig kell: adatokat kell gyűjtened arról, mi működik és mi nem, mielőtt nagyobb összeget mernél mozgatni.' },
            ].map((t, i) => (
              <div key={t.cim} className={styles.folyamatStep}>
                <span className={styles.folyamatNum}>{i + 1}</span>
                <div className={styles.folyamatBody}>
                  <h3>{t.cim}</h3>
                  <p>{t.leiras}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HÍD A FORM FELÉ + ÁR + GARANCIA (egy egységként) ── */}
        <section className={styles.section}>
          <p className={styles.body} style={{ textAlign: 'center', margin: '0 auto 20px' }}>
            Ha ez működött Ágotánál, nálad is működhet. Nézzük meg, mennyibe kerülne neked.
          </p>
          <div className={styles.priceCard} style={{ marginBottom: 4 }} ref={priceRef}>
            <p className={styles.priceLead}><span className={styles.grad}>Ajánlatunk</span> az 1. hónapra</p>
            <div className={styles.priceRow}>
              <span className={styles.priceOld}>79.000 Ft</span>
              <span className={styles.priceReveal}>
                <span className={styles.priceTag}>ELSŐ HÓNAP CSAK</span>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span className={`${styles.priceNew} ${priceVal > 49000 ? styles.priceCounting : ''}`}>{formatFt(priceVal)} Ft</span>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', left: 0, bottom: -6, height: 4, borderRadius: 2,
                      background: 'linear-gradient(135deg, #2563EB 0%, #14B8A6 55%, #8CD91A 100%)',
                      width: priceDone ? '100%' : '0%',
                      transition: 'width .6s ease .1s',
                    }}
                  />
                </span>
              </span>
            </div>
            <button type="button" className={styles.ctaPrimary} onClick={scrollToForm} style={{ marginTop: 8 }}>
              Kérem az ajánlatot →
            </button>
          </div>

          <p className={styles.body} style={{ textAlign: 'center', margin: '20px auto', fontSize: '.95rem' }}>
            Nem csak szépségszalonoknak — bármilyen helyi vállalkozásnak ugyanez a logika működik.
          </p>

          <div className={styles.guaranteeCard} style={{ marginTop: 4 }}>
            <span className={styles.guaranteeIcon}>🔒</span>
            <h2 className={styles.h2}>
              Garancia: <span className={styles.grad}>kockázat nélkül próbálhatod ki</span>
            </h2>
            <ul className={styles.guaranteeList}>
              <li>Az első hónapot bármikor lemondhatod, nincs szerződés.</li>
              <li>Ha a hirdetésed statisztikailag nem térül meg, <strong>visszafizetjük a hirdetés készítésével eltöltött órabérünket neked</strong>.</li>
            </ul>
          </div>
        </section>

        {/* ── ZÁRÓ CTA + FORM ── */}
        <section ref={formRef} className={styles.formSection}>
          <div className={styles.formBox}>
            {sent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Megkaptuk a jelentkezésed!</h3>
                <p>Hamarosan felvesszük veled a kapcsolatot, és megkezdjük a közös munkát.
                  Addig is: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
              </div>
            ) : (
              <>
                <h2 className={styles.formTitle}>
                  Ha készen állsz, <span className={styles.grad}>garanciával biztosítva</span> a
                  közös munkára, akkor kezdjük el.
                </h2>
                <p className={styles.formSub}>
                  Csak néhány gyors adat kell tőled, nem lesz macera.
                </p>

                <div className={styles.field}>
                  <label>Teljes név *</label>
                  <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Telefonszám *</label>
                  <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Email cím *</label>
                  <input
                    type="email"
                    placeholder="te@example.hu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Cégnév *</label>
                  <input type="text" placeholder="Pl. Kovács Tetőfedés" value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Milyen vállalkozásod van? *</label>
                  <input type="text" placeholder="Pl. webshop, szépségszalon, tanácsadás, tetőfedés" value={szakma} onChange={(e) => setSzakma(e.target.value)} />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="button" className={styles.formBtn} onClick={handleSubmit} disabled={loading} style={{ width: '100%' }}>
                  {loading ? 'Küldés...' : 'Kérem az ajánlatot →'}
                </button>

                <p className={styles.contactLine}>
                  Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
                </p>

                <p className={styles.formNote}>
                  🔒 Az adataiddal csak kapcsolatfelvételhez élünk, harmadik félnek nem adjuk át.{' '}
                  <a href="/adatkezeles" target="_blank">Adatkezelési tájékoztató</a>
                </p>
              </>
            )}

            <Image
              src="/alapitok.webp"
              alt="Müller Dániel és Jelencsity Miklós — NEZOR alapítók"
              width={440}
              height={440}
              className={styles.formPhoto}
              sizes="120px"
            />
          </div>
          <p className={styles.signature}>
            Velünk dolgozol: <strong>Müller Dániel</strong> és <strong>Jelencsity Miklós</strong>
          </p>
        </section>

        <p className={styles.foot}>© 2026 NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
      </div>

      {/* ── STICKY VISSZASZÁMLÁLÓ ── */}
      {!sent && (
        <div className={styles.countdownBar}>
          <div className={styles.countdownInner}>
            <div className={styles.countdownLeft}>
              <span className={styles.countdownLabel}>⏳ Az ajánlat lejár:</span>
              <div className={styles.countdownClock}>
                <span><b>{cdReady ? cd.nap : '–'}</b>nap</span>
                <span><b>{cdReady ? pad2(cd.ora) : '––'}</b>óra</span>
                <span><b>{cdReady ? pad2(cd.perc) : '––'}</b>perc</span>
                <span><b>{cdReady ? pad2(cd.mp) : '––'}</b>mp</span>
              </div>
            </div>
            <button type="button" className={styles.countdownBtn} onClick={scrollToForm}>Kérem! →</button>
          </div>
        </div>
      )}
    </div>
  );
}
