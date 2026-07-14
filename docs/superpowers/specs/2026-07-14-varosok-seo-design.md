# Városonkénti SEO landing oldalak (programmatic SEO)

## Háttér

A domain egy korábbi verziójában (`github.com/mikijelencsity/nezor`, itt `nezor-old`-ként klónozva referenciának) volt egy `/varosok` index és 3 szolgáltatás × 37 város dinamikus route rendszer, ami helyi + országos SEO lefedettséget adott. A jelenlegi `nezor-clean` kódbázis egy teljesen újraépített site (CSS modulok, sötét kék/cián/sárga dizájn, egyoldalas főoldal + niche landingek), amiben ez a rendszer nincs meg. A cél: ugyanezt a programmatic SEO réteget felépíteni a jelenlegi site dizájnjához és architektúrájához illesztve.

## Szolgáltatások és városok

4 szolgáltatás minden városhoz (bővítve a régi 3-ból):
- `weboldal-keszites`
- `webshop-keszites`
- `facebook-hirdetes`
- `google-hirdetes` (**új** — nem volt a régi rendszerben, teljesen új szövegkészlet kell hozzá)

35 város, változatlanul átvéve a régi `cities.ts`-ből (13 helyi + 22 országos):
- 13 Bács-Kiskun megyei (Kecskemét, Baja, Kalocsa, Kiskunfélegyháza, Kiskunhalas, Kiskunmajsa, Kiskőrös, Kunszentmiklós, Tiszakécske, Lajosmizse, Dunavecse, Soltvadkert, Jánoshalma)
- 24 nagyobb magyar város: Budapest, Debrecen, Miskolc, Pécs, Győr, Nyíregyháza, Szeged, Székesfehérvár, Szombathely, Szolnok, Eger, Veszprém, Zalaegerszeg, Kaposvár, Sopron, Érd, Tatabánya, Dunaújváros, Esztergom, Szekszárd, Cegléd, Hódmezővásárhely (a régi `cities.ts` teljes, 1:1 átvett listája)

Összesen: 4 × 35 = 140 statikus city oldal + 1 index oldal (`/varosok`).

## Route-szerkezet

```
app/varosok/page.tsx                              → index, város lista szolgáltatás-chipekkel
app/weboldal-keszites/[varos]/page.tsx            → generateStaticParams a 37 városra
app/webshop-keszites/[varos]/page.tsx
app/facebook-hirdetes/[varos]/page.tsx
app/google-hirdetes/[varos]/page.tsx
```

Mind a 4 dinamikus route ugyanazt a megosztott komponenst rendereli más `service` prop-pal, ahogy a régi rendszerben.

## Adatréteg

- `lib/cities.ts` — `City` interfész (`slug`, `name`, `inCity`, `adjective`, `county`, `isLocal`) + `cities` tömb + `getCityBySlug`, `localCities`, `nationalCities` helper. 1:1 átvétel a régi `src/data/cities.ts`-ből.
- `lib/cityContent.ts` — a `pick()` determinisztikus variáció-választó (`(city.slug.charCodeAt(0) + city.slug.length + offset) % arr.length`) + szolgáltatásonként 3-4 szövegvariáció-tömb (intro, "miért fontos", "típusok/funkciók", "folyamat"), városra paraméterezett template függvényekkel. A meglévő 3 szolgáltatáshoz (weboldal, webshop, facebook) a régi tartalom adaptálva (a NEZOR jelenlegi hangneméhez/ajánlatához igazítva, ha eltér), a `google-hirdetes`-hez új tartalom írva ugyanabban a stílusban (Google Ads-specifikus: keresési hálózat, kulcsszavak, Google Ads fiók, konverziókövetés stb.).

## Komponens és dizájn

`components/city/CityServicePage.tsx` + `CityServicePage.module.css`, a jelenlegi dizájnrendszerre építve (nem a régi Tailwind-alapú light kártyás stílus):

- Meglévő UI elemek újrahasznosítása: `GridBg`, `GlowBlob`, `SectionLabel`, `SectionTitle` a `components/ui`-ból
- Sötét háttér, kék (`--blue: #00e5ff`) / cián (`--cyan2: #0099b8`) / sárga (`--yellow: #ffe600`) akcentek a `globals.css` token-jeivel összhangban

Oldal szekciók (városra + szolgáltatásra paraméterezve):
1. **Hero** — badge (szolgáltatás + város), H1, leírás, két CTA gomb: elsődleges → `/#kapcsolat`, másodlagos → `/csomagjaink`
2. **Bemutatkozás** — intro szöveg + feature-lista (pipa ikonokkal)
3. **"Miért fontos [szolgáltatás] [városban]?"** szöveg
4. **Típusok / funkciók** szolgáltatásonként
5. **"Miért a NEZOR [városban]?"** — 3 kártya: gyors átfutás, ár-érték, helyi tapasztalat
6. **Folyamat lépései**
7. **FAQ** — accordion (meglévő FAQ-komponens mintájára, ha van ilyen közös komponens; ha nincs, egyszerű collapsible lista) + `FAQPage` JSON-LD schema
8. **"[Szolgáltatás] más városokban is"** — 8 belső link hasonló (helyi/országos) városokra + link `/varosok`-ra (belső linkháló SEO célból)
9. **Záró CTA sáv** → `/#kapcsolat`

`/varosok` index oldal (`app/varosok/page.tsx`):
- Két csoport: "Bács-Kiskun megye" és "Magyarország — nagyobb városok"
- Városonként 4 szolgáltatás-chip, mindegyik a megfelelő `/[szolgaltatas]/[varos]` route-ra mutat

## SEO és technikai integráció

- `generateMetadata` minden city oldalon: egyedi `title`, `description`, OpenGraph (`url`, `title`, `description`) — város- és szolgáltatás-specifikus szöveggel, a régi minta szerint
- `FAQPage` JSON-LD séma oldalanként, inline `<script type="application/ld+json">` (ahogy a `app/layout.tsx` már csinálja a `localBusinessSchema`/`faqSchema`-val — nincs külön `lib/structured-data.ts`, nem is kell létrehozni, az inline mintát követjük)
- `robots: { index: true, follow: true }` — ezek indexelendő oldalak, ellentétben a jelenlegi noindexelt landing/útmutató oldalakkal
- `app/sitemap.ts` bővítése: a 140 city URL + a `/varosok` index felvétele a sitemap tömbbe (a 35 város × 4 szolgáltatás slugból generálva, nem kézzel felsorolva)
- `NavDrawer` linklista bővítése egy "Városok" bejegyzéssel (`href: '/varosok'`, `external: true`, a sorszámozás eltolásával)

## Nem térünk ki rá (scope-on kívül)

- Nincs külön beágyazott kapcsolatform city oldalanként — a meglévő `/#kapcsolat` szekcióra mutatunk (jóváhagyott döntés)
- Nincs admin/CMS a városadatok szerkesztésére — statikus TS fájl, kód-szintű módosítás szükséges új város/szolgáltatás hozzáadásához
- Nem duplikáljuk a niche landingeket (pl. `epitoipari-weboldal`) városonként — ez a 4 általános szolgáltatásra korlátozódik
