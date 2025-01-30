'use client';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import clsx from 'clsx';

import { SlideProps, SliderCard } from './SliderCard';
import { distributeSlides } from './utils/distributeSlides';

type StyleClassNames = {
  leftShadowClassName?: string;
  rightShadowClassName?: string;
  cardClassName?: string;
  rowContainerClassName?: string;
  rowClassName?: string;
};

type Props = {
  styleClassNames?: StyleClassNames;
  isBrand?: boolean;
  slides: SlideProps[];
};

export const MobileSlider: FunctionComponent<Props> = ({ styleClassNames, isBrand, slides }) => {
  // Memoized base classes
  const baseClasses = useMemo(
    () => ({
      container: 'w-full relative overflow-hidden space-y-6',
      row: 'relative flex w-full overflow-x-auto scroll-smooth scrollbar scrollbar-none',
      slideList: 'flex w-max shrink-0 items-center gap-4 cursor-grab active:cursor-grabbing px-5',
    }),
    []
  );

  // Memoized combined classes
  const combinedClasses = useMemo(
    () => ({
      container: clsx(baseClasses.container, styleClassNames?.rowContainerClassName),
      row: clsx(baseClasses.row, styleClassNames?.rowClassName),
    }),
    [baseClasses, styleClassNames]
  );

  // Memoized data

  const distributedSlides = useMemo(() => {
    return distributeSlides(slides);
  }, [slides]);

  // Memoized render functions
  const renderSlide = useCallback(
    (brand: SlideProps, idx: number) => (
      <li key={`${brand.name}-${idx}`}>
        <SliderCard
          className={styleClassNames?.cardClassName}
          key={`${brand.name}-${idx}`}
          data={brand}
          isBrand={isBrand}
        />
      </li>
    ),
    [styleClassNames?.cardClassName, isBrand]
  );

  const renderRow = useCallback(
    (row: SlideProps[], index: number) => (
      <li key={`row-${index}`} className={combinedClasses.row + `${index === 1 ? ' pl-6' : ''}`}>
        <ul className={baseClasses.slideList}>
          {row.map((brand, idx) => renderSlide(brand, idx))}
        </ul>
      </li>
    ),
    [baseClasses.slideList, combinedClasses.row, renderSlide]
  );

  return (
    <ul className={combinedClasses.container}>
      {distributedSlides.map((row, index) => renderRow(row, index))}
    </ul>
  );
};
