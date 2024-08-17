import React from 'react';
import UserAvatar from '../UserAvatar';
import { basic_info, shipping_info } from './FieldsInfo';
import chevronIcon from '../../assets/materials/chevron-down.png';
import checkIcon from '../../assets/materials/check-white.png';
import lockIcon from '../../assets/materials/lock-icon.png';
import saveIcon from '../../assets/materials/save-white.png';
import style from './style.module.css';
import { useMatchMedia } from '../../custom_hooks/useMatchMedia';
import { useUserinfo } from '../../context/UserInfo';
import CustomAlert from '../Modals/CustomAlert';

const SettingsPage = () => {

    const {userGeneralInfo} = useUserinfo();
    const {lastModified} = userGeneralInfo.saveInfo;
    const modifiedDate = new Date(lastModified);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

    const modifiedFormatted = `${months[modifiedDate.getMonth()]} ${modifiedDate.getDate()}, ${modifiedDate.getFullYear()}`;
      
    const [isInfoChanged, setIsInfoChange] = React.useState(false);
    
    const [editableInfo, setEditableInfo] = React.useState({
        personalInfo: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        shippingInfo: {
            streetAddress: "",
            province: "",
            city: '',
            zip: ""
        }
    });
    //console.log(userGeneralInfo.saveInfo)
    React.useEffect(() => {
      
        setEditableInfo(userGeneralInfo.saveInfo);

    }, [userGeneralInfo.saveInfo])

    React.useEffect(() => {
       
        let changeValidator = false;

        for (let i in editableInfo) {
          for (let x in editableInfo[i]) {

             if (!(editableInfo[i][x].trim() === userGeneralInfo.saveInfo[i][x].trim())) {
                changeValidator = true;
                
             } 
          }
        }

        setIsInfoChange(changeValidator);

    }, [editableInfo, userGeneralInfo.saveInfo, setIsInfoChange]);

    console.log(editableInfo);
    const getInfo = (category, target) => {

        setEditableInfo(prev => {
            return ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [target.id]: target.value
                }
        })
        })

    }

    const [activePage, setActivePage] = React.useState("personal");
    const getPage = ({target}) => {
        setActivePage(target.id);
    };


    //Alert Message
    const [alertModalVisible, setAlertModalVisible] = React.useState(false);
    const [alertCategory, setAlertCategory] = React.useState(true);
    const [alertMessage, setAlertMessage] = React.useState("");
     
    return (
        <>
        <CustomAlert 
          setState={setAlertModalVisible}
          state={alertModalVisible}
          category={alertCategory}
          message={alertMessage}
          />
        <div className={`${style.setting_page} mx-5 text-dark flex flex-col gap-12 mb-16 xs:items-center xs:gap-16 md:mx-10 lg:mx-auto xl:mb-32`}>
           <div className='flex flex-col w-full gap-10'>
             <HeaderSection />
             <PageControls activePage={activePage} getPage={getPage} />
           </div>


           <div className='w-full flex flex-col gap-4 xs:gap-14 2xl:mt-5'>

           <div className='w-full sm:hidden'>
                {
                    activePage === "personal" ? 
                    <InfoPage
                    getInfo={getInfo}
                      category={"personalInfo"} 
                      info={editableInfo.personalInfo} 
                      list={basic_info} /> : 
                      
                    <InfoPage 
                    getInfo={getInfo}
                      category={"shippingInfo"}
                      info={editableInfo.shippingInfo} 
                      list={shipping_info} />
                }
            </div>

            <div className='hidden sm:grid sm:grid-cols-2 sm:gap-6 text-gray'>
              
              <div className='xl:border xl:border-lightGray xl:p-7 xl:rounded-xl 2xl:p-10'>
                <h2 className='text-xl font-semibold mb-7 2xl:text-2xl 2xl:mb-10'>Basic Information</h2>
                <InfoPage 
                   getInfo={getInfo}
                  category={"personalInfo"}
                  info={editableInfo.personalInfo}  
                  list={basic_info} /> 
              </div>
              
              <div className='xl:border xl:border-lightGray xl:p-7 xl:rounded-xl 2xl:p-10'>
                <h2 className='text-xl font-semibold mb-7 2xl:text-2xl 2xl:mb-10'>Shipping Information</h2>
               <InfoPage
                  getInfo={getInfo}
                 category={"shippingInfo"} 
                 info={editableInfo.shippingInfo} 
                 list={shipping_info} />
              </div>
              
            </div>

           <ControlButtons
             lastModified={modifiedFormatted}
             setAlertModalVisible={setAlertModalVisible}
             setAlertMessage={setAlertMessage}
             setAlertCategory={setAlertCategory}

             editableInfo={editableInfo} 
             isInfoChanged={isInfoChanged} />
           </div>
            
        </div>
        </>
    )
}

