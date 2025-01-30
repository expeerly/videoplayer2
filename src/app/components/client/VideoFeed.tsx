'use client';

import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useParams } from 'next/navigation';
import { useSharedState } from '../../context/reducer';
import { VideoResponse } from '@/src/db/types';
import { useVideoState } from '../../hooks/useVideoState';
import { useVideoFetching } from '../../hooks/useVideoFetching';
import { useVideoScroll } from '../../hooks/useVideoScroll';
import { VideoCard } from '../server/Video/VideoCard';
import { Spinner } from './Spinner';
import { Button } from './Button';
import { BinocularsIcon } from '@/src/assets/icons';

// Types
type VideoContainerProps = {
  video: VideoResponse;
  uniqueId: string;
  clearVideos: () => void;
  isMoreVideos: boolean;
};

type ErrorMessageProps = {
  message: string;
};

// Constants
const ROUTES = {
  EXPLORE: '/explore',
  VIDEO_REVIEWS: '/video-reviews',
} as const;

// Subcomponents with proper types
const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-red-500 p-4 text-center bg-red-50 rounded-lg">
      <p className="font-medium">Error loading videos</p>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const LoadingSpinner: FunctionComponent = () => (
  <div className="flex items-center justify-center h-full">
    <Spinner />
  </div>
);

const VideoContainer: FunctionComponent<VideoContainerProps> = ({
  video,
  uniqueId,
  clearVideos,
  isMoreVideos,
}) => (
  <div
    className="video-container h-full snap-start snap-always pb-4 sm:h-[95%] sm:py-6"
    data-video-id={video.id}
    data-video-unique-id={uniqueId}
  >
    {'playbackId' in video && (
      <>
        <VideoCard video={video as VideoResponse} videoId={uniqueId} />

        {!isMoreVideos && (
          <div className="text-gray-500 flex flex-col gap-2 w-full mx-auto sm:max-w-[441px] md:pr-[58px]">
            <p className="text-grey-700 text-center">There are no more videos to watch.</p>
            <Button
              variant="outline"
              href={ROUTES.EXPLORE}
              className="!text-grey-700 !border-black hover:border-black"
              onClick={clearVideos}
            >
              <BinocularsIcon /> Go to explore
            </Button>
          </div>
        )}
      </>
    )}
  </div>
);

// Main component
export const VideoFeed: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, operations } = useVideoState();
  const [activeVideosType, setActiveVideosType] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { userHistory } = useSharedState();

  // Video visibility handler
  const handleVideoVisible = useCallback(
    (videoId: string, uniqueId: string) => {
      if (videoId !== params?.videoId) {
        localStorage.setItem('activeVideoId', uniqueId);
        router.replace(`${ROUTES.EXPLORE}/${videoId}`, { scroll: false });
      }
    },
    [router, params?.videoId]
  );

  useVideoScroll(containerRef, handleVideoVisible);
  const fetchVideos = useVideoFetching(operations);

  // Navigation dependencies
  const navigationDeps = useMemo(
    () => ({
      pathname,
      videoId: pathname.split('/').length === 4 ? null : params?.videoId,
      hasVideos: state.videos.length > 0,
      lastVideoId: state.videos[state.videos.length - 1]?.id,
      activeVideosType,
      isMoreVideos: state.isMoreVideos,
    }),
    [pathname, params?.videoId, state.videos, activeVideosType, state.isMoreVideos]
  );

  // Handle video type and path changes
  useEffect(() => {
    if (pathname === ROUTES.EXPLORE) {
      setActiveVideosType(ROUTES.EXPLORE);
    }

    if (pathname.split('/').length === 4 && activeVideosType !== pathname) {
      setActiveVideosType(pathname);

      operations.clearVideos();
      operations.setLoading(true);
    }
  }, [pathname, activeVideosType, operations]);

  // Handle navigation and back button
  useEffect(() => {
    const isExplorePage =
      pathname.includes(ROUTES.EXPLORE) || pathname.includes(ROUTES.VIDEO_REVIEWS);
    const currentVideoId = params?.videoId as string;

    if (isExplorePage && state.videos.length > 0 && !currentVideoId) {
      router.push(`${ROUTES.EXPLORE}/${state.videos[0].id}`, { scroll: false });
      return;
    }
  }, [pathname, router, params?.videoId, state.videos]);

  // Handle video fetching
  useEffect(() => {
    const { videoId, hasVideos, lastVideoId, activeVideosType, isMoreVideos, pathname } =
      navigationDeps;
    const isNewVideo = hasVideos && pathname.includes(`${lastVideoId}`);
    const pathParts = activeVideosType.split('/') || pathname.split('/');

    if (pathParts.length === 4 && isMoreVideos) {
      if (!hasVideos || (isNewVideo && videoId)) {
        fetchVideos(undefined, pathParts[2], pathParts[3]);
      }
    }
    if (!hasVideos && !!videoId) {
      fetchVideos(videoId as string);
    } else if (
      (isNewVideo && videoId && pathParts.length !== 4) ||
      (activeVideosType === ROUTES.EXPLORE && !hasVideos)
    ) {
      fetchVideos();
    }
  }, [navigationDeps, fetchVideos]);

  useEffect(() => {
    const entryPath = userHistory[userHistory.length - 2];
    const handleBack = () => router.push(entryPath || '/');

    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [pathname, router, userHistory]);

  // Memoized video list
  const videoList = useMemo(
    () =>
      state.videos?.map((video, i) => (
        <VideoContainer
          key={`${video.id}-${i}`}
          video={video}
          uniqueId={`${video.id}-${i}`}
          clearVideos={() => {
            setActiveVideosType(ROUTES.EXPLORE);
            operations.clearVideos();
          }}
          isMoreVideos={state.isMoreVideos}
        />
      )),
    [state.videos, state.isMoreVideos, operations]
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
