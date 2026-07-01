import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const {
      nev, cegnev, email, telefon, szakma, megjegyzes, website,
    } = await request.json() as {
      nev: string;
      cegnev?: string;
      email: string;
      telefon: string;
      szakma: string;
      megjegyzes?: string;
      website?: string;
    };

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!nev || !telefon || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Hiányzó vagy érvénytelen mezők' }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      subject: `[NEZOR] Online megjelenés átnézés kérés — ${esc(nev)}`,
      html: `
        <h2>Online megjelenés átnézés kérés (Ügyfélszerző Rendszer)</h2>
        <p><strong>Vállalkozás típusa:</strong> ${esc(szakma)}</p>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev || '-')}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        ${megjegyzes ? `<p><strong>Megjegyzés:</strong> ${esc(megjegyzes)}</p>` : ''}
        <p>Nézzük át, mit lát most ez a vállalkozás Google-ben, weben és mobilon.</p>
      `,
    });

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Megkaptuk a kérésed — NEZOR',
        html: `
          <h2>Köszönjük, hamarosan jövünk az átnézéssel</h2>
          <p>24 órán belül felvesszük veled a kapcsolatot, és megmutatjuk, mit lát most rólad egy érdeklődő Google-ben, weben és mobilon.</p>
          <p>Addig is, ha kérdésed van: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        `,
      });
    } catch (confirmErr) {
      console.error('[ugyfelszerzo-rendszer] visszaigazoló email sikertelen', confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[ugyfelszerzo-rendszer]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
