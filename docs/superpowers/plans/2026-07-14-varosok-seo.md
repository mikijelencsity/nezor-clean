# Városonkénti SEO landing oldalak Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Programmatic SEO oldalak felépítése: `/varosok` index + 4 szolgáltatás (`weboldal-keszites`, `webshop-keszites`, `facebook-hirdetes`, `google-hirdetes`) × 35 magyar város dinamikus route-ja, a jelenlegi sötét dizájnrendszerhez illesztve.

**Architecture:** Statikus adat (`lib/cities.ts`, `lib/cityContent.ts`) + egy megosztott `CityServicePage` komponens, amit 4 dinamikus Next.js route rendereli más `service` prop-pal (`generateStaticParams` minden városra). `/varosok` index oldal linkel be minden kombinációra. `app/sitemap.ts` és `NavDrawer` bővül az új URL-ekkel.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules (nincs Tailwind ebben a projektben), nincs test-runner — a build (`npm run build`) a verifikációs lépés minden taskhoz.

---

## Task 1: Város adatréteg (`lib/cities.ts`)

**Files:**
- Create: `lib/cities.ts`

- [ ] **Step 1: Hozd létre a fájlt a teljes város-listával**

```typescript
// lib/cities.ts
export interface City {
  slug: string
  name: string
  inCity: string      // "Kecskeméten" — hol?
  adjective: string   // "kecskeméti" — milyen?
  county: string
  isLocal: boolean    // Bács-Kiskun megye
}

export const cities: City[] = [
  // Bács-Kiskun megye
  { slug: 'kecskemet',        name: 'Kecskemét',        inCity: 'Kecskeméten',       adjective: 'kecskeméti',       county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'baja',             name: 'Baja',              inCity: 'Baján',             adjective: 'bajai',            county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kalocsa',          name: 'Kalocsa',           inCity: 'Kalocsán',          adjective: 'kalocsai',         county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kiskunfelegyhaza', name: 'Kiskunfélegyháza',  inCity: 'Kiskunfélegyházán', adjective: 'kiskunfélegyházi', county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kiskunhalas',      name: 'Kiskunhalas',       inCity: 'Kiskunhalason',     adjective: 'kiskunhalasi',     county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kiskunmajs',       name: 'Kiskunmajsa',       inCity: 'Kiskunmajsán',      adjective: 'kiskunmajsai',     county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kiskoros',         name: 'Kiskőrös',          inCity: 'Kiskőrösön',        adjective: 'kiskőrösi',        county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'kunszentmiklos',   name: 'Kunszentmiklós',    inCity: 'Kunszentmiklóson',  adjective: 'kunszentmiklósi',  county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'tiszakecske',      name: 'Tiszakécske',       inCity: 'Tiszakécskén',      adjective: 'tiszakécskei',     county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'lajosmizse',       name: 'Lajosmizse',        inCity: 'Lajosmizséen',      adjective: 'lajosmizsiei',     county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'dunavecse',        name: 'Dunavecse',         inCity: 'Dunavecséen',       adjective: 'dunavecsei',       county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'soltvadkert',      name: 'Soltvadkert',       inCity: 'Soltvadkerten',     adjective: 'soltvadkerti',     county: 'Bács-Kiskun',  isLocal: true },
  { slug: 'janoshalma',       name: 'Jánoshalma',        inCity: 'Jánoshalman',       adjective: 'jánoshalmai',      county: 'Bács-Kiskun',  isLocal: true },
  // Top magyar városok
  { slug: 'budapest',         name: 'Budapest',          inCity: 'Budapesten',        adjective: 'budapesti',        county: 'Budapest',     isLocal: false },
  { slug: 'debrecen',         name: 'Debrecen',          inCity: 'Debrecenben',       adjective: 'debreceni',        county: 'Hajdú-Bihar',  isLocal: false },
  { slug: 'miskolc',          name: 'Miskolc',           inCity: 'Miskolcon',         adjective: 'miskolci',         county: 'Borsod-Abaúj', isLocal: false },
  { slug: 'pecs',             name: 'Pécs',              inCity: 'Pécsett',           adjective: 'pécsi',            county: 'Baranya',      isLocal: false },
  { slug: 'gyor',             name: 'Győr',              inCity: 'Győrben',           adjective: 'győri',            county: 'Győr-Moson',   isLocal: false },
  { slug: 'nyiregyhaza',      name: 'Nyíregyháza',       inCity: 'Nyíregyházán',      adjective: 'nyíregyházi',      county: 'Szabolcs',     isLocal: false },
  { slug: 'szeged',           name: 'Szeged',            inCity: 'Szegeden',          adjective: 'szegedi',          county: 'Csongrád',     isLocal: false },
  { slug: 'szekesfehervar',   name: 'Székesfehérvár',    inCity: 'Székesfehérváron',  adjective: 'székesfehérvári',  county: 'Fejér',        isLocal: false },
  { slug: 'szombathely',      name: 'Szombathely',       inCity: 'Szombathelyen',     adjective: 'szombathelyi',     county: 'Vas',          isLocal: false },
  { slug: 'szolnok',          name: 'Szolnok',           inCity: 'Szolnokon',         adjective: 'szolnoki',         county: 'Jász-Nagykun', isLocal: false },
  { slug: 'eger',             name: 'Eger',              inCity: 'Egerben',           adjective: 'egri',             county: 'Heves',        isLocal: false },
  { slug: 'veszprem',         name: 'Veszprém',          inCity: 'Veszprémben',       adjective: 'veszprémi',        county: 'Veszprém',     isLocal: false },
  { slug: 'zalaegerszeg',     name: 'Zalaegerszeg',      inCity: 'Zalaegerszegen',    adjective: 'zalaegerszegi',    county: 'Zala',         isLocal: false },
  { slug: 'kaposvar',         name: 'Kaposvár',          inCity: 'Kaposváron',        adjective: 'kaposvári',        county: 'Somogy',       isLocal: false },
  { slug: 'sopron',           name: 'Sopron',            inCity: 'Sopronban',         adjective: 'soproni',          county: 'Győr-Moson',   isLocal: false },
  { slug: 'erd',              name: 'Érd',               inCity: 'Érden',             adjective: 'érdi',             county: 'Pest',         isLocal: false },
  { slug: 'tatabanya',        name: 'Tatabánya',         inCity: 'Tatabányán',        adjective: 'tatabányai',       county: 'Komárom',      isLocal: false },
  { slug: 'dunaujvaros',      name: 'Dunaújváros',       inCity: 'Dunaújvárosban',    adjective: 'dunaújvárosi',     county: 'Fejér',        isLocal: false },
  { slug: 'esztergom',        name: 'Esztergom',         inCity: 'Esztergomban',      adjective: 'esztergomi',       county: 'Komárom',      isLocal: false },
  { slug: 'szekszard',        name: 'Szekszárd',         inCity: 'Szekszárdon',       adjective: 'szekszárdi',       county: 'Tolna',        isLocal: false },
  { slug: 'cegled',           name: 'Cegléd',            inCity: 'Cegléden',          adjective: 'ceglédi',          county: 'Pest',         isLocal: false },
  { slug: 'hodmezovasarhely', name: 'Hódmezővásárhely',  inCity: 'Hódmezővásárhelyen',adjective: 'hódmezővásárhelyi',county: 'Csongrád',     isLocal: false },
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug)
}

export const localCities = cities.filter(c => c.isLocal)
export const nationalCities = cities.filter(c => !c.isLocal)
```

- [ ] **Step 2: Típusellenőrzés**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: nincs hiba a `lib/cities.ts`-re hivatkozva (a fájlt még semmi nem importálja, de szintaktikailag validnak kell lennie)

