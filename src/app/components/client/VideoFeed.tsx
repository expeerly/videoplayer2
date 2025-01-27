'use client';
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { VideoCard } from '../server/Video/VideoCard';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useSharedState } from '../../context/reducer';
import { useApiCall } from '@/src/hooks/useApi';
import { VideoResponse } from '@/src/db/types';
import { useParams } from 'next/navigation';

export const VideoFeed: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userHistory } = useSharedState();
  const [videos, setVideos] = useState<VideoResponse[]>([]);
  const { get } = useApiCall();

  const filterVideos = useCallback((newVideos: VideoResponse[]) => {
    setVideos(prevVideos => {
      const uniqueVideos = [...prevVideos, ...newVideos].reduce((acc, video) => {
        acc.set(video.id, video);
        return acc;
      }, new Map<string | number, VideoResponse>());

      return Array.from(uniqueVideos.values());
    });
  }, []);

  const fetchVideos = useCallback(
    async (videoId?: string) => {
      if (videoId) {
        const res = await get<VideoResponse>(`/video/${videoId}`);
        if (res?.success) {
          filterVideos([res.data]);
          fetchVideos();
        }
      } else {
        const res = await get<VideoResponse[]>('/video/explore');
        if (res?.success) {
          filterVideos(res.data);
        }
      }
    },
    [get, filterVideos]
  );

  // Navigation effect
  useEffect(() => {
    const isExplorePage = pathname === '/explore' || pathname === 'video-reviews';
    const currentVideoId = params?.videoId as string;
    const hasVideos = videos.length > 0;
    const lastVideoId = videos[videos.length - 1]?.id;
    const isNewVideo = hasVideos && pathname.includes(`${lastVideoId}`);

    // Handle initial navigation
    if (isExplorePage && hasVideos && !currentVideoId) {
      router.replace(`/explore/${videos[0].id}`, { scroll: false });
      return;
    }
    // Handle video fetching
    if ((!hasVideos && !currentVideoId) || isNewVideo) {
      fetchVideos();
    } else if (!hasVideos && currentVideoId) {
      fetchVideos(currentVideoId);
    }

    // Handle back navigation
    const entryPath = userHistory[userHistory.length - 2];
    const handleBack = () => router.push(entryPath || '/');
    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [pathname, router, videos, userHistory, params?.videoId, fetchVideos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        const visibleVideo = entries.find(entry => entry.isIntersecting);
        if (visibleVideo?.target) {
          const videoId = visibleVideo.target.getAttribute('data-video-id');
          if (videoId) {
            router.replace(`/explore/${videoId}`, { scroll: false });
          }
        }
      },
      { root: container, threshold: 0.7 }
    );

    // Observe all videos
    document.querySelectorAll('.video-container').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [router, videos, params?.videoId]);

  return (
    <div
      ref={containerRef}
      className="h-[91vh] flex-1 mx-auto w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none mb-2.5 relative sm:h-full"
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      {videos.map(video => (
        <div
          key={video.id}
          className="video-container h-full snap-start snap-always pb-4 sm:h-[95%] sm:py-6"
          data-video-id={video.id}
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};
