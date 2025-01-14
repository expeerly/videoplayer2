import { NextResponse } from 'next/server';
import { handleGetBrand } from '../../services/brand.services';
import { handleError } from '../../utils/errorHandler';

export const maxDuration = 50;

export async function GET() {
  try {
    const brands = await handleGetBrand(['logo', 'brandName']);
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