- [ ] **Step 3: Commit**

```bash
git add lib/cities.ts
git commit -m "feat: varos adatreteg (35 varos) a programmatic SEO oldalakhoz"
```

---

## Task 2: Szolgáltatás-tartalom réteg (`lib/cityContent.ts`)

**Files:**
- Create: `lib/cityContent.ts`

- [ ] **Step 1: Hozd létre a fájlt a `pick()` selectorral és mind a 4 szolgáltatás szövegvariációival**

```typescript
// lib/cityContent.ts
import { City } from './cities'

// Deterministic variation selector — minden városhoz más kombináció
export function pick<T>(arr: T[], city: City, offset = 0): T {
  const index = (city.slug.charCodeAt(0) + city.slug.length + offset) % arr.length
  return arr[index]
}

// ─── WEBOLDAL TARTALOM ───────────────────────────────────────────────

export const weboldalIntro = [
  (c: City) => `Ha ${c.adjective} vállalkozásodnak nincs még weboldala, vagy a meglévő elavult, most itt az idő váltani. A NEZOR csapata ${c.inCity} és egész Magyarországon készít modern, gyors és keresőbarát weboldalakat — olyan oldalakat, amelyek valódi érdeklődőket hoznak, nem csak jól néznek ki. Minden projektünket az egyedi igények alapján tervezzük: felmérjük a célközönséget, az iparágat és a versenytársakat, majd egy olyan weboldalt építünk, amely kiemelkedik a ${c.adjective} piacon.`,
  (c: City) => `${c.name} vállalkozói egyre jobban felismerik: a digitális jelenlét ma már nem luxus, hanem alapkövetelmény. Ha valaki ${c.inCity} keres szolgáltatókat vagy termékeket, először Google-on néz utána. Ha nincs weboldalad, vagy az elavult, a potenciális ügyfelek egyszerűen a versenytársadhoz mennek. A NEZOR csapata segít ebben: gyors, mobilbarát és SEO-optimalizált weboldalakat készítünk, amelyek ${c.inCity} és az egész országban megtalálhatók a keresőkben.`,
  (c: City) => `Weboldal nélkül ma már szinte láthatatlan egy vállalkozás — különösen ${c.inCity}, ahol a digitális verseny évről évre erősödik. A NEZOR digitális ügynökség ${c.adjective} és országos ügyfeleknek egyaránt készít professzionális weboldalakat, amelyek nemcsak szépek, hanem eredményeket is hoznak. Modern technológiával, gondosan megtervezett UX-szel és teljes SEO-optimalizálással dolgozunk, hogy a te ${c.adjective} weboldalad a Google első oldalán legyen.`,
  (c: City) => `A ${c.adjective} piac folyamatosan fejlődik — és azok a vállalkozások maradnak versenyelőnyben, amelyek időben lépnek az online térbe. A NEZOR csapata ${c.inCity} is teljes körű weboldal-fejlesztési szolgáltatást nyújt: az első konzultációtól a kész oldal átadásáig minden lépést átláthatóan és határidőre teljesítünk. Weboldalainkat Google PageSpeed tesztjén 90+ pontszámra optimalizáljuk.`,
]

export const weboldalWhyOnline = [
  (c: City) => `${c.name} üzleti életében a vásárlók több mint 80%-a online keres rá a helyi szolgáltatókra, mielőtt dönt. Egy profi weboldal nem csak láthatóságot ad — bizalmat is épít. Ha valaki rátalál a vállalkozásodra a neten, és egy modern, informatív oldalt lát, sokkal nagyobb valószínűséggel veszi fel veled a kapcsolatot, mintha csak egy névjegykártyát kapna. A NEZOR weboldalak ezt a bizalmat már az első másodpercben megteremtik.`,
  (c: City) => `${c.inCity} a helyi keresések száma évente több tízezer "weboldal készítés", "asztalos ${c.inCity}", "fodrász ${c.inCity}" típusú kifejezéssel bővül. Azok a vállalkozások, amelyeknek van SEO-ra optimalizált weboldaluk, ezekből a keresésekből ingyenes, folyamatos érdeklődőket kapnak. Ez a legjobb hosszú távú befektetés: egy profi weboldal évekig dolgozik érted, hozza az ügyfeleket — hirdető büdzsé nélkül.`,
  (c: City) => `Ma már az emberek telefonon keresnek mindent — és ha az oldal lassan tölt be vagy mobilon nehéz kezelni, azonnal visszanavigálnak. ${c.inCity} is igaz: a mobilos keresések dominálnak. A NEZOR minden weboldalt "mobile-first" elvvel készít — először a telefon felületet tervezi meg, majd ebből építi fel a desktopos verziót. Így garantált, hogy ${c.adjective} ügyfeleid minden eszközön tökéletes élményt kapnak.`,
  (c: City) => `Egy jó weboldal ${c.inCity} 24 órán át, heti 7 napban "dolgozik" helyetted: bemutatja a szolgáltatásaidat, válaszol a leggyakoribb kérdésekre, és érdeklődőket gyűjt — akkor is, amikor te nem érsz rá. A NEZOR weboldalak erre vannak optimalizálva: stratégiailag elhelyezett CTA gombok, egyértelmű üzenetek és gyors elérhetőségek biztosítják, hogy a látogató valóban felvegye veled a kapcsolatot.`,
]

export const weboldalTypes = [
  (c: City) => `Bemutatkozó weboldal ${c.inCity}: ideális önálló vállalkozóknak, kisebb cégeknek, akik szeretnének professzionális online jelenlétet. 1-5 aloldalas, informatív struktúra, kapcsolatfelvételi form és Google Térkép integrációval.\n\nCéges weboldal: közepes és nagyobb vállalkozásoknak, több szolgáltatással és aloldallal. Blog modul, GYIK, referencia galéria és teljes SEO optimalizálás.\n\nLanding page: egyetlen termékre vagy szolgáltatásra fókuszált, konverzióra optimalizált oldal — hirdetési kampányokhoz ideális.\n\nPortfólió weboldal: kreatív szakembereknek, fotósoknak, designereknek, akik vizuálisan szeretnék bemutatni munkáikat.`,
  (c: City) => `${c.inCity} a legkeresettebb weboldal típusok: bemutatkozó oldalak helyi iparosoknak és szakembereknek, szolgáltatói weboldalak fodrászoknak, kozmetikusoknak, ügyvédeknek — és céges weboldalak nagyobb vállalkozásoknak. A NEZOR mindegyik típust teljeskörűen elkészíti: az első designtervtől a kész oldal átadásáig. Különösen erősek vagyunk a helyi SEO-ban: ${c.adjective} keresési kifejezésekre tudunk rangsorolni.`,
  (c: City) => `Minden vállalkozásnak más típusú weboldal illik. Kis vállalkozás ${c.inCity}: egy letisztult, 3-5 oldalas bemutatkozó weboldal a legjobb választás — gyors, olcsó, mégis professzionális. Szakember vagy önálló vállalkozó: portfólió oldal saját arculattal. Növekvő cég: teljes céges weboldal blog modullal, ami segít a Google rangsorolásban. A NEZOR minden méretű projektben jártas — és mindig az igényedre szabott megoldást javasolja.`,
]

export const weboldalProcess = [
  (c: City) => `Az együttműködés egy ingyenes konzultációval indul, ahol megismerjük a vállalkozásodat, céljaidat és a ${c.adjective} piac sajátosságait. Ezután elkészítjük a design tervet — amelyet te jóváhagysz, mielőtt nekiállnánk a fejlesztésnek. A kész oldalt minden eszközön teszteljük, majd élesítjük.`,
  (c: City) => `Munkánk négy fázisból áll. Konzultáció: felmérjük az igényeidet és a ${c.adjective} piacot. Tervezés: elkészítjük a vizuális tervet, amelyet jóváhagysz. Fejlesztés: megépítjük az oldalt, minden eszközön teszteljük. Átadás: betanítjuk a kezelést. Alap weboldalak 1-2 héten belül elkészülnek.`,
  (c: City) => `Nem dolgozunk hónapokig — az alapweboldalak 1-2 hét alatt elkészülnek ${c.inCity} is. A folyamat: először egy részletes briefet töltesz ki, majd mi elkészítjük a designtervet. Ha jóváhagyod, belekezdünk a fejlesztésbe. Átadás előtt minden részletet ellenőrzünk — mobilon, tableten, asztali gépen.`,
]

// ─── WEBSHOP TARTALOM ────────────────────────────────────────────────

export const webshopIntro = [
  (c: City) => `${c.inCity} is egyre több vállalkozó ismeri fel: az online értékesítés nem a jövő, hanem a jelen. Egy jól felépített webshop ${c.inCity} és egész Magyarországon eléri a potenciális vásárlókat — 0-24 órában, heti 7 napban. A NEZOR csapata teljes körű webshop megoldásokat kínál: fizetési integrációval, automatikus rendeléskezeléssel és mobilbarát designnal.`,
  (c: City) => `Ha ${c.inCity} webshopot szeretnél indítani, a NEZOR a legjobb választás: teljes körű e-kereskedelmi fejlesztéssel, fizetési rendszer integrációval és folyamatos supporttal dolgozunk. A webshopod ${c.adjective} és országos vásárlókat egyaránt elér — és amíg te alszol, a rendelések automatikusan beérkeznek.`,
  (c: City) => `Az online kiskereskedelem ${c.inCity} is robbanásszerűen növekszik — és azok a vállalkozások, amelyek most lépnek be, komoly előnyt szereznek. A NEZOR webshop megoldásai nem csupán egy "kosár és fizetés" funkciót adnak: teljes értékesítési ökoszisztémát építünk — raktárkezeléssel, automatikus számlázással, szállítási integrációval és SEO-optimalizálással.`,
  (c: City) => `Miért fizetsz bérleti díjat egy fizikai üzlethelyiségért ${c.inCity}, ha egy webshoppal egész Magyarország a piacod? A NEZOR professzionális webshopokat épít — biztonságos fizetéssel, futárszolgálati integrációval, automatikus számlázással. Az első rendeléstől a kiszállításig minden folyamat automatizált.`,
]

export const webshopWhyNow = [
  (c: City) => `A magyarok online vásárlási szokásai drámaian megváltoztak az elmúlt évek során. ${c.inCity} és környékén is egyre többen rendelnek online — ruhát, élelmiszert, háztartási cikket, de akár helyi kézműves termékeket is. Ha nincs webshopod, ezeket a vásárlókat elveszíted. A jó hír: egy profi webshoppal nemcsak ${c.adjective} vásárlókat érsz el, hanem az egész országot.`,
  (c: City) => `${c.inCity} a legjobb idő webshopot indítani az volt, amikor mindenki más is elindult — a második legjobb idő most van. Az online értékesítés nem merül ki a "rendelés felvételben": egy jól felépített webshop SEO-forgalmat hoz, email listát épít, és upsell lehetőségeket kínál. A NEZOR minden webshopot konverzióra optimalizál.`,
  (c: City) => `Egy fizikai üzlet naponta 8-10 órát van nyitva, és csak ${c.inCity} érhető el. Egy webshop 24/7 nyitva van, és egész Magyarország a piacod. A NEZOR webshopjai mobilra optimalizáltak — a rendelések több mint 60%-a telefonról érkezik. Mobilbarát design, gyors betöltés és egyszerű checkout folyamat garantálja, hogy a ${c.adjective} vásárlók ne hagyják félbe a rendelést.`,
]

export const webshopFeatures = [
  (c: City) => `A NEZOR webshop megoldások tartalmazzák: biztonságos online fizetési integrációt, futárszolgálati (GLS, DPD, Magyar Posta) kapcsolódást, automatikus raktárkezelést és értesítőket, automatikus számlázási integrációt, kupon és akció kezelőt, valamint teljes mobil optimalizálást. ${c.inCity} és egész Magyarországon értékesíthetsz.`,
  (c: City) => `Minden ${c.adjective} webshopunkhoz biztosítjuk: egykattintásos fizetési megoldásokat, automatikus rendelés-visszaigazolást emailben, raktárkészlet-kezelést és alacsony készlet értesítőket, integrált számlázást, és mobilra optimalizált termékoldalakat. ${c.inCity} vásárlóid zökkenőmentes élményt kapnak — tőled pedig csak a csomagolás marad.`,
]

export const webshopProcess = [
  (c: City) => `A webshop fejlesztés 4 fázisból áll. Konzultáció ${c.inCity}: felmérjük a termékeid, szállítási igényeid és célközönségedet. Tervezés: elkészítjük a webshop vizuális tervét. Fejlesztés: felépítjük a webshopot, integráljuk a fizetési és szállítási rendszereket, teszteljük. Átadás és betanítás: élesítjük, betanítunk a termékfeltöltésre és rendeléskezelésre.`,
  (c: City) => `${c.inCity} webshop indítása egyszerűbb mint gondolnád. Első lépés: ingyenes konzultáció, ahol pontosan meghatározzuk az igényeidet. Második: design és funkciótérkép jóváhagyása. Harmadik: fejlesztés és tesztelés. Negyedik: élesítés és betanítás. Az egész folyamat pár hét — és utána te kezeled a webshopod tőlünk kapott segítséggel.`,
]

// ─── FACEBOOK TARTALOM ───────────────────────────────────────────────

export const facebookIntro = [
  (c: City) => `Facebook és Instagram hirdetések ${c.inCity} — a NEZOR csapata célzott Meta kampányokat kezel, amelyek pontosan a te potenciális ügyfeleidet érik el. Nemcsak beállítjuk a hirdetéseket: naponta monitorozzuk, optimalizáljuk és finomítjuk az eredmények alapján. Havi részletes riportot küldünk, így mindig tudod, mire megy a büdzsé.`,
  (c: City) => `Ha ${c.inCity} vállalkozásodnak gyorsan kellene új ügyfeleket szerezni, a Facebook és Instagram hirdetés a leghatékonyabb módszer. A NEZOR csapata különböző iparágakban szerzett tapasztalattal optimalizálja a kampányaidat — pontos célközönség-beállítással, vonzó kreatívokkal és napi optimalizálással.`,
  (c: City) => `${c.name} és Magyarország más városaiban a Meta hirdetési rendszer az egyik leghatékonyabb ügyfélszerzési eszköz kis- és középvállalkozásoknak. A NEZOR professzionális hirdetéskezelése ${c.inCity} is elérhető: célközönség-meghatározástól a kampány futtatásán át a havi riportig mindent elvégzünk.`,
  (c: City) => `Facebook hirdetés ${c.inCity} — ez az egyik legtöbb ${c.adjective} kis- és középvállalkozás által keresett digitális marketing szolgáltatás. A NEZOR csapata tapasztalt hirdetéskezelőkből áll: ismerjük a Meta algoritmusát, a hatékony kreatívok titkait és a ${c.adjective} célközönség elérésének legjobb módszereit.`,
]

export const facebookWhyMeta = [
  (c: City) => `Miért érdemes Facebook hirdetést indítani ${c.inCity}? Mert több mint 3,8 millió magyar Facebook-felhasználóból pontosan azokat éred el, akik a te célközönséged — életkor, helyszín, érdeklődési kör és viselkedés alapján. ${c.inCity} és 50 km-es körzetében akár napi ezres nagyságrendű célzott felhasználót is elérhet a hirdetésed.`,
  (c: City) => `A Meta hirdetési rendszer (Facebook + Instagram) ${c.inCity} is az egyik legjobb ROI-val bíró marketing eszköz. Miért? Mert a célzás pontossága páratlan: meghatározhatod, hogy csak ${c.adjective} 25-45 éves, vállalkozás iránt érdeklődő emberek lássák a hirdetésedet.`,
  (c: City) => `Az Instagram és Facebook együttes használata ${c.inCity} lehetővé teszi, hogy a potenciális ügyfeleidet ott érd el, ahol a legtöbb időt töltik. A NEZOR kampányai mindkét platformon futnak — optimalizálva az adott célközönségre és formátumra (feed, story, reels).`,
]

export const facebookTypes = [
  (c: City) => `Márkaismertségi kampányok: ${c.inCity} vállalkozásod nevét és szolgáltatásait mutatjuk be a célközönségnek — ideális induló vállalkozásoknak.\n\nLead generáló kampányok: közvetlenül érdeklődőket gyűjtünk — nevet, emailt, telefonszámot.\n\nWeboldal forgalom kampányok: hirdetéssel terelünk látogatókat a weboldaladra.\n\nRemarketing kampányok: az oldaladat már meglátogató felhasználókat szólítjuk meg újra — ezek a legjobb konverziós arányú kampányok.`,
  (c: City) => `${c.inCity} a legeredményesebb kampánytípusok: helyi célzású forgalom kampányok (pl. "étterem ${c.inCity}" keresők elérése), lead form kampányok (érdeklődők adatainak közvetlen gyűjtése a Facebookon belül), és retargeting kampányok (akik már jártak a weboldaladon). A NEZOR az iparágad és céljaid alapján ajánlja a legjobb kombinációt.`,
]

export const facebookProcess = [
  (c: City) => `Az együttműködés egy ingyenes konzultációval indul, ahol megismerjük a vállalkozásodat, célközönségedet és hirdetési céljaidat ${c.inCity}. Ezután elkészítjük a kampánystratégiát, a szövegeket és vizuálokat, majd elindítjuk a hirdetéseket. Az első héttől naponta optimalizálunk, havi részletes riportban összefoglaljuk az eredményeket.`,
  (c: City) => `Első hét: célközönség meghatározás és kampánystratégia ${c.inCity}. Második hét: kreatívok és szövegek elkészítése, kampány indítás. Harmadik-negyedik hét: optimalizálás az első adatok alapján. Hónap vége: részletes riport — elérés, kattintások, leadek, konverziók, büdzsé felhasználás.`,
]

// ─── GOOGLE ADS TARTALOM ─────────────────────────────────────────────

export const googleIntro = [
  (c: City) => `Google Ads hirdetés ${c.inCity} — a NEZOR csapata olyan keresési kampányokat épít, amelyek pontosan akkor jelennek meg, amikor a ${c.adjective} ügyfeleid rákeresnek a szolgáltatásodra vagy termékedre. Nem csak beállítjuk a fiókot: folyamatosan optimalizáljuk a kulcsszavakat, a hirdetésszövegeket és a büdzsét, hogy minden forint megtérüljön. Havi riportot küldünk, hogy lásd, honnan jönnek az érdeklődők.`,
  (c: City) => `Amikor valaki ${c.inCity} rákeres a Google-on egy szolgáltatásra, a fizetett hirdetések állnak a lista tetején — még a szerves találatok előtt. A NEZOR Google Ads kezelése pontosan ezt a helyet szerzi meg neked: releváns kulcsszavakra, ${c.adjective} célzással, átlátható büdzsé mellett.`,
  (c: City) => `${c.name} és környékén a Google keresési hirdetések az egyik leggyorsabb módja annak, hogy vásárlásra kész ügyfeleket érj el — nem "talán érdekli", hanem "most keresi". A NEZOR Google Ads szolgáltatása ${c.inCity} is teljes körű: kulcsszókutatás, hirdetésszövegek, landing oldal összehangolás és folyamatos optimalizálás.`,
  (c: City) => `Google hirdetés ${c.inCity} — a legtöbb ${c.adjective} vállalkozás számára ez az egyetlen csatorna, ahol a hirdetés pontosan azoknak jelenik meg, akik éppen keresik a szolgáltatásukat. A NEZOR csapata ismeri a Google Ads algoritmusát, a minőségi mutató (Quality Score) optimalizálását és a helyi célzás beállításait.`,
]

export const googleWhyGoogle = [
  (c: City) => `Miért érdemes Google Ads kampányt indítani ${c.inCity}? Mert a keresők már döntési szándékkal érkeznek — nem böngésznek, hanem konkrét megoldást keresnek. Egy jól beállított kampány ${c.adjective} keresésekre azonnal, az első oldalon jelenik meg, elkerülve a hónapokig tartó organikus SEO-építést.`,
  (c: City) => `A Google Ads ${c.inCity} is azonnali eredményt hoz: a kampány elindítása után pár órán belül már látszanak az első kattintások és érdeklődők, szemben az organikus rangsorolással, ami hónapokat vehet igénybe. A NEZOR pontos kulcsszó- és negatív kulcsszó-listákkal biztosítja, hogy csak releváns keresésekre költs.`,
  (c: City) => `${c.inCity} és környékén a helyi célzású Google Ads kampányok különösen hatékonyak: beállítható, hogy a hirdetésed csak egy adott sugarú körben jelenjen meg, így nem fizetsz olyan kattintásokért, amik földrajzilag irrelevánsak. A NEZOR minden kampányt konverziókövetéssel indít, hogy pontosan lásd, mi hozza a megtérülést.`,
]

export const googleTypes = [
  (c: City) => `Keresési hálózati kampányok: szöveges hirdetések ${c.adjective} keresési kifejezésekre, közvetlenül a Google találati oldalán.\n\nDisplay kampányok: bannerek és vizuális hirdetések partnerhálózati oldalakon, márkaismertség építéséhez.\n\nRemarketing kampányok: a weboldaladat már meglátogató felhasználók újbóli elérése — magas konverziós aránnyal.\n\nGoogle Shopping kampányok: webshopoknak, termékkép és ár közvetlenül a keresési találatok között.`,
  (c: City) => `${c.inCity} a legeredményesebb Google Ads formátumok: helyi célzású keresési kampányok konkrét szolgáltatás-kulcsszavakra, hívás-hirdetések (Call Ads) közvetlen telefonhívás gombbal, és Performance Max kampányok, amik automatikusan optimalizálnak a Google összes felülete között. A NEZOR az iparágad alapján ajánlja a legjobb kombinációt.`,
]

export const googleProcess = [
  (c: City) => `Az együttműködés egy ingyenes konzultációval indul, ahol felmérjük a szolgáltatásaidat, célközönségedet és a ${c.adjective} piac keresési szokásait. Ezután elkészítjük a kulcsszólistát és a hirdetésszövegeket, beállítjuk a konverziókövetést, majd elindítjuk a kampányt. Az első két hétben napi szinten optimalizálunk, utána havi riportban összegezzük az eredményeket.`,
  (c: City) => `Első lépés: kulcsszókutatás és versenytárs-elemzés ${c.inCity}. Második: hirdetésszövegek és célzási beállítások elkészítése. Harmadik: kampány indítás és konverziókövetés beállítása. Negyedik: folyamatos optimalizálás a kattintási és konverziós adatok alapján. Havi riportban látod, mennyibe kerül egy érdeklődő és honnan érkezik.`,
]
```

