import React, { FunctionComponent } from 'react'
import {Slider} from '../../../components/ui/server/Slider';
import { MobileSlider } from '../../../components/ui/server/MobileSlider';

export const CategoeirsSlider: FunctionComponent = () => {
  return (
    <div className=' w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-10 '>
       <h1 className='font-extrabold text-2xl px-3 '>Explore Categories</h1>
       <p className=' mb-10 w-full  sm:w-[390px] px-3 text-center'>Whether you’d like to travel, find the perfect sofa or buy a new car, we’ve got you covered.</p>
       <div className=' hidden w-full  sm:flex'>
       <Slider /> 
       </div>
       <div className=' flex  w-full px_3  sm:hidden'>
        <MobileSlider/>
       </div>
       
    </div>
  );
};
