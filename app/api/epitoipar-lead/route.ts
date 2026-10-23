import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';
import { utemezSorozat, lemondSorozat } from '@/lib/epitoipar-emlekezteto';

export async function POST(request: Request) {
  try {
    const { valaszok, nev, keresztnev, telefon, email, oldal, emlekeztetoId, hozzajarulas, eventId, website, reszleges, elonezet, elonezetSorszam, fbclid, fbclidIdo } = await request.json() as {
      valaszok: Record<string, string>;
      nev: string;
      /** megszólításhoz az emlékeztetőben */
      keresztnev?: string;
      telefon?: string;
      email?: string;
      /** melyik landingről jött (az emlékeztető linkjéhez; csak engedélyezett útvonal) */
      oldal?: string;
      /** a korábban időzített emlékeztető azonosítója (végleges küldéskor lemondjuk) */
      emlekeztetoId?: string;
      hozzajarulas?: boolean;
      eventId?: string;
      website?: string;
      /** félbehagyott kitöltés (az oldal elhagyásakor) */
      reszleges?: boolean;
      /** a levélsorozat azonnali előnézete — csak a saját címeinkre */
      elonezet?: boolean;
      /** előnézetnél csak ez a levél (1–4) */
      elonezetSorszam?: number;
      /** a hirdetésre kattintás azonosítója a landing URL-jéből (Meta attribúcióhoz) */
      fbclid?: string;
      fbclidIdo?: number;
    };

    // honeypot – bot csendben "sikeres"
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // félbehagyott kitöltésnél elég az e-mail vagy a telefon; végleges küldésnél a telefon kötelező
    const hianyzik = reszleges ? !telefon && !email : !telefon;
    if (!nev || hianyzik || (email && !isValidEmail(email)) || hozzajarulas !== true) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    // Végleges küldés: az esetleg időzített levélsorozatot lemondjuk
    if (!reszleges && emlekeztetoId) await lemondSorozat(emlekeztetoId);

    // Félbehagyott kitöltés + e-mail-cím: levélsorozat időzítése (egyszer, csak hozzájárulással)
    // 1 óra emlékeztető · 1 nap ajánlat · 3 nap referenciák · 7 nap végső garanciás ajánlat
    let ujEmlekeztetoId: string | undefined;
    if (reszleges && email && !emlekeztetoId) {
      const utvonal = oldal === '/epitoipar' ? '/epitoipar' : '/landing100';
      // a megszólítás felhasználói adat: csak betű, szóköz, kötőjel; legfeljebb 30 karakter
      const tisztaNev = (keresztnev ?? '').replace(/[^\p{L} .'-]/gu, '').trim().slice(0, 30);
      // előnézet: minden levél azonnal, de kizárólag a saját címeinkre
      const sajatCim = [NOTIFY_EMAIL, 'mullerdanielev@gmail.com'].includes(email.toLowerCase());
      ujEmlekeztetoId = await utemezSorozat({ email, nev: tisztaNev, utvonal, azonnal: elonezet === true && sajatCim, csakSorszam: elonezetSorszam });
    }

    // félbehagyott kitöltés telefonszám nélkül: nincs kit visszahívni, nekünk nem küldünk értesítőt
    if (reszleges && !telefon) return NextResponse.json({ ok: true, emlekeztetoId: ujEmlekeztetoId });

    const ertesitok = [...new Set([NOTIFY_EMAIL, 'mullerdanielev@gmail.com'])];
    const valaszSorok = Object.entries(valaszok ?? {})
      .map(([k, v]) => `<p><strong>${esc(k)}</strong> ${esc(v)}</p>`)
      .join('');

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ertesitok,
      subject: reszleges
        ? `[NEZOR] Építőipar — FÉLBEHAGYOTT kitöltés — ${esc(nev)}`
        : `[NEZOR] Építőipar lead — ${esc(nev)}`,
      html: `
        <h2>${reszleges ? 'Félbehagyott kitöltés az építőipar landingről (a telefonszám megvan, hívd vissza!)' : 'Új lead az építőipar landingről'}</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon ?? '')}</p>
        ${email ? `<p><strong>Email:</strong> ${esc(email)}</p>` : ''}
        <hr />
        ${valaszSorok}
        <hr />
        <p><small>Adatkezelési hozzájárulás megadva: ${new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}</small></p>
      `,
    });
    if (sendError) {
      console.error('[epitoipar-lead] értesítő email sikertelen', sendError);
      return NextResponse.json({ error: 'Email küldés sikertelen' }, { status: 500 });
    }

    // eventId-t a kliens csak süti-hozzájárulás esetén küld; félbehagyott kitöltés nem Lead esemény
    if (eventId && !reszleges) {
      const ctx = capiContext(request);
      await sendCapiEvent({
        eventName: 'Lead',
        eventId,
        sourceUrl: ctx.sourceUrl ?? 'https://nezor.hu/epitoipar',
        email,
        phone: telefon,
        fullName: nev,
        clientIp: ctx.clientIp,
        clientUserAgent: ctx.clientUserAgent,
        fbp: ctx.fbp,
        fbc: ctx.fbc,
        fbclid,
        fbclidIdo,
      });
    }

    return NextResponse.json({ ok: true, emlekeztetoId: ujEmlekeztetoId });
  } catch (err) {
    console.error('[epitoipar-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
