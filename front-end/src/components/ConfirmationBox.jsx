import React from 'react';
import userIcon from '../assets/icons/jhonwell.jpg'

const ConfirmationBox = ({icon, question, onContinue, setIsVisible}) => {
    
    const closeModal = () => {
        setIsVisible(false);
    };

    return (
        <>
          <div onClick={closeModal} className='z-50 fixed inset-0 h-full w-full bg-darkOverlay'></div>

          <div className='z-50 bg-pureWhite fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-80 min-h-60 rounded-xl flex flex-col items-center justify-center gap-5 px-5 sm:max-w-96'>

            {/* <div className='user-icon w-16 relative'>
              <img className='rounded-full w-full h-full' src={userIcon} alt='' />
            </div>  */}
            {
                icon
            }         

            <h2 className='text-lg font-semibold text-center'>{question}</h2>
            <div className='flex gap-5 text-sm'>
                <button onClick={onContinue} className='text-pureWhite bg-lightOrange py-2 px-6 rounded-lg'>Continue</button>
                <button onClick={closeModal} className='text-lightOrange border-lightOrange border rounded-lg py-1 px-6'>Cancel</button>
            </div>
          </div>
        </>
    )
}

export default ConfirmationBox;