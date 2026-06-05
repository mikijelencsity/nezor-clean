import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, email, telefon } = await request.json() as { nev: string; email: string; telefon?: string };

    if (!nev || !email) {
      return NextResponse.json({ error: 'Hiányzó mezők' }, { status: 400 });
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
