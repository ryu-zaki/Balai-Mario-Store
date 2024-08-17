import React from 'react'
import userIcon from '../../assets/icons/jhonwell.jpg';
import { useCheckoutValidate } from '../../context/CheckoutValidate';
import { InputBox } from './Settings';

const BasicInfo = () => {

  const {userInfo} = useCheckoutValidate();  
    
  return (
    <div className='sm:flex sm:w-full sm:gap-5 lg:gap-7'>
      <div className='flex flex-col gap-5 sm:flex-grow sm:w-full'>
        {
            userInfo.fields.filter((_, index) => index < 3)
            .map((data, index) => <InputBox data={data} key={index} />)
        }
      </div>

      <div className='mt-5 sm:flex-grow sm:mt-0 sm:w-full lg:flex lg:flex-col lg:gap-3'>
       <InputBox data={userInfo.fields[3]} />
       <div className='hidden info-card flex-col items-center dark-shadow lg:flex rounded-2xl h-full justify-center'>
        {/* Main Img */}
        <div className='aspect-1 mb-2 basic-main-img'>
            <img className='w-full aspect-1 rounded-full' src={userIcon} alt='' />
        </div>
        <div className='text-sm text-center mt-3'>
            <h2 className='font-semibold text-base'>Jhonwell Espanola</h2>
            <p>jhonwellespanola4@gmail.com</p>
        </div>


       </div>

      </div>
    </div>
  )
}

export default BasicInfo
