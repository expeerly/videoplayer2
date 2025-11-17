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

// Shape of what we need from the mux-player element in the event
interface MediaWrapper {
  nativeEl?: HTMLVideoElement | null;
}

interface MuxPlayerWithMedia {
  media?: HTMLVideoElement | MediaWrapper | null;
}

interface AudioTrackLike {
  language?: string;
  enabled?: boolean;
}

interface AudioTrackListLike {
  length: number;
  [index: number]: AudioTrackLike | undefined;
}

export const VideoPlayer: FunctionComponent<Props> = ({ playbackId, id, isVideoDetails }) => {
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = useLocale();

  const onLoadedData = useCallback(
    (evt: Event) => {
      const target = evt.target as (EventTarget & MuxPlayerWithMedia) | null;
      if (!target || !target.media) return;

      const mediaCandidate = target.media;

      let videoEl: HTMLVideoElement | null = null;

      if (mediaCandidate instanceof HTMLVideoElement) {
        videoEl = mediaCandidate;
      } else if (
        'nativeEl' in mediaCandidate &&
        mediaCandidate.nativeEl instanceof HTMLVideoElement
      ) {
        videoEl = mediaCandidate.nativeEl;
      }

      if (!videoEl) return;

      const normalize = (val?: string) => (val ?? '').toLowerCase().slice(0, 2);
      const locale2 = normalize(locale);

      // --- Audio tracks (like your Stencil code) ---
      const audioTracks = (videoEl as HTMLVideoElement & { audioTracks?: AudioTrackListLike })
        .audioTracks;

      if (audioTracks && audioTracks.length > 0) {
        for (let i = 0; i < audioTracks.length; i += 1) {
          const track = audioTracks[i];
          if (!track) continue;
          const lang2 = normalize(track.language);
          track.enabled = lang2 === locale2;
        }
      }

      // --- Text tracks (subtitles) ---
      const textTracks = videoEl.textTracks;

      // (Optional but very useful while debugging)
      // console.log(
      //   'textTracks:',
      //   Array.from(textTracks).map((t) => ({
      //     label: t.label,
      //     language: t.language,
      //     kind: t.kind,
      //     mode: t.mode,
      //   })),
      // );

      for (let i = 0; i < textTracks.length; i += 1) {
        const track = textTracks[i];
        if (!track) continue;
        const lang2 = normalize(track.language);
        track.mode = lang2 === locale2 ? 'showing' : 'hidden';
      }
    },
    [locale]
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isVideoDetails) {
      player.play().catch(console.log);
      return;
    }

    if (pathname.includes(id ? id.split('-')[0] : '')) {
      const activeVideoId = localStorage.getItem('activeVideoId');

      if (activeVideoId === id) {
        player.play().catch(console.log);
      } else {
        player.pause();
      }
    } else {
      player.pause();
    }
  }, [id, pathname, isVideoDetails]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <MuxPlayer
        ref={playerRef}
        autoPlay
        loop
        muted={false}
        playbackId={playbackId}
        streamType="on-demand"
        className="absolute bottom-0 top-0 left-0 right-0 h-full w-full"
        metadata={{
          video_id: playbackId,
          video_title: ' ',
        }}
        defaultHiddenCaptions={false}
        onLoadedData={onLoadedData}
      />
    </div>
  );
};
