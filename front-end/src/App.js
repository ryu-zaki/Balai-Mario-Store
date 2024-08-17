import './App.css';
import './Animations.css';
import React, { useRef } from 'react';
import AboutUs from './components/AboutUs';
import HeroSection from './components/HeroSection';
import NavBar from './components/NavBar';
import ProductsPreview from './components/ProductsPreview';
import ServicesSection from './components/ServicesSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import GoogleMaps from './components/GoogleMaps';
import ProductSection from './components/ProductSection';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import LogReg from './components/LogReg';
import IndividualProduct from './components/IndividualProduct';
import CategoryProducts, { divideArr } from './components/CategoryProducts';
import IndividualCategory from './components/IndividualCategory';
import { useAvailableRecipes } from './context/AvailableRecipes';
import { Element, Link, scroller } from 'react-scroll';
import chevronLightRight from './assets/materials/chevron-light-right.png';
import chevronLightLeft from './assets/materials/chevron-light-left.png';
import CheckoutPage from './components/CheckoutPage';
import ReceiptPage from './components/ReceiptPage';
import NoteModal from './components/NoteModal';
import { useCart } from './context/UserCartContext';
import CheckoutValidate from './context/CheckoutValidate';
import AvailableAccounts from './components/AvailableAccounts';
import Settings from './components/settingsPanel/Settings';
import FaqComp from './components/FAQ/FaqComp.tsx';
import AboutUsWhole from './components/AboutUsPage/AboutUsWhole.tsx';
import LogRegAuth from './components/route_protector/LogRegAuth.jsx';
import { useLogReg } from './context/LogRegInfo.jsx';
import ModalMessageBox from './components/ModalMessageBox.jsx';
import ConfirmationBox from './components/ConfirmationBox.jsx';
import userIcon from './assets/icons/jhonwell.jpg';
import { useUserinfo } from './context/UserInfo.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import OrderHistory from './components/OrderHistory/OrderHistory.jsx';

import { availRecipes } from './info/RecipesInfo.js';
import AccountChangeModal from './components/AccountChangeModal.jsx';
import UserAvatar from './components/UserAvatar.jsx';
import OtpModal from './components/OTP/OtpModal.jsx';
import CustomAlert from './components/Modals/CustomAlert.jsx';
import SettingsPage from './components/Settings Page/SettingsPage.jsx';
import EmailGetter from './components/Modals/EmailGetter.jsx';
import PageNotFound from './components/PageNotFound.jsx';

