import { db } from '@/src/db';
import { brand, category, product, video } from '@/src/db/schema';
import { eq, exists, sql, and, SQL } from 'drizzle-orm';
import { Category, CategoryInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';
import { getFilters, hasBrandVideos, hasCategoryVideos } from './queries';

/**
 * Creates or updates multiple categories
 * @param {CategoryInputType[]} input - Array of category data
 * @returns {Promise<Category[]>} Array of created/updated categories
 */
export async function handleCreateCategory(input: CategoryInputType[]): Promise<Category[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    return await db
      .insert(category)
      .values(input)
      .onConflictDoUpdate({
        target: [category.id],
        set: {
          logo: sql`EXCLUDED."logo"`,
          categoryData: sql`EXCLUDED."categoryData"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
  } catch (error) {
    console.error('Error creating/updating category:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves categories for the slider
 * @param {SupportedLanguage} lang - Language code for content localization
 * @returns {Promise<Partial<Category>[]>} Array of categories for the slider
 */
export async function getCategoriesForSlider(
  lang: SupportedLanguage,
  filters: FilterParams
): Promise<Partial<Category>[]> {
  try {
    const { brandFilter, categoryFilter } = getFilters(filters);
    return await db
      .selectDistinct({
        id: category.id,
        logo: category.logo,
        categoryName:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'categoryName', "categoryData" -> 'en' ->> 'categoryName')`.as(
            'categoryName'
          ),
        urlSlug:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'urlSlug', "categoryData" -> 'en' ->> 'urlSlug')`.as(
            'urlSlug'
          ),
      })
      .from(category)
      .innerJoin(product, eq(product.categoryId, category.id))
      .where(and(brandFilter, categoryFilter, hasCategoryVideos))
      .limit(20);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves all categories
 * @returns {Promise<Partial<Category>[]>} Array of categories
 */
export async function getAllCategories(): Promise<Partial<Category>[]> {
  try {
    return await db
      .select({
        id: category.id,
        logo: category.logo,
        categoryData: sql<string>`jsonb_build_object(
          'de', jsonb_build_object(
            'urlSlug', COALESCE("categoryData"->'de'->>'urlSlug', "categoryData"->'en'->>'urlSlug'),
            'categoryName', COALESCE("categoryData"->'de'->>'categoryName', "categoryData"->'en'->>'categoryName')
          ),
          'en', jsonb_build_object(
            'urlSlug', COALESCE("categoryData"->'en'->>'urlSlug', "categoryData"->'en'->>'urlSlug'),
            'categoryName', COALESCE("categoryData"->'en'->>'categoryName', "categoryData"->'en'->>'categoryName')
          ),
          'fr', jsonb_build_object(
            'urlSlug', COALESCE("categoryData"->'fr'->>'urlSlug', "categoryData"->'en'->>'urlSlug'),
            'categoryName', COALESCE("categoryData"->'fr'->>'categoryName', "categoryData"->'en'->>'categoryName')
          ),
          'it', jsonb_build_object(
            'urlSlug', COALESCE("categoryData"->'it'->>'urlSlug', "categoryData"->'en'->>'urlSlug'),
            'categoryName', COALESCE("categoryData"->'it'->>'categoryName', "categoryData"->'en'->>'categoryName')
          )
        )`,
      })
      .from(category)
      .where(hasCategoryVideos)
      .orderBy(
        sql<string>`COALESCE("categoryData" -> 'en' ->> 'categoryName', "categoryData" -> 'en' ->> 'categoryName')`
      );
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves the total count of categories
 * @returns {Promise<{ count: number }>} Object containing the total count
 */
export async function getCategoryCount(condition?: SQL): Promise<{ count: number }> {
  try {
    const count = await db.$count(category, condition);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves categories with their associated videos based on pagination and filter parameters
 * @param {PaginationParams} params - Pagination parameters
 * @param {SupportedLanguage} lang - Language code for content localization
 * @param {FilterParams} filters - Filter parameters for categories and brands
 * @returns {Promise<{ rows: Partial<Category>[], total: number }>} Paginated categories with total count
 */
export async function handleGetCategoryWithVideos(
  { page, limit, videoCount }: PaginationParams,
  lang: SupportedLanguage,
  filters: FilterParams
) {
  try {
    const offset = (page - 1) * limit;

    // Create filter conditions
    const { categoryFilter, brandFilter } = getFilters(filters);

    let randomCategoryId = undefined;
    if (`${limit}` === '1') {
      const randomCategories = await db
        .select({
          id: category.id,
        })
        .from(category)
        .innerJoin(product, eq(category.id, product.categoryId))
        .innerJoin(video, eq(video.productId, product.id))
        .groupBy(category.id)
        .having(sql`COUNT(DISTINCT ${video.id}) >= 4`)
        .orderBy(sql`RANDOM()`)
        .limit(1);

      if (randomCategories.length > 0) {
        randomCategoryId = randomCategories[0].id;
      }
    }

    // Build where conditions
    const whereConditions = [
      exists(
        db
          .select()
          .from(video)
          .innerJoin(product, eq(video.productId, product.id))
          .where(
            and(
              eq(video.productId, product.id),
              eq(product.categoryId, category.id),
              ...(brandFilter ? [brandFilter] : [])
            )
          )
      ),
      ...(categoryFilter ? [categoryFilter] : []),
      ...(randomCategoryId ? [eq(category.id, randomCategoryId)] : []),
    ];
    const [categoriesResult, totalCount] = await Promise.all([
      db
        .select({
          id: category.id,
          logo: category.logo,
          name: sql<string>`COALESCE("categoryData" -> ${lang} ->> 'categoryName', "categoryData" -> 'en' ->> 'categoryName')`,
          slug: sql<string>`COALESCE("categoryData" -> ${lang} ->> 'urlSlug', "categoryData" -> 'en' ->> 'urlSlug')`,
          info: {
            reviewsCount: sql<number>`(
              SELECT COUNT(*)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.categoryId} = ${category.id} AND ${video.published} = true
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
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
                'categorySlug', COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug'),
                'brandId', ${product.brandId},
                'brandName', ${brand.brandName},
                'brandLogo', ${brand.logo},
                'brandSlug', ${brand.slug},
                'rating', ${video.starRating}
              ) as video_data
              FROM ${video}
              JOIN ${product} ON ${category.id} = ${product.categoryId}
              JOIN ${brand} ON ${product.brandId} = ${brand.id}
              WHERE ${video.productId} = ${product.id} AND ${video.published} = true AND ${product.categoryId} = ${category.id}
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
              GROUP BY ${brand.slug}, ${brand.logo}, ${brand.brandName}, ${product.brandId}, ${product.productSlug}, ${product.productName}, ${video.id}
              LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(category)
        .leftJoin(product, eq(category.id, product.categoryId))
        .leftJoin(video, eq(product.id, video.productId))
        .where(and(...whereConditions))
        .groupBy(category.id)
        .limit(limit)
        .offset(offset)
        .orderBy(sql`COUNT(DISTINCT ${video.id}) DESC`),

      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${category.id})`,
        })
        .from(category)
        .leftJoin(product, eq(category.id, product.categoryId))
        .where(and(...whereConditions))
        .then(result => result[0].count),
    ]);

    return {
      rows: categoriesResult,
      total: totalCount,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}

export async function getCategoryInfoWithSlug(categorySlug: string, lang: SupportedLanguage) {
  try {
    const [data] = await db
      .select({
        id: category.id,
        logo: category.logo,
        name: sql<string>`COALESCE("categoryData" -> ${lang} ->> 'categoryName', "categoryData" -> 'en' ->> 'categoryName')`.as(
          'categoryName'
        ),
        slug: sql<string>`COALESCE("categoryData" -> ${lang} ->> 'urlSlug', "categoryData" -> 'en' ->> 'urlSlug')`.as(
          'urlSlug'
        ),
        siteTitle:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'siteTitle', "categoryData" -> 'en' ->> 'siteTitle')`.as(
            'siteTitle'
          ),
        metaDesc:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'metaDesc', "categoryData" -> 'en' ->> 'metaDesc')`.as(
            'metaDesc'
          ),
        bodyText:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'bodyText', "categoryData" -> 'en' ->> 'bodyText')`.as(
            'bodyText'
          ),
        footerText:
          sql<string>`COALESCE("categoryData" -> ${lang} ->> 'footerText', "categoryData" -> 'en' ->> 'footerText')`.as(
            'footerText'
          ),
        reviewsCount: sql<number>`(
          SELECT COUNT(*)
          FROM ${video}
          JOIN ${product} ON ${video.productId} = ${product.id}
          WHERE ${product.categoryId} = ${category.id} AND ${video.published} = true
        )`,
      })
      .from(category)
      .leftJoin(product, eq(category.id, product.categoryId))
      .where(
        sql`COALESCE("categoryData" -> ${lang} ->> 'urlSlug', "categoryData" -> 'en' ->> 'urlSlug') = ${categorySlug}`
      )
      .limit(1);

    if (!data) {
      throw new Error('Category not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching category info:', error);
    throw new Error((error as Error).message);
  }
}

