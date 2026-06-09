'use client';
import { useState, useEffect } from 'react';
import styles from './NavDrawer.module.css';

const links = [
  { label: 'Referenciák', href: '#referenciak', num: '01' },
  { label: 'Folyamat', href: '#process', num: '02' },
  { label: 'Szolgáltatás', href: '#szolgaltatas', num: '03' },
  { label: 'Kapcsolat', href: '#kapcsolat', num: '04' },
];

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  };

  return (
    <>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
        aria-expanded={open}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-label="Navigáció">
        <button
          className={styles.closeBtn}
          onClick={() => setOpen(false)}
          aria-label="Bezárás"
        >
          ×
        </button>

        <ul className={styles.navList}>
          {links.map((link, i) => (
            <li
              key={link.href}
              className={styles.navItem}
              style={{ '--i': i } as React.CSSProperties}
            >
              <a
                href={link.href}
                className={styles.navLink}
                onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
              >
                <span className={styles.navNum}>{link.num}</span>
                <span className={styles.navLabel}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFoot}>
          <a href="mailto:info@nezor.hu" className={styles.footLink}>info@nezor.hu</a>
          <a href="tel:+36704554703" className={styles.footLink}>+36 70 455 4703</a>
        </div>
      </nav>
    </>
  );
}
