import React from 'react'
import plusIcon from '../assets/materials/plus-icon.png';
import crossIcon from '../assets/materials/cross-icon.png';
import circleCross from '../assets/materials/x-mark.png'
import lockIcon from '../assets/materials/lock-icon.png';
import eyeSlash from '../assets/materials/eye-slash.png';
import eyeIcon from '../assets/materials/eye.png';
import googleIcon from '../assets/materials/google-icon-colored.png';

/* Icons */
import { useUserinfo } from '../context/UserInfo';
import useDataIdentifyer from '../custom_hooks/useDateIdentifyer';
import { useLogReg } from '../context/LogRegInfo';
import UserAvatar from './UserAvatar';

const AccountBox = ({ setActiveAcc, setModalVisible, user }) => {

  const calculatedTime = useDataIdentifyer(user.lastLogin);
  const [timePassed, setTimePassed] = React.useState(calculatedTime);

  React.useEffect(() => {

    setTimePassed(calculatedTime)
    const interval = setInterval(() => {
      setTimePassed(calculatedTime)
    }, 60000);

    return () => clearInterval(interval);

  }, [calculatedTime, user.lastLogin])
  
   
  const handleEnterPass = () => {
    setActiveAcc(user);
    setModalVisible(true);
  }
  


  return (
    <div className='w-full account-box border-lightGray border py-4 px-3 flex items-center justify-between rounded-lg relative sm:rounded-xl'>
      <div onClick={handleEnterPass} className='absolute inset-0 cursor-pointer z-10'></div>

      <span className='bg-lightOrange time-mess transition-all duration-500   absolute top-0 right-5 text-xxs p-1 px-3 rounded-md text-pureWhite sm:py-2 sm:opacity-0'>Last login {timePassed} ago</span>

      {
        !!user.isGoogle && (<p className='text-lightOrange absolute text-xs bottom-0  translate-y-1/2 right-3 scale-75 origin-right p-2 px-6 rounded-full bg-lighterOrange flex gap-1 items-center w-fit font-semibold'><p>Created using</p><img className='w-4' src={googleIcon} alt='' /></p>)
      }
      

      <div className='flex w-full items-center gap-2 sm:gap-5'>
       <UserAvatar noBorder={true} size={40} email={user.email} />


        <div className='text-xs max-w-full'>
          <h3 className='text-sm capitalize font-semibold sm:text-base transition-all duration-100'>{user.email.split('@')[0]}</h3>
          <p className='w-32 truncate xxs:w-44 sm:text-sm sm:w-60'>{user.email}</p>
        </div>

      </div>

      <img className='w-4 relative z-20 sm:w-6' src={circleCross} alt="" />
    </div>
  )
}


const AvailableAccounts = ({ setSendEmailOtp, setAvailableAccs, availableAccs, setViewMore, setOtpModalActive }) => {

  const storedUsers = !!localStorage.getItem("accs") ? JSON.parse(localStorage.getItem("accs")) : [];
  const { userGeneralInfo } = useUserinfo();
  const [users] = React.useState(storedUsers.filter(user => user.email !== userGeneralInfo.email));

  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeAcc, setActiveAcc] = React.useState({email: "", isGoogle: false});

  React.useEffect(() => {

    if (userGeneralInfo.email === activeAcc.email) {
      setAvailableAccs(false);
      setViewMore(false);
    }

  }, [userGeneralInfo.email, activeAcc.email])

  return (
    <>
      {availableAccs && <div onClick={() => setAvailableAccs(false)} className={`z-50 fixed ${modalVisible ? "bg-darkerOverlay  backdrop-blur-sm" : "bg-darkOverlay"} transition-all duration-500 inset-0`}></div>}
      {
        !modalVisible ? (
          <div className={`${!availableAccs && "scale-0 origin-top"} z-50 available-accounts rounded-2xl w-11/12 flex flex-col justify-center items-center transition-all duration-1000 bg-pureWhite fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-6 gap-5 px-4 xxs:w-80 sm:py-10 sm:px-10 sm:rounded-3xl`}>

            <img onClick={() => setAvailableAccs(false)} draggable={false} className='select-none cursor-pointer w-5 absolute top-3 right-3 sm:w-7 sm:top-4 sm:right-4' src={crossIcon} alt='' />

            <h2 className='text-xl font-semibold text-darkBrown sm:text-3xl sm:mb-3'>Available Accounts</h2>
            <div className='flex flex-col gap-6 w-full h-80 overflow-auto py-4 pr-1 sm:px-6'>
              {
                users.map((data, index) => {
                  return <AccountBox 
                   setActiveAcc={setActiveAcc} 
                   setModalVisible={setModalVisible} 
                   user={data} key={index} />
                })
              }
            </div>

            <button className='bg-lightOrange text-pureWhite flex gap-2 w-11/12 mt-3 justify-center items-center py-3 rounded-lg sm:py-4'><img src={plusIcon} alt='' /><span>New Account</span></button>
          </div>
        ) : ( activeAcc.isGoogle ? <GoogleConfirm setModalVisible={setModalVisible} email={activeAcc.email} /> : 
        
        <PasswordAuthModal 
        setAvailableAccs={setAvailableAccs}
          setOtpModalActive={setOtpModalActive}
          setSendEmailOtp={setSendEmailOtp} 
          activeAcc={activeAcc} 
          setModalVisible={setModalVisible} />)
      }

    </>
  )
}

