import { NextResponse } from 'next/server';
import { handleGetBrand } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';

export const GET = async () => {
  try {
    const brand = await handleGetBrand(['id', 'logo', 'brandName', 'slug']);

    return NextResponse.json(
      {
        success: true,
        data: brand,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};
