import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const guideToken = process.env.GUIDE_TOKEN;

  if (!guideToken || token !== guideToken) {
    return Response.redirect(new URL('/landing', request.url), 302);
  }

  const htmlPath = join(process.cwd(), 'public', 'epitoiparosoknak', 'utmutato.html');

  if (!existsSync(htmlPath)) {
    return new Response(
      `<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8"><title>Hamarosan — NEZOR</title></head>
       <body style="font-family:sans-serif;text-align:center;padding:80px 20px;background:#f0f4ff">
       <h1 style="color:#0f1226">Az útmutató hamarosan elérhető</h1>
       <p style="color:#5a6079">Köszönjük a türelmet!</p>
       <p><a href="/" style="color:#0099b8">Vissza a főoldalra</a></p></body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const html = readFileSync(htmlPath, 'utf8');
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
