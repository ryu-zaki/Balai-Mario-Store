import React from 'react'
import gridImg2 from '../../assets/business_assets/about-grid-2.jpg';
import gridImg3 from '../../assets/business_assets/about-grid-4.jpg';
import gridImg4 from '../../assets/business_assets/about-grid-3.jpg';

import styles from './style.module.css';

function AboutCommitment() {
  const {img_overlay} = styles;
  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-5 md:gap-y-16 items-start xl:w-11/12 xl:mx-auto'>

      {/* Text Fielod */}
      <div className='flex flex-col gap-3 text-center bottom-line items-center md:col-span-2 md:text-left md:items-start md:w-4/5'>
        <p className='text-xs font-semibold text-lightOrange md:text-base xl:text-lg'>Our Commitment</p>
        <h2 className='text-2xl font-bold sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl'>Your trusted events place and reservation</h2>
        <p className='text-sm leading-7 sm:text-base sm:leading-8 sm:mt-3 md:text-sm md:leading-7 lg:text-base lg:leading-8 xl:text-lg xl:mt-5 xl:leading-9'>Welcome to Balai Mario, your premier destination for authentic Filipino delicacies! Our commitment to quality and authenticity ensures a delightful experience in every bite. </p>
      </div>

      <div className={`${styles.img_overlay} overflow-hidden rounded-2xl min-w-full md:h-full`}>
        <img className='min-w-full md:h-full md:object-cover' src={gridImg2} alt='' />
      </div>

      <div className={`${styles.img_overlay} overflow-hidden rounded-2xl md:col-span-2`}>
        <img className='w-full md:h-56 md:w-full md:object-cover lg:h-72 xl:h-80' src={gridImg3} alt='' />
      </div>

      <div className={`${styles.img_overlay} overflow-hidden rounded-2xl md:h-full`}>
        <img className='md:min-h-full md:object-cover' src={gridImg4} alt='' />
      </div>
  
    </div>
  )
}

export default AboutCommitment
