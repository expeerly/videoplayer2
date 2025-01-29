import { VideoResponse } from '@/src/db/types';
import { useState, useMemo } from 'react';

export type VideoState = {
  videos: VideoResponse[];
  loading: boolean;
  error: string | null;
};

export const useVideoState = () => {
  const [state, setState] = useState<VideoState>({
    videos: [],
    loading: false,
    error: null,
  });

  const operations = useMemo(
    () => ({
      addVideos: (newVideos: VideoResponse[]) => {
        setState(prev => {
          const videoMap = new Map(prev.videos.map(video => [video.id, video]));
          newVideos.forEach(video => videoMap.set(video.id, video));
          return {
            ...prev,
            videos: Array.from(videoMap.values()),
          };
        });
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
