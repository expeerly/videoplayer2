'use client';

import { FunctionComponent, useCallback, useEffect, useRef } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import { usePathname } from '@/src/i18n/routing';
import { useLocale } from 'next-intl';

type Props = {
  id?: string;
  playbackId: string;
  isVideoDetails?: boolean;
};
export const VideoPlayer: FunctionComponent<Props> = ({ playbackId, id, isVideoDetails }) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = useLocale();

  const onCanPlay = useCallback(() => {
    if (playerRef.current && playerRef.current.audioTracks) {
      for (let i = 0; i < playerRef.current.audioTracks.length; i++) {
        const track = playerRef.current.audioTracks[i];
        if (track) {
          track.enabled = track.language.startsWith(locale);
        }
      }
    }

    if (playerRef.current && playerRef.current.textTracks) {
      for (let i = 0; i < playerRef.current.textTracks.length; i++) {
        const track = playerRef.current.textTracks[i];
        if (track) {
          track.mode = track.language.startsWith(locale) ? 'showing' : 'hidden';
        }
      }
    }
  }, [locale]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (isVideoDetails) {
      playerRef.current.play().catch(console.log);
      return;
    }
    if (pathname.includes(id ? id?.split('-')[0] : '')) {
      const activeVideoId = localStorage.getItem('activeVideoId');

      if (activeVideoId === id) {
        playerRef.current.play().catch(console.log);
      } else {
        playerRef.current.pause();
      }
    } else {
      playerRef.current.pause();
    }
  }, [id, pathname, isVideoDetails]);

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
          video_title: ' ',
        }}
        defaultHiddenCaptions={false}
        onLoadedData={onCanPlay}
      />
    </div>
  );
};
