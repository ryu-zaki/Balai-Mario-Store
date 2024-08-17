import React from 'react';
import errIcon from '../assets/materials/error-icon.png'
import successIcon from '../assets/materials/success-icon.png';

const ErrorMessageBox = ({trigger, message, category, subMsg}) => {

    return (
        <>
          {
            trigger && <div className='z-50 fixed inset-0 bg-darkOverlay w-full h-full'></div>
          }

          <div className={`${!trigger && "scale-0 origin-top"} transition-all duration-700 z-50 bg-pureWhite fixed top-16 left-1/2 -translate-x-1/2 rounded-xl w-11/12 flex flex-col px-6 items-center py-7 gap-5 xxs:w-80 lg:w-96`}>

            <img className={`${!trigger && "translate-y-7 opacity-0" } transition-all duration-700 delay-300`} src={category === "Error" ? errIcon : successIcon} alt='' />

            <div className='text-center'>
                <h2 className={`${!trigger && "translate-y-7 opacity-0"} text-base ${category === "Error" ? "text-red" : "text-green"} transition-all duration-700 font-semibold mb-2 delay-500 capitalize sm:text-xl`}>{message}</h2>
                <p className={`${!trigger && "translate-y-7 opacity-0"} text-xs delay-700 transition-all duration-700 font-semibold text-dark sm:text-sm sm:font-normal`}>{subMsg}</p>
            </div>

          </div>
        </>
    )
}

export default ErrorMessageBox;