- [ ] **Step 2: Típusellenőrzés**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: nincs hiba

- [ ] **Step 3: Commit**

```bash
git add lib/cityContent.ts
git commit -m "feat: varosonkenti szolgaltatas-tartalom (weboldal, webshop, facebook, google ads)"
```

---

## Task 3: FAQ accordion komponens

**Files:**
- Create: `components/city/FAQAccordion.tsx`
- Create: `components/city/FAQAccordion.module.css`

- [ ] **Step 1: Hozd létre a komponenst**

```tsx
// components/city/FAQAccordion.tsx
'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span>{item.question}</span>
              <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
            </button>
            {open && <p className={styles.answer}>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
```

```css
/* components/city/FAQAccordion.module.css */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  overflow: hidden;
}

.question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: none;
  border: none;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.icon {
  flex: none;
  font-size: 20px;
  font-weight: 900;
  color: #00e5ff;
  transition: transform 0.2s ease;
}

.iconOpen {
  transform: rotate(45deg);
}

.answer {
  padding: 0 20px 20px;
  color: #a5b5c9;
  line-height: 1.65;
  font-size: 14px;
}
```

- [ ] **Step 2: Build ellenőrzés**

Run: `npm run build`
Expected: sikeres build (a komponenst még semmi nem importálja, de a TS/CSS syntax-nak validnak kell lennie — ha a build panaszkodik unused file miatt, az rendben van, mert Next.js nem hibáztat nem importált fájlokért)

