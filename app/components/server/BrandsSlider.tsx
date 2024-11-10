import React, { FunctionComponent } from 'react';
import { Slider } from '../../../components/ui/client/Slider';
import { MobileSlider } from '../../../components/ui/server/MobileSlider';
import Link from 'next/link';

export const brands = [
  [
    { imgURL: '/brands/logo.svg', id: 1 },
    { imgURL: '/brands/logo1.svg', id: 2 },
    { imgURL: '/brands/logo2.svg', id: 3 },
    { imgURL: '/brands/logo3.svg', id: 4 },
    { imgURL: '/brands/logo4.svg', id: 5 },
    { imgURL: '/brands/logo5.svg', id: 6 },
    { imgURL: '/brands/logo6.svg', id: 7 },
    { imgURL: '/brands/logo7.svg', id: 8 },
    { imgURL: '/brands/logo8.svg', id: 9 },
  ],
  [
    { imgURL: '/brands/logo.svg', id: 1 },
    { imgURL: '/brands/logo1.svg', id: 2 },
    { imgURL: '/brands/logo2.svg', id: 3 },
    { imgURL: '/brands/logo3.svg', id: 4 },
    { imgURL: '/brands/logo4.svg', id: 5 },
    { imgURL: '/brands/logo5.svg', id: 6 },
    { imgURL: '/brands/logo6.svg', id: 7 },
    { imgURL: '/brands/logo7.svg', id: 8 },
    { imgURL: '/brands/logo8.svg', id: 9 },
  ],
];

export const BrandsSlider: FunctionComponent = () => {
  return (
    <section
      className="relative w-full flex justify-center bg-no-repeat bg-top sm:bg-bottom sm:bg-cover"
      style={{
        backgroundImage: `url(/BackgroundImage.svg)`,
      }}
    >
      <div className="z-50 w-full flex flex-col justify-center items-center gap-4 pt-9 pb-14 sm:pb-20 sm:max-w-[1170px]">
        <h2 className="font-extrabold text-2xl px-3 text-center text-white">
          Video reviews on brands you love
        </h2>
        <p className="text-white px-3 mb-10">Tap on brand logo to explore reviews.</p>
        <div className=" hidden w-full md:flex">
          <Slider
            slides={brands}
            classNameStyle={{
              leftButtonClassName:
                '!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]',
              rightButtonClassName:
                '!bg-[linear-gradient(270deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className=" flex w-full  md:hidden">
          <MobileSlider
            slides={brands}
            styleClassNames={{
              leftShadowClassName:
                '!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]',
              rightShadowClassName:
                '!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className="px-5 w-full flex justify-center">
          <Link
            href="/explore"
            className=" bg-white mt-10 mx-auto text-black font-bold w-full sm:w-auto text-center rounded-full py-3 px-16"
          >
            Get Video Reviewed
          </Link>
        </div>
      </div>
    </section>
  );
};
