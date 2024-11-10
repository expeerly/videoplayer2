import React, { FunctionComponent } from 'react';
import { Button } from '../../../components/ui/server/Button';
import { ReviewGrid } from '../../../components/ui/server/ReviewGrid';

export const ExpolreReviewers: FunctionComponent = () => {
  return (
    <section
      id="explore-reviewers"
      className="flex flex-col gap-8 w-full py-12  md:pt-14 md:pb-[70px] md:max-w-[900px]  "
    >
      <h2 className="px-5 font-extrabold text-2xl text-center text-[#0E0E0F]  md:w-2/3 lg:w-2/5  sm:text-start mid-lg:px-0 ">
        Each Expeerly reviewer has a personal story to share
      </h2>

      <ReviewGrid />
      <ReviewGrid />
      <div className="w-full md:max-w-[300px] px-5 md:px-0">
        <Button size="lg" variant="primary" className="font-bold text-nowrap" fullWidth>
          Explore All Reviewers
        </Button>
      </div>
    </section>
  );
};
