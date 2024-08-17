import React from 'react';
import haloHalo from '../assets/products/halo-halo.jpg';
import servingCalamares from '../assets/business_assets/serving-calamares.jpg';
import quoteSign from '../assets/materials/quote-sign.png';

const BlogFeature = ({quoteRef, quoteVisible}) => {

    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {

        if (quoteVisible) {
            setTimeout(() => {
                setVisible(true)
            }, 1000)
        }

    }, [quoteVisible]);

    return (
        <div className='blog-feature-section my-32 flex flex-col items-center gap-8 lg:gap-20'>
            <span className='text-sm dark-shadow text-lightOrange p-3 px-8 rounded-full'>What's New?</span>

            <div ref={quoteRef} className='flex flex-col-reverse gap-10 md:flex-row lg:gap-16'>
                <div className={`${quoteVisible && "active"} flex flex-col gap-5 feature-blog-imgs xs:gap-10 sm:flex-row sm:gap-5 md:flex-col md:w-4/5 lg:gap-10 2xl:w-1/2`}>
                <div className='relative sm:flex-grow w-full'>
                  <img className='w-full h-full object-cover border-2 border-pureWhite' src={haloHalo} alt='' />
                </div>
                
                <div className='relative sm:flex-grow w-full'>
                  <img className='w-full h-full object-cover object-center border-2 border-pureWhite' src={servingCalamares} alt='' />
                </div>
                </div>

               <div className='flex flex-col gap-16 xs:gap-20 sm:gap-28  md:justify-between md:gap-10 md:flex-grow lg:gap-2 2xl:gap-0'>
                    
                <h2 className='title-font text-3xl text-center sm:text-5xl md:text-left md:text-5xl text-darkBrown md:pt-3 md:pr-40 lg:text-6xl lg:flex-grow 2xl:flex-shrink 2xl:text-5xl 2xl:pt-10'>Featuring Product</h2>
                

                <div className={`relative bg-lightOrange pt-16 p-5 text-pureWhite text-xs ${!visible && "overflow-hidden"} rounded-xl xxs:text-base xxs:p-7 xxs:pt-16 sm:pt-10 md:flex md:flex-col md:justify-end md:items-start lg:pt-16 lg:text-lg lg:p-9 lg:px-12`}>
                    <div className={`${quoteVisible && "active"} blog-quote-box text-xs left-4 right-4 p-5 px-7 bg-pureWhite absolute top-0 -translate-y-1/2 border border-lightOrange rounded-xl text-darkBrown xxs:left-auto xxs:w-2/3 xs:text-sm sm:-translate-y-3/4 sm:w-72 md:w-52 lg:w-72 lg:-translate-y-1/2 lg:text-base lg:p-7 2xl:text-base 2xl:w-80 2xl:pl-14 2xl:right-7 2xl:-translate-y-3/4`}>
                        <img className='w-4 absolute top-2 left-2 2xl:top-3 2xl:left-3 2xl:w-6' src={quoteSign} alt='' />
                        <p className='2xl:leading-8'>Receive the pleasure from the new product of Balai Mario</p>
                    </div>

                    <p className='leading-7 xs:leading-8 lg:leading-9'>Discover the new products at Balai Mario, expertly crafted with love and delightful ingredients to efficiently satisfy your cravings and needs.
                    </p>
                    <button className='mt-5 button-scale-effect border border-pureWhite p-3 rounded-lg px-8 md:text-sm 2xl:text-base 2xl:mt-8'>READ MORE</button>
                </div>
               </div>

            </div>
        </div>
    )
}

export default BlogFeature;