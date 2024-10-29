import React from "react";

import { VideoPlayer } from "./VideoPlayer";
import { VideoActions } from "./VideoActions";
import { VideoInfo } from "./VideoInfo";
import { Chip } from "@nextui-org/chip";
import { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  isVisible: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isVisible }) => {
  return (
    <div className=" h-full w-full flex flex-col gap-3 snap-start items-center justify-center ">
      <div className="flex w-full gap-3">
        <Chip radius="sm" className="bg-[#0E0E0FB2] text-white" size="lg">
          Tag{" "}
        </Chip>
        <Chip radius="sm" className="bg-[#0E0E0FB2] text-white" size="lg">
          Tag 2
        </Chip>
      </div>
      <div className="flex gap-2 w-full h-[90%] items-end">
        <div className="relative h-full w-[392px] flex bg-black">
          <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />

          <VideoInfo
            caption={video.caption}
            music={video.music}
            username={video.username}
          />
        </div>
        <VideoActions
          comments={video.comments}
          likes={video.likes}
          shares={video.shares}
        />
      </div>
    </div>
  );
};
