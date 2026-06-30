import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const {
      nev, cegnev, email, telefon, szakma, stilus, csomag, telepules, leiras, website,
    } = await request.json() as {
      nev: string;
      cegnev: string;
      email: string;
      telefon: string;
      szakma: string;
      stilus: string;
      csomag: string;
      telepules?: string;
      leiras?: string;
      website?: string;
    };

    if (website) {
      console.warn('[epitoipari-weboldal] honeypot trip — kihagyott email', { nev, email });
      return NextResponse.json({ ok: true });
    }

    if (!nev || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL, 'mullerdanielev@gmail.com'],
      subject: `[NEZOR] Építőipari weboldal megrendelés — ${esc(nev)}`,
      html: `
        <h2>Építőipari weboldal megrendelés</h2>
        <p><strong>Szakma:</strong> ${esc(szakma)}</p>
        <p><strong>Minta:</strong> ${esc(stilus)}</p>
        ${leiras ? `<p><strong>Saját elképzelés:</strong> ${esc(leiras)}</p>` : ''}
        <p><strong>Csomag:</strong> ${esc(csomag)}</p>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        ${telepules ? `<p><strong>Település:</strong> ${esc(telepules)}</p>` : ''}
        <p>Vegyük fel vele a kapcsolatot, és egyeztessük a weboldal első verzióját.</p>
      `,
    });

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Köszönjük a megrendelést! — NEZOR',
        html: `
          <h2>Köszönjük, hogy elküldte az adatait!</h2>
          <p>Nemsokára küldjük a weboldala első verzióját. Addig is, ha kérdése van, írjon nekünk: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        `,
      });
    } catch (confirmErr) {
      console.error('[epitoipari-weboldal] visszaigazoló email sikertelen', confirmErr);
    }

    const consultationAudienceId = process.env.RESEND_CONSULTATION_AUDIENCE_ID;
    if (consultationAudienceId) {
      try {
        await resend.contacts.create({
          email,
          firstName: nev,
          audienceId: consultationAudienceId,
          unsubscribed: false,
        });
      } catch (audienceErr) {
        console.error('[epitoipari-weboldal] audience hozzáadás sikertelen', audienceErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[epitoipari-weboldal]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
