import React, { FunctionComponent } from "react";
import { SlideProps, SliderCard } from "./SliderCard";

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
};

export const MobileSlider: FunctionComponent<Props> = ({ slides = brands }) => {
  return (
    <div className="w-full relative overflow-hidden p-4">
      <div className=" absolute left-0 top-0 z-10 h-full w-40 bg-[linear-gradient(90deg,_#FFFFFF_40.5%,_rgba(255,255,255,0)_100%)]" />
      {/* First Row - Right to Left */}
      {slides.map((row, index) => (
        <>
          {index / 2 === 0 ? (
            <div className="relative mb-4 flex w-full overflow-x-hidden gap-4">
              {[...Array.from({ length: 10 }, (_, i) => i)].map((i) => (
                <div
                  key={i}
                  className="animate-marquee flex w-max shrink-0 items-center gap-4"
                >
                  {row.map((brand, idx) => (
                    <SliderCard
                      key={`${brand.name}-${idx}-${i}`}
                      name={brand.name}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative flex w-full overflow-x-hidden gap-4">
              {[...Array.from({ length: 10 }, (_, i) => i)].map((i) => (
                <div
                  key={i}
                  className="animate-marquee-reverse flex w-max shrink-0 items-center gap-4"
                >
                  {row.map((brand, idx) => (
                    <SliderCard
                      key={`${brand.name}-${idx}-${i}`}
                      name={brand.name}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </>
      ))}
      <div className=" absolute right-0 top-0 z-10 h-full w-40 bg-[linear-gradient(270deg,_#FFFFFF_47.5%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};
