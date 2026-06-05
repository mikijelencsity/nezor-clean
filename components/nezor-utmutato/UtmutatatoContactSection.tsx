'use client';
import { useState } from 'react';
import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './UtmutatatoContactSection.module.css';

export function UtmutatatoContactSection() {
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nev || !email) {
      setError('Kérjük töltsd ki a kötelező mezőket!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/epitoiparosoknak-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, email }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
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
    <section className={shared.lightSection} id="kapcsolat">
      <GridBg light />
      <div className={shared.container} style={{ position: 'relative', zIndex: 1 }}>
        <div className={`${shared.secLabel} ${shared.textCenter}`}>
          Ingyenes egyeztetés — kötelezettség nélkül
        </div>
        <h2
          className={`${shared.secTitle} ${shared.secTitleDark} ${shared.textCenter}`}
          style={{ marginBottom: '48px' }}
        >
          Mondd el, hol tartasz most —{' '}
          <span className={shared.accentDark}>megmutatjuk a következő lépést.</span>
        </h2>
        <div className={styles.contactWrap}>
          <div className={styles.contactLeft}>
            <div className={styles.contactShapes}>
              <span></span>
              <span></span>
            </div>
            <h3>
              Akár van weboldalad, akár nincs —{' '}
              <span className={shared.accent}>20 perc alatt</span> konkrét javaslatot adunk.
            </h3>
            <p>
              Nem fogunk azonnal eladni semmit. Először megértjük, mi kell neked — aztán
              megmutatjuk a legjobb utat.
            </p>
            <ul className={styles.contactStepsList}>
              <li>
                <span className={styles.stepNum}>1</span>Kitöltöd a formot — 30 másodperc
              </li>
              <li>
                <span className={styles.stepNum}>2</span>24 órán belül időpontot küldünk
              </li>
              <li>
                <span className={styles.stepNum}>3</span>30 perces hívás — utána írásos javaslat
              </li>
            </ul>
            <ul className={styles.contactBullets}>
              <li>24 órán belüli válasz</li>
              <li>Nincs kötelezettség</li>
              <li>Csak őszinte beszélgetés</li>
            </ul>
          </div>
          <div className={styles.contactRight}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✓</div>
                <h4 style={{ color: '#0f1226', marginBottom: '12px' }}>Megkaptuk!</h4>
                <p style={{ color: '#5a6079', fontSize: '15px', lineHeight: 1.6 }}>
                  24 órán belül visszaírunk a megadott email-re.
                </p>
              </div>
            ) : (
              <>
                <h4>Foglalok egy ingyenes egyeztetést</h4>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label>Keresztneved *</label>
                    <input
                      type="text"
                      placeholder="Pl. László"
                      value={nev}
                      onChange={(e) => setNev(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>E-mail-cím *</label>
                    <input
                      type="email"
                      placeholder="te@cegednev.hu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
                )}
                <button
                  className={styles.formSubmit}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Küldés...' : 'Foglalok egy ingyenes egyeztetést →'}
                </button>
                <p className={styles.formFoot}>
                  Az adataidat csak veled fogjuk használni — sehova nem továbbítjuk. 24 órán belül
                  visszaírunk.
                </p>
                <p className={styles.formAlt}>
                  vagy ha gyorsabb így:{' '}
                  <a href="mailto:info@nezor.hu">info@nezor.hu</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
