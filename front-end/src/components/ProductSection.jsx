import React, { useRef } from  'react';
import NavBar from './NavBar';
import heroImg from '../assets/business_assets/hero-img-product.jpg';
import seachIcon from '../assets/materials/search-icon.png';
import chevronIcon from '../assets/materials/chevron-right.png';
import heartFill from '../assets/materials/heart-fill.png';
import heartIcon from '../assets/materials/heart-icon.png';
import CartSuccess from '../assets/materials/cart-success.png';
import searchFailed from '../assets/materials/search-failed.png';
import { useAnimationGSAP } from '../context/AnimationGSAP';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Element, scroller } from 'react-scroll';
import { useAvailableRecipes } from '../context/AvailableRecipes';
import { useCart } from '../context/UserCartContext';
import { useUserinfo } from '../context/UserInfo';
import 'ldrs/lineSpinner'
import ButtonLoader from './loaders/ButtonLoader';


const ProductSection = ({viewMore, setViewMore, setFaqsVisible, setAvailableAccs}) => {

    const {productSecMarkerRef} = useAnimationGSAP();
    
    return (
        <div className='product-section'> 
            <div className='text-darkBrown product-section-hero relative '>
              <NavBar 
                viewMore={viewMore} 
                setViewMore={setViewMore}
                setFaqsVisible={setFaqsVisible} 
                setAvailableAccs={setAvailableAccs}
              />
              <div className='px-7 xl:px-14'>

              {/* Background Image */}
              <img loading='lazy' className='product-sec-bg object-cover -z-20 absolute inset-0 w-full h-full' src={heroImg} alt="" />

              {/* Description */}
              <div className='absolute inset-0 text-pureWhite flex z-10 flex-col justify-center items-center px-4 text-center w-full h-full gap-2'>
                <div className='product-sec-title relative'>
                    <h3 className='overflow-hidden text-3xl title-font xs:text-4xl sm:text-6xl lg:text-7xl'><span className='inline-block title-font'>Balai Mario's Menu</span></h3>
                </div>
                 
                 <div className='product-sec-sub overflow-hidden text-xs xs:text-sm sm:text-base xl:text-lg'><p className='block'>You have <b>700</b> recipes to explore!</p></div>

              </div>

              {/* Marker at the bottom */}
              <span ref={productSecMarkerRef} className='absolute text-center bottom-0 p-3 px-4 z-20 rounded-full left-1/2 bg-lightOrange text-pureWhite -translate-x-1/2 translate-y-1/2 text-xs xxs:text-sm xs:px-6 lg:text-base'>Satisfy your Cravings</span>

              {/* Carousel Loop */}
            </div>
            </div>

            <div className='pt-20 z-10 scroll-smooth relative categories-loop bg-pureWhite overflow-hidden whitespace-nowrap pb-6 sm:pb-10'>

                <CategoriesWrapper />
                <CategoriesWrapper />

              </div>

            <CategorySection />        
        </div>
    )
}


