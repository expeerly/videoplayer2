import React, { FunctionComponent } from "react";
import { Slider } from "./Slider";

export const BrandsSlider: FunctionComponent = () => {
  return (
    <div className="w-full  bg-[#4B49EB] flex justify-center">
      <div className="bg-[#4B49EB] max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5">
        <h1 className="font-extrabold text-2xl text-white">
          Video reviews on brands you love
        </h1>
        <p className="text-white mb-10">
          Tap on brand logo to explore reviews.
        </p>
        <Slider />
        <button className=" bg-white mt-10 text-black font-bold rounded-full py-3 px-7">
          Get Video Reviewed
        </button>
      </div>
    </div>
  );
};
