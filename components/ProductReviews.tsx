import React from 'react'
import ProductReviewsCard from './ProductReviewscard'
import {Button} from "@nextui-org/button";

function ProductReviews() {
  return (
    <div className="w-full max-w-4xl  ">
      <h1 className=' font-extrabold text-2xl w-full sm:text-start text-center  md:w-2/5 mb-5'>Each Expeerly reviewer has a personal story to share </h1>
      <ProductReviewsCard/>
      <ProductReviewsCard/>
      <div className='px-[18px]'>
      <Button color="danger" radius='full' className=' bg-pink-500 sm:w-[300px] w-full font-bold  mt-10 text-white ' >
      Explore All Reviewers
      </Button>
      </div>
  </div>
  )
}

export default ProductReviews