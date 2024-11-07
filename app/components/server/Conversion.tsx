import React, { FunctionComponent } from "react";
import { Slider } from "../../../components/ui/server/Slider";
import { MobileSlider } from "../../../components/ui/server/MobileSlider";
import Logo from "@/assets/brands/logo.svg";
import Logo1 from "@/assets/brands/logo1.svg";
import Logo2 from "@/assets/brands/logo2.svg";
import Logo3 from "@/assets/brands/logo3.svg";
import Logo4 from "@/assets/brands/logo4.svg";
import Logo5 from "@/assets/brands/logo5.svg";
import Logo6 from "@/assets/brands/logo6.svg";
import Logo7 from "@/assets/brands/logo7.svg";
import Logo8 from "@/assets/brands/logo8.svg";
import BackgroundImage from "@/assets/BackgroundImage.svg";

export const ConversionSlider: FunctionComponent = () => {
  const brands = [
    [
      { imgURL: Logo, id: 1 },
      { imgURL: Logo1, id: 2 },
      { imgURL: Logo2, id: 3 },
      { imgURL: Logo3, id: 4 },
      { imgURL: Logo4, id: 5 },
      { imgURL: Logo5, id: 6 },
      { imgURL: Logo6, id: 7 },
      { imgURL: Logo7, id: 8 },
      { imgURL: Logo8, id: 9 },
    ],
  ];

  return (
    <div
      className="relative w-full  flex justify-center bg-no-repeat bg-cover bg-bottom"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
      }}
    >
      <div className=" z-20 w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-10 sm:py-20 ">
        <h1 className="font-extrabold px-3 text-2xl text-white text-center">
          Boost conversion with video reviews
        </h1>
        <p className="text-white px-3 text-center mb-10">
           Are you a retailer wanting to display expeerly reviews for free?
        </p>
        <div className=" hidden w-full sm:flex">
          <Slider
            slides={brands}
            classNameStyle={{
              leftButtonClassName:
                "!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]",
              rightButtonClassName:
                "!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]",
              cardClassName: "bg-white",
            }}
          />
        </div>
        <div className=" flex w-full sm:hidden">
          <MobileSlider
            slides={brands}
            styleClassNames={{
              leftShadowClassName:
                "!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]",
              rightShadowClassName:
                "!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]",
              cardClassName: "bg-white",
            }}
          />
        </div>
        <div className="px-3">
          <button className=" bg-white mt-10 text-black font-bold w-full sm:w-auto  rounded-full py-3 px-7">
            Integrate Video Reviews Now
          </button>
        </div>
      </div>
    </div>
  );
};
