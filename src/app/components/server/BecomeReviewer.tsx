import React, { FunctionComponent } from 'react';
import { Button } from '../client/Button';

export const BecomeReviewer: FunctionComponent = () => {
  return (
    <section className="py-8">
      <div className="w-full bg-blue-500 px-6 py-8">
        <div className="text-white text-center space-y-1 px-14 md:px-0">
          <h2 className="text-2xl font-extrabold">Boost conversion with video reviews</h2>
          <p className="text-base font-normal">
            {' '}
            Are you a retailer wanting to display expeerly reviews for free?
          </p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="w-full bg-white mt-6 mx-auto sm:w-[300px] text-[#111827]"
        >
          Become A Reviewer
        </Button>
      </div>
    </section>
  );
};
