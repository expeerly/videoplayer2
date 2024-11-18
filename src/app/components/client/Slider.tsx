'use client';

import React, { useState, useRef, useCallback, memo, useEffect, FunctionComponent } from 'react';
import { SlideProps, SliderCard } from '../server/SliderCard';
import clsx from 'clsx';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';

// Types
interface SliderProps {
  slides?: SlideProps[][];
  classNameStyle?: {
    leftButtonClassName?: string;
    rightButtonClassName?: string;
    cardClassName?: string;
    rowContainerClassName?: string;
    rowClassName?: string;
  };
}

// Constants
const BUTTON_STYLES = {
  container: clsx('flex items-center px-2', 'absolute w-28 h-full top-1/2 -translate-y-1/2 z-10'),
  button: clsx(
    'bg-white rounded-full shadow-md py-3 px-4',
    'hover:bg-gray-50',
    'focus:outline-none focus:ring-0'
  ),
};

const DEFAULT_CATEGORIES: SlideProps[][] = [
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

// Helper Functions
const getNavigationClasses = (direction: 'left' | 'right', customClassName?: string) => {
  const gradientClass = direction === 'left' ? 'bg-white-left-gradient' : 'bg-white-right-gradient';
  const positionClass = direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end';

  return clsx(BUTTON_STYLES.container, gradientClass, positionClass, customClassName);
};

const SliderComponent: FunctionComponent<SliderProps> = ({
  slides = DEFAULT_CATEGORIES,
  classNameStyle = {},
}) => {
  // State
  const [positions, setPositions] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean[]>(slides.map(() => false));
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLUListElement | null>>([]);

  // Initialize positions
  useEffect(() => {
    setPositions(slides.map(() => -50));
  }, [slides]);

  // Update navigation arrows visibility
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;

    const canScrollLeft = positions.some(position => position < 0);
    const canScrollRight = positions.some((position, index) => {
      const rowRef = rowRefs.current[index];
      if (!rowRef) return false;
      const maxScroll = -(rowRef.scrollWidth - containerWidth + 64);
      return position > maxScroll;
    });

    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(canScrollRight);
  }, [positions]);

  // Handlers
  const setRowRef = useCallback((el: HTMLUListElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const increment = direction === 'left' ? -100 : 100;

    setIsTransitioning(prev => prev.map(() => true));
    setPositions(prev =>
      prev.map((position, index) => {
        const rowRef = rowRefs.current[index];
        if (!rowRef) return position;

        const rowWidth = rowRef.scrollWidth;
        const newPosition = Math.min(
          0,
          Math.max(-(rowWidth - containerWidth + 64), position + increment)
        );

        return newPosition;
      })
    );
  }, []);

  const getRowStyles = useCallback(
    (rowIndex: number) => ({
      transform: `translateX(${positions[rowIndex]}px)`,
      transition: isTransitioning[rowIndex] ? 'transform 0.3s ease-in-out' : 'none',
    }),
    [isTransitioning, positions]
  );

  // Render helper functions
  const renderNavigationButton = (direction: 'left' | 'right') => {
    const show = direction === 'left' ? showLeftArrow : showRightArrow;
    if (!show) return null;

    const buttonClassName =
      direction === 'left'
        ? classNameStyle.leftButtonClassName
        : classNameStyle.rightButtonClassName;

    return (
      <div className={getNavigationClasses(direction, buttonClassName)}>
        <button
          onClick={() => handleScroll(direction === 'left' ? 'right' : 'left')}
          className={BUTTON_STYLES.button}
          aria-label={direction === 'left' ? 'Previous' : 'Next'}
        >
          {direction === 'left' ? <LeftChevronIcon /> : <RightChevronIcon />}
        </button>
      </div>
    );
  };

  const handleTransitionEnd = (rowIndex: number) => {
    setIsTransitioning(prev => {
      const newState = [...prev];
      newState[rowIndex] = false;
      return newState;
    });
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto">
      {renderNavigationButton('left')}
      {renderNavigationButton('right')}

      <ul className={clsx('space-y-6', classNameStyle.rowContainerClassName)}>
        {slides.map((row, rowIndex) => (
          <li key={rowIndex} className="relative">
            <div className={clsx('overflow-hidden mx-8', classNameStyle.rowClassName)}>
              <ul
                ref={el => setRowRef(el, rowIndex)}
                className={clsx('inline-flex gap-4', (rowIndex + 1) % 2 === 0 ? 'pr-20' : 'pl-20')}
                style={getRowStyles(rowIndex)}
                onTransitionEnd={() => handleTransitionEnd(rowIndex)}
              >
                {row.map((category, index) => (
                  <li key={`${category.name}-${index}`} className="h-full w-full">
                    <SliderCard data={category} className={classNameStyle.cardClassName} />
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
