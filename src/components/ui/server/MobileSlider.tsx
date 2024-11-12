import React, { FunctionComponent } from 'react';
import { SlideProps, SliderCard } from './SliderCard';
import clsx from 'clsx';

const brands = [
  [
    { name: 'Travel' },
    { name: 'Automobile' },
    { name: 'Health & Wellness' },
    { name: 'Arts & Crafts' },
    { name: 'Baby & Child Care' },
    { name: 'Home & Kitchen' },
    { name: 'Beauty & Personal Care' },
    { name: 'Books & Media' },
    { name: 'Clothes and Fashion' },
    { name: 'Food & Beverages' },
    { name: 'Electronics & Gadgets' },
    { name: 'Sports & Fitness' },
    { name: 'Pets & Animals' },
    { name: 'Furniture' },
    { name: 'Toys & Games' },
  ],
  [
    { name: 'Travel' },
    { name: 'Automobile' },
    { name: 'Health & Wellness' },
    { name: 'Arts & Crafts' },
    { name: 'Baby & Child Care' },
    { name: 'Home & Kitchen' },
    { name: 'Beauty & Personal Care' },
    { name: 'Books & Media' },
    { name: 'Clothes and Fashion' },
    { name: 'Food & Beverages' },
    { name: 'Electronics & Gadgets' },
    { name: 'Sports & Fitness' },
    { name: 'Pets & Animals' },
    { name: 'Furniture' },
    { name: 'Toys & Games' },
  ],
];

type Props = {
  slides?: SlideProps[][];
  styleClassNames?: {
    leftShadowClassName?: string;
    rightShadowClassName?: string;
    cardClassName?: string;
    rowContainerClassName?: string;
    rowClassName?: string;
  };
};

const BASE_CONTAINER_CLASSES = 'w-full relative overflow-hidden space-y-6';
const BASE_ROW_CLASSES =
  'relative flex w-full overflow-x-auto scroll-smooth scrollbar scrollbar-none';
const BASE_SLIDE_CLASSES =
  'flex w-max shrink-0 items-center gap-4 cursor-grab active:cursor-grabbing  px-5 ';

export const MobileSlider: FunctionComponent<Props> = ({ slides = brands, styleClassNames }) => {
  return (
    <div className={clsx(BASE_CONTAINER_CLASSES, styleClassNames?.rowContainerClassName)}>
      {slides.map((row, index) => (
        <div key={`row-${index}`} className={clsx(BASE_ROW_CLASSES, styleClassNames?.rowClassName)}>
          <div className={BASE_SLIDE_CLASSES}>
            {[...row].map((brand, idx) => (
              <SliderCard
                className={styleClassNames?.cardClassName}
                key={`${brand.name}-${idx}`}
                data={brand}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