export const AvailableDish = ({data}) => {
    const {handleHeartNum, handleHeartToggle, invUserProInfo, handleQuanOperation, handleVariant} = useAvailableRecipes();

    const [isDishAdded, setIsAdded] = React.useState(false);
    const {handleAddProCart, handleDeleteProCart} = useCart();
    const {userGeneralInfo} = useUserinfo();

    const {cartProducts} = userGeneralInfo;

    const [cartNotif, setCartNotif] = React.useState("Added to your cart");
    const [notifVisible, setNotifVisible] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {

      if (notifVisible) {
        const timeout = setTimeout(() => {
          setNotifVisible(false);
        }, 2000)


        return () => clearTimeout(timeout);
      }

    }, [notifVisible]);

  
    const {recipeName, price, image, hearts} = data;

    const invInfo = invUserProInfo.find(data => data.recipeName === recipeName);

    const addedToCart = cartProducts.find(data => data.recipeName === recipeName && data.isWhole === invInfo.isWhole);

    const navigate = useNavigate();

    const handleHeart = () => {
      handleHeartToggle(recipeName);
      handleHeartNum(invInfo);
    }

    const identifyVariant = ({target}) => {
      handleVariant(invInfo.recipeName, target.id);
    }

    const handleQuantity = ({target}) => {
      if (target.id === "add") {
        handleQuanOperation(invInfo.recipeName, 1);
      } else {
        handleQuanOperation(invInfo.recipeName, -1);
      }
      
    }

    const handleCart = () => {

      handleAddProCart({...invInfo, ...data}, setIsLoading, setCartNotif, setNotifVisible);
    }

    const deleteFunc = ({target}) => {
      handleDeleteProCart(addedToCart._id, setIsLoading, setCartNotif, setNotifVisible)
  
    }

    return (
        <div className='dark-shadow available-dish bg-pureWhite dish-box relative p-3 pt-16 flex flex-col items-center justify-end xs:p-4 xs:pt-16 lg:pt-24 lg:p-5 xl:pt-28 xl:p-6'>
          <CartNotifModal 
            style={{
              defaults: 'left-5 xs:left-16 lg:left-5',
              to: "-top-16 scale-100 origin-left xs:-top-8 lg:-top-16",
              from: "top-0 translate-y-full scale-0"
            }}
            isDishAdded={isDishAdded} 
            notifVisible={notifVisible} 
            cartNotif={cartNotif} 
          />

            <div className={`${notifVisible && "active"} border-4 ${notifVisible ? "border-green" : "border-lightOrange"} flex justify-center items-center rounded-img overflow-hidden mx-auto w-2/3 max-w-24 aspect-1 absolute top-0 -translate-y-1/2 rounded-full lg:max-w-32 xl:max-w-40`}>
              {(notifVisible) && <AnimatedCheckIcon  />}
              <img draggable={false} className={`object-cover absolute inset-0 h-full w-full transition-all duration-500  select-none`} src={image} alt='' />
            </div>
            <div className='w-full flex flex-col gap-3 xl:gap-5'>
                <div className='flex justify-between gap-1 items-start'>
                  <h3 className='text-xs font-semibold xs:text-sm lg:text-lg xl:text-xl'>{recipeName}</h3>
                  <div className='flex gap-1 text-xs items-center text-lightOrange font-semibold lg:text-sm'>
                    <img onClick={handleHeart} draggable={false} className='object-cover w-4 select-none cursor-pointer xs:w-5 lg:w-7' src={invInfo.isLiked ? heartFill : heartIcon} alt='' />
                    <p>{hearts}</p>
                  </div>
                </div>
                
                <div className='flex items-center text-xs justify-between lg:text-sm xl:text-base'>
                    <span className='text-lightOrange font-semibold'>&#8369;{typeof price === "number" ? price.toFixed(2) : invInfo.price[invInfo.isWhole ? "whole" : "half"].toFixed(2)}</span>
                    <div className='flex items-center select-none text-xs gap-2 lg:text-sm lg:gap-3 xl:text-base xl:gap-4'>
                      <p id="add" onClick={handleQuantity} className='border-lightOrange border rounded-full cursor-pointer px-2'>+</p>
                      <p className='text-darkBrown font-semibold'>{invInfo.quantity}</p>
                      <p id="sub" onClick={handleQuantity} className='border-lightOrange border rounded-full cursor-pointer px-2'>-</p>
                    </div>
                   
                </div>

                {
                  typeof price !== "number" && (
                    <div className='chicken-part-option flex gap-2 text-xs text-darkBrown mt-3 justify-center xxs:gap-4 xxs:justify-start lg:mt-0'>
                      <button onClick={identifyVariant} id="whole" className={`${!!invInfo.isWhole && "active"} light-shadow py-1 px-4 rounded-full xxs:px-6 lg:py-2`}>Whole</button>
                      <button onClick={identifyVariant} id="half" className={`${!invInfo.isWhole && "active"} py-1 px-4 rounded-full xxs:px-6 lg:py-2`}>Half</button>
                    </div>
                  )
                }
                
                
                <div className='w-full gap-2 mt-3 flex flex-col items-stretch justify-between lg:flex-row'>
                  {
                     cartProducts.some(data => data.recipeName === invInfo.recipeName && data.isWhole === invInfo.isWhole) ? 
                     (<button id={addedToCart._id} onClick={deleteFunc} className='flex-grow text-pureWhite text-xs bg-red p-2 flex justify-center items-center rounded-lg lg:text-xs lg:p-3 xl:p-4 xl:rounded-xl'>
                      <span className={`${isLoading && "opacity-0"}`}>REMOVE TO DISH</span>
                      {
                       isLoading && (
                        <div className='absolute'>
                          <l-line-spinner
                              size="20"
                              stroke="3"
                              speed="1"
                              color="white" 
                          ></l-line-spinner>
                        </div>
                       )
                      }
                      </button>) : 
                     (<button onClick={isLoading ? () => {} : handleCart} className='flex-grow text-pureWhite text-xs bg-lightOrange p-2 rounded-lg lg:text-xs lg:p-3 xl:p-4 xl:rounded-xl flex justify-center items-center'>
                      <span className={`${isLoading && "opacity-0"}`}>ADD TO DISH</span>
                      
                      {
                       isLoading && (
                       <div className='absolute'>
                        <l-line-spinner
                            size="20"
                            stroke="3"
                            speed="1"
                            color="white" 
                        ></l-line-spinner>
                      </div>)
                      }
                      </button>)
                  }
                  

                  <button onClick={() => navigate(recipeName)} className='flex-grow text-lightOrange border-lightOrange border text-xs p-2 rounded-lg lg:text-xs lg:p-3 xl:p-4 xl:rounded-xl'>DETAILS</button>
                </div>
                
            </div>
            </div>
    )
}

