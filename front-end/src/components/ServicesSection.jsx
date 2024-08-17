import React from 'react';

/* Services Icons */
import qualityFood from '../assets/materials/quality-food.png';
import ingredients from '../assets/materials/ingredients.png';
import customerService from '../assets/materials/customer-service.png';
import affordable from '../assets/materials/money-dark.png';
import amazingPlace from '../assets/materials/place-dark.png';

import serving from '../assets/business_assets/servicing.jpg';

const ServicesSection = ({servicesRef, servicesSecActive}) => {


    const ServiceBox = ({category, imgSrc, isSeperated, description}) => {

        return (
            <div className={`flex relative z-20 items-center gap-7 flex-col xs:flex-row xs:items-start`}>
 
              <div className={`mt-3 min-w-14 h-14 ${!!isSeperated && "bg-pureWhite border  p-3 rounded-full"} xl:min-w-16 xl:h-auto`}>
                <img draggable={false} className={`w-full h-full object-cover`} src={imgSrc} alt='' />
              </div>
                
              <div className='flex flex-col items-center text-center xs:items-start xs:text-left'>
                  <h3 className={`text-xl relative service-title  w-fit font-semibold sm:text-2xl lg:text-xl xl:text-2xl ${!!isSeperated ? "mb-3" : "mb-7"}`}>{category}</h3>
                  <p className='text-xs xxs:text-sm leading-8 sm:text-base sm:leading-8 lg:text-sm xl:text-base xl:leading-9'>{description}</p>
              </div>
             </div>
        )
    }


    return (
        <div className='text-darkBrown'>

            <div className='text-center mb-10 sm:mb-20 lg:mb-28'>
                <span className='text-sm mb-3'>FEATURES</span>
                <h2 className='title-font responsive-title'>What to Expect</h2>
            </div>

            <div ref={servicesRef} className={`${!!servicesSecActive && "active"} flex relative services-main-con flex-col gap-32 sm:gap-52 lg:flex-row lg:gap-10 lg:items-start xl:gap-6`}>

               

                <div className='flex flex-col services-con-left gap-10 sm:px-14 sm:gap-16 lg:gap-14 xl:px-16'>
                    {/* Box */}
                     <ServiceBox 
                       description={"Our curated menu features a rich array of traditional dishes, each crafted with fresh, high-quality ingredients"} category={"Quality Food"} imgSrc={qualityFood} />
                     
                     <ServiceBox
                       description={"Balai Mario takes pride in using the freshest, locally-sourced ingredients to bring you the authentic flavors of the Philippines."}
                       category={"Ingredients"} 
                       imgSrc={ingredients} />

                     <ServiceBox 
                       description={"From easy online ordering to efficient delivery, the service is characterized by clear communication, timely responses to inquiries, and personalized recommendations."}
                       category={"Customer Service"} 
                       imgSrc={customerService} />
                       
                    {/* Box */}
                </div>

                <div className='seperated-feature flex flex-col gap-10  pl-10 text-pureWhite relative pt-24 pb-10 sm:gap-16 sm:pt-32 sm:pb-20 sm:px-14 lg:px-14 lg:pt-24 lg:pb-10 xl:pt-32'>

                  
                  {/* Overlay */}
               <div className='feature-overlay z-10 absolute bg-lightOrange bottom-0 -right-7 xl:-right-16'>
                 
                 {/* Picture */}
                 <div className='absolute z-20'>
                    <div className='flip-card'> 
                      {/* Front */}
                      <div className='front__side absolute inset-0 h-full w-full'>
                       <img className='absolute -z-10 inset-0 w-full h-full object-cover' src={serving} alt=''/>
                      </div>

                      {/* Back */}
                      <div className='back__side absolute inset-0 bg-lightOrange flex flex-col gap-4 justify-center items-center'>
                       <p className='text-lg text-center'>We are happy to <br /> serve you &#129392;</p>
                      </div>
                    </div>
                    

                 </div>

               </div>


                  <ServiceBox description={"We prioritize quality and value, ensuring every meal is a delightful and budget-friendly experience."} isSeperated={true} category={"Affordable"} imgSrc={affordable} />
                  <ServiceBox description={"Filled with tastefully decorative furniture and a delightful atmosphere, our restaurant offers the perfect setting to enjoy our exquisite Filipino cuisine."} isSeperated={true} category={"Amazing Place"} imgSrc={amazingPlace} />
                </div>
            </div>

        </div>
    )
}

export default ServicesSection;