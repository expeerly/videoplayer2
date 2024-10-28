"use client";
import React, { useState, useEffect } from 'react';
import { Card } from "@nextui-org/card";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ExploreCategories = () => {
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(0);
  const [position3, setPosition3] = useState(0);
  
  const brands = [
    { name: "Dyson", id: 1 },
    { name: "Philips", id: 2 },
    { name: "Sony", id: 3 },
    { name: "Tefal", id: 4 },
    { name: "ADE", id: 5 },
    { name: "Russel", id: 6 },
    { name: "DeLonghi", id: 7 },
    { name: "Braun", id: 8 },
    { name: "9", id: 9 },
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];


  useEffect(() => {
    const animateLeft = () => {
      setPosition1((prev) => (prev - 1 < -brands.length * 120 ? 0 : prev - 1));
    };
    const intervalId = setInterval(animateLeft, 40);
    return () => clearInterval(intervalId);
  }, [brands.length]);


  useEffect(() => {
    const animateRight = () => {
      setPosition2((prev) => (prev + 1 > brands.length * 120 ? 120 : prev + 1));
    };
    const intervalId = setInterval(animateRight, 40);
    return () => clearInterval(intervalId);
  }, [brands.length]);

  
  useEffect(() => {
    const animateOpposite = () => {
      setPosition3((prev) => (prev - 1 < -brands.length * 120 ? 0 : prev - 1));
    };
    const intervalId = setInterval(animateOpposite, 40);
    return () => clearInterval(intervalId);
  }, [brands.length]);

  const handleLeftClick = () => {
    setPosition1((prev) => Math.max(prev - 120, -brands.length * 120));
    setPosition2((prev) => Math.max(prev - 120, -brands.length * 120));
    setPosition3((prev) => Math.max(prev - 120, -brands.length * 120));
  };

  const handleRightClick = () => {
    setPosition1((prev) => Math.min(prev + 120, 0));
    setPosition2((prev) => Math.min(prev + 120, 0));
    setPosition3((prev) => Math.min(prev + 120, 0));
  };

  return (
    <Card className="w-full border-none rounded-none sm:p-8 overflow-hidden py-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h2 className="text-2xl font-extrabold">Explore Categories</h2>
        <p className="opacity-80 md:w-2/5 w-full  px-[18px] sm:px-0 text-center">
          Whether you’d like to travel, find the perfect sofa, or buy a new car, we’ve got you covered.
        </p>
      </div>

   
      <div className="relative w-full overflow-hidden my-4 sm:my-10">
        <div
          className="flex gap-4 transition-transform duration-100"
          style={{ transform: `translateX(${position1}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`left-${brand.id}-${index}`}
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

     
      <div className="relative w-full overflow-hidden my-4 sm:my-10">
        <div
          className="flex gap-4 transition-transform duration-100"
          style={{ transform: `translateX(${position3}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`opposite-${brand.id}-${index}`}
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

      
      <div className="absolute left-8 top-72 sm:flex hidden justify-between items-center">
        <button onClick={handleLeftClick} className="bg-white text-gray-700 p-2 rounded-full">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute right-8 top-72 sm:flex hidden justify-end items-center">
        <button onClick={handleRightClick} className="bg-white text-gray-700 p-2 rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>
    </Card>
  );
};

export default ExploreCategories;
