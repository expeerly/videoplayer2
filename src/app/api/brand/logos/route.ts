import { NextResponse } from 'next/server';
import { handleGetBrand } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';
import { brand } from '@/src/db/schema';

export async function GET() {
  try {
    const brands = await handleGetBrand({
      logo: brand.logo,
      brandName: brand.brandName,
    });
    return NextResponse.json(
      {
        success: true,
        data: brands,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error);
  }
}
