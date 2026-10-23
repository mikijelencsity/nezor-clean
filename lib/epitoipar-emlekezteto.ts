import { resend, FROM_EMAIL, esc } from '@/lib/resend';

/**
 * Félbehagyott építőipari jelentkezés után induló levélsorozat (csak hozzájárulással):
 * 1 óra: emlékeztető · 1 nap: ajánlat · 3 nap: referenciák · 7 nap: végső, garanciás ajánlat.
 * Utána nem írunk többet.
 *
 * Minden levél időzítve megy ki (Resend scheduledAt). A sorozatot fordított sorrendben időzítjük,
 * hogy minden levél leiratkozó linkje a nála későbbi levelek azonosítóit tartalmazza
 * (a véletlen UUID-k egyben „jogosultságként” szolgálnak a lemondáshoz, titkos kulcs nélkül).
 * Végleges küldéskor az összes azonosítót lemondjuk.
 */

const ORA = 60 * 60 * 1000;
const NAP = 24 * ORA;

type Level = { kesleltetes: number; targy: (nev: string) => string; tartalom: (nev: string, link: string) => string };

const gomb = (link: string, szoveg: string) => `
  <p style="margin:26px 0">
    <a href="${link}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#0064e0;color:#fff;text-decoration:none;font-weight:bold">${szoveg}</a>
  </p>`;

const szia = (nev: string) => (nev ? `Szia ${esc(nev)}!` : 'Szia!');
const nevvel = (nev: string, szoveg: string) => (nev ? `${nev}, ${szoveg}` : szoveg.charAt(0).toUpperCase() + szoveg.slice(1));

const levelek: Level[] = [
  {
    kesleltetes: ORA,
    targy: (n) => nevvel(n, 'félbehagytad a jelentkezést, 1 perc és kész'),
    tartalom: (n, link) => `
      <p>${szia(n)}</p>
      <p>Láttuk, hogy elkezdted a jelentkezést, de nem fejezted be. <b>Már csak pár kérdés van hátra</b>, utána
      felhívunk, és a válaszaid alapján ügyfélszerzési tervet állítunk össze a vállalkozásodnak.</p>
      ${gomb(link, 'Befejezem a jelentkezést →')}`,
  },
  {
    kesleltetes: NAP,
    targy: (n) => nevvel(n, 'ezt kapod havi 79 000 Ft-ért'),
    tartalom: (n, link) => `
      <p>${szia(n)}</p>
      <p>Tegnap elkezdted a jelentkezést, ezért röviden leírjuk, mit kapsz tőlünk <b>havi 79 000 Ft-ért</b>:</p>
      <ul style="padding-left:18px">
        <li>Egész hónapban közös munka</li>
        <li>Éjjel-nappal működő ügyfélszerzés Facebookon és Instagramon</li>
        <li>Egy saját oldal, mint amin a jelentkezést kezdted</li>
        <li>A leendő ügyfeleid elérhetőségei, azonnal</li>
        <li>Heti beszámolók, és minket hívsz, mi vesszük fel</li>
      </ul>
      <p><b>Nincs hűségidő</b>, havonta felmondható. A hirdetési keretet közvetlenül a Metának fizeted.</p>
      ${gomb(link, 'Kérem az ügyfélszerzési tervet →')}`,
  },
  {
    kesleltetes: 3 * NAP,
    targy: (n) => nevvel(n, 'így hozunk ajánlatkéréseket más építőipari cégeknek'),
    tartalom: (n, link) => `
      <p>${szia(n)}</p>
      <p>Pár valós szám a Meta hirdetéskezelőből, más építőipari ügyfeleinktől:</p>
      <ul style="padding-left:18px">
        <li><b>Mobilház-gyártás:</b> 1 125 ajánlatkérés, 339 Ft / ajánlatkérés</li>
        <li><b>Generálkivitelezés:</b> 242 ajánlatkérés, 1 355 Ft / ajánlatkérés</li>
        <li><b>Könnyűszerkezetes házak:</b> 204 ajánlatkérés, 867 Ft / ajánlatkérés</li>
        <li><b>Térkövezés, betonozás:</b> 200 ajánlatkérés, 741 Ft / ajánlatkérés</li>
      </ul>
      <p>Ugyanezt a rendszert építjük fel neked is, a te szakmádra és a te körzetedre.</p>
      ${gomb(link, 'Nekem is ilyet kérek →')}`,
  },
  {
    kesleltetes: 7 * NAP,
    targy: (n) => nevvel(n, 'utolsó levél: ha nem hozunk munkát, visszaadjuk a pénzt'),
    tartalom: (n, link) => `
      <p>${szia(n)}</p>
      <p>Ez az utolsó levelünk, utána nem zavarunk többet.</p>
      <p>Egy ajánlattal zárunk, ami szerintünk <b>kockázatmentessé</b> teszi a döntést:</p>
      <p style="padding:16px;border-radius:12px;background:#0064e0;color:#fff;font-weight:bold;text-align:center">
        Ha nem hozunk munkát, a pénzt visszaadjuk.
      </p>
      <p>Nincs hűségidő, havonta felmondható. Ha kipróbálnád, egy rövid hívásban összerakjuk a tervet.</p>
      ${gomb(link, 'Kipróbálom →')}`,
  },
];

