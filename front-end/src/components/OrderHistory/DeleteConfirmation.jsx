import React from 'react';
import warningIcon from '../../assets/materials/warning-icon-yellow.png';


const DeleteConfirmation = ({confirmVisible, setConfirmVisible, setEffectTrigger}) => {
    
    const deleteEvent = () => {
        setEffectTrigger(true);
        setConfirmVisible(false);
    }

    return (
        <>
          {!!confirmVisible && <div onClick={() => setConfirmVisible(false)} className='fixed z-40 inset-0 h-full w-full bg-imgOverlay'></div>}

          <div className={`${!confirmVisible && "scale-0 origin-top"} transition-all duration-500 fixed text-center flex justify-center items-center flex-col z-40 top-8 left-1/2 -translate-x-1/2  bg-pureWhite w-11/12 py-5 px-5 rounded-xl max-w-80 md:p-7 md:max-w-96`}>
             <img className='w-10 md:w-12' src={warningIcon} alt='' />
             <h2 className=" md:text-lg">Do your want to remove this history?</h2>
             <div className="flex gap-3 justify-center text-xs md:text-sm mt-4">
                <button onClick={deleteEvent} className='bg-red text-pureWhite py-2 rounded-md px-6'>Delete</button>
                
                <button onClick={() => setConfirmVisible(false)} className=" text-lightOrange border border-lightOrange py-2 px-6  rounded-md">Cancel</button>
             </div>
          </div>
        </>
    )
}

export default DeleteConfirmation;