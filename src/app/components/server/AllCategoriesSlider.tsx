import React, { FunctionComponent } from 'react';
import { Slider } from '../client/Slider/Slider';
import { MobileSlider } from '../client/Slider/MobileSlider';
import { AllBrandssData, AllCategoriesData, Languages } from '@/src/db/types';
import { getCategories } from '../../actions/actions';
import { getQueryIds } from '../../utils/queryHelpers';

type Props = {
  locale: Languages;
  categoryQuery?: string | string[];
  brandQuery?: string | string[];
  allCategories: AllCategoriesData[];
  allBrands: AllBrandssData;
};

export const AllCategoriesSlider: FunctionComponent<Props> = async ({
  locale,
  categoryQuery,
  brandQuery,
  allBrands,
  allCategories,
}) => {
  const { data: categories } = await getCategories(
    locale,
    getQueryIds(categoryQuery, brandQuery, allCategories, allBrands)
  );

  return (
    <div className="mt-8">
      <div className="hidden md:block">
        <Slider
          classNameStyle={{
            cardClassName: 'bg-white',
          }}
          slides={categories?.map(i => ({
            name: i.categoryName,
            icon: i.logo,
            slug: i.urlSlug,
          }))}
        />
      </div>
      <div className="md:hidden">
        <MobileSlider
          slides={categories?.map(i => ({
            name: i.categoryName,
            icon: i.logo,
            slug: i.urlSlug,
          }))}
        />
      </div>
    </div>
  );
};
