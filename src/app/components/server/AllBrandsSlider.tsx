import React, { FunctionComponent } from 'react';
import { Slider } from '../client/Slider/Slider';
import { MobileSlider } from '../client/Slider/MobileSlider';
import { AllBrandssData, AllCategoriesData, Languages } from '@/src/db/types';
import { getBrands } from '../../actions/actions';
import { getQueryIds } from '../../utils/queryHelpers';

type Props = {
  locale: Languages;
  categoryQuery?: string | string[];
  brandQuery?: string | string[];
  allCategories: AllCategoriesData[];
  allBrands: AllBrandssData;
};

export const AllBrandsSlider: FunctionComponent<Props> = async ({
  locale,
  categoryQuery,
  brandQuery,
  allBrands,
  allCategories,
}) => {
  const { data: brands } = await getBrands(
    locale,
    20,
    true,
    getQueryIds(categoryQuery, brandQuery, allCategories, allBrands)
  );

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
