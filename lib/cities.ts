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
