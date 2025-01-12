import { NextResponse } from 'next/server';
import { handleError } from './errorHandler';
import { getFilterOptions, getLanguageFromRequest, getPaginationParams } from './requestHelpers';

export interface BaseRequestParams {
  pagination: ReturnType<typeof getPaginationParams>;
  language?: string;
  filters?: ReturnType<typeof getFilterOptions>;
}

export interface RouteHandlerOptions<T> {
  serviceFunction: (params: BaseRequestParams) => Promise<T>;
  includeLanguage?: boolean;
  includeFilters?: boolean;
}

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
        metadata: {
          pagination: params.pagination,
          language: params.language,
          filters: params.filters,
        },
      });
    } catch (error) {
      return handleError(error);
    }
  };
}
