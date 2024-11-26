import React, { FunctionComponent } from 'react';
import { getDictionary } from '@/src/lib/dictionary';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Button } from '../client/Button';

const brands = [
  { imgURL: '/brands/logo.svg', id: 1, title: 'Dyson' },
  { imgURL: '/brands/logo1.svg', id: 2, title: 'Philips' },
  { imgURL: '/brands/logo2.svg', id: 3, title: 'Sony' },
  { imgURL: '/brands/logo3.svg', id: 4, title: 'Tefal' },
  { imgURL: '/brands/logo4.svg', id: 5, title: 'Zalando' },
  { imgURL: '/brands/logo5.svg', id: 6, title: 'Get Your Guide' },
  { imgURL: '/brands/logo6.svg', id: 7, title: 'Koenig' },
  { imgURL: '/brands/logo7.svg', id: 8, title: 'Bauknecht' },
  { imgURL: '/brands/logo8.svg', id: 9, title: 'Dyson_1' },
  { imgURL: '/brands/logo.svg', id: 10, title: 'Philips_2' },
];

export const ConversionSlider: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <section
      className="relative w-full bg-blue-500 flex justify-center bg-top bg-no-repeat md:bg-bottom md:bg-transparent bg-cover"
      style={{
        backgroundImage: `url(/BackgroundImage.svg)`,
      }}
    >
      <div className=" z-10 w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-10 sm:py-20 ">
        <h2 className="font-extrabold px-5 text-2xl text-white text-center">
          {t.home_h2_retailer}
        </h2>
        <p className="text-white px-5 text-center mb-10"> {t.home_retailer_body_text}</p>
        <div className=" hidden w-full md:flex">
          <Slider
            slides={brands}
            classNameStyle={{
              leftButtonClassName: '!bg-blue-left-gradient',
              rightButtonClassName: '!bg-blue-right-gradient',
              cardClassName: 'bg-white',
            }}
            isBrand
          />
        </div>
        <div className=" flex w-full md:hidden">
          <MobileSlider
            slides={brands}
            styleClassNames={{
              cardClassName: 'bg-white',
            }}
            isBrand
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
