import { db } from '@/src/db';
import { video } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Video } from '@/src/db/types';
import { SupportedLanguage } from '../utils/requestHelpers';

export async function handleCreateVideo(input: Video[]): Promise<Video[]> {
  if (!input?.length) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    // Get unique creator and product IDs from input
    const uniqueCreatorIds = [...new Set(input.map(v => v.creatorId))].filter(
      (id): id is string => id != null
    );
    const uniqueProductIds = [...new Set(input.map(v => v.productId))].filter(
      (id): id is string => id != null
    );

    // Fetch only the relevant creators and products
    const [validCreatorIds, validProductIds] = await Promise.all([
      db.query.creator.findMany({
        where: (creator, { inArray }) => inArray(creator.id, uniqueCreatorIds),
        columns: { id: true },
      }),
      db.query.product.findMany({
        where: (product, { inArray }) => inArray(product.id, uniqueProductIds),
        columns: { id: true },
      }),
    ]);

    // Create sets for faster lookup
    const creatorIdSet = new Set(validCreatorIds.map(c => c.id));
    const productIdSet = new Set(validProductIds.map(p => p.id));

    // Filter videos with valid references
    const validVideos = input.filter(
      video => creatorIdSet.has(video.creatorId!) && productIdSet.has(video.productId!)
    );

    const invalidVideos = input.filter(
      video => !creatorIdSet.has(video.creatorId!) || !productIdSet.has(video.productId!)
    );
    console.log({ invalidVideos: invalidVideos });

    if (!validVideos.length) return [];

    return (
      (await db
        .insert(video)
        .values(validVideos)
        .onConflictDoUpdate({
          target: [video.id],
          set: {
            videoTitle: sql`EXCLUDED."videoTitle"`,
            videoUrl: sql`EXCLUDED."videoUrl"`,
            playbackId: sql`EXCLUDED."playbackId"`,
            productId: sql`EXCLUDED."productId"`,
            creatorId: sql`EXCLUDED."creatorId"`,
            siteTitle: sql`EXCLUDED."siteTitle"`,
            metaDescription: sql`EXCLUDED."metaDescription"`,
            summary: sql`EXCLUDED."summary"`,
            transcript: sql`EXCLUDED."transcript"`,
            faqs: sql`EXCLUDED."faqs"`,
            published: sql`EXCLUDED."published"`,
            cannonicalTag: sql`EXCLUDED."cannonicalTag"`,
            resolution: sql`EXCLUDED."resolution"`,
            starRating: sql`EXCLUDED."starRating"`,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        })
        .returning()) ?? []
    );
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to create videos');
  }
}

export async function getVideosCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(video);
    return { count };
  } catch (error) {
    console.error('Error fetching video count:', error);
    throw new Error((error as Error).message);
  }
}

export async function getVideoById(id: string, lang: SupportedLanguage): Promise<Video | null> {
  if (!id) {
    throw new Error('Video ID is required');
  }
  console.log({ id, lang });
  try {
    const result = await db.query.video.findFirst({
      where: (video, { eq }) => eq(video.id, parseInt(id)),
      with: {
        creator: true,
        product: true,
      },
    });

    return result ?? null;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch video details');
  }
}
