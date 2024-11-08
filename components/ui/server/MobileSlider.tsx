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

// Base classes as constants
const BASE_CONTAINER_CLASSES = "w-full relative overflow-hidden ";

const BASE_ROW_CLASSES = "relative flex w-full overflow-x-hidden gap-4";
const BASE_SLIDE_CLASSES = "flex w-max shrink-0 items-center gap-4";

// Helper functions for class generation


const createSlideClasses = (isReverse: boolean) =>
  clsx(BASE_SLIDE_CLASSES, {
    "animate-marquee": !isReverse,
    "animate-marquee-reverse": isReverse,
  });
export const MobileSlider: FunctionComponent<Props> = ({
  slides = brands,
  styleClassNames,
}) => {
  return (
    <div className={BASE_CONTAINER_CLASSES}>
      

      {slides.map((row, index) => {
        const isReverseRow = index % 2 !== 0;

        return (
          <div
            key={`row-${index}`}
            className={clsx(BASE_ROW_CLASSES, {
              "mb-4": !isReverseRow,
            })}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`slide-container-${index}-${i}`}
                className={createSlideClasses(isReverseRow)}
              >
                {row.map((brand, idx) => (
                  <SliderCard
                    className={styleClassNames?.cardClassName}
                    key={`${brand.name}-${idx}-${i}`}
                    data={brand}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}

      
    </div>
  );
};
