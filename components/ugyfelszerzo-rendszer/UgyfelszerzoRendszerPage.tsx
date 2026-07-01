'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './UgyfelszerzoRendszerPage.module.css';

/* ---------- Reveal: finom scroll-in animáció ---------- */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Adatok ---------- */
const szakmak = [
  'Tetőfedő', 'Festő', 'Víz-gáz-fűtésszerelő', 'Villanyszerelő', 'Klímás',
  'Építőipari szakember', 'Takarító', 'Autókozmetika', 'Javítószolgáltatás',
  'Szépségipari vállalkozás', 'Egyéb helyi szolgáltató',
];

const bizalomKerdesek = [
  'Van normális weboldalad?',
  'Jól néz ki mobilon?',
  'Van ajánlatkérő űrlapod?',
  'Friss a Google Cégprofilod?',
  'Több értékelésed van, mint a konkurensednek?',
  'Tudod, honnan jönnek az érdeklődők?',
  'Vissza vannak követve a megkeresések?',
];

const folyamatLepesek = [
  'Google keresés / hirdetés',
  'Bizalomépítő landing oldal',
  'Ajánlatkérő űrlap',
  'Automata visszajelzés',
  'Lead nyilvántartás',
  'Visszahívás / ajánlatadás',
  'Értékeléskérés',
  'Havi javítás',
];

const szolgaltatasKartyak = [
  { szam: '01', cim: 'Konverzióra épített weboldal vagy landing oldal', leiras: 'Nem dísznek. Ajánlatkérésre.' },
  { szam: '02', cim: 'Google Cégprofil rendberakás', leiras: 'Hogy ne tűnj el ott, ahol a helyi ügyfelek keresnek.' },
  { szam: '03', cim: 'Meta / Google hirdetés alapok', leiras: 'Nem random posztkiemelés. Mérhető kampány.' },
  { szam: '04', cim: 'Ajánlatkérő űrlap és lead rendszer', leiras: 'Hogy az érdeklődő ne csak nézelődjön, hanem lépjen.' },
  { szam: '05', cim: 'Értékelésgyűjtés', leiras: 'Mert a bizalom ma már nem bemondásra megy.' },
  { szam: '06', cim: 'Havi javítás és riport', leiras: 'Hogy lásd, mi történik, és ne vakon fizess.' },
  { szam: '07', cim: 'AI / ChatGPT kommunikációs segítség', leiras: 'GYIK, válaszsablonok, ügyfél-előszűrés — csak ha van értelme.' },
];

const elveszettLista = [
  'Rád keresett, de nem talált normális oldalt.',
  'Megnézte a Facebook oldalad, de nem volt friss.',
  'Megnyitotta a weboldalad, de mobilon szétesett.',
  'Keresett ajánlatkérő gombot, de nem találta.',
  'Elment a konkurensedhez.',
  'Te pedig sosem tudtad meg, hogy létezett.',
];

const csomagok = [
  {
    id: 'starter', nev: 'Starter', alcim: 'Online alap + ajánlatkérő rendszer',
    ar: '59 000 Ft/hó', setup: '+ 149 000 Ft setup',
    kinek: 'Akinek gyenge vagy hiányos az online jelenléte.',
    igeret: 'Rendbe rakjuk az alapokat, hogy ne veszíts bizalmat.',
  },
  {
    id: 'standard', nev: 'Standard', alcim: 'Ügyfélszerző rendszer hirdetéssel',
    ar: '119 000 Ft/hó', setup: '+ 249 000 Ft setup', kiemelt: true,
    kinek: 'Aki aktívan szeretne több ajánlatkérést.',
    igeret: 'Mérhető rendszert építünk weboldallal, hirdetéssel és leadkezeléssel.',
  },
  {
    id: 'premium', nev: 'Premium', alcim: 'Helyi dominancia rendszer',
    ar: '219 000 Ft/hó', setup: '+ 399 000 Ft setup',
    kinek: 'Akinek nagy értékű munkái vannak, és komolyabban veszi az online ügyfélszerzést.',
    igeret: 'Erősebb online jelenlétet és folyamatos fejlesztést építünk a helyi konkurensek ellen.',
  },
];

