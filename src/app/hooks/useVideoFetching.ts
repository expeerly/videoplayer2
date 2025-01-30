import { useRef, useCallback, useState, useEffect } from 'react';

import { useVideoState } from './useVideoState';
import { useApiCall } from '@/src/hooks/useApi';
import { VideoResponse } from '@/src/db/types';
import { notFound } from 'next/navigation';

export const useVideoFetching = (operations: ReturnType<typeof useVideoState>['operations']) => {
  const { get, error } = useApiCall();
  const [lastVideosIds, setLastVideosIds] = useState<number[]>([]);
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (error?.status === 404) {
      notFound();
    }
  }, [error]);

  return useCallback(
    async (videoId?: string, type?: string, slug?: string) => {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      operations.setLoading(true);

      try {
        if (!!type && !!slug) {
          const res = await get<VideoResponse[]>(
            `/video/explore/?${type === 'reviewers' ? 'creator' : type}=${slug}&videoIds=${lastVideosIds.join(',')}`
          );
          if (res?.success) {
            operations.addVideos(res.data, res.data.length > 1);
            setLastVideosIds(res.data.map(video => video.id));
          }
        } else if (videoId) {
          const res = await get<VideoResponse>(
            `/video/${videoId}/?videoIds=${lastVideosIds.join(',')}`
          );

          if (!!res?.data.id) {
            operations.addVideos([res.data], true);
            setLastVideosIds([res.data.id]);

            const exploreRes = await get<VideoResponse[]>(
              `/video/explore/?videoIds=${lastVideosIds.join(',')}`
            );
            if (exploreRes?.success) {
              operations.addVideos(exploreRes.data, true);
              setLastVideosIds(exploreRes.data.map(video => video.id));
            }
          }
        } else {
          const res = await get<VideoResponse[]>(
            `/video/explore/?videoIds=${lastVideosIds.join(',')}`
          );
          if (res?.success) {
            operations.addVideos(res.data, true);
            setLastVideosIds(res.data.map(video => video.id));
          }
        }
        operations.setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch videos';
        operations.setError(errorMessage);
        notFound();
      } finally {
        operations.setLoading(false);
        fetchingRef.current = false;
      }
    },
    [get, operations, lastVideosIds]
  );
};
