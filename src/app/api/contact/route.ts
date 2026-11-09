import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, NOTIFY_EMAIL, esc, isValidEmail } from "@/lib/resend";

type Body = {
  answers?: Record<string, string>;
  name?: string;
  phone?: string;
  email?: string;
  site?: string;
  message?: string;
};

const LABELS: Record<string, string> = {
  szolgaltatas: "Érdeklődés tárgya",
  kiindulas: "Honnan indult",
  meglevo: "Meglévő oldal",
  cim: "Mostani oldal címe",
  hirdetes_ajanlat: "Hirdetés kedvezménnyel",
  weboldal_allapot: "Weboldal állapota",
  weboldal_ajanlat: "Weboldal soron kívül",
  fb: "Facebook-hirdetés",
  csatornak: "Jelenlegi ügyfélszerzés",
  leiras: "Tevékenység",
  keret: "Havi hirdetési keret",
  hivas: "Hívás módja",
  idopont: "Választott Zoom-időpont",
  hozzajarulas: "Adatkezelés, e-mailes ajánlat, Meta-mérés elfogadva",
};

export async function POST(request: Request) {
  try {
    const { answers = {}, name, phone, email, site, message } = (await request.json()) as Body;

    if (!name || !email || !phone || !isValidEmail(email)) {
      return NextResponse.json({ error: "Hiányzó vagy érvénytelen mezők" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Szerver konfiguráció hiányzik" }, { status: 500 });
    }

    const rows = Object.entries(answers)
      .map(([k, v]) => `<p><strong>${esc(LABELS[k] ?? k)}:</strong> ${esc(String(v))}</p>`)
      .join("");

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `[NEZOR] Új konzultáció-kérés${answers.szolgaltatas ? ` (${esc(answers.szolgaltatas)})` : ""} — ${esc(name)}`,
      html: `
        <h2>Új kérés a konzultáció-űrlapról</h2>
        <p><strong>Név:</strong> ${esc(name)}</p>
        <p><strong>Telefon:</strong> ${esc(phone)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${site ? `<p><strong>Weboldal / Facebook:</strong> ${esc(site)}</p>` : ""}
        ${message ? `<p><strong>Üzenet:</strong> ${esc(message)}</p>` : ""}
        <hr />
        ${rows}
      `,
    });

    // A konzultációra jelentkezők külön Resend audience-be kerülnek, mint az éles nezor.hu-n.
    const audienceId = process.env.RESEND_CONSULTATION_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({ email, firstName: name, audienceId, unsubscribed: false });
      } catch (audienceErr) {
        console.error("[contact] audience hozzáadás sikertelen", audienceErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Szerver hiba" }, { status: 500 });
  }
}
