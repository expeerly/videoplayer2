import React, { FunctionComponent } from "react";
import { ReviewCard } from "./VideoCard";
import ProfileCard from "./ProfileCard";
import VideoCardBg from "@/assets/videoCardBg";
import { Button } from "./ui";


type ReviewGridProps = {
  reviews?: {
    id: number;
    productName: string;
    brand: string;
    rating: number;
    view: number;
  }[];
  description?: string;
  hasHeader?: boolean;
  id: string
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


export const ExpolreReviewers: FunctionComponent<ReviewGridProps> = ({
  description = true, id
}) => {
  return (
    <div id={id} className=" w-full  sm:max-w-[900px] py-10 pl-3 lg:pl-0">
        <h1 className=" md:w-2/3 lg:w-2/5 font-extrabold text-2xl sm:text-start text-center text-[#0E0E0F]">Each Expeerly reviewer has 
        a personal story to share</h1>
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
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
    
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
      <div className="flex gap-[15px]  overflow-x-auto sm:flex-wrap  justify-start w-full">
        {tempreviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="mr-3">
      <Button size='lg' variant='primary' className="mt-10 font-bold sm:w-auto w-full">Explore All Reviewers</Button>
      </div>
    </div>
    </div>
  );
};
