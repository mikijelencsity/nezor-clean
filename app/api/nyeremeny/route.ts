import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Érvénytelen email' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Nyereményjáték jelentkező — ${esc(email)}`,
      html: `
        <h2>Nyereményjáték: új jelentkező</h2>
        <p><strong>Email:</strong> ${esc(email)}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[nyeremeny]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
