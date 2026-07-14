// lib/cityContent.ts
import { City } from './cities'

// Deterministic variation selector — minden városhoz más kombináció
function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function pick<T>(arr: T[], city: City, offset = 0): T {
  const index = (hashSlug(city.slug) + offset) % arr.length
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
