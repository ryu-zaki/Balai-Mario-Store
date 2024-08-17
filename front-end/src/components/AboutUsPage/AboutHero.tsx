import React from 'react'
import heroImg from '../../assets/business_assets/about-hero-img.png';
import styles from './style.module.css';

function AboutHero() {
  
  return (  
    <div className={`${styles.hero_container} flex flex-col gap-7 md:flex-row  md:gap-10 md:items-center md:pb-0 lg:items-center`}>
      <img className={`md:max-w-96 ${styles.hero_img}`} src={heroImg} alt='' />

      <div className='flex bottom-line flex-col gap-1 items-center text-center md:text-left md:items-start'>
        <h1 className='text-3xl font-bold sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl'>Who We Are</h1>
        <p className='text-sm text-lightOrange font-semibold sm:text-base md:text-sm lg:text-base xl:text-lg'>Learn More About us</p>

        <div className='mt-5 text-sm leading-7 sm:text-base sm:leading-8 md:text-sm md:leading-7 md:mt-3 lg:text-base lg:leading-8 xl:text-lg xl:leading-9 xl:mt-5'>
            We are passionate about bringing the rich and diverse flavors of the Philippines straight to your doorstep. Our curated selection of traditional treats, from sweat delicacies to savory snacks, celebrates the vibrant culinary heritage of the Philippines. 
        </div>
      </div>
    </div>
  )
}

export default AboutHero
