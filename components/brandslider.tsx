"use client";
import React, { useState, useEffect } from 'react';
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const BrandCarousel = () => {
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(0);
  
  const brands = [
    { name: "Dyson", id: 1 },
    { name: "Philips", id: 2 },
    { name: "Sony", id: 3 },
    { name: "Tefal", id: 4 },
    { name: "ADE", id: 5 },
    { name: "Russel", id: 6 },
    { name: "DeLonghi", id: 7 },
    { name: "Braun", id: 8 },
    { name: "9", id: 9 }
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    const animateLeft = () => {
      setPosition1((prevPosition) => {
        const newPosition = prevPosition - 1;
        if (-newPosition >= brands.length * 120) return 0;
        return newPosition;
      });
    };
    const intervalId = setInterval(animateLeft, 40);
    return () => clearInterval(intervalId);
  }, [brands.length]);

  useEffect(() => {
    const animateRight = () => {
      setPosition2((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (newPosition >= brands.length * 120) {
          return 120; 
        }
        return newPosition;
      });
    };
    const intervalId = setInterval(animateRight, 40);
    return () => clearInterval(intervalId);
  }, [brands.length]);

  
  const handleLeftClick = () => {
    setPosition1((prevPosition) => {
      const newPosition = prevPosition - 120;
      return Math.max(newPosition, -brands.length * 120); 
    });
    setPosition2((prevPosition) => {
      const newPosition = prevPosition - 120; 
      return Math.max(newPosition, -brands.length * 120); 
    });
  };

  const handleRightClick = () => {
    setPosition1((prevPosition) => {
      const newPosition = prevPosition + 120; 
      return Math.min(newPosition, 0); 
    });
    setPosition2((prevPosition) => {
      const newPosition = prevPosition + 120;
      return Math.min(newPosition, 0); 
    });
  };

  return (
    <Card className="bg-[#4B49EB] w-full  sm:p-8 sm:pb-24 pb-10 overflow-hidden rounded-none my-20  ">
      <div className="flex flex-col items-center gap-4 text-white mb-6">
        <h2 className="text-2xl font-extrabold text-center p-8 pb-0">Video reviews on brands you love</h2>
        <p className="opacity-80  text-center px-20">Tap on brand logo to explore reviews</p>
      </div>
      <div className="relative w-full overflow-hidden my-3 sm:my-10">
        <div
          className="flex gap-4 transition-transform duration-100"
          style={{ transform: `translateX(${position1}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`left-${brand.id}-${index}`}
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

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-100"
          style={{ transform: `translateX(${position2}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`right-${brand.id}-${index}`}
              className="flex-shrink-0 min-w-[120px] bg-white border border-black rounded-full p-1 cursor-pointer 
                         hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center justify-center h-8">
                <span className="text-gray-700 font-medium">{brand.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute left-8 top-52 hidden sm:flex justify-between items-center ">
            <button onClick={handleLeftClick} className="bg-white text-gray-700  p-2 rounded-full">
          <ChevronLeft size={24} />
        </button>
        </div>
        <div className="absolute right-8 top-52 hidden sm:flex justify-end items-center  ">
        <button onClick={handleRightClick} className="bg-white text-gray-700 p-2 rounded-full">
          <ChevronRight size={24} />
        </button>
        </div>
      

      <div className="flex justify-center pt-5 sm:mt-10 px-[18px] ">
        <Button color="danger" radius='full' className='bg-white sm:w-[300px] w-full font-bold text-black'>
          Get Video Reviewed
        </Button>
      </div>
    </Card>
  );
};

export default BrandCarousel;
