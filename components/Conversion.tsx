import React, { FunctionComponent } from "react";
import { Slider } from "./Slider";
import { MobileSlider } from "./ui/MobileSlider";
 
export const ConversionSlider:FunctionComponent = ()=> {
  return (
    <div className="w-full  bg-[#4B49EB] flex justify-center">
      <div className="bg-[#4B49EB] w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5">
        <h1 className="font-extrabold text-2xl text-white text-center">
          Boost conversion with video reviews
        </h1>
        <p className="text-white text-center mb-10">
           Are you a retailer wanting to display expeerly reviews for free?
        </p>
        <div className=" hidden w-full sm:flex">
        <Slider classNameStyle={{
            leftButtonClassName:"!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]",
            rightButtonClassName:"!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]",
            cardClassName:'bg-white'
          }} />
        </div>
        <div className=" flex w-full sm:hidden">
        <MobileSlider styleClassNames={{
            leftShadowClassName:"!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]",
            rightShadowClassName:"!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]",
            cardClassName:'bg-white'
          }} />
        </div>
        <div className="px-3">
          <button className=" bg-white mt-10 text-black font-bold w-full sm:w-auto  rounded-full py-3 px-7">
            Integrate Video Reviews Now
          </button>
        </div>
      </div>
    </div>
  );
}