import MainPage from './admin panel/MainPage.jsx';
function App() {
  const {categories} = useAvailableRecipes();
  const {totalProducts, singleOrder} = useCart();
  const {setIsLogin, setUserGeneralInfo, userGeneralInfo} = useUserinfo();
  const {pathname} = useLocation();
  const [controlsIndex, setControlsIndex] = React.useState(0);
  const [slideNum, setSlideNum] = React.useState(1);
  const [individualCategories, setIndividualCategories] = React.useState([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  
  const aboutUsRef = useRef(null);
  const previewRef = useRef(null);
  const servicesRef = useRef(null);
  const suggestedRef = useRef(null);
  const quoteRef = useRef(null);
    
  const [suggestedVisible, setSuggestedVisible] = React.useState(false);
  const [quoteVisible, setQuoteVisible] = React.useState(false);
  const [aboutUsSecActive, setAboutUsSecActive] = React.useState(false);
  const [previewSecActive, setPreviewSecActive] = React.useState(false);
  const [servicesSecActive, setServicesActive] = React.useState(false);
  const [isFinish, setIsFinish] = React.useState(false);
  const [availableAccs, setAvailableAccs] = React.useState(false);
  const [settingsPrivacy, setSettingsPrivacy] = React.useState(false);
  const [faqsVisible, setFaqsVisible] = React.useState(false);
  const [viewMore, setViewMore] = React.useState(false);
  const [otpModalActive, setOtpModalActive] = React.useState(false);
  const [sendEmailOtp, setSendEmailOtp] = React.useState("");

  //Custom Alert States
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertMess, setAlertMess] = React.useState("");
  const [alertCategory, setAlertCategory] = React.useState(false);

  React.useEffect(() => {
    const filteredFoods = categories
    .map((category, index) => {
      return <IndividualCategory slideNum={slideNum} category={category} key={index} />
    });

    setIndividualCategories(divideArr(filteredFoods, 3))

  }, [controlsIndex, categories]);
  console.log(userGeneralInfo);

  React.useEffect(() => {

    setSlideNum(1);
    setControlsIndex(0);

  }, [pathname])

  const setIntersectionObserver = (element, setState, threshold = .5) => {
    
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {
          if (entry.isIntersecting) {
            setState(true);
          } 
      })

    }, {threshold});

    observer.observe(element);

  }

  React.useEffect(() => {

    setIntersectionObserver(aboutUsRef.current, setAboutUsSecActive);
    setIntersectionObserver(previewRef.current, setPreviewSecActive);
    setIntersectionObserver(servicesRef.current, setServicesActive, .1);

    setIntersectionObserver(suggestedRef.current, setSuggestedVisible);
    setIntersectionObserver(quoteRef.current, setQuoteVisible);

  }, [aboutUsRef, servicesRef, aboutUsRef, pathname, suggestedRef, quoteRef]);
  
  //LogReg States
  const {errModalVisible, errMsg, succModalVisible, succMsg, succSubMsg, handleLogout, confirmModalVisible, setConfirmModalVisible, accChangeMess, setAccChangeMess} = useLogReg();

  //API for refresh data
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!!accessToken) {
      setPageLoading(true);

      fetch('http://localhost:2000/users/check-info', {
        method: "POST",
        credentials: 'include',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      .then(data => data.json())
      .then(data => { 

        if (!!data.isLogin) {
          
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
          }
        
          //data.userData
          setUserGeneralInfo(() => {

            const cartProducts = [];

            for (let i = data.userData.cartProducts.length - 1; i >= 0; i--) {

             cartProducts.push(data.userData.cartProducts[i]);

            }

            return ({
              ...data.userData,
              cartProducts
            })
          });


          setIsLogin(true);
        } else {
          setIsLogin(false)
        }
      })
      .catch(err => {
        console.log(err);
        window.alert(err.message);
      })
      .finally(() => {
        setPageLoading(false)
      })

      return;
    }
    
    setPageLoading(false)

  }, []);
  
  return (
    <>
       <MainPage />
       <Footer />
    </>
   
  )

  return (
    <>
   {/*  <EmailGetter 
      sendEmailOtp={sendEmailOtp} 
      setSendEmailOtp={setSendEmailOtp}
    /> */}
    
    <CustomAlert 
      state={alertVisible} 
      setState={setAlertVisible} 
      message={alertMess}
      category={alertCategory} 
    />

    <OtpModal 
      setSendEmailOtp={setSendEmailOtp}
      setAlertCategory={setAlertCategory}
      setAlertMess={setAlertMess}
      setAlertVisible={setAlertVisible}

      sendEmailOtp={sendEmailOtp}
      otpModalActive={otpModalActive} 
      setOtpModalActive={setOtpModalActive} />

    <AccountChangeModal  state={accChangeMess} setState={setAccChangeMess} email={userGeneralInfo.email} />
    {
      pageLoading && <LoadingPage />
    }
    {
      confirmModalVisible && (
   <ConfirmationBox 
       onContinue={() => {
        handleLogout();
        setViewMore(false);
       }}
       icon={
         <UserAvatar size={65} email={userGeneralInfo.email} />
       }
       setIsVisible={setConfirmModalVisible}

       question={"Are you sure you want to logout?"}
    />
      )
    }
    
        <ModalMessageBox 
          trigger={errModalVisible} 
          message={errMsg} 
          subMsg={"Input your info properly."}  
          category={"Error"}
        />

        <ModalMessageBox 
          trigger={succModalVisible} 
          message={succMsg} 
          subMsg={succSubMsg}
          category={"success"}/>

    <div className='w-full'>
      <NoteModal />
      {faqsVisible && <FaqComp setFaqsVisible={setFaqsVisible} />}
      {settingsPrivacy && <Settings settingsPrivacy={settingsPrivacy}/>}

      {availableAccs && <AvailableAccounts setOtpModalActive={setOtpModalActive} setSendEmailOtp={setSendEmailOtp} setViewMore={setViewMore} availableAccs={availableAccs} setAvailableAccs={setAvailableAccs} />}
      
      <Routes>
        <Route path='/' element={
          <>
            <NavBar 
            viewMore={viewMore} 
            setViewMore={setViewMore}
            setFaqsVisible={setFaqsVisible}  setAvailableAccs={setAvailableAccs} />
            <div className='px-7 flex flex-col gap-7 xl:px-14'>
          
                 <main className='flex mb-16 flex-col gap-32 items-center lg:gap-40 xl:gap-52'>
                 <Element className='w-full' name="home">
                   <HeroSection />
                 </Element>
                 
                 <Element className='w-full' name='about us'>
                   <AboutUs aboutUsSecActive={aboutUsSecActive} aboutUsRef={aboutUsRef} />
                 </Element>
                 
                 <Element className='w-full' name="products">
                   <ProductsPreview previewSecActive={previewSecActive} previewRef={previewRef} />
                 </Element>
                 
                 <Element className='w-full' name='services'>
                   <ServicesSection
                     servicesRef={servicesRef}
                     servicesSecActive={servicesSecActive}
                   />
                 </Element>
                 
                 <Testimonials />

                 <Element className='w-full flex justify-center' name='location'>
                   <GoogleMaps />
                 </Element>
                 

                 </main>
             </div> 
          </>
        } />

        <Route path='/products' element={<ProductSection
          viewMore={viewMore} 
          setViewMore={setViewMore}
          setFaqsVisible={setFaqsVisible} 
          setAvailableAccs={setAvailableAccs}
        />} >

          <Route index element={
           <div className='w-11/12 category-main-container'>
          
             <SliderController 
               arrLength={individualCategories.length} 
               setState={setControlsIndex}
               currentSlide={controlsIndex} 
               style={"justify-between xs:justify-center lg:justify-end my-14"}
              />
             <div className='w-full individual-category-container mx-auto  text-sm text-center flex flex-col items-center gap-10 xs:text-left  lg:gap-28 2xl:text-base  mt-10'>
              {individualCategories[controlsIndex]}
             </div>
             <SliderController 
               arrLength={individualCategories.length} 
               setState={setControlsIndex}
               currentSlide={controlsIndex} 
               style={"justify-between xs:justify-center lg:justify-start mt-20"}
              />
           </div>
            } />

           <Route path=':category' element={
             <CategoryProducts />
           } />

           </Route>
         
        <Route  
          path="/account-settings"
          element={
          <div>
            <NavBar 
            viewMore={viewMore} 
            setViewMore={setViewMore}
            setFaqsVisible={setFaqsVisible} 
            setAvailableAccs={setAvailableAccs} />

            <SettingsPage />
          </div>}
        />


        
        <Route path='/products/:category/:productId' element={
          <div>
            <NavBar 
            viewMore={viewMore} 
            setViewMore={setViewMore}
            setFaqsVisible={setFaqsVisible} 
            setAvailableAccs={setAvailableAccs} />

            <IndividualProduct 
              suggestedVisible={suggestedVisible} suggestedRef={suggestedRef}  
              quoteVisible={quoteVisible} quoteRef={quoteRef}
              
            />
          </div>} />

        <Route 
          path='/order-history'
          element={
            <>
            <NavBar 
            viewMore={viewMore} 
            setViewMore={setViewMore}
            setFaqsVisible={setFaqsVisible} 
            setAvailableAccs={setAvailableAccs} />
            <OrderHistory />
            </>
            
          }
        />

        <Route path='/login' element={
          <LogRegAuth>
           <div className='overflow-hidden'>
           <NavBar 
           viewMore={viewMore} 
           setViewMore={setViewMore}
           setFaqsVisible={setFaqsVisible} setAvailableAccs={setAvailableAccs} />
            
            <LogReg 
              setOtpModalActive={setOtpModalActive}
            />
          </div>
          </LogRegAuth>
        }
            
        />

       <Route path='/register' element={
        <LogRegAuth>
          <div className='overflow-hidden'>
          <NavBar 
          viewMore={viewMore} 
          setViewMore={setViewMore}
          setFaqsVisible={setFaqsVisible} setAvailableAccs={setAvailableAccs} />
         
         <LogReg />
       </div>
       </LogRegAuth>
        }
            
        />

       <Route 
         path='/checkout/:mode'
         element={
         (!!totalProducts || !!singleOrder.recipeName) ? (
         isFinish ? (
          <ReceiptPage setIsFinish={setIsFinish} />
         ) : (
              <div className='min-h-screen flex justify-center items-center'><CheckoutPage setIsFinish={setIsFinish} /></div>
            ) ) : <Navigate to={'/'} />
            
          }
       />

       <Route 
         path='/about-us'
         element={
          <>
          <NavBar 
          viewMore={viewMore} 
          setViewMore={setViewMore}
          setFaqsVisible={setFaqsVisible} setAvailableAccs={setAvailableAccs} />
          
          <AboutUsWhole />
          </>
          
         }
       />

      <Route 
       path='*'
       element={
        <>
          <NavBar 
            viewMore={viewMore} 
            setViewMore={setViewMore}
            setFaqsVisible={setFaqsVisible} 
            setAvailableAccs={setAvailableAccs} />

          <PageNotFound />
        </>
       }
      />

      </Routes>

      {
        pathname !== "/checkout" && <Footer />
      }
    
         {/* <ProductSection /> */}
        
       
       
    </div>
    </>
  );
}

