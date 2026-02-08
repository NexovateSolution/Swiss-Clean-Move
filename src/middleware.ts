import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr', 'nl'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|de|fr|nl)/:path*', '/admin/:path*', '/admin']
};
