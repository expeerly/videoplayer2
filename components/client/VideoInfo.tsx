import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { StarRating } from "./StarRating";
import { Button } from "@nextui-org/button";
import { CircleCheck } from "lucide-react";

interface VideoInfoProps {
  brand: string;
  category: string;
  rating: number;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  brand,
  category,
  rating,
}) => {
  return (
    <>
      <div className="flex items-center absolute top-5 left-5 text-white gap-1">
        <Avatar size="sm" />
        <span>Carmo L.</span>
        <CircleCheck />
      </div>
      <div className="absolute bottom-5 px-5 justify-between flex items-center w-full text-white">
        <div className="flex gap-2 items-center">
          <Avatar />{" "}
          <div className="flex  flex-col">
            <h2 className="text-sm font-semibold">@{brand}</h2>
            <p className="text-sm">{category}</p>
            <div className="flex gap-2 items-center">
              <span>{rating}</span>
              <StarRating size="sm" rating={rating} showRating={false} />
            </div>
          </div>
        </div>
        <Button onClick={() => console.log("Buy Now")} color="danger">
          Buy Now
        </Button>
      </div>
    </>
  );
};
