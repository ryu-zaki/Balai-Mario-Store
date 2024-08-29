import React from 'react'
import SideNav from './SideNav'
import SearchBar from './SearchBar'
import HomePage from './Home Page/HomePage'
import style from './style.module.css';
import { Route, Routes } from 'react-router';
import RegisteredPage from './Registered Page/RegisteredPage.jsx';

function MainPage() {

  const [sideNavVisible, setSideNavVisible] = React.useState(false);

  return (
    <>
    {/* Mobile Top Navigation */}
    <div className='flex  text-dark z-50 bg-pureWhite justify-between sticky top-0 dark-shadow items-center py-4 px-5 xl:hidden'>
        <h3 className='font-semibold'>Balai Mario</h3>
        
        <div className={`${style.mobile_menu} relative`}>
          <div onClick={() => setSideNavVisible(true)} className='z-10 absolute inset-0'></div>
          <div></div>
          <div></div>
          <div></div>  
        </div>

       </div>
    
    <div className={`${style.mainWidth} mx-auto container mb-28 grid-cols-4 xl:grid xl:gap-10`}>
      

      <SideNav setSideNavVisible={setSideNavVisible} sideNavVisible={sideNavVisible} />
      
      <div className='flex flex-col gap-10 my-6 col-span-3'>
        <SearchBar />

        <Routes>
          <Route path='/' element={
            <HomePage />
          } />

          <Route path='/users' element={
            <RegisteredPage />
          } />

        </Routes>
        
      </div>
    </div>

    </>
  )
}



export default MainPage
