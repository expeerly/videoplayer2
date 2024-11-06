import React from "react";
import { Slider } from "./Slider";

function ConversionSlider() {
  return (
    <div className="w-full  bg-[#4B49EB] flex justify-center">
      <div className="bg-[#4B49EB] max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5">
        <h1 className="font-extrabold text-2xl text-white">
          Boost conversion with video reviews
        </h1>
        <p className="text-white mb-10">
           Are you a retailer wanting to display expeerly reviews for free?
        </p>
        <Slider />
        <button className=" bg-white mt-10 text-black font-bold rounded-full py-3 px-7">
          Integrate Video Reviews Now
        </button>
      </div>
    </div>
  );
}

export default ConversionSlider;
