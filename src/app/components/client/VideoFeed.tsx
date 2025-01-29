'use client';

import { FunctionComponent, useCallback, useEffect, useMemo, useRef, memo } from 'react';
import { VideoCard } from '../server/Video/VideoCard';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useSharedState } from '../../context/reducer';
import { VideoResponse } from '@/src/db/types';
import { useParams } from 'next/navigation';
import { useVideoState } from '../../hooks/useVideoState';
import { useVideoFetching } from '../../hooks/useVideoFetching';
import { useVideoScroll } from '../../hooks/useVideoScroll';

const ErrorMessage = memo<{ message: string }>(({ message }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-red-500 p-4 text-center bg-red-50 rounded-lg">
      <p className="font-medium">Error loading videos</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
));
ErrorMessage.displayName = 'ErrorMessage';

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

const VideoContainer = memo<{ video: VideoResponse }>(({ video }) => (
  <div
    className="video-container h-full snap-start snap-always pb-4 sm:h-[95%] sm:py-6"
    data-video-id={video.id}
  >
    <VideoCard video={video} />
  </div>
));
VideoContainer.displayName = 'VideoContainer';

// Main VideoFeed component
export const VideoFeed: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, operations } = useVideoState();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { userHistory } = useSharedState();

  // Memoize the video visible handler
  const handleVideoVisible = useCallback(
    (videoId: string) => {
      if (videoId !== params?.videoId) {
        router.replace(`/explore/${videoId}`, { scroll: false });
      }
    },
    [router, params?.videoId]
  );

  useVideoScroll(containerRef, handleVideoVisible);
  const fetchVideos = useVideoFetching(operations);

  // Memoize navigation effect dependencies
  const navigationDeps = useMemo(
    () => ({
      pathname,
      videoId: params?.videoId as string,
      hasVideos: state.videos.length > 0,
      lastVideoId: state.videos[state.videos.length - 1]?.id,
    }),
    [pathname, params?.videoId, state.videos]
  );

  // Effect for initial load and navigation
  useEffect(() => {
    const { pathname, videoId, hasVideos, lastVideoId } = navigationDeps;
    const isNewVideo = hasVideos && pathname.includes(`${lastVideoId}`);

    if (!hasVideos && !videoId) {
      fetchVideos();
    } else if (!hasVideos && videoId) {
      fetchVideos(videoId);
    } else if (isNewVideo && videoId) {
      fetchVideos();
    }
  }, [navigationDeps, fetchVideos]);

  // Effect for handling back navigation
  useEffect(() => {
    const isExplorePage = pathname === '/explore' || pathname === 'video-reviews';
    const currentVideoId = params?.videoId as string;

    if (isExplorePage && state.videos.length > 0 && !currentVideoId) {
      router.replace(`/explore/${state.videos[0].id}`, { scroll: false });
      return;
    }

    const entryPath = userHistory[userHistory.length - 2];
    const handleBack = () => router.push(entryPath || '/');
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [pathname, router, userHistory, params?.videoId, state.videos]);

  // Memoize the video list
  const videoList = useMemo(
    () => state.videos.map(video => <VideoContainer key={video.id} video={video} />),
    [state.videos]
  );

  return (
    <div
      ref={containerRef}
      className="h-[91vh] flex-1 mx-auto w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none mb-2.5 relative sm:h-full"
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      {state.loading && !state.videos.length && <LoadingSpinner />}
      {state.error && <ErrorMessage message={state.error} />}
      {videoList}
    </div>
  );
};
