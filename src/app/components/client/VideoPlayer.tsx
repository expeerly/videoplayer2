'use client';

import { FunctionComponent, useEffect, useRef } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import { usePathname } from '@/src/i18n/routing';

type Props = {
  playbackId: string;
};

export const VideoPlayer: FunctionComponent<Props> = ({ playbackId }) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!playerRef.current) return;
    if (pathname.includes(`/explore/${playbackId}`)) {
      playerRef.current.play().catch(console.log);
    } else {
      playerRef.current.pause();
    }
  }, [pathname, playbackId]);

  return (
    <div ref={containerRef} className={`w-full h-full relative `}>
      <MuxPlayer
        ref={playerRef}
        autoPlay
        loop
        muted={false}
        playbackId={playbackId}
        className="absolute bottom-0 top-0 left-0 right-0 h-full w-full"
        metadata={{
          video_id: playbackId,
          video_title: 'TikTok Style Video',
        }}
        defaultHiddenCaptions={false}
        thumbnailTime={0}
      />
    </div>
  );
};
