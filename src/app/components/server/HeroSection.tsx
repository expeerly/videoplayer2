import React, { FunctionComponent } from 'react';
import { ScrollButton } from '../client/ScrollButton';
import Image from 'next/image';
import { getDictionary } from '@/src/lib/dictionary';

export const HeroSection: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <div className="bg-gradient-to-b from-blue-500 to-[#2C1277] w-full md:bg-none">
      <div
        style={{
          backgroundImage: `url(/BG.svg)`,
        }}
        className="w-full flex items-center justify-bottom relative bg-top bg-cover bg-no-repeat z-0 h-[401px] md:bg-bottom sm:h-[400px] md:h-[500px] lg:h-[450px]"
      >
        <div className="absolute h-[340px] w-[300px] top-7 mobileL:w-[350px] sm:top-6 md:top-16 lg:top-18 left-1/2 transform -translate-x-1/2 flex justify-center">
          <Image
            src={'/HeaderImage.svg'}
            alt={'Header Image'}
            height={340}
            width={300}
            className=" mobileL:w-[350px]"
          />
        </div>
        <div className="w-[80%] flex flex-col gap-2 text-center  mx-auto z-50 items-center text-white sm:mt-10 md:w-[75%] lg:w-[78%]">
          <div className="flex items-start justify-start">
            <Image src={'/Quets.svg'} alt="Quote" width={24} height={24} className="" />
            <h1 className="text-[42px]  lg:text-[47px] font-extrabold">{t.home_h1_title}</h1>
          </div>
          <p className="text-base w-[80%] md:w-[50%] lg:w-[40%] ">{t.home_top_body_text}</p>
          <ScrollButton className="mt-5 mobileL:mt-10" />
        </div>
      </div>
    </div>
  );
};
