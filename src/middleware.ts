import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['de', 'fr', 'en', 'it'],

  // Used when no locale matches
  defaultLocale: 'de',

  // Disable automatic browser language detection so search engines and default traffic always default to German
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Direct permanent 301 redirects for consolidated duplicate Endreinigung Biel URLs
  const localeMatch = pathname.match(/^\/(de|fr|en|it)\/endreinigung-biel-bienne\/?$/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const url = new URL(`/${locale}/umzugsreinigung-biel-bienne${search}`, request.url);
    return NextResponse.redirect(url, 301);
  }

  if (pathname === '/endreinigung-biel-bienne' || pathname === '/endreinigung-biel-bienne/') {
    const url = new URL(`/de/umzugsreinigung-biel-bienne${search}`, request.url);
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(de|fr|en|it)/:path*', '/admin/:path*', '/admin']
};
