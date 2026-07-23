import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

/**
 * Ha be van állítva, a szerver oldali események megjelennek a Meta
 * "Események tesztelése" fülén is. ÉLESBEN HAGYD ÜRESEN — teszt kód mellett
 * a Meta nem számolja be rendesen az eseményeket.
 */
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

function hashSha256(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

/** Telefonszám normalizálása a Meta elvárása szerint: csak számjegyek, országhívóval */
function normalizePhone(raw: string): string | undefined {
  let d = raw.replace(/\D/g, '');
  if (!d) return undefined;
  if (d.startsWith('00')) d = d.slice(2);          // 0036... -> 36...
  else if (d.startsWith('06')) d = '36' + d.slice(2); // 0630... -> 3630...
  else if (d.startsWith('0')) d = '36' + d.slice(1);  // 030...  -> 3630...
  if (!d.startsWith('36') && d.length <= 9) d = '36' + d; // 30123... -> 3630123...
  return d.length >= 10 ? d : undefined;
}

interface CapiOptions {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  email?: string;
  phone?: string;
  /** teljes név — szóköz mentén vezeték-/keresztnévre bontjuk */
  fullName?: string;
  clientIp?: string;
  clientUserAgent?: string;
  /** _fbp és _fbc cookie — jelentősen javítja a párosítást és az attribúciót */
  fbp?: string;
  fbc?: string;
  testEventCode?: string;
}

export async function sendCapiEvent({
  eventName,
  eventId,
  sourceUrl,
  email,
  phone,
  fullName,
  clientIp,
  clientUserAgent,
  fbp,
  fbc,
  testEventCode,
}: CapiOptions): Promise<void> {
  if (!PIXEL_ID || !CAPI_TOKEN) return; // silent skip ha nincs konfigurálva

  const tel = phone ? normalizePhone(phone) : undefined;

  // magyar sorrend: "Kovács László" -> ln: kovács, fn: lászló
  let fn: string | undefined;
  let ln: string | undefined;
  if (fullName?.trim()) {
    const reszek = fullName.trim().split(/\s+/);
    if (reszek.length >= 2) {
      ln = reszek[0];
      fn = reszek.slice(1).join(' ');
    } else {
      fn = reszek[0];
    }
  }

  const user_data: Record<string, unknown> = {
    ...(email && { em: hashSha256(email) }),
    ...(tel && { ph: hashSha256(tel) }),
    ...(fn && { fn: hashSha256(fn) }),
    ...(ln && { ln: hashSha256(ln) }),
    ...(clientIp && { client_ip_address: clientIp }),
    ...(clientUserAgent && { client_user_agent: clientUserAgent }),
    ...(fbp && { fbp }),
    ...(fbc && { fbc }),
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // deduplikációhoz — egyezik a browser pixel event_id-jével
        event_source_url: sourceUrl,
        action_source: 'website',
        user_data,
      },
    ],
    ...((testEventCode ?? TEST_EVENT_CODE) && {
      test_event_code: testEventCode ?? TEST_EVENT_CODE,
    }),
  };

  try {
    const res = await fetch(`${CAPI_URL}?access_token=${CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[CAPI] Meta error:', err);
    }
  } catch (err) {
    console.error('[CAPI] fetch error:', err);
  }
}

/** A kérésből kiszedi az IP-t, user agentet és a Meta cookie-kat */
export function capiContext(request: Request) {
  const h = request.headers;
  const cookie = h.get('cookie') ?? '';
  const cookieValue = (nev: string) =>
    cookie.match(new RegExp(`(?:^|;\\s*)${nev}=([^;]+)`))?.[1];

  return {
    clientIp: (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || undefined,
    clientUserAgent: h.get('user-agent') ?? undefined,
    fbp: cookieValue('_fbp'),
    fbc: cookieValue('_fbc'),
    sourceUrl: h.get('referer') ?? undefined,
  };
}
