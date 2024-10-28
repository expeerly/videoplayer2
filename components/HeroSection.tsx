import React, { FunctionComponent } from "react";
import Quets from "@/public/assets/“.svg";
import BgImage from "@/public/assets/heroimg.svg";
import { HeaderImage } from "@/assets/HeaderImage";

export const HeroSection: FunctionComponent = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative"
    >
      {/* Header Image */}
      <div className="absolute h-[250px] w-[250px] top-11 sm:top-6 md:top-16 md:w-[400px] md:h-[400px] lg:top-28 left-1/2 transform -translate-x-1/2 flex justify-center">
        <HeaderImage />
      </div>

      {/* Main Content */}
      <div className="w-[80%]  flex flex-col gap-2 text-center md:w-[75%] lg:w-[78%] mx-auto z-50 items-center text-white">
        <div className="w-[220px] min-[376px]:w-[330px] md:w-[520px] lg:w-[680px] flex justify-start">
          <img src={Quets.src} alt="Quote" />
        </div>
        <h1 className="text-[30px] sm:text-[24px] md:text-[35px] lg:text-[48px] font-extrabold leading-tight">
          Est-ce que ça vaut le coup?
        </h1>
        <p className="text-xs sm:text-sm md:text-[13px] w-[80%] md:w-[50%] lg:text-base  leading-5">
          Explorez les derniers avis vidéos, de vos marques et produits
          préférés.
        </p>
      </div>
    </div>
  );
};
