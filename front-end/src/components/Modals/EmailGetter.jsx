import React from 'react';
import keysIcon from '../../assets/materials/keys-icon.png';
import userIcon from '../../assets/icons/jhonwell.jpg';
import planeIcon from '../../assets/materials/paper-plane-white.png';
import crossIcon from '../../assets/materials/cross-icon.png';
import emailIcon from '../../assets/materials/mail-orange.png';
import style from './style.module.css';
import crossIconSmall from '../../assets/materials/cross-20.png'


const EmailGetter = ({sendEmailOtp, setSendEmailOtp}) => {
   
    const getEmail = ({target}) => {
      setSendEmailOtp(target.value);
    }

    const [emailCapsule, setEmailCapsule] = React.useState(false);

    React.useEffect(() => {

        if (sendEmailOtp.endsWith(".com")) {
            setEmailCapsule(true);
        }

    }, [sendEmailOtp])

    return (
        <>
          <div className='fixed inset-0 w-full z-50 h-full bg-darkOverlay'></div>

          <div className={`${style.email_getter_modal} w-11/12 p-5 rounded-xl bg-pureWhite z-50 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-5 text-center xs:px-8 xs:py-7 xs:gap-8`}>

            <img className='w-5 absolute top-3 right-3 xs:w-6' src={crossIcon} alt='' />
            
            <div className='flex flex-col items-center gap-1 xs:px-5'>
                <img draggable={false} className='cursor-pointer w-14 xs:w-16 xl:w-20 xl:mb-2' src={keysIcon} alt='' />
                <h2 className='font-semibold text-xl xs:text-2xl xl:text-3xl'>Enter your email</h2>
                <p className='text-xs text-lightOrange xs:text-sm xl:text-base xl:mt-1'>Registered account that you want to reset the password</p>
            </div>
            
            <div className='flex flex-col gap-5 w-full xxs:max-w-80 xs:items-center xl:max-w-96'>
                {/* Email Capsule */}
                <div className={`border-2 relative p-2 border-lightGray rounded-full flex gap-3 items-center w-full xs:gap-3 xs:pr-5 ${!emailCapsule && "xl:w-11/12"} xl:pr-7 xl:gap-5`}>
                    {
                        emailCapsule && <img onClick={() => setEmailCapsule(false)} className='w-6 cursor-pointer rounded-full absolute top-0 right-1 p-1 bg-ash -translate-y-1/2 z-10' src={crossIconSmall} alt='' />
                    }
                    <img className={`w-11  rounded-full xl:w-14 ${!emailCapsule && "hidden"}`} src={/* userIcon */userIcon} alt='' />

                    <img className={`${emailCapsule && "hidden"} p-1 rounded-full xs:p-2`} src={/* userIcon */emailIcon} alt='' />

                    <div className={`${emailCapsule ? "flex" : "hidden"} text-left truncate flex-col w-full`}>
                        <p className=' font-semibold text-sm w-11/12 truncate xs:text-base xs:w-full xs:max-w-60 xl:max-w-72 xl:text-lg'>{sendEmailOtp}</p>
                        <span className='inline-block text-xs w-11/12 truncate xs:w-full xs:max-w-60 xl:max-w-80 xl:text-sm'>{sendEmailOtp}</span>
                    </div>

                    <input value={sendEmailOtp} onChange={getEmail} placeholder='Registered Email' className={`${emailCapsule && "hidden"} w-full outline-0 border-0 pr-2`} />
                </div>


                <button className='bg-lightOrange py-3 px-6 rounded-md text-pureWhite text-xs flex items-center gap-2 mx-auto xs:px-6 xs:py-3 xs:mt-2 xl:text-sm'>
                    <img className='w-4' src={planeIcon} alt='' />
                    <span>Send OTP</span>
                </button>

            </div>
          </div>
        </>
    )
}

export default EmailGetter;