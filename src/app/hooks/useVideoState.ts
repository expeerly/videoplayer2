import { VideoResponse } from '@/src/db/types';
import { useState, useMemo } from 'react';

export type VideoState = {
  videos: VideoResponse[];
  loading: boolean;
  error: string | null;
  isMoreVideos: boolean;
};

export const useVideoState = () => {
  const [state, setState] = useState<VideoState>({
    videos: [],
    loading: false,
    error: null,
    isMoreVideos: true,
  });

  const operations = useMemo(
    () => ({
      addVideos: (newVideos: VideoResponse[], isMoreVideos: boolean) => {
        setState(prev => ({
          ...prev,
          videos: [...prev.videos, ...newVideos],
          isMoreVideos: isMoreVideos,
        }));
      },
      clearVideos: () => {
        setState(prev => ({ ...prev, videos: [], isMoreVideos: true }));
      },
      setLoading: (loading: boolean) => {
        setState(prev => (prev.loading === loading ? prev : { ...prev, loading }));
      },
      setError: (error: string | null) => {
        setState(prev => (prev.error === error ? prev : { ...prev, error }));
      },
    }),
    []
  );

  return { state, operations };
};
