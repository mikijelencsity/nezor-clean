import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Érvénytelen email cím" }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId || !process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Szerver konfiguráció hiányzik" }, { status: 500 });
    }

    await resend.contacts.create({ email, audienceId, unsubscribed: false });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `[NEZOR] Új feliratkozó — ${esc(email)}`,
      html: `<p>Új hírlevél-feliratkozó: <strong>${esc(email)}</strong></p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ error: "Szerver hiba" }, { status: 500 });
  }
}
