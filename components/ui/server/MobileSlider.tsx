import React, { FunctionComponent } from "react";
import { SlideProps, SliderCard } from "./SliderCard";
import clsx from "clsx";

const brands = [
  [
    { name: "Bauknecht" },
    { name: "Dyson" },
    { name: "Koeni" },
    { name: "Sony" },
    { name: "Philips" },
    { name: "Zalando" },
  ],
  [
    { name: "Bauknecht" },
    { name: "Dyson" },
    { name: "Koeni" },
    { name: "Sony" },
    { name: "Philips" },
    { name: "Zalando" },
  ],
];

type Props = {
  slides?: SlideProps[][];
  styleClassNames?: {
    leftShadowClassName?: string;
    rightShadowClassName?: string;
    cardClassName?: string;
  };
};

const BASE_CONTAINER_CLASSES = "w-full relative overflow-hidden";
const BASE_ROW_CLASSES =
  "relative flex w-full overflow-x-auto scroll-smooth scrollbar scrollbar-none";
const BASE_SLIDE_CLASSES =
  "flex w-max shrink-0 items-center gap-4 cursor-grab active:cursor-grabbing  px-2 ";

export const MobileSlider: FunctionComponent<Props> = ({
  slides = brands,
  styleClassNames,
}) => {
  return (
    <div className={BASE_CONTAINER_CLASSES}>
      {slides.map((row, index) => (
        <div
          key={`row-${index}`}
          className={clsx(BASE_ROW_CLASSES, {
            "mb-4": index !== slides.length - 1,
          })}
        >
          <div className={BASE_SLIDE_CLASSES}>
            {row.map((brand, idx) => (
              <SliderCard
                className={styleClassNames?.cardClassName}
                key={`${brand.name}-${idx}`}
                data={brand}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
