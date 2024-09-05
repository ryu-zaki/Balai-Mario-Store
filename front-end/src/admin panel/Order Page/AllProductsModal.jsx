import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import businessLogo from '../../assets/business_assets/balai-mario-logo.jpg'
import style from './style.module.css';
import crossIcon from '../../assets/materials/cross-icon.png';
import gsap from 'gsap';

function AllProductsModal({setViewProducts, orderedProducts}) {

  
  React.useEffect(() => {

    gsap.to('.product-card', {
      delay: .6,
      duration: .6,
      stagger: .2,
      opacity: 1,
      ease: 'bounce.out',
      translateY: 0
    })

  }, []);

  return (
    <div className={`${style.products_card} ${style["order_modal"]}  bg-pureWhite fixed pt-7 top-1/2 left-1/2 z-50 w-11/12 min-h-96 p-5 rounded-xl overflow-hidden md:p-10`}>
    
    <div onClick={() => setViewProducts(false)} className='absolute p-1 cursor-pointer rounded-full top-3 bg-lightGray right-3'>
     <img className='w-3 md:w-4' src={crossIcon} alt="" />
    </div>
     
     {/* Contents */}
     <div>
       <div className={`${style["bottom_line"]} relative pb-5 flex items-end gap-4 justify-between`}>
         <div data-headings>
            <h2 className='text-lg font-semibold md:text-2xl'>Ordered Recipes</h2>
            <p className='text-xs font-semibold text-lightOrange'>Total of 10 recipes</p>
         </div>

         <div data-category className='text-xs'>
            <span className='hidden md:inline-block'>Total Price</span>
            <p className='text-lightOrange mt-1 bg-lighterOrange rounded-full px-4 py-1'>&#8369;2000.00</p>
         </div>
       </div>   
       
       {/* Products Section */}
       <div data-products className='grid grid-cols-2 h-80 overflow-auto gap-2 mt-5 md:gap-4 md:pr-5'>
          {
            orderedProducts.map((data, index) => {
              return <ProductBox data={data} index={index} />
            })
          }
       </div>

     </div>

    </div>
  )
}


const ProductBox = ({data}) => {

    const {imgSrc, productName, category, quantity, price, limit} = data;

    return (
        <section className='product-card text-sm border-2 p-2 border-lightGray opacity-0 translate-y-10 rounded-xl md:p-4 md:rounded-2xl'>
            <div className='relative w-full aspect-video overflow-hidden rounded-md mb-1 md:rounded-xl'>
                <img className='object-cover w-full h-full' src={imgSrc} alt='' />
                <img className='w-5 z-20 rounded-full absolute top-3 right-3 xs:w-7 md:w-10' src={businessLogo} alt='' />
                <div className='absolute inset-0 z-10 bg-imgOverlay'></div>
            </div>

            <div className='flex flex-col xs:gap-2 md:gap-4 md:mt-4'>
                <div>
                    <h3 className="font-semibold md:whitespace-nowrap md:text-base">{productName} ({limit})</h3>
                    
                </div>
               
               <div className='flex flex-col gap-2 md:flex-row md:justify-between md:gap-5 md:items-center'>

                <p className='text-lightOrange text-xs xs:mt-1 md:text-sm'>{category}</p>

                <div className='flex gap-3 items-end text-lightOrange text-xs xs:justify-between xs:text-sm md:text-base'>
                    <p className='bg-lighterOrange py-1 px-4 rounded-full xs:px-6'>&#8369;{price}</p>
                    <p className='xs:font-semibold'>x{quantity}</p>
                </div>

                </div>
            </div>
        </section>
    )
}

export default AllProductsModal
