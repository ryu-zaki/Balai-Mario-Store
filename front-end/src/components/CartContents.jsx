import React from 'react';
import chevronLeft from '../assets/materials/chevron-left.png';
import deleteIcon from '../assets/materials/delete-icon.png';
import { useNavigate } from 'react-router';
import { useCart } from '../context/UserCartContext';
import { useUserinfo } from '../context/UserInfo';

const CartContents = ({allCartDishVisible, setAllCartDishVisible}) => {

    const navigate = useNavigate();
    const {totalProducts, handleDeleteProCart} = useCart();   
    const {userGeneralInfo} = useUserinfo();
    const {cartProducts} = userGeneralInfo;

    return !!cartProducts.length && (
        <>
          <div onClick={() => setAllCartDishVisible(false)} className={`${!allCartDishVisible && "hidden"} fixed z-40 inset-0 bg-darkOverlay`}></div>

          <div className={`${!allCartDishVisible && "scale-0"} all-cart-dish p-5 transition-all duration-1000 rounded-xl bg-pureWhite w-11/12 z-40 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 xs:p-7 xs:w-96 md:px-10`}>
            <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold xs:text-3xl'>Your Dish</h2>
            <p className='text-sm font-semibold text-lightOrange'>({totalProducts} recipes)</p>

            </div>
            

            <div className='my-5 overflow-auto dishes-container md:pr-10'>
                    
                   {
                     cartProducts
                     .filter((_, index) => index < 8)
                     .map((data, index) => <IndividualDish 
                     handleDeleteProCart={handleDeleteProCart}
                     key={index} data={data} />)
                   }
            </div>

         <div className="md:flex justify-between w-full">
           <div className='flex justify-between text-xs xs:text-sm xs:mt-8 md:gap-10'>
                <div className='flex items-center relative gap-1'>
                    <div onClick={() => setAllCartDishVisible(false)} className='cursor-pointer absolute inset-0 z-10'></div>
                    <img className='w-4' src={chevronLeft} alt='' />
                    <span>continue browsing</span>
                </div>

                <div className='flex gap-2 items-start font-semibold'>
                    <h3>Total</h3>
                    <span className='text-lg text-lightOrange md:text-xl'>&#8369;{
                         cartProducts
                         .map(({price, quantity, isWhole}) => (!!price.whole ? price[isWhole ? "whole" : "half"] : price) * quantity)
                         .reduce((total, price) => total + price)
                         .toFixed(2)
                        }</span>
                </div>
            </div>

            <button onClick={() => navigate('/checkout')} className='rounded-lg w-11/12 mx-auto block py-3 mt-5 text-pureWhite text-xs bg-lightOrange xs:py-4 md:w-fit md:mx-0 md:px-14'>CHECKOUT</button>
        </div>
            

          </div>
        </>
    )
}

const IndividualDish = ({data, handleDeleteProCart}) => {

    const {recipeName, price, category, image, quantity, isWhole, _id} = data;

    const [isLoading, setIsLoading] = React.useState(false);

    const deleteEvent = () => {
      handleDeleteProCart( _id, setIsLoading)
    }

    return (
        <div className='flex gap-4 justify-between inv-cart-dish items-center text-xs my-4 w-full xxs:text-sm xs:gap-6 md:my-6 md:gap-10'>
            <div className='w-full flex items-start gap-2 xxs:gap-4 md:gap-7'>
              <img draggable={false} className='object-cover w-14 aspect-1 rounded-lg xs:w-16 md:w-20' src={image} alt="" />
              <div className='w-full'>
                <span className='text-gray font-bold uppercase'>{category}</span>
                <h3 className='font-bold w-11/12 capitalize max-w-32 md:max-w-60 truncate xs:text-base md:text-xl'>{recipeName}</h3>
                <p className='text-lightOrange font-bold'>&#8369;{(!!price.whole ? price[isWhole ? "whole" : "half"]  : price).toFixed(2)}</p>
              </div>
            </div>

            <p className='text-lightOrange font-semibold xs:text-base md:text-xl'>x{quantity}</p>

            {
              isLoading ? (
               <l-line-spinner
                  size="20"
                  stroke="3"
                  speed="1"
                  color="black" 
               ></l-line-spinner>
              ) : (
               <img id={recipeName} onClick={deleteEvent} className='select-none w-4 xs:w-6 cursor-pointer' draggable={false} src={deleteIcon} alt="" />
              )
            }
           
        </div>
    )
}

export default CartContents;