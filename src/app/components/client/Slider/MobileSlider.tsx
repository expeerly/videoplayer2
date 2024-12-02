'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef } from 'react';
import { SlideProps, SliderCard } from './SliderCard';
import clsx from 'clsx';
import { distributeSlides } from './utils/distributeSlides';

const BRANDS: SlideProps[] = [
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
  { name: 'Toys & Games', icon: '🚗' },
];

type StyleClassNames = {
  leftShadowClassName?: string;
  rightShadowClassName?: string;
  cardClassName?: string;
  rowContainerClassName?: string;
  rowClassName?: string;
};

type Props = {
  slides?: SlideProps[];
  styleClassNames?: StyleClassNames;
  isMultiRow?: boolean;
  isBrand?: boolean;
};

export const MobileSlider: FunctionComponent<Props> = ({
  slides = BRANDS,
  styleClassNames,
  isMultiRow,
  isBrand,
}) => {
  // Refs
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

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

  // Callbacks
  const setRowRef = useCallback((el: HTMLLIElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  // Effects
  useEffect(() => {
    rowRefs.current.forEach((rowRef, index) => {
      const rowIndex = index + 1;
      if ((rowRef && rowIndex % 2 === 0) || (rowRef && !isMultiRow)) {
        const scrollableWidth = rowRef.scrollWidth - rowRef.clientWidth;
        rowRef.scrollLeft = scrollableWidth * 0.1;
      }
    });
  }, []);

  // Memoized data
  const distributedSlides = useMemo(
    () => (isMultiRow ? distributeSlides(slides) : [slides]),
    [slides, isMultiRow]
  );

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
      <li ref={el => setRowRef(el, index)} key={`row-${index}`} className={combinedClasses.row}>
        <ul className={baseClasses.slideList}>
          {row.map((brand, idx) => renderSlide(brand, idx))}
        </ul>
      </li>
    ),
    [baseClasses.slideList, combinedClasses.row, renderSlide, setRowRef]
  );

  return (
    <ul className={combinedClasses.container}>
      {distributedSlides.map((row, index) => renderRow(row, index))}
    </ul>
  );
};
