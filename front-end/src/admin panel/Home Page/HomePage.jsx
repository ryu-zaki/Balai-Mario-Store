import React from 'react'
import chevronRight from '../../assets/materials/chevron-right.png';
import kenzoIcon from '../../assets/icons/kenzo.jpg';
import RegisteredPreview from './RegisteredPreview';

function HomePage() {

  return (
    <div>
      <div className='flex flex-col gap-20'>
         <header className='flex flex-col gap-7 items-center text-center'>
            <span className='dark-shadow text-xs text-lightOrange px-4 py-2 rounded-full'>Admin Panel</span>
            <h1 className='text-3xl font-semibold'>Welcome back, <br /> Jhonwell</h1>
            <p className='text-sm'>Track your users behavior across your store. Manage your online shop including products,    orders, and more.</p>
            
            <div className='flex gap-2 items-center text-sm'>
             <button className='bg-lightOrange text-pureWhite px-4 py-2 rounded-full'>Manage Users</button>
             <button className='border-lightOrange border text-lightOrange px-4 py-2 rounded-full'>Visit your Store</button>
            </div>
         </header>


         <div className='dark-shadow p-3 rounded-lg'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Recent Orders</h2>

            <div className='flex font-semibold text-xs items-center gap-1'>
              <span>View More</span>
              <img className='w-4' src={chevronRight} alt='' />
            </div>
          </div>

          <div className='grid mt-6 gap-2 grid-cols-2'>
            <RecentOrderBox />
            <RecentOrderBox />
            <RecentOrderBox />
            <RecentOrderBox />
          </div>
           
         </div>


         {/* Registered Accounts */}
         <RegisteredPreview />
      </div>
      
    </div>
  )
}

const RecentOrderBox = () => {

  return (
    <div className='border-lightGray border rounded-xl p-2'>
      <div className='flex items-start justify-between'>
         <div>
           <span className='font-semibold text-gray'>AM</span>
           <h3 className='text-2xl font-semibold'>10:00</h3>
         </div>

         <img className='w-8 rounded-full' src={kenzoIcon} alt='' />
      </div>
      
      <div className='flex flex-col gap-3 items-start text-sm mt-5'>
        <div>
          <h3 className='text-lightOrange font-semibold'>Reservation</h3>
          <span className='font-semibold'>June 22, 2024</span>
        </div>

        <span className='text-xs bg-lightOrange py-1 px-3 rounded-full text-pureWhite'>₱200.00</span>
      </div>
    </div>
  )
}

export default HomePage
