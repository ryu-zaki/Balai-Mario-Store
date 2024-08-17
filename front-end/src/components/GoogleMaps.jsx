import React, { memo, useRef } from "react";
import MapImg from '../assets/business_assets/map.png';
import googleMapsIcon from '../assets/materials/google-maps-icon.png';
import loadingIcon from '../assets/icons/map-loading-icon.json'

const GoogleMaps = () => {

  return (
    <div className="relative location-section w-full flex flex-col items-center gap-8 md:gap-12 ">
    
      <div className="text-center">
        <span className='text-sm mb-3'>GOOGLE MAPS</span>
        <h2 className="title-font responsive-title">Our Exact Location</h2>
      </div>
      
      <div className="border-2 rounded-2xl relative border-lightOrange overflow-hidden flex justify-center items-center google-map-con">
      <iframe  width="100%" height="100%" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Balai%20Mario-%20177%20Sta.%20Rosa%20Tagaytay%20Road,%20Pasong%20Langka,%20Silang,%20Cavite,%204118.+(Balai%20Mario)&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
      </div>
      <MapInfo display={"flex"} />
      
    </div>
  )
}

const MapInfo = ({display}) => {

  return (
<div className={`${display} flex-col items-center text-center text-lightOrange font-semibold text-sm gap-2 mt-5 mx-auto w-full lg:w-4/5`}>
  <div className="w-8 md:w-10">
  <img className="w-full w-full" src={googleMapsIcon} alt="" />
  </div>
  <p>177 Sta. Rosa Tagaytay Road, Pasong Langka, Silang, Cavite, 4118.</p>
</div>

  )
}

export default memo(GoogleMaps);