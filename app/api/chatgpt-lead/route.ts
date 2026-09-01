import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';
import { sendCapiEvent, capiContext } from '@/lib/meta-capi';

export async function POST(request: Request) {
  try {
    const { nev, telefon, email, cegnev, eventId, website } = await request.json() as {
      nev: string;
      telefon: string;
      email: string;
      cegnev: string;
      eventId?: string;
      website?: string;
    };

    // honeypot – bot csendben "sikeres"
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!nev || !telefon || !email || !cegnev || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    const ertesitok = [...new Set([NOTIFY_EMAIL, 'mullerdanielev@gmail.com'])];

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ertesitok,
      subject: `[NEZOR] ChatGPT-hirdetés lead — ${esc(nev)}`,
      html: `
        <h2>Új lead a ChatGPT-hirdetés landingről</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev)}</p>
      `,
    });
    if (sendError) {
      console.error('[chatgpt-lead] értesítő email sikertelen', sendError);
      return NextResponse.json({ error: 'Email küldés sikertelen' }, { status: 500 });
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Megkaptuk a jelentkezésed — NEZOR',
        html: `
          <h2>Megkaptuk a jelentkezésed!</h2>
          <p>Hamarosan felvesszük veled a kapcsolatot a ChatGPT-hirdetés lehetőségével kapcsolatban.</p>
          <p>Ha kérdésed van: <a href="mailto:info@nezor.hu">info@nezor.hu</a> · +36 30 203 6721</p>
        `,
      });
    } catch (confirmErr) {
      console.error('[chatgpt-lead] visszaigazoló email sikertelen', confirmErr);
    }

    if (eventId) {
      const ctx = capiContext(request);
      await sendCapiEvent({
        eventName: 'Lead',
        eventId,
        sourceUrl: ctx.sourceUrl ?? 'https://nezor.hu/chatgpt-hirdetes',
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
    console.error('[chatgpt-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
