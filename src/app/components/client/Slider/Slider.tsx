'use client';

import React, {
  useState,
  useRef,
  useCallback,
  memo,
  useEffect,
  FunctionComponent,
  useMemo,
} from 'react';
import { SlideProps, SliderCard } from './SliderCard';
import { SliderNavigationButton } from './SliderNavigationButton';
import { distributeSlides } from './utils/distributeSlides';

type SliderProps = {
  isBrand?: boolean;
  maxRows?: number;
  classNameStyle?: {
    leftButtonClassName?: string;
    rightButtonClassName?: string;
    cardClassName?: string;
    rowContainerClassName?: string;
    rowClassName?: string;
  };
  slides: SlideProps[];
};

const SliderComponent: FunctionComponent<SliderProps> = ({
  classNameStyle = {},
  isBrand,
  slides,
  maxRows = 3,
}) => {
  const [position, setPosition] = useState(-50);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;

    const canScrollLeft = position < 0;
    const maxScroll = -(sliderWidth - containerWidth + 64);
    const canScrollRight = position > maxScroll;

    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(canScrollRight);
  }, [position]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - position);
    setIsTransitioning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - position);
    setIsTransitioning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;
    const maxScroll = -(sliderWidth - containerWidth + 64);

    const x = e.pageX;
    const walk = x - startX;

    setPosition(Math.min(0, Math.max(maxScroll, walk)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const sliderWidth = sliderRef.current?.scrollWidth || 0;
    const maxScroll = -(sliderWidth - containerWidth + 64);

    const x = e.touches[0].pageX;
    const walk = x - startX;

    setPosition(Math.min(0, Math.max(maxScroll, walk)));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const distributedSlides = useMemo(() => {
    return distributeSlides(slides, maxRows);
  }, [maxRows, slides]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full max-w-7xl mx-auto">
      <SliderNavigationButton
        direction="left"
        showLeftArrow={showLeftArrow}
        handleScroll={handleScroll}
        classNameStyle={{ leftButtonClassName: classNameStyle.leftButtonClassName }}
      />
      <SliderNavigationButton
        direction="right"
        showRightArrow={showRightArrow}
        handleScroll={handleScroll}
        classNameStyle={{ rightButtonClassName: classNameStyle.rightButtonClassName }}
      />

      <div
        ref={sliderRef}
        className={`transition-transform duration-300 ease-in-out cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          transform: `translateX(${position}px)`,
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
          userSelect: 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <ul
          className={`space-y-6 w-max ${classNameStyle.rowContainerClassName || ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          {distributedSlides.map((row, rowIndex) => (
            <li key={rowIndex} className="relative">
              <div className={`overflow-visible mx-8 ${classNameStyle.rowClassName || ''}`}>
                <ul className={`inline-flex gap-4 ${(rowIndex + 1) % 2 === 0 ? 'pr-20' : 'pl-20'}`}>
                  {row.map((category, index) => (
                    <li key={`${category.name}-${index}`} className="h-full w-full">
                      <SliderCard
                        data={category}
                        className={classNameStyle.cardClassName}
                        isBrand={isBrand}
                      />
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
