// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { getAllCategories } from '@/src/app/actions/actions';
import { Languages } from '@/src/db/types';

const defaultLocale = 'en';
const locales = ['en', 'fr', 'it', 'de'];

let requestCount = 0;
const MAX_REQUESTS = 5;
const TIME_WINDOW = 60000;

let categoriesCache: {
  data: Awaited<ReturnType<typeof getAllCategories>>;
  timestamp: number;
} | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

setInterval(() => {
  requestCount = 0;
}, TIME_WINDOW);

async function getCategoriesData() {
  if (categoriesCache && Date.now() - categoriesCache.timestamp < CACHE_DURATION) {
    return categoriesCache.data;
  }

  const categories = await getAllCategories('en');
  categoriesCache = {
    data: categories,
    timestamp: Date.now(),
  };
  return categories;
}

async function findMatchingCategory(urlSlug: string) {
  const categories = await getCategoriesData();
  return categories.data.find(category =>
    Object.values(category.categoryData).some(
      data => data.urlSlug.toLowerCase() === urlSlug.toLowerCase()
    )
  );
}

async function getTranslatedSlug(currentSlug: string, currentLocale: Languages) {
  const category = await findMatchingCategory(currentSlug);
  if (!category) return currentSlug;

  return category.categoryData[currentLocale]?.urlSlug || currentSlug;
}

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

  if (isAdminRoute) {
    if (!session && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (session && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return response;
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

async function handleCategoryTranslation(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const currentLocale = locales.includes(pathname.split('/')[1])
    ? pathname.split('/')[1]
    : defaultLocale;
  const pathParts = pathname.split('/');
  if (pathParts.length >= 4) {
    const categoryNum = pathParts.length === 4 ? 2 : 3;
    const categorySlug = pathParts[categoryNum];

    const translatedSlug = await getTranslatedSlug(categorySlug, currentLocale as Languages);

    if (translatedSlug !== categorySlug) {
      pathParts[categoryNum] = translatedSlug;
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = pathParts.join('/');
      return NextResponse.redirect(newUrl);
    }
  }

  return response;
}

export async function middleware(request: NextRequest) {
  // Handle authentication
  const authResponse = await authMiddleware(request);
  if (authResponse.headers.has('Location')) {
    return authResponse;
  }

  // Handle internationalization
  const intlResponse = intlMiddleware(request);

  // Handle category translation
  return handleCategoryTranslation(request, intlResponse);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*'],
};
