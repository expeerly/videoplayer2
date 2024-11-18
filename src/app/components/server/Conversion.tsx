import React, { FunctionComponent } from 'react';
import { brands } from './BrandsSlider';
import { getDictionary } from '@/src/lib/dictionary';
import { Slider } from '@/src/app/components/client/Slider';
import { Button } from '@/src/app/components/server/Button';
import { MobileSlider } from '@/src/app/components/server/MobileSlider';

export const ConversionSlider: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <section
      className="relative w-full bg-blue-500 flex justify-center bg-top bg-no-repeat md:bg-bottom md:bg-transparent bg-cover"
      style={{
        backgroundImage: `url(/BackgroundImage.svg)`,
      }}
    >
      <div className=" z-20 w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-10 sm:py-20 ">
        <h2 className="font-extrabold px-5 text-2xl text-white text-center">
          {t.home_h2_retailer}
        </h2>
        <p className="text-white px-5 text-center mb-10"> {t.home_retailer_body_text}</p>
        <div className=" hidden w-full md:flex">
          <Slider
            slides={[brands[0]]}
            classNameStyle={{
              leftButtonClassName: '!bg-blue-left-gradient',
              rightButtonClassName: '!bg-blue-right-gradient',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className=" flex w-full md:hidden">
          <MobileSlider
            slides={[brands[0]]}
            styleClassNames={{
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className="px-5 w-full mt-12 flex justify-center sm:w-max">
          <Button
            size="lg"
            variant="secondary"
            href="https://www.get.expeerly.com/for-marketplaces"
            fullWidth
            className=" bg-white text-center"
            aria-label={t.integrate_video.aria_label}
            title={t.integrate_video.label}
          >
            {t.integrate_video.label}
          </Button>
        </div>
      </div>
    </section>
  );
};
