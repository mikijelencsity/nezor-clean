import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, cegnev, tevekenyseg, email, telefon, sablon, website } = await request.json() as {
      nev: string;
      cegnev: string;
      tevekenyseg: string;
      email: string;
      telefon: string;
      sablon: string;
      website?: string;
    };

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!nev || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL, 'mullerdanielev@gmail.com'],
      subject: `[NEZOR] Gyors weboldal megrendelés — ${esc(nev)}`,
      html: `
        <h2>"2 napon belül kell weboldal?" megrendelés</h2>
        <p><strong>Kiválasztott design:</strong> ${esc(sablon)}</p>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev)}</p>
        <p><strong>Tevékenység:</strong> ${esc(tevekenyseg)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        <p>Vegyük fel vele a kapcsolatot, és kérjük el a szövegeket/képeket a kiválasztott designhoz.</p>
      `,
    });

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
        console.error('[gyors-weboldal] audience hozzáadás sikertelen', audienceErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[gyors-weboldal]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
