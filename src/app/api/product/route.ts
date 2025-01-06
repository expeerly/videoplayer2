import { NextResponse } from 'next/server';
import { createProducts } from '../services/product.services';

export const POST = async (req: Request) => {
  try {
    const { data } = await req.json();
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { success: false, message: 'Input must be an array' },
        { status: 400 }
      );
    }

    const products = await createProducts(data);
    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('Error creating/updating products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create/update products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};
