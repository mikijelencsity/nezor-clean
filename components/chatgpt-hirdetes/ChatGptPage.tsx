'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent, ujEventId } from '@/components/analytics/FacebookPixel';
import styles from './ChatGptPage.module.css';

// Magyar mobilszám: 06/+36 előhívó + 20/30/31/50/70 szolgáltatói kód + 7 számjegy (szóköz/kötőjel opcionális)
const PHONE_RE = /^(?:\+36|06)[\s-]?(20|30|31|50|70)[\s-]?\d{3}[\s-]?\d{4}$/;

const pontok = [
  { ikon: '🚀', cim: 'Vadonatúj felület', szoveg: 'A ChatGPT-hirdetések épphogy elindultak — szinte senki nem hirdet még itt.' },
  { ikon: '💸', cim: 'Alacsony verseny = olcsó megjelenés', szoveg: 'Kevesebb hirdető, olcsóbb kattintás. Ez nem fog örökké tartani.' },
  { ikon: '⚡', cim: 'Mi beállítjuk neked', szoveg: 'Nem kell értened hozzá — gyorsan élesre visszük.' },
];

export function ChatGptPage() {
  const router = useRouter();
  const [nev, setNev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!nev.trim() || !telefon.trim()) { setError('Add meg a neved és telefonszámod!'); return; }
    if (!PHONE_RE.test(telefon.trim())) { setError('Érvénytelen telefonszám. Pl. 06 30 123 4567 vagy +36 30 123 4567.'); return; }
    if (!email.trim()) { setError('Add meg az email címed!'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Érvénytelen email cím.'); return; }
    if (!cegnev.trim()) { setError('Add meg a vállalkozásod nevét!'); return; }
    setLoading(true);
    setError('');
    try {
      const eventId = ujEventId();
      const res = await fetch('/api/chatgpt-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, telefon, email, cegnev, eventId, website }),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent('Lead', {}, eventId);
        router.push('/landing/koszonjuk');
      } else setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } catch {
      setError('Hiba történt. Próbáld újra, vagy hívj: +36 30 203 6721');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}>NEZ<span>OR</span></div>

        {/* HERO */}
        <div className={styles.chatgptBadge}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A6.07 6.07 0 0 0 19.02 19.8a5.98 5.98 0 0 0 4-2.9 6.05 6.05 0 0 0-.74-7.08Zm-9.02 10.6a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .4-.68v-6.75l2.02 1.17a.07.07 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.5 4.5ZM4.4 16.9a4.47 4.47 0 0 1-.53-3l.14.08 4.78 2.76a.78.78 0 0 0 .79 0l5.84-3.37v2.33a.08.08 0 0 1-.03.07l-4.83 2.79a4.5 4.5 0 0 1-6.16-1.66ZM3.16 8a4.48 4.48 0 0 1 2.35-1.98v5.69a.78.78 0 0 0 .4.68l5.83 3.37-2.02 1.17a.08.08 0 0 1-.07 0L4.82 14.1A4.5 4.5 0 0 1 3.16 8Zm16.6 3.85-5.84-3.38 2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.11v-5.69a.79.79 0 0 0-.4-.67ZM21.6 6.6a4.5 4.5 0 0 1-.15.15l-.14-.08-4.78-2.76a.78.78 0 0 0-.79 0l-5.84 3.37V4.95a.07.07 0 0 1 .03-.07l4.83-2.78a4.5 4.5 0 0 1 6.84 4.5ZM8.87 12.85l-2.02-1.17a.08.08 0 0 1-.04-.06V6.04a4.5 4.5 0 0 1 7.38-3.46l-.14.08-4.78 2.76a.79.79 0 0 0-.4.68v6.75Zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5v-3Z" />
          </svg>
          ChatGPT-hirdetés — vadonatúj lehetőség
        </div>
        <h1 className={styles.h1}>
          Hirdess ott,<br />
          <span className={styles.grad}>ahol még szinte senki.</span>
        </h1>
        <p className={styles.lead}>
          A ChatGPT-hirdetések most indultak el. Alacsony verseny, korai előny — <strong>ez nem fog sokáig tartani.</strong>
        </p>
        <button type="button" className={styles.ctaPrimary} onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
          Ne maradj le →
        </button>

        {/* RÖVID MAGYARÁZAT */}
        <div className={styles.pontok}>
          {pontok.map((p) => (
            <div key={p.cim} className={styles.pont}>
              <span className={styles.pontIkon}>{p.ikon}</span>
              <h3>{p.cim}</h3>
              <p>{p.szoveg}</p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div id="form" className={styles.formCard}>
          <h2 className={styles.formTitle}>
            <span className={styles.grad}>Kérem</span> a lehetőséget
          </h2>
          <p className={styles.formSub}>Pár adat, és felvesszük veled a kapcsolatot.</p>

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

          <div className={styles.fields}>
            <input type="text" placeholder="Teljes neved *" value={nev} onChange={(e) => setNev(e.target.value)} />
            <input type="tel" placeholder="Telefonszámod *" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
            <input type="email" placeholder="Email címed *" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type="text"
              placeholder="Vállalkozás neve *"
              value={cegnev}
              onChange={(e) => setCegnev(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Küldés...' : 'Ne maradj le →'}
          </button>
          <p className={styles.note}>
            Inkább telefonon? <a href="tel:+36302036721">+36 30 203 6721</a>
          </p>
        </div>

        <p className={styles.foot}>© 2026 NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
      </div>
    </div>
  );
}
