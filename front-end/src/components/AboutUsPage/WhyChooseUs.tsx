import React from 'react'
import mainImg from '../../assets/business_assets/about-reason-img.png'
import styles from './style.module.css'

function WhyChooseUs() {
  return (
    <div className='flex flex-col gap-5 md:flex-row md:items-center xl:w-11/12 xl:mx-auto'>
      <img className='md:max-w-96 lg:max-w-full lg:w-1/2' src={mainImg} alt="" />

      <div className='flex bottom-line flex-col gap-3 text-center items-center md:items-start md:text-left'>
        <p className='text-xs font-semibold text-lightOrange md:text-sm xl:text-base'>Why Choose Us</p>
        <h2 className='text-2xl font-bold sm:text-3xl sm:px-10 md:px-0 lg:text-4xl xl:text-5xl'>High Quality and affordable products</h2>
        <p className='text-sm leading-8 sm:text-base sm:leading-9 xl:mt-5 xl:text-lg xl:leading-8'>We pride ourselves on delivering the finest Filipino delicacies with a commitment to quality, authenticity, and exceptional customer service.</p>
      </div>
    </div>
  )
}

export default WhyChooseUs
