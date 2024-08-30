import React from 'react'
import userIcon from '../../assets/icons/jhonwell.jpg';
import messIcon from '../../assets/admin_panel/message-icon.png';
import locationIcon from '../../assets/admin_panel/location-icon.png';
import phoneIcon from '../../assets/admin_panel/phone-icon.png';
import crossIcon from '../../assets/materials/cross-icon.png';
import style from './style.module.css';


function UserModal({setUserModalVisible}) {
  const [viewFull, setViewFull] = React.useState(false);


  return (
    <>
      {/* Overlay */}
      <div onClick={() => setUserModalVisible(false)} className={`${style.overlay} opacity-0 fixed inset-0 bg-imgOverlay z-50 w-full h-full`}></div>

      {/* Modal Card */}
      {
        viewFull ? 
        <FullInfo 
          setUserModalVisible={setUserModalVisible} 
          setViewFull={setViewFull} 
          /> : 
        <ShortInfo setUserModalVisible={setUserModalVisible} setViewFull={setViewFull} />
      }
    </>
  )
}

const ShortInfo = ({setUserModalVisible, setViewFull}) => {
    return (
        <div className={`${style["short_info--card"]} flex flex-col gap-10 fixed w-11/12 rounded-xl overflow-hidden top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-pureWhite z-50 pb-5 lg:gap-14`}>
          <div onClick={() => setUserModalVisible(false)} className='absolute z-10 p-1 top-2 right-2 cursor-pointer bg-pureWhite rounded-full lg:top-3 lg:right-3'><img width={15} src={crossIcon} alt='' /></div>
          
          <div className='flex justify-center bg-lightGray relative h-32 mb-8 border-pureWhite border-2 rounded-tl-2xl rounded-tr-2xl lg:border-4 lg:h-40'>

            <div className={`${style.user_profile} w-fit absolute bottom-0 translate-y-1/2`}>
              <img className='w-40 aspect-1 rounded-full border-2 border-pureWhite lg:w-36 lg:border-4' src={userIcon} alt='' />
            </div>
             
           </div>

           <div className='flex flex-col gap-7'>
             
             <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-semibold lg:text-3xl'>Jhonwell Espanola</h2>
                <p className='text-gray'>jhonwellespanola4@gmail.com</p>
                <div className='flex justify-center gap-2 mt-5'>
                    <button onClick={() => setViewFull(true)} className='border border-gray rounded-sm py-1 px-5'>Full Profile</button>
                    <button className='border border-gray rounded-sm py-1 px-4'><img width={25} src={messIcon} alt='' /></button>
                </div>
             </div>

             <div className={`${style.upper_line} flex flex-col relative pt-5 gap-5 w-4/5 mx-auto lg:pt-8`}>
                <div className='flex items-center gap-2'>
                    <img width={20} src={phoneIcon} alt=''/><p>09514406062</p>
                </div>
                <div className='flex items-center gap-2'>
                    <img width={20} src={locationIcon} alt=''/><p>Bagumbong, Caloocan City</p>
                </div>
             </div>

           </div>
        </div>
    )
}

const FullInfo = ({setUserModalVisible, setViewFull}) => {

    return (
        <div className={`${style["full_info--card"]} fixed w-11/12 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-pureWhite z-50 overflow-hidden rounded-xl flex flex-col gap-5`}>
          
          <div onClick={() => setViewFull(false)} className='absolute cursor-pointer z-10 p-1 top-2 right-2 bg-pureWhite rounded-full lg:top-3 lg:right-3'><img width={15} src={crossIcon} alt='' /></div>

          <div className='flex flex-col gap-12 lg:gap-3'>
            <div className='bg-lightGray h-20 border-2 border-pureWhite rounded-tr-xl rounded-tl-xl relative lg:h-28 lg:border-4'>
             <div className={`${style.user_profile} absolute bottom-0 translate-y-1/2 left-5 lg:left-10`}>
               <img className='w-20 border-2 border-pureWhite rounded-full lg:w-32 lg:border-4' src={userIcon} alt='' />
             </div>
           </div>

           <div className='pl-5 lg:pl-48'>
             <h2 className='text-lg font-semibold lg:text-3xl'>Jhonwell Espanola</h2>
             <p className="text-xs text-gray font-semibold lg:text-sm">jhonwellespanola4@gmail.com</p>
           </div>
          </div>
           

           <div className='px-5 relative pb-5 flex flex-col gap-5 items-center lg:w-full lg:px-10 lg:mt-2 lg:gap-7 lg:pb-10'>
          
             {/* Personal Details */}
             <div className='flex flex-col gap-3 lg:w-full lg:gap-5'>
               <UserInfoField label={"Name"} value={["Jhonwell", "Espanola"]} /> 
               <UserInfoField label={"Email"} value={"jhonwellespanola4@gmail.com"} /> 
               <UserInfoField label={"Phone"} value={"09514406062"} /> 
             </div> 
             
             {/* Shipping Informations */}
             <div className={`${style.upper_line} flex flex-col relative pt-5 gap-3 lg:w-full lg:gap-5 lg:pt-7`}>
               <UserInfoField label={"Street"} value={"Blk 50 Lt 9 Northville 2b, Bagumbong"} />
               <UserInfoField label={"Province"} value={"Metro Manila"} /> 
               <div className='flex gap-4'>
                 <UserInfoField label={"ZIP"} value={"4001"} /> 
                 <UserInfoField label={"City"} value={"Caloocan City"} />       
               </div>
             </div>

           </div>
        </div>
    )
}

const UserInfoField = ({label, value}) => {
  return (
    <div className='flex gap-2 text-sm items-center lg:text-base lg:gap-4'>
      <label>{label}</label>
      <input className='text-xs p-2 rounded-md border w-full lg:text-sm' value={Array.isArray(value) ?value[0] : value} />
      {
        label === "Name" && <input className='text-xs p-2 border w-full rounded-md lg:text-sm' value={value[1]} /> 
      }
    </div>
  )
}

export default UserModal
