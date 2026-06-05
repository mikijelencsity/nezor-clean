import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

function hashSha256(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

interface CapiOptions {
  email: string;
  eventName: string;
  eventId: string;
  sourceUrl: string;
  clientIp?: string;
  clientUserAgent?: string;
  testEventCode?: string;
}

export async function sendCapiEvent({
  email,
  eventName,
  eventId,
  sourceUrl,
  clientIp,
  clientUserAgent,
  testEventCode,
}: CapiOptions): Promise<void> {
  if (!PIXEL_ID || !CAPI_TOKEN) return; // silent skip ha nincs konfigurálva

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // deduplikációhoz — egyezik a browser pixel event_id-jével
        event_source_url: sourceUrl,
        action_source: 'website',
        user_data: {
          em: hashSha256(email), // email hash — Meta követelmény
          ...(clientIp && { client_ip_address: clientIp }),
          ...(clientUserAgent && { client_user_agent: clientUserAgent }),
        },
      },
    ],
    ...(testEventCode && { test_event_code: testEventCode }),
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
