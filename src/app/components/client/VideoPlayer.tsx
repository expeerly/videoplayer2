'use client';

import { FunctionComponent, useEffect, useRef } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';

type Props = {
  playbackId: string;
  isFirst?: boolean;
};

export const VideoPlayer: FunctionComponent<Props> = ({ playbackId, isFirst = false }) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!playerRef.current) return;
        if (entry.isIntersecting) {
          playerRef.current.play().catch(console.log);
        } else {
          playerRef.current.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <MuxPlayer
        ref={playerRef}
        autoPlay={isFirst}
        loop
        muted={false}
        playbackId={playbackId}
        style={{ height: '100%', width: '100%' }}
        metadata={{
          video_id: playbackId,
          video_title: 'TikTok Style Video',
        }}
      />
    </div>
  );
};
