import { resend } from '@/lib/resend';

const UNSUBSCRIBE_HTML = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leiratkozás — NEZOR</title>
  <style>
    body { font-family: 'Inter', sans-serif; background: #f0f4ff; color: #0f1226;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; text-align: center; padding: 24px; }
    .card { background: #fff; border-radius: 20px; padding: 48px 40px;
            max-width: 460px; box-shadow: 0 20px 60px rgba(0,150,200,0.12); }
    h1 { font-size: 1.8rem; font-weight: 900; margin-bottom: 14px; }
    p { color: #5a6079; line-height: 1.6; margin-bottom: 28px; }
    a { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg,#00e5ff,#ffe600);
        color: #000; font-weight: 700; border-radius: 100px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Sikeresen leiratkoztál</h1>
    <p>Nem küldünk több emailt erre a címre. Ha meggondolod magad, bármikor visszajelentkezhetsz.</p>
    <a href="/">Vissza a főoldalra</a>
  </div>
</body>
</html>`;

const ERROR_HTML = `<!DOCTYPE html>
<html lang="hu">
<head><meta charset="UTF-8"><title>Hiba — NEZOR</title>
<style>body{font-family:sans-serif;text-align:center;padding:80px 20px;color:#0f1226}
a{color:#0099b8}</style></head>
<body><h1>Hiba történt</h1><p>Érvénytelen leiratkozási link.</p>
<a href="/">Vissza a főoldalra</a></body></html>`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!email || !audienceId) {
    return new Response(ERROR_HTML, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  try {
    const contacts = await resend.contacts.list({ audienceId });
    const contact = (contacts.data?.data as Array<{ id: string; email: string }> | undefined)?.find(
      (c) => c.email === email
    );

    if (contact) {
      await resend.contacts.update({
        id: contact.id,
        audienceId,
        unsubscribed: true,
      });
    }

    return new Response(UNSUBSCRIBE_HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('[leiratkozas]', err);
    return new Response(ERROR_HTML, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
