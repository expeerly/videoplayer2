"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { DesktopSlider } from "../client/DesktopSlider";

import { MobileSlider } from "./MobileSlider";

import Logo from "@/assets/brands/logo.svg";
import Logo1 from "@/assets/brands/logo1.svg";
import Logo2 from "@/assets/brands/logo2.svg";
import Logo3 from "@/assets/brands/logo3.svg";
import Logo4 from "@/assets/brands/logo4.svg";
import Logo5 from "@/assets/brands/logo5.svg";
import Logo6 from "@/assets/brands/logo6.svg";
import Logo7 from "@/assets/brands/logo7.svg";
import Logo8 from "@/assets/brands/logo8.svg";
import BrandsBG from "@/assets/brandsBG.svg";

export const Conversion: FunctionComponent = () => {
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
  const [isMobile, setIsMobile] = useState(false);

  // Check the screen size and update `isMobile` state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view for screens under 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full mt-5  md:bg-cover md:bg-no-repeat md:bg-bottom"
      style={{
        backgroundColor: !isMobile ? "" : "#4B49EB",
        backgroundImage: isMobile ? "none" : `url(${BrandsBG.src})`,
      }}
    >
      <div className=" w-full  bg-transparent  sm:p-8 sm:pb-24 pb-10 overflow-hidden rounded-none z-50 ">
        <div className="flex flex-col items-center gap-4 text-white mb-6">
          <h2 className="text-2xl font-extrabold text-center p-8 pb-0">
            Boost conversion with video reviews
          </h2>
          <p className="opacity-80 text-center px-20">
            Are you a retailer wanting to display expertly reviews for free?
          </p>
        </div>
        <div className="hidden lg:flex">
          <DesktopSlider brands={brands} />
        </div>
        <div className="flex lg:hidden">
          <MobileSlider brands={brands} />
        </div>
        <div className="flex justify-center pt-5 sm:mt-10 px-[18px]">
          <Button
            className="bg-white sm:w-[300px] w-full font-bold text-black"
            color="danger"
            radius="full"
          >
            Integrate Video Reviews Now
          </Button>
        </div>
      </div>
    </div>
  );
};
