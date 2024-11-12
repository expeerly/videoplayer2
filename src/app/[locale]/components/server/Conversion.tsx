import React, { FunctionComponent } from 'react';
import { Slider } from '../../../../components/ui/client/Slider';
import { MobileSlider } from '../../../../components/ui/server/MobileSlider';
import { brands } from './BrandsSlider';
import { Button } from '@/src/components/ui/server/Button';
import { getDictionary } from '../../lib/dictionary';

export const ConversionSlider: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <section
      className="relative w-full  flex justify-center bg-no-repeat bg-top sm:bg-bottom sm:bg-cover"
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
              leftButtonClassName:
                '!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]',
              rightButtonClassName:
                '!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className=" flex w-full md:hidden">
          <MobileSlider
            slides={[brands[0]]}
            styleClassNames={{
              leftShadowClassName:
                '!bg-[linear-gradient(90deg,_#4B49EB_40.5%,_rgba(255,255,255,0)_100%)]',
              rightShadowClassName:
                '!bg-[linear-gradient(270deg,_#4B49EB_47.5%,_rgba(255,255,255,0)_100%)]',
              cardClassName: 'bg-white',
            }}
          />
        </div>
        <div className="px-5 mt-10 w-full flex justify-center sm:w-max">
          <Button
            size="lg"
            variant="secondary"
            href="/video-reviews"
            fullWidth
            className=" bg-white mt-10 text-center"
          >
            {t.cta_button_retailer}
          </Button>
        </div>
      </div>
    </section>
  );
};
