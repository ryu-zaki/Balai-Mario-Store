import React from 'react'
import SideNav from './SideNav'
import SearchBar from './SearchBar'
import HomePage from './Home Page/HomePage'
import style from './style.module.css';

function MainPage() {

  const [sideNavVisible, setSideNavVisible] = React.useState(false);

  return (
    <>
    {/* Mobile Top Navigation */}
    <div className='flex text-dark z-10 bg-pureWhite justify-between sticky top-0 dark-shadow items-center py-4 px-5'>
        <h3 className='font-semibold'>Balai Mario</h3>
        
        <div className={`${style.mobile_menu} relative`}>
          <div onClick={() => setSideNavVisible(true)} className='z-10 absolute inset-0'></div>
          <div></div>
          <div></div>
          <div></div>  
        </div>

       </div>
    
    <div className={`${style.mainWidth} mx-auto`}>
      

      <SideNav setSideNavVisible={setSideNavVisible} sideNavVisible={sideNavVisible} />
      
      <div className='flex flex-col gap-10 my-6'>
        <SearchBar />
        <HomePage />
      </div>
    </div>

    </>
  )
}



export default MainPage
