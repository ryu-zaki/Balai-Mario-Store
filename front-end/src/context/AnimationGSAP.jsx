import React, { createContext, useContext, useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import { useLocation } from 'react-router';

const ComponentContext = createContext(null);

const AnimationGSAP = ({children}) => {
    
    gsap.registerPlugin(ScrollTrigger);
    const matchMedia = gsap.matchMedia();

    const productSecMarkerRef = useRef(null);
    const {pathname} = useLocation();
    const bgTextRef = React.useRef(null);
    const footerRef = useRef(null);
    

    React.useEffect(() => {

        if (!!productSecMarkerRef.current) {
            gsap.to(productSecMarkerRef.current, {
                scrollTrigger: {
                   trigger: productSecMarkerRef.current,
                   start: '-50% 10%',
                   end: '-50% 10%',
                   scrub: 2
                },
                
                scale: 0
            })
        }

        
    }, [pathname]);

    return(
        <ComponentContext.Provider 
        value={{productSecMarkerRef, footerRef, bgTextRef}}
        >

          {children}
        </ComponentContext.Provider>
        
    )
}

export const useAnimationGSAP = () => {
    return useContext(ComponentContext);
}


export default AnimationGSAP;