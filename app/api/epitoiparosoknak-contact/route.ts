import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, email, uzenet } = await request.json() as {
      nev: string;
      email: string;
      uzenet?: string;
    };

    if (!nev || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Útmutató oldal érdeklődő — ${esc(nev)}`,
      html: `
        <h2>Érdeklődő az útmutató oldalról</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${uzenet ? `<p><strong>Üzenet:</strong> ${esc(uzenet)}</p>` : ''}
      `,
    });

    // Ugyanabba a konzultációs audience-be kerül, mint a főoldali kapcsolat-form
    // jelentkezői — mindkettő "vegyétek fel velem a kapcsolatot" típusú érdeklődés
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
        console.error('[epitoiparosoknak-contact] audience hozzáadás sikertelen', audienceErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[epitoiparosoknak-contact]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
