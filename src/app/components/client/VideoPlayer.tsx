'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';

type Props = {
  playbackId: string;
  isFirst?: boolean;
};

export const VideoPlayer: FunctionComponent<Props> = ({ playbackId, isFirst = false }) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canPlay, setCanPlay] = useState(false);

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

  useEffect(() => {
    if (playerRef) {
      playerRef.current?.shadowRoot?.childNodes.forEach(node => {
        if (node.nodeName === 'MEDIA-THEME') {
          node.childNodes.forEach(child => {
            if (child.nodeName === 'MUX-VIDEO') {
              const muxVideo = child as Element;
              muxVideo.shadowRoot?.childNodes.forEach(muxNode => {
                if (muxNode.nodeName === 'SLOT') {
                  const slotElement = muxNode as Element;
                  const nameAttribute = slotElement.getAttribute('name');

                  if (nameAttribute === 'media') {
                    slotElement.childNodes.forEach(slotChild => {
                      if (slotChild.nodeName === 'VIDEO') {
                        const videoElement = slotChild as HTMLVideoElement;
                        const styleSheet = `
                        video::-webkit-media-text-track-container {
                          transform: translateY(-120px) !important;
                        }
                          video{
                          height: max-content !important;

                          }
                        `;
                        const styleElement = document.createElement('style');
                        styleElement.textContent = styleSheet;
                        videoElement.appendChild(styleElement);
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-max relative overflow-hidden aspect-[9/16]`}>
      <MuxPlayer
        onCanPlay={() => setCanPlay(true)}
        ref={playerRef}
        autoPlay={isFirst}
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
          Loading...{' '}
        </div>
      )}
    </div>
  );
};
