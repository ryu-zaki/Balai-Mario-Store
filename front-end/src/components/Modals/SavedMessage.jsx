import React from 'react';
import style from './style.module.css'

const SavedMessage =  ({message, imgSrc, state, setState}) => {
  
  React.useEffect(() => {

    if (state) {

      const timeout = setTimeout(() => {
        
        setState(false)

      }, 2000)

      return () => clearTimeout(timeout);

    }

}, [state]);

    return (
        <div className={`${style.savedModal} transition-all duration-500 overflow-hidden px-4 py-2 flex gap-2 items-center dark-shadow text-lightOrange text-sm rounded-lg pl-6 bg-pureWhite fixed z-40 top-4 left-4 sm:top-6 sm:left-6 lg:font-semibold lg:left-10 lg:top-7`}>
          <h2>{message}</h2>
          <img className="w-6 lg:w-8" src={imgSrc} alt="" />
        </div>
    )
}


export default SavedMessage;