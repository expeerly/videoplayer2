import React, { FunctionComponent } from 'react';
import { Slider } from '../client/Slider/Slider';
import { MobileSlider } from '../client/Slider/MobileSlider';
import { Languages } from '@/src/db/types';
import { getBrands } from '../../actions/actions';

type Props = {
  locale: Languages;
};

export const AllBrandsSlider: FunctionComponent<Props> = async ({ locale }) => {
  const { data: brands } = await getBrands(locale, 20, true);

  return (
    <div className="mt-8">
      <div className="hidden md:block">
        <Slider
          classNameStyle={{
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
      <div className="md:hidden">
        <MobileSlider
          isMultiRow={false}
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
    </div>
  );
};
