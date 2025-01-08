import { NextResponse } from 'next/server';
import { handleCreateLandingPage, handleGetLandingPage } from '../services/landingPage.services';
import { handleError } from '../utils/errorHandler';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const existingLandingPage = (await handleGetLandingPage()) || {};

    const landingPage = await handleCreateLandingPage({
      ...existingLandingPage,
      ...body.data,
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

export const GET = async () => {
  try {
    const landingPage = await handleGetLandingPage();

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
