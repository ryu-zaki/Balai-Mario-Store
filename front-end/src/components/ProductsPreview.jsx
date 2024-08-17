import React from 'react';
import starterCover from '../assets/products/crispy-kangkong.jpg';
import vegetarianCover from '../assets/products/vegemeat caldereta.jpg';
import chickenCover from '../assets/products/fried-chicken.jpg';
import { useLocation, useNavigate } from 'react-router';
import { scroller } from 'react-scroll';


const ProductsPreview = ({previewRef, previewSecActive}) => {

    return (
        <div className='preview-section flex flex-col gap-8 lg:gap-14 xl:gap-20'>
          <div className='flex flex-col items-center'>
            <span className='textZsm'>TASTE THE VALUE</span>
            <h2 className='title-font text-darkBrown responsive-title lg:mt-5'>Our Products</h2>
          </div>
          
          <div ref={previewRef} className={`${previewSecActive && 'active'} flex flex-col relative gap-4 preview-container mx-auto lg:flex-row xl:gap-8`}>
            <div className='absolute colored-decor w-32 h-32 lg:w-52 lg:h-52 bg-lightOrange -top-4 -z-10 rounded-2xl -left-4'></div>
            <ProductPreview 
              proNum={"01"} 
              ImgSrc={starterCover} 
              title={"STARTER"} 
              price={220} 
              message={"Kick off your dining experience with our delectable selection of starters. "}
            />

           <ProductPreview 
              proNum={"02"} 
              ImgSrc={vegetarianCover} 
              title={"VEGETARIAN"} 
              price={220} 
              message={"Savor the freshness of our curated vegetarian dishes, crafted to perfection with the finest ingredients."}
            />

           <ProductPreview 
              proNum={"03"} 
              ImgSrc={chickenCover} 
              title={"CHICKEN"} 
              price={220} 
              message={"Indulge in a variety of mouth-watering chicken dishes crafted to perfection. From classic favorites to gourmet creations."}
            />

            


          </div>

        </div>
    )
}

const ProductPreview = ({proNum, ImgSrc, title, price, message}) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/products/${title.toLowerCase()}`);

      setTimeout(() => {

        scroller.scrollTo("available-recipe");

      }, 0);
      
    }

    return (
        <section className='relative text-pureWhite product-preview overflow-hidden rounded-xl flex justify-center'>

            {/* Overlay */}
            <div className='preview-overlay absolute inset-0 w-full h-full bg-darkOverlay'></div>

            {/* Info and Image */}
            <img className='absolute object-cover -z-10 inset-0 w-full h-full' src={ImgSrc} alt='' />

            
            <h2 className='absolute m-0 proNum text-5xl top-4 title-font left-4 z-10 lg:text-6xl xl:top-6 xl:left-6'>{proNum}</h2>
                
            <div className='absolute desc bottom-0 right-0 z-10 flex flex-col  text-right items-end'>
                <p className='rounded-tl-xl relative right-0 bg-pureWhite text-xs p-2 pl-4 transition-all duration-700  font-semibold text-darkBrown lg:text-sm xl:pl-6 xl:p-3'>Starts at ₱
                  {price}.00</p>
                <h3 className='rounded-tl-xl bg-lightOrange m-0 transition-all duration-700  p-2 px-5 pl-20 text-sm lg:text-base xl:pl-20 xl:text-lg xl:py-3'>{title}</h3>
            </div>


            {/* Information */}
            <div className='info-box absolute top-full text-center translate-y-full flex flex-col gap-3 px-5'>
              <p className='text-sm lg:text-base xl:leading-7'>{message}</p>
              <button onClick={handleNavigate} className='cursor-pointer border-pureWhite border p-2 px-6 rounded-lg self-center font-semibold'>Take a Look</button>    
            </div>
        </section>
    )
}

export default ProductsPreview;