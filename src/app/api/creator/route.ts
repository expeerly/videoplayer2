import { NextResponse } from 'next/server';
import { handleCreateCreator } from '../services/creator.services';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const creator = await handleCreateCreator(body);
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
