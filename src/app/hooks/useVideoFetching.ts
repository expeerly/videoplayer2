import { useRef, useCallback } from 'react';

import { useVideoState } from './useVideoState';
import { useApiCall } from '@/src/hooks/useApi';
import { VideoResponse } from '@/src/db/types';

export const useVideoFetching = (operations: ReturnType<typeof useVideoState>['operations']) => {
  const { get } = useApiCall();
  const fetchingRef = useRef(false);

  return useCallback(
    async (videoId?: string) => {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      operations.setLoading(true);

      try {
        if (videoId) {
          const res = await get<VideoResponse>(`/video/${videoId}`);
          if (res?.success) {
            operations.addVideos([res.data]);
            const exploreRes = await get<VideoResponse[]>('/video/explore');
            if (exploreRes?.success) {
              operations.addVideos(exploreRes.data);
            }
          }
        } else {
          const res = await get<VideoResponse[]>('/video/explore');
          if (res?.success) {
            operations.addVideos(res.data);
          }
        }
        operations.setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch videos';
        operations.setError(errorMessage);
      } finally {
        operations.setLoading(false);
        fetchingRef.current = false;
      }
    },
    [get, operations]
  );
};
