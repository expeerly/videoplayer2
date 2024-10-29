"use client";

import Link from "next/link";
import { useState } from "react";
import VideoThumbnail from "./VideoThumbnail";
import { Video } from "@/types";

interface Props {
  id?: number;
  videoTitle?: string;
  height?: string;
  playbackID: string;
  videodata?: Video;
  locale?: string;
  lazyloadState?: boolean;
  isMobile?: boolean;
}

const ShortVideoFrame = ({
  height = "w-full",
  playbackID,
  lazyloadState = false,
  isMobile,
}: Props) => {
  const [loadedState, setLoadedState] = useState<boolean>(false);

  const default_height = height;

  return (
    // <SkeletonComponent Loadstate={loadedState}>
    <div
      style={{ aspectRatio: "9/16" }}
      className={`${default_height} relative flex  max-w-fit cursor-pointer overflow-hidden rounded-[5px] bg-secondary_middle text-white min-[640px]:rounded-[12px]`}
    >
      <div className="flex w-full flex-col justify-end">
        <VideoThumbnail
          lazyloadState={lazyloadState}
          playbackID={playbackID}
          setLoadedState={setLoadedState}
          loadedState={loadedState}
          isMobile={isMobile}
        />

        {/* Video details */}
        <div className="absolute h-[45px] w-full sm:h-[80px]">
          <div className="relative h-[100%] w-full ">
            <div className="z-20 px-[10px] py-[5px] sm:bottom-[32.11px] sm:pl-[23px] sm:pt-[17px]">
              <Link
                href={""}
                className="z-10"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span
                  style={{ textShadow: "1.5px 3px 3px black" }}
                  className="line-clamp-2 w-[80%] text-ellipsis pb-[2.5px] pl-[3.5px] text-xs font-bold text-white sm:text-sm"
                >
                  {}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </SkeletonComponent>
  );
};

export default ShortVideoFrame;
