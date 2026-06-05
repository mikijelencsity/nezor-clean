import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, NOTIFY_EMAIL, isValidEmail } from '@/lib/resend';
import { sendCapiEvent } from '@/lib/meta-capi';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, eventId: clientEventId } = await request.json() as { email: string; eventId?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Érvénytelen email cím' }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const guideToken = process.env.GUIDE_TOKEN ?? 'guide';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nezor.hu';

    if (!audienceId) {
      return NextResponse.json({ error: 'Szerver konfiguráció hiányzik' }, { status: 500 });
    }

    // 1. Resend audience-be menti
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    // Token az emailben: cross-device eléréshez (cookie nincs más eszközön)
    const accessToken = Buffer.from(`${email}:${guideToken ?? 'guide'}`).toString('base64url');
    const guideUrl = `${siteUrl}/nezor-utmutato?t=${accessToken}`;

    // 2. Welcome email az usernek
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Az ingyenes útmutatód megérkezett',
      html: `
        <h2>Szia!</h2>
        <p>Köszönjük a feliratkozást. Az 5 lépéses ügyfélszerzési útmutatódat itt éred el:</p>
        <p><a href="${guideUrl}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#00e5ff,#ffe600);color:#000;font-weight:700;text-decoration:none;border-radius:8px;">Megnyitom az útmutatót →</a></p>
        <p style="font-size:13px;color:#666;">Ha nem iratkoztál fel, figyelmen kívül hagyhatod ezt az emailt.<br>
        Leiratkozás: <a href="${siteUrl}/api/leiratkozas?email=${encodeURIComponent(email)}">kattints ide</a></p>
        <p>— NEZOR csapata</p>
      `,
    });

    // 3. Meta CAPI — szerver oldali Lead event (deduplikálva a browser pixellel)
    const siteUrl2 = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nezor.hu';
    const eventId = clientEventId ?? crypto.randomUUID();
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined;
    const clientUserAgent = request.headers.get('user-agent') ?? undefined;
    void sendCapiEvent({
      email,
      eventName: 'Lead',
      eventId,
      sourceUrl: `${siteUrl2}/landing`,
      clientIp,
      clientUserAgent,
    });

    // 4. Értesítő nekünk
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Új feliratkozó — ${email}`,
      html: `<p>Új feliratkozó: <strong>${email}</strong></p>`,
    });

    const response = NextResponse.json({ ok: true, guideUrl });
    // Süti beállítása: 30 napig érvényes, httpOnly a biztonságért
    response.cookies.set('guide_access', '1', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 nap
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}
