import React from 'react'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useLocation } from 'react-router';

function AnimationGSP_Admin({children}) {
   
  const {pathname} = useLocation();

  React.useEffect(() => {

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



  }, [pathname]);

  return (
   children
  )
}

export default AnimationGSP_Admin