export const CartNotifModal = ({cartNotif, notifVisible, isDishAdded, style}) => {

  const {from, to, defaults} = style

  return (
    <div className={`${defaults} p-1 px-6 ${isDishAdded && "delay-1000"} w-fit whitespace-nowrap transition-all duration-700 font-bold text-xs rounded-full dark-shadow absolute ${notifVisible ? to : from} z-50 text-lightOrange flex gap-2 items-center justify-center bg-pureWhite xs:px-4 xl:py-2`}>
      <p className='text-xxs base-back'>{cartNotif}</p>
      <img className='scale-75' src={CartSuccess} alt="" />
    </div>
  )
}

export const AnimatedCheckIcon = () => {


  return (
     <svg className="checkmark aspect-1 z-20 absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
     </svg>
  )
}

const CategoriesWrapper = () => {

  const {bgTextRef} = useAnimationGSAP();
  const {categories} = useAvailableRecipes();
  const navigate = useNavigate();
  const hanldeNavigate = ({target}) => {
    navigate(target.innerText.toLowerCase());
    scroller.scrollTo('available-recipe', {smooth: true});
   
    setTimeout(() => {
      bgTextRef.current.classList.add("hidden");
      bgTextRef.current.classList.remove("hidden");
    }, 0)

  }



  return (
    <div className='categories-wrapper title-font'>
      {
        categories.map((category, index) =>
           <h3 onClick={hanldeNavigate} className='capitalize' key={index}>{category}</h3>)
      }             
    </div>
  )
}


const NavigationFilter = ({mobileVer}) => {

  return (
     <nav className={`${!!mobileVer ? "mx-auto mb-7 md:hidden" : "hidden md:block"} sticky top-6 dark-shadow relative bg-pureWhite overflow-hidden products-menu w-fit flex text-xs justify-between z-20 rounded-full xs:text-sm lg:text-base`}>
          <button>All</button>
          <button>Starter</button>
          <button>Vegetarian</button>
          <button className='active'>Chicken</button>
          <div className='absolute rounded-full top-1 bottom-1 bg-lightOrange -z-10'></div>
      </nav>
  )
}



