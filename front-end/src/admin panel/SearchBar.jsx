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
    <div className='flex items-center justify-between mb-6'>

        {/* Search Icon */}
        <div className='border rounded-full p-3'>
          <img className='w-5' src={searchIcon} alt='' />
        </div>

        {/* Search Bar */}
        <div className='hidden'>
            <img src="" alt="" />
            <input placeholder='Search for users, proucts, and docs.' />
        </div>
     
        {/* Avatar Buttons */}
        <div className='flex gap-4 items-center justify-between'>
           <div className={`${style.switch_button} flex relative items-center gap-2 rounded-full border px-1 py-1`}>
               <div className={`${style.switch_ball} ${isDarkActive && style.active} transition-all duration-500 ease-in-out bg-lightOrange absolute rounded-full w-7 aspect-1`}></div>
               <div onClick={() => setIsDarkActive(prev => !prev)} className='absolute inset-0 z-10'></div>

               <img className={`${isDarkActive && style.active} w-7`} src={moonIcon} alt="" />
               <img className={`${!isDarkActive && style.active} w-7`} src={sunIcon} alt="" />
           </div>

           <NotifButton quantity={10} imgSrc={notifIcon} />
           <NotifButton quantity={10} imgSrc={messageIcon} />
        </div>
    </div>
  )
}

const NotifButton = ({quantity, imgSrc}) => {

    return (
      <div className='relative border rounded-full p-1'>
        {/* quantity */}
        <span className='absolute -top-3 -right-3 text-xs bg-lighterOrange text-lightOrange p-1 px-2 rounded-full'>{quantity}</span>
        <img className='w-7 p-1' src={imgSrc} alt='' />
      </div>
    )
}

export default SearchBar

