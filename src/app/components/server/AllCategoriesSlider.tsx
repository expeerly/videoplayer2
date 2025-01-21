import React, { FunctionComponent } from 'react';
import { Slider } from '../client/Slider/Slider';
import { MobileSlider } from '../client/Slider/MobileSlider';
import { Languages } from '@/src/db/types';
import { getCategories } from '../../actions/actions';

type Props = {
  locale: Languages;
};

export const AllCategoriesSlider: FunctionComponent<Props> = async ({ locale }) => {
  const { data: categories } = await getCategories(locale);

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
          isMultiRow={false}
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
