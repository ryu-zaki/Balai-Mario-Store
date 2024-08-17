import React from 'react'

function LoadingPage() {
  return (
    <>
      <div className="z-50 fixed backdrop-blur-sm inset-0 bg-darkOverlay flex flex-col gap-2 h-full w-full items-center justify-center text-pureWhite font-semibold text-xl lg:text-2xl">
       
       <h2>Please wait...</h2>


        <l-zoomies
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.4"
          color="white" 
        ></l-zoomies>
      </div>
    </>
  )
}

export default LoadingPage