const keret = (belso: string, leiratkozasLink: string | null) => `
  <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:520px">
    ${belso}
    <p>Ha inkább beszélnél velünk, hívj nyugodtan: <b>+36 30 203 6721</b>.</p>
    <p>Üdv,<br>Dani és Miki<br>NEZOR</p>
    <p style="margin-top:28px;font-size:12px;color:#777">
      Ezt a levelet azért kaptad, mert a nezor.hu oldalon megadtad az e-mail-címed, és hozzájárultál, hogy
      félbehagyott jelentkezés esetén legfeljebb 4 levélben emlékeztessünk.
      ${leiratkozasLink ? `<a href="${leiratkozasLink}" style="color:#777">Nem kérek több levelet</a>.` : 'Ez volt az utolsó levelünk.'}
    </p>
  </div>`;

/** Időzíti a teljes sorozatot; visszaadja a levelek azonosítóit (vesszővel elválasztva), vagy undefined-ot. */
export async function utemezSorozat(o: { email: string; nev: string; utvonal: '/landing100' | '/epitoipar'; azonnal?: boolean }) {
  const link = `https://www.nezor.hu${o.utvonal}`;
  const most = Date.now();
  const azonositok: string[] = [];
  // fordított sorrendben: a 7 napos levél először, így a korábbiak leiratkozó linkje már ismeri a későbbieket
  // (előnézetnél a valós sorrendben küldjük, hogy a postafiókban is egymás után jöjjenek)
  for (const l of o.azonnal ? levelek : [...levelek].reverse()) {
    // az utolsó levélben nincs leiratkozó link (utána úgysem jön több); a többiben a később időzítettek azonosítói
    const utolso = l === levelek[levelek.length - 1];
    const kesobbiek = o.azonnal ? [] : [...azonositok];
    const leiratkozasLink = utolso ? null : `https://www.nezor.hu/api/epitoipar-lead/leiratkozas?ids=${kesobbiek.join(',')}`;
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: o.email,
      replyTo: 'info@nezor.hu',
      subject: l.targy(o.nev),
      // előnézetnél (csak a saját címeinkre) azonnal megy ki minden levél
      ...(o.azonnal ? {} : { scheduledAt: new Date(most + l.kesleltetes).toISOString() }),
      html: keret(l.tartalom(o.nev, link), leiratkozasLink),
    });
    if (error || !data?.id) {
      console.error('[epitoipar-emlekezteto] időzítés sikertelen', error);
      continue;
    }
    azonositok.push(data.id);
  }
  return azonositok.length ? azonositok.join(',') : undefined;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Lemondja a megadott (vesszővel elválasztott) időzített leveleket; a hibásakat kihagyja. */
export async function lemondSorozat(azonositok: string) {
  const idk = azonositok.split(',').map((x) => x.trim()).filter((x) => UUID_RE.test(x)).slice(0, 10);
  await Promise.all(idk.map((id) => resend.emails.cancel(id).catch((e) => console.error('[epitoipar-emlekezteto] lemondás sikertelen', id, e))));
  return idk.length;
}
