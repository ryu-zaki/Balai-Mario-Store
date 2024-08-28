import React from 'react'
import { navigations } from './sources'
import logoutIcon from '../assets/materials/logout-dark-24.png';
import userDark from '../assets/materials/user-dark.png';
import calendarOrange from '../assets/admin_panel/calendar-orange.png';
import UserAvatar from '../components/UserAvatar';
import chevronDown from '../assets/materials/chevron-down.png';
import crossIcon from '../assets/materials/cross-icon.png';
import style from './style.module.css';
import { useNavigate } from 'react-router';

function SideNav({sideNavVisible, setSideNavVisible}) {

  const [activeNav, setActiveNav] = React.useState("Home");
  const navigate = useNavigate();
  const [viewMore, setViewMore] = React.useState(false);
  const sideNavRef = React.useRef(null);
  
  React.useEffect(() => {
    
    const navName = activeNav.toLocaleLowerCase();
    if (navName == "home") return navigate('/');

    navigate(`/${navName}`);

  }, [activeNav]);
  
  React.useEffect(() => {

    if (viewMore) {
      sideNavRef.current.scrollTop = sideNavRef.current.scrollHeight;
    }

  }, [viewMore, sideNavRef.current]);

  const handleViewMore = () => {
    setViewMore(prev => !prev);
  }

  return (
    <>
    {sideNavVisible && <div onClick={() => setSideNavVisible(false)} className=' fixed inset-0 z-10 xl:hidden'></div>}
    <div ref={sideNavRef} className={`${!sideNavVisible && "-translate-x-full xl:translate-x-0"} ${style.side_nav} delay-100 ease-outs transition-all duration-700 fixed inset-0 w-full h-full bg-pureWhite z-50 p-4 grid grid-cols-1 gap-10 overflow-y-auto xl:sticky xl:top-0 xl:h-screen xl:overflow-auto xl:px-0 xl:flex xl:flex-col xl:gap-14 xl:pr-5`}>

    <div className='flex justify-between items-start xl:mb-5 2xl:mb-0'>
      <div className='flex flex-col items-start gap-2'>
              <h2 className='text-lg font-semibold 2xl:text-xl'>Balai Mario</h2>
              <div className='flex gap-1 items-center font-semibold text-xs text-lightOrange'>
                  <div className='bg-lighterOrange rounded-full p-2'>
                    <img className='w-3' src={calendarOrange} alt="" />
                  </div>
                  <p>Sun August 13, 2024</p>
              </div>
        </div>
      
       <img onClick={() => setSideNavVisible(false)} className='w-7 xl:hidden' src={crossIcon} alt='' />
    </div>
      

      <nav className={`${style.navigation_con} flex flex-col relative`}>

        {
            navigations.map((data, index) => {
                return <NavButton 
                  setActiveNav={setActiveNav}
                  activeNav={activeNav} 
                  data={data} key={index} />
            })
        }

        <div className={`${style.anim_bg} h-12 rounded-xl bg-lighterGray transition-all duration-300 absolute left-0 w-4/5 2xl:h-12 2xl:w-11/12`}></div>

        <button className={`${style.view_more} flex px-4 py-3 items-center relative gap-2 font-semibold xl:hidden`}>
          <div onClick={handleViewMore} className='absolute inset-0 z-10'></div>
          <span>view more</span>
          <img className={`${viewMore && "-rotate-90"} transition-all duration-300`} src={chevronDown} alt='' />
        </button>

      </nav>

      <UserInfoBox />

         <div className={`${style.upper_line} relative ${!viewMore && "hidden xl:block"}`}>
         <OtherBtn navName={"Logout"} imgSrc={logoutIcon} />
         <OtherBtn navName={"Switch Account"} imgSrc={userDark} />
        </div>
      
    </div>
    </>
  )
}

const OtherBtn = ({navName, imgSrc}) => {

  return (
    <div className='px-4 py-3 flex items-center gap-5 xl:text-sm xl:cursor-pointer 2xl:text-base'>
      <img className='w-7 xl:w-5 2xl:w-7' src={imgSrc} alt='' />
      <p>{navName}</p>
    </div>
  )
}

const NavButton = ({data, setActiveNav, activeNav}) => {

    const {imgDark, imgGray, navName} = data;
    const [isHover, setIsHover] = React.useState(false);

    const  handleActiveNav = ({target}) => {
        setActiveNav(target.id);
    }
   
    return (
        <div className={`${style.navBtn} ${activeNav === navName && style.active} relative flex gap-5 z-10 items-center px-4 py-3 rounded-md 2xl:py-3`}>
          <div onMouseLeave={() => setIsHover(false)} onMouseOver={() => setIsHover(true)} id={navName} onClick={handleActiveNav} className='absolute inset-0 z-10 cursor-pointer'></div>

          <img className={`${style.imgAnim} ${activeNav === navName ? style.active : "inactive"} w-5`} src={activeNav === navName ? imgDark : imgGray} alt='' />

          <span className={`${activeNav === navName ? "text-dark font-semibold" : isHover ? "text-lightOrange" : "text-gray"} transition-all duration-200 inline-block text-base`}>{navName}</span>
        </div>
    )
}


const UserInfoBox = () => {

    return (
        <div className={`${style.userInfoBox} row-start-2 flex flex-col items-center gap-10 xl:row-start-auto xl:hidden xl:rounded-xl xl:mx-auto xl:p-5 xl:pt-14`}>
           
           <div className='xl:absolute xl:top-0 xl:-translate-y-1/2'>
           <UserAvatar size={80} email={"jhonwellespanola4gmail.com"} />
           </div>
           

           <div>
              <div className='flex text-center flex-col items-center gap-1'>
                <span className='text-lightOrange font-semibold xl:text-sm'>Store Admin</span>
                <h2 className='text-3xl font-semibold xl:text-lg'>Jhonwell Espanola</h2>
                <span className='xl:text-xs'>jhonwellespanola4@gmail.com</span>
              </div>

              <div className='hidden text-sm mt-5 flex-col gap-2 xl:flex'>
                <button className='flex items-center gap-1'>
                    <img className='w-5' src={logoutIcon} alt="" />
                    <span>Logout</span>
                </button>

                <button className='flex items-center gap-1'>
                    <img className='w-5' src={userDark} alt="" />
                    <span>Switch Account</span>
                </button>
              </div>
           </div>
        </div>
    )
}


export default SideNav
