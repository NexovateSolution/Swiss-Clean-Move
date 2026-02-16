import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['de', 'fr', 'en', 'nl'],

  // Used when no locale matches
  defaultLocale: 'de'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const url = request.nextUrl.clone();
    url.pathname = `/de${pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(de|fr|en|nl)/:path*', '/admin/:path*', '/admin']
};
