import { NextResponse } from 'next/server';
import { handleCreateHeadings, handleGetHeadings } from '../services/headings.services';
import { handleError } from '../utils/errorHandler';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const existingHeadings = await handleGetHeadings();
    console.log({ existingHeadings, body });
    const headings = await handleCreateHeadings({
      ...(existingHeadings || {}),
      data: body.data,
    });
    return NextResponse.json(
      {
        success: true,
        data: headings,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};

export const GET = async () => {
  try {
    const headings = await handleGetHeadings();

    if (!headings) {
      return NextResponse.json(
        {
          success: false,
          message: 'Headings content not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: headings,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};
