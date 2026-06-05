import styles from './AdatkezelesPage.module.css';

export function AdatkezelesPage() {
  return (
    <>
      <div className={styles.pageGrid} />

      <header className={styles.header}>
        <a href="/landing" className={styles.logo}>
          NEZ<span>OR</span>
        </a>
        <a href="/landing" className={styles.backBtn}>
          ← Vissza a főoldalra
        </a>
      </header>

      <main className={styles.main}>

        {/* Hero */}
        <div className={styles.docHero}>
          <div className={styles.docBadge}>📋 Jogi dokumentum</div>
          <h1 className={styles.docTitle}>
            Adatkezelési<br /><span>Tájékoztató</span>
          </h1>
          <p className={styles.docMeta}>
            <strong>Hatályos:</strong> 2026. június 5-től ·{' '}
            <strong>Utoljára frissítve:</strong> 2026. június 5.
          </p>
        </div>

        {/* 1. Az adatkezelő adatai */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>1</div>
          <h2>Az adatkezelő adatai</h2>
          <div className={styles.docHighlight}>
            <strong>Müller Dániel E.V.</strong><br />
            Adószám: 91037491-1-23<br />
            Székhely: 6500 Baja, Budai Nagy Antal u. 36.<br />
            E-mail: <a href="mailto:info@nezor.hu">info@nezor.hu</a><br />
            Weboldal: <a href="https://nezor.hu">nezor.hu</a>
          </div>
          <p>
            Az adatkezelő a jelen tájékoztatóban foglaltak szerint kezeli az Ön személyes adatait az Európai Unió
            2016/679 számú Általános Adatvédelmi Rendeletének (GDPR) és a vonatkozó magyar jogszabályoknak megfelelően.
          </p>
        </div>

        {/* 2. Milyen adatokat kezelünk */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>2</div>
          <h2>Milyen adatokat kezelünk?</h2>
          <p>A landing oldalon keresztül történő feliratkozás során az alábbi személyes adatokat kezeljük:</p>
          <ul>
            <li><strong>E-mail cím</strong> — a feliratkozási űrlap kitöltésekor megadott</li>
            <li><strong>IP-cím</strong> — automatikusan rögzítve a szerver által a látogatás során</li>
            <li><strong>Feliratkozás időpontja</strong> — automatikusan rögzített technikai adat</li>
          </ul>
          <p>Más személyes adatot (pl. telefonszám, lakcím) ezen az oldalon nem gyűjtünk.</p>
        </div>

        {/* 3. Az adatkezelés célja és jogalapja */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>3</div>
          <h2>Az adatkezelés célja és jogalapja</h2>
          <p>
            Az e-mail cím kezelésének célja az ingyenes útmutató és a 10% kuponkód eljuttatása, valamint az azt
            követő — előzetesen ígért — tájékoztató tartalmak küldése.
          </p>
          <div className={styles.docHighlight}>
            <strong>Jogalap:</strong> Az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont) — az
            űrlap kitöltésével és elküldésével Ön kifejezetten hozzájárul az adatkezeléshez.
          </div>
          <p>
            <strong>Megőrzési idő:</strong> Az adatokat a feliratkozástól számított legfeljebb 2 évig őrizzük meg,
            vagy amíg Ön a leiratkozást nem kéri — amelyik előbb következik be.
          </p>
        </div>

        {/* 4. Kinek adjuk át az adatokat */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>4</div>
          <h2>Kinek adjuk át az adatokat?</h2>
          <p>Az Ön e-mail címét harmadik fél részére nem adjuk el és nem adjuk át, kivéve az alábbi eseteket:</p>
          <ul>
            <li>
              <strong>Resend (resend.com)</strong> — e-mail kézbesítési szolgáltatás, kizárólag az üzenetek
              technikai kézbesítéséhez szükséges mértékben. Adatfeldolgozói szerződés alapján.
            </li>
            <li>
              <strong>Jogszabályi kötelezettség</strong> esetén — ha hatóság jogszerű megkeresés alapján kéri
            </li>
          </ul>
          <p>Az adatfeldolgozók az adatokat az adatkezelő utasításai szerint, kizárólag a megjelölt célra használhatják fel.</p>
        </div>

        {/* 5. Az érintett jogai */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>5</div>
          <h2>Az Ön jogai</h2>
          <p>A GDPR alapján Önt az alábbi jogok illetik meg személyes adataival kapcsolatban:</p>
          <div className={styles.rightsGrid}>
            <div className={styles.rightItem}>
              <strong>Hozzáférés joga</strong>
              <span>Tájékoztatást kérhet arról, hogy milyen adatait kezeljük és hogyan.</span>
            </div>
            <div className={styles.rightItem}>
              <strong>Törlés joga</strong>
              <span>Bármikor kérheti adatai törlését (&ldquo;elfeledtetés joga&rdquo;).</span>
            </div>
            <div className={styles.rightItem}>
              <strong>Helyesbítés joga</strong>
              <span>Kérheti a pontatlan adatok kijavítását vagy kiegészítését.</span>
            </div>
            <div className={styles.rightItem}>
              <strong>Tiltakozás joga</strong>
              <span>Tiltakozhat adatai kezelése ellen, pl. marketing célból.</span>
            </div>
            <div className={styles.rightItem}>
              <strong>Hordozhatóság joga</strong>
              <span>Kérheti adatait géppel olvasható formátumban.</span>
            </div>
            <div className={styles.rightItem}>
              <strong>Leiratkozás joga</strong>
              <span>Bármikor leiratkozhat, minden levélben megtalálja a linket.</span>
            </div>
          </div>
          <p style={{ marginTop: '16px' }}>
            Jogai gyakorlásához írjon az alábbi elérhetőségre — <strong>30 napon belül</strong> válaszolunk.
          </p>
        </div>

        {/* 6. Cookie-k */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>6</div>
          <h2>Cookie-k (sütik)</h2>
          <p>
            Ez az oldal alapvetően csak technikai sütiket használ a működéshez szükséges mértékben. Marketing vagy
            nyomkövető cookie-kat kizárólag az Ön előzetes hozzájárulásával alkalmazunk.
          </p>
          <ul>
            <li>
              <strong>Munkamenet cookie</strong> — az oldal működéséhez szükséges, session végén törlődik
            </li>
            <li>
              <strong>Analitika</strong> — aggregált, személyazonosításra nem alkalmas látogatottsági adatok
            </li>
          </ul>
        </div>

        {/* 7. Jogorvoslat, panasz */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>7</div>
          <h2>Jogorvoslat, panasz</h2>
          <p>
            Ha úgy érzi, hogy adatait jogellenesen kezeljük, jogorvoslatért fordulhat a{' '}
            <strong>Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH)</strong>:
          </p>
          <div className={styles.docHighlight}>
            <strong>NAIH</strong> · 1055 Budapest, Falk Miksa utca 9–11.<br />
            Web:{' '}
            <a href="https://naih.hu" target="_blank" rel="noopener">
              naih.hu
            </a>{' '}
            · E-mail:{' '}
            <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>
          </div>
        </div>

        {/* Kapcsolat */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>✉</div>
          <h2>Kapcsolat adatvédelmi ügyekben</h2>
          <p>Kérdés, adattörlési kérelem vagy bármilyen adatvédelmi ügyben keressen minket:</p>
          <div className={styles.contactCard}>
            <div className={styles.contactCardInfo}>
              <strong>NEZOR Webfejlesztés</strong>
              <span>info@nezor.hu · Válasz 30 napon belül</span>
            </div>
            <a href="mailto:info@nezor.hu" className={styles.contactCardBtn}>
              Írj nekünk →
            </a>
          </div>
        </div>

        <div className={styles.docFooter}>
          <p>© 2026 Müller Dániel E.V. · NEZOR Webfejlesztés</p>
          <p style={{ marginTop: '6px' }}>
            <a href="/landing">← Vissza a főoldalra</a>
          </p>
        </div>

      </main>
    </>
  );
}
