import React from 'react';
import eyeIcon from '../assets/materials/eye.png';
import eyeSlash from '../assets/materials/eye-slash.png';
import { useLocation, useNavigate } from 'react-router';
import { useLogReg } from '../context/LogRegInfo';

import {  GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import 'ldrs/tailChase'
import { useUserinfo } from '../context/UserInfo';
import ButtonLoader from './loaders/ButtonLoader';

const LogReg = ({setOtpModalActive}) => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
   

    React.useEffect(() => {
      
        window.scrollTo({
            top: 0,
        })

    }, []);

    
    return (
    <>
        
        
        <div className='logreg-main-container w-11/12 mx-auto xxs:w-4/5'>
           
          <div className={`${(pathname === "/register") && "register"} w-full relative mt-10 logreg-card flex justify-center items-center xl:mx-auto xl:mb-16 xl:overflow-hidden`}>
            {/* Description Overlay */}
            <div className={`hidden  logreg-desc ${(pathname === "/register") && "register"} xl:flex`}>
            </div>

            <div className='hidden z-20 w-full xl:flex'>
                
            <div className={`${(pathname === "/register") && "translate-x-1/2 opacity-0"} text-pureWhite  relative w-1/2 h-full flex justify-center items-center flex-col gap-4 transition-all duration-1000 px-10 text-center`}>
                    <h2 className='text-3xl font-semibold'>Join in our platform</h2>
                    <p>Create your account and start to explore the features of our online platform!</p>
                    <button onClick={() => navigate('/register')} className='border-2 border-pureWhite p-3 px-14 rounded-xl cursor-pointer relative z-20 mt-5 text-sm'>Register</button>
                </div>

                <div className={`${(pathname === "/login") && "-translate-x-1/2 opacity-0"} text-pureWhite relative w-1/2 h-full flex justify-center items-center flex-col gap-4 transition-all text-center px-14 duration-1000`}>
                    <h2 className='text-3xl font-semibold'>Login your account</h2>
                    <p>Login your registered email and continue browsing your favorite recipes.</p>
                    <button onClick={() => navigate('/login')} className='border-2 border-pureWhite p-3 px-14 rounded-xl cursor-pointer relative z-20 mt-5 text-sm'>Login</button>
                </div>

            </div>


             {/* Forms to be fill up */}
             <LoginForm setOtpModalActive={setOtpModalActive} pathname={pathname} />
             <RegisterForm pathname={pathname} />

          </div>




        </div>
        </>
    )
}

const LoginForm = ({pathname, setOtpModalActive}) => {

    const navigate = useNavigate();
    const {getLoginInfo, setPassLoginInfo, invalidLoginInfo, loginEmailRef, loginLoading, setLoginInfo, setPassGoogleLogin} = useLogReg();

    const [togglePass, setTogglePass] = React.useState(false);
    
    const handleLogin = (e) => {
        e.preventDefault();
        setPassLoginInfo(true);
    }

    const handleGoogleLogin = ({credential}) => {
        const {email} = jwtDecode(credential);
        
        setLoginInfo(prev => ({
            ...prev,
            "login-email": email,
        }))

        setPassGoogleLogin(true);
    }
    

    return (
        <form onSubmit={handleLogin} className={`${(pathname !== "/login") && "translate-x-full opacity-0"} absolute right-0 top-0 w-full bg-pureWhite flex flex-col gap-8 transition-all duration-1000 xl:w-1/2`}>
                <div className='text-center flex flex-col gap-2 relative'>
                  <h3 className='text-xl font-semibold xxs:text-2xl'>Login your account</h3>
                  <p className='text-sm font-semibold text-lightOrange'>New Online Platform</p> 
                </div>
               

                <div className='flex justify-center gap-2 recommend-logins'>
                   <GoogleLogin 
                     onSuccess={handleGoogleLogin}
                   />
                </div>

                <div className='relative account-divider'>
                    <p className='relative text-sm z-10 bg-pureWhite w-fit px-1 mx-auto'>Or use your account</p>
                </div>

               <div>

               <div className='flex flex-col gap-5'>
                   <div className={`${invalidLoginInfo && "border-red"} relative input-box w-full h-14 rounded-lg border`}>
                       <input 
                         ref={loginEmailRef}
                         onChange={getLoginInfo} 
                         required 
                         className={`rounded-lg relative border-0 z-10 pl-3 w-full h-full ${invalidLoginInfo && "focus:outline-red"}`} 
                         id="login-email" 
                         type='email' />

                       <label className='absolute text-gray opacity-75 transition-all duration-300 -translate-y-1/2 top-1/2 left-3' htmlFor='login-email'>Email</label>
                   </div>

                   <div className={`${invalidLoginInfo && "border-red"} relative input-box w-full h-14 rounded-lg border`}>
                       <img onClick={() => setTogglePass(prev => !prev)} className='w-5 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2' src={!togglePass ? eyeIcon : eyeSlash} alt='' />

                       <input
                       onChange={getLoginInfo} required className={` rounded-lg pl-3 w-full h-full ${invalidLoginInfo && "focus:outline-red"}`} id="login-password" type={togglePass ? "text" : 'password'} />
                       <label className='absolute text-gray opacity-75 transition-all duration-300 top-1/2 -translate-y-1/2 left-3' htmlFor='login-password'>Password</label>
                   </div>
                </div>

                <p onClick={() => setOtpModalActive(true)} className='mt-5 cursor-pointer underline text-lightOrange font-semibold text-sm'>Forgot Password</p>

               </div>
               
               <div className='xl:px-10'>
                 <button type="submit" className='bg-lightOrange w-full text-pureWhite relative py-3 flex justify-center items-center rounded-lg'>
                
                
                {
                    loginLoading && <ButtonLoader />
                }
                  
                <span className={`${loginLoading && "opacity-0"}`}>Login</span>
                
                 </button>
                 <p className='mt-2 text-xs sm:mt-6 sm:text-sm xl:hidden'>Already have an account? Try to <span onClick={() => navigate('/register')} className='text-lightOrange font-semibold cursor-pointer'>register</span></p>
               </div>
               
             </form>
    )
}