export async function getBrandsByCategoryIdWithVideos(
  categoryId: string,
  lang: SupportedLanguage,
  { page, limit }: PaginationParams
) {
  try {
    const [totalBrands, brands] = await Promise.all([
      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${brand.id})`,
        })
        .from(brand)
        .innerJoin(product, eq(product.brandId, brand.id))
        .innerJoin(video, eq(video.productId, product.id))
        .where(and(eq(product.categoryId, Number(categoryId)), hasBrandVideos))
        .then(result => result[0].count),
      db
        .select({
          id: brand.id,
          name: brand.brandName,
          logo: brand.logo,
          slug: brand.slug,
          info: {
            reviewsCount: sql<number>`(
              SELECT COUNT(*)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.brandId} = ${brand.id} AND ${video.published} = true
            )`,
            rating: sql<number>`(
              SELECT ROUND(COALESCE(AVG(${video.starRating}), 0)::numeric, 2)
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              WHERE ${product.brandId} = ${brand.id}
            )`,
          },
          videos: sql<string>`(
            SELECT json_agg(
              json_build_object(
                'id', ${video.id},
                'playbackId', ${video.playbackId},
                'videoUrl', ${video.videoUrl},
                'resolution', ${video.resolution},
                'rating', ${video.starRating},
                'brandId', ${brand.id},
                'brandName', ${brand.brandName},
                'brandSlug', ${brand.slug},
                'brandLogo', ${brand.logo},
                'productName', COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title'),
              'productSlug', COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title'),
              'categorySlug', COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug')
              )
            )
            FROM ${video}
            JOIN ${product} ON ${video.productId} = ${product.id}
            JOIN ${category} ON ${product.categoryId} = ${category.id}
            WHERE ${product.brandId} = ${brand.id} AND ${video.published} = true
            AND ${product.categoryId} = ${Number(categoryId)}
          )`,
        })
        .from(brand)
        .innerJoin(product, eq(product.brandId, brand.id))
        .innerJoin(video, eq(video.productId, product.id))
        .innerJoin(category, eq(category.id, product.categoryId))
        .where(and(eq(product.categoryId, Number(categoryId)), hasBrandVideos))
        .groupBy(brand.id)
        .orderBy(brand.brandName)
        .limit(limit)
        .offset((page - 1) * limit),
    ]);

    return {
      total: totalBrands,
      rows: brands,
    };
  } catch (error) {
    console.error('Error fetching brands by category:', error);
    throw new Error((error as Error).message);
  }
}
