// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const defaultLocale = 'en';
const locales = ['en', 'fr', 'it', 'de'];

let requestCount = 0;
const MAX_REQUESTS = 5; // Maximum requests allowed
const TIME_WINDOW = 60000; // Time window in milliseconds (1 minute)

setInterval(() => {
  requestCount = 0; // Reset the count every minute
}, TIME_WINDOW);

async function authMiddleware(request: NextRequest) {
  if (requestCount >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  requestCount++;

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [...request.cookies.getAll()].map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookies) {
          cookies.forEach(cookie => {
            response.cookies.set({
              name: cookie.name,
              value: cookie.value,
              ...cookie.options,
            });
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAdminRoute = request.nextUrl.pathname.includes('/admin');
  const isLoginPage = request.nextUrl.pathname.includes('/admin/login');

  // Handle authentication for admin routes
  if (isAdminRoute) {
    if (!session && !isLoginPage) {
      // Redirect to login if not authenticated and not on login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (session && isLoginPage) {
      // Redirect to admin dashboard if authenticated and on login page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return response;
}

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Combine both middlewares
export async function middleware(request: NextRequest) {
  // First check authentication for admin routes
  const authResponse = await authMiddleware(request);

  // If auth middleware redirected, return that response
  if (authResponse.headers.has('Location')) {
    return authResponse;
  }

  // Otherwise, continue with internationalization
  return intlMiddleware(request);
}

export const config = {
  // Matcher entries are connected with OR
  matcher: [
    // Match all pathnames except for
    // - /api, /_next, /_vercel, /static, /public, /favicon.ico, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all admin routes
    '/admin/:path*',
  ],
};
