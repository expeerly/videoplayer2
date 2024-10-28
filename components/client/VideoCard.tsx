import React from "react";

import { VideoPlayer } from "./VideoPlayer";
import { VideoActions } from "./VideoActions";
import { VideoInfo } from "./VideoInfo";

import { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  isVisible: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isVisible }) => {
  return (
    <div className="relative h-full w-full snap-start bg-black">
      <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

      <VideoInfo
        caption={video.caption}
        music={video.music}
        username={video.username}
      />

      <VideoActions
        comments={video.comments}
        likes={video.likes}
        shares={video.shares}
      />
    </div>
  );
};
