import React, { FunctionComponent } from 'react';
import MuxPlayer from '@mux/mux-player-react';

type VideoPlayerProps = {
  playbackId: string;
  isVisible: boolean;
};

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ playbackId, isVisible }) => {
  return (
    <div className="w-full h-full relative">
      <MuxPlayer
        autoPlay={isVisible}
        loop={true}
        metadata={{
          video_id: playbackId,
          video_title: 'TikTok Style Video',
          viewer_user_id: 'viewer-1',
        }}
        muted={false}
        playbackId={playbackId}
        style={{ height: '100%', width: '100%' }}
        thumbnailTime={0}
        defaultHiddenCaptions={false}
        title=" "
      ></MuxPlayer>
    </div>
  );
};
