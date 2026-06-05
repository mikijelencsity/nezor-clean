'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Adj meg egy érvényes email címet.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Egyedi eventId a browser pixel + CAPI deduplikációhoz
      const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      // Browser pixel Lead event
      if (typeof window !== 'undefined' && (window as Window & { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as Window & { fbq?: (...a: unknown[]) => void }).fbq?.('track', 'Lead', {}, { eventID: eventId });
      }

      const res = await fetch('/api/epitoiparosoknak-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, eventId }),
      });
      const data = await res.json();
      if (data.ok && data.guideUrl) {
        window.location.href = data.guideUrl;
      } else {
        setError('Hiba történt. Próbáld újra!');
      }
    } catch {
      setError('Hiba történt. Próbáld újra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0f1226' }}>
      {/* ══ DESKTOP ══ */}
      <div className={styles.desktop}>
        <div className={styles.page}>
          <div className={styles['page-grid']}></div>
          <div className={styles['page-blob-a']}></div>
          <div className={styles['page-blob-b']}></div>

          <div className={styles.logo}>NEZ<span>OR</span></div>

          <div className={styles.badge}>
            <span className={styles['badge-dot']}></span>
            Csak építőiparosoknak · 5+ év tapasztalat
          </div>

          <div className={styles.h1}>Az okát még senki nem mondta el neked,</div>
          <span className={styles['h1-green']}>miért nem hív elég ügyfél.</span>

          <p className={styles.sub}>
            Megmutatjuk az <strong>„5 lépéses ügyfélszerzési útmutatót"</strong> — a pontos módszert, amivel több megrendelőt kaphatsz az internetről. Ingyen. Kötelezettség nélkül.
          </p>

          <div className={styles.urgency}>
            <span className={styles['urg-dot']}></span>
            Csak az első 50 feliratkozónak elérhető · Még <strong>23</strong> hely szabad
          </div>

          <div className={styles.pills}>
            <div className={styles.pill}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Miért nem talál rád Google-on senki <span className={styles['pill-blur']}>→</span>
            </div>
            <div className={styles.pill}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Hogyan építs bizalmat - online <span className={styles['pill-blur']}>→</span>
            </div>
            <div className={styles.pill}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              Hogyan érj el helyi ügyfeleket Facebookon <span className={styles['pill-blur']}>→</span>
            </div>
            <div className={styles.pill}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
              10% kuponkód az első szolgáltatásra <span className={styles['pill-blur']}>→</span>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles['stat-n']}>81%</span>
              <span className={styles['stat-l']}>Online keres munkást</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles['stat-n']} ${styles.g}`}>INGYENES</span>
              <span className={styles['stat-l']}>Útmutató + kuponkód</span>
            </div>
            <div className={styles.stat}>
              <span className={styles['stat-n']}>4×</span>
              <span className={styles['stat-l']}>Több hívás 10+ értékeléssel</span>
            </div>
          </div>

          <div className={styles.proof}>
            <div className={styles['proof-avatars']}>
              <div className={styles['proof-av']}>
                <Image src="/estur.webp" alt="Estur" width={74} height={74} style={{ objectFit: 'cover', transform: 'scale(1.4) translateY(17%)', zIndex: 1 }} />
              </div>
              <div className={styles['proof-av']}>
                <Image src="/cruisershop.webp" alt="Cruiser Shop" width={74} height={74} />
              </div>
              <div className={styles['proof-av']}>
                <Image src="/koronagomba.webp" alt="Koronagomba" width={74} height={74} style={{ objectFit: 'cover', transform: 'scale(2.8) translateY(13%)' }} />
              </div>
              <div className={styles['proof-av']}>
                <Image src="/nekedsutom.webp" alt="Neked Sütöm" width={74} height={74} />
              </div>
              <div className={styles['proof-av']}>
                <Image src="/image.webp" alt="Ügyfél" width={74} height={74} />
              </div>
            </div>
            <div>
              <div className={styles['proof-stars']}>★★★★★</div>
              <div className={styles['proof-text']}><strong>20+ vállalkozás</strong> már alkalmazza ezt a rendszert</div>
            </div>
          </div>

          <div className={styles['form-box']}>
            <p className={styles['form-title']}>Küldöm az ingyenes útmutatót</p>
            <p className={styles['form-sub']}>Add meg az email címed — azonnal megkapod az „5 lépéses ügyfélszerzési útmutatót" + a 10% kuponkódot.</p>
            <input
              className={styles['form-input']}
              type="email"
              placeholder="Email címed (pl. janos@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe(e as React.KeyboardEvent)}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            <button
              className={styles['form-btn']}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Küldés...' : 'Kérem az ingyenes útmutatót →'}
            </button>
            <p className={styles['form-note']}>
              🔒 Az email megadásával hozzájárulsz, hogy az útmutatót és kapcsolódó tájékoztató leveleket küldjünk neked. Adataidat harmadik félnek nem adjuk át. Bármikor leiratkozhatsz.{' '}
              <a href="/adatkezeles" target="_blank" style={{ color: '#0284C7', textDecoration: 'underline' }}>Adatkezelési tájékoztató</a>
            </p>
            <p className={styles['form-redirect']}>Feliratkozás után azonnal átirányítunk az útmutatóhoz — nem kell várni, minden azonnal elérhető.</p>
          </div>

          <p className={styles.foot}>© 2026 NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        </div>
      </div>

      {/* ══ MOBILE ══ */}
      <div className={styles.mobile}>
        <div className={styles['mob-page']}>
          <div className={styles['mob-grid']}></div>

          <div className={styles['mob-logo']}>NEZ<span>OR</span></div>

          <div className={styles['mob-badge']}>
            <span className={styles['mob-bdot']}></span>
            Építőiparosoknak · 5+ év tapasztalat
          </div>

          <div className={styles['mob-h1']}>Az okát még senki nem mondta el neked,</div>
          <span className={styles['mob-h1g']}>miért nem hív elég ügyfél.</span>

          <p className={styles['mob-sub']}>
            Megmutatjuk az <strong>„5 lépéses ügyfélszerzési útmutatót"</strong> — amivel több megrendelőt kaphatsz az internetről. Ingyen.
          </p>

          <div className={styles['mob-urgency']}>
            <span className={styles['mob-urg-dot']}></span>
            Csak az első 50 feliratkozónak · Még <strong>23</strong> hely szabad
          </div>

          <div className={styles['mob-pills']}>
            <div className={styles['mob-pill']}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Miért nem talál rád Google-on senki
            </div>
            <div className={styles['mob-pill']}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Hogyan építs bizalmat - online
            </div>
            <div className={styles['mob-pill']}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              Hogyan érj el helyi ügyfeleket Facebookon
            </div>
            <div className={styles['mob-pill']}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84CC16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
              10% kuponkód az első szolgáltatásra
            </div>
          </div>

          <div className={styles['mob-stats']} style={{ marginBottom: '20px' }}>
            <div className={styles['mob-stat']}>
              <span className={styles['mob-sn']}>81%</span>
              <span className={styles['mob-sl']}>Online keres munkást</span>
            </div>
            <div className={styles['mob-stat']}>
              <span className={`${styles['mob-sn']} ${styles.g}`}>INGYENES</span>
              <span className={styles['mob-sl']}>Útmutató + kód</span>
            </div>
            <div className={styles['mob-stat']}>
              <span className={styles['mob-sn']}>4×</span>
              <span className={styles['mob-sl']}>Több hívás</span>
            </div>
          </div>

          <div className={styles['mob-proof']}>
            <div className={styles['mob-avs']}>
              <div className={styles['mob-av']}>
                <Image src="/estur.webp" alt="Estur" width={54} height={54} style={{ objectFit: 'cover', transform: 'scale(1.4) translateY(17%)' }} />
              </div>
              <div className={styles['mob-av']}>
                <Image src="/cruisershop.webp" alt="Cruiser Shop" width={54} height={54} />
              </div>
              <div className={styles['mob-av']}>
                <Image src="/koronagomba.webp" alt="Koronagomba" width={54} height={54} style={{ objectFit: 'cover', transform: 'scale(2.8) translateY(13%)' }} />
              </div>
              <div className={styles['mob-av']}>
                <Image src="/nekedsutom.webp" alt="Neked Sütöm" width={54} height={54} />
              </div>
              <div className={styles['mob-av']}>
                <Image src="/image.webp" alt="Ügyfél" width={54} height={54} />
              </div>
            </div>
            <div className={styles['mob-stars']}>★★★★★</div>
            <div className={styles['mob-proof-txt']}><strong>20+ vállalkozó</strong> már alkalmazza ezt</div>
          </div>

          <div className={styles['mob-form']}>
            <p className={styles['mob-form-title']}>Küldöm az ingyenes útmutatót</p>
            <p className={styles['mob-form-sub']}>Add meg az email címed — megkapod az „5 lépéses ügyfélszerzési útmutatót" + 10% kuponkódot.</p>
            <input
              className={styles['mob-input']}
              type="email"
              placeholder="Email címed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe(e as React.KeyboardEvent)}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
            <button
              className={styles['mob-btn']}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? 'Küldés...' : 'Kérem az ingyenes útmutatót →'}
            </button>
            <p className={styles['mob-note']}>
              🔒 Az email megadásával hozzájárulsz tájékoztató levelek fogadásához. Bármikor leiratkozhatsz.{' '}
              <a href="/adatkezeles" target="_blank" style={{ color: '#0284C7' }}>Adatkezelési tájékoztató</a>.
            </p>
            <p className={styles['mob-redirect']}>Feliratkozás után azonnal átirányítunk az útmutatóhoz — minden azonnal elérhető.</p>
          </div>

          <p className={styles['mob-foot']}>© 2026 NEZOR · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        </div>
      </div>
    </div>
  );
}
