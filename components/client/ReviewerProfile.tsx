import React, { FunctionComponent } from "react";
import { Avatar } from "@nextui-org/avatar";

import { ReviewsGrid } from "../server/ReviewsGrid";

import { ReadMoreText } from "./ReadMoreText";

export const ReviewerProfile: FunctionComponent = () => {
  return (
    <div className="py-10  flex flex-col gap-10">
      <div>
        <div className="flex gap-3 mb-5">
          <Avatar size="lg" />
          <div className="flex-1">
            <h1 className=" text-2xl mb-2 font-extrabold "> Marisa C.</h1>
            <p>38, Zurich (CH)</p>
          </div>
        </div>

        <ReadMoreText
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. "
        />
      </div>
      <ReviewsGrid hasHeader={false} />
      {/* <div className="absolute top-10 right-10 flex flex-col">
        <Button radius="full" isIconOnly>
          <ShareIcon className="[&>path]:fill-black" />
        </Button>
        share
      </div> */}
    </div>
  );
};
