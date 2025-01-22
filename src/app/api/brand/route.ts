import { NextResponse } from 'next/server';
import { getBrandsLogosAndNames, handleCreateBrand } from '../services/brand.services';
import { createRouteHandler } from '../utils/baseRouteHandler';

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

export const GET = createRouteHandler({
  serviceFunction: async params => {
    return getBrandsLogosAndNames(params.pagination, params.filters!);
  },
  includeFilters: true,
});
