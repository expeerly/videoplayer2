import { db } from '@/src/db';
import { video } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Video } from '@/src/db/types';

export async function handleCreateVideo(input: Video[]): Promise<Video[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const [creators, products] = await Promise.all([
      db.query.creator.findMany({}),
      db.query.product.findMany({}),
    ]);

    const filteredVideos = input.filter(video => {
      const creatorExists = creators.some(c => c.id === video.creatorId);
      const productExists = products.some(p => p.id === video.productId);
      return creatorExists && productExists;
    });

    const data = await db
      .insert(video)
      .values(filteredVideos)
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
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    if (data) {
      return data;
    } else {
      console.warn('No videos found');
      return [];
    }
  } catch (error) {
    console.error('Error in handleCreateVideo:', error);
    throw new Error((error as Error).message);
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
