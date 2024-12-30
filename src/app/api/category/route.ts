import { NextResponse } from 'next/server';
import { getCategory, handleCreateCategory } from '../services/category.services';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const category = await handleCreateCategory(body);
    return NextResponse.json(
      {
        success: true,
        data: category,
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

export const GET = async () => {
  try {
    const category = await getCategory();
    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