const facebookVsRendszer = {
  facebook: ['Posztok', 'Kommentek', 'Nincs struktúra', 'Nehéz mérni', 'Kevés kontroll'],
  rendszer: ['Világos ajánlat', 'Ajánlatkérő űrlap', 'Mérés', 'Hirdetés', 'Lead nyilvántartás', 'Havi javítás'],
};

export function UgyfelszerzoRendszerPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [checked, setChecked] = useState<boolean[]>(Array(bizalomKerdesek.length).fill(false));
  const igenCount = checked.filter(Boolean).length;
  const toggleCheck = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const [nev, setNev] = useState('');
  const [cegnev, setCegnev] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [szakma, setSzakma] = useState('');
  const [megjegyzes, setMegjegyzes] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!nev || !telefon || !email) {
      setError('Kérjük töltsd ki a kötelező mezőket!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Érvénytelen e-mail cím.');
      return;
    }
    if (!szakma) {
      setError('Válassz, milyen vállalkozásod van!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await fetch('/api/ugyfelszerzo-rendszer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, cegnev, telefon, email, szakma, megjegyzes, website }),
      });
    } catch {
      // szilensen kezeljük
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlowA} aria-hidden="true" />
        <div className={styles.heroGlowB} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.container}>
          <span className={styles.label}>HELYI ÜGYFÉLSZERZŐ RENDSZER</span>
          <h1 className={styles.h1}>
            Lehet, hogy nem a munkáddal van baj.<br />
            Hanem azzal, amit az ügyfél lát,<br />
            <span className={styles.heroAccent}>mielőtt felhívna.</span>
          </h1>
          <p className={styles.heroSub}>
            A legtöbb helyi vállalkozás nem azért veszít érdeklődőket, mert rosszul dolgozik.
            Hanem mert online gyengének, elavultnak vagy megbízhatatlannak tűnik.
            Mi ezt rakjuk rendbe — egy komplett ügyfélszerző rendszerrel.
          </p>
          <div className={styles.heroCtas}>
            <button type="button" className={styles.ctaPrimary} onClick={scrollToForm}>
              Kérek egy online megjelenés átnézést →
            </button>
            <button type="button" className={styles.ctaSecondary} onClick={scrollToForm}>
              Mutasd, mit lát most rólam az ügyfél
            </button>
          </div>

          <Reveal delay={200}>
            <div className={styles.splitScreen}>
              <div className={styles.splitCard}>
                <span className={styles.splitTag}>AMIT MOST LÁT AZ ÜGYFÉL</span>
                <ul className={styles.splitListBad}>
                  <li>Gyenge Google Cégprofil</li>
                  <li>Kevés / régi értékelés</li>
                  <li>Mobilon szétesett oldal</li>
                  <li>Facebook oldal, ami káosz</li>
                </ul>
              </div>
              <div className={styles.splitArrow} aria-hidden="true">→</div>
              <div className={`${styles.splitCard} ${styles.splitCardGood}`}>
                <span className={styles.splitTagGood}>AMIT LÁTNIA KELLENE</span>
                <ul className={styles.splitListGood}>
                  <li>Profi, gyors landing oldal</li>
                  <li>Erős Google megjelenés</li>
                  <li>Ajánlatkérő gomb + lead értesítés</li>
                  <li>Tiszta szolgáltatás-struktúra</li>
                </ul>
              </div>
            </div>
            <div className={styles.warningFloat}>
              ⚠ Az érdeklődő döntése gyakran a telefonhívás előtt megszületik.
            </div>
          </Reveal>
        </div>
      </section>

      {/* PSZICHOLÓGIAI PROBLÉMA + BIZALOMTESZT */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>
              Az ügyfél nem szakemberként lát először.<br />Hanem találatként.
            </h2>
            <p className={styles.sectionSub}>
              Amikor valaki szakembert keres, nem tudja, ki dolgozik jobban. Azt látja, ki tűnik
              megbízhatóbbnak. Ki van fent Google-ben. Kinek van normális oldala. Kinek vannak
              képei. Kinél egyszerű ajánlatot kérni.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.testCard}>
              <span className={styles.testLabel}>3 MÁSODPERCES BIZALOMTESZT</span>
              <div className={styles.testList}>
                {bizalomKerdesek.map((k, i) => (
                  <button
                    type="button"
                    key={k}
                    className={`${styles.testItem} ${checked[i] ? styles.testItemChecked : ''}`}
                    onClick={() => toggleCheck(i)}
                  >
                    <span className={styles.testCheckbox}>{checked[i] ? '✓' : ''}</span>
                    {k}
                  </button>
                ))}
              </div>
              <div className={styles.testResult}>
                {igenCount === 0 ? (
                  <>Kattints rá, amire <strong>igen</strong> a válasz.</>
                ) : igenCount < bizalomKerdesek.length - 3 ? (
                  <>Ha ezekből <strong>3-ra nem</strong> a válasz, akkor nem online jelenléted van. Csak digitális nyomod.</>
                ) : (
                  <>Erős az alap — de lássuk, hol veszítesz mégis érdeklődőket.</>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EZ NEM WEBOLDAL */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>Egy weboldal önmagában kevés.<br />Rendszer kell.</h2>
            <p className={styles.sectionSub}>
              Mi nem csak egy oldalt rakunk össze. A teljes utat nézzük meg attól a pillanattól,
              hogy az érdeklődő rád keres, addig, amíg ajánlatot kér — vagy eltűnik. Ahol most
              kiesik, ott pénzt veszítesz.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.flowChart}>
              {folyamatLepesek.map((l, i) => (
                <div key={l} className={styles.flowStep}>
                  <span className={styles.flowNum}>{i + 1}</span>
                  <span>{l}</span>
                  {i < folyamatLepesek.length - 1 && <span className={styles.flowConnector} aria-hidden="true" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* KONKURENS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>A konkurensed lehet, hogy nem jobb nálad.<br />Csak online jobban néz ki.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.vsGrid}>
              <div className={styles.vsCard}>
                <h3>Jó szakember, gyenge online jelenlét</h3>
                <ul className={styles.vsListBad}>
                  <li>Nincs oldal</li>
                  <li>Kevés kép</li>
                  <li>Régi Facebook posztok</li>
                  <li>Nincs ajánlatkérő</li>
                  <li>Gyenge Google profil</li>
                </ul>
              </div>
              <div className={`${styles.vsCard} ${styles.vsCardGood}`}>
                <h3>Közepes szakember, profi online jelenlét</h3>
                <ul className={styles.vsListGood}>
                  <li>Modern oldal</li>
                  <li>Jó értékelések</li>
                  <li>Gyors kapcsolatfelvétel</li>
                  <li>Erős referenciák</li>
                  <li>Egyszerű ajánlatkérés</li>
                </ul>
              </div>
            </div>
            <p className={styles.closingLine}>
              „Az ügyfél nem mindig a jobbat választja. Hanem azt, akiben előbb megbízik.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* SZOLGÁLTATÁS BEMUTATÁSA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>Mit építünk fel neked?</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.serviceGrid}>
              {szolgaltatasKartyak.map((s) => (
                <div key={s.szam} className={styles.serviceCard}>
                  <span className={styles.serviceNum}>{s.szam}</span>
                  <h3>{s.cim}</h3>
                  <p>{s.leiras}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ELVESZETT ÉRDEKLŐDŐK */}
      <section className={`${styles.section} ${styles.lossSection}`}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>Hány ember nézett már meg,<br />aztán hívta inkább a másikat?</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.lossList}>
              {elveszettLista.map((l) => (
                <div key={l} className={styles.lossItem}>
                  <span className={styles.lossX}>✕</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <button type="button" className={styles.ctaPrimary} onClick={scrollToForm}>
                Mutasd meg, hol vesznek el most az érdeklődők →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CSOMAGOK */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>Válassz szintet. Ne káoszt.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.csomagGrid}>
              {csomagok.map((c) => (
                <div key={c.id} className={`${styles.csomagCard} ${c.kiemelt ? styles.csomagCardKiemelt : ''}`}>
                  {c.kiemelt && <span className={styles.csomagBadge}>Legnépszerűbb</span>}
                  <h3>{c.nev}</h3>
                  <span className={styles.csomagAlcim}>{c.alcim}</span>
                  <p className={styles.csomagAr}>{c.ar}</p>
                  <span className={styles.csomagSetup}>{c.setup}</span>
                  <p className={styles.csomagKinek}><strong>Kinek:</strong> {c.kinek}</p>
                  <p className={styles.csomagIgeret}>{c.igeret}</p>
                  <button type="button" className={styles.csomagBtn} onClick={scrollToForm}>
                    Ezt kérem →
                  </button>
                </div>
              ))}
            </div>
            <p className={styles.csomagNote}>A hirdetési költés nincs benne a havi díjban.</p>
          </Reveal>
        </div>
      </section>

      {/* FACEBOOK VS RENDSZER */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>A Facebook oldal nem ügyfélszerző rendszer.</h2>
            <p className={styles.sectionSub}>
              Egy Facebook oldal lehet hasznos, de nem helyettesít egy profi ajánlatkérő oldalt,
              Google megjelenést, hirdetési útvonalat és leadkezelést. Ha csak posztolsz néha,
              az nem rendszer. Az csak reménykedés.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.fbVsGrid}>
              <div className={styles.fbCard}>
                <h3>Facebook oldal</h3>
                <ul className={styles.vsListBad}>
                  {facebookVsRendszer.facebook.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <div className={`${styles.fbCard} ${styles.vsCardGood}`}>
                <h3>Ügyfélszerző rendszer</h3>
                <ul className={styles.vsListGood}>
                  {facebookVsRendszer.rendszer.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIZONYÍTÉK / DEMÓ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.h2}>Nem ígérgetünk. Megmutatjuk.</h2>
            <p className={styles.sectionSub}>
              A cél nem az, hogy szép prezentációt kapj. Hanem hogy végre lásd, hol vesztesz
              érdeklődőket, és mit kell kijavítani.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.proofGrid}>
              {[
                'Előtte–utána Google Cégprofil példa',
                'Gyenge weboldal vs új landing oldal',
                'Minta ajánlatkérő folyamat',
                'Minta lead táblázat',
                'Minta havi riport',
                'Hirdetéskreatív példák',
              ].map((p) => (
                <div key={p} className={styles.proofCard}>{p}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FORM */}
      <section ref={formRef} className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.formCard}>
              {sent ? (
                <div className={styles.successWrap}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Megkaptuk a kérésed</h3>
                  <p>24 órán belül felvesszük veled a kapcsolatot az átnézéssel.</p>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Nézzük meg, mit lát most rólad egy érdeklődő.</h2>
                  <p className={styles.formLead}>
                    Kérj egy rövid online megjelenés átnézést. Megmutatjuk, hogyan néz ki most a
                    vállalkozásod Google-ben, weben és mobilon, és hol lehetne több ajánlatkérést
                    kihozni belőle.
                  </p>
                  <input
                    type="text" name="nezor_hp_field" value={website} onChange={(e) => setWebsite(e.target.value)}
                    className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true"
                  />
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label>Teljes név *</label>
                      <input type="text" placeholder="Pl. Kovács László" value={nev} onChange={(e) => setNev(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Telefonszám *</label>
                      <input type="tel" placeholder="+36 30 123 4567" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>E-mail-cím *</label>
                      <input type="email" placeholder="te@example.hu" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Milyen vállalkozásod van? *</label>
                      <select value={szakma} onChange={(e) => setSzakma(e.target.value)} className={styles.select}>
                        <option value="">Válassz...</option>
                        {szakmak.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Vállalkozás neve</label>
                      <input type="text" placeholder="Pl. Kovács Tetőfedés" value={cegnev} onChange={(e) => setCegnev(e.target.value)} />
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label>Megjegyzés (opcionális)</label>
                      <textarea
                        placeholder="Bármi, amit fontos tudnunk."
                        value={megjegyzes}
                        onChange={(e) => setMegjegyzes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  {error && <p className={styles.errorText}>{error}</p>}
                  <button className={styles.formSubmit} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Küldés...' : 'Kérem az átnézést →'}
                  </button>
                  <p className={styles.formFoot}>
                    Nem kell azonnal döntened. Először csak megmutatjuk, hol folyik el most a bizalom.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ZÁRÓ MONDAT */}
      <section className={styles.closing}>
        <Reveal>
          <p className={styles.closingFinal}>
            „Az ügyfél nem akkor dönt rólad, amikor felhív.<br />
            Hanem amikor először meglát online.”
          </p>
        </Reveal>
      </section>
    </main>
  );
}