- [ ] **Step 3: Commit**

```bash
git add components/city/FAQAccordion.tsx components/city/FAQAccordion.module.css
git commit -m "feat: FAQAccordion komponens a varos oldalakhoz"
```

---

## Task 4: `CityServicePage` megosztott komponens

**Files:**
- Create: `components/city/CityServicePage.tsx`
- Create: `components/city/CityServicePage.module.css`

- [ ] **Step 1: Hozd létre a komponenst**

```tsx
// components/city/CityServicePage.tsx
import Link from 'next/link';
import { NavDrawer } from '@/components/ui/NavDrawer';
import { GridBg } from '@/components/ui/GridBg';
import { GlowBlob } from '@/components/ui/GlowBlob';
import { City, cities } from '@/lib/cities';
import { FAQAccordion, FAQItem } from './FAQAccordion';
import {
  pick,
  weboldalIntro, weboldalWhyOnline, weboldalTypes, weboldalProcess,
  webshopIntro, webshopWhyNow, webshopFeatures, webshopProcess,
  facebookIntro, facebookWhyMeta, facebookTypes, facebookProcess,
  googleIntro, googleWhyGoogle, googleTypes, googleProcess,
} from '@/lib/cityContent';
import styles from './CityServicePage.module.css';

export type ServiceType = 'weboldal' | 'webshop' | 'facebook' | 'google';

interface ServiceConfig {
  title: string;
  slug: string;
  badge: string;
  heroDesc: (c: City) => string;
  features: string[];
  faq: (c: City) => FAQItem[];
  cta: string;
  getIntro: (c: City) => string;
  getWhyOnline: (c: City) => string;
  getTypes: (c: City) => string;
  getProcess: (c: City) => string;
  whyOnlineTitle: (c: City) => string;
  typesTitle: (c: City) => string;
  processTitle: string;
}

const serviceConfig: Record<ServiceType, ServiceConfig> = {
  weboldal: {
    title: 'Weboldal készítés',
    slug: 'weboldal-keszites',
    badge: 'Weboldal készítés',
    heroDesc: (c) => `Professzionális weboldal készítés ${c.inCity} kis- és középvállalkozásoknak. Gyors, mobilbarát, SEO-optimalizált weboldalak — helyi tapasztalattal, megfizethető áron.`,
    features: [
      'Egyedi, mobilbarát design',
      'Google-barát SEO felépítés',
      'Gyors betöltési idő',
      'Kapcsolatfelvételi form és térkép',
      'SSL tanúsítvány és biztonság',
      'Support az átadás után',
    ],
    faq: (c) => [
      { question: `Mennyibe kerül egy weboldal ${c.inCity}?`, answer: `${c.inCity} a weboldal ára a komplexitástól függ. Ingyenes ajánlatkérés után pontos árat adunk, a "Csomagjaink" oldalon látod a kiindulási árszinteket.` },
      { question: `Mennyi idő alatt készül el a weboldal ${c.inCity}?`, answer: `Alap weboldalak 1-2 héten belül elkészülnek. Összetettebb, egyedi oldalak tovább tarthatnak. A határidőt írásban vállaljuk.` },
      { question: `Segítetek a ${c.adjective} vállalkozásom szövegének megírásában?`, answer: `Igen, kérés esetén segítünk a szövegek megírásában is, SEO-barát formában, hogy a ${c.adjective} keresőtalálatok között minél előrébb kerülj.` },
      { question: `Van-e helyi irodájuk ${c.inCity}?`, answer: `Bács-Kiskun megye egész területén és országosan is dolgozunk, ${c.inCity} is szolgáljuk az ügyfeleinket. Az együttműködés online is gördülékenyen zajlik, szükség esetén Zoom-on egyeztetünk.` },
      { question: `Milyen weboldalakat készítetek ${c.inCity}?`, answer: `Bemutatkozó oldalakat, céges weboldalakat, portfólió oldalakat és landing page-eket készítünk. Minden típust ${c.inCity} és egész Magyarországon vállalunk.` },
      { question: `Mi történik az átadás után?`, answer: `Az átadás után is számíthatsz ránk — bármilyen módosítást, javítást elvégzünk, és havidíjas karbantartási csomagot is kínálunk.` },
    ],
    cta: 'Ingyenes weboldal ajánlat',
    getIntro: (c) => pick(weboldalIntro, c, 0)(c),
    getWhyOnline: (c) => pick(weboldalWhyOnline, c, 1)(c),
    getTypes: (c) => pick(weboldalTypes, c, 2)(c),
    getProcess: (c) => pick(weboldalProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért fontos az online jelenlét ${c.inCity}?`,
    typesTitle: (c) => `Weboldal típusok ${c.inCity}`,
    processTitle: 'A folyamat lépései',
  },
  webshop: {
    title: 'Webshop készítés',
    slug: 'webshop-keszites',
    badge: 'Webshop fejlesztés',
    heroDesc: (c) => `Professzionális webshop készítés ${c.inCity} vállalkozásoknak. Online áruház fizetési rendszerrel, rendeléskezelővel és automatikus számlázással — megfizethető áron.`,
    features: [
      'Biztonságos fizetési integráció',
      'Mobilbarát, gyors webshop',
      'Automatikus rendeléskezelő',
      'Raktárkezelés és értesítők',
      'Automatikus számlázás',
      'Futárszolgálati integráció',
    ],
    faq: (c) => [
      { question: `Mennyibe kerül egy webshop ${c.inCity}?`, answer: `${c.inCity} a webshop ára a termékkészlettől és a szükséges funkcióktól függ. Ingyenes konzultáció után pontos árajánlatot adunk.` },
      { question: `Mennyi idő alatt indul el a webshopom ${c.inCity}?`, answer: `Alap webshopok pár héten belül élesbe kerülnek. A folyamat végén betanítást is tartunk.` },
      { question: `Milyen fizetési módokat építetek be?`, answer: `Bankkártyás online fizetést, utánvétet és átutalást — az igényednek megfelelő kombinációt alakítjuk ki.` },
      { question: `${c.name} területén is tudtok segíteni?`, answer: `Igen, ${c.inCity} is teljes körű webshop fejlesztési szolgáltatást nyújtunk.` },
      { question: `Kezeli a rendszer a készletet?`, answer: `Igen, automatikus raktárkezelés, alacsony készlet értesítők és rendelés-visszaigazolások is beépíthetők.` },
      { question: `Hogyan kezeli a rendszer a számlákat?`, answer: `Integrálható automatikus számlázó rendszerekkel — minden rendelésnél automatikusan kiállítja a számlát.` },
    ],
    cta: 'Ingyenes webshop ajánlat',
    getIntro: (c) => pick(webshopIntro, c, 0)(c),
    getWhyOnline: (c) => pick(webshopWhyNow, c, 1)(c),
    getTypes: (c) => pick(webshopFeatures, c, 2)(c),
    getProcess: (c) => pick(webshopProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért indíts webshopot ${c.inCity}?`,
    typesTitle: (c) => `Webshop funkciók ${c.inCity}`,
    processTitle: 'Webshop fejlesztési folyamat',
  },
  facebook: {
    title: 'Facebook hirdetés kezelés',
    slug: 'facebook-hirdetes',
    badge: 'Facebook & Instagram hirdetések',
    heroDesc: (c) => `Professzionális Facebook és Instagram hirdetés kezelés ${c.inCity} vállalkozásoknak. Célzott Meta kampányok, napi optimalizálással és havi riporttal.`,
    features: [
      'Facebook és Instagram kampányok',
      'Pontos célközönség-meghatározás',
      'Napi optimalizálás és monitorozás',
      'Kreatív szövegek és vizuálok',
      'Havi részletes riport',
      'Átlátható büdzsé kezelés',
    ],
    faq: (c) => [
      { question: `Mekkora büdzsével érdemes elkezdeni ${c.inCity}?`, answer: `Kisebb napi büdzséből is érdemi eredmények elérhetők ${c.adjective} helyi célzással. Az optimális büdzsét az iparág határozza meg.` },
      { question: `Mennyi idő alatt látszanak az eredmények?`, answer: `Az első eredmények 1-2 héten belül láthatók. A kampány optimalizálása folyamatos.` },
      { question: `Instagram hirdetéseket is csináltok?`, answer: `Igen, a Meta rendszere Facebook-ot és Instagramot is lefed, mindkettőre optimalizálunk.` },
      { question: `Kapok-e riportot az eredményekről?`, answer: `Igen, minden hónapban részletes riportot küldünk — elérés, kattintások, leadek, konverziók.` },
      { question: `${c.name} területén is vállaltok hirdetés kezelést?`, answer: `Igen, ${c.inCity} is teljes körű Facebook és Instagram hirdetés kezelési szolgáltatást nyújtunk.` },
      { question: `Mi szükséges az induláshoz?`, answer: `Egy Facebook oldal és egy rövid brief az üzletedről. A hirdetési fiókot és a kampányokat mi állítjuk be.` },
    ],
    cta: 'Ingyenes hirdetési ajánlat',
    getIntro: (c) => pick(facebookIntro, c, 0)(c),
    getWhyOnline: (c) => pick(facebookWhyMeta, c, 1)(c),
    getTypes: (c) => pick(facebookTypes, c, 2)(c),
    getProcess: (c) => pick(facebookProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért érdemes Facebook hirdetést indítani ${c.inCity}?`,
    typesTitle: (c) => `Hirdetés típusok ${c.inCity}`,
    processTitle: 'Hogyan dolgozunk?',
  },
  google: {
    title: 'Google hirdetés kezelés',
    slug: 'google-hirdetes',
    badge: 'Google Ads kampányok',
    heroDesc: (c) => `Professzionális Google Ads kezelés ${c.inCity} vállalkozásoknak. Keresési kampányok, amik pontosan akkor jelennek meg, amikor az ügyfeleid rákeresnek.`,
    features: [
      'Keresési hálózati kampányok',
      'Kulcsszókutatás és -optimalizálás',
      'Konverziókövetés beállítása',
      'Helyi célzás beállítása',
      'Havi részletes riport',
      'Átlátható büdzsé kezelés',
    ],
    faq: (c) => [
      { question: `Mekkora büdzsével érdemes elkezdeni ${c.inCity}?`, answer: `Kisebb napi büdzséből is érdemi eredmények elérhetők ${c.adjective} helyi célzással. Az optimális büdzsét az iparág és a kulcsszavak versenyzettsége határozza meg.` },
      { question: `Mennyi idő alatt látszanak az eredmények?`, answer: `A Google Ads azonnali: a kampány indítása után pár órán belül már érkezhetnek kattintások. Az optimalizálás az első hetekben a legintenzívebb.` },
      { question: `Mi a különbség a Facebook és a Google hirdetés között?`, answer: `A Google-on a felhasználó már keres valamit — döntési szándékkal érkezik. A Facebookon inkább felfedezéssel találkozik a hirdetéseddel. A kettő remekül kiegészíti egymást.` },
      { question: `Kapok-e riportot az eredményekről?`, answer: `Igen, minden hónapban részletes riportot küldünk — megjelenések, kattintások, konverziók, kattintásonkénti költség.` },
      { question: `${c.name} területén is vállaltok Google Ads kezelést?`, answer: `Igen, ${c.inCity} is teljes körű Google Ads kezelési szolgáltatást nyújtunk, helyi célzással is.` },
      { question: `Mi szükséges az induláshoz?`, answer: `Egy weboldal, ahova irányíthatjuk a forgalmat, és egy rövid brief az üzletedről. A Google Ads fiókot és a kampányokat mi állítjuk be.` },
    ],
    cta: 'Ingyenes Google Ads ajánlat',
    getIntro: (c) => pick(googleIntro, c, 0)(c),
    getWhyOnline: (c) => pick(googleWhyGoogle, c, 1)(c),
    getTypes: (c) => pick(googleTypes, c, 2)(c),
    getProcess: (c) => pick(googleProcess, c, 3)(c),
    whyOnlineTitle: (c) => `Miért érdemes Google Ads kampányt indítani ${c.inCity}?`,
    typesTitle: (c) => `Kampánytípusok ${c.inCity}`,
    processTitle: 'Hogyan dolgozunk?',
  },
};

