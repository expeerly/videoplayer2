import React, { FunctionComponent } from "react";
import { HeaderImage } from "@/assets/HeaderImage";
import { ScrollButton } from "../client/ScrollButton";
import Image from "next/image";

export const HeroSection: FunctionComponent = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/BG.svg)`,
      }}
      className="w-full flex items-center justify-bottom relative bg-bottom bg-cover bg-no-repeat z-0 h-[320px] sm:h-[400px] md:h-[500px] lg:h-[450px] "
    >
      <div className="absolute h-[250px] w-[250px] top-11 sm:top-6 md:top-16 md:w-[400px] md:h-[300px] lg:top-18 left-1/2 transform -translate-x-1/2 flex justify-center">
        <HeaderImage />
      </div>
      <div className="w-[80%]  flex flex-col gap-2 text-center md:w-[75%] lg:w-[78%] mx-auto z-50 items-center text-white">
        <div className="flex flex-col justify-start -mt-16 md:-mt-20">
          <Image
            src={'/Quets.svg'}
            alt="Quote"
            width={24}
            height={24}
            className="lg:-ml-6 "
          />

          <h1 className="text-[30px]  sm:text-[24px] md:text-[35px] lg:text-[47px] font-extrabold leading-tight">
            Est-ce que ça vaut le coup?
          </h1>
        </div>
        <p className="text-xs sm:text-sm md:text-[13px] w-[80%] md:w-[50%] lg:w-[40%] lg:text-base  leading-5">
          Explorez les derniers avis vidéos, de vos marques et produits
          préférés.
        </p>
        <ScrollButton
          targetSectionId={"explore-reviewers"}
          className="absolute bottom-14 md:bottom-44 ml-5 md:ml-3 lg:bottom-32"
        />
      </div>
    </div>
  );
};
