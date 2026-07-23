import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';

export async function POST(request: Request) {
  try {
    const { nev, telefon, email, cegnev, terulet, szakma, foglalkozas, eventId, website } = await request.json() as {
      nev: string;
      telefon: string;
      email: string;
      cegnev: string;
      terulet: string;
      szakma: string;
      foglalkozas?: string;
      eventId?: string;
      website?: string;
    };

    // honeypot – bot csendben "sikeres"
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // minden mező kötelező
    if (!nev || !telefon || !email || !cegnev || !terulet || !szakma || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    const ertesitok = [...new Set([NOTIFY_EMAIL, 'mullerdanielev@gmail.com'])];

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ertesitok,
      subject: `[NEZOR] Kész oldal (50.000) – ${esc(szakma)} — ${esc(nev)}`,
      html: `
        <h2>Új lead a kész oldal flash-ajánlatról (50.000 Ft)</h2>
        <p><strong>Melyik oldal kell:</strong> ${esc(szakma)}</p>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev)}</p>
        <p><strong>Működési terület:</strong> ${esc(terulet)}</p>
        <p><strong>Mivel foglalkozik:</strong> ${foglalkozas ? esc(foglalkozas) : '– (nem adta meg)'}</p>
      `,
    });
    if (sendError) {
      console.error('[szakember-lead] értesítő email sikertelen', sendError);
      return NextResponse.json({ error: 'Email küldés sikertelen' }, { status: 500 });
    }

    // visszaigazoló a jelentkezőnek
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Megkaptuk a jelentkezésed — NEZOR',
        html: `
          <h2>Foglaltuk neked az oldalt!</h2>
          <p>Megkaptuk a jelentkezésed. Hamarosan hívunk a részletekkel, és 24 órán belül élesben lesz az oldalad.</p>
          <p>Ha kérdésed van: <a href="mailto:info@nezor.hu">info@nezor.hu</a> · +36 30 203 6721</p>
        `,
      });
    } catch (confirmErr) {
      console.error('[szakember-lead] visszaigazoló email sikertelen', confirmErr);
    }

    // Meta CAPI — szerver oldali Lead, a browser eventtel deduplikálva (közös eventId)
    if (eventId) {
      const ctx = capiContext(request);
      await sendCapiEvent({
        eventName: 'Lead',
        eventId,
        sourceUrl: ctx.sourceUrl ?? 'https://nezor.hu/szakember-landing',
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
    console.error('[szakember-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
