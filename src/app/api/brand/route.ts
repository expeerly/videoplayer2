import { NextResponse } from 'next/server';
import { handleCreateBrand, handleGetBrand } from '../services/brand.services';
import { handleError } from '../utils/errorHandler';

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

export async function GET() {
  try {
    const brands = await handleGetBrand();
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
