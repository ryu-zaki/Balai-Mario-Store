import userIcon from '../assets/materials/user-dark.png';
import React from "react";


/* Icons */
import facebookLight from '../assets/materials/facebook-light-outline.png';
import instagramLight from '../assets/materials/instagram-light-outline.png';
import tiktokLight from '../assets/materials/tiktok-light-outline.png';

import mailIcon from '../assets/materials/mail-light-outline.png';
import phoneIcon from '../assets/materials/phone-light-outline.png';
import pinIcon from '../assets/materials/pin-light-outline.png';
import { useAnimationGSAP } from '../context/AnimationGSAP';


const Footer = () => {
    const {footerRef} = useAnimationGSAP();
    return (
        <footer ref={footerRef} className="bg-lightOrange text-pureWhite p-8 flex flex-col gap-10 items-center lg:p-16 lg:pb-8 xl:gap-14">

           {/* Navigations */}
           <section className="flex flex-col gap-8 items-center text-center md:flex-row md:items-start md:text-left md:w-full md:justify-between">
              <section>
                
                <h3 className="font-semibold mb-3 xs:text-lg md:text-sm md:mb-5 xl:text-lg xl:mb-7">ADDRESS</h3>

                <ul className="flex max-w-96 flex-col gap-4 text-sm items-center xs:text-base md:items-start md:text-sm lg:text-base xl:gap-5">
                    <li className='flex flex-col items-center gap-1 xs:gap-3 md:flex-row xl:gap-4'>
                        <img className='w-8' src={mailIcon} alt="" />
                        <span>balaimariosilang@gmail.com
</span>
                    </li>

                    <li className='flex flex-col items-center gap-1 xs:gap-3  md:flex-row xl:gap-4'>
                        <img className='w-8' src={phoneIcon} alt="" />
                        <span>+46 23 051 42</span>
                    </li>

                    <li className='flex flex-col items-center gap-1 xs:gap-3 md:flex-row xl:gap-4'>
                        <img className='w-8' src={pinIcon} alt="" />
                        <span>177, Sta. Rosa Tagaytay Road, Pasong Langka,, Silang, Philippines, 4118</span>
                    </li>
                </ul>

              </section>

              <section>
                <h3 className="font-semibold mb-2 xs:text-lg md:text-sm md:mb-5 xl:text-lg xl:mb-7">INFORMATION</h3>

                <ul className="space-y-2 text-sm xl:text-base xl:space-y-4">
                    <li><a href="/">About us</a></li>
                    <li><a href="/">Services</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Products</a></li>
                </ul>
              </section>


              <section>
                <h3 className="font-semibold mb-2 md:text-sm md:mb-5 xl:text-lg xl:mb-7">NEWS LETTER</h3>

                <div className='flex max-w-80 flex-col gap-2 items-center md:items-start xl:max-w-96'>
                    <p className='text-sm xl:text-base'>Subscribe to our newsletter to stay updated about balai mario</p>

                    <div className="flex rounded-md w-auto overflow-hidden mt-3 xl:w-4/5">
                        <input type='email' className="p-3 border-0 outline-0 text-sm text-darkBrown bg-white md:text-xs xl:text-sm flex-grow" placeholder="Your email" />
                        <button className="flex-grow border-l border-lightOrange text-xs text-lightOrange font-semibold bg-pureWhite p-2 px-3 xl:text-sm">subscribe</button>
                    </div>

                    <div className="flex gap-2 mt-2 justify-center xl:gap-5 xl:mt-4">
                        <img className='w-8' src={facebookLight} alt="" />
                        <img className='w-8' src={instagramLight} alt="" />
                        <img className='w-8' src={tiktokLight} alt="" />
                    </div>
                </div>
              </section>
           </section>

           {/* Ending phrase */}
           <section className='text-sm xl:text-base xl:self-s'>
             <p>&copy;2024. All Rights Reserved</p>
           </section>
        </footer>
    )
}

export default Footer;