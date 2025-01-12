import { NextResponse } from 'next/server';
import { handleError } from './errorHandler';
import { getFilterOptions, getLanguageFromRequest, getPaginationParams } from './requestHelpers';

/**
 * Base interface for request parameters used across API routes
 * @interface BaseRequestParams
 */
export interface BaseRequestParams {
  /** Pagination parameters for the request */
  pagination: ReturnType<typeof getPaginationParams>;
  /** Language code for content localization */
  language?: string;
  /** Filter options for the request */
  filters?: ReturnType<typeof getFilterOptions>;
}

/**
 * Configuration options for creating a route handler
 * @interface RouteHandlerOptions
 * @template T - The type of data returned by the service function
 */
export interface RouteHandlerOptions<T> {
  /** Service function that processes the request and returns data */
  serviceFunction: (params: BaseRequestParams) => Promise<T>;
  /** Whether to include language parameter in the request */
  includeLanguage?: boolean;
  /** Whether to include filters in the request */
  includeFilters?: boolean;
}

/**
 * Creates a Next.js API route handler with standardized request processing
 * @template T - The type of data returned by the service function
 * @param {RouteHandlerOptions<T>} options - Configuration options for the route handler
 * @returns {Function} A Next.js API route handler function
 */
export function createRouteHandler<T>({
  serviceFunction,
  includeLanguage = false,
  includeFilters = false,
}: RouteHandlerOptions<T>) {
  return async function handler(request: Request) {
    try {
      const params: BaseRequestParams = {
        pagination: getPaginationParams(request),
      };

      if (includeLanguage) {
        params.language = getLanguageFromRequest(request);
      }

      if (includeFilters) {
        params.filters = getFilterOptions(request);
      }

      const data = await serviceFunction(params);

      return NextResponse.json({
        success: true,
        data,
      });
    } catch (error) {
      return handleError(error);
    }
  };
}
