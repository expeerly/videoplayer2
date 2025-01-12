// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const defaultLocale = 'en';
const locales = ['en', 'fr', 'it', 'de'];

async function authMiddleware(request: NextRequest) {
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
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
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
