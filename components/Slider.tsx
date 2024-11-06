"use client";

import React, { useState, useRef, useEffect } from "react";

interface Category {
  id: number | string;
  name: string;
  icon: string;
}

interface CategorySliderProps {
  categories?: Category[][];
}

const defaultCategories: Category[][] = [
  [
    { id: 1, name: "Travel", icon: "✈️" },
    { id: 2, name: "Automobile", icon: "🚗" },
    { id: 3, name: "Health & Wellness", icon: "❤️" },
    { id: 4, name: "Arts & Crafts", icon: "🎨" },
    { id: 5, name: "Baby & Child Care", icon: "👶" },
    { id: 6, name: "Home & Kitchen", icon: "🏠" },
    { id: 7, name: "Beauty & Personal Care", icon: "💅" },
    { id: 8, name: "Books & Media", icon: "📚" },
    { id: 9, name: "Clothes and Fashion", icon: "👕" },
  ],
  [
    { id: 1, name: "Travel", icon: "✈️" },
    { id: 2, name: "Automobile", icon: "🚗" },
    { id: 3, name: "Health & Wellness", icon: "❤️" },
    { id: 4, name: "Arts & Crafts", icon: "🎨" },
    { id: 5, name: "Baby & Child Care", icon: "👶" },
    { id: 6, name: "Home & Kitchen", icon: "🏠" },
    { id: 7, name: "Beauty & Personal Care", icon: "💅" },
    { id: 8, name: "Books & Media", icon: "📚" },
    { id: 9, name: "Clothes and Fashion", icon: "👕" },
    { id: 1, name: "Travel", icon: "✈️" },
    { id: 2, name: "Automobile", icon: "🚗" },
    { id: 3, name: "Health & Wellness", icon: "❤️" },
    { id: 4, name: "Arts & Crafts", icon: "🎨" },
    { id: 5, name: "Baby & Child Care", icon: "👶" },
    { id: 6, name: "Home & Kitchen", icon: "🏠" },
    { id: 7, name: "Beauty & Personal Care", icon: "💅" },
    { id: 8, name: "Books & Media", icon: "📚" },
    { id: 9, name: "Clothes and Fashion", icon: "👕" },
  ],
];

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories = defaultCategories,
}) => {
  const [positions, setPositions] = useState<number[]>(categories.map(() => 0));
  const [isTransitioning, setIsTransitioning] = useState<boolean[]>(
    categories.map(() => false)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Create arrays with duplicated items for infinite scroll
  const extendedCategories = categories.map((row) => [...row, ...row, ...row]);

  useEffect(() => {
    // Initialize refs array
    rowRefs.current = rowRefs.current.slice(0, categories.length);

    // Initialize each row's position to show the middle set
    rowRefs.current.forEach((rowRef, index) => {
      if (rowRef) {
        const rowWidth = categories[index].length * (160 + 8);
        rowRef.style.transform = `translateX(-${rowWidth}px)`;
        setPositions((prev) => {
          const newPositions = [...prev];
          newPositions[index] = -rowWidth;
          return newPositions;
        });
      }
    });
  }, [categories]);

  const handleTransitionEnd = (rowIndex: number) => {
    const currentPosition = positions[rowIndex];
    const rowLength = categories[rowIndex].length;
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

    // Update all rows simultaneously
    setIsTransitioning((prev) => prev.map(() => true));
    setPositions((prev) => prev.map((pos) => pos + increment));
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-8">
      {/* Single pair of navigation buttons */}

      <button
        onClick={() => scroll("right")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous"
      >
        {"<"}
      </button>

      <button
        onClick={() => scroll("left")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next"
      >
        {">"}
      </button>

      {/* Multiple rows */}
      <div className="space-y-4">
        {categories.map((_, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden mx-8">
            <div
              ref={(el) => setRowRef(el, rowIndex)}
              className="inline-flex gap-2"
              style={{
                transform: `translateX(${positions[rowIndex]}px)`,
                transition: isTransitioning[rowIndex]
                  ? "transform 0.3s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={() => handleTransitionEnd(rowIndex)}
            >
              {extendedCategories[rowIndex].map((category, index) => (
                <button
                  key={`${category.id}-${index}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
