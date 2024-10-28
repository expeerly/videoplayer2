import React from 'react';
import { Star, View } from "lucide-react";
import {Avatar,} from "@nextui-org/avatar";
import screenshoot from '../app/assest/Screenshot.png'
import Image from 'next/image';
import { ChevronRight , Play  } from 'lucide-react';
import screenshoot2 from '../app/assest/Screenshot2.png'
import screenshoot3 from '../app/assest/Screenshot3.png'
import screenshoot4 from '../app/assest/Screenshot4.png'



const ProductReviewsCard = () => {
  const reviews = [
    {
      id: 1,
      productName: "Grill & Grid jvasgfh h kjewfkuteg kajewfkguiaej",
      brand: "Kaarlig",
      rating: 5,
      ratingCount: "1.4k",
      bgColor: "bg-gray-200",
      image: screenshoot2,
      view: 500.399
    },
    {
      id: 2,
      productName: "Supersonic",
      brand: "Dyson",
      rating: 4,
      ratingCount: "2.3k",
      bgColor: "bg-gray-300",
      image: screenshoot3,
      view: 456619
    },
    {
      id: 3,
      productName: "Headp",
      brand: "Dyson",
      rating: 4,
      ratingCount: "428,255",
      bgColor: "bg-gray-200",
      image: screenshoot4,
      view : 48715314
    },
    {
      id: 4,
      productName: "Supersonic Pro",
      brand: "Dyson",
      rating: 5,
      ratingCount: "3.2k",
      bgColor: "bg-gray-300",
      image: screenshoot,
      view: 1564864
    },
    {
      id: 5,
      productName: "Super Hair",
      brand: "Dyson",
      rating: 4,
      ratingCount: "32,356",
      bgColor: "bg-gray-200",
      image: screenshoot2,
      view: 8798841
    }
  ];

  return (
    <div className="w-full max-w-4xl p-5  my-5">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="w-10 h-10 border-2 border-purple-500">
            <img src="/api/placeholder/32/32" alt="User avatar" />
          </Avatar>
          <div >
            <div className=' flex justify-center items-center text-[#0E0E0F]'> 
                <h1 className=' font-bold '>Marisa C. </h1>
                <ChevronRight />
            </div>
            <p className="text-sm text-[#8D8B94]">38, Zurich (CH)</p>
          </div>
        </div>
        <div className="flex  sm:w-2/5 items-center mt-2">
          
          <p className=" text-gray-700 ml-2 line-clamp-2">I love cooking and getting people around in our garden, specially when weather is good...</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="relative min-w-[160px] rounded-xl overflow-hidden box-border"
          >
            <div className={`${review.bgColor} h-64 relative group cursor-pointer`}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
              <Image
                src={review.image}
                alt={review.productName}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-3 left-3   text-white  rounded-full font-medium text-xs">
                <div className='flex items-center gap-1 justify-center ml-1'>
                {review.ratingCount}
                <div className="flex items-center gap-1 ">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                </div>
                <div className='flex items-center mt-1 '>
              <Play className='h-5' />
              {review.view}
              </div>
              </div>
              
              
              <div className="absolute bottom-0 left-0 right-0 p-4 w-full">
                
                <div className="flex items-center gap-2 w-full">
                  <div className="bg-white p-1 rounded-full">
                    <img
                      src="/api/placeholder/20/20"
                      alt={review.brand}
                      className="w-5 h-5 rounded-full"
                    />
                  </div>
                  <div className="text-white w-full">
                    <p className="text-sm font-medium leading-tight">{review.brand}</p>
                    <p className="text-xs opacity-90 w-28 truncate">{review.productName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsCard;