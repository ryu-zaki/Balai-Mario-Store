import React from 'react'
import homeIcon from '../assets/materials/home-white-24.png';
import { useMatchMedia } from '../custom_hooks/useMatchMedia';

const style = {
  minHeight: '87vh',
  width: '100%',
}

function PageNotFound() {

  const isLarge = useMatchMedia("(min-width: 970px)");

  return (
    <div style={style} className='flex justify-center not-found-page items-center flex-col gap-5 text-center lg:pb-16'>
      
      <lord-icon
         src="https://cdn.lordicon.com/usownftb.json"
         trigger="in"
         delay="500"
         state="in-reveal"
         stroke="bold"
         colors="primary:#222222,secondary:#c46e24"
         style={
          {width: isLarge ? "150px" : "100px", height: isLarge ? "150px" : "100px"}}>
      </lord-icon>

      <div className="w-11/12 max-w-80 sm:max-w-96 lg:max-w-full">
        <h1 className='text-3xl font-semibold sm:text-5xl overflow-hidden pb-1 lg:text-6xl xl:text-7xl'><span>Page Not Found</span></h1>
        <p className='text-sm mt-3 sm:text-base sm:mt-5 xl:mt-7'>Sorry, The page you're looking for doesn't exist or has been removed</p>
      </div>


      <button className='flex gap-2 items-center bg-lightOrange py-3 px-6 rounded-md text-pureWhite text-sm mt-5 sm:text-base'>
        <img className='w-6' src={homeIcon} alt="" />
        <span className='inline-block'>Back to home</span>
      </button>

      
    </div>
  )
}

export default PageNotFound
