import React from 'react';
import userIcon from '../assets/materials/user-orange.png';

const AccountChangeModal = ({email, state, setState}) => {

    React.useEffect(() => {

        if (state) {
          const timeout = setTimeout(() => {
            setState(false)
          }, 2000);

          return () => clearTimeout(timeout)
        }

    }, [state])

    return (
        <div className={`${!state && "opacity-0 -translate-x-1/2"} transition-all duration-1000 fixed modal-leftLine flex gap-2 select-none items-center text-lightOrange dark-shadow rounded-md py-2 px-3 overflow-hidden bg-pureWhite z-50 top-20 text-xs left-5 pl-5 sm:text-sm font-semibold sm:px-5 sm:py-3 sm:pl-7 sm:left-10 sm:rounded-lg sm:gap-4`}>
          <h2>Logged in as <span>{email}</span></h2>
          <img className='w-6 border-2 rounded-full sm:w-7' src={userIcon} alt='' />
        </div>
    )
}

export default AccountChangeModal;