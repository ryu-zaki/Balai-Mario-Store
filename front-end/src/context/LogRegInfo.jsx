import React, { createContext, useContext, useRef } from 'react';
import { useUserinfo } from './UserInfo';
import { useNavigate } from 'react-router';
import userAccsStore from '../custom_hooks/userAccsStore';

const ComponentContext = createContext(null);

const LogRegInfo = ({children}) => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = React.useState("");
    const [errModalVisible, setErrModalVisible] = React.useState(false);

    const [succMsg, setSuccMsg] = React.useState("");
    const [succSubMsg, setSuccSubMsg] = React.useState("");
    const [succModalVisible, setSuccModalVisible] = React.useState(false);
    const [accChangeMess, setAccChangeMess] = React.useState(false);

    React.useEffect(() => {
      
        const tl = setTimeout(() => {
            setSuccModalVisible(false);
          }, 2000);
    
          return () => clearTimeout(tl);

    }, [succModalVisible]);


    React.useEffect(() => {

      const tl = setTimeout(() => {
        setErrModalVisible(false);
      }, 1500);

      return () => clearTimeout(tl);

    }, [errModalVisible]);

    // Login Field
    const [loginInfo, setLoginInfo] = React.useState({
        "login-email": "", "login-password": ""
    });
    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [passLoginInfo, setPassLoginInfo] = React.useState(false);
    const [passGoogleLogin, setPassGoogleLogin] = React.useState(false);
    const {setIsLogin, setUserGeneralInfo, userGeneralInfo, isLogin, resetInfo} = useUserinfo();
    const [invalidLoginInfo, setInvalidLoginInfo] = React.useState(false);
    const loginEmailRef = React.useRef([]);
    const [loginLoading, setLoginLoading] = React.useState(false);
    
    console.log(loginInfo);
    React.useEffect(() => {
       
        if (passLoginInfo) {
            const {"login-email": email, "login-password": password} = loginInfo;

            setLoginLoading(true);
           
            fetch('http://localhost:2000/users/login', {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({email, password})
            })
            .then(data => data.json())
            .then(data => {
                if (data.status == "OK") {
                   setSuccMsg(data.message);
                   setSuccSubMsg("Enjoy and explore our platform!");
                   setSuccModalVisible(true);
                   setIsLogin(true);

                   localStorage.setItem("accessToken", data.accessToken);

                   setUserGeneralInfo(data.userData);
                   localStorage.setItem("accs", JSON.stringify(userAccsStore({email: data.userData.email, isGoogle: false})));
                   
                   setTimeout(() => {
                    setAccChangeMess(true);
                   }, 2000);
                   
                   return;
                }
                
                if (!isLogin) {
                    setErrMsg(data.message);
                    setErrModalVisible(true);
                }
                

                setInvalidLoginInfo(true);
                loginEmailRef.current.focus();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoginLoading(false);
            })

            setPassLoginInfo(false)
        }

    }, [passLoginInfo]);


    //Effect handler for google auth login
    React.useEffect(() => {
       console.log(loginInfo);
        if (passGoogleLogin) {
            fetch('http://localhost:2000/users/google-login', {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: loginInfo["login-email"]})
            })
            .then(async data => {
                try {
                    if (!data.ok) throw new Error("Server Error")
                    const {accessToken, userData} = await data.json();

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("accs", JSON.stringify(userAccsStore({email: userData.email, isGoogle: true})));
                    setSuccMsg("Successfully Login");
                    setSuccSubMsg("Enjoy and explore our platform!");
                    setSuccModalVisible(true);
                    setIsLogin(true);
 
                    setUserGeneralInfo(userData);
                    setTimeout(() => {
                        setAccChangeMess(true);
                       }, 2000);

                }

                catch(err) {
                    console.log(err);
                    setErrMsg("Internal Server Error");
                    setErrModalVisible(true);
                }
                
            })
            .finally(() => setPassGoogleLogin(false))
           
        }


    }, [passGoogleLogin, loginInfo["login-email"]])

    const getLoginInfo = ({target}) => {
        setInvalidLoginInfo(false);
        setLoginInfo(prev => ({
            ...prev,
            [target.id]: target.value
        }))

    }


    const [isLogoutTrigger, setIsLogoutTrigger] = React.useState(false);

    React.useEffect(() => {

        if (isLogoutTrigger) {
            fetch('http://localhost:2000/users/logout', {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(data => {
                
                if (data.ok) {
                    setIsLogin(false);
                    setSuccModalVisible(true);
                    setSuccMsg("Successfully logout");
                    setSuccSubMsg("Thank you for using our app");

                    localStorage.removeItem("accessToken");
                    localStorage.setItem("accs", JSON.stringify(userAccsStore({email: userGeneralInfo.email, isGoogle: false})));
                   
                    setConfirmModalVisible(false);
                    resetInfo(); //resets user information from the state
                    return;
                }

                setErrModalVisible(true);
                setErrMsg("Cannot Logout");
                
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLogoutTrigger(false)
            })
        }


    }, [isLogoutTrigger, setIsLogoutTrigger]);


    const handleLogout = () => {
        setIsLogoutTrigger(true);   
    }

    


    //Register Field
    const [registerInfo, setRegisterInfo] = React.useState({
        "register-email": "", 
        "register-password": "", 
        "confirm-password": ""
    });
    const [isInvalidRegPass, setIsInvalidRegPass] = React.useState(false);
    const [invalidRegEmail, setInvalidRegEmail] = React.useState(false);
    const regEmailRef = useRef();
    const regPassRef = useRef();
    const regConfirmReg = useRef();
    
    const [passRegInfo, setPassRegInfo] = React.useState(false);
    const resetRegInfo = () => {
        setRegisterInfo({
            "register-email": "", 
            "register-password": "", 
            "confirm-password": ""
        })
    }

    React.useEffect(() => {

        if (passRegInfo) {
            const {
                "register-email": email, 
                "register-password": password,
                "confirm-password": confirm
            } = registerInfo;

            if (password !== confirm) {
                setErrMsg("Passwords didn't matched");
                setErrModalVisible(true);
                
                regConfirmReg.current.focus();
                setIsInvalidRegPass(true)
            }
             else {
                fetch('http://localhost:2000/users/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, password})     
                })
                .then(data => data.json())
                .then(({message, status, category}) => {
                    if(status === "BAD") {

                        switch(category) {
                           case "email":
                            setInvalidRegEmail(true);
                            regEmailRef.current.focus();
                           break;

                           case "password":
                             setIsInvalidRegPass(true);
                             regPassRef.current.focus();
                           break;

                           default:
                        }
                        setErrModalVisible(true);
                        setErrMsg(message);

                    } else {
                        setSuccMsg(message);
                        setSuccSubMsg("You can now login your account.");
                        setSuccModalVisible(true);
                        navigate('/login');
                        resetRegInfo();
                        console.log(message)
                    }
                    
                })
                .catch(err => console.log(err));
             }
            
            setPassRegInfo(false);
        }

    }, [passRegInfo]);

    const getRegisterInfo = ({target}) => {

        switch(target.id) {
            case "confirm-password":
            case "register-password":
                setIsInvalidRegPass(false)
            break;

            case "register-email":
               setInvalidRegEmail(false)
            break;
            default:
        }
       
        setRegisterInfo(prev => ({
            ...prev,
            [target.id]: target.value
        }))

    }
    

    return (
    <ComponentContext.Provider value={{
        getLoginInfo, 
        setPassLoginInfo,
        getRegisterInfo, 
        setPassRegInfo,
        isInvalidRegPass,
        errModalVisible,
        errMsg,
        invalidRegEmail,
        regEmailRef,
        regPassRef,
        regConfirmReg,
        registerInfo,
        
        invalidLoginInfo, setInvalidLoginInfo,
        loginEmailRef,
        succModalVisible, succMsg, succSubMsg, loginLoading, handleLogout, confirmModalVisible, setConfirmModalVisible,
        setLoginInfo, setPassGoogleLogin, accChangeMess, setAccChangeMess
    }}>
     {
        children
     }
    </ComponentContext.Provider>
    )
}

export const useLogReg = () => {
    return useContext(ComponentContext);
}

export default LogRegInfo;