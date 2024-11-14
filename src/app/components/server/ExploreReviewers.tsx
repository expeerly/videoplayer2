import React, { FunctionComponent } from 'react';
import { Button } from '@/src/app/components/server/Button';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { getDictionary } from '@/src/lib/dictionary';

export const ExpolreReviewers: FunctionComponent = async () => {
  const t = await getDictionary();
  return (
    <section
      id="explore-reviewers"
      className="flex flex-col gap-8 w-full py-12  md:pt-14 md:pb-[70px] md:max-w-[900px]  "
    >
      <h2 className="px-5 font-extrabold text-2xl text-center text-gray-700 sm:w-1/2 md:w-2/3 lg:w-2/4 sm:text-start mid-lg:px-0">
        {t.home_h2}
      </h2>

      <ReviewGrid />
      <ReviewGrid />
      <div className="w-full sm:max-w-[300px] px-5 mid-lg:px-0">
        <Button href="/video-reviews/reviewer" size="lg" variant="primary" fullWidth>
          {t.cta_button}
        </Button>
      </div>
    </section>
  );
};
