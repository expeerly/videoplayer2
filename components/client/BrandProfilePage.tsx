import React, { FunctionComponent } from "react";
import { Avatar } from "@nextui-org/avatar";

import { ReadMoreText } from "./ReadMoreText";
import { PaginationContainer } from "./PaginationContainer";
import { StarRating } from "./StarRating";

export const BrandProfilePage: FunctionComponent = () => {
  return (
    <div className="py-10 flex flex-col gap-10">
      <div>
        <div className="flex gap-3 mb-5">
          <Avatar size="lg" />
          <div className="flex-1">
            <h1 className=" text-2xl mb-2 font-extrabold ">
              Dyson title in 2 lines example. Video Reviews
            </h1>
            <div className="flex gap-1 items-center">
              <span>4.0</span>{" "}
              <StarRating rating={4} showRating={false} size="sm" />
            </div>
          </div>
        </div>

        <ReadMoreText
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. "
        />
      </div>
      <PaginationContainer />
      {/* <div className="absolute top-10 right-10 flex flex-col">
        <Button radius="full" isIconOnly>
          <ShareIcon className="[&>path]:fill-black" />
        </Button>
        share
      </div> */}
    </div>
  );
};
