"use client";
import { DesktopSlider } from "../client/DesktopSlider";

import { MobileSlider } from "./MobileSlider";

import Icon from "@/assets/categoryicons/Icons.svg";
import Icon1 from "@/assets/categoryicons/Icons1.svg";
import Icon2 from "@/assets/categoryicons/Icons2.svg";
import Icon3 from "@/assets/categoryicons/Icons3.svg";
import Icon4 from "@/assets/categoryicons/Icons4.svg";
import Icon5 from "@/assets/categoryicons/Icons5.svg";

export const ExploreCategories = () => {
  const brands = [
    [
      { label: "Travel", icon: Icon, id: 1 },
      { label: "Automobile", icon: Icon1, id: 2 },
      { label: "Health & Wellness", icon: Icon2, id: 3 },
      { label: "Arts & Crafts", icon: Icon3, id: 4 },
      { label: "Baby & Child Care", icon: Icon4, id: 5 },
      { label: "Music & Instruments", icon: Icon5, id: 6 },
    ],
    [
      { label: "Travel", icon: Icon, id: 1 },
      { label: "Automobile", icon: Icon1, id: 2 },
      { label: "Health & Wellness", icon: Icon2, id: 3 },
      { label: "Arts & Crafts", icon: Icon3, id: 4 },
      { label: "Baby & Child Care", icon: Icon4, id: 5 },
      { label: "Music & Instruments", icon: Icon5, id: 6 },
    ],
  ];

  return (
    <div className="w-full border-none rounded-none sm:p-8 overflow-hidden py-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h2 className="text-2xl font-extrabold">Explore Categories</h2>
        <p className="opacity-80 md:w-2/5 w-full  px-[18px] sm:px-0 text-center">
          Whether you’d like to travel, find the perfect sofa, or buy a new car,
          we’ve got you covered.
        </p>
      </div>

      <div className="hidden lg:flex">
        <DesktopSlider
          brands={brands}
          classNamesStyle={{
            leftButton: "bg-gradient-to-l from-transparent to-[#ffff]",
            rightButton: "bg-gradient-to-r from-transparent to-[#ffff]",
          }}
        />
      </div>
      <div className="flex lg:hidden">
        <MobileSlider brands={brands} />
      </div>
    </div>
  );
};
