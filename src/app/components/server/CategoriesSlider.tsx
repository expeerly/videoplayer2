import React, { FunctionComponent } from 'react';
import { getDictionary } from '@/src/lib/dictionary';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { CategoryData } from '@/src/db/types';

type Props = {
  categories: CategoryData[];
};

export const CategoriesSlider: FunctionComponent<Props> = async ({ categories }) => {
  const { t } = await getDictionary();

  return (
    <section className="w-full sm:max-w-[1170px] flex flex-col justify-center items-center gap-4 py-10 ">
      <h2 className="font-extrabold text-2xl px-5 ">{t('home_h2_category_section')}</h2>
      <p className=" mb-10 w-full  sm:w-[390px] px-5 text-center">{t('home_category_body_text')}</p>
      <div className=" hidden w-full  md:flex">
        <Slider
          classNameStyle={{ rowContainerClassName: '!space-y-4' }}
          slides={categories?.map(i => ({ name: i.categoryName, icon: i.logo, slug: i.urlSlug }))}
        />
      </div>
      <div className=" flex w-full md:hidden">
        <MobileSlider
          styleClassNames={{ rowContainerClassName: '!space-y-4' }}
          slides={categories?.map(i => ({ name: i.categoryName, icon: i.logo, slug: i.urlSlug }))}
        />
      </div>
    </section>
  );
};
