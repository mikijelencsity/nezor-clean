import styles from './ProcessSection.module.css';

export function ProcessSection() {
  return (
    <section className={styles.process}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Így segítünk neked</div>
        <h2 className={styles.mega}>
          <span className={styles.accent}>0</span>-ról <span className={styles.accent}>1.</span> ügyfélig
        </h2>
        <p className={styles.tagline}>Nézzük meg, hogyan is kezdenénk...</p>
        <a href="#szolgaltatas" className={styles.scrollArrow} aria-label="Tovább lefelé">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
