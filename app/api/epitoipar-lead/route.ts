import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';

export async function POST(request: Request) {
  try {
    const { valaszok, nev, keresztnev, telefon, email, oldal, emlekeztetoId, hozzajarulas, eventId, website, reszleges } = await request.json() as {
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
      /** félbehagyott kitöltés (sendBeacon az oldal elhagyásakor) */
      reszleges?: boolean;
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

    // Végleges küldés: az esetleg időzített emlékeztető levelet lemondjuk
    if (!reszleges && emlekeztetoId) {
      await resend.emails.cancel(emlekeztetoId).catch((e) => console.error('[epitoipar-lead] emlékeztető lemondása sikertelen', e));
    }

    // Félbehagyott kitöltés + e-mail-cím: emlékeztető levél 1 óra múlva (egyszer, csak hozzájárulással)
    let ujEmlekeztetoId: string | undefined;
    if (reszleges && email && !emlekeztetoId) {
      const utvonal = oldal === '/epitoipar' ? '/epitoipar' : '/landing100';
      const link = `https://www.nezor.hu${utvonal}`;
      // a megszólítás felhasználói adat: csak betű, szóköz, kötőjel; legfeljebb 30 karakter
      const tisztaNev = (keresztnev ?? '').replace(/[^\p{L} .'-]/gu, '').trim().slice(0, 30);
      const megszolitas = esc(tisztaNev || 'Szia');
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: 'info@nezor.hu',
        subject: `${tisztaNev ? `${tisztaNev}, f` : 'F'}élbehagytad a jelentkezést, 1 perc és kész`,
        scheduledAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        html: `
          <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:520px">
            <p>${tisztaNev ? `Szia ${megszolitas}!` : 'Szia!'}</p>
            <p>Láttuk, hogy elkezdted a jelentkezést, de nem fejezted be. <b>Már csak pár kérdés van hátra</b>, utána
            felhívunk, és a válaszaid alapján ügyfélszerzési tervet állítunk össze a vállalkozásodnak.</p>
            <p style="margin:26px 0">
              <a href="${link}" style="display:inline-block;padding:14px 22px;border-radius:10px;background:#0064e0;color:#fff;text-decoration:none;font-weight:bold">Befejezem a jelentkezést →</a>
            </p>
            <p>Ha inkább beszélnél velünk, hívj nyugodtan: <b>+36 30 203 6721</b>.</p>
            <p>Üdv,<br>Dani és Miki<br>NEZOR</p>
            <p style="margin-top:28px;font-size:12px;color:#777">Ezt az egyetlen levelet azért kaptad, mert a nezor.hu oldalon megadtad az e-mail-címed, és hozzájárultál, hogy félbehagyott kitöltés esetén emlékeztessünk. Ha nem kérsz több levelet, elég, ha válaszolsz erre az e-mailre.</p>
          </div>
        `,
      });
      if (error) console.error('[epitoipar-lead] emlékeztető időzítése sikertelen', error);
      ujEmlekeztetoId = data?.id;
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
      });
    }

    return NextResponse.json({ ok: true, emlekeztetoId: ujEmlekeztetoId });
  } catch (err) {
    console.error('[epitoipar-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
