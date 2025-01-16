import { NextResponse } from 'next/server';
import {
  getLandingPage,
  handleCreateLandingPage,
  handleGetLandingPageWithLangAndType,
} from '../services/landingPage.services';
import { handleError } from '../utils/errorHandler';
import { getLanguageFromRequest } from '../utils/requestHelpers';

export const maxDuration = 50;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (body.data.length === 0) {
      throw new Error('Input is required and cannot be empty');
    }

    const existingLandingPage = (await getLandingPage()) || {};

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

export const GET = async (request: Request) => {
  try {
    const lang = getLanguageFromRequest(request);
    const { searchParams } = new URL(request.url);
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

    const landingPage = await handleGetLandingPageWithLangAndType(lang, type);

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
