import React, { useRef } from 'react';
import heartIcon from '../assets/materials/heart-icon.png';
import heartFill from '../assets/materials/heart-fill.png';
import BlogFeature from './BlogFeature';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAvailableRecipes } from '../context/AvailableRecipes';
import { scroller } from 'react-scroll';
import { useCart } from '../context/UserCartContext';
import { CartNotifModal } from './ProductSection';
import { useUserinfo } from '../context/UserInfo';

const IndividualProduct = ({suggestedVisible, suggestedRef, quoteVisible, quoteRef}) => {

    React.useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);

    const {recipes, invUserProInfo, handleHeartToggle, handleHeartNum, handleQuanOperation, handleVariant} = useAvailableRecipes();

    const {handleAddProCart, handleDeleteProCart, setSingleOrder} = useCart();
    const {userGeneralInfo} = useUserinfo();
    const {cartProducts} = userGeneralInfo;

    const {productId} = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    
    const invData = recipes.find((data) => data.recipeName.trim().toLowerCase() === productId.toLocaleLowerCase());


    const {price, recipeName, image, category, hearts} = invData;

    /* Hearts and Quantity */
    const invInfo = invUserProInfo.find(data => data.recipeName === recipeName);

    const handlePath = ({target}) => {
        const {dataset, id} = target;
       navigate(id);

       setTimeout(() => {
        if (!!Number(dataset.index)) {
            scroller.scrollTo("available-recipe");
          }
       }, 0)
       
    }

    console.log(invData);

    const paths = pathname.replace(/%20/g, " ").split('/').slice(1);
    const pathLinks = paths.map((path, index, arr) => {

      const url = arr.slice(0, index + 1);
      url.unshift('');

      return <button data-index={index} id={url.join('/')} onClick={handlePath} className='underline uppercase hover:font-bold hover:text-darkBrown' key={index} >/ {path}</button>
    });

    const [heartClick, setHeartClick] = React.useState(false);

    React.useEffect(() => {

        if (heartClick) {
            handleHeartNum(invInfo);
            setHeartClick(false);
        }
        
    }, [heartClick]);

    const handleHeart = () => {
        handleHeartToggle(recipeName);
        setHeartClick(true)
    }

    const handleQuantity = ({target}) => {
        if (target.id === "add") {
          handleQuanOperation(invInfo.recipeName, 1);
        } else {
          handleQuanOperation(invInfo.recipeName, -1);
        }
        
      }

    const identifyVariant = ({target}) => {
        handleVariant(recipeName, target.id);
    };

    const handleCart = () => {
        handleAddProCart({...invInfo, ...invData}, setIsLoading, setCartNotif, setNotifVisible);
    }

    const hanldeOrder = () => {
        setSingleOrder({...invInfo, ...invData});
        navigate('/checkout/single-dish')
    }
    

    const removeProCart = (e) => {
        const removeProduct = cartProducts.find((data) => data.recipeName === invInfo.recipeName && data.isWhole === invInfo.isWhole);

        handleDeleteProCart(removeProduct._id, setIsLoading, setCartNotif, setNotifVisible);
    }

    /* Notif Modal */

    const [cartNotif, setCartNotif] = React.useState('Added to your dish');
    const [notifVisible, setNotifVisible] = React.useState(false);

    React.useEffect(() => {
 
        if (notifVisible) {
            const timeout = setTimeout(() => {
                setNotifVisible(false);
            }, 2000)

            return () => clearTimeout(timeout);
        }

    }, [notifVisible]);

    
    
    return (
        <div className='px-5 py-10 relative inv-section overflow-hidden sm:px-16 md:px-10 2xl:px-14'>
          <p className={`text-xs path-links text-lightOrange flex gap-1 sm:gap-2`}>{pathLinks}</p>

          <div className='flex flex-col inv-hero items-center gap-7 mt-7 md:flex-row md:justify-center md:items-start md:gap-5 lg:gap-14 xl:items-start xl:gap-28 2xl:mt-10 2xl:gap-32'>
            <div className='w-full inv-img-wrapper relative flex items-center my-10 xs:justify-center xl:h-full xl:my-0 xl:items-start'>
            <img draggable={false} className='inv-main-img select-none w-full h-full object-cover object-left rounded-full border-2 border-pureWhite xl:border-4' alt='' src={image} />
            </div>
             

             <div className='flex inv-main-desc flex-col gap-7 items-center text-center sm:gap-9 md:items-start md:text-left md:w-96 md:gap-7 2xl:gap-7'>
                <span className='dark-shadow py-3 px-8 rounded-full uppercase text-xs text-lightOrange'>{category}</span>
                <h1 className='text-3xl font-semibold uppercase sm:text-4xl title-font md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl'>{recipeName}</h1>
                <div className='flex font-semibold items-center gap-2 text-darkBrown sm:gap-3'>
                <h3 className='text-lightOrange xs:text-lg xl:text-xl'>&#8369;{isNaN(invData.price) ? (invInfo.price[invInfo.isWhole ? "whole": "half"].toFixed(2)) : price.toFixed(2)}</h3>
                <p className='text-xs xs:text-sm'>Good For</p>
                <span className='text-lightOrange xs:text-lg xl:text-xl'>{isNaN(invData.price) ? (invInfo.isWhole ? invInfo.limit.whole : invInfo.limit.half) : invData.limit}</span>
              </div>
                <p className='leading-7 text-sm sm:leading-8 sm:text-base md:text-sm lg:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget odio ullamcorper, aliquet risus non, lacinia arcu.Peaxaxllentesque eget odio ullamcorper, aliquet risus non, lacinia arcu.
                </p>

              
              <div className='flex flex-col gap-8 items-center sm:gap-10 md:flex-col md:items-start md:gap-7 xl:gap-8'>

              <div className='flex gap-7 flex-col md:flex-row'>
               <div className='flex gap-5'>
                    <div className='w-28 flex justify-between  text-lightOrange rounded-full py-2 font-semibold bg-lighterOrange sm:w-32 sm:text-lg md:w-28 md:text-sm lg:w-32 lg:text-lg'>
                        <span onClick={handleQuantity} id="add" className='select-none cursor-pointer pl-5'>+</span>
                        <span>{invInfo?.quantity}</span>
                        <span onClick={handleQuantity} className='pr-5 select-none cursor-pointer'>-</span>
                    </div>

                    <div className='text-lightOrange flex gap-2 items-center sm:text-lg md:text-sm lg:text-lg'>
                        <img onClick={handleHeart} className='cursor-pointer select-none' draggable="false" alt='' src={invData.isLiked ?heartFill : heartIcon} />
                        <p>{hearts}</p>
                    </div>
                </div>

                {
                isNaN(price) && (
                    <div className='md:border-l-2 md:border-l-lightOrange md:pl-7 text-xs flex gap-5 font-semibold xs:text-sm sm:text-base md:text-xs xl:gap-5 xl:text-sm'>
                     <button id="whole" onClick={identifyVariant} className={`${invInfo.isWhole ? "text-pureWhite bg-brown" : "text-darkBrown bg-pureWhite dark-shadow"} transition-all duration-500 py-2 rounded-full px-5  xl:py-2 xl:px-8`}>Whole</button>

                     <button id="half" onClick={identifyVariant} className={`${!invInfo.isWhole ? "text-pureWhite bg-brown" : "text-darkBrown bg-pureWhite dark-shadow"} transition-all duration-500 py-2 rounded-full px-6 xl:py-2 xl:px-9`}>Half</button>
                    </div>
                )
              }
              </div>

                <div className='flex text-xs gap-2  2xl:gap-6 sm:text-sm lg:text-base'>
                    <CartNotifModal
                      style={{
                        defaults: "left-0 -bottom-4 translate-y-full",
                        from: "-translate-x-full opacity-0",
                        to: "opacity-1"
                      }} 
                      cartNotif={cartNotif} 
                      notifVisible={notifVisible} 
                    />
                    {
                        cartProducts.some(product => product.recipeName === invInfo.recipeName && product.isWhole === invInfo.isWhole) ? (
                            <button id={invData.recipeName} onClick={removeProCart} className='bg-red p-3 px-6 text-pureWhite rounded-lg flex justify-center items-center'>
                                <span className={`${isLoading && "opacity-0"}`}>Remove to dish</span>


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
                            </button>) : <button onClick={handleCart} className='bg-lightOrange p-3 px-6 text-pureWhite rounded-lg flex justify-center items-center'>
                                <span className={`${isLoading && "opacity-0"}`}>Add to dish</span>
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
                            </button>
                        
                    }
                    
                    <button onClick={hanldeOrder} className='border border-lightOrange capitalize p-3 px-6 text-lightOrange rounded-lg'>Order Now</button>
                </div>

               </div>
                
             </div>
          </div>

          {/* Suggested Recepis */}

          <SugggestedRecipes suggestedRef={suggestedRef} suggestedVisible={suggestedVisible}/>
          <BlogFeature quoteRef={quoteRef} quoteVisible={quoteVisible} />
        </div>
    )
}

const SugggestedRecipes = ({suggestedRef, suggestedVisible}) => {
    const navigate = useNavigate();

    const Recipe = ({data}) => {
        
        const {pathname} = useLocation();
        const {price, recipeName, image} = data;

        const pathArr = pathname.split('/');
        pathArr.pop();
        pathArr.push(recipeName);
        
        const handleNavigate = () => {
            navigate(pathArr.join('/'));
            window.scrollTo({
                top: 0
            })
        }

        return (
            <section className={`${suggestedVisible && "active"} inv-suggested-recipe relative max-w-44 sm:max-w-60 xl:max-w-72 2xl:max-w-80`}>

                <img className='absolute rounded-full inset-0 w-full h-full object-cover' alt='' src={image} />

                <div className='right-2 -top-5 z-10 translate-x-1/4 absolute bg-pureWhite border border-lightOrange p-2 px-3 rounded-xl pb-3 xs:p-3 xs:px-6 xl:px-9 xl:py-4'>
                    <h3 className='capitalize font-semibold xl:text-lg'>{recipeName}</h3>
                    <div className='flex mt-1  items-center text-lightOrange font-semibold gap-1'>
                        <img className='w-4 lg:w-5' src={heartIcon} alt='' />
                        <span>32</span>
                    </div>

                    {/* Price */}
                    <p className='bg-lightOrange rounded-full text-pureWhite p-1 px-3 absolute bottom-0 translate-y-1/2 right-2'>&#8369;{isNaN(price) ? price.whole.toFixed(2) : price.toFixed(2)}</p>
                </div>

                <button onClick={handleNavigate} className='bg-lightOrange z-10 text-pureWhite p-2 px-4 -bottom-2 border border-pureWhite absolute rounded-full sm:p-3 sm:px-6 sm:bottom-2 xl:px-9 xl:p-4'>Order now</button>
              
            </section>
        )

    }

    const shuffleArr = (arr) => {

      for (let i = arr.length - 1; i > 0; i--) {

        let randomNum = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]]

      }

      return arr;
        
    }

    const {recipes}= useAvailableRecipes();
    const {category, productId} = useParams();

    const suggestions = recipes
    .filter((data) => {
        return data.category === category && productId !== data.recipeName
    })
    .map((data, index) => <Recipe data={data} key={index} />);
    const suggestionLimit = shuffleArr(suggestions)
    .filter((_, index) => index < 3);


    return (
        <div className='mt-32'>
            
            <div className='flex text-center flex-col items-center gap-5 sm:gap-8 lg:gap-10'>
                <span className='text-xs dark-shadow text-lightOrange p-3 px-8 rounded-full'>RECOMMENDATIONS</span>
                <h2 className='text-3xl title-font responsive-title font-semibold'>Suggested Recipes</h2>
            </div>

            <div ref={suggestedRef} className='suggested-recipes mt-16 flex flex-wrap justify-center gap-5 gap-y-16 xs:gap-y-20 xs:gap-7 sm:gap-10 sm:gap-y-20 sm:mt-20 lg:gap-16 xl:gap-20 xl:mt-32'>
              
              {suggestionLimit}
              
            </div>

        </div>
    )
}


export default IndividualProduct;

