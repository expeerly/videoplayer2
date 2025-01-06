import { db } from '@/src/db';
import { creator, creatorInterests } from '@/src/db/schema';
import { sql } from 'drizzle-orm';
import { Creator, CreatorInputType, CreatorInterestsInputType } from '@/src/db/types';

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
    throw new Error('Failed to create/update creator');
  }
}

export async function getCreatorsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(creator);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error('Failed to fetch category count');
  }
}
