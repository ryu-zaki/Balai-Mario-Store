import React from 'react';
import sampleProduct from '../../assets/products/bulalo sinigang.jpg';
import deleteIcon from '../../assets/materials/delete-icon-20-white.png';
import clockIcon from '../../assets/materials/clock-icon-gray.png';
import heartIcon from  '../../assets/materials/heart-fill.png';
import rightArrow from '../../assets/materials/right-arrow.png';
import style from './style.module.css';

const DetailsModal = ({modalData, modalVisible, setModalVisible}) => {
    
    return (
        <>
        {modalVisible && <div onClick={() => setModalVisible(false)} className="fixed z-40 inset-0 bg-imgOverlay h-full w-full"></div>} 
        <div className={`${style.order_modal} ${!modalVisible && "scale-0"} transition-all duration-700 delay-100 origin-bottom-left flex flex-col gap-7 fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pureWhite w-11/12 p-4 rounded-2xl xxs:p-6 xs:w-96 lg:p-8 lg:gap-10`}>

           <div  className='cursor-pointer absolute top-3 right-3 border-2 p-2 border-darkBrown rounded-full rotate-90 lg:top-4 lg:right-4'>

            <div onClick={() => setModalVisible(false)} className='absolute inset-0 z-10'></div>
            <img className='w-5 rotate-45' src={rightArrow} alt="" />
           </div> 

            <div className="flex flex-col gap-5 lg:gap-7">
                <h2 className="text-xl font-semibold xxs:text-2xl lg:text-3xl">Ordered Dish{!!modalData?.products_arr?.length ? "es" : ""}</h2>
                <div className='flex gap-2 items-center text-xs lg:text-sm'>
                    <span className='bg-lightOrange capitalize text-pureWhite py-1 px-4 rounded-md sm:py-2 sm:px-6'>{modalData?.info?.paymentMethod}</span>
                    <span className='text-lightOrange py-1 px-4 rounded-md border border-lightOrange sm:py-2 sm:px-6'>{new Date(modalData?.info?.orderedDate).toUTCString().split(" ").slice(0, 4).join(" ")}</span>
                </div>
            </div>

            {
                !!modalData?.products_arr?.length ? (
            <div className="h-60 overflow-y-auto flex flex-col gap-5 pr-5 xxs:gap-7 lg:h-72 lg:pr-8">
    
              {
                modalData.products_arr.map((data, index) => {
                    return <IndividualDish data={data} key={index} />
                })
              }
            </div>  
                ) : <SingleOrderModal modalData={modalData} />
            }
            

            <div className='flex justify-between text-sm lg:text-sm'>
                <button className='bg-red flex gap-1 text-pureWhite py-2 px-5 rounded-md'>
                    <img className='w-5' src={deleteIcon} alt="" />
                    <span>Delete</span>
                </button>

                <div className='flex gap-2 items-center text-gray xxs:font-semibold'>
                    <img className='w-5 xxs:w-6' src={clockIcon} alt='' /> 
                    <span>15mins ago</span>
                </div>
            </div>
        </div>
        </>
    )
}


const IndividualDish = ({data}) => {
    
    const {recipeName, price, quantity, image, isWhole} = data;
    console.log(data);
    return (
        <div className="flex justify-between w-full items-center">
            <div className='flex gap-3 lg:gap-5'>
              <img draggable={false} className='object-cover w-12 aspect-1 rounded-lg xxs:w-14 lg:w-20 lg:rounded-xl ' src={image} alt='' /> 

               <div className='text-xs xxs:text-sm lg:text-base'>
                   <h3 className='font-bold capitalize mb-1 w-36 truncate xs:w-52 lg:text-xl'>{recipeName}</h3>
                   <div className="flex gap-4">
                   <span className='text-lightOrange font-semibold'>&#8369;{isNaN(price) ? (price[isWhole ? "whole" : "half"]) : price.toFixed(2)}</span>
                   {
                    isNaN(price) && (
                        <span className='block w-fit px-4 py-1 rounded-full bg-brown text-pureWhite text-xs'>{isWhole ? "whole" : "half"}</span>
                    )
                   }
                   </div>
                   
               </div>
            </div>

            <h3 className="font-bold xxs:text-lg lg:text-2xl">x{quantity}</h3>
            
        </div>
    )
}

const SingleOrderModal = ({modalData}) => {
   
    const {product} = modalData;
    const {recipeName, image, price, limit, quantity, category, isWhole} = product;

    return (
        <div className="flex relative flex-col gap-2 text-sm">
        <span className="absolute top-0 right-4 -translate-y-1/2 py-2 px-5 text-xs text-pureWhite bg-brown rounded-full border border-pureWhite lg:text-sm">whole</span>
        <img className='w-full h-40 object-cover rounded-xl mx-auto lg:h-52' src={image} alt="" />
        <div className='flex justify-between text-lg font-semibold mt-1 lg:text-2xl'>
            <h3 className='capitalize'>{recipeName}<span className='text-lightOrange'>({isNaN(limit) ? limit[isWhole ? "whole" : "half"] : limit})</span></h3>
            <span>x{quantity}</span>
        </div>
        
        <div className="flex mt-2 justify-between text-lightOrange items-center lg:text-base lg:mt-2">
            <p className='dark-shadow py-2 px-5 rounded-full text-sm'>₱{isNaN(price) ? price[isWhole ? "whole" : "half"].toFixed(2) : price.toFixed(2)}</p>
            <p className='font-semibold uppercase'>{category}</p>
        </div>
    </div>
    )
}

export default DetailsModal;