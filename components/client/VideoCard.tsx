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
          Explore
        </Chip>
        <Chip radius="sm" className="bg-[#0E0E0FB2] text-white" size="lg">
          Beauty & Personal Care
        </Chip>
        <Chip radius="sm" className="bg-[#0E0E0FB2] text-white" size="lg">
          Dyson
        </Chip>
        <Chip radius="sm" className="bg-[#0E0E0FB2] text-white" size="lg">
          Supersonic Professionalv
        </Chip>
      </div>
      <div className="flex gap-2  h-[90%] items-end">
        <div className="relative h-full w-[392px] flex bg-black">
          <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />
          <VideoInfo
            brand={"Dyson"}
            category={"Supersonic Professional"}
            rating={4.2}
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
