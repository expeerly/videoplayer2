import { TransformResult } from '../app/api/utils/csvDataTransformToJSON';
import { ApiResponse } from '../hooks/useApi';

export const handleError = (error: unknown, cb: (message: string) => void) => {
  let errorMessage = 'An unexpected error occurred';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'object' && error !== null) {
    // Handle API error responses
    const apiError = error as {
      message?: string;
      error?: { message?: string };
    };

    errorMessage = apiError.error?.message || apiError.message || errorMessage;
  }

  cb(errorMessage);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uploadData = async (
  transformedData: TransformResult[],
  cb: (data: TransformResult[]) => Promise<ApiResponse<unknown> | null>,
  chunkSize = 100
) => {
  const dataChunks = chunkArray(transformedData, chunkSize);
  let successCount = 0;
  let failedCount = 0;

  // Process chunks sequentially
  for (const chunk of dataChunks) {
    try {
      const res = await cb(chunk);
      if (res?.success) {
        successCount += chunk.length;
      } else {
        failedCount += chunk.length;
      }
    } catch (chunkError) {
      console.log(chunkError);
      failedCount += chunk.length;
    }
  }

  return {
    successCount,
    failedCount,
  };
};
