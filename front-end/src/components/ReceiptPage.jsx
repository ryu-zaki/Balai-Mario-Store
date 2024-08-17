import React from 'react';
import receiptImg from '../assets/business_assets/receipt-img.jpg';
import { useNavigate, useParams } from 'react-router';
import { useCheckoutValidate } from '../context/CheckoutValidate';
import { useCart } from '../context/UserCartContext';


const ReceiptPage = ({setIsFinish}) => {
    const navigate = useNavigate();
    const {mode} = useParams();
    const {clearAllProducts} = useCart();
    const {userInfo, clearAllFields} = useCheckoutValidate();

    const handleContinue = () => {
        setIsFinish(false);

        navigate('/');
        
        if (mode !== "single-dish")
        clearAllProducts();
    }
   
    return (
        <div className='w-full h-screen text-darkBrown flex justify-center items-center'>
            <div className='receipt-card xxs:w-80 relative flex items-center justify-end'>
                {/* Image */}
                <section className='absolute w-1/2 my-auto h-5/6 overflow-hidden rounded-3xl left-0 -z-10 hidden lg:block'>
                  <div className='absolute inset-0 h-full w-full z-10 bg-imgOverlay'></div>
                  <img className='absolute inset-0 h-full w-full object-cover' src={receiptImg} alt='' />
                    
                </section>

                {/* Text Section */}
                <section className='bg-pureWhite rounded-3xl flex flex-col gap-7 text-sm dark-shadow px-4 py-10 sm:px-7 sm:gap-12 sm:text-base lg:px-10 lg:py-14'>

                    <h1 className='text-xl font-semibold text-center sm:text-2xl lg:text-3xl'>Thankyou For Your <br /> Reservation!</h1>

                    <div className='flex flex-col gap-4 border-b border-gray pb-5 sm:border-b-2 lg:text-lg lg:gap-6'>
                        <p>Hello, {userInfo.fields[0].value}</p>
                        <p>Thank you for your order, your order will be process. You will receive an email confirmation shortly. Thank you!</p>
                    </div>

                    <h2 className='font-semibold lg:text-lg'>Date of Order: <span className='text-lightOrange'>{new Date().toDateString()}</span></h2>

                    <button onClick={handleContinue} className='self-center bg-lightOrange text-pureWhite w-1/2 py-2 rounded-md lg:py-3 lg:w-4/5'>CONTINUE</button>

                </section>

            </div>
        </div>
    )
}

export default ReceiptPage;