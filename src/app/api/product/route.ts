import { NextResponse } from 'next/server';
import { createProducts } from '../services/product.services';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const creator = await createProducts(body);
    return NextResponse.json(
      {
        success: true,
        data: creator,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
