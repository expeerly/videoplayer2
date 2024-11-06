import React from 'react'
import {Slider} from './Slider';
import { MobileSlider } from './ui/MobileSlider';

function CategoeirsSlider() {
  return (
    <div className=' w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5'>
       <h1 className='font-extrabold text-2xl '>Explore Categories</h1>
       <p className=' mb-10 w-full  sm:w-[390px] text-center'>Whether you’d like to travel, find the perfect sofa or buy a new car, we’ve got you covered.</p>
       <div className=' hidden w-full  sm:flex'>
       <Slider /> 
       </div>
       <div className=' flex  w-full  sm:hidden'>
        <MobileSlider/>
       </div>
       
    </div>
  )
}

export default CategoeirsSlider;