import React from 'react'
import userIcon from '../assets/icons/user-icon.png';
import style from './OrderHistory/style.module.css';
import Avatar from 'react-avatar';

function UserAvatar({size, email, noBorder}) {

  return (
   <div className={`${!noBorder && "user-icon"} aspect-1 relative flex items-center justify-center`}>
        <img className="absolute inset-0 object-cover z-10" src={userIcon} alt="" />

        <Avatar 
            className={`${style.remove_span} object-cover relative z-10`}
            color="rgba(0,0,0,0)"
            size={size}
            name={email}
            email={email} round={true} />
    </div>
  )
}

export default UserAvatar
