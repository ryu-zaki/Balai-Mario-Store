import React from 'react'
import { navigations } from './sources'
import logoutIcon from '../assets/materials/logout-dark-24.png';
import userDark from '../assets/materials/user-dark.png';
import calendarOrange from '../assets/admin_panel/calendar-orange.png';
import UserAvatar from '../components/UserAvatar';
import chevronDown from '../assets/materials/chevron-down.png';
import crossIcon from '../assets/materials/cross-icon.png';

import style from './style.module.css';

function SideNav({sideNavVisible, setSideNavVisible}) {

  const [activeNav, setActiveNav] = React.useState("Home");
  const [viewMore, setViewMore] = React.useState(false);
  const sideNavRef = React.useRef(null);
  

  
  React.useEffect(() => {

    if (viewMore) {
      sideNavRef.current.scrollTop = sideNavRef.current.scrollHeight;
    }

  }, [viewMore, sideNavRef.current]);

  const handleViewMore = () => {
    setViewMore(prev => !prev);
  }

  return (
    <div ref={sideNavRef} className={`${!sideNavVisible && "-translate-x-full"} delay-100 ease-outs transition-all duration-700 fixed inset-0 w-full h-full bg-pureWhite z-50 p-4 grid grid-cols-1 gap-10 overflow-y-auto`}>

    <div className='flex justify-between items-start'>
      <div className='flex flex-col items-start gap-2'>
              <h2 className='text-lg font-semibold'>Balai Mario</h2>
              <div className='flex gap-1 items-center font-semibold text-xs text-lightOrange'>
                  <div className='bg-lighterOrange rounded-full p-2'>
                    <img className='w-3' src={calendarOrange} alt="" />
                  </div>
                  <p>Sun August 13, 2024</p>
              </div>
        </div>
      
       <img onClick={() => setSideNavVisible(false)} className='w-7' src={crossIcon} alt='' />
    </div>
      

      <nav className='flex flex-col relative'>
        
        <div className={`h-12 rounded-xl bg-lighterGray absolute left-0 w-4/5`}></div>

        {
            navigations.map((data, index) => {
                return <NavButton 
                  setActiveNav={setActiveNav}
                  activeNav={activeNav} 
                  data={data} key={index} />
            })
        }

        <button className={`${style.view_more} flex px-4 py-3 items-center relative gap-2 font-semibold`}>
          <div onClick={handleViewMore} className='absolute inset-0 z-10'></div>
          <span>view more</span>
          <img className={`${viewMore && "-rotate-90"} transition-all duration-300`} src={chevronDown} alt='' />
        </button>

      </nav>

      <UserInfoBox />

      {
         viewMore && 
         <div className={`${style.upper_line} relative`}> 
         <OtherBtn navName={"Logout"} imgSrc={logoutIcon} />
         <OtherBtn navName={"Switch Account"} imgSrc={userDark} />
        </div>
      }
      
    </div>
  )
}

const OtherBtn = ({navName, imgSrc}) => {

  return (
    <div className='px-4 py-3 flex items-center gap-5'>
      <img className='w-7' src={imgSrc} alt='' />
      <p>{navName}</p>
    </div>
  )
}

const NavButton = ({data, setActiveNav, activeNav}) => {

    const {imgDark, imgGray, navName} = data;

    const  handleActiveNav = ({target}) => {
        setActiveNav(target.id)
    }
 
    return (
        <div className='relative flex gap-5 items-center px-4 py-3 rounded-md'>
          <div id={navName} onClick={handleActiveNav} className='absolute inset-0 z-10 cursor-pointer'></div>
          <img className='w-7' src={activeNav === navName ? imgDark : imgGray} alt='' />

          <span className={activeNav === navName ? "text-dark" : "text-gray"}>{navName}</span>
        </div>
    )
}


const UserInfoBox = () => {

    return (
        <div className='row-start-2 flex flex-col items-center gap-10'>
           
           <UserAvatar size={80} email={"jhonwellespanola4gmail.com"} />

           <div>
              <div className='flex text-center flex-col items-center gap-1'>
                <span className='text-lightOrange font-semibold'>Store Admin</span>
                <h2 className='text-3xl font-semibold'>Jhonwell Espanola</h2>
                <span className='text'>jhonwellespanola4@gmail.com</span>
              </div>

              <div className='hidden'>
                <button>
                    <img src={logoutIcon} alt="" />
                    <span>Logout</span>
                </button>

                <button>
                    <img src={userDark} alt="" />
                    <span>Switch Account</span>
                </button>
              </div>
           </div>
        </div>
    )
}


export default SideNav
