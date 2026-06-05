import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/nezor-utmutato') {
    const hasCookie = request.cookies.get('guide_access')?.value === '1';
    const urlToken = searchParams.get('t');

    // Token az URL-ben (email linkből) — elfogadjuk és sütiként beállítjuk
    if (urlToken) {
      const response = NextResponse.next();
      response.cookies.set('guide_access', '1', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      return response;
    }

    // Süti megvan — beenged
    if (hasCookie) {
      return NextResponse.next();
    }

    // Sem token, sem süti — redirect /landing-re
    const url = request.nextUrl.clone();
    url.pathname = '/landing';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/nezor-utmutato'],
};
