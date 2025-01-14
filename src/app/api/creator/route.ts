import { NextResponse } from 'next/server';
import { handleCreateCreator } from '../services/creator.services';
import { handleError } from '../utils/errorHandler';

export const maxDuration = 50;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const creator = await handleCreateCreator(body.data);
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
    return handleError(error);
  }
};
