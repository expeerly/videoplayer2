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

  // const onCanPlay = useCallback(() => {
  //   // if (playerRef.current && playerRef.current.audioTracks) {
  //   //   for (let i = 0; i < playerRef.current.audioTracks.length; i++) {
  //   //     const track = playerRef.current.audioTracks[i];
  //   //     if (track) {
  //   //       track.enabled = track.language.startsWith(locale);
  //   //     }
  //   //   }
  //   // }

  //   // if (playerRef.current && playerRef.current.textTracks) {
  //   //   for (let i = 0; i < playerRef.current.textTracks.length; i++) {
  //   //     const track = playerRef.current.textTracks[i];
  //   //     if (track) {
  //   //       track.mode = track.language.startsWith(locale) ? 'showing' : 'hidden';
  //   //     }
  //   //   }
  //   // }

  //   type MuxPlayerWithMedia = {
  //     media?: {
  //       nativeEl?: HTMLVideoElement | null;
  //     } | null;
  //   };

  //   const muxPlayerEl = playerRef.current as unknown as MuxPlayerWithMedia;
  //   if (!muxPlayerEl?.media?.nativeEl) return;

  //   const videoEl = muxPlayerEl.media.nativeEl as HTMLVideoElement;

  //   const normalize = (val?: string) => (val || '').toLowerCase().slice(0, 2);
  //   const locale2 = normalize(locale);

  //   // Audio tracks
  //   type LocalAudioTrack = { language?: string; enabled?: boolean };
  //   type LocalAudioTrackList = { length: number; [index: number]: LocalAudioTrack | undefined };
  //   const audioTracks = (videoEl as unknown as { audioTracks?: LocalAudioTrackList }).audioTracks;
  //   if (audioTracks) {
  //     for (let i = 0; i < audioTracks.length; i++) {
  //       const track = audioTracks[i];
  //       if (!track) continue;
  //       const lang2 = normalize(track.language);
  //       track.enabled = lang2 === locale2;
  //     }
  //   }

  //   // Text tracks (subtitles)
  //   const { textTracks } = videoEl;
  //   if (textTracks) {
  //     for (let i = 0; i < textTracks.length; i++) {
  //       const track = textTracks[i];
  //       if (!track) continue;
  //       const lang2 = normalize(track.language);
  //       track.mode = lang2 === locale2 ? 'showing' : 'hidden';
  //     }
  //   }
  // }, [locale]);

  type MuxPlayerElement = HTMLElement & {
    media?: HTMLVideoElement | { nativeEl?: HTMLVideoElement } | null;
  };

  const onCanPlay = useCallback(
    (event: Event) => {
      // event is a DOM Event from mux-player; cast currentTarget/target to our element type
      const playerEl =
        (event.currentTarget as unknown as MuxPlayerElement) ??
        (event.target as unknown as MuxPlayerElement);

      // Try to match Stencil: playerEl.media is the video
      const media: HTMLVideoElement | undefined = (() => {
        const m = playerEl?.media;
        if (!m) return undefined;
        if (m instanceof HTMLVideoElement) return m;
        // fallback if media is a wrapper with nativeEl
        if ('nativeEl' in m && m.nativeEl instanceof HTMLVideoElement) return m.nativeEl;
        return undefined;
      })();

      if (!media) {
        console.log('No media element found on mux-player', playerEl);
        return;
      }

      const normalize = (val?: string) => (val || '').toLowerCase().slice(0, 2);
      const locale2 = normalize(locale);

      // 1) audio tracks
      type LocalAudioTrack = { language?: string; enabled?: boolean };
      type LocalAudioTrackList = { length: number; [index: number]: LocalAudioTrack | undefined };

      const audioTracks = (media as unknown as { audioTracks?: LocalAudioTrackList }).audioTracks;
      if (audioTracks?.length) {
        for (let i = 0; i < audioTracks.length; i++) {
          const t = audioTracks[i];
          if (!t) continue;
          const lang2 = normalize(t.language);
          t.enabled = lang2 === locale2;
        }
      }

      // 2) text tracks (subtitles)
      const textTracks = media.textTracks;
      console.log(
        'textTracks:',
        Array.from(textTracks).map(t => ({
          label: t.label,
          language: t.language,
          kind: t.kind,
          mode: t.mode,
        }))
      );

      for (let i = 0; i < textTracks.length; i++) {
        const t = textTracks[i];
        if (!t) continue;
        const lang2 = normalize(t.language);
        t.mode = lang2 === locale2 ? 'showing' : 'hidden';
      }
    },
    [locale]
  );
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
        streamType="on-demand"
        onLoadedData={onCanPlay}
        muted={false}
        playbackId={playbackId}
        className="absolute bottom-0 top-0 left-0 right-0 h-full w-full"
        metadata={{
          video_id: playbackId,
          video_title: ' ',
        }}
        defaultHiddenCaptions={false}
        // onLoadedData={onCanPlay}
      />
    </div>
  );
};
