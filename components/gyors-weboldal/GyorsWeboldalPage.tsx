'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridBg } from '@/components/ui/GridBg';
import shared from '@/components/nezor-utmutato/utmutato-shared.module.css';
import styles from './GyorsWeboldalPage.module.css';

// TODO: cseréld ki az egyes designok élő demó linkjeire
const templates = [
  { id: 'klimas', nev: 'Klímás / gépészet', leiras: 'Modern, megbízható megjelenés — klímaszerelőknek, gépészeknek.', kep: '/modernweboldal.webp', url: 'https://example.com/klimas' },
  { id: 'tetofedo', nev: 'Tetőfedő / építőipar', leiras: 'Erős, szakmai kiállás — tetőfedőknek, építőipari vállalkozóknak.', kep: '/profilanding.webp', url: 'https://example.com/tetofedo' },
  { id: 'kisvallalkozas', nev: 'Kisvállalkozás / szolgáltatás', leiras: 'Barátságos, egyszerű megjelenés — helyi szolgáltatóknak.', kep: '/nekedsutom.webp', url: 'https://example.com/kisvallalkozas' },
  { id: 'ipari', nev: 'Ipari / gyártás', leiras: 'Professzionális arculat — gyártóknak, beszállítóknak.', kep: '/koronagomba.webp', url: 'https://example.com/ipari' },
];

