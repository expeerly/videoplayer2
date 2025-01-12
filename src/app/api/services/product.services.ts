import { db } from '@/src/db';
import { product } from '@/src/db/schema';
import { ProductInputType } from '@/src/db/types';
import { sql } from 'drizzle-orm';

/**
 * Creates or updates products
 * @param input Array of product data
 */
export const createProducts = async (input: ProductInputType[]) => {
  if (!input || input.length === 0) {
    throw new Error('Input is required and cannot be empty');
  }

  // Ensure proper date handling and validate categoryId
  const processedInput = input.map(item => {
    // Skip items with invalid categoryId (0 or undefined)
    if (!item.categoryId || item.categoryId === 0) {
      throw new Error(`Invalid category ID for product: ${item.productName}`);
    }

    return {
      ...item,
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      updatedAt: new Date(),
    };
  });

  try {
    const data = await db
      .insert(product)
      .values(processedInput)
      .onConflictDoUpdate({
        target: [product.id],
        set: {
          productName: sql`EXCLUDED."productName"`,
          productLink: sql`EXCLUDED."productLink"`,
          productSlug: sql`EXCLUDED."productSlug"`,
          brandId: sql`EXCLUDED."brandId"`,
          categoryId: sql`EXCLUDED."categoryId"`,
          globalTradeItemNumber: sql`EXCLUDED."globalTradeItemNumber"`,
          vendorProductNumber: sql`EXCLUDED."vendorProductNumber"`,
          rating: sql`EXCLUDED."rating"`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    return data;
  } catch (error) {
    console.error('Error in createProducts:', error);
    throw new Error((error as Error).message);
  }
};

export async function getProductsCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(product);
    return { count };
  } catch (error) {
    console.error('Error fetching category count:', error);
    throw new Error((error as Error).message);
  }
}
