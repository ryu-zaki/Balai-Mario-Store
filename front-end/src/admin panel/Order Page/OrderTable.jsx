import React from 'react'
import kenzoIcon from '../../assets/icons/kenzo.jpg';
import hourIcon from '../../assets/admin_panel/clock-dark.png';
import detailsIcon from '../../assets/materials/action-btn.png';
import clockOrange from '../../assets/admin_panel/clock-orange.png';

const RowData = ({setModalVisible}) => {  
 
  return (
    <div className='row_data relative h-fit flex items-center justify-between -translate-x-10 opacity-0 w-full bg-ash p-2 px-4 rounded-lg pt-3 sm:p-3 sm:px-7 lg:grid lg:grid-cols-6 lg:gap-3'>

      <div className='absolute flex items-center font-semibold gap-1 bg-lighterOrange text-lightOrange p-1 px-3 rounded-md top-0 -translate-y-1/2 right-5 text-xs lg:hidden'>
       <img className='w-5' src={clockOrange} alt="" />
       <span>1hr ago</span>
      </div>

      <div className='flex items-center gap-5 sm:gap-8 md:gap-5'>
        <div className='relative w-fit'>
            <img className='w-10 rounded-full sm:w-14 md:w-10' src={kenzoIcon} alt='' />
            <div className='w-3 aspect-1 absolute bottom-0 right-0 rounded-full bg-green sm:bottom-1 sm:right-1 md:bottom-0 lg:right-0 lg:bottom-0'></div>
        </div>
        <p className='sm:text-lg md:text-base lg:hidden'>Reservation</p>
      </div>
        
        <p className='hidden lg:block'>Reservation</p>

        <p className='hidden py-2 px-4 rounded-full font-semibold bg-lightGreen text-green w-fit text-sm lg:block'>Delivered</p>
        <div className='gap-1 items-center hidden lg:flex'>
          <img className='w-5' src={hourIcon} alt='' />
          <span>1hr ago</span>
        </div>
        <p className='hidden whitespace-nowrap lg:block'>Sun June 22, 2004</p>
        <div className='flex lg:justify-end lg:pr-2'>
          <img onClick={() => setModalVisible(true)} className='w-4 cursor-pointer sm:w-7 md:w-5' src={detailsIcon} alt='' />
        </div>
        
    </div>
  )
}

function OrderTable({list, setModalVisible}) {

  return (
    <div className='mt-10 grid min-h-96 grid-cols-1 gap-8 md:grid-cols-2 lg:flex lg:flex-col'>
       
       <div className='border h-fit border-lightGray rounded-lg font-semibold text-sm grid-cols-6 hidden py-4 px-7 lg:grid'>
         <span>User</span>
         <span>Order Type</span>
         <span>Status</span>
         <span>Time Passed</span>
         <span>Ordered Date</span>
         <span className='text-right'>Details</span>
       </div>

       {
        list.map((data, index) => {
          return <RowData setModalVisible={setModalVisible} data={data} key={index} />
        })
       }

    </div>
  )
}

export default OrderTable
