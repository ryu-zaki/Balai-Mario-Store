import React from 'react';
import emailIcon from '../../assets/materials/mail-orange.png';
import planeIcon from '../../assets/materials/paper-plane.png';
import gsap from 'gsap';
import style from './style.module.css';
import lockOrange from '../../assets/materials/lock-orange.png';
import lockIcon from '../../assets/materials/lock-icon.png';
import crossIcon  from '../../assets/materials/cross-icon.png';
import eyeIcon from '../../assets/materials/eye.png';
import eyeSlash from '../../assets/materials/eye-slash.png';
import { AnimatedCheckIcon } from '../ProductSection';
import { useUserinfo } from '../../context/UserInfo';
import { useLocation } from 'react-router';

const OtpModal = ({otpModalActive, setOtpModalActive, sendEmailOtp, setAlertCategory, setAlertMess, setAlertVisible, setSendEmailOtp}) => {
    
    const [loaderActive, setLoaderActive] = React.useState(false);
    const [validatorActive, setValidatorActive] = React.useState(false);
    const [newPassActive, setNewPassActive] = React.useState(false);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [invalidMess, setInvalidMess] = React.useState("");

    const handleCancel = () => {
        setNewPassActive(false);
        setOtpModalActive(false);
        setValidatorActive(false);
        setLoaderActive(false);
        localStorage.removeItem("otpToken")
    }

    const resendOtp = () => {
        setValidatorActive(false);
        setLoaderActive(true);
    }

    const handleSuccess = () => {
        setAlertCategory(true);
        setAlertMess("New Password Saved") 
        setAlertVisible(true);
    }

    return (
        <>
        {
            otpModalActive && <div onClick={handleCancel} className="fixed inset-0 bg-darkOverlay z-50"></div>
        }

          <div className={`fixed top-1/2 left-1/2 ${style.otp_modal} flex justify-center items-center -translate-y-1/2 w-11/12 p-5 rounded-xl min-h-52 -translate-x-1/2 bg-pureWhite z-50 ${!otpModalActive && "scale-0"} max-w-96 lg:py-8 lg:min-h-64`}>

          <img onClick={handleCancel} className="absolute cursor-pointer w-6 top-3 right-3" src={crossIcon} alt='' />

            {
                loaderActive ? <Loader 
                  sendEmailOtp={sendEmailOtp} 
                  setValidatorActive={setValidatorActive} 
                  loaderActive={loaderActive} 
                  setLoaderActive={setLoaderActive} 
                  setInvalidEmail={setInvalidEmail}
                  setInvalidMess={setInvalidMess}
                  /> : (
                
                    validatorActive ? 
                    (newPassActive ? 
                    <NewPasswordField 
                      handleSuccess={handleSuccess}
                      sendEmailOtp={sendEmailOtp}
                      handleCancel={handleCancel} /> : <OtpValidator 
                        resendOtp={resendOtp}
                        setNewPassActive={setNewPassActive} /> ) :
                    <Confirmation 
                      invalidMess={invalidMess}
                      setInvalidMess={setInvalidMess}
                      invalidEmail={invalidEmail} 
                      setInvalidEmail={setInvalidEmail} 
                      setSendEmailOtp={setSendEmailOtp} 
                      sendEmailOtp={sendEmailOtp} 
                      setLoaderActive={setLoaderActive} />)
            }
            
         </div>
        </>
    )
}

const Confirmation = ({setLoaderActive, sendEmailOtp, setSendEmailOtp, setInvalidEmail, invalidEmail, invalidMess, setInvalidMess}) => {

    const {pathname} = useLocation();

    const getInfo = ({target}) => {
        setSendEmailOtp(target.value);
        setInvalidEmail(false);
    }


    const hanldeEmailPass = () => {
        if (!/.*@.*/.test(sendEmailOtp)) {
            setInvalidEmail(true);
            setInvalidMess("Invalid Email");
            return;
        }

        setLoaderActive(true)
    }

    return (
        <div className={`confirmation_modal flex flex-col gap-5 items-center w-full`}>
            <div className="flex flex-col gap-2 items-center w-full">
              <div className='p-4 relative rounded-full w-fit mb-2 lg:p-5'>

               <div className={`${style.beat_anim} bg-lightOrange -z-10 rounded-full absolute inset-0 h-full w-full`}></div>

               <img className='lg:w-7' src={emailIcon} alt="" />
              </div>

              <h3 className="font-semibold xxs:text-xl lg:text-2xl">{pathname == "/login" ? "Enter your Email" : "We're about to send an OTP to"}</h3>

              {
                pathname == "/login" ? (
                <div className='relative w-full lg:w-4/5'>
                    { invalidEmail && <span className='absolute -top-1 left-2 text-red font-semibold text-xxs'>*{invalidMess}</span> }
                    <input onChange={getInfo} className={`${invalidEmail ? "border-2 border-red" : "border-gray border"} py-3 px-5 text-sm outline-0 mt-4 rounded-full w-full lg:text-base`} placeholder='Enter your email' />
                </div>
                    ) : (<p className="text-xs xxs:text-sm lg:text-base">{sendEmailOtp}</p>)
              }
               


            </div>
            
            <button onClick={hanldeEmailPass} className={`${style.send_otp} text-xs bg-lightOrange transition-all duration-300 py-2 px-6 rounded-md text-pureWhite w-fit xxs:text-sm lg:py-3 lg:px-8 hover:text-lightOrange hover:font-bold hover:bg-pureWhite`}>Send OTP</button>

        </div>
    )
}

