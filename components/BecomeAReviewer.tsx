import React from 'react'
import { Button } from './ui'

function BecomeAReviewer() {
  return (
    <div className='w-[530px] text-white bg-[#4B49EB] flex flex-col justify-center items-center py-10 gap-4'>
       <h1 className='  font-extrabold text-2xl'>Boost conversion with video reviews</h1>
       <p> Are you a retailer wanting to display expeerly reviews for free?</p>
        <button className=' bg-white rounded-full px-10 py-4 font-bold text-black '>Become A Reviewer</button>
    </div>
  )
}

export default BecomeAReviewer