import React from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router';

function AnimationGSP_Admin({children}) {
   
  const {pathname} = useLocation();
  gsap.registerPlugin(ScrollTrigger);

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })

    
    const defaults = {
        duration: .8,
        stagger: .2,
        opacity: 1,
    }

    if (pathname == "/")
    gsap.to('.header-text', {
        ...defaults,
        translateX: 0,
       
    })

    gsap.to('.order-box', {
        ...defaults,
        translateY: 0,
        ease: 'bounce.out'
    })

    gsap.to('.triangle.orange', {
      ...defaults,
      scale: 1,
      delay: 1
    })
  
    const subTextDefaults = (className) => {

      return (
        {
          
      scrollTrigger: {
        trigger: className
      },
      delay: .2,
      translateX: 0,
      opacity: 1,
      duration: .7
        }
      )
      
    }
    gsap.to('.sub_text1', {
     ...subTextDefaults(".sub_text1"),
     delay: .2
    })

    gsap.to('.sub_text2', {
      ...subTextDefaults(".sub_text2"),
      delay: .4
    })

    gsap.to('.row_data', {
      scrollTrigger: ".row_data",
      delay: .2,
      translateX: 0,
      stagger: .2,
      opacity: 1
    });

    if (pathname === "/users") {
     
    /* Registered Boxes */
    const registeredDefaults = {
      duration: .6,
      translateX: 0,
      translateY: 0,
      scale: 1,
      opacity: 1,
      stagger: .2
    }

    gsap.to('.register_box', {
      ...registeredDefaults
    });

    gsap.to('.register_icon', {
      ...registeredDefaults,
      delay: .2,
    });

  }
  }, [pathname]);

  return (
   children
  )
}

export default AnimationGSP_Admin
