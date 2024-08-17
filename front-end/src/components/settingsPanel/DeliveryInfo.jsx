import React from 'react'
import googleMap from '../../assets/materials/google-map.png'
import { useCheckoutValidate } from '../../context/CheckoutValidate';
import { InputBox } from './Settings';

const DeliveryInfo = () => {
   
  const {orderInfo} = useCheckoutValidate();

  return (
    <div className='sm:flex sm:w-full sm:gap-5 lg:gap-7'>
       <div className='flex flex-col gap-5 sm:flex-grow sm:w-full'>
        {
            orderInfo.delivery.fields.filter((_, index) => index < 3)
            .map((data, index) => <InputBox data={data} key={index} />)
        }
       </div>

       <div className='mt-5 relative sm:flex-grow sm:mt-0 sm:w-full lg:flex lg:flex-col lg:gap-6'>
       <InputBox data={orderInfo.delivery.fields[2]} />

       <img className='info-card h-full min-w-full object-cover' src={googleMap} alt="" />
       </div>
    </div>
  )
}

export default DeliveryInfo
