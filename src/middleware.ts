// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const defaultLocale = 'en';
const locales = ['en', 'fr', 'it', 'de'];

// Create the middleware configuration
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // This is the key setting
});

// Export the middleware
export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

// Configure matching paths
export const config = {
  matcher: ['/', '/(fr|it)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
