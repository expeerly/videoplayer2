/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from 'next';
import {
  getAllBrands,
  getAllCategories,
  getAllCreatorsSlug,
  getAllVideos,
} from './actions/actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Lang = 'en' | 'de' | 'fr' | 'it' | 'x-default';
type HrefLangs = Record<Lang, string>;
type Entry = { url: string; lastModified?: string; alternates?: { languages: HrefLangs } };

const LANGS: Lang[] = ['en', 'de', 'fr', 'it', 'x-default'];

function makeLangMap(
  base: string,
  localized: (l: Exclude<Lang, 'x-default'>) => string
): HrefLangs {
  const m = {} as HrefLangs;
  for (const l of LANGS) {
    m[l] = l === 'x-default' ? base : localized(l);
  }
  return m;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ENV_BASE = process.env.SITEBASEURL?.replace(/\/+$/, '');
  const BASE = ENV_BASE && ENV_BASE.startsWith('http') ? ENV_BASE : 'https://www.expeerly.com';

  let videos: any[] = [];
  let brands: any[] = [];
  let categories: any[] = [];
  let creators: any[] = [];

  try {
    const [v, b, c, cr] = await Promise.allSettled([
      getAllVideos('en'),
      getAllBrands('en'),
      getAllCategories('en'),
      getAllCreatorsSlug(),
    ]);
    if (v.status === 'fulfilled') videos = v.value?.data || [];
    if (b.status === 'fulfilled') brands = b.value?.data || [];
    if (c.status === 'fulfilled') categories = c.value?.data || [];
    if (cr.status === 'fulfilled') creators = cr.value?.data || [];
  } catch {
    // swallow — sitemap should never 500
  }

  const entries: Entry[] = [];

  // Home
  entries.push({
    url: BASE,
    lastModified: new Date().toISOString(),
    alternates: { languages: makeLangMap(BASE, l => (l === 'en' ? BASE : `${BASE}/${l}`)) },
  });

  // Reviews index
  entries.push({
    url: `${BASE}/video-reviews`,
    alternates: {
      languages: makeLangMap(`${BASE}/video-reviews`, l =>
        l === 'en' ? `${BASE}/video-reviews` : `${BASE}/${l}/video-reviews`
      ),
    },
  });

  // Brand pages
  for (const brand of brands) {
    const slug = brand?.slug;
    if (!slug) continue;
    const baseUrl = `${BASE}/video-reviews/brand/${slug}`;
    entries.push({
      url: baseUrl,
      alternates: {
        languages: makeLangMap(baseUrl, l =>
          l === 'en' ? baseUrl : `${BASE}/${l}/video-reviews/brand/${slug}`
        ),
      },
    });
  }

  // Creator pages
  for (const cr of creators) {
    const slug = cr?.slug;
    if (!slug) continue;
    const baseUrl = `${BASE}/video-reviews/reviewers/${slug}`;
    entries.push({
      url: baseUrl,
      alternates: {
        languages: makeLangMap(baseUrl, l =>
          l === 'en' ? baseUrl : `${BASE}/${l}/video-reviews/reviewers/${slug}`
        ),
      },
    });
  }

  // Category pages (consistent path)
  for (const cat of categories) {
    const catData = cat?.categoryData as
      | Record<'en' | 'de' | 'fr' | 'it', { urlSlug?: string }>
      | undefined;
    const enSlug = catData?.en?.urlSlug;
    if (!enSlug) continue;

    const baseUrl = `${BASE}/video-reviews/productcategory/${enSlug}`;
    entries.push({
      url: baseUrl,
      alternates: {
        languages: makeLangMap(baseUrl, l => {
          if (l === 'en') return baseUrl;
          const locSlug = catData?.[l]?.urlSlug || enSlug;
          return `${BASE}/${l}/video-reviews/productcategory/${locSlug}`;
        }),
      },
    });
  }

  // Detail pages (skip incomplete)
  for (const v of videos) {
    const id = v?.id;
    const categorySlug = v?.category?.slug;
    const brandSlug = v?.brand?.brandSlug;
    const productSlug = v?.product?.productSlug;
    if (!id || !categorySlug || !brandSlug || !productSlug) continue;

    const baseUrl = `${BASE}/video-reviews/${categorySlug}/${brandSlug}/${productSlug}/${id}`;
    const cat = categories.find((c: any) => c?.categoryData?.en?.urlSlug === categorySlug);
    const catData = cat?.categoryData as
      | Record<'en' | 'de' | 'fr' | 'it', { urlSlug?: string }>
      | undefined;

    entries.push({
      url: baseUrl,
      alternates: {
        languages: makeLangMap(baseUrl, l => {
          if (l === 'en') return baseUrl;
          const locCatSlug = catData?.[l]?.urlSlug || categorySlug;
          return `${BASE}/${l}/video-reviews/${locCatSlug}/${brandSlug}/${productSlug}/${id}`;
        }),
      },
    });
  }

  return entries as MetadataRoute.Sitemap;
}
