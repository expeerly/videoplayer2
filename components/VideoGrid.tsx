import React, { FunctionComponent } from "react";
import { VideoCard } from "./VideoCard";
import ProfileCard from "./ProfileCard";
import VideoCardBg from "@/assets/videoCardBg";
import { Button } from "./ui";


type ReviewGridProps = {
  reviews?: {
    id: number;
    productName: string;
    brand: string;
    rating: number;
    bgColor: string;
    view: number;
  }[];
  description?: string;
  hasHeader?: boolean;
};
const tempreviews = [
    {
        id: 1,
        bgImage: VideoCardBg, 
        rating: 4.5,
        view: 1200,
        brand: "TechGurau",
        productName: "Smartphone XYZ",
      }, {
        id: 2,
        bgImage: VideoCardBg, 
        rating: 4.5,
        view: 1200,
        brand: "TechGurau",
        productName: "Smartphone XYZ",
      }, {
        id: 3,
        bgImage: VideoCardBg, 
        rating: 4.5,
        view: 1200,
        brand: "TechGurau",
        productName: "Smartphone XYZ",
      }, {
        id: 4,
        bgImage: VideoCardBg, 
        rating: 4.5,
        view: 1200,
        brand: "TechGurau",
        productName: "Smartphone XYZ",
      }, {
        id: 5,
        bgImage: VideoCardBg, 
        rating: 3.5,
        view: 1200,
        brand: "TechGurau",
        productName: "Smartphone XYZ",
      },
];


export const VideoGrid: FunctionComponent<ReviewGridProps> = ({
  description = false,
}) => {
  return (
    <div className=" max-w-[900px] py-10">
        <div>       
        <div className="mb-5">
          <ProfileCard  />
          {description && (
            <div className="flex  sm:w-2/5 items-center mt-2">
              <p className=" text-gray-700 ml-2 line-clamp-2">
                {`I love cooking and getting people around in our garden, specially
            when weather is good...`}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-[15px] overflow-x-auto sm:flex-wrap  justify-start w-full">
        {tempreviews.map((review) => (
          <VideoCard key={review.id} video={review} />
        ))}
      </div>
    </div>
    
    </div>
  );
};
