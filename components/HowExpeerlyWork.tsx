import Link from "next/link";
import React, { FunctionComponent } from "react";

export const HowExpeerlyWorks: FunctionComponent = () => {
  return (
    <div className="mt-10 p-3 sm:p-0">
      <div className="sm:w-[460px] w-auto mx-auto text-start sm:text-center mb-12">
        <h2 className="text-xl md:text-2xl text-center font-extrabold mb-4">
          How Expeerly works?
        </h2>
        <p className="text-[#0E0E0F] mb-6 w-full sm:max-w-2xl mx-auto">
          Expeerly is a place for consumers to get insights about what other
          shoppers think of products and services. The video reviews are real
          and authentic shared by our community of reviewers from our globe.
        </p>
        <Link
          href="#"
          className="inline-block w-full text-center sm:w-[300px] px-8 py-2 rounded-full bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50 transition-colors"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};
