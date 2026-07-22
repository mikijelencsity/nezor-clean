import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';

export async function POST(request: Request) {
  try {
    const { nev, telefon, email, eventId } = await request.json() as {
      nev: string;
      telefon: string;
      email?: string;
      eventId?: string;
    };

    // név + telefon + email kötelező
    if (!nev || !telefon || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    // A lead értesítő címzettjei (duplikáció kiszűrve)
    const ertesitok = [...new Set([NOTIFY_EMAIL, 'mullerdanielev@gmail.com'])];

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ertesitok,
      subject: `[NEZOR] Új lead – Ügyfélszerző rendszer (19.990) — ${esc(nev)}`,
      html: `
        <h2>Új lead a landing oldalról (19.990 Ft ajánlat)</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        <p><strong>Email:</strong> ${email ? esc(email) : '– (nem adott meg)'}</p>
      `,
    });
    if (sendError) {
      console.error('[landing-lead] értesítő email sikertelen', sendError);
      return NextResponse.json({ error: 'Email küldés sikertelen' }, { status: 500 });
    }

    // visszaigazoló csak akkor, ha adott emailt
    if (email) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          subject: 'Megkaptuk a jelentkezésed — NEZOR',
          html: `
            <h2>Köszönjük, hamarosan keresünk!</h2>
            <p>Megkaptuk a jelentkezésed, és hamarosan felvesszük veled a kapcsolatot, hogy megkezdjük a közös munkát.</p>
            <p>Ha kérdésed van: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
          `,
        });
      } catch (confirmErr) {
        console.error('[landing-lead] visszaigazoló email sikertelen', confirmErr);
      }
    }

    // Meta CAPI — szerver oldali Lead, a browser eventtel deduplikálva (közös eventId)
    if (eventId) {
      const ctx = capiContext(request);
      await sendCapiEvent({
        eventName: 'Lead',
        eventId,
        sourceUrl: ctx.sourceUrl ?? 'https://nezor.hu/landing',
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
    console.error('[landing-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
