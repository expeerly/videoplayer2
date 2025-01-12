import { db } from '@/src/db';
import { brand, creator, creatorInterests, product, rating, video } from '@/src/db/schema';
import { and, eq, exists, sql } from 'drizzle-orm';
import { Creator, CreatorInputType, CreatorInterestsInputType } from '@/src/db/types';
import { PaginationParams } from '../utils/requestHelpers';

/**
 * Creates or updates creator data
 * Used for CSV upload functionality
 *
 * @param input - Creator data to be inserted or updated
 * @returns Array of created/updated creators
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

export async function getCreatorsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(creator);
    return { count };
  } catch (error) {
    console.error('Error fetching creator count:', error);
    throw new Error((error as Error).message);
  }
}

export async function handleGetCreatorWithVideos({
  page,
  limit,
  videoCount,
  random,
}: PaginationParams) {
  try {
    const offset = (page - 1) * limit;
    const [creatorsResult, creatorCount] = await Promise.all([
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
            SELECT json_agg(video_data)
            FROM (
              SELECT json_build_object(
                'id', ${video.id},
                'playbackId', ${video.playbackId},
                'videoUrl', ${video.videoUrl},
                'resolution', ${video.resolution},
                'productName', ${product.productName},
                'brandId', ${product.brandId},
                'brandName', ${brand.brandName},
                'brandLogo', ${brand.logo},
                'brandSlug', ${brand.slug},
                'rating', ${rating.rating}
              ) as video_data
              FROM ${video}
              LIMIT ${videoCount}
            ) subq
          )`,
        })
        .from(creator)
        .leftJoin(video, eq(video.creatorId, creator.id))
        .leftJoin(product, eq(product.id, video.productId))
        .leftJoin(brand, eq(brand.id, product.brandId))
        .leftJoin(rating, eq(rating.productId, product.id))
        .where(and(exists(db.select().from(video).where(eq(video.creatorId, creator.id)))))
        .limit(limit)
        .offset(offset)
        .orderBy(random ? sql`RANDOM()` : creator.creatorName),
      getCreatorsCount(),
    ]);
    return {
      rows: creatorsResult,
      total: creatorCount.count,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error((error as Error).message);
  }
}
