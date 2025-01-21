import { NextResponse } from 'next/server';
import { handleCreateVideo } from '../services/video.services';
import { handleError } from '../utils/errorHandler';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const creator = await handleCreateVideo(body.data);
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
