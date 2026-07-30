import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen email cím' }, { status: 400 });
    }

    // A lead értesítő címzettjei (duplikáció kiszűrve)
    const ertesitok = [...new Set([NOTIFY_EMAIL, 'mullerdanielev@gmail.com'])];

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ertesitok,
      subject: `[NEZOR] Új feliratkozó – kampánypélda + 3 tipp — ${esc(email)}`,
      html: `
        <h2>Új feliratkozó a landing oldalról (még nem döntött)</h2>
        <p><strong>Email:</strong> ${esc(email)}</p>
      `,
    });
    if (sendError) {
      console.error('[landing-magnet] értesítő email sikertelen', sendError);
      return NextResponse.json({ error: 'Email küldés sikertelen' }, { status: 500 });
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Egy valós kampánypélda + 3 tipp — NEZOR',
        html: `
          <h2>Íme egy valós kampánypélda</h2>
          <p>
            Az egyik ügyfelünknél, a <strong>Forint - Soft Kft.</strong>-nél 1 hónap alatt
            <strong>6× megtérülést</strong> hozott a hirdetési kampány — a landing oldal + a hirdetés
            együtt dolgozott, nem csak a kreatív.
          </p>
          <h3>3 tipp, amivel már ma elindulhatsz:</h3>
          <ol>
            <li><strong>Egy jó hirdetés nem elad — bizalmat épít.</strong> Mutass valós munkát, ne stockfotót.</li>
            <li><strong>A landing oldalad legyen egyetlen célra kihegyezve:</strong> az ajánlatkérésre. Minden felesleges elem rontja a konverziót.</li>
            <li><strong>Mérd, honnan jönnek az érdeklődők</strong> — enélkül csak találgatsz, mi működik.</li>
          </ol>
          <p>Ha szeretnéd, hogy ezt neked is felépítsük: <a href="https://nezor.hu/landing">nezor.hu/landing</a></p>
          <p>Kérdésed van? Írj: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        `,
      });
    } catch (confirmErr) {
      console.error('[landing-magnet] tartalom email sikertelen', confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[landing-magnet]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
