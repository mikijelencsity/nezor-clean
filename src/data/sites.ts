// Weboldal- és webáruház-referenciák. A szövegek az élő oldalak tartalmán alapulnak (2026. nov. 6.).
// Új referencia: vedd fel ide, a képernyőképet tedd a public/images/weboldalak/ mappába (1200×960, webp).

export type SiteKind = "Weboldal" | "Webáruház";

export type SiteRef = {
  slug: string;
  name: string;
  kind: SiteKind;
  /** a kártya felső sorában a típus helyett (pl. katalógusnál) */
  kindLabel?: string;
  industry: string;
  subsegment: string;
  location?: string;
  url: string;
  /** public/images/weboldalak/<img>.webp */
  img: string;
  /** egy mondat: ki az ügyfél */
  lead: string;
  /** "Háttér" szakasz */
  background: string;
  /** "Amit építettünk" szakasz */
  solution: string;
  /** "Az oldalon" címkék */
  features: string[];
};

export const sites: SiteRef[] = [
  {
    slug: "hellinger",
    name: "Hellinger Kft.",
    kind: "Weboldal",
    industry: "Építőipar",
    subsegment: "Acélszerkezetes csarnokok",
    location: "Bátaszék",
    url: "https://hellingerkft.hu/",
    img: "hellinger",
    lead: "Bátaszéki építőipari cég 1999 óta: acélszerkezetes ipari csarnokok, generálkivitelezés és egyedi lakóépületek.",
    background:
      "Mezőgazdasági, ipari és logisztikai vállalkozásoknak, valamint magánmegrendelőknek dolgoznak a Dél-Dunántúlon. Tervezést és engedélyeztetést is vállalnak, így a megrendelő egy helyen intézhet mindent.",
    solution:
      "Az oldal a szolgáltatásokat és a már megépült projekteket mutatja be, ügyfélvéleményekkel. Bármelyik oldalról egy kattintás a kapcsolatfelvételi űrlap, a pályázati tájékoztató pedig külön aloldalt kapott.",
    features: ["Szolgáltatások", "Projektek", "Ügyfélvélemények", "Pályázati aloldal", "Blog", "Kapcsolatfelvételi űrlap"],
  },
  {
    slug: "estur",
    name: "Estur Kft.",
    kind: "Weboldal",
    industry: "Építőipar",
    subsegment: "Generálkivitelezés",
    location: "Baja",
    url: "https://estur.hu/",
    img: "estur",
    lead: "Bajai generálkivitelező 2016 óta: tervezés, engedélyeztetés és kulcsrakész kivitelezés.",
    background:
      "Lakásfelújítást, átalakítást, valamint családi házak, ikerházak és kisebb lakóépületek építését vállalják Baján és országosan, főleg magánmegrendelőknek.",
    solution:
      "Háromnyelvű oldal: magyar, angol és német. A referenciák fotókkal, saját aloldalon mutatják be az elkészült munkákat, az ajánlatkérés külön oldalra visz. Kapott blogot, karrier- és partneroldalt is.",
    features: ["Magyar, angol, német", "Fotós referenciák", "Ajánlatkérő oldal", "Blog", "Karrier", "Partnerek"],
  },
  {
    slug: "dovercheck",
    name: "DoverCheck",
    kind: "Webáruház",
    industry: "Elektronika",
    subsegment: "Korhatár-ellenőrző rendszer",
    location: "Baja",
    url: "https://doversolution.hu/",
    img: "dovercheck",
    lead: "Bajai elektronikai fejlesztő cég: áramkörtervezés, firmware-fejlesztés és teljes termékfejlesztés a prototípustól a sorozatgyártásig.",
    background:
      "Saját termékük a DoverCheck, egy boltoknak szóló korhatár-ellenőrző rendszer a kasszához. Vonalkódot olvas, internet nélkül is működik, és a felhőből követhető.",
    solution:
      "A fejlesztési szolgáltatások és a saját termék egy oldalon kaptak helyet. A DoverCheck külön termékoldalt kapott, a webshopban pedig két változatban rendelhető, opcióválasztással és kosárral: az online verzió 29 990 Ft, az offline 159 990 Ft. A kézikönyv és az alkalmazás letölthető.",
    features: ["Webshop kosárral", "Termékváltozatok", "Termékoldal", "Letölthető kézikönyv és app", "GYIK", "Blog"],
  },
  {
    slug: "nekedsutom",
    name: "Neked Sütöm",
    kind: "Weboldal",
    industry: "Vendéglátás",
    subsegment: "Lángosozó",
    location: "Baja",
    url: "https://nekedsutom.hu/",
    img: "nekedsutom",
    lead: "Bajai lángosozó: naponta frissen sütött lángos kovászos-burgonyás tésztából.",
    background:
      "Mellé házi szörpök, matcha és chai, vasárnap 8 és 13 óra között brunch. Helyben, elvitelre, valamint Wolton és Foodorán is lehet rendelni.",
    solution:
      "Az oldal az étvágyra épít: kínálat árakkal, szörpök, képgaléria és vélemények. A nyitvatartás és a telefonszám mindig kéznél van, a rendelésgombok egyenesen a Woltra és a Foodorára visznek, a brunchra pedig a kapcsolat oldalon lehet asztalt foglalni.",
    features: ["Kínálat árakkal", "Képgaléria", "Vélemények", "Wolt és Foodora", "Brunch-foglalás", "Nyitvatartás"],
  },
  {
    slug: "cruisershop",
    name: "CruiserShop",
    kind: "Webáruház",
    kindLabel: "Termékkatalógus",
    industry: "Kiskereskedelem",
    subsegment: "Kerékpárbolt",
    location: "Baja",
    url: "https://kerekparszakuzletbaja.hu/",
    img: "cruisershop",
    lead: "Bajai kerékpárbolt és szerviz: elektromos, túra-, MTB-, városi, gyerek- és háromkerekű kerékpárok.",
    background:
      "Szervizt, gumicserét, fék- és váltóbeállítást is vállalnak, felszereléseket árulnak, egyedi rendelést is intéznek. Két év garanciát és országos szállítást adnak.",
    solution:
      "388 modell hat kategóriában, kategóriánként darabszámmal, így az első pillantásra látszik a választék. Aki nem tudja, melyik kerékpár illik hozzá, kitölti a kvízt. A szerviz külön oldalt kapott.",
    features: ["388 modell", "6 kategória", "Kerékpárválasztó kvíz", "Szervizoldal", "Nyitvatartás", "Kapcsolat"],
  },
  {
    slug: "inshape",
    name: "Inshape-Diet",
    kind: "Webáruház",
    industry: "Egészséges életmód",
    subsegment: "Fogyásprogram",
    location: "Bahrein",
    url: "https://inshape-diet.com/",
    img: "inshape",
    lead: "Fogyást és testösszetétel-javítást segítő programok, magas fehérjetartalmú, étkezést helyettesítő termékekkel.",
    background:
      "A termékek mellett testösszetétel-elemzést, Buteyko légzéstréninget, bevásárlási szolgáltatást, konyhaátalakítást és konzultációt is kínálnak. A vevőik Bahreinben és Szaúd-Arábiában vannak.",
    solution:
      "Angol nyelvű webáruház bahreini dináros árakkal: termékoldalak, kosár, regisztráció és bejelentkezés. Bahreinben és Szaúd-Arábia keleti városaiban (Dhahran, Khobar, Dammam) ingyenes a szállítás. Mellé blog került a tartalomhoz.",
    features: ["Webshop kosárral", "Vásárlói fiók", "Angol nyelv", "Ingyenes szállítás", "Blog"],
  },
  {
    slug: "szeko",
    name: "Szeko Ablak Kft.",
    kind: "Weboldal",
    industry: "Építőipar",
    subsegment: "Nyílászárók",
    location: "Baja",
    url: "https://szekoablak.hu/",
    img: "szeko",
    lead: "Bajai nyílászárós cég 2010 óta: ablak- és ajtócsere, redőny, szúnyogháló, párkány.",
    background:
      "Felújítást, festést és padlóburkolást is vállalnak Baján és Bács-Kiskun megye településein, főleg magánszemélyeknek.",
    solution:
      "Ablakcserénél a vevő azt akarja látni, hogyan fog kinézni a háza. Ezért az oldal referenciagalériát és előtte–utána projekteket kapott, mellé ajánlatkérő űrlapot.",
    features: ["Előtte–utána projektek", "Referenciagaléria", "Ajánlatkérő űrlap", "Telefon és e-mail"],
  },
];

export const siteKinds: SiteKind[] = ["Weboldal", "Webáruház"];
