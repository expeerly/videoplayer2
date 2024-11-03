"use client";
import { Button } from "@nextui-org/button";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import Flickity, { FlickityOptions } from "react-flickity-component";

import { LeftArrowIcon, RightArrowIcon } from "@/assets/icons";
export type Brand = {
  imgURL?: StaticImageData;
  id: number;
  label?: string;
  icon?: string;
};

type DesktopSliderProps = {
  brands: Brand[][];
  classNamesStyle?: {
    leftButton?: string;
    rightButton?: string;
  };
};

export const DesktopSlider: React.FC<DesktopSliderProps> = ({
  brands,
  classNamesStyle,
}) => {
  function findMaxLengthArray(arrays: any[]) {
    const maxLength = Math.max(...arrays.map((arr) => arr.length));

    return arrays.find((arr) => arr.length === maxLength);
  }
  // let flickityRef = useRef<null | Flickity>(null);
  const flickityOptions: FlickityOptions = {
    contain: true,
    prevNextButtons: false,
    pageDots: true,
    draggable: false,
    freeScroll: true,
    groupCells: true,
    wrapAround: true,
    autoPlay: false,
    selectedAttraction: 0.015,
    friction: 0.25,
    initialIndex: 2,
  };

  const flickityRef = useRef<Flickity | null>(null);

  const previous = () => {
    flickityRef.current?.next();
  };

  const next = () => {
    flickityRef.current?.previous();
  };

  return (
    <div className="flex  w-full  justify-between  items-center  max-w-6xl mx-auto overflow-hidden py-6">
      <div
        className={classNames(
          "bg-gradient-to-l from-transparent to-[#4B49EB] py-10 px-7 z-20",
          classNamesStyle?.leftButton,
        )}
      >
        <Button
          className="bg-white rounded-full min-w-10 cursor-pointor hover:bg-white bouder-none"
          variant="light"
          onClick={previous}
        >
          <LeftArrowIcon />
        </Button>
      </div>
      <Flickity
        reloadOnUpdate
        static
        className=" w-full"
        flickityRef={(c) => (flickityRef.current = c)}
        options={flickityOptions}
      >
        {findMaxLengthArray(brands)?.map((_: Brand, i: number) => (
          <div
            key={i}
            style={{
              marginRight: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {brands.map((innerArray, rowIndex) => (
              <div key={rowIndex}>
                <div
                  key={`${i}-${rowIndex}-${Math.random()}`}
                  className="bg-white rounded-full px-[20px]  border border-black  py-[4px] flex items-center justify-center
                                transition-all duration-300 hover:scale-105 shadow-lg
                                hover:bg-gray-50"
                >
                  {!!innerArray?.[i]?.imgURL ? (
                    <Image
                      alt="asd"
                      height={80}
                      src={innerArray[i]?.imgURL}
                      width={80}
                    />
                  ) : (
                    <></>
                  )}
                  {innerArray[i]?.label && innerArray[i].icon && (
                    <div className=" flex-row  gap-2 py-[4px] flex items-center justify-center">
                      <Image
                        alt="asd"
                        height={24}
                        src={innerArray[i]?.icon}
                        width={24}
                      />
                      <p className="text-base font-normal text-black">
                        {innerArray[i]?.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Flickity>
      <div
        className={classNames(
          " pr-8  py-10 z-[99999] bg-gradient-to-r from-transparent to-[#4B49EB]",
          classNamesStyle?.rightButton,
        )}
      >
        <Button
          className="bg-white rounded-full z-[999px] min-w-10 cursor-pointor hover:bg-white bouder-none"
          variant="light"
          onClick={next}
        >
          <RightArrowIcon />
        </Button>
      </div>
    </div>
  );
};
