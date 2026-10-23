import { lemondSorozat } from '@/lib/epitoipar-emlekezteto';

// Leiratkozás a félbehagyott jelentkezés utáni levélsorozatról: lemondja a még ki nem ment leveleket.
// A linkben a hátralévő levelek véletlen azonosítói vannak, így csak a címzett tudja használni.
export async function GET(request: Request) {
  const ids = new URL(request.url).searchParams.get('ids') ?? '';
  await lemondSorozat(ids);
  return new Response(
    `<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Leiratkoztál | NEZOR</title></head>
    <body style="margin:0;padding:48px 20px;font-family:Arial,sans-serif;background:#f9f9f9;color:#111;text-align:center">
      <h1 style="font-size:28px">Rendben, nem írunk többet.</h1>
      <p style="font-size:16px;color:#444">A hátralévő leveleinket töröltük.</p>
      <p style="font-size:16px;color:#444">Ha mégis kérdésed van: <b>+36 30 203 6721</b> · info@nezor.hu</p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
