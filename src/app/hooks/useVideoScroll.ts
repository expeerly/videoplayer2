import { useRef, useEffect } from 'react';

type VideoVisibilityCallback = (videoId: string, index: string) => void;

export const useVideoScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onVideoVisible: VideoVisibilityCallback
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(onVideoVisible);

  // Update callback ref when onVideoVisible changes
  useEffect(() => {
    callbackRef.current = onVideoVisible;
  }, [onVideoVisible]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const options = {
      root: container,
      threshold: 0.7,
      rootMargin: '0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (!visibleEntry?.target) return;

      const videoElement = visibleEntry.target;
      const videoId = videoElement.getAttribute('data-video-id');
      const videoUniqueId = videoElement.getAttribute('data-video-unique-id');

      if (videoId && videoUniqueId) {
        callbackRef.current(videoId, videoUniqueId);
      }
    };

    try {
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(handleIntersection, options);

      const updateObserver = () => {
        const videoElements = container.querySelectorAll('.video-container');
        videoElements.forEach(el => observerRef.current?.observe(el));
      };

      // Initial observation
      updateObserver();

      // Create mutation observer to watch for new videos
      const mutationObserver = new MutationObserver(updateObserver);
      mutationObserver.observe(container, { childList: true, subtree: true });

      return () => {
        observerRef.current?.disconnect();
        mutationObserver.disconnect();
      };
    } catch (error) {
      console.error('Error in intersection observer:', error);
    }
  }, [containerRef]);
};
