import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';

export async function POST(request: Request) {
  try {
    const { valaszok, nev, telefon, email, hozzajarulas, eventId, website, reszleges } = await request.json() as {
      valaszok: Record<string, string>;
      nev: string;
      telefon: string;
      email?: string;
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

    if (!nev || !telefon || (email && !isValidEmail(email)) || hozzajarulas !== true) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

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
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[epitoipar-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
