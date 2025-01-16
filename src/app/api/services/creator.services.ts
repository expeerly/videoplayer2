import { db } from '@/src/db';
import { brand, creator, creatorInterests, product, rating, video } from '@/src/db/schema';
import { and, eq, exists, inArray, sql } from 'drizzle-orm';
import { Creator, CreatorInputType, CreatorInterestsInputType } from '@/src/db/types';
import { FilterParams, PaginationParams, SupportedLanguage } from '../utils/requestHelpers';

/**
 * Creates or updates multiple creators with their interests
 * @param {(CreatorInputType & { interests: string })[]} input - Array of creator data with interests
 * @returns {Promise<Creator[]>} Array of created/updated creators
 */
export async function handleCreateCreator(
  input: (CreatorInputType & { interests: string })[]
): Promise<Creator[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const categories = await db.query.category.findMany({
      columns: {
        id: true,
      },
    });

    const creatorInterestsData: CreatorInterestsInputType[] = [];
    const creatorsData: CreatorInputType[] = [];

    input.forEach(({ interests, ...item }) => {
      const categoryInterests: CreatorInterestsInputType[] = interests
        .split(',')
        .map(i => ({
          creatorId: item.id,
          categoryId: Number(i.trim()),
        }))
        .filter(i => categories.some(c => c.id === i.categoryId));
      creatorInterestsData.push(...categoryInterests);
      creatorsData.push(item);
    });

    const data = await db
      .insert(creator)
      .values(creatorsData)
      .onConflictDoUpdate({
        target: [creator.id],
        set: {
          creatorName: sql`EXCLUDED."creatorName"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    await db
      .insert(creatorInterests)
      .values(creatorInterestsData)
      .onConflictDoUpdate({
        target: [creatorInterests.id],
        set: {
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      });

    if (data) {
      return data;
    } else {
      console.warn('No creators found');
      return [];
    }
  } catch (error) {
    console.error('Error in handleCreateCreator:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Gets the total count of creators in the database
 * @returns {Promise<{ count: number }>} Object containing the total count
 */
export async function getCreatorsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(creator);
    return { count };
  } catch (error) {
    console.error('Error fetching creator count:', error);
    throw new Error((error as Error).message);
  }
}

/**
 * Retrieves creators with their associated videos based on pagination parameters
 * @param {PaginationParams} params - Pagination and filtering parameters
 * @param {FilterParams} filterParams - Category and brand filter parameters
 * @returns {Promise<{ rows: Creator[], total: number }>} Paginated creators with total count
 */
export async function handleGetCreatorWithVideos(
  { page, limit, videoCount, random }: PaginationParams,
  lang: SupportedLanguage,
  { categories, brands }: FilterParams
) {
  try {
    const offset = (page - 1) * limit;

    // Create filter conditions
    const categoryFilter = categories?.length ? inArray(product.categoryId, categories) : undefined;

    const brandFilter = brands?.length ? inArray(product.brandId, brands) : undefined;

    // Build where conditions
    const whereConditions = [
      exists(
        db
          .select()
          .from(video)
          .innerJoin(product, eq(video.productId, product.id))
          .where(
            and(
              eq(video.creatorId, creator.id),
              ...(categoryFilter ? [categoryFilter] : []),
              ...(brandFilter ? [brandFilter] : [])
            )
          )
      ),
    ];

    const [creatorsResult, totalCount] = await Promise.all([
      db
        .select({
          id: creator.id,
          logo: creator.profilePictureURL,
          name: creator.creatorName,
          slug: creator.id,
          info: {
            age: creator.age,
            location: creator.location,
            bio: creator.bio,
          },
          videos: sql<string>`(
            SELECT json_agg( video_data)
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
                'rating', ${rating.rating}
              ) as video_data
              FROM ${video}
              JOIN ${product} ON ${video.productId} = ${product.id}
              JOIN ${brand} ON ${product.brandId} = ${brand.id}
              LEFT JOIN ${rating} ON ${video.productId} = ${rating.productId} AND ${video.creatorId} = ${rating.creatorId}
              WHERE ${video.creatorId} = ${creator.id}
              ${brandFilter ? sql`AND ${brandFilter}` : sql``}
              GROUP BY ${product.productSlug}, ${rating.rating}, ${brand.slug}, ${brand.logo}, ${brand.brandName}, ${product.brandId}, ${product.productName}, ${video.id}
              LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(creator)
        .leftJoin(video, eq(video.creatorId, creator.id))
        .where(and(...whereConditions))
        .groupBy(creator.id)
        .limit(limit)
        .offset(offset)
        .orderBy(random ? sql`RANDOM()` : creator.creatorName),

      db
        .select({
          count: sql<number>`COUNT(DISTINCT ${creator.id})`,
        })
        .from(creator)
        .where(and(...whereConditions))
        .then(result => result[0].count),
    ]);

    return {
      rows: creatorsResult,
      total: totalCount,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}
