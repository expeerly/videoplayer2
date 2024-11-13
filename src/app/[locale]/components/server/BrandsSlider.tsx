import React, { FunctionComponent } from 'react';
import { Slider } from '@/src/app/components/client/Slider';
import { MobileSlider } from '@/src/app/components/server/MobileSlider';
import { Button } from '@/src/app/components/server/Button';
import { getDictionary } from '../../lib/dictionary';

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

export const BrandsSlider: FunctionComponent = async () => {
  const t = await getDictionary();
  return (
    <section
      className="relative w-full flex justify-center bg-no-repeat bg-top sm:bg-bottom sm:bg-cover"
      style={{
        backgroundImage: `url(/BackgroundImage.svg)`,
      }}
    >
      <div className="z-50 w-full flex flex-col justify-center items-center gap-4 pt-9 pb-14 sm:pb-20 sm:max-w-[1170px]">
        <div className="w-full px-10 flex justify-center items-center flex-col gap-1 sm:w-full">
          <h2 className="font-extrabold text-2xl text-center text-white sm:w-full">
            {t.home_h2_brand_section}
          </h2>
          <p className="w-[90%] text-white mb-5 text-center sm:w-full">{t.home_brand_body_text}</p>
        </div>
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
        <div className="px-5 w-full flex justify-center sm:w-[340px]">
          <Button
            size="lg"
            variant="secondary"
            href="/video-reviews"
            fullWidth
            className=" bg-white mt-10 text-center"
            title={t.cta_button_brand}
          >
            {t.cta_button_brand}
          </Button>
        </div>
      </div>
    </section>
  );
};
