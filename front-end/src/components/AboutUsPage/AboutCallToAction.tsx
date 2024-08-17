import React from 'react'
import rightArrow from '../../assets/materials/right-arrow.png';

function AboutCallToAction() {
  return (
    <div className='relative dark-shadow px-10 py-8 rounded-xl flex flex-col gap-2 items-center text-center sm:py-14 sm:gap-6 xl:w-4/5 xl:mx-auto'>

       {/* Background elements */}
       <div className='absolute top-3 left-8 w-2 aspect-1 bg-lightOrange rotate-45 sm:w-5 sm:top-5 lg:left-28 lg:top-10 lg:w-7'></div>
       <div className='absolute top-5 right-20 w-2 aspect-1 bg-lightOrange rotate-12 sm:w-3 md:right-32 lg:right-60 lg:top-10 lg:w-4'></div>
       <div className='absolute bottom-8 right-5 w-2 aspect-1 bg-lightOrange rotate-12 sm:w-5'></div>
       <div className='absolute bottom-8 left-5 w-2 aspect-1 bg-lightOrange rotate-12 sm:w-3 lg:left-12 lg:bottom-10 lg:w-4'></div>

      <h2 className='text-lg font-bold xs:text-xl sm:text-3xl sm:px-10 md:px-0 md:w-1/2 lg:text-4xl'>Let's Discuss Your Events and Celebration</h2>
      <button className='text-lightOrange text-sm flex gap-2 items-center sm:text-base sm:font-semibold'>
        <span>Apply for meeting</span>
        <img className='w-7' src={rightArrow} alt='' />
      </button>
    </div>
  )
}

export default AboutCallToAction
