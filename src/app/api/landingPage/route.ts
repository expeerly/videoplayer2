import { NextResponse } from 'next/server';
import { handleCreateLandingPage, handleGetLandingPage } from '../services/landingPage.services';
import { handleError } from '../utils/errorHandler';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (body.data.length === 0) {
      throw new Error('Input is required and cannot be empty');
    }

    const existingLandingPage = (await handleGetLandingPage()) || {};

    const landingPage = await handleCreateLandingPage({
      ...existingLandingPage,
      ...body.data[0],
    });
    return NextResponse.json(
      {
        success: true,
        data: landingPage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') as 'Brand' | 'Category' | 'Creator' | undefined;

    if (type && !['Brand', 'Category', 'Creator'].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid type parameter. Must be one of: Brand, Category, Creator',
        },
        {
          status: 400,
        }
      );
    }

    const landingPage = await handleGetLandingPage(type);

    if (!landingPage) {
      return NextResponse.json(
        {
          success: false,
          message: 'LandingPage content not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: landingPage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error);
  }
};
