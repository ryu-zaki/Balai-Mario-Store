import React from 'react'
import kenzoIcon from '../../assets/icons/kenzo.jpg'
import detailsIcon from '../../assets/materials/action-btn.png';
import style from '../style.module.css';
import filterIcon from '../../assets/admin_panel/filter-dark.png';
import listIcon from '../../assets/admin_panel/list-dark.png';
import chevron from '../../assets/materials/chevron-left.png';
import {useLocation} from 'react-router';


function RegisteredPreview() {
    
  return (
    <div className={`${ style.upper_line } relative md:pt-5 lg:pt-7`}>
      <div className='flex flex-col gap-5 mt-2 md:flex-row md:items-start md:justify-between md:gap-10 xl:items-center'>
          <div>
             <h2 className='text-2xl font-semibold md:text-3xl xl:text-3xl'>Registered Accounts</h2>
             <div className='text-lightOrange text-sm font-semibold mt-5'>
              <span>Total of</span>&nbsp;&nbsp;
              <span className='bg-lighterOrange px-3 py-2 rounded-full'>200 active users</span>
             </div>
          </div>

          <div className='flex gap-2 md:gap-5'>
             <ControlButton imgSrc={filterIcon} label={"Filter"} />
             <ControlButton imgSrc={listIcon} label={"View More"} />
          </div>
          
      </div>
      
      
      <SliderButtons />
      <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1'>
        <div className='hidden lg:grid grid-cols-11 border-2 border-lightGray p-4 rounded-md font-semibold text-gray text-sm px-6'>
          <span className='col-span-3'>Name</span>
          <span className='col-span-3'>Email Account</span>
          <span className='text-center col-span-2'>Status</span>
          <span className='col-span-2'># of orders</span>
          <span>Details</span>
        </div>
        <RowData />
        <RowData />
        <RowData />
        <RowData />
        <RowData />
        <RowData />
      </div>
      <SliderButtons />
      


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
        <div className='relative flex text-sm items-center justify-between border rounded-lg p-2 border-lightGray gap-3 py-3 sm:px-5 sm:pr-8 lg:grid lg:grid-cols-11'>
            <div className='flex gap-3 items-center sm:gap-5 lg:col-span-3'>
                <div className='relative'>
                  <img className='w-10 rounded-full sm:w-14 md:w-10' src={kenzoIcon} alt='' />
                  <div className='w-3 aspect-1 absolute bottom-0 right-0 rounded-full bg-green sm:bottom-1 sm:right-1 lg:right-0 lg:bottom-0'></div>
                </div>
                <p className='text-base truncate sm:text-lg md:text-base'>kenzo Shenel Vidal</p>
            </div>

            <p className='hidden truncate font-semibold lg:inline-block lg:col-span-3'>kenzo_shenel09876@gmail.com</p>
            <span className='hidden col-span-2 mx-auto px-5 bg-lightGreen text-green rounded-full text-center py-1 font-semibold lg:inline-block'>Active</span>
            <span className='absolute text-xs py-1 px-2 rounded-md top-0 right-3 -translate-y-1/2 bg-lighterOrange text-lightOrange font-semibold sm:text-sm sm:px-4 lg:relative lg:translate-y-0 lg:bg-transparent lg:text-dark lg:whitespace-nowrap lg:col-span-2'>24 orders</span>
            <img className='w-5 sm:w-7 md:w-5' src={detailsIcon} alt='' />
        </div>
    )

}

const SliderButtons = () => {
  const {pathname} = useLocation();

  if (pathname == "/") return;

  return (
    <div className='flex w-full justify-between text-xs mt-10 items-center md:text-sm xl:mt:14'>
      <div className='flex gap-5'>

        <div className='flex items-center gap-2 border relative border-gray  rounded-md px-3 py-2'>
          <div className='absolute inset-0 cursor-pointer'></div>
          <img width={15} src={chevron} alt='' />
          <p>Previous</p>
        </div>

        <div className='flex items-center gap-2 border-gray border relative rounded-md px-3 py-2'>
          <div className='absolute inset-0 cursor-pointer'></div>
          <p>Next</p>
          <img width={15} className='-rotate-180' src={chevron} alt='' />
        </div>
      </div>


      <p className='font-semibold'>1 of 10</p>
    </div>
  )
}

export default RegisteredPreview
