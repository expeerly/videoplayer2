import React, { FunctionComponent } from "react";
import { PlayIcon } from "../assets/PlayIcon"; 
import { ProfileIcon } from "../assets/Profile";
import { Star } from "@/assets/Star";
import Image from "next/image";
import bgimage from "@/assets/Screenshot.png"
type StaticImageData = any;

type Props = {
  video: {
    id: number;
    bgImage:  StaticImageData;
    rating: number;
    view: number;
    brand: string;
    productName: string;
  };
};

export const VideoCard: FunctionComponent<Props> = ({ video }) => {
  return (
    <div
      key={video.id}
      className="relative min-w-[160px] max-w-[160px] rounded-xl overflow-hidden box-border"
    >
      <div className='relative group cursor-pointer'>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
       
        <Image src={bgimage} alt="bgpoto"  className="w-full h-full object-cover" /> 
        <div className="absolute top-3 left-3 text-white rounded-full font-medium text-xs">
          <div className="flex items-center gap-1 justify-center ml-1">
            
            <p className=" text-sm font-medium">
              {video.rating}
              </p>
            <div className="flex">
              {Array.from({ length: video.rating }).map((_, index) => (
                <span key={index} className="text-yellow-400 ml-0.5"><Star/></span>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="h-3 w-3" >
               <PlayIcon />
            </div>
           <p className="font-bold text-sm ">
             {video.view}
           </p>
           
          </div>
        </div>

        <div className="absolute bottom-1 left-0 right-0 p-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className=" w-8 h-8  rounded-full">
              <ProfileIcon /> 
            </div>
            <div className="text-white ml-2 w-24">
              <p className="text-sm font-medium leading-tight truncate">
                {video.brand}
              </p>
              <p className="text-sm font-medium w-full truncate">
                {video.productName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
