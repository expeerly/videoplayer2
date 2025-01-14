'use client';
import { FunctionComponent, useEffect, useRef } from 'react';
import { Video, VideoCard } from '../server/Video/VideoCard';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useSharedState } from '../../context/reducer';

type Props = {
  videos: Video[];
};

export const VideoFeed: FunctionComponent<Props> = ({ videos }) => {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userHistory } = useSharedState();

  // Set up video scroll detection
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
  }, [router]);

  // Handle initial navigation and back button
  useEffect(() => {
    // Redirect to first video if on base explore page
    if (pathname === '/explore') {
      router.replace(`/explore/${videos[0].playbackId}`, { scroll: false });
    }

    // Handle back button
    const entryPath = userHistory[userHistory.length - 2];
    console.log({ entryPath, pathname });
    const handleBack = () => router.push(entryPath || '/');

    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [pathname, router, videos, userHistory]);

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
          data-video-id={video.playbackId}
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};
