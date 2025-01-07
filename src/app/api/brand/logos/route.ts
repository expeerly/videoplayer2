import { NextResponse } from 'next/server';
import { handleGetBrand } from '../../services/brand.services';

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
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
