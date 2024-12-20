'use client';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Video, VideoCard } from './VideoCard';
import { usePathname, useRouter } from '@/src/i18n/routing';

type Props = {
  videos: Video[];
};

export const VideoFeed: FunctionComponent<Props> = ({ videos }) => {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const pathParts = pathname.split('/');
    const videoId = pathParts[pathParts.length - 1];
    const index = videos.findIndex(v => v.playbackId === videoId);
    return index !== -1 ? index : 0;
  });
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-video-id');
            if (!videoId) return;

            const index = videos.findIndex(v => v.playbackId === videoId);
            if (index !== -1 && index !== currentIndex) {
              setCurrentIndex(index);
              // Update pathname
              console.log({ videoId });
              router.push(`/explore/${videoId}`, { scroll: false });
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.7,
      }
    );

    document.querySelectorAll('.video-container').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [videos, currentIndex, router]);

  useEffect(() => {
    console.log({
      pathname,
    });
    if (pathname === '/explore') {
      router.push(`/explore/${videos[0].playbackId}`, { scroll: false });
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="h-[91vh] flex-1 mx-auto w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none mb-2.5 relative sm:h-full"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`video-container h-full snap-start snap-always pb-4 sm:h-[95%] sm:py-6`}
          data-video-id={video.playbackId}
          data-index={index}
        >
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};
