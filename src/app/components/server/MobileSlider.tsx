'use client';
import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react';
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
  'flex w-max shrink-0 items-center gap-4 cursor-grab active:cursor-grabbing px-5';

export const MobileSlider: FunctionComponent<Props> = ({ slides = brands, styleClassNames }) => {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Set initial scroll position for even-indexed rows
    rowRefs.current.forEach((rowRef, index) => {
      const rowIndex = index + 1;
      if (rowRef && rowIndex % 2 === 0) {
        // Scroll to 20% of the scrollable width
        const scrollableWidth = rowRef.scrollWidth - rowRef.clientWidth;
        rowRef.scrollLeft = scrollableWidth * 0.1;
      }
    });
  }, []);

  const setRowRef = useCallback((el: HTMLLIElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  return (
    <ul className={clsx(BASE_CONTAINER_CLASSES, styleClassNames?.rowContainerClassName)}>
      {slides.map((row, index) => (
        <li
          ref={el => setRowRef(el, index)}
          key={`row-${index}`}
          className={clsx(BASE_ROW_CLASSES, styleClassNames?.rowClassName)}
        >
          <ul className={BASE_SLIDE_CLASSES}>
            {[...row].map((brand, idx) => (
              <li key={`${brand.name}-${idx}`}>
                <SliderCard
                  className={styleClassNames?.cardClassName}
                  key={`${brand.name}-${idx}`}
                  data={brand}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
