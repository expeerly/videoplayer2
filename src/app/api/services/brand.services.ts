import { db } from '@/src/db';
import { brand, product, video } from '@/src/db/schema';
import { and, eq, exists, inArray, isNotNull, sql } from 'drizzle-orm';
import { Brand, BrandInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';

export async function handleCreateBrand(input: BrandInputType[]): Promise<Brand[]> {
  if (!input || !Array.isArray(input)) {
    throw new Error('Input must be an array of brands');
  }

  try {
    const data = await db
      .insert(brand)
      .values(input)
      .onConflictDoUpdate({
        target: brand.slug,
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

/**
 * Gets all brands
 */
export async function handleGetBrand(selectedColumns: string[] = []): Promise<Brand[]> {
  try {
    const columns: { [key: string]: boolean } = {};
    if (selectedColumns.length > 0) {
      selectedColumns.forEach(column => {
        columns[column] = true;
      });
    }
    const data = await db.query.brand.findMany({
      ...(selectedColumns.length > 0 && {
        columns,
        where: and(isNotNull(brand.brandName), isNotNull(brand.logo)),
      }),
    });

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

export async function getBrandsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(brand);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}

interface PaginatedBrands {
  rows: Partial<Brand>[];
  total: number;
}

export async function getBrandsLogosAndNames(
  page: number = 1,
  limit: number = 20,
  random: boolean = false
): Promise<PaginatedBrands> {
  try {
    const offset = (page - 1) * limit;
    const [data, brandsCount] = await Promise.all([
      db.query.brand.findMany({
        columns: {
          id: true,
          logo: true,
          brandName: true,
          slug: true,
        },
        limit,
        offset,
        orderBy: random ? sql`RANDOM()` : brand.brandName,
      }),
      getBrandsCount(),
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
  { categories, brands }: FilterParams
) {
  try {
    const offset = (page - 1) * limit;

    // Create filter conditions
    const categoryFilter = categories?.length ? inArray(product.categoryId, categories) : undefined;

    const brandFilter = brands?.length ? inArray(brand.id, brands) : undefined;

    // Build where conditions
    const whereConditions = exists(
      db
        .select()
        .from(video)
        .innerJoin(product, eq(video.productId, product.id))
        .where(
          and(
            eq(product.brandId, brand.id),
            ...(categoryFilter ? [categoryFilter] : []),
            ...(brandFilter ? [brandFilter] : [])
          )
        )
    );

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
            )`.as('reviewsCount'),
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
                'brandId', ${product.brandId},
                'brandName', ${brand.brandName},
                'brandLogo', ${brand.logo},
                'brandSlug', ${brand.slug},
                'rating', ${video.starRating}
              ) as video_data
              FROM ${video}
              JOIN ${product} ON ${brand.id} = ${product.brandId}
              WHERE ${video.productId} = ${product.id}
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
              GROUP BY ${product.productSlug}, ${product.brandId}, ${product.productName}, ${video.id} LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(brand)
        .leftJoin(product, eq(brand.id, product.brandId))
        .where(whereConditions)
        .groupBy(brand.id)
        .orderBy(random ? sql`RANDOM()` : brand.brandName)
        .limit(limit)
        .offset(offset),

      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${brand.id})`,
        })
        .from(brand)
        .where(whereConditions)
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
