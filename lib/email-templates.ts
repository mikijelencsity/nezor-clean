/** Közös, márkázott email-keret — táblázat-alapú elrendezés a levelezőkliens-kompatibilitásért (Outlook stb.) */
function emailShell({ preheader, bodyHtml, siteUrl }: { preheader: string; bodyHtml: string; siteUrl: string }): string {
  return `<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#0f1226;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#0f1226;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f1226;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#161a35;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
            <tr>
              <td align="center" style="padding:32px 32px 24px;">
                <span style="font-size:22px;font-weight:900;letter-spacing:0.02em;color:#fff;">NEZ<span style="color:#0EA5E9;">OR</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td align="center" style="padding:24px 16px 0;color:rgba(255,255,255,0.4);font-size:12px;line-height:1.6;">
                © ${new Date().getFullYear()} NEZOR Webfejlesztés · <a href="mailto:info@nezor.hu" style="color:rgba(255,255,255,0.5);">info@nezor.hu</a><br />
                <a href="${siteUrl}/adatkezeles" style="color:rgba(255,255,255,0.4);text-decoration:underline;">Adatkezelési tájékoztató</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ctaButton(label: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
    <tr>
      <td align="center" style="border-radius:10px;background:linear-gradient(135deg,#00e5ff,#ffe600);">
        <a href="${url}" style="display:inline-block;padding:15px 32px;font-weight:800;font-size:15px;color:#0f1226;text-decoration:none;border-radius:10px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

/** Az "5 lépéses ügyfélszerzési útmutató" feliratkozás után kiküldött üdvözlő email */
export function guideWelcomeEmail({ guideUrl, unsubscribeUrl, siteUrl }: { guideUrl: string; unsubscribeUrl: string; siteUrl: string }): string {
  const body = `
    <h1 style="margin:0 0 4px;font-size:21px;font-weight:800;color:#fff;letter-spacing:-0.01em;">Megérkezett az ingyenes útmutatód 🎉</h1>
    <p style="margin:16px 0 0;">Szia!</p>
    <p style="margin:10px 0 0;">Köszönjük a feliratkozást. Az <strong>„5 lépéses ügyfélszerzési útmutatót"</strong> és a 10%-os kuponkódot az alábbi gombra kattintva éred el — bármikor, bármelyik eszközödről.</p>
    ${ctaButton('Megnyitom az útmutatót →', guideUrl)}
    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Ha a gomb nem működne, másold be ezt a linket a böngésződbe:<br />
    <a href="${guideUrl}" style="color:#0EA5E9;word-break:break-all;">${guideUrl}</a></p>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0;" />
    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">Ha nem te iratkoztál fel, nyugodtan hagyd figyelmen kívül ezt az emailt — nem fogunk több levelet küldeni.<br />
    Amennyiben mégis kaptál volna tőlünk korábban levelet és nem szeretnél többet: <a href="${unsubscribeUrl}" style="color:rgba(255,255,255,0.6);text-decoration:underline;">leiratkozás itt</a>.</p>
    <p style="margin:20px 0 0;">Sok sikert az ügyfélszerzéshez! 💪<br /><strong>— a NEZOR csapata</strong></p>
  `;
  return emailShell({ preheader: 'Itt az „5 lépéses ügyfélszerzési útmutató" + a 10% kuponkódod.', bodyHtml: body, siteUrl });
}
