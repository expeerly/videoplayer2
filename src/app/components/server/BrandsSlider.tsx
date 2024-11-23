import React, { FunctionComponent } from 'react';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { getDictionary } from '@/src/lib/dictionary';
import { Button } from '../client/Button';

export const brands = [
  { imgURL: '/brands/logo.svg', id: 1 },
  { imgURL: '/brands/logo1.svg', id: 2 },
  { imgURL: '/brands/logo2.svg', id: 3 },
  { imgURL: '/brands/logo3.svg', id: 4 },
  { imgURL: '/brands/logo4.svg', id: 5 },
  { imgURL: '/brands/logo5.svg', id: 6 },
  { imgURL: '/brands/logo6.svg', id: 7 },
  { imgURL: '/brands/logo7.svg', id: 8 },
  { imgURL: '/brands/logo8.svg', id: 9 },
  { imgURL: '/brands/logo.svg', id: 10 },
  { imgURL: '/brands/logo8.svg', id: 11 },
  { imgURL: '/brands/logo1.svg', id: 12 },
  { imgURL: '/brands/logo2.svg', id: 13 },
  { imgURL: '/brands/logo3.svg', id: 14 },
  { imgURL: '/brands/logo4.svg', id: 15 },
  { imgURL: '/brands/logo5.svg', id: 16 },
  { imgURL: '/brands/logo6.svg', id: 17 },
  { imgURL: '/brands/logo7.svg', id: 18 },
  { imgURL: '/brands/logo8.svg', id: 19 },
  { imgURL: '/brands/logo.svg', id: 20 },
];

export const BrandsSlider: FunctionComponent = async () => {
  const t = await getDictionary();
  return (
    <section
      className="relative bg-blue-500 w-full flex justify-center bg-no-repeat bg-top md:bg-bottom md:bg-cover md:bg-transparent"
      style={{
        backgroundImage: `url(/BackgroundImage.svg)`,
      }}
    >
      <div className="z-10 w-full flex flex-col justify-center items-center gap-4 pt-9 pb-14 sm:pb-20 sm:max-w-[1170px]">
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
              leftButtonClassName: '!bg-blue-left-gradient',
              rightButtonClassName: '!bg-blue-right-gradient',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className=" flex w-full  md:hidden">
          <MobileSlider
            slides={brands}
            styleClassNames={{
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className="px-5 w-full flex justify-center sm:w-[340px]">
          <Button
            size="lg"
            variant="secondary"
            href="/for-brands"
            fullWidth
            className=" bg-white mt-10 text-center"
            title={t.get_video_reviewed.label}
            aria-label={t.get_video_reviewed.aria_label}
          >
            {t.get_video_reviewed.label}
          </Button>
        </div>
      </div>
    </section>
  );
};
