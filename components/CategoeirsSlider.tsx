import React from 'react'
import CategorySlider from './Slider';

function CategoeirsSlider() {
  return (
    <div className=' max-w-[1170px] flex flex-col justify-center items-center  gap-4 py-20 px-5'>
       <h1 className='font-extrabold text-2xl '>Explore Categories</h1>
       <p className=' mb-10 w-[390px] text-center'>Whether you’d like to travel, find the perfect sofa or buy a new car, we’ve got you covered.</p>
       <CategorySlider />
       
    </div>
  )
}

export default CategoeirsSlider;