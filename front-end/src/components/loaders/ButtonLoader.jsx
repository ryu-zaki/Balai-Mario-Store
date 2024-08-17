import React from 'react';
import './style.css'

const ButtonLoader = () => {

    return (
        <div className="scale-75 absolute lg:scale-90 xl:scale-100">
        <div className="scale-50 loader"></div>
        </div>
    )
}

export default ButtonLoader;