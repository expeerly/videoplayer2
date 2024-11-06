import React from 'react'
import {Slider} from './Slider';
import { MobileSlider } from './ui/MobileSlider';

function BrandsSlider() {
  return (
    <div className='w-full  bg-[#4B49EB] flex justify-center'>
    <div className='bg-[#4B49EB] w-full sm:max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5'>
       <h1 className='font-extrabold text-2xl text-center text-white'>Video reviews on brands you love</h1>
       <p className='text-white mb-10'>Tap on brand logo to explore reviews.</p>
       <div className=' hidden w-full sm:flex'>
       <Slider /> 
       </div>
       <div className=' flex w-full  sm:hidden'>
        <MobileSlider/>
       </div>
       
       <button className=' bg-white mt-10 text-black font-bold w-full sm:w-auto rounded-full py-3 px-7'>Get Video Reviewed</button>
    </div>
    </div>
  )
}

export default BrandsSlider;