import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, email, telefon } = await request.json() as { nev: string; email: string; telefon?: string };

    if (!nev || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Új kapcsolatfelvétel — ${esc(nev)}`,
      html: `
        <h2>Új üzenet a főoldali kapcsolat formból</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${telefon ? `<p><strong>Telefon:</strong> ${esc(telefon)}</p>` : ''}
      `,
    });

    // Konzultációra jelentkezők külön Resend audience-be kerülnek
    // (elkülönítve az ingyenes útmutatóra feliratkozóktól)
    const consultationAudienceId = process.env.RESEND_CONSULTATION_AUDIENCE_ID ?? 'b917e4be-6c72-407e-bc4d-7bd923578252';
    try {
      await resend.contacts.create({
        email,
        firstName: nev,
        audienceId: consultationAudienceId,
        unsubscribed: false,
      });
    } catch (audienceErr) {
      console.error('[contact] audience hozzáadás sikertelen', audienceErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
