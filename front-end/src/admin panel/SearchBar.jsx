import React from 'react';
import sunIcon from '../assets/admin_panel/sun-dark.png';
import moonIcon from '../assets/admin_panel/moon-dark.png';
import notifIcon from '../assets/admin_panel/notif-dark.png';
import messageIcon from '../assets/admin_panel/notif-message.png'; 
import searchIcon from '../assets/admin_panel/search-dark.png';
import style from './style.module.css';

function SearchBar() {

  const [isDarkActive, setIsDarkActive] = React.useState(false);
  
  return (
    <div className='flex items-center sticky top-4 z-40 justify-between mb-6 xl:gap-20 2xl:gap-28'>

        {/* Search Icon */}
        <div className='border rounded-full p-3 xl:hidden'>
          <img className='w-5' src={searchIcon} alt='' />
        </div>

        {/* Search Bar */}
        <div className='hidden gap-2 border bg-pureWhite rounded-full p-3 items-center flex-grow xl:flex'>
            <img className='w-5' src={searchIcon} />
            <input className='border-0 outline-0 w-full' placeholder='Search for users, proucts, and docs.' />
        </div>
     
        {/* Avatar Buttons */}
        <div className='flex gap-4 items-center justify-between sm:gap-6'>
           <div className={`${style.switch_button} flex bg-pureWhite cursor-pointer relative items-center gap-2 rounded-full border px-1 py-1`}>
               <div className={`${style.switch_ball} ${isDarkActive && style.active} transition-all duration-500 ease-in-out bg-lightOrange absolute rounded-full w-5 aspect-1`}></div>
               <div onClick={() => setIsDarkActive(prev => !prev)} className='absolute inset-0 z-10'></div>

               <img className={`${isDarkActive && style.active} z-10 w-5`} src={moonIcon} alt="" />
               <img className={`${!isDarkActive && style.active} z-10 w-5`} src={sunIcon} alt="" />
           </div>

           <NotifButton quantity={10} imgSrc={notifIcon} />
           <NotifButton quantity={10} imgSrc={messageIcon} />
        </div>
    </div>
  )
}

const NotifButton = ({quantity, imgSrc}) => {

    return (
      <div className='relative border cursor-pointer rounded-full p-1 bg-pureWhite'>
        {/* quantity */}
        <span className='absolute -top-3 -right-3 text-xs bg-lighterOrange text-lightOrange p-1 px-2 rounded-full'>{quantity}</span>
        <img className='w-7 p-1' src={imgSrc} alt='' />
      </div>
    )
}

export default SearchBar

