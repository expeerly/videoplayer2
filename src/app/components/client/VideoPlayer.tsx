'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import { usePathname } from '@/src/i18n/routing';
import { useTranslations } from 'next-intl';

type Props = {
  playbackId: string;
};

export const VideoPlayer: FunctionComponent<Props> = ({ playbackId }) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    if (!playerRef.current) return;
    if (pathname.includes(`/explore/${playbackId}`) && canPlay) {
      playerRef.current.play().catch(console.log);
    } else {
      playerRef.current.pause();
    }
  }, [pathname, playbackId, canPlay]);

  return (
    <div ref={containerRef} className={`w-full h-full relative `}>
      <MuxPlayer
        onCanPlay={() => setCanPlay(true)}
        ref={playerRef}
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
      {canPlay === false && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-full w-full flex items-center justify-center bg-black">
          {t('loading')}
        </div>
      )}
    </div>
  );
};
