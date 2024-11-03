"use client";
import React, { FunctionComponent, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { DesktopSlider } from "../client/DesktopSlider";

import { ReadMoreText } from "./ReadMoreText";
import { PaginationContainer } from "./PaginationContainer";
import { Filter } from "./Filter";
import { MobileSlider } from "./MobileSlider";
import { MobileFilter } from "./MobileFilter";

import Icon from "@/assets/categoryicons/Icons.svg";
import Icon1 from "@/assets/categoryicons/Icons1.svg";
import Icon2 from "@/assets/categoryicons/Icons2.svg";
import Icon3 from "@/assets/categoryicons/Icons3.svg";
import Icon4 from "@/assets/categoryicons/Icons4.svg";
import Icon5 from "@/assets/categoryicons/Icons5.svg";

export const BrandsPage: FunctionComponent = () => {
  const brandsDesktop = [
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
  const brandsMobile = [
    [
      { label: "Travel", icon: Icon, id: 1 },
      { label: "Automobile", icon: Icon1, id: 2 },
      { label: "Health & Wellness", icon: Icon2, id: 3 },
      { label: "Arts & Crafts", icon: Icon3, id: 4 },
      { label: "Baby & Child Care", icon: Icon4, id: 5 },
      { label: "Music & Instruments", icon: Icon5, id: 6 },
    ],
  ];

  const pathname = usePathname();
  const router = useRouter();

  const profileNavigation = useCallback(
    (slug: string) => {
      let url = "";

      pathname.includes("explore")
        ? (url = "/explore/brand")
        : (url = "/video-reviews/brand");
      router.push(`${url}/${slug}`);
    },
    [router, pathname],
  );

  return (
    <div className="py-10 w-full  sm:px-0 flex flex-col gap-10 ">
      <div className="px-3">
        <h1 className=" text-2xl mb-5 pr-20 font-extrabold ">
          Video Reviews: All Brands
        </h1>
        <ReadMoreText
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. "
        />
      </div>

      <div className="hidden sm:flex">
        <DesktopSlider
          brands={brandsDesktop}
          classNamesStyle={{
            leftButton: "bg-gradient-to-l from-transparent to-[#ffff]",
            rightButton: "bg-gradient-to-r from-transparent to-[#ffff]",
          }}
        />
      </div>

      <div className="flex sm:hidden">
        <MobileSlider brands={brandsMobile} />
      </div>

      <PaginationContainer
        cardHeaderProps={{ onClick: (slug) => profileNavigation(slug) }}
      />
      <div className="hidden md:flex absolute top-10 right-10">
        <Filter />
      </div>
      <div className="absolute top-10 right-10 md:hidden">
        <MobileFilter />
      </div>
    </div>
  );
};
