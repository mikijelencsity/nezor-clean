import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, telefon, email, website } = await request.json() as {
      nev: string;
      telefon: string;
      email?: string;
      website?: string;
    };

    // honeypot – bot csendben "sikeres"
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // név + telefon + email kötelező
    if (!nev || !telefon || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[landing-lead]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
