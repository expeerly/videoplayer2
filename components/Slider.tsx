"use client"
import React from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const Slider = () => {
  const brands = [
    'Bauknecht', 'Dyson', 'Koenig', 'Neff', 'Philips', 
    'DeLonghi', 'Kenwood', 'Sony', 'Moulinex', 'Tefal', 
    'ADE', 'Betty Bossi', 'ChefChoice', 'Braeter'
  ];

  const flickityOptions = {
    autoPlay: 1500,
    wrapAround: true,
    freeScroll: true,
    contain: true,
    prevNextButtons: true,
    pageDots: false,
    draggable: true,
    friction: 0.1,
    selectedAttraction: 0.01,
    cellAlign: 'left',
    groupCells: true
  };

  return (
    <div className="w-full bg-indigo-600 py-6 px-4">
      <div className="max-w-6xl mx-auto relative">
        <Flickity
          className="carousel"
          options={flickityOptions}
          reloadOnUpdate
          static
        >
          {brands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="carousel-cell mx-2"
            >
              <div className="bg-white rounded-full px-6 py-2 min-w-[120px] flex items-center justify-center">
                <span className="text-gray-800 font-medium whitespace-nowrap">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </Flickity>
      </div>
    </div>
  );
};

export default Slider;