const CategorySection = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [arrowAnim, setArrowAnim] = React.useState(false);
  const {allProductsTitleSticky} = useAnimationGSAP();

  const handleMenuSelect = () => {

    if (pathname === "/products") {
      navigate('/');
      window.scrollTo({top: 0})
    } else {
      navigate('/products');
      scroller.scrollTo("available-recipe");
    }
    
    

  }

  return (
    <Element name='available-recipe' className='bg-ash pt-14 flex flex-col items-center pb-10 relative sm:pt-20 lg:pt-20'>
      <h2 ref={allProductsTitleSticky} className='text-2xl font-semibold rounded-full origin-left xs:text-3xl sm:text-4xl lg:text-5xl lg:inline'>Available <span className='text-lightOrange'>Recipes</span></h2>


      <div className='mt-10 z-30 product-search-con w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:w-11/12 lg:sticky lg:top-3 lg:mt-14'>
        <div className='flex bg-ash menu-back py-3 dark-shadow rounded-full px-6 gap-2 relative items-center text-xs lg:px-8 lg:text-sm 2xl:text-base'>
          <div onClick={handleMenuSelect} onMouseLeave={() => setArrowAnim(false)} onMouseOver={() => setArrowAnim(true)} className='absolute z-10 inset-0 cursor-pointer'></div>
          <img className={`${arrowAnim && "anim"} rotate-180 w-4`} src={chevronIcon} alt='' />
          <p>{pathname === "/products" ? "Back to Home" : "Menu Selection"}</p>
        </div>
        <SearchBar style={"hidden sm:flex"} />
      </div>

      <SearchBar style={"flex sm:hidden"} />

      <Outlet/>
    </Element>
  )
}


const SearchBar = ({style}) => {
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  const ResultBox = ({data}) => {
    const {recipeName, category, image} = data; 

    const searchedName = recipeName.split("").map((text, index) => {
      return searchText.toLowerCase().includes(text) && index < searchText.length ? <b key={index} className='text-lightOrange'>{text}</b> : text
    });

    const handleNavigate = () => {
      navigate(`/products/${category}/${recipeName}`);
    };

    return (
      <div className='flex border-b border-lightOrange relative text-darkBrown py-4 mx-6 items-center gap-2 justify-between xs:mx-8 xs:py-5 lg:mx-10 lg:py-4'>
            <div onClick={handleNavigate} className='absolute inset-0 cursor-pointer z-10'></div>

            <div className='flex gap-3 w-full items-center xs:gap-5 sm:gap-3 lg:gap-5'>
            <img className='aspect-1 object-cover w-12 rounded-full lg:w-14' src={image} alt='' />
            <div>
              <h3 className='text-sm capitalize xs:text-base sm:text-sm lg:text-base'>{searchedName}</h3>
              <p className='text-xs xs:text-sm sm:text-xs lg:text-sm'>{category}</p>
            </div>
            </div>

            <div className='text-sm flex gap-1 text-lightOrange items-center font-semibold xs:text-base sm:text-sm lg:text-base'>
              <img className='w-5 xs:w-6 sm:w-5 lg:w-6' src={heartIcon} alt='' />
              <span>32</span>
            </div>
            </div>
    )
  }

  const {recipes} = useAvailableRecipes();
  const [resultArr, setResultArr] = React.useState([]);

  const handleSearch = ({target}) => {

    setSearchText(target.value);

  }

  React.useEffect(() => {

    setResultArr(() => {

      const results = recipes.filter((data) => {
        return data.recipeName.startsWith(searchText.toLowerCase());
      });

      return results;
      
    })


  }, [searchText])

  const resultsBoxes = resultArr
  .map((data, index) => {
    return <ResultBox data={data} key={index} />
  })
  .filter((_, index) => index < 3);


  return (

        <div className={`${style} sticky top-3 z-30 mt-4 rounded-full items-center relative h-11 border border-gray w-11/12 max-w-96 sm:h-14 sm:mt-0`}>
          <img className='w-6 absolute left-2 z-10 sm:w-7 lg:left-4' src={seachIcon} alt='' />
          <input autoComplete='off' value={searchText} onChange={handleSearch} placeholder='Search Recipe' className='rounded-full pl-10 lg:pl-14 text-darkBrown absolute outline-0 border-0 inset-0 h-full w-full' id="search-category" />

          <div className={`${!!searchText.trim() ? "flex" : "hidden"} w-full flex-col gap-2 rounded-2xl dark-shadow text-darkBrown absolute -bottom-2 translate-y-full bg-pureWhite z-10 lg:py-3`}>
            
            {
            !resultsBoxes.length ? (
                <div className='w-full flex gap-2 items-center justify-center'>
                  <h3 className='text-center py-4 italic text-lightOrange font-semibold lg:py-2 lg:text-lg'>Recipe Not Found</h3>
                  <img src={searchFailed} alt='' />
               </div>
              ) : resultsBoxes
            }
            
          </div>
        </div>
  )

}


export default ProductSection;