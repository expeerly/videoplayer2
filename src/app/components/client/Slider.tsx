'use client';

import React, { useState, useRef, FunctionComponent, useCallback, memo, useEffect } from 'react';
import { SlideProps, SliderCard } from '../server/SliderCard';
import clsx from 'clsx';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';

type SliderProps = {
  slides?: SlideProps[][];
  classNameStyle?: {
    leftButtonClassName?: string;
    rightButtonClassName?: string;
    cardClassName?: string;
    rowContainerClassName?: string;
    rowClassName?: string;
  };
};

// Constants for base classes
const BUTTON_CONTAINER_BASE_CLASSES = clsx(
  'flex items-center px-2',
  'absolute w-28 h-full top-1/2 -translate-y-1/2 z-10'
);

const BUTTON_BASE_CLASSES = clsx(
  'bg-white rounded-full shadow-md py-3 px-4',
  'hover:bg-gray-50',
  'focus:outline-none focus:ring-0'
);

const defaultCategories: SlideProps[][] = [
  [
    { name: 'Travel', icon: '✈️' },
    { name: 'Automobile', icon: '🚗' },
    { name: 'Health & Wellness', icon: '❤️' },
    { name: 'Arts & Crafts', icon: '🎨' },
    { name: 'Baby & Child Care', icon: '👶' },
    { name: 'Home & Kitchen', icon: '🏠' },
    { name: 'Beauty & Personal Care', icon: '💅' },
    { name: 'Books & Media', icon: '📚' },
    { name: 'Clothes and Fashion', icon: '👕' },
  ],
  [
    { name: 'Travel', icon: '✈️' },
    { name: 'Automobile', icon: '🚗' },
    { name: 'Health & Wellness', icon: '❤️' },
    { name: 'Arts & Crafts', icon: '🎨' },
    { name: 'Baby & Child Care', icon: '👶' },
    { name: 'Home & Kitchen', icon: '🏠' },
    { name: 'Beauty & Personal Care', icon: '💅' },
    { name: 'Books & Media', icon: '📚' },
    { name: 'Clothes and Fashion', icon: '👕' },
  ],
];

const getNavigationButtonContainerClasses = (
  direction: 'left' | 'right',
  customClassName?: string
) => {
  const gradientDirection =
    direction === 'left'
      ? 'bg-[linear-gradient(90deg,_#FFFFFF_47.5%,_rgba(255,255,255,0)_100%)]'
      : 'bg-[linear-gradient(270deg,_#FFFFFF_47.5%,_rgba(255,255,255,0)_100%)]';

  return clsx(
    BUTTON_CONTAINER_BASE_CLASSES,
    gradientDirection,
    direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end',
    customClassName
  );
};

const SliderComponent: FunctionComponent<SliderProps> = ({
  slides = defaultCategories,
  classNameStyle,
}) => {
  const [positions, setPositions] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean[]>(slides.map(() => false));
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLUListElement | null>>([]);

  // Initialize positions with offset for even-indexed rows
  useEffect(() => {
    const initialPositions = slides.map((_, index) => {
      const rowIndex = index + 1;
      // Offset even-indexed rows by -150px
      return rowIndex % 2 === 0 ? -100 : 0;
    });
    setPositions(initialPositions);
  }, [slides]);

  const getSlideRowStyles = useCallback(
    (rowIndex: number) => ({
      transform: `translateX(${positions[rowIndex]}px)`,
      transition: clsx({
        'transform 0.3s ease-in-out': isTransitioning[rowIndex],
        none: !isTransitioning[rowIndex],
      }),
    }),
    [isTransitioning, positions]
  );

  const setRowRef = useCallback(
    (el: HTMLUListElement | null, index: number) => {
      rowRefs.current[index] = el;
    },
    [rowRefs]
  );

  const scroll = useCallback((direction: 'left' | 'right') => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const increment = direction === 'left' ? -300 : 300;

    setIsTransitioning(prev => prev.map(() => true));

    setPositions(prev => {
      return prev.map((position, index) => {
        const rowRef = rowRefs.current[index];
        if (!rowRef) return position;

        const rowWidth = rowRef.scrollWidth;
        let newPosition = position + increment;

        // Add bounds checking with offset for even-indexed rows
        if (index % 2 === 0) {
          // Even-indexed rows have a -150px offset
          if (newPosition > -150) {
            newPosition = -150;
          } else if (newPosition < -(rowWidth - containerWidth + 64)) {
            newPosition = -(rowWidth - containerWidth + 64);
          }
        } else {
          // Odd-indexed rows behave normally
          if (newPosition > 0) {
            newPosition = 0;
          } else if (newPosition < -(rowWidth - containerWidth + 64)) {
            newPosition = -(rowWidth - containerWidth + 64);
          }
        }

        return newPosition;
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto">
      <div
        className={getNavigationButtonContainerClasses('left', classNameStyle?.leftButtonClassName)}
      >
        <button
          onClick={() => scroll('right')}
          className={BUTTON_BASE_CLASSES}
          aria-label="Previous"
        >
          <LeftChevronIcon />
        </button>
      </div>

      <div
        className={getNavigationButtonContainerClasses(
          'right',
          classNameStyle?.rightButtonClassName
        )}
      >
        <button onClick={() => scroll('left')} className={BUTTON_BASE_CLASSES} aria-label="Next">
          <RightChevronIcon />
        </button>
      </div>

      <ul className={clsx('space-y-6', classNameStyle?.rowContainerClassName)}>
        {slides.map((row, rowIndex) => (
          <li key={rowIndex} className="relative">
            <div className={clsx('overflow-hidden mx-8', classNameStyle?.rowClassName)}>
              <ul
                ref={el => setRowRef(el, rowIndex)}
                className="inline-flex gap-4"
                style={getSlideRowStyles(rowIndex)}
                onTransitionEnd={() => {
                  setIsTransitioning(prev => {
                    const newState = [...prev];
                    newState[rowIndex] = false;
                    return newState;
                  });
                }}
              >
                {row.map((category, index) => (
                  <li key={`${category.name}-${index} h-full w-full`}>
                    <SliderCard
                      key={`${category.name}-${index}`}
                      data={category}
                      className={classNameStyle?.cardClassName}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Slider = memo(SliderComponent);
