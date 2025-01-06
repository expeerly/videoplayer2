import { db } from '@/src/db';
import { rating } from '@/src/db/schema';
import { Rating } from '@/src/db/types';
import { sql } from 'drizzle-orm';

export async function uploadRatings(ratings: Rating[]) {
  if (!ratings || ratings.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    const [creators, products] = await Promise.all([
      db.query.creator.findMany({}),
      db.query.product.findMany({}),
    ]);

    const filteredRatings = ratings.filter(rating => {
      const creatorExists = creators.some(c => c.id === rating.creatorId);
      const productExists = products.some(p => p.id === rating.productId);
      return creatorExists && productExists;
    });

    const data = await db
      .insert(rating)
      .values(filteredRatings)
      .onConflictDoUpdate({
        target: [rating.id],
        set: {
          rating: sql`EXCLUDED."rating"`,
          productId: sql`EXCLUDED."productId"`,
          creatorId: sql`EXCLUDED."creatorId"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    return data;
  } catch (error) {
    console.error('Error uploading ratings:', error);
    throw error;
  }
}