const PasswordAuthModal = ({ setModalVisible, activeAcc, setSendEmailOtp, setOtpModalActive, setAvailableAccs }) => {

  const [passVisible, setPassVisible] = React.useState(false);
  const [passwordVal, setPasswordVal] = React.useState("");
  const { setLoginInfo, invalidLoginInfo, setPassLoginInfo, setInvalidLoginInfo } = useLogReg();

  const handleSwitchAccount = () => {
    if (!passwordVal) return;

    setLoginInfo({ "login-email": activeAcc.email, "login-password": passwordVal });
    setPassLoginInfo(true);
  };

  const handleGetInfo = ({target}) => {
    setPasswordVal(target.value);
    setInvalidLoginInfo(false);
  }

  const handleResetPass = () => {
    setSendEmailOtp(activeAcc.email);
    setOtpModalActive(true);
    setModalVisible(false); 
    setAvailableAccs(false);
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-pureWhite z-50 w-11/12 max-w-80 p-5 rounded-xl flex flex-col gap-7 md:max-w-96 md:p-10 md:rounded-2xl">
      <img onClick={() => setModalVisible(false)} className='absolute w-5 top-4 right-4 md:cursor-pointer' src={crossIcon} alt='' />
      <h2 className='text-xl font-bold md:text-2xl'>Enter Your Password</h2>

      <div className='flex flex-col gap-7'>
        <div className='flex gap-5 items-center'>
          <UserAvatar size={40} email={activeAcc.email} />


          <div className=''>
            <span className='text-xs text-lightOrange font-bold'>Customer Account</span>
            <h3 className=" font-bold">{activeAcc.email.split("@")[0]}</h3>
          </div>
        </div>


        <div>
        <label htmlFor='switch-pass' className='text-xs font-semibold'>password</label>
          
          <div className='flex items-center gap-5 mt-1'>
            <div className={`${invalidLoginInfo ? "border-2 border-red" : "border"} relative flex items-center h-10 w-full rounded-md`}>
              <span className={`${!invalidLoginInfo && "translate-x-10 opacity-0"} text-xs absolute -top-2 right-0 -translate-y-full font-bold text-red`}>*Incorrect</span>
              
              <img className='absolute z-10 left-2' src={lockIcon} alt='' />
              <input id={"switch-pass"} onChange={handleGetInfo} value={passwordVal} type={passVisible ? "text" : "password"} className='p-3 text-sm absolute inset-0 pl-9 outline-0 rounded-md' placeholder='Enter your password' />
            </div>

            <img onClick={() => setPassVisible(prev => !prev)} className='cursor-pointer w-6' src={passVisible ? eyeSlash : eyeIcon} alt='' />
          </div>
        </div>

        <div className='flex justify-between items-end'>
          <span onClick={handleResetPass} className='text-xs cursor-pointer font-semibold underline text-lightOrange'>Reset Password</span>

          <button onClick={handleSwitchAccount} className={`${!!passwordVal ? "bg-lightOrange" : "bg-lightGray cursor-not-allowed" } text-pureWhite py-2 px-5 text-sm rounded-md`}>Continue</button>
        </div>
      </div>
    </div>
  )
}



const GoogleConfirm = ({email, setModalVisible}) => {
  const { setLoginInfo, setPassGoogleLogin } = useLogReg();

  const handleLogin = () => {
    setLoginInfo(prev => ({
      ...prev,
      ["login-email"]: email
    }));
    setPassGoogleLogin(true);
  }
  
  return (
    <div className='fixed w-11/12 rounded-xl p-8 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pureWhite flex flex-col items-center max-w-80 md:max-w-96 md:rounded-2xl'>
       <div className='flex flex-col items-center gap-2'>
         <UserAvatar size={50} email={email} />
         <h3 className='text-xl font-semibold mt-2 md:text-2xl'>Login as</h3>
         <p className='text-sm md:text-base'>{email}?</p>
       </div>
      
      <div className='mt-8 text-xs flex gap-4 md:text-base'>
        <button onClick={() => setModalVisible(false)} className='py-2 px-6 text-lightOrange border border-lightOrange rounded-lg'>cancel</button>
        <button onClick={handleLogin} className="py-2 px-6 bg-lightOrange text-pureWhite rounded-lg">continue</button>
      </div>
    </div>
  )
}

export default AvailableAccounts
