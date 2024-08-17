import React from 'react';
import editIcon from '../../assets/materials/edit-icon.png';
import BasicInfo from './BasicInfo';
import crossIcon from '../../assets/materials/cross-icon.png';
import DeliveryInfo from './DeliveryInfo';
import { useUserinfo } from '../../context/UserInfo';

const Settings = ({settingsPrivacy, setSettingsPrivacy}) => {
    
    const [activeTab, setActiveTab] = React.useState("basicInformation");

    const tabs = {
        basicInformation: <BasicInfo />,
        deliveryInformation: <DeliveryInfo />
    }

    const handleTab = ({target}) => {
        setActiveTab(target.id)
    }

    return (
        <>
        {settingsPrivacy && <div onClick={() => setSettingsPrivacy(false)} className='bg-darkOverlay fixed inset-0 z-50'></div>}
        
        <div className={`${!settingsPrivacy && "scale-0 origin-top"} transition-all duration-1000 bg-pureWhite settings-privacy rounded-2xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-11/12 p-6 xxs:w-80 sm:p-8 lg:p-10`}>
          <img onClick={() => setSettingsPrivacy(false)} className='absolute cursor-pointer top-3 right-3 w-5 sm:w-7 lg:top-4 lg:right-4' src={crossIcon} alt='' />

          <h2 className='font-semibold text-xl mb-7 sm:text-3xl'>Settings & Privacy</h2>
          <div>
            <nav className='text-gray tabs flex gap-2 font-bold text-xs overflow-hidden border-b border-gray sm:text-sm'>
                <button id="basicInformation" onClick={handleTab} className={`py-2 px-6 ${activeTab === "basicInformation" && "active text-lightOrange"}  rounded-tl-md rounded-tr-md lg:px-8 lg:py-3`}>Basic Information</button>

                <button id="deliveryInformation" onClick={handleTab} className={`py-2 px-6 ${activeTab === "deliveryInformation" && "active text-lightOrange"}  rounded-tl-md rounded-tr-md lg:px-8 lg:py-3`}>Delivery Information</button>
            </nav>

            <div className='mt-7'>
             {tabs[activeTab]}
            </div>

          </div>
        </div>
        </>
    )
}

export const InputBox = ({data}) => {

    const {label, type, value, example} = data;

    return (
        <div className='settings-box'>
            <label className='text-sm font-semibold sm:text-base'>{label}</label>
            <div className='relative h-10 overflow-hidden rounded-md bg-ash mt-2 lg:h-12'>
                <input placeholder={`ex. ${example}`} id={type} className='px-2 text-xs absolute bg-transparent outline-0 border-0 inset-0 lg:text-sm lg:px-4' value={value}/>
                <img className='absolute w-5 cursor-pointer -translate-y-1/2 top-1/2 right-2 z-10' src={editIcon} alt='' />
            </div>
        </div>
    )
}

export default Settings;