export const SliderController = ({currentSlide, setState, arrLength, style}) => {
  
  const {pathname} = useLocation();
  const handleControl = ({target}) => {

    if (target.id === "add") {
      setState(prev => {
        if (prev + 1 >= arrLength) return prev;

        scroller.scrollTo('available-recipe');
        return prev + 1 
      
      });
    } else {
      setState(prev => {
        if (!prev) return 0;
        
        scroller.scrollTo('available-recipe');
        return prev - 1 
      
      });
    }
    
  }



  return (
   <div className={`${style} text-darkBrown flex items-center w-full px-10 xs:gap-7 lg:gap-8`}>
    <div className={`${!!currentSlide ? "bg-lightOrange" : "bg-lightGray"} p-2 rounded-full relative lg:p-3`}>
      
    <div id="sub" onClick={handleControl} className={`absolute inset-0 z-20 ${!!currentSlide ? 'cursor-pointer' : "cursor-not-allowed"}`}></div>

    <img draggable={false} className='w-4 select-none' src={chevronLightLeft} alt='' />
    </div>

    <p className='flex gap-3'><span className='font-bold'>{currentSlide + 1}</span> of <span className='font-bold'>{arrLength}</span></p>

    <div className={`${currentSlide + 1 === arrLength ? "bg-lightGray" : "bg-lightOrange"} p-2 rounded-full relative lg:p-3`}>
    <div id="add" onClick={handleControl} className={`absolute inset-0 z-20 ${currentSlide + 1 === arrLength ? "cursor-not-allowed" : 'cursor-pointer'}`}></div>
    <img draggable={false} className='w-4 select-none' src={chevronLightRight} alt='' />
    </div>
    
   </div>
  )
}


export default App;
