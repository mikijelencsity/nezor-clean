import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { nev, email } = await request.json() as { nev: string; email: string };

    if (!nev || !email) {
      return NextResponse.json({ error: 'Hiányzó mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Új kapcsolatfelvétel — ${nev}`,
      html: `
        <h2>Új üzenet a főoldali kapcsolat formból</h2>
        <p><strong>Név:</strong> ${nev}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
