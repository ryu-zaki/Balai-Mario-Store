import React from 'react'
import chevronRight from '../../assets/materials/chevron-right.png';
import kenzoIcon from '../../assets/icons/kenzo.jpg';
import style from '../style.module.css';
import { useMatchMedia } from '../../custom_hooks/useMatchMedia';
import { useLocation } from 'react-router';
import InfoListPreview from './InfoListPreview';
import { categoryBoxes, PageTable, userAccounts } from '../Registered Page/RegisteredPage';
import UserModal from './UserModal';

function HomePage() {

  const [activeName, setActiveName] = React.useState(false);
  const {pathname} = useLocation();

  React.useEffect(() => {
   
    const timeout = setTimeout(() => {
      setActiveName(true)
    }, 1000);
    
    return () => clearTimeout(timeout);

  }, [pathname]);

  const [userModalVisible, setUserModalVisible] = React.useState(false);

  return (
    <div>
      <div className='triangle orange z-20'></div>
      <div className='triangle orange z-20'></div>
      <div className='triangle orange z-20'></div>

      <div className='flex flex-col gap-20 mb-20 lg:flex-row xl:justify-between xl:gap-10 xl:pl-5 xl:mb-32'>
         <header className={`${style.home_header} flex flex-col gap-7 admin-page items-center text-center lg:items-start lg:text-left xl:gap-9 xl:w-auto`}>
            <span className='dark-shadow header-text text-xs text-lightOrange px-4 py-2 rounded-full xl:text-sm'>Admin Panel</span>
            <h1 className='text-3xl header-text font-semibold xs:text-4xl sm:text-5xl md:text-6xl lg:whitespace-nowrap lg:text-5xl lg:text-left xl:text-5xl 2xl:text-6xl'>Welcome back, 
              <div className={`${activeName && "active"} text-lightOrange overflow-hidden relative admin_name h-1/2`}>
                <p className='opacity-0'>Admin</p>

                <div className={`absolute transition-all duration-700 ease-in-out top-0 flex flex-col items-center w-full lg:items-start`}>
                  <p>Admin</p>
                  <p>Jhonwell</p>
                </div>
              </div>
              
            </h1>
            <p className='text-sm header-text sm:text-base'>Track your users behavior across your store. Manage your online shop including products, orders, and more.</p>
            
            <div className='header-text flex gap-2 items-center text-sm sm:text-base lg:text-xs xl:text-sm xl:gap-4 2xl:text-base'>
             <button className='bg-lightOrange text-pureWhite px-4 py-2 rounded-full xs:py-3 xs:px-5 sm:px-6'>Manage Users</button>
             <button className='border-lightOrange border text-lightOrange px-4 py-2 rounded-full xs:py-3 xs:px-5 sm:px-6'>Visit your Store</button>
            </div>
         </header>


         <div className={`${style.recent_order} darker-shadow p-3 rounded-lg xs:p-7 sm:rounded-2xl lg:max-w-96 lg:w-full xl:w-1/2 xl:mt-10`}>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold sm:text-2xl lg:text-base'>Recent Orders</h2>

            <div className='flex font-semibold text-xs items-center gap-1 sm:text-sm lg:text-xs'>
              <span>View More</span>
              <img className='w-4 lg:w-3' src={chevronRight} alt='' />
            </div>
          </div>

          <div className='grid mt-6 relative z-10  gap-2 grid-cols-2 sm:gap-5 md:mt-8 lg:mt-5 xl:gap-2'>
          
            {
              useMatchMedia('(min-width: 1280px)') ? (
                <>
                 <RecentOrderBox />
                 <RecentOrderBox />
                 <RecentOrderBox />
                 <RecentOrderBox />
                </>
              ) : (<>
                 <RecentOrderBox />
                 <RecentOrderBox />
              </>)
            }
            
          </div>
           
         </div>
      </div>


      {/* Registered Accounts */}
      <InfoListPreview 
        listName={"Registered Accounts"}
        categoryBoxes={categoryBoxes}
        items={userAccounts}
        totalList={200}

        modalVisible={userModalVisible}
        PageTable={PageTable}
        InfoModal={<UserModal setUserModalVisible={setUserModalVisible} />}
      />
    </div>
  )
}

const RecentOrderBox = () => {

  return (
    <div className='order-box border-lightGray border rounded-xl p-2 xs:p-3 sm:p-5 xl:p-3'>
      <div className='flex items-start justify-between'>
         <div>
           <span className='font-semibold text-gray lg:text-sm'>AM</span>
           <h3 className='text-2xl font-semibold sm:text-3xl lg:text-xl'>10:00</h3>
         </div>

         <img className='w-8 rounded-full xs:w-10 sm:w-16 lg:w-10 xl:w-8 2xl:w-12' src={kenzoIcon} alt='' />
      </div>
      
      <div className='flex flex-col gap-3 items-start text-sm mt-5 sm:text-base sm:flex-row sm:justify-between md:text-lg lg:text-xs lg:flex-col lg:mt-2 xl:text-sm'>
        <div>
          <h3 className='text-lightOrange font-semibold'>Reservation</h3>
          <span className='font-semibold lg:font-normal'>June 22, 2024</span>
        </div>

        <span className='text-xs bg-lightOrange py-1 px-3 rounded-full text-pureWhite sm:text-sm sm:px-4 xl:px-4'>₱200.00</span>
      </div>
    </div>
  )
}

export default HomePage
