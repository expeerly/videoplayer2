import { NextResponse } from 'next/server';
import { getBrandsLogosAndNames, handleCreateBrand } from '../services/brand.services';
import { handleError } from '../utils/errorHandler';
import { getPaginationParams } from '../utils/requestHelpers';

export const maxDuration = 50;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const brand = await handleCreateBrand(body.data);
    return NextResponse.json(
      {
        success: true,
        data: brand,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { page, limit, random } = getPaginationParams(request);
    const brands = await getBrandsLogosAndNames(page, limit, random);
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