export function GyorsWeboldalPage() {
  const [sablon, setSablon] = useState('');
  const [nev, setNev] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [tevekenyseg, setTevekenyseg] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [website, setWebsite] = useState('');
  const [tartalom, setTartalom] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sablon) {
      setError('Válassz egy designt a folytatáshoz!');
      return;
    }
    if (!nev || !cegnev || !tevekenyseg || !email || !telefon) {
      setError('Kérjük töltsd ki a kötelező mezőket!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Érvénytelen e-mail cím.');
      return;
    }
    if (!tartalom) {
      setError('Kérjük fogadd el a feltételt az igényléshez!');
      return;
    }
    setError('');
    setLoading(true);
    const valasztott = templates.find((t) => t.id === sablon);
    try {
      await fetch('/api/gyors-weboldal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nev, cegnev, tevekenyseg, email, telefon, website,
          sablon: valasztott?.nev ?? sablon,
        }),
      });
    } catch {
      // szilensen kezeljük
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <section className={shared.lightSection}>
      <GridBg light />
      <div className={`${shared.container} ${shared.textCenter}`} style={{ position: 'relative', zIndex: 1 }}>
        <span className={shared.secLabel}>⚡ 48 órás expressz</span>
        <h1 className={`${shared.secTitle} ${shared.secTitleDark}`}>
          Elkészített weboldalaink, amelyek{' '}
          <span className={shared.accentDark}>gazdára várnak.</span>
        </h1>
        <p className={`${shared.secSub} ${shared.secSubMutedDark} ${shared.mxAuto} ${shared.mb60}`}>
          Nincs konzultáció, nincs várakozás. Válassz egyet az alábbi weboldalak közül, add meg az
          adataidat — a szövegeket és képeket utána emailben kérjük el, és a te adataiddal,
          képeiddel élesítjük neked.
        </p>

        {!sent && (
          <>
            <div className={styles.freeBanner}>
              ✅ <strong>Ingyen</strong> elkészítjük a TE verziódat a saját adataiddal és
              képeiddel, megmutatjuk — és csak akkor fizetsz, ha tetszik.
            </div>

            <div className={styles.infoBanner}>
              <strong>Fontos:</strong> az alábbi képek csak a <strong>kinézetet</strong>{' '}
              mutatják — a végleges weboldalon minden a TE szakmádra, adataidra és képeidre lesz
              kicserélve. Tehát ha pl. klímás vagy, simán választhatod a &quot;Tetőfedő&quot;
              designt is — a végeredmény a te vállalkozásodról fog szólni, nem a mintáról.
            </div>

            <div className={styles.perksGrid}>
              <div className={styles.perkCard}>
                <span className={styles.perkIcon}>⚡</span>
                <h4>Gyors, mobilon is szép</h4>
                <p>A weboldalad telefonon és tableten is gyorsan betölt és jól néz ki — ma már innen jön a legtöbb látogató.</p>
              </div>
              <div className={styles.perkCard}>
                <span className={styles.perkIcon}>🔍</span>
                <h4>Megtalálnak a Google-ben</h4>
                <p>Úgy állítjuk be, hogy amikor rád keresnek a környékeden, jó helyen jelenj meg a Google találatok között.</p>
              </div>
              <div className={styles.perkCard}>
                <span className={styles.perkIcon}>🌐</span>
                <h4>Kapsz egy saját domaint</h4>
                <p>
                  Ez a weboldalad neve a neten (pl. <strong>www.avallalkozasod.hu</strong>) — ezt
                  írják be az emberek, vagy ez jelenik meg, ha rád keresnek. Ez is benne van.
                </p>
              </div>
            </div>
          </>
        )}

        {sent ? (
          <div className={styles.successWrap}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✓</div>
            <h3 style={{ color: '#0f1226', marginBottom: '12px' }}>Megkaptuk a megrendelésed!</h3>
            <p style={{ color: '#5a6079', fontSize: '17px', lineHeight: 1.6 }}>
              Hamarosan emailben felvesszük veled a kapcsolatot, és elkérjük a szövegeket/képeket a
              kiválasztott designhoz. Addig is, ha kérdésed van: <a href="mailto:info@nezor.hu" style={{ color: '#0099b8', fontWeight: 700 }}>info@nezor.hu</a>
            </p>
          </div>
        ) : (
          <>
            <div className={styles.templateGrid}>
              {templates.map((t) => (
                <div
                  key={t.id}
                  className={`${styles.templateCard} ${sablon === t.id ? styles.templateCardActive : ''}`}
                >
                  <button
                    type="button"
                    className={styles.templateSelect}
                    onClick={() => setSablon(t.id)}
                  >
                    <div className={styles.templateImgWrap}>
                      <Image src={t.kep} alt={t.nev} fill style={{ objectFit: 'cover' }} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px" />
                      {sablon === t.id && <span className={styles.templateCheck}>✓</span>}
                    </div>
                    <div className={styles.templateInfo}>
                      <h3>{t.nev}</h3>
                      <p>{t.leiras}</p>
                    </div>
                  </button>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.previewBtn}
                  >
                    Megnézem élőben →
                  </a>
                </div>
              ))}
            </div>

            <div className={styles.formCard}>
              <h4>Add meg az adataidat</h4>
              <input
                type="text"
                name="nezor_hp_field"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Teljes név *</label>
                  <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Egyéni vállalkozás vagy cégnév *</label>
                  <input type="text" placeholder="Pl. Kovács László EV vagy Kovács Kft." value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Mivel foglalkozik? *</label>
                  <input type="text" placeholder="Pl. festő, kőműves, villanyszerelő" value={tevekenyseg} onChange={(e) => setTevekenyseg(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>E-mail-cím *</label>
                  <input type="email" placeholder="te@example.hu" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Telefonszám *</label>
                  <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                </div>
              </div>
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={tartalom} onChange={(e) => setTartalom(e.target.checked)} />
                <span>
                  Tudom, hogy a végleges szövegeket és képeket emailben fogom elküldeni, ingyen
                  elkészítitek a saját verziómat, megmutatjátok — és csak akkor fizetek, ha
                  tetszik.
                </span>
              </label>
              {error && (
                <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
              )}
              <button className={styles.formSubmit} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Küldés...' : 'Kérem az ingyenes verziómat →'}
              </button>
              <p className={styles.formFoot}>
                Az adataidat csak veled fogjuk használni — sehova nem továbbítjuk.
              </p>
            </div>
          </>
        )}

        <Link href="/nezor-utmutato" className={styles.back}>← Vissza</Link>
      </div>
    </section>
  );
}
