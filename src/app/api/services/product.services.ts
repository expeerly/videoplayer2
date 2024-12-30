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
  console.log(input);
  try {
    const data = await db
      .insert(product)
      .values(input)
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
    console.error('Error creating/updating products:', error);
    throw error; // Throw the actual error for better debugging
  }
};
