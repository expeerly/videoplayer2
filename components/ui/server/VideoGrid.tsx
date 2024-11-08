import React, { FunctionComponent } from "react";
import { ReviewCard } from "./VideoCard";
import { ProfileCard, ProfileCardProps } from "./ProfileCard";

type ReviewGridProps = {
  headerData?: ProfileCardProps;
};
const tempreviews = [
  {
    id: 1,
    rating: 4.5,
    view: 1200,
    brand: "TechGurau",
    productName: "Smartphone XYZ",
  },
  {
    id: 2,
    rating: 4.5,
    view: 1200,
    brand: "TechGurau",
    productName: "Smartphone XYZ",
  },
  {
    id: 3,
    rating: 4.5,
    view: 1200,
    brand: "TechGurau",
    productName: "Smartphone XYZ",
  },
  {
    id: 4,
    rating: 4.5,
    view: 1200,
    brand: "TechGurau",
    productName: "Smartphone XYZ",
  },
  {
    id: 5,
    rating: 3.5,
    view: 1200,
    brand: "TechGurau",
    productName: "Smartphone XYZ",
  },
];

export const VideoGrid: FunctionComponent<ReviewGridProps> = ({
  headerData,
}) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <ProfileCard {...headerData} />

      <div className="flex gap-[15px] overflow-x-auto scrollbar-thin scrollbar-none justify-start w-full pr-4">
        {tempreviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
