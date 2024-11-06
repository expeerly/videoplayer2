"use client";

import React, { useState, useRef, useEffect, FunctionComponent } from "react";
import { SlideProps, SliderCard } from "./ui/SliderCard";

type SliderProps = {
  slides?: SlideProps[][];
};

const defaultCategories: SlideProps[][] = [
  [
    { name: "Travel", icon: "✈️" },
    { name: "Automobile", icon: "🚗" },
    { name: "Health & Wellness", icon: "❤️" },
    { name: "Arts & Crafts", icon: "🎨" },
    { name: "Baby & Child Care", icon: "👶" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty & Personal Care", icon: "💅" },
    { name: "Books & Media", icon: "📚" },
    { name: "Clothes and Fashion", icon: "👕" },
  ],
  [
    { name: "Travel", icon: "✈️" },
    { name: "Automobile", icon: "🚗" },
    { name: "Health & Wellness", icon: "❤️" },
    { name: "Arts & Crafts", icon: "🎨" },
    { name: "Baby & Child Care", icon: "👶" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty & Personal Care", icon: "💅" },
    { name: "Books & Media", icon: "📚" },
    { name: "Clothes and Fashion", icon: "👕" },
    { name: "Travel", icon: "✈️" },
    { name: "Automobile", icon: "🚗" },
    { name: "Health & Wellness", icon: "❤️" },
    { name: "Arts & Crafts", icon: "🎨" },
    { name: "Baby & Child Care", icon: "👶" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty & Personal Care", icon: "💅" },
    { name: "Books & Media", icon: "📚" },
    { name: "Clothes and Fashion", icon: "👕" },
  ],
];

export const Slider: FunctionComponent<SliderProps> = ({
  slides = defaultCategories,
}) => {
  const [positions, setPositions] = useState<number[]>(slides.map(() => 0));
  const [isTransitioning, setIsTransitioning] = useState<boolean[]>(
    slides.map(() => false)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const extendedslides = slides.map((row) => [...row, ...row, ...row]);

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, slides.length);

    rowRefs.current.forEach((rowRef, index) => {
      if (rowRef) {
        const rowWidth = slides[index].length * (160 + 8);
        rowRef.style.transform = `translateX(-${rowWidth}px)`;
        setPositions((prev) => {
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

    if (currentPosition <= -rowWidth * 2) {
      setIsTransitioning((prev) => {
        const newState = [...prev];
        newState[rowIndex] = false;
        return newState;
      });
      setPositions((prev) => {
        const newPositions = [...prev];
        newPositions[rowIndex] = -rowWidth;
        return newPositions;
      });
    } else if (currentPosition >= 0) {
      setIsTransitioning((prev) => {
        const newState = [...prev];
        newState[rowIndex] = false;
        return newState;
      });
      setPositions((prev) => {
        const newPositions = [...prev];
        newPositions[rowIndex] = -rowWidth;
        return newPositions;
      });
    }
  };

  const setRowRef = (el: HTMLDivElement | null, index: number) => {
    rowRefs.current[index] = el;
  };

  const scroll = (direction: "left" | "right") => {
    const increment = direction === "left" ? 300 : -300;


    setIsTransitioning((prev) => prev.map(() => true));
    setPositions((prev) => prev.map((pos) => pos + increment));
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto ">
      <div className=" flex justify-center items-center absolute w-40 h-full left-0 top-1/2 -translate-y-1/2 z-10  bg-[linear-gradient(90deg,_#FFFFFF_40.5%,_rgba(255,255,255,0)_100%)]">
        <button
          onClick={() => scroll("right")}
          className=" bg-white rounded-full shadow-md p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous"
        >
          {"<"}
        </button>
      </div>

      <div className=" flex justify-center items-center absolute w-40 h-full right-0 top-1/2 -translate-y-1/2 z-10  bg-[linear-gradient(270deg,_#FFFFFF_47.5%,_rgba(255,255,255,0)_100%)]">
        <button
          onClick={() => scroll("left")}
          className=" bg-white rounded-full shadow-md p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next"
        >
          {">"}
        </button>
      </div>

      <div className="space-y-4">
        {slides.map((_, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden mx-8">
            <div
              ref={(el) => setRowRef(el, rowIndex)}
              className="inline-flex gap-4"
              style={{
                transform: `translateX(${positions[rowIndex]}px)`,
                transition: isTransitioning[rowIndex]
                  ? "transform 0.3s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={() => handleTransitionEnd(rowIndex)}
            >
              {extendedslides[rowIndex].map((category, index) => (
                <SliderCard key={index} {...category} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