const HeaderSection = () => {

    const isSmallScreen = useMatchMedia('(min-width: 620px)');


    return (
        <div className={'sm:flex sm:flex-col sm:items-center sm:gap-10 md:mt-10 md:flex-row md:items-start'}>
            <div className='xs:text-center sm:w-full md:text-left'>
                <h2 className='text-xl font-semibold xs:text-2xl xs:mb-1 sm:text-4xl 2xl:text-5xl'>Account Settings</h2>
                <p className='text-sm text-lightOrange 2xl:text-base 2xl:mt-1'>Manage and modify your personal info</p>
            </div>

            <div className='flex flex-col gap-5 items-center relative mt-20 sm:flex-row sm:w-fit sm:px-5 sm:py-3 sm:border sm:border-lightGray sm:mt-0 sm:rounded-md sm:pb-7 sm:justify-center md:pb-3 md:pt-4 2xl:px-8'>
                <UserAvatar size={isSmallScreen ? 45 : 70} email="jhonwellespanola4@gmail.com" />

                <div className='text-center sm:text-left'>
                    <span className='text-lightOrange sm:hidden'>Customer Account</span>
                    <h3 className='text-2xl font-semibold xs:text-3xl sm:text-base 2xl:text-lg'>Jhonwell Espanola</h3>
                    <p className='text-gray text-sm sm:text-xs 2xl:text-sm'>jhonwellespanola4@gmail.com</p>
                </div>

                <span className={`${style.member_date} text-xxs py-2 font-semibold px-4 text-pureWhite bg-lightOrange rounded-md sm:absolute sm:bottom-0 sm:translate-y-1/2 md:bottom-auto md:top-0 md:-translate-y-1/2 md:right-3`}>Member since June 22, 2024</span>
            </div>
        </div>
    )
}

const PageControls = ({getPage, activePage}) => {

    
    return (
        <div className={`${style.page_controls} bg-whitepure dark-shadow text-xs relative rounded-full justify-center items-center text-center py-3 flex w-11/12 mx-auto max-w-80 xxs:text-sm xxs:py-4 xs:max-w-96 xs:w-full sm:hidden`}>
            <p onClick={getPage} id="personal" className={`transition-all duration-300 w-full relative z-10 ${activePage === "personal" && "text-pureWhite"}`}>Personal</p>
            <p onClick={getPage} id="delivery" className={`w-full relative z-10 transition-all duration-300 ${activePage === "delivery" && "text-pureWhite"}`}>Delivery</p>
            
            {/* Animated circular background */}
            <div className={`${style.circular_bg} left-2 transition-all duration-700 ease-in-out absolute rounded-full ${activePage === "delivery" && `translate-x-full ${style.delivery}`} h-4/5 bg-lightOrange`}></div>
        </div>
    )
}

const InfoPage = ({list, info, category, getInfo}) => {
    
    
    const handleInfo = ({target}) => {
        target.focus();
        getInfo(category, target)
       
    }

    return (
        <div className='grid grid-cols-1 gap-6 text-gray xs:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 2xl:gap-y-8'>
            {
                list.map((data, index) => <InfoBox handleInfo={handleInfo} value={info[data.type]} data={data} key={index} />)
            }
        </div>
    )
}

const InfoBox = ({data, value, handleInfo}) => {
    const {label, example, type} = data;
    
  
    return (
        <div className='flex flex-col gap-2 w-full'>
            <label className='text-sm font-semibold'>{label}</label>
            <input onChange={handleInfo} id={type} className='border text-sm border-lightGray w-full rounded-md py-3 px-3' placeholder={example} value={value} />
        </div>
    )
}

const ControlButtons = ({isInfoChanged, editableInfo, setAlertModalVisible, setAlertMessage, setAlertCategory, lastModified}) => {

    const {updateSaveInfo} = useUserinfo();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInfoPass = () => {
    
       if (!isInfoChanged) return;

       setIsLoading(true);

        fetch('http://localhost:2000/users/update-info', {
            method: "POST",
            credentials: 'include',
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...editableInfo, lastModified: new Date()})
        })
        .then(({status}) => {

            if (status === 200)
            updateSaveInfo(editableInfo)
            setAlertCategory(true);
            setAlertMessage("Information Updated.")
        })
        .catch(err => {
            console.log(err);
            setAlertCategory(false);
            setAlertMessage(err.message)
        })
        .finally(() => {
            setAlertModalVisible(true);
            setIsLoading(false);

            window.scrollTo({
                top: 0
            })
        })
    }

   

    return (
        <div className='flex flex-col gap-4 xxs:gap-2 sm:flex-row sm:justify-between sm:items-center'>

            <span className='font-semibold italic text-sm text-gray 2xl:text-base 2xl:t'>Last modified: {lastModified}</span>

            {/* Reset and Pass */}
            <div className='flex mt-7 gap-4 text-xs flex-col-reverse items-start xxs:flex-row xs:text-smsm:justify-end xxs:mt-3 2xl:gap-6'>

                <button className='flex border border-lightGray py-2 px-3 rounded-md gap-2 items-center xs:py-3 xs:px-5'>
                    <img className='w-5' src={lockIcon} alt='' />
                    <span>Reset your password</span>
                </button>

                <button className={`${!isInfoChanged ? "cursor-not-allowed bg-lightGray" : "bg-lightOrange"} flex gap-2 py-2 relative px-3 justify-center text-pureWhite rounded-md items-center xs:py-3 xs:px-5`}>

                    {
                        !isLoading && (
                          <div onClick={handleInfoPass} className='absolute inset-0 z-10'></div>

                        )
                    }
                    <img className={`w-5 ${isLoading && "opacity-0"}`} src={saveIcon} alt='' />
                    <span className={`${isLoading && "opacity-0"}`}>Save & Update</span>
                     
                     {
                        isLoading && (
                        <div className='absolute'>
                            <l-line-spinner
                              size="20"
                              stroke="3"
                              speed="1"
                              color="white" 
                            ></l-line-spinner>
                        </div>
                        )
                     }
                    
                </button>

            </div>


        </div>
    )
}

export default SettingsPage;