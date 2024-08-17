import { useNavigate } from 'react-router';
import sampleProduct from '../assets/products/sample-product.jpg';
import { useAvailableRecipes } from '../context/AvailableRecipes';
import React, { useRef } from 'react';
import { scroller } from 'react-scroll';


const IndividualCategory = ({category, slideNum}) => {

    const categorySectionRef = useRef(null);
    const [categoryActive, setCategoryActive] = React.useState(false);
    const {recipes} = useAvailableRecipes();
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(category);
      scroller.scrollTo('available-recipe');
    };

    React.useEffect(() => {

      const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            setCategoryActive(true)
          } 

        })

      });

      observer.observe(categorySectionRef.current)

    }, [])

    React.useEffect(() => {
      setCategoryActive(false)
    }, [slideNum]);
      
    const filteredRecipes = recipes.filter((data) => {
      return data.category === category;
    });
    
    const prices = filteredRecipes.map(({price}) => price);

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    

    const featuredProducts = filteredRecipes
    .filter((_, index) => index < 3)
    .map((data, index) => {
      return <FeaturedProduct data={data} key={index} />
    });

    return (
      <section ref={categorySectionRef} className={`${!!categoryActive && "active"} product-category-section w-full relative pb-10 lg:gap-8 2xl:gap-14`}>
        <section className='text-center flex flex-col items-center gap-2 sm:items-start sm:text-left sm:gap-4'>
        <h2 className='title-font text-xl font-semibold text-darkBrown 2xl:text-3xl'>{category.toUpperCase()}</h2>
          <div className='w-full flex flex-col items-start xs:items-center sm:mt-0 sm:flex-row sm:justify-between 2xl:flex-col 2xl:items-start 2xl:gap-4 2xl:mt-0'>
            <div className='text-darkBrown space-y-2 xs:w-1/2 2xl:w-full'>
             <p className='text-lightOrange font-semibold'>{filteredRecipes.length} recipes</p>
              <p>Kick off your dining experience with our delectable selection of starters.</p>
            </div>
  
            <div className='w-full flex flex-col gap-2 mt-3 items-center xs:text-nowrap sm:items-start sm:w-fit sm:mt-0'>
              {/* <span className='text-gray font-semibold 2xl:text-sm'>price range</span> */}
              {
                isNaN(minPrice) ? (
                  <div className='w-full mt-5 flex gap-10 text-darkBrown sm:flex-col sm:gap-5 sm:mt-0 2xl:flex-row 2xl:gap-10'>
                    
                    <div>
                      <span className='text-lightOrange font-semibold text-lg text-sm'>Whole</span>
                      <div className='flex gap-2 font-semibold mt-1'>
                      <h3>₱{Math.min(...prices.map(({whole}) => whole)).toFixed(2)}</h3>-
                      <h3>₱{Math.max(...prices.map(({whole}) => whole)).toFixed(2)}</h3>
                      </div>
                    </div>

                    <div>
                      <span className='text-lightOrange font-semibold text-lg text-sm'>Half</span>
                      <div className='flex gap-2 font-semibold mt-1'>
                      <h3>₱{Math.min(...prices.map(({half}) => half)).toFixed(2)}</h3>-
                      <h3>₱{Math.max(...prices.map(({half}) => half)).toFixed(2)}</h3>
                      </div>
                    </div>

                  </div>) : <h3 className='text-lg font-semibold'>₱{minPrice.toFixed(2)} - ₱{maxPrice.toFixed(2)}</h3>
                
              }

              <button onClick={handleNavigate} className='hidden mx-auto mt-3 bg-lightOrange text-xs p-2 px-6 text-pureWhite rounded-md xs:block sm:mx-0 2xl:text-sm 2xl:px-8 2xl:py-3'>VIEW All</button>
            </div>
            </div>
          </section>
  
          {
             !!featuredProducts.length ?
             ( 
            <section className='flex flex-col items-center w-full mt-10 xs:mt-16 lg:mt-0 lg:items-start 2xl:items-between 2xl:flex-grow'>
            <span className='text-lightOrange font-semibold xs:text-base 2xl:text-xl'>Featured Products</span>
  
            <div className='mt-20 w-full flex flex-wrap gap-2 gap-y-16 justify-center lg:justify-start lg:gap-2 2xl:mt-28 2xl:gap-0 2xl:justify-between'>
              {featuredProducts}
            </div>
  
            <button onClick={handleNavigate} className='xs:hidden mt-8 bg-lightOrange text-xs lowercase p-2 px-6 text-pureWhite rounded-md'>VIEW All</button>
          </section>
             ) : <h2 className='text-lightOrange'>This section is Under Develelopment</h2>
          }
          
      </section>
    )
  }

  const FeaturedProduct = ({data}) => {
 
    const {recipes} = useAvailableRecipes();
    const {recipeName, price, image, category} = data;
     
    const navigate = useNavigate();

    const handleNavigate = ({target}) => {
      navigate(`${category}/${target.id}`);
    }

    return (
      <section className='bg-pureWhite border featured-product relative flex flex-col gap-2 relative border-gray rounded-2xl w-2/5 p-2 pt-16 items-center xs:gap-3 xs:p-3 xs:pt-16 2xl:pt-24 2xl:pb-8'>
        <div id={recipeName} onClick={handleNavigate} className='z-20 absolute inset-0 cursor-pointer'></div>
        <img className='aspect-1 object-cover absolute select-none top-0 -translate-y-1/2 w-4/5 rounded-full max-w-24 2xl:max-w-36' draggable={false} src={image} alt='' />
        
        <h3 className='flex justify-center mb-4 items-center z-10 font-semibold overflow-hidden relative text-center rounded-full dark-shadow p-2 px-3 text-xs text-lightOrange xs:px-4 sm:px-6 lg:px-3 sm:py-3 2xl:py-4 2xl:px-8'>{recipeName.toUpperCase()}</h3>
        {
          typeof price !== 'number' ? (
            <div className='w-full flex justify-center gap-5 text-xs text-left sm:text-sm 2xl:text-base 2xl:gap-14'>
              <div>
                <span className='font-semibold text-gray'>Whole</span>
                <h2 className='text-lightOrange'>₱
                {price.whole.toFixed(2)}</h2>
              </div>

              <div>
                <span className='font-semibold text-gray'>Half</span>
                <h2 className='text-lightOrange'>₱{price.half.toFixed(2)}</h2>
              </div>
            </div>) : <h2 className='font-semibold 2xl:text-xl'>₱{price.toFixed(2)}</h2>
          
        }

        
        {/* <h3 className='flex justify-center items-center z-10 font-semibold overflow-hidden relative text-center rounded-full dark-shadow p-2 px-4 text-xs text-lightOrange 2xl:py-3 2xl:px-6'>{recipeName.toUpperCase()}</h3> */}
      </section>
    )
  }

export default IndividualCategory;