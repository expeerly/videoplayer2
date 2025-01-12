import { NextResponse } from 'next/server';
import { createProducts } from '../services/product.services';
import { handleError } from '../utils/errorHandler';

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
    return handleError(error);
  }
};