function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

interface Props {
  city: City;
  service: ServiceType;
}

export function CityServicePage({ city, service }: Props) {
  const cfg = serviceConfig[service];
  const faqItems = cfg.faq(city);
  const otherCities = cities.filter((c) => c.slug !== city.slug && c.isLocal === city.isLocal).slice(0, 8);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />

      <NavDrawer />

      <section className={styles.hero}>
        <GridBg />
        <GlowBlob color="blue" style={{ top: '10%', right: '-150px' }} />
        <GlowBlob color="yellow" style={{ bottom: '-100px', left: '-100px' }} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>{cfg.badge} — {city.name}</div>
          <h1 className={styles.h1}>
            {cfg.title} <span className={styles.accent}>{city.inCity}</span>
          </h1>
          <p className={styles.heroDesc}>{cfg.heroDesc(city)}</p>
          <div className={styles.heroActions}>
            <a href="/#kapcsolat" className={styles.btnPrimary}>{cfg.cta}</a>
            <Link href="/csomagjaink" className={styles.btnSecondary}>Csomagok megtekintése</Link>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section>
          <h2 className={styles.h2}>{cfg.title} {city.inCity} — NEZOR</h2>
          <p className={styles.paragraph}>{cfg.getIntro(city)}</p>
          <ul className={styles.featureGrid}>
            {cfg.features.map((f) => (
              <li key={f} className={styles.featureItem}>{f}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.whyOnlineTitle(city)}</h2>
          <p className={styles.paragraph}>{cfg.getWhyOnline(city)}</p>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.typesTitle(city)}</h2>
          {cfg.getTypes(city).split('\n\n').map((para, i) => (
            <p key={i} className={styles.paragraph}>{para}</p>
          ))}
        </section>

        <section>
          <h2 className={styles.h2}>Miért a NEZOR {city.inCity}?</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3>Gyors átfutás</h3>
              <p>Alap projektek rövid idő alatt elkészülnek {city.inCity} — nem váratsz hónapokat.</p>
            </div>
            <div className={styles.whyCard}>
              <h3>Kiemelkedő ár-érték</h3>
              <p>Áraink a piaci átlag alatt vannak {city.inCity} — anélkül hogy a minőségen spórolnánk.</p>
            </div>
            <div className={styles.whyCard}>
              <h3>Helyi tapasztalat</h3>
              <p>Ismerjük a {city.adjective} piacot és az itteni vállalkozások igényeit és kihívásait.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.h2}>{cfg.processTitle}</h2>
          <p className={styles.paragraph}>{cfg.getProcess(city)}</p>
        </section>

        <section>
          <h2 className={styles.h2}>Kérdések a {cfg.title.toLowerCase()}ről {city.inCity}</h2>
          <FAQAccordion items={faqItems} />
        </section>

        {otherCities.length > 0 && (
          <section>
            <h2 className={styles.h3Small}>{cfg.title} más városokban is</h2>
            <div className={styles.cityLinks}>
              {otherCities.map((c) => (
                <Link key={c.slug} href={`/${cfg.slug}/${c.slug}`} className={styles.cityLink}>
                  {c.name}
                </Link>
              ))}
              <Link href="/varosok" className={styles.cityLinkPrimary}>Összes város →</Link>
            </div>
          </section>
        )}

        <div className={styles.ctaBox}>
          <h2 className={styles.h2}>Dolgozzunk együtt {city.inCity}!</h2>
          <p className={styles.ctaText}>Ingyenes konzultáció — kötelezettség nélkül. Megmutatjuk, mit tudunk érted csinálni.</p>
          <a href="/#kapcsolat" className={styles.btnPrimary}>{cfg.cta}</a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Hozd létre a CSS modult**

```css
/* components/city/CityServicePage.module.css */
.page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #1a1f3a 0%, #0f1226 60%);
  color: #fff;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 120px 24px 80px;
  text-align: center;
}

.heroInner {
  position: relative;
  z-index: 2;
  max-width: 780px;
  margin: 0 auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 229, 255, 0.12);
  color: #00e5ff;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  margin-bottom: 20px;
}

.h1 {
  font-size: clamp(28px, 4.5vw, 48px);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 20px;
}

.accent {
  color: #0099b8;
}

.heroDesc {
  font-size: 17px;
  line-height: 1.65;
  color: #a5b5c9;
  max-width: 620px;
  margin: 0 auto 32px;
}

.heroActions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.btnPrimary {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00e5ff, #ffe600);
  color: #071225;
  font-weight: 800;
  transition: transform 0.2s ease;
}

.btnPrimary:hover {
  transform: translateY(-2px);
}

.btnSecondary {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 700;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px 100px;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.h2 {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
}

.h3Small {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 16px;
}

.paragraph {
  color: #a5b5c9;
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 12px;
  white-space: pre-line;
}

.featureGrid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.featureItem {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
}

.whyGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.whyCard {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 20px;
}

.whyCard h3 {
  font-size: 17px;
  margin-bottom: 8px;
}

.whyCard p {
  font-size: 14px;
  color: #a5b5c9;
  line-height: 1.6;
}

.cityLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cityLink {
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.cityLinkPrimary {
  padding: 8px 16px;
  border-radius: 999px;
  background: #00e5ff;
  color: #071225;
  font-size: 14px;
  font-weight: 700;
}

.ctaBox {
  position: relative;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 48px 32px;
  text-align: center;
}

.ctaText {
  color: #a5b5c9;
  max-width: 480px;
  margin: 0 auto 24px;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .featureGrid, .whyGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Build ellenőrzés**

Run: `npm run build`
Expected: sikeres típusellenőrzés (a komponenst még nem használja route, de validnak kell lennie)

- [ ] **Step 4: Commit**

```bash
git add components/city/CityServicePage.tsx components/city/CityServicePage.module.css
git commit -m "feat: CityServicePage megosztott komponens 4 szolgaltatashoz"
```

---

## Task 5: Dinamikus route-ok (4 szolgáltatás)

**Files:**
- Create: `app/weboldal-keszites/[varos]/page.tsx`
- Create: `app/webshop-keszites/[varos]/page.tsx`
- Create: `app/facebook-hirdetes/[varos]/page.tsx`
- Create: `app/google-hirdetes/[varos]/page.tsx`

- [ ] **Step 1: Hozd létre a weboldal-keszites route-ot**

```tsx
// app/weboldal-keszites/[varos]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { CityServicePage } from '@/components/city/CityServicePage';

export async function generateStaticParams() {
  return cities.map((city) => ({ varos: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ varos: string }> }): Promise<Metadata> {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) return {};
  return {
    title: `Weboldal készítés ${city.name} — NEZOR`,
    description: `Professzionális weboldal készítés ${city.inCity}. Gyors, mobilbarát, SEO-optimalizált weboldalak kis- és középvállalkozásoknak. Ingyenes ajánlat!`,
    openGraph: {
      title: `Weboldal készítés ${city.name} — NEZOR`,
      description: `Professzionális weboldal készítés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/weboldal-keszites/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="weboldal" />;
}
```

- [ ] **Step 2: Hozd létre a webshop-keszites route-ot**

```tsx
// app/webshop-keszites/[varos]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { CityServicePage } from '@/components/city/CityServicePage';

export async function generateStaticParams() {
  return cities.map((city) => ({ varos: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ varos: string }> }): Promise<Metadata> {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) return {};
  return {
    title: `Webshop készítés ${city.name} — NEZOR`,
    description: `Professzionális webshop készítés ${city.inCity}. Online áruház fizetési rendszerrel, rendeléskezelővel és automatikus számlázással. Ingyenes ajánlat!`,
    openGraph: {
      title: `Webshop készítés ${city.name} — NEZOR`,
      description: `Professzionális webshop készítés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/webshop-keszites/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="webshop" />;
}
```

- [ ] **Step 3: Hozd létre a facebook-hirdetes route-ot**

```tsx
// app/facebook-hirdetes/[varos]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { CityServicePage } from '@/components/city/CityServicePage';

export async function generateStaticParams() {
  return cities.map((city) => ({ varos: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ varos: string }> }): Promise<Metadata> {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) return {};
  return {
    title: `Facebook hirdetés kezelés ${city.name} — NEZOR`,
    description: `Professzionális Facebook és Instagram hirdetés kezelés ${city.inCity}. Célzott Meta kampányok, napi optimalizálással. Ingyenes ajánlat!`,
    openGraph: {
      title: `Facebook hirdetés kezelés ${city.name} — NEZOR`,
      description: `Facebook és Instagram hirdetés kezelés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/facebook-hirdetes/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="facebook" />;
}
```

- [ ] **Step 4: Hozd létre a google-hirdetes route-ot**

```tsx
// app/google-hirdetes/[varos]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import { CityServicePage } from '@/components/city/CityServicePage';

export async function generateStaticParams() {
  return cities.map((city) => ({ varos: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ varos: string }> }): Promise<Metadata> {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) return {};
  return {
    title: `Google hirdetés kezelés ${city.name} — NEZOR`,
    description: `Professzionális Google Ads kezelés ${city.inCity}. Keresési kampányok, kulcsszó-optimalizálás, konverziókövetés. Ingyenes ajánlat!`,
    openGraph: {
      title: `Google hirdetés kezelés ${city.name} — NEZOR`,
      description: `Google Ads kezelés ${city.inCity}. Ingyenes ajánlat!`,
      url: `https://nezor.hu/google-hirdetes/${city.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ varos: string }> }) {
  const { varos } = await params;
  const city = getCityBySlug(varos);
  if (!city) notFound();
  return <CityServicePage city={city} service="google" />;
}
```

- [ ] **Step 5: Build ellenőrzés — mind a 140 oldalnak generálódnia kell**

Run: `npm run build`
Expected: a build kimenetben szerepel `● /weboldal-keszites/[varos]`, `● /webshop-keszites/[varos]`, `● /facebook-hirdetes/[varos]`, `● /google-hirdetes/[varos]` mindegyik 35 statikus variánssal, hiba nélkül

- [ ] **Step 6: Commit**

```bash
git add app/weboldal-keszites app/webshop-keszites app/facebook-hirdetes app/google-hirdetes
git commit -m "feat: 4 varosonkenti dinamikus route (weboldal, webshop, facebook, google ads)"
```

---

## Task 6: `/varosok` index oldal

**Files:**
- Create: `app/varosok/page.tsx`
- Create: `app/varosok/varosok.module.css`

- [ ] **Step 1: Hozd létre az index oldalt**

```tsx
// app/varosok/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { NavDrawer } from '@/components/ui/NavDrawer';
import { City, localCities, nationalCities } from '@/lib/cities';
import styles from './varosok.module.css';

export const metadata: Metadata = {
  title: 'Weboldal, webshop és hirdetés készítés városonként — NEZOR',
  description: 'Weboldal készítés, webshop fejlesztés, Facebook és Google hirdetés kezelés Magyarország összes nagyobb városában. Bács-Kiskun megye és országos lefedettség.',
  openGraph: {
    title: 'Városok — NEZOR',
    description: 'Weboldal, webshop és hirdetés kezelés Magyarország összes nagyobb városában.',
    url: 'https://nezor.hu/varosok',
  },
  robots: { index: true, follow: true },
};

const services = [
  { label: 'Weboldal', slug: 'weboldal-keszites' },
  { label: 'Webshop', slug: 'webshop-keszites' },
  { label: 'Facebook hirdetés', slug: 'facebook-hirdetes' },
  { label: 'Google hirdetés', slug: 'google-hirdetes' },
];

function CityGroup({ title, cityList }: { title: string; cityList: City[] }) {
  return (
    <section className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      <div className={styles.grid}>
        {cityList.map((city) => (
          <div key={city.slug} className={styles.card}>
            <div className={styles.cardName}>{city.name}</div>
            <div className={styles.chips}>
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/${city.slug}`} className={styles.chip}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function VarosokPage() {
  return (
    <div className={styles.page}>
      <NavDrawer />
      <div className={styles.header}>
        <span className={styles.eyebrow}>Lefedettség</span>
        <h1 className={styles.h1}>Weboldal és hirdetés kezelés <span className={styles.accent}>városonként</span></h1>
        <p className={styles.sub}>
          Weboldal készítés, webshop fejlesztés, Facebook és Google hirdetés kezelés Bács-Kiskun megyétől az egész országig. Válaszd ki a városodat!
        </p>
      </div>

      <div className={styles.content}>
        <CityGroup title="Bács-Kiskun megye" cityList={localCities} />
        <CityGroup title="Magyarország — nagyobb városok" cityList={nationalCities} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Hozd létre a CSS modult**

```css
/* app/varosok/varosok.module.css */
.page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #1a1f3a 0%, #0f1226 60%);
  color: #fff;
}

.header {
  text-align: center;
  padding: 120px 24px 60px;
  max-width: 700px;
  margin: 0 auto;
}

.eyebrow {
  display: inline-block;
  color: #00e5ff;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.h1 {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.accent {
  color: #0099b8;
}

.sub {
  color: #a5b5c9;
  line-height: 1.6;
}

.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 100px;
}

.group {
  margin-bottom: 56px;
}

.groupTitle {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 16px;
}

.cardName {
  font-weight: 800;
  margin-bottom: 12px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(0, 229, 255, 0.12);
  color: #00e5ff;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Build ellenőrzés**

Run: `npm run build`
Expected: `● /varosok` szerepel az oldalak listájában, hiba nélkül

- [ ] **Step 4: Commit**

```bash
git add app/varosok
git commit -m "feat: /varosok index oldal"
```

---

## Task 7: Sitemap bővítése

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Cseréld le a sitemap tartalmát a dinamikus generálásra**

```typescript
import { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nezor.hu';
  const services = ['weboldal-keszites', 'webshop-keszites', 'facebook-hirdetes', 'google-hirdetes'];

  const cityUrls: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${base}/${service}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/varosok`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/adatkezeles`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...cityUrls,
  ];
}
```

- [ ] **Step 2: Build ellenőrzés**

Run: `npm run build`
Expected: `sitemap.xml` sikeresen generálódik, nincs típushiba

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: sitemap bovitese a varosonkenti oldalakkal"
```

---

## Task 8: Navigáció bővítése

**Files:**
- Modify: `components/ui/NavDrawer.tsx:5-10`

- [ ] **Step 1: Vedd fel a "Városok" linket a nav listába**

```tsx
const links = [
  { label: 'Főoldal', href: '/', num: '01', external: true },
  { label: 'Referenciák', href: '/referenciak', num: '02', external: true },
  { label: 'Csomagjaink', href: '/csomagjaink', num: '03', external: true },
  { label: 'Városok', href: '/varosok', num: '04', external: true },
  { label: 'Kapcsolat', href: '/#kapcsolat', num: '05', external: true },
];
```

- [ ] **Step 2: Build ellenőrzés**

Run: `npm run build`
Expected: sikeres build, nincs típushiba

- [ ] **Step 3: Commit**

```bash
git add components/ui/NavDrawer.tsx
git commit -m "feat: Varosok link a fo navigacioban"
```

---

## Task 9: Végső ellenőrzés

- [ ] **Step 1: Teljes build futtatása**

Run: `npm run build`
Expected: sikeres build, kimenetben 140 statikus city oldal + `/varosok` + minden meglévő oldal, nulla hiba

- [ ] **Step 2: Helyi szerver indítása és manuális ellenőrzés**

Run: `npm run dev`

Nyisd meg böngészőben:
- `http://localhost:3000/varosok` — index oldal, mindkét városcsoport látszik, chipek klikkelhetők
- `http://localhost:3000/weboldal-keszites/kecskemet` — hero, FAQ accordion nyílik, "más városokban is" linkek működnek
- `http://localhost:3000/google-hirdetes/baja` — az új Google Ads tartalom megjelenik, nem üres
- CTA gomb a heroban `/#kapcsolat`-ra visz és odagörget a főoldalon

Expected: minden oldal renderelődik, nincs hydration hiba a konzolban, a FAQ accordion nyit/csuk, a belső linkek működnek

- [ ] **Step 3: Végső commit, ha volt manuális javítás**

```bash
git status
```

Ha van még nem commitolt módosítás a manuális ellenőrzés során talált hibák javításából:

```bash
git add -A
git commit -m "fix: varosok landing oldalak manualis ellenorzes soran talalt hibak javitasa"
```
