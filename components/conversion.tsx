"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Conversion = () => {
  const [position, setPosition] = useState(0);
  const [showChevrons, setShowChevrons] = useState(false);
  
  
  const scrollInterval = useRef<number | null>(null); 
  const containerRef = useRef<HTMLDivElement | null>(null);

  const brands = [
    { name: "Dyson", id: 1 },
    { name: "Philips", id: 2 },
    { name: "Sony", id: 3 },
    { name: "Tefal", id: 4 },
    { name: "ADE", id: 5 },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalBrandsWidth = brands.length * 120;
      setShowChevrons(totalBrandsWidth > containerWidth);

      if (totalBrandsWidth > containerWidth) {
        startAutoScroll();
      }
    }

    return stopAutoScroll; 
  }, [brands.length]);

  const startAutoScroll = () => {
    stopAutoScroll();

   
    scrollInterval.current = window.setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition - 1;
        return Math.abs(newPosition) >= (brands.length - 1) * 120 ? 0 : newPosition;
      });
    }, 40);
  };

  const stopAutoScroll = () => {
    if (scrollInterval.current !== null) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null; 
    }
  };

  const handleLeftClick = () => {
    stopAutoScroll(); 
    setPosition((prevPosition) => {
      const newPosition = prevPosition - 120;
      return Math.max(newPosition, -(brands.length - 1) * 120);
    });
  };

  const handleRightClick = () => {
    stopAutoScroll(); 
    setPosition((prevPosition) => {
      const newPosition = prevPosition + 120;
      return Math.min(newPosition, 0);
    });
  };

  return (
    <Card className="bg-[#4B49EB] w-full md:w-[1165px] sm:p-8 sm:pb-14 pb-10 overflow-hidden rounded-none my-20">
      <div className="flex flex-col items-center gap-4 text-white mb-6">
        <h2 className="text-2xl font-extrabold text-center p-8 pb-0">
          Boost conversion with video reviews
        </h2>
        <p className="opacity-80 text-center px-20">
          Are you a retailer wanting to display expertly reviews for free?
        </p>
      </div>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div
          className="flex gap-4 justify-center transition-transform duration-100"
          style={{ transform: `translateX(${position}px)` }}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 min-w-[120px] bg-white rounded-full border border-black p-1 cursor-pointer 
                         hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center justify-center h-8">
                <span className="text-gray-700 font-medium">{brand.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showChevrons && (
        <>
          <div className="absolute left-8 top-52 hidden sm:flex justify-between items-center">
            <button
              onClick={handleLeftClick}
              className="bg-white text-gray-700 p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute right-8 top-52 hidden sm:flex justify-end items-center">
            <button
              onClick={handleRightClick}
              className="bg-white text-gray-700 p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center pt-5 sm:mt-10 px-[18px]">
        <Button
          color="danger"
          radius="full"
          className="bg-white sm:w-[300px] w-full font-bold text-black"
        >
          Integrate Video Reviews Now
        </Button>
      </div>
    </Card>
  );
};

export default Conversion;
