"use client";

import { LeftArrowIcon, RightArrowIcon, WorldIcon } from "@/assets/icons";
// import  LeftArrowIcon  from "@/assets/icons/Vector 4.svg";
import { Button } from "@nextui-org/button";
import { useRef } from "react";
import Slider, { Settings } from "react-slick";

function AutoPlay() {
  let sliderRef = useRef<Slider | null>(null);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current?.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 2,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 10,
    cssEase: "linear",
    arrows: false,
  };

  const brands = [
    "Bauknecht",
    "Dyson",
    "Koenig",
    "Neff",
    "Philips",
    "DeLonghi",
    "Kenwood",
    "Sony",
    "Moulinex",
    "Tefal",
    "ADE",
    "Betty Bossi",
    "ChefChoice",
    "Braeter",
  ];

  // Triple the brands array for smooth scrolling
  const extendedBrands = [...brands, ...brands, ...brands];
  return (
    <div className="relative flex w-full justify-between py-20 bg-[#4B49EB]">
      <div className="bg-gradient-to-l from-transparent to-[#4B49EB] py-10 px-20 z-20">
        <Button
          variant="light"
          className="bg-white rounded-full min-w-10 cursor-pointor hover:bg-white bouder-none"
          onClick={previous}
        >
          <LeftArrowIcon />
        </Button>
      </div>
      <div className="absolute w-[90%] left-0 z-10 mx-20  top-[36%] ">
        <Slider
        
          className="w-full [&>.slick-list]:py-4 [&>.slick-list>.slick-track]:flex [&>.slick-list>.slick-track]:gap-x-6"
          {...settings}
        >
          {extendedBrands.map((brand, index) => (
            <div key={`${brand}-${index}`} className="px-2">
              <div
                className="bg-white rounded-full px-6 py-2  min-w-[120px] flex items-center justify-center
                              transition-all duration-300 hover:scale-105 shadow-lg
                              hover:bg-gray-50"
              >
                <span className="text-gray-800 font-medium whitespace-nowrap">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="bg-gradient-to-r from-transparent to-[#4B49EB]  py-10 px-8 z-20">
        <Button
          variant="light"
          className="bg-white rounded-full min-w-10 cursor-pointor hover:bg-white bouder-none"
          onClick={next}
        >
          <RightArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export default AutoPlay;