const RegisterForm = ({pathname}) => {
    
    const navigate = useNavigate();

    const { 
        getRegisterInfo, setPassRegInfo, 
        isInvalidRegPass, invalidRegEmail, 
        regEmailRef, regPassRef, 
        regConfirmReg, registerInfo } = useLogReg();

    const [togglePass, setTogglePass] = React.useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        setPassRegInfo(true)
    }

    return (
        <form onSubmit={handleRegister} className={`${(pathname !== "/register") && "-translate-x-full opacity-0"} absolute top-0 left-0  w-full bg-pureWhite flex flex-col gap-8 transition-all duration-1000 xl:w-1/2`}>
            <div className='text-center flex flex-col gap-2'>
              <h3 className='text-xl font-semibold xxs:text-2xl'>Register an account</h3>
              <p className='text-sm font-semibold text-lightOrange'>New Online Platform</p> 
            </div>
        

        

       <div>

       <div className='flex flex-col gap-10'>
           <div className={`${invalidRegEmail && "border-red"} input-box h-14 relative border rounded-lg`}>
               <input value={registerInfo["register-email"]} ref={regEmailRef} onChange={getRegisterInfo} required className={`pl-3 w-full h-full border-0 bg-transparent outline-0 rounded-lg focus:outline-2 ${invalidRegEmail && "focus:outline-red"}`} id="register-email" type='email' />
               <label className='absolute text-gray transition-all duration-300 left-3 top-1/2 -translate-y-1/2' htmlFor='register-email'>Email</label>
           </div>

           <div className={`input-box h-14 relative border rounded-lg ${isInvalidRegPass && "border-red"}`}>
               <input value={registerInfo["register-password"]} ref={regPassRef} onChange={getRegisterInfo} required className={`pl-3 w-full h-full rounded-lg bg-transparent focus:outline-2 ${isInvalidRegPass && "focus:outline-red"}`} id="register-password" type={togglePass ? "text" : 'password'} />
               <label className='absolute text-gray transition-all duration-300 left-3 top-1/2 -translate-y-1/2' htmlFor='register-password'>Password</label>
           </div>

           <div className={`input-box h-14 relative border rounded-lg ${isInvalidRegPass && "border-red"}`}>
               <input value={registerInfo["confirm-password"]} ref={regConfirmReg} onChange={getRegisterInfo} required className={`border-0 outline-0 pl-3 w-full h-full bg-transparent rounded-lg focus:outline-2 ${isInvalidRegPass && "focus:outline-red"}`} id="confirm-password" type={togglePass ? "text" : 'password'} />

               <label className='absolute text-gray  transition-all duration-300 left-3 top-1/2 -translate-y-1/2' htmlFor='confirm-password'>Confirm Password</label>
           </div>
        </div>

        <div className='relative text-sm items-center flex gap-2 w-fit mt-5'>
            <div onClick={() => setTogglePass(prev => !prev)} className='absolute inset-0 cursor-pointer'></div>
            <p>{togglePass ? "Hide" : "Show"} Password</p>
            <img className='w-5' src={!togglePass ? eyeIcon : eyeSlash} alt='' />
        </div>

       </div>

       <div className='xl:px-10'>
            <button type='submit' className='bg-lightOrange w-full   text-pureWhite py-3 rounded-lg'>Register</button>
            <p className='mt-2 text-xs sm:mt-6 sm:text-sm xl:hidden'>Dont have an account? Try to <span onClick={() => navigate('/login')} className='text-lightOrange font-semibold cursor-pointer'>login</span></p>
        </div>
        
     </form>
    )
}

export default LogReg