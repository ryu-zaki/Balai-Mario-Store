import React from 'react';
import SpecialEventImg from '../assets/business_assets/special-events.jpg';
import QualityFoodsImg from '../assets/business_assets/quality-foods.jpg';
import FoodServing from '../assets/business_assets/food-serving.jpg'
import QuoteSign from '../assets/materials/quote-sign.png';
import { useNavigate } from 'react-router';

const AboutUs = ({aboutUsRef, aboutUsSecActive}) => {

    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        
        if (aboutUsSecActive) {
            setTimeout(() => {
                setVisible(true);
            }, 1000);
        }

    }, [aboutUsSecActive]);

    return (
        <div className='about-us-section'>
         <div className='text-center'>
           <span className='text-sm mb-3'>OUR STORY</span>
           <h2 className='title-font responsive-title text-darkBrown'>About Us</h2>
         </div>

         <div className='about-grid-container mt-10 w-full xl:mt-16'>

            <div className='relative bg-lightOverlay cursor-pointer offers-min-height text-pureWhite flex justify-center rounded-xl overflow-hidden items-center about-card xl:overflow-visible'>
                <h3 className='text-sm xxs:text-base sm:text-xl md:text-2xl'>Special Events</h3>
                <img className='absolute object-cover  transition-all duration-500 -z-10 inset-0 w-full h-full xl:-translate-y-5 xl:translate-x-5 xl:rounded-xl' src={SpecialEventImg} alt='' />
            </div>

            <div className='relative about-card cursor-pointer bg-lightOverlay offers-min-height text-pureWhite flex justify-center rounded-xl overflow-hidden items-center xl:overflow-visible'>
                <h3 className='text-sm xxs:text-base sm:text-xl md:text-2xl'>Quality Foods</h3>
                <img className='absolute transition-all duration-500 object-cover -z-10 inset-0 w-full h-full xl:-translate-y-5 xl:translate-x-5 xl:rounded-xl' src={QualityFoodsImg} alt='' />
            </div>

            <div  ref={aboutUsRef} className={`${visible ? "overflow-visible" : "overflow-hidden"} delay-1000 about-us-desc p-6 py-16 pb-24 relative rounded-xl text-center text-pureWhite bg-lightOrange space-y-6 grid-col-span-2 flex flex-col items-center mb-10 xxs:px-6 lg:px-10 lg:text-left lg:items-start lg:space-y-8 lg:py-12 lg:mb-0 xl:py-12 xl:space-y-5 xl:px-12`}>
                <h3 className=' text-2xl font-bold sm:text-3xl xl:text-4xl'>Traditional and Modern</h3>
                <p className='text-sm xxs:text-base xl:leading-8'>We believe in the timeless value of traditional recipes. Each dish is a tribute to our roots, capturing the essence of time-honored cooking methods that have stood the test of time.</p>
                <button onClick={() => navigate('/about-us')} className='border-pureWhite button-scale-effect border-2 p-3 px-7 rounded-md text-pureWhite text-xs xxs:text-sm'>READ MORE</button>

                {/* Quote Message */}

                <div className={`${aboutUsSecActive && "active"} about-us-quote bg-pureWhite absolute border-lightOrange border rounded-xl w-11/12 text-darkBrown z-10 text-sm p-7 mx-auto bottom-0 xxs:text-base sm:w-4/5 lg:right-4 lg:w-60 lg:text-center xl:bottom-1/2 xl:-right-16 xl:text-base xl:p-8 xl:px-10 xl:w-72 xl:leading-8`}>
                    <img draggable={false} className='select-none absolute w-6 top-2 left-2 opacity-75 xl:w-7 xl:top-3 xl:left-3' src={QuoteSign} alt='' />
                    <p>Where Every Meal is a Family Affair: Come Dine with Us</p>                    
                </div>
            </div>

            <div className='relative grid-col-span-2 rounded-xl overflow-hidden'>
                <div className='absolute inset-0 bg-lightOverlay h-full w-full'></div>
                <img draggable={false} className='w-full select-none h-full object-cover' src={FoodServing} alt='' />
            </div>

         </div>
        </div>
    )
}

export default AboutUs;