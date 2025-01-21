import React, { FunctionComponent } from 'react';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { getDictionary } from '@/src/lib/dictionary';
import { Button } from '../client/Button';
import { LocaleProps } from '@/src/db/types';
import { getBrands } from '../../actions/actions';

export const BrandsSlider: FunctionComponent<LocaleProps> = async ({ locale }) => {
  const [{ t }, { data: brands }] = await Promise.all([getDictionary(), getBrands(locale)]);

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
            {t('home_h2_brand_section')}
          </h2>
          <p className="w-[90%] text-white mb-5 text-center sm:w-full">
            {t('home_brand_body_text')}
          </p>
        </div>
        <div className=" hidden w-full md:flex">
          <Slider
            classNameStyle={{
              leftButtonClassName: '!bg-blue-left-gradient',
              rightButtonClassName: '!bg-blue-right-gradient',
              cardClassName: 'bg-white',
            }}
            isBrand
            slides={
              brands?.rows?.map(brand => ({
                title: brand.brandName,
                imgURL: brand.logo,
                slug: brand.slug,
              })) ?? []
            }
          />
        </div>
        <div className=" flex w-full  md:hidden">
          <MobileSlider
            styleClassNames={{
              cardClassName: 'bg-white',
            }}
            isBrand
            slides={
              brands?.rows?.map(brand => ({
                title: brand.brandName,
                imgURL: brand.logo,
                slug: brand.slug,
              })) ?? []
            }
          />
        </div>
        <div className="px-5 w-full flex justify-center sm:w-[340px]">
          <Button
            size="lg"
            variant="secondary"
            href="/for-brands"
            fullWidth
            className=" bg-white mt-10 text-center"
            title={t('get_video_reviewed.label')}
            aria-label={t('get_video_reviewed.aria_label')}
          >
            {t('get_video_reviewed.label')}
          </Button>
        </div>
      </div>
    </section>
  );
};
