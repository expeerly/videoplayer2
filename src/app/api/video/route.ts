import { NextResponse } from 'next/server';
import { getVideoById, handleCreateVideo } from '../services/video.services';

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
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Video ID is required' },
        { status: 400 }
      );
    }

    const video = await getVideoById(id);

    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
