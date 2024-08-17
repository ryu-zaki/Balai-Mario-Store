import React from 'react'
import successIcon from '../../assets/materials/success-icon.png';
import errIcon from '../../assets/materials/error-icon.png';

function CustomAlert({state, setState, category, message}) {

  //category = [true: "success", false: "fail"]
  
  React.useEffect(() => {

    if (state) {
        const timeout = setTimeout(() => {
            setState(false);
        }, 1700);

        return () => clearTimeout(timeout);
    }

  }, [state])
  //top-24 left-10 py-2 px-6 w-6
  return (
    <div className={`${!state && "-translate-x-full opacity-0"} transition-all duration-1000 top-16 py-2 px-5 bg-pureWhite font-semibold overflow-hidden rounded-md text-xs ${category ? "text-green" : "text-red"} left-5 fixed z-50 dark-shadow flex gap-3 items-center pl-10 sm:text-sm sm:p-3 sm:px-6 sm:pl-10 lg:left-10 lg:top-16 xl:top-24`}>

     <div className={`${category ? "bg-green" : "bg-red"} absolute top-0 bottom-0 left-0 w-4`}></div>
     <p>{message}</p>
     <img className='w-5 sm:w-6' src={category ? successIcon : errIcon} alt="" />
    </div>
  )
}

export default CustomAlert
