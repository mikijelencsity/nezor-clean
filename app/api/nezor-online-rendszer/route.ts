import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const {
      nev, cegnev, email, telefon, tevekenyseg, vanWeboldal, futottHirdetes, hirdetesiKeret,
      csomag, uzenet, website,
    } = await request.json() as {
      nev: string;
      cegnev?: string;
      email: string;
      telefon: string;
      tevekenyseg?: string;
      vanWeboldal?: string;
      futottHirdetes?: string;
      hirdetesiKeret?: string;
      csomag?: string;
      uzenet?: string;
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
      subject: `[NEZOR] Próbahónap jelentkezés — ${esc(nev)}`,
      html: `
        <h2>NEZOR havi ügyfélszerző rendszer — próbahónap jelentkezés</h2>
        <p><strong>Név:</strong> ${esc(nev)}</p>
        <p><strong>Vállalkozás:</strong> ${esc(cegnev || '-')}</p>
        <p><strong>Tevékenység / iparág:</strong> ${esc(tevekenyseg || '-')}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Telefon:</strong> ${esc(telefon)}</p>
        <p><strong>Van weboldala:</strong> ${esc(vanWeboldal || '-')}</p>
        <p><strong>Futott már Meta hirdetése:</strong> ${esc(futottHirdetes || '-')}</p>
        <p><strong>Tervezett havi hirdetési keret:</strong> ${esc(hirdetesiKeret || '-')}</p>
        ${csomag ? `<p><strong>Érdeklődik:</strong> ${esc(csomag)}</p>` : ''}
        ${uzenet ? `<p><strong>Üzenet:</strong> ${esc(uzenet)}</p>` : ''}
        <p>Vegyük fel vele a kapcsolatot a próbahónap miatt.</p>
      `,
    });

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'Megkaptuk a kérésed — NEZOR',
        html: `
          <h2>Köszönjük, hamarosan keresünk</h2>
          <p>24 órán belül felvesszük veled a kapcsolatot, hogy megnézzük, van-e értelme elindítani a 19.000 Ft-os próbahónapot nálad.</p>
          <p>Addig is, ha kérdésed van: <a href="mailto:info@nezor.hu">info@nezor.hu</a></p>
        `,
      });
    } catch (confirmErr) {
      console.error('[nezor-online-rendszer] visszaigazoló email sikertelen', confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[nezor-online-rendszer]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
