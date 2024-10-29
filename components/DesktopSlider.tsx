// Note: You'll need to install these dependencies:
// npm install react-flickity-component
"use client"
import React from 'react';
import Flickity from 'react-flickity-component';

export const DesktopSlider = () => {
  const flickityOptions = {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: true,
    pageDots: true,
    draggable: true,
    freeScroll: false,
    groupCells: true,
    wrapAround: true,
    adaptiveHeight: false,
    autoPlay: 3000,
    selectedAttraction: 0.015,
    friction: 0.25
  };

  const brands = [
    { name: 'Bauknecht', color: 'bg-indigo-600' },
    { name: 'Dyson', color: 'bg-white' },
    { name: 'Koenig', color: 'bg-white' },
    { name: 'Neff', color: 'bg-white' },
    { name: 'Philips', color: 'bg-white' },
    { name: 'DeLonghi', color: 'bg-white' },
    { name: 'Schneider', color: 'bg-white' },
    { name: 'Sony', color: 'bg-indigo-600' },
    { name: 'Moulinex', color: 'bg-white' },
    { name: 'Tefal', color: 'bg-white' },
    { name: 'ADE', color: 'bg-white' },
    { name: 'Betty Bossi', color: 'bg-red-600' },
  ];



  return (
    <div className="relative w-full bg-[#4B49EB]   max-w-6xl mx-auto px-8 py-6">
      <Flickity
        className="overflow-hidden items-center"
        options={flickityOptions}
        reloadOnUpdate
        static
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`mx-4 rounded-full px-6 py-2 min-w-[120px] flex items-center justify-center ${brand.color}`}
          >
            <span className={`text-sm font-medium ${brand.color === 'bg-white' ? 'text-gray-800' : 'text-white'}`}>
              {brand.name}
            </span>
          </div>
        ))}
      </Flickity>
    </div>
  );
};

