import React from 'react'
import emptyIcon from '../../assets/materials/not-found-100.png';

function EmptyMessage() {
  return (
    <div className='min-h-96 flex justify-center items-center'>
     <div className='text-gray'>
       <img className='mx-auto w-20 lg:w-auto' src={emptyIcon} alt="" />
       <h3 className='mt-2 text-base font-semibold lg:text-xl'>No Orders Found.</h3>
     </div>
    </div>
    
  )
}

export default EmptyMessage
