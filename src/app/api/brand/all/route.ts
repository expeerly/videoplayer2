import { NextResponse } from 'next/server';
import { handleGetBrand } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';
import { brand } from '@/src/db/schema';

export const GET = async () => {
  try {
    const brandData = await handleGetBrand({
      id: brand.id,
      logo: brand.logo,
      brandName: brand.brandName,
      slug: brand.slug,
    });

    return NextResponse.json(
      {
        success: true,
        data: brandData,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
};
