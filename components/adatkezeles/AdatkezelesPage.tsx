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
            <strong>Hatályos:</strong> 2026. október 21-től ·{' '}
            <strong>Utoljára frissítve:</strong> 2026. október 21.
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
          <p><strong>Feliratkozás (ingyenes útmutató, kuponkód) esetén:</strong></p>
          <ul>
            <li><strong>E-mail cím</strong> — a feliratkozási űrlap kitöltésekor megadott</li>
            <li><strong>Feliratkozás időpontja</strong> — automatikusan rögzített technikai adat</li>
          </ul>
          <p><strong>Kapcsolatfelvételi és ajánlatkérő űrlapok esetén:</strong></p>
          <ul>
            <li><strong>Név, telefonszám, e-mail cím</strong> — a kapcsolatfelvételhez</li>
            <li><strong>Vállalkozás neve, tevékenysége</strong> és az űrlap kérdéseire adott válaszok (pl. hirdetési tapasztalat, weboldal megléte, kívánt ügyfélszám)</li>
            <li><strong>A hozzájárulás időpontja</strong> — automatikusan rögzített technikai adat</li>
          </ul>
          <p><strong>Minden látogatás során:</strong></p>
          <ul>
            <li><strong>IP-cím, böngésző- és eszközadatok</strong> — a szerver és a tárhelyszolgáltató által automatikusan rögzítve</li>
            <li><strong>Süti-azonosítók és látogatási adatok</strong> — csak ha a süti-sávban hozzájárult (lásd 6. pont)</li>
          </ul>
        </div>

        {/* 3. Az adatkezelés célja és jogalapja */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>3</div>
          <h2>Az adatkezelés célja és jogalapja</h2>
          <ul>
            <li>
              <strong>Feliratkozás:</strong> az ingyenes útmutató és a kuponkód eljuttatása, valamint az azt követő —
              előzetesen ígért — tájékoztató tartalmak küldése.
            </li>
            <li>
              <strong>Kapcsolatfelvételi űrlapok:</strong> hogy telefonon vagy e-mailben felvegyük Önnel a kapcsolatot,
              és a megadott válaszok alapján személyre szabott javaslatot (pl. hirdetési keretet) adjunk.
            </li>
            <li>
              <strong>Hirdetésmérés és statisztika:</strong> hirdetéseink hatékonyságának mérése és a látogatottság
              elemzése (Meta Pixel, Conversions API, Google Analytics).
            </li>
          </ul>
          <div className={styles.docHighlight}>
            <strong>Jogalap:</strong> Az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont) — az
            űrlap kitöltésével, a hozzájáruló jelölőnégyzet bepipálásával és elküldésével, illetve a süti-sávban
            az „Elfogadom az összeset” gombbal Ön kifejezetten hozzájárul az adatkezeléshez. A hozzájárulását
            bármikor visszavonhatja, ez nem érinti a visszavonás előtti adatkezelés jogszerűségét.
          </div>
          <p>
            <strong>Megőrzési idő:</strong> A feliratkozási adatokat legfeljebb 2 évig, a kapcsolatfelvételi űrlapon
            megadott adatokat — ha nem jön létre szerződés — legfeljebb 1 évig őrizzük meg, vagy amíg Ön a törlést
            nem kéri. Szerződés létrejötte esetén a számviteli jogszabályokban előírt ideig.
          </p>
        </div>

        {/* 4. Kinek adjuk át az adatokat */}
        <div className={styles.docSection}>
          <div className={styles.docSectionNum}>4</div>
          <h2>Kinek adjuk át az adatokat?</h2>
          <p>Személyes adatait nem adjuk el. Az alábbi adatfeldolgozókat és címzetteket vesszük igénybe:</p>
          <ul>
            <li>
              <strong>Resend (Resend, Inc., USA)</strong> — e-mail kézbesítési szolgáltatás, kizárólag az üzenetek
              technikai kézbesítéséhez szükséges mértékben.
            </li>
            <li>
              <strong>Vercel (Vercel Inc., USA)</strong> — a weboldal tárhelyszolgáltatója; a látogatás során a
              szervernaplókban IP-címet és technikai adatokat kezel.
            </li>
            <li>
              <strong>Meta (Meta Platforms Ireland Ltd.)</strong> — a Meta Pixel csak akkor méri a látogatást és az
              űrlapküldést, ha a sütiket elfogadta. Ha a kapcsolatfelvételi űrlapon a jelölőnégyzet bepipálásával ehhez
              hozzájárult, az űrlap végleges elküldésekor a Conversions API a megadott e-mail címet, telefonszámot és
              nevet <strong>visszafejthetetlen (SHA-256) titkosított formában</strong>, valamint IP-címet és böngészőadatokat
              továbbít a Meta részére hirdetéseink mérése céljából. A Meta adatkezeléséről:{' '}
              <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener">facebook.com/privacy/policy</a>.
            </li>
            <li>
              <strong>Google (Google Ireland Ltd.)</strong> — Google Analytics látogatottsági statisztika; sütiket csak
              hozzájárulás esetén használ, hozzájárulás nélkül csak anonim, sütimentes jelzéseket kap.
            </li>
            <li>
              <strong>Jogszabályi kötelezettség</strong> esetén — ha hatóság jogszerű megkeresés alapján kéri.
            </li>
          </ul>
          <p>
            Az Európai Gazdasági Térségen kívüli (USA) adattovábbítás az EU–USA adatvédelmi keretrendszer (Data Privacy
            Framework), illetve az Európai Bizottság általános szerződési feltételei alapján történik. Az adatfeldolgozók
            az adatokat kizárólag a megjelölt célra használhatják fel.
          </p>
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
            Az oldal első megnyitásakor egy süti-sávban dönthet. A működéshez szükséges sütiken kívül marketing és
            statisztikai sütiket <strong>kizárólag az Ön előzetes hozzájárulásával</strong> alkalmazunk. Döntését
            bármikor megváltoztathatja az oldalak láblécében található „Süti-beállítások” gombbal, vagy a böngészője
            sütijeinek törlésével.
          </p>
          <ul>
            <li>
              <strong>Szükséges</strong> — a süti-döntés tárolása (<code>nezorCookieConsent</code>, a böngésző helyi
              tárhelyén), amíg Ön nem törli
            </li>
            <li>
              <strong>Statisztika (Google Analytics)</strong> — <code>_ga</code>, <code>_ga_*</code>: látogatottsági
              adatok, legfeljebb 2 évig — csak hozzájárulással
            </li>
            <li>
              <strong>Marketing (Meta Pixel)</strong> — <code>_fbp</code>, <code>_fbc</code>: hirdetésmérés és
              hirdetési célközönségek, legfeljebb 90 napig — csak hozzájárulással
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
