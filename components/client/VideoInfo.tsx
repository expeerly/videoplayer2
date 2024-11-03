import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { Button } from "@nextui-org/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

import { StarRating } from "./StarRating";
import VideoTags from "./VideoTags";
import { VideoActions } from "./VideoActions";

import { Video } from "@/types";

type VideoInfoProps = {
  brand: string;
  category: string;
  rating: number;
  video: Video;
  moreHandler: () => void;
};

export const VideoInfo: React.FC<VideoInfoProps> = ({
  brand,
  category,
  rating,
  video,
  moreHandler,
}) => {
  return (
    <>
      <Link
        className="flex items-center absolute top-5 left-5 text-white gap-1"
        href={"/explore/reviewer/1234"}
      >
        <Avatar size="sm" />
        <span>Carmo L.</span>
        <CircleCheck />
      </Link>
      <div className=" absolute w-full flex sm:hidden top-20 left-0 ">
        <VideoTags />
      </div>

      <div className=" absolute right-5  flex sm:hidden text-white top-60">
        <VideoActions
          comments={video.comments}
          likes={video.likes}
          moreHandler={moreHandler}
          shares={video.shares}
        />
      </div>

      <div className="absolute bottom-5 px-5  justify-between flex items-center w-full text-white">
        <div className="flex gap-2 items-center">
          <Avatar />
          <div className="flex  flex-col">
            <Link href={`/explore/brand/${brand}`}>
              <h2 className="text-sm font-semibold">@{brand}</h2>
            </Link>
            <Link href={`/explore/productcategory/${category}`}>
              <p className="text-sm">{category}</p>
            </Link>
            <div className="flex gap-2 items-center">
              <span>{rating}</span>
              <StarRating rating={rating} showRating={false} size="sm" />
            </div>
          </div>
        </div>
        <Button color="danger" onClick={() => console.log("Buy Now")}>
          Buy Now
        </Button>
      </div>
    </>
  );
};
