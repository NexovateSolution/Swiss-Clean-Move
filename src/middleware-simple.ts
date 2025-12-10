import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  // Skip internationalization for admin and API routes
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Apply internationalization to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
