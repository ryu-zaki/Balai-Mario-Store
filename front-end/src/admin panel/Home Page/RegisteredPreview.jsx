import React from 'react'
import kenzoIcon from '../../assets/icons/kenzo.jpg'
import detailsIcon from '../../assets/materials/action-btn.png';
import style from '../style.module.css';
import filterIcon from '../../assets/admin_panel/filter-dark.png';
import listIcon from '../../assets/admin_panel/list-dark.png';


function RegisteredPreview() {
    
  return (
    <div className={`${ style.upper_line } relative`}>
      <div className='flex flex-col gap-5 mt-2'>
          <div>
             <h2 className='text-2xl font-semibold'>Registered Accounts</h2>
             <div className='text-lightOrange text-sm font-semibold mt-5'>
              <span>Total of</span>&nbsp;&nbsp;
              <span className='bg-lighterOrange px-3 py-2 rounded-full'>200 active users</span>
             </div>
          </div>

          <div className='flex gap-2'>
             <ControlButton imgSrc={filterIcon} label={"Filter"} />
             <ControlButton imgSrc={listIcon} label={"View More"} />
          </div>
          
      </div>
      
      

      <div className='flex mt-10 flex-col gap-8'>
        <div className='hidden'>
          <span>Name</span>
          <span>Email Account</span>
          <span>Status</span>
          <span># of orders</span>
          <span>Details</span>
        </div>
        <RowData />
        <RowData />
        <RowData />
        <RowData />
        <RowData />
        <RowData />
      </div>
      


    </div>
  )
}

const ControlButton = ({imgSrc, label}) => {

  return (
    <button className='border border-lightGray p-2 rounded-full'>
      <img className='w-6' src={imgSrc} alt="" />
      <span className='hidden'>{label}</span>
    </button>
  )
}


const RowData = () => {

    return (
        <div className='relative flex text-sm items-center justify-between border rounded-lg p-2 border-lightGray gap-3 py-3'>
            <div>
                <div className='relative'>
                  <img className='w-10 rounded-full' src={kenzoIcon} alt='' />
                  <div className='w-3 aspect-1 absolute bottom-0 right-0 rounded-full bg-green'></div>
                </div>
                <p className='hidden'>kenzo Shenel Vidal</p>
            </div>

            <p className='truncate font-semibold'>kescscscscnzo_shenel09876@gmail.com</p>
            <span className='hidden'>Active</span>
            <span className='absolute text-xs py-1 px-2 rounded-md top-0 right-3 -translate-y-1/2 bg-lighterOrange text-lightOrange font-semibold'>24 orders</span>
            <img className='w-5' src={detailsIcon} alt='' />
        </div>
    )

}

export default RegisteredPreview
