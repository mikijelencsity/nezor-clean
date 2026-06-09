'use client';
import { useState } from 'react';
import { GridBg } from '@/components/ui/GridBg';
import shared from './utmutato-shared.module.css';
import styles from './UtmutatatoContactSection.module.css';

export function UtmutatatoContactSection() {
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nev || !email || !telefon) {
      setError('Kérjük töltsd ki a kötelező mezőket!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Érvénytelen e-mail cím.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await fetch('/api/epitoiparosoknak-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, email, telefon }),
      });
    } catch {
      // szilensen kezeljük
    }
    setLoading(false);
    setSent(true);
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
        {sent ? (
          <div className={styles.successWrap}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✓</div>
            <h3 style={{ color: '#0f1226', marginBottom: '12px' }}>Megkaptuk!</h3>
            <p style={{ color: '#5a6079', fontSize: '17px', lineHeight: 1.6 }}>
              Hamarosan felhívunk a megadott telefonszámon. Addig is, ha kérdésed van: <a href="mailto:info@nezor.hu" style={{ color: '#0099b8', fontWeight: 700 }}>info@nezor.hu</a>
            </p>
          </div>
        ) : (
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
                  <span className={styles.stepNum}>1</span>Add meg az adataid
                </li>
                <li>
                  <span className={styles.stepNum}>2</span>Felhívunk a megadott számon
                </li>
                <li>
                  <span className={styles.stepNum}>3</span>20 perces hívás — utána írásos javaslat
                </li>
              </ul>
              <ul className={styles.contactBullets}>
                <li>Azonnali visszaigazolás</li>
                <li>Nincs kötelezettség</li>
                <li>Csak őszinte beszélgetés</li>
              </ul>
            </div>
            <div className={styles.contactRight}>
              <h4>Kérj ingyenes egyeztetést</h4>
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
                    placeholder="te@example.hu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Telefonszám *</label>
                  <input
                    type="tel"
                    placeholder="+36 30 123 4567"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
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
                {loading ? 'Küldés...' : 'Visszahívást kérek →'}
              </button>
              <p className={styles.formFoot}>
                Az adataidat csak veled fogjuk használni — sehova nem továbbítjuk.
              </p>
              <p className={styles.formAlt}>
                vagy ha gyorsabb így:{' '}
                <a href="mailto:info@nezor.hu">info@nezor.hu</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