const Loader = ({loaderActive, setLoaderActive, setValidatorActive, sendEmailOtp, setInvalidEmail, setInvalidMess}) => {

    React.useEffect(() => {
       console.log(loaderActive);
        if (loaderActive) {
            
            const accessToken = localStorage.getItem("accessToken");

            fetch('http://localhost:2000/users/send-otp', {
                method: "POST",
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: sendEmailOtp})
            })
            .then(({status}) => {

                switch(status) {

                    case 403: 
                      setInvalidMess("Account didn't registered.");
                      setInvalidEmail(true);
                    break;

                    case 401:
                      setInvalidMess("Cannot change the password");
                      setInvalidEmail(true);
                    break;

                    //status = 200
                    default: 
                    setValidatorActive(true);
                }
                
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoaderActive(false);  
            })


        }

    }, [loaderActive]);

    return (
      <div className="relative flex justify-center items-center">
       <img className="w-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" src={planeIcon} alt="" />

        <l-tail-chase
            size="60"
            speed="1.75"
            color="#c46e24" 
        ></l-tail-chase>
      </div>
    )
}


const OtpValidator = ({setNewPassActive, resendOtp}) => {

    const [isCorrect, setIsCorrect] = React.useState(null);
    const [loadingVerify, setLoadingVerify] = React.useState(false);

    React.useEffect(() => {

        if (isCorrect) {

            const tl = gsap.timeline({defaults: {duration: .4,  stagger: .1,}});

            tl.to('.otp-inputs > input', {
                translateY: -10,
                border: '2px solid green',
           })
           .to('.otp-inputs > input', {
               translateY: 0,
           })

          return;
        } 
        
        else if (isCorrect === false) {
            gsap.to('.otp-inputs > input', {
                duration: 0.1,
                x: 5,
                border: '2px solid red',
                repeat: 4,
                onComplete: () => gsap.set('.otp-inputs > input', { x: 0, border: '2px solid red' })
            })
        }  

        else {
            gsap.to('.otp-inputs > input', {
                duration: 0.1,
                border: '2px solid #bbb',
            })
        }

    }, [isCorrect])


    const [otpValues, setOtpValues] = React.useState(["", "", "", "", ""])

    const getInfo = ({target}) => {
        setIsCorrect(null);

        setOtpValues(prev => {
          const arr = [...prev];
          arr[target.id] = target.value
          return arr;
        })

        if (Number(target.id) < otpValues.length - 1 && !!target.value)
          target.nextElementSibling.focus();
    }

    React.useEffect(() => {

        const isFilled = otpValues.every(text => !!text);
//      

        if (isFilled) {
            
            // put some loader initiator here...
            setLoadingVerify(true);

            fetch('http://localhost:2000/users/verify-otp', {
                method: "POST",
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({otpToken: localStorage.getItem("otpToken"), enteredOtp: otpValues.join("")})
            })
            .then(data => {
                if (data.ok) {
                    setIsCorrect(true);
                    setTimeout(() => {
                        setNewPassActive(true);
                    }, 1700);
                    
                } else {
                    setIsCorrect(false);
                    setLoadingVerify(false);
                }
            })
        }

    }, [otpValues])

    return (
        <div className='flex relative flex-col items-center gap-4 text-center lg:p-3'>

            <h3 className="font-semibold text-lg xxs:text-xl lg:text-2xl">Enter Your OTP <br /> (One-Time Password)</h3>
            <p className="text-sm">Please check your inbox in your email account</p>

            <div className="grid grid-cols-5 gap-1 text-center otp-inputs lg:gap-2 lg:mt-3">
              
                {
                    otpValues.map((value, index) => {
                        return <input 
                          autoComplete='off'
                          readOnly={loadingVerify}
                          key={index} 
                          id={index} 
                          value={value} 
                          onChange={getInfo}
                          className="border border-lightGray rounded-md p-2 text-center lg:py-3" maxLength={1} placeholder="X" type="text" />
                    })
                }
            </div>

            <p className="text-xs mt-4">Didn't receive an email? <span onClick={resendOtp} className='text-lightOrange cursor-pointer underline font-semibold'>Resend OTP</span></p>

            <div className={`${!loadingVerify && "opacity-0"} flex text-sm text-lightOrange translate-y-full font-semibold absolute -bottom-0 gap-2 items-center`}>
              <span>verifying</span>
              <l-tail-chase
                 size="15"
                 speed="1.75"
                 color="#c46e24" 
              ></l-tail-chase>
            </div>
        </div>
    )

}

