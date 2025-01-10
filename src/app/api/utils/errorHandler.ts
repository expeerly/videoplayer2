import { NextResponse } from 'next/server';
import { PostgrestError } from '@supabase/supabase-js';

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    type: ErrorType;
  };
};

export type ErrorType =
  | 'DATABASE_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'NOT_FOUND'
  | 'GENERAL_ERROR';

export function handleError(error: unknown): NextResponse<ErrorResponse> {
  // console.error("Error details:", {
  //   name: error instanceof Error ? error.name : "Unknown",
  //   message: error instanceof Error ? error.message : String(error),
  //   stack: error instanceof Error ? error.stack : undefined,
  // });
  console.error(JSON.stringify(error));
  // Handle Supabase PostgresError
  if ((error as PostgrestError).code) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: 'Database operation failed',
        type: 'DATABASE_ERROR',
        code: (error as PostgrestError).code,
      },
    };

    // Handle specific Supabase/Postgres error codes
    switch ((error as PostgrestError).code) {
      case '23505': // Unique violation
        return NextResponse.json(
          {
            ...errorResponse,
            error: { ...errorResponse.error, message: 'This record already exists' },
          },
          { status: 409 }
        );
      case '23503': // Foreign key violation
        return NextResponse.json(
          {
            ...errorResponse,
            error: { ...errorResponse.error, message: 'Referenced record not found' },
          },
          { status: 404 }
        );
      case '42P01': // Undefined table
      case '42703': // Undefined column
        return NextResponse.json(
          {
            ...errorResponse,
            error: { ...errorResponse.error, message: 'Database schema error' },
          },
          { status: 500 }
        );
      case '28000': // Invalid authorization
      case '28P01': // Invalid password
        return NextResponse.json(
          {
            ...errorResponse,
            error: {
              ...errorResponse.error,
              type: 'AUTH_ERROR',
              message: 'Authentication failed',
            },
          },
          { status: 401 }
        );
      default:
        return NextResponse.json(errorResponse, { status: 500 });
    }
  }

  // Handle validation errors
  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'validation' &&
    'message' in error
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: String(error.message),
          type: 'VALIDATION_ERROR',
        },
      },
      { status: 400 }
    );
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    // Check for "not found" errors
    if (error.message.toLowerCase().includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            type: 'NOT_FOUND',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          type: 'GENERAL_ERROR',
        },
      },
      { status: 500 }
    );
  }

  // Default error response
  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        type: 'GENERAL_ERROR',
      },
    },
    { status: 500 }
  );
}
