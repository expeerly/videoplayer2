import { db } from '@/src/db';
import { brand, category, product, video } from '@/src/db/schema';
import { and, eq, exists, SQL, sql } from 'drizzle-orm';
import { Brand, BrandInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';
import { getFilters, isValidBrand } from './queries';

export async function handleCreateBrand(input: BrandInputType[]): Promise<Brand[]> {
  if (!input || !Array.isArray(input)) {
    throw new Error('Input must be an array of brands');
  }

  try {
    const data = await db
      .insert(brand)
      .values(input)
      .onConflictDoUpdate({
        target: brand.id,
        set: {
          brandName: sql`EXCLUDED."brandName"`,
          brandData: sql`EXCLUDED."brandData"`,
          logo: sql`EXCLUDED."logo"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('No brands found');
      return [];
    }
  } catch (error) {
    console.error('Error creating/updating brands:', error);
    throw new Error((error as Error).message);
  }
}

export async function getBrandsCount(condition?: SQL<unknown>): Promise<{ count: number }> {
  try {
    const count = await db.$count(brand, condition);
    return { count };
  } catch (error) {
    console.error('Error fetching brand count:', error);
    throw new Error((error as Error).message);
  }
}

export const getBrandsInfo = async (
  columns = {},
  { page = 1, limit = 0, random = false } = {},
  condition?: SQL<unknown>
) => {
  const baseQuery = db
    .select(columns)
    .from(brand)
    .innerJoin(product, eq(brand.id, product.brandId))
    .where(and(isValidBrand, condition))
    .groupBy(brand.id)
    .orderBy(random ? sql`RANDOM()` : brand.brandName);

  if (limit) {
    const offset = (page - 1) * limit;
    return await baseQuery.offset(offset).limit(limit);
  }

  return await baseQuery;
};

/**
 * Gets all brands
 */
export async function handleGetBrand(selectedColumns = {}) {
  try {
    const data = await getBrandsInfo(selectedColumns);

    if (!data || data.length === 0) {
      console.warn('No brands found');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');
  }
}

interface PaginatedBrands {
  rows: Partial<Brand>[];
  total: number;
}

export async function getBrandsLogosAndNames(
  { page, limit, random }: PaginationParams,
  filters: FilterParams
): Promise<PaginatedBrands> {
  try {
    const { categoryFilter, brandFilter } = getFilters(filters);
    const [data, brandsCount] = await Promise.all([
      getBrandsInfo(
        { logo: brand.logo, brandName: brand.brandName, slug: brand.slug },
        { page, limit, random },
        and(categoryFilter, brandFilter)
      ),
      getBrandsCount(isValidBrand),
    ]);

    return {
      rows: data,
      total: brandsCount.count,
    };
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error((error as Error).message);
  }
}

export async function handleGetBrandsWithVideos(
  { page, limit, videoCount, random }: PaginationParams,
  lang: SupportedLanguage,
  filters: FilterParams
) {
  try {
    const offset = (page - 1) * limit;

    let randomBrandId = undefined;
    if (`${random}` === 'true') {
      const randomBrands = await db
        .select({
          id: brand.id,
        })
        .from(brand)
        .innerJoin(product, eq(brand.id, product.brandId))
        .innerJoin(video, eq(video.productId, product.id))
        .groupBy(brand.id)
        .having(sql`COUNT(DISTINCT ${video.id}) >= 4`)
        .orderBy(sql`RANDOM()`)
        .limit(1);

      if (randomBrands.length > 0) {
        randomBrandId = randomBrands[0].id;
      }
    }

    const { categoryFilter, brandFilter } = getFilters(filters);

    // Build where conditions
    const whereConditions = [
      exists(
        db
          .select()
          .from(video)
          .innerJoin(product, eq(video.productId, product.id))
          .where(
            and(
              isValidBrand,
              eq(product.brandId, brand.id),
              ...(categoryFilter ? [categoryFilter] : []),
              ...(brandFilter ? [brandFilter] : [])
            )
          )
      ),
      ...(randomBrandId ? [eq(brand.id, randomBrandId)] : []),
    ];

    const [brandsResult, totalCount] = await Promise.all([
      db
        .select({
          id: brand.id,
          logo: brand.logo,
          name: brand.brandName,
          slug: brand.slug,
          info: {
            reviewsCount: sql<number>`(
              SELECT COUNT(*)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.brandId} = ${brand.id}
            )`,
            rating: sql<number>`(
              SELECT ROUND(COALESCE(AVG(${video.starRating}), 0)::numeric, 2)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.brandId} = ${brand.id}
            )`,
          },
          videos: sql<string>`(
            SELECT json_agg(video_data)
            FROM (
              SELECT json_build_object(
                'id', ${video.id},
                'playbackId', ${video.playbackId},
                'videoUrl', ${video.videoUrl},
                'resolution', ${video.resolution},
                'productName', COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title'),
                'productSlug', COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title'),
                'categorySlug', COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug'),
                'brandId', ${product.brandId},
                'brandName', ${brand.brandName},
                'brandLogo', ${brand.logo},
                'brandSlug', ${brand.slug},
                'rating', ${video.starRating}
              ) as video_data
              FROM ${video}
              JOIN ${product} ON ${brand.id} = ${product.brandId}
              JOIN ${category} ON ${product.categoryId} = ${category.id}
              WHERE ${video.productId} = ${product.id}
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
              GROUP BY ${category.categoryData}, ${product.productSlug}, ${product.brandId}, ${product.productName}, ${video.id} LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(brand)
        .leftJoin(product, eq(brand.id, product.brandId))
        .leftJoin(video, eq(product.id, video.productId))
        .where(and(...whereConditions))
        .groupBy(brand.id)
        .orderBy(random ? sql`RANDOM()` : sql`COUNT(DISTINCT ${video.id}) DESC`)
        .limit(limit)
        .offset(offset),

      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${brand.id})`,
        })
        .from(brand)
        .where(and(...whereConditions))
        .then(result => result[0].count),
    ]);

    return {
      rows: brandsResult,
      total: totalCount,
    };
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error((error as Error).message);
  }
}

export async function getBrandInfoWithSlug(brandSlug: string, lang: SupportedLanguage) {
  try {
    const [data] = await db
      .select({
        id: brand.id,
        logo: brand.logo,
        name: brand.brandName,
        slug: brand.slug,
        websiteURL: brand.websiteURL,
        metaDesc: sql<string>`COALESCE(${brand.brandData}->${lang}->>'metaDesc', ${brand.brandData}->'en'->>'metaDesc')`,
        bodyText: sql<string>`COALESCE(${brand.brandData}->${lang}->>'brandBody', ${brand.brandData}->'en'->>'brandBody')`,
        siteTitle: sql<string>`COALESCE(${brand.brandData}->${lang}->>'siteTitle', ${brand.brandData}->'en'->>'siteTitle')`,
        footerText: sql<string>`COALESCE(${brand.brandData}->${lang}->>'brandFooter', ${brand.brandData}->'en'->>'brandFooter')`,
        rating: sql<number>`(
          SELECT ROUND(COALESCE(AVG(${video.starRating}), 0)::numeric, 2)
          FROM ${video}
          LEFT JOIN ${product} ON ${video.productId} = ${product.id}
          LEFT JOIN ${brand} ON ${brand.id} = ${product.brandId}
          WHERE ${brand.slug} = ${brandSlug}
        )`,
        reviewsCount: sql<number>`(
              SELECT COUNT(*)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.brandId} = ${brand.id}
            )`,
      })
      .from(brand)
      .leftJoin(product, eq(brand.id, product.brandId))
      .where(eq(brand.slug, brandSlug))
      .limit(1);

    if (!data) {
      throw new Error('Brand not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching brand info:', error);
    throw new Error((error as Error).message);
  }
}

export async function getBrandProductsWithVideos(
  brandId: string,
  lang: SupportedLanguage,
  { page, limit }: PaginationParams
) {
  try {
    const [totalProducts, products] = await Promise.all([
      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${product.id})`,
        })
        .from(product)
        .innerJoin(video, eq(video.productId, product.id))
        .where(
          and(
            eq(product.brandId, brandId),
            sql`EXISTS (SELECT 1 FROM ${video} WHERE ${video.productId} = ${product.id})`
          )
        )
        .then(result => result[0].count),
      db
        .select({
          id: product.id,
          name: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          slug: sql<string>`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title')`,
          logo: product.productPicture,
          info: {
            reviewsCount: sql<number>`COUNT(${video.id})`,
            rating: sql<number>`(
              SELECT ROUND(COALESCE(AVG(${video.starRating}), 0)::numeric, 2)
              FROM ${video}
              WHERE ${video.productId} = ${product.id}
            )`,
          },
          videos: sql<string>`(
          SELECT json_agg(video_data)
          FROM (
            SELECT json_build_object(
              'id', ${video.id},
              'playbackId', ${video.playbackId},
              'videoUrl', ${video.videoUrl},
              'resolution', ${video.resolution},
              'productName', COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title'),
              'productSlug', COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title'),
              'categorySlug', COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug'),
              'brandId', ${product.brandId},
              'brandName', ${brand.brandName},
              'brandLogo', ${brand.logo},
              'brandSlug', ${brand.slug},
              'rating', ${video.starRating}
            ) as video_data
            FROM ${video}
            JOIN ${brand} ON ${product.brandId} = ${brand.id}
            JOIN ${category} ON ${product.categoryId} = ${category.id}
            WHERE ${video.productId} = ${product.id} AND ${product.brandId} = ${brandId}
            GROUP BY ${brand.brandName}, ${product.productName}, ${product.productSlug}, ${category.categoryData}, ${product.brandId}, ${brand.logo}, ${brand.slug}, ${video.id}
          ) subq
        )`,
        })
        .from(product)
        .innerJoin(video, eq(video.productId, product.id))
        .innerJoin(brand, eq(product.brandId, brand.id))
        .where(
          and(
            eq(product.brandId, brandId),
            sql`EXISTS (SELECT 1 FROM ${video} WHERE ${video.productId} = ${product.id})`
          )
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .groupBy(product.id, brand.slug),
    ]);

    return {
      total: totalProducts,
      rows: products,
    };
  } catch (error) {
    console.error('Error fetching brand products:', error);
    throw new Error((error as Error).message);
  }
}
