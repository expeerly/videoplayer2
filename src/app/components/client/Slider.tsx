'use client';

import React, { useState, useRef, useCallback, memo, useEffect, FunctionComponent } from 'react';
import { SlideProps, SliderCard } from '../server/SliderCard';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';

interface SliderProps {
  slides?: SlideProps[];
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
  container: 'flex items-center px-2 absolute w-28 h-full top-1/2 -translate-y-1/2 z-10',
  button:
    'bg-white rounded-full shadow-md py-3 px-4 hover:bg-gray-50 focus:outline-none focus:ring-0',
};

const DEFAULT_CATEGORIES: SlideProps[] = [
  { name: 'Travel', icon: '✈️' },
  { name: 'Automobile', icon: '🚗' },
  { name: 'Health & Wellness', icon: '❤️' },
  { name: 'Arts & Crafts', icon: '🎨' },
  { name: 'Baby & Child Care', icon: '👶' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Beauty & Personal Care', icon: '💅' },
  { name: 'Books & Media', icon: '📚' },
  { name: 'Clothes and Fashion', icon: '👕' },
  { name: 'Arts & Crafts', icon: '🎨' },
  { name: 'Baby & Child Care', icon: '👶' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Beauty & Personal Care', icon: '💅' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Automobile', icon: '🚗' },
  { name: 'Health & Wellness', icon: '❤️' },
  { name: 'Arts & Crafts', icon: '🎨' },
  { name: 'Baby & Child Care', icon: '👶' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Beauty & Personal Care', icon: '💅' },
];

const distributeSlides = <T extends SlideProps>(slides: T[]): T[][] =>
  Array.from({ length: Math.ceil(slides.length / 10) }, (_, i) =>
    slides.slice(i * 10, (i + 1) * 10)
  );

const SliderComponent: FunctionComponent<SliderProps> = ({
  slides = DEFAULT_CATEGORIES,
  classNameStyle = {},
}) => {
  // State
  const [position, setPosition] = useState(-50);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update navigation arrows visibility
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;

    const canScrollLeft = position < 0;
    const maxScroll = -(sliderWidth - containerWidth + 64);
    const canScrollRight = position > maxScroll;

    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(canScrollRight);
  }, [position]);

  // Handlers
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;
    const increment = direction === 'left' ? -100 : 100;

    setIsTransitioning(true);
    setPosition(prev => {
      const newPosition = Math.min(
        0,
        Math.max(-(sliderWidth - containerWidth + 64), prev + increment)
      );
      return newPosition;
    });
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // Navigation button renderer
  const renderNavigationButton = (direction: 'left' | 'right') => {
    const show = direction === 'left' ? showLeftArrow : showRightArrow;
    if (!show) return null;

    const buttonClassName =
      direction === 'left'
        ? classNameStyle.leftButtonClassName
        : classNameStyle.rightButtonClassName;

    const gradientClass =
      direction === 'left' ? 'bg-gradient-to-r from-white' : 'bg-gradient-to-l from-white';
    const positionClass = direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end';

    return (
      <div
        className={`${BUTTON_STYLES.container} ${gradientClass} ${positionClass} ${buttonClassName || ''}`}
      >
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

  const distributedSlides = distributeSlides(slides);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full max-w-7xl mx-auto">
      {renderNavigationButton('left')}
      {renderNavigationButton('right')}

      <div
        ref={sliderRef}
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${position}px)`,
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <ul className={`space-y-6 ${classNameStyle.rowContainerClassName || ''}`}>
          {distributedSlides.map((row, rowIndex) => (
            <li key={rowIndex} className="relative">
              <div className={`overflow-visible mx-8 ${classNameStyle.rowClassName || ''}`}>
                <ul className={`inline-flex gap-4 ${(rowIndex + 1) % 2 === 0 ? 'pr-20' : 'pl-20'}`}>
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
    </div>
  );
};

export const Slider = memo(SliderComponent);
