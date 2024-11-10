'use client';

import React, { useState, useRef, useEffect, FunctionComponent } from 'react';
import { SlideProps, SliderCard } from '../server/SliderCard';
import clsx from 'clsx';
import { LeftChevronIcon, RightChevronIcon } from '@/assets/icons';

type SliderProps = {
  slides?: SlideProps[][];
  classNameStyle?: {
    leftButtonClassName?: string;
    rightButtonClassName?: string;
    cardClassName?: string;
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

export const Slider: FunctionComponent<SliderProps> = ({
  slides = defaultCategories,
  classNameStyle,
}) => {
  const [positions, setPositions] = useState<number[]>(slides.map(() => 0));
  const [isTransitioning, setIsTransitioning] = useState<boolean[]>(slides.map(() => false));
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const extendedslides = slides.map(row => [...row, ...row, ...row]);

  // Helper functions for dynamic classes
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

  const getSlideRowStyles = (rowIndex: number) => ({
    transform: `translateX(${positions[rowIndex]}px)`,
    transition: clsx({
      'transform 0.3s ease-in-out': isTransitioning[rowIndex],
      none: !isTransitioning[rowIndex],
    }),
  });

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, slides.length);

    rowRefs.current.forEach((rowRef, index) => {
      if (rowRef) {
        const rowWidth = slides[index].length * (160 + 8);
        rowRef.style.transform = `translateX(-${rowWidth}px)`;
        setPositions(prev => {
          const newPositions = [...prev];
          newPositions[index] = -rowWidth;
          return newPositions;
        });
      }
    });
  }, [slides]);

  const handleTransitionEnd = (rowIndex: number) => {
    const currentPosition = positions[rowIndex];
    const rowLength = slides[rowIndex].length;
    const rowWidth = rowLength * (160 + 8);

    if (currentPosition <= -rowWidth * 2 || currentPosition >= 0) {
      setIsTransitioning(prev => {
        const newState = [...prev];
        newState[rowIndex] = false;
        return newState;
      });
      setPositions(prev => {
        const newPositions = [...prev];
        newPositions[rowIndex] = -rowWidth;
        return newPositions;
      });
    }
  };

  const setRowRef = (el: HTMLDivElement | null, index: number) => {
    rowRefs.current[index] = el;
  };

  const scroll = (direction: 'left' | 'right') => {
    const increment = direction === 'left' ? 300 : -300;
    setIsTransitioning(prev => prev.map(() => true));
    setPositions(prev => prev.map(pos => pos + increment));
  };

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

      <div className="space-y-4">
        {slides.map((_, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden mx-8">
            <div
              ref={el => setRowRef(el, rowIndex)}
              className="inline-flex gap-4"
              style={getSlideRowStyles(rowIndex)}
              onTransitionEnd={() => handleTransitionEnd(rowIndex)}
            >
              {[
                ...extendedslides[rowIndex],
                ...extendedslides[rowIndex],
                ...extendedslides[rowIndex],
              ].map((category, index) => (
                <SliderCard
                  key={`${category.name}-${index}`}
                  data={{ ...category }}
                  className={classNameStyle?.cardClassName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
