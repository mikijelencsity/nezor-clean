import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Csak a /nezor-utmutato oldalt védjük
  if (pathname === '/nezor-utmutato') {
    const hasAccess = request.cookies.get('guide_access')?.value === '1';

    if (!hasAccess) {
      const url = request.nextUrl.clone();
      url.pathname = '/landing';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/nezor-utmutato'],
};
