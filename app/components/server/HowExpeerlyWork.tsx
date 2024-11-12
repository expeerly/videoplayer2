import { Button } from '@/components/ui/server/Button';
import React, { FunctionComponent } from 'react';

export const HowExpeerlyWorks: FunctionComponent = () => {
  return (
    <div className="w-full mt-12 mb-8 px-5 md:my-16 ">
      <div className="sm:w-[460px] w-auto mx-auto text-start sm:text-center">
        <h2 className="text-xl md:text-2xl text-center font-extrabold mb-4">How Expeerly works?</h2>
        <p className="text-[#0E0E0F] mb-6 w-full sm:max-w-2xl mx-auto">
          Expeerly is a place for consumers to get insights about what other shoppers think of
          products and services. The video reviews are real and authentic shared by our community of
          reviewers from our globe.
        </p>
        <Button size="lg" className="w-full sm:w-[300px] mx-auto" href="#" variant="outline">
          Learn more
        </Button>
      </div>
    </div>
  );
};
