import React, { FunctionComponent } from 'react';
import { Slider } from '../../../components/ui/client/Slider';
import { MobileSlider } from '../../../components/ui/server/MobileSlider';

export const CategoriesSlider: FunctionComponent = () => {
  return (
    <div className="w-full sm:max-w-[1170px] flex flex-col justify-center items-center gap-4 py-10 ">
      <h2 className="font-extrabold text-2xl px-3 ">Explore Categories</h2>
      <p className=" mb-10 w-full  sm:w-[390px] px-3 text-center">
        Whether you’d like to travel, find the perfect sofa or buy a new car, we’ve got you covered.
      </p>
      <div className=" hidden w-full  md:flex">
        <Slider classNameStyle={{ rowContainerClassName: '!space-y-4' }} />
      </div>
      <div className=" flex w-full md:hidden">
        <MobileSlider styleClassNames={{ rowContainerClassName: '!space-y-4' }} />
      </div>
    </div>
  );
};
