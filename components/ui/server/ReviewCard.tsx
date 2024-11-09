import React, { FunctionComponent } from "react";
import {VideoThumbnail} from "./VideoThumbnail";
import { StarRating } from "./StarRating";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { Avatar } from "./Avatar";

type Props = {
  review: {
    id: number;
    rating: number;
    view: number;
    brand: string;
    productName: string;
  };
};

export const ReviewCard: FunctionComponent<Props> = ({ review }) => {
  return (
    <div
      key={review.id}
      className="relative min-w-[160px] max-w-[160px] rounded-xl overflow-hidden box-border"
    >
      <div className={`h-64 relative group cursor-pointer`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <VideoThumbnail playbackID="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe" />
        <div className="absolute top-3 left-3   text-white  rounded-full font-medium text-xs">
          <div className="flex items-center gap-1 justify-center ml-1">
            {review.rating}
            <StarRating rating={review?.rating} size="sm" showRating={false} />
          </div>
          <div className="flex items-center mt-1 ">
            <PlayIcon  />
            {review.view}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="bg-white p-1 rounded-full">
              <Avatar size="sm" />
            </div>
            <div className="text-white w-24 ">
              <p className="text-sm font-medium leading-tight">
                {review.brand}
              </p>
              <p className="text-sm font-medium opacity-90 w-full truncate">
                {review.productName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
