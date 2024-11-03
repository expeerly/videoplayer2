"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { VideoPlayer } from "../server/VideoPlayer";

import { VideoActions } from "./VideoActions";
import { VideoInfo } from "./VideoInfo";
import VideoTags from "./VideoTags";

import { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  isVisible: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isVisible }) => {
  const router = useRouter();

  const moreHandler = useCallback(() => {
    router.push(
      `/video-reviews/${video.category}/${video.brandName}/${video.productName}/${video.playbackId}`,
    );
  }, [router]);

  return (
    <div className=" h-full w-full flex flex-col gap-3 snap-start items-center justify-center ">
      <div className="hidden sm:flex ">
        <VideoTags />
      </div>

      <div className="flex gap-2  justify-center  w-full h-full  sm:h-[90%] items-end">
        <div className="relative h-full  flex bg-black">
          <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />
          <VideoInfo
            brand={"Dyson"}
            category={"Supersonic Professional"}
            moreHandler={moreHandler}
            rating={4.2}
            video={video}
          />
        </div>
        <div className="hidden sm:flex ">
          <VideoActions
            comments={video.comments}
            likes={video.likes}
            moreHandler={moreHandler}
            shares={video.shares}
          />
        </div>
      </div>
    </div>
  );
};