const NewPasswordField = ({handleCancel, sendEmailOtp, handleSuccess}) => {

    const [passVisible, setPassVisible] = React.useState(false);
    const [updatePass, setUpdatePass] = React.useState(false);
    const [newPass, setNewPass] = React.useState("");
    const [isChanged, setIsChanged] = React.useState(false);
    const [isWrongFormat, setIsWrongFormat] = React.useState(false);
    const [errMess, setErrMess] = React.useState("must be at least 6 characters long");

    const getInfo = ({target}) => {
        setNewPass(target.value);
        setIsWrongFormat(false);
    }

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {

        if (updatePass && !isLoading) {
           

            if (!newPass) {
                setErrMess("Cannot be empty");
                setIsWrongFormat(true)
                return;
            } 


            setIsLoading(true);

            fetch('http://localhost:2000/users/reset-pass', {
                method: "POST",
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: sendEmailOtp, newPass})
            })
            .then(data => {
                if (data.ok) {
                    setIsChanged(true);
                    setNewPass("");
                    setTimeout(() => {
                        //For cleaning the fields
                        handleCancel();

                        //For custom alerts Visibility
                        handleSuccess();
                    }, 1500)
                }

                else if (data.status === 403) {
                    setErrMess("must be at least 6 characters long")
                    setIsWrongFormat(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
                setUpdatePass(false);
            })
            
        }


    }, [updatePass, isLoading, newPass]);




    return (
       <div className='relative flex flex-col items-center gap-6 w-full px-2 xxs:px-6 lg:px-10'>
        
        <div className='flex flex-col items-center'>
        <div className={`p-3 flex justify-center items-center relative rounded-full ${isChanged ? "bg-pureWhite" : "bg-lighterOrange"} lg:p-5`}>
            <img className='w-7' src={lockOrange} alt='' />

            {isChanged && <AnimatedCheckIcon />}
         </div>
         <h2 className='font-semibold mt-3 xxs:text-lg lg:text-2xl'>Reset your password</h2>
        </div>
         

        <div className={`relative border-2 ${isWrongFormat ? "border-red" : "border-lightGray"} rounded-md w-full`}>
           <span className={`${!isWrongFormat && "opacity-0 -translate-x-10"} absolute text-xs font-semibold text-red -top-1 -translate-y-full`}>{errMess}*</span>
           <input value={newPass} onChange={getInfo} className={`${isWrongFormat && "bg-lightRed"} p-2 w-full rounded-md lg:p-3`} type={passVisible ? "text" : 'password'} placeholder='your new password' />

           <img onClick={() => setPassVisible(prev => !prev)} className='w-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 lg:w-6' src={passVisible ? eyeSlash : eyeIcon} alt='' />
         </div>

        
       
          
         <div className='flex text-sm gap-3'>
          <button onClick={handleCancel} className='border border-lightOrange py-2 px-6 rounded-md text-lightOrange'>cancel</button>

          <button onClick={() => !isLoading && setUpdatePass(true)} className='bg-lightOrange flex justify-center items-center text-pureWhite rounded-md py-2 px-6'>
            <span className={`${isLoading && "opacity-0"}`}>continue</span>
            
            {
                isLoading && (
                    <div className="absolute">
                    <l-tail-chase
                         size="18"
                         speed="1.75"
                         color="white" 
                      ></l-tail-chase>
                    </div>
                )
            }
           


          </button>
         </div>
         
       </div>
    )

}

export default OtpModal;