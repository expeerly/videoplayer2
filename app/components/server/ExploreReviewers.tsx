import React, { FunctionComponent } from "react";
import { Button } from "../../../components/ui/server";
import { VideoGrid } from "../../../components/ui/server/VideoGrid";

type ReviewGridProps = {
  reviews?: {
    id: number;
    productName: string;
    brand: string;
    rating: number;
    view: number;
  }[];
  hasHeader?: boolean;
  id: string;
};

export const ExpolreReviewers: FunctionComponent<ReviewGridProps> = ({
  id,
}) => {
  return (
    <div id={id} className=" w-full  sm:max-w-[900px] py-10 pl-3 lg:pl-0">
      <h1 className=" md:w-2/3 lg:w-2/5 font-extrabold text-2xl sm:text-start text-center text-[#0E0E0F]">
        Each Expeerly reviewer has a personal story to share
      </h1>

      <VideoGrid
        description="I love cooking and getting people around in our garden, specially
            when weather is good..."
      />

      <div>
        <VideoGrid
          description="I love cooking and getting people around in our garden, specially
            when weather is good..."
        />
        <div className="mr-3">
          <Button
            size="lg"
            variant="primary"
            className="mt-10 font-bold sm:w-auto w-full"
          >
            Explore All Reviewers
          </Button>
        </div>
      </div>
    </div>
  );
};