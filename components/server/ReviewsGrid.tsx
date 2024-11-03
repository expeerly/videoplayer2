import React, { FunctionComponent } from "react";

import { CardHeaderProps, ProfileCard } from "../client/ProfileCard";

import { ReviewCard } from "./ReviewCard";

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
  cardHeaderProps?: CardHeaderProps;
  hasHeader?: boolean;
};
const tempreviews = [
  {
    id: 1,
    productName: "Grill & Grid jvasgfh h kjewfkuteg kajewfkguiaej",
    brand: "Kaarlig",
    rating: 5,
    bgColor: "bg-gray-200",
    view: 500.399,
  },
  {
    id: 2,
    productName: "Supersonic",
    brand: "Dyson",
    rating: 4.1,
    bgColor: "bg-gray-300",
    view: 456619,
  },
  {
    id: 3,
    productName: "Headp",
    brand: "Dyson",
    rating: 4,
    bgColor: "bg-gray-200",
    view: 48715314,
  },
  {
    id: 4,
    productName: "Supersonic Pro",
    brand: "Dyson",
    rating: 2.5,
    bgColor: "bg-gray-300",
    view: 1564864,
  },
  {
    id: 5,
    productName: "Super Hair",
    brand: "Dyson",
    rating: 4.4,
    bgColor: "bg-gray-200",
    view: 8798841,
  },
];

export const ReviewsGrid: FunctionComponent<ReviewGridProps> = ({
  description,
  cardHeaderProps,
  reviews = tempreviews,
  hasHeader = true,
}) => {
  return (
    <div className="w-full">
      {hasHeader && (
        <div className="mb-5">
          <ProfileCard {...cardHeaderProps} />
          {description && (
            <div className="flex  sm:w-2/5 items-center mt-2">
              <p className=" text-gray-700 ml-2 line-clamp-2">
                {`I love cooking and getting people around in our garden, specially
            when weather is good...`}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-[15px] overflow-x-auto sm:flex-wrap  justify-start w-full">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
