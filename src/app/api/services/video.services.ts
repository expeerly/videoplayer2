import { db } from '@/src/db';
import { video } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Video } from '@/src/db/types';

export async function handleCreateVideo(input: Video[]): Promise<Video[]> {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const data = await db
      .insert(video)
      .values(input)
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
          subtitle: sql`EXCLUDED."subtitle"`,
          summary: sql`EXCLUDED."summary"`,
          transcript: sql`EXCLUDED."transcript"`,
          faqs: sql`EXCLUDED."faqs"`,
          published: sql`EXCLUDED."published"`,
          cannonicalTag: sql`EXCLUDED."cannonicalTag"`,
          showRelated: sql`EXCLUDED."showRelated"`,
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
    throw new Error('Failed to create/update video');
  }